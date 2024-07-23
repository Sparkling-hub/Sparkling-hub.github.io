import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/config/firebase-client";
import BlogPost from "../blog-post";
import {
  addPostsToAllPosts,
  resetPostData,
  selectPostFormData,
  setUpdate,
} from "@/store/redusers/postReduser";
import {
  selectFilter,
  setUniqueIds,
  setActiveIds,
} from "@/store/redusers/filterReducer";
import { setUserAuth, selectUserAuth } from "@/store/redusers/userReducer";
import { useDispatch, useSelector } from "react-redux";
import { createPost, getPost } from "@/lib/api";
import IPost from "@/interface/IPost";
import Modal from "../post_interface/post_interface";
import Filter from "../filterPost";
import { formatTags, getIds } from "@/components/helper/split";
import HeadPost from "./headerPost/header_post";

const Blog: React.FC = () => {
  const dispatch = useDispatch();
  const { postData, update, filter, allPosts } = useSelector(selectPostFormData);
  const { activeIds } = useSelector(selectFilter);
  const { user } = useSelector(selectUserAuth);
  const [showModal, setShowModal] = useState(false);


  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 4;
  const [posts, setPosts] = useState<IPost[]>([]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const totalPages = Math.ceil((posts.length - 1) / postsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleSubmit = async (selectedImage: File | null) => {
    if (
      selectedImage &&
      postData.title &&
      postData.tags &&
      postData.description
    ) {
    
      await createPost(postData, selectedImage);
      
      dispatch(resetPostData());
      closeModal();
      dispatch(setUpdate());
    }
  };

  const checkStartDate = (dateString: string | null): Date => {
    if (!dateString) {
      return new Date("2020-01-01");
    }
    return new Date(dateString);
  };

  const checkEndDate = (dateString: string | null): Date => {
    if (!dateString) {
      return new Date();
    }
    return new Date(dateString);
  };

  function parseDate(dateStr: string): Date {
    return new Date(dateStr);
  }

  function isDateInRange(
    post: IPost,
    startDate: string | null,
    endDate: string | null
  ): boolean {
    const postDate = parseDate(post.date);
    const start = checkStartDate(startDate);
    const end = checkEndDate(endDate);
    return postDate >= start && postDate <= end;
  }

  const filterValue = async () => {
    let filteredPosts = allPosts.filter((post: IPost) => {
      const matchesText = post.title
        ?.toLowerCase()
        .includes(filter.title.toLowerCase());
      const postTags = Array.isArray(post.tags)
        ? post.tags.map((tag) => tag.toLowerCase())
        : [];
        const isTagIncluded =
        (activeIds?.tags && activeIds?.tags.length === 0) ||
        (activeIds.tags && Array.isArray(activeIds.tags) &&
          activeIds.tags.some((activeId: string) =>
            postTags.includes(activeId.toLowerCase())
          )
        );
      
      
      const dateInRange = isDateInRange(post, filter.startDate, filter.endDate);
      return isTagIncluded && dateInRange && matchesText;
    });

    filteredPosts.sort((a: IPost, b: IPost) => {
      const dateA = parseDate(a.date).getTime();
      const dateB = parseDate(b.date).getTime();
      return filter.sortOrder ? dateA - dateB : dateB - dateA;
    });

    setPosts(filteredPosts);

    if (currentPage > Math.ceil((filteredPosts.length - 1) / postsPerPage)) {
      setCurrentPage(1);
    }
  };

  const handleAddBlog = () => {
    onAuthStateChanged(auth, (user) => {
      if (user != null) {
        dispatch(setUserAuth(true));
      } else {
        dispatch(setUserAuth(false));
      }
    });
  };

  useEffect(() => {
    handleAddBlog();
  }, []);

  const openModal = () => {
    setShowModal(true);
    dispatch(resetPostData());
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const fetchPosts = async () => {
    try {
      const response = await getPost();
      formatTags(response);
      const result = { tags: getIds(response, "tags") };
      const activeIds = { tags: [] };

      dispatch(setUniqueIds({ value: result }));
      dispatch(setActiveIds({ value: activeIds }));
      dispatch(addPostsToAllPosts(response));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [update]);

  useEffect(() => {
    filterValue();
  }, [activeIds, filter, update, allPosts]);
  const sortedPosts = [...allPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const recentPost = sortedPosts.length > 0 ? sortedPosts[0] : null;

  const remainingPosts = posts.filter((post) => post.id !== recentPost?.id);

  const currentRemainingPosts = remainingPosts.slice(
    indexOfFirstPost,
    indexOfLastPost
  );

  return (
    <div className="">
      <h1 className="text-5xl font-bold text-center mb-4 text-primary-darkTeal">
        Future text about posts
      </h1>
      {recentPost && (
        <div className="m-2 my-12">
          <HeadPost key={recentPost.id} {...recentPost} />
        </div>
      )}
      <div className="flex ">
        <Filter />
        {user ? (
          <button
            className="no-underline whitespace-nowrap relative w-auto text-white py-3 px-8 m-auto bg-color-primary-dark rounded-full z-10 block hover:bg-teal-700 "
            onClick={openModal}
          >
            Add blog
          </button>
        ) : (
          ""
        )}
      </div>

      <div key={posts ? posts.length + 1 : "0"}>
        <div className="flex flex-wrap z-[-10] static h-[1150px]">
          {currentRemainingPosts.map((item: IPost) => (
            <BlogPost key={item.id} {...item} />
          ))}
        </div>
      </div>
      {showModal && <Modal onClick={handleSubmit} closeModal={closeModal} />}
      <div className="flex justify-center mt-6">
        <nav>
          <ul className="pagination flex">
            {Array.from({ length: totalPages }, (_, index) => (
              <li key={index} className="page-item">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    paginate(index + 1);
                  }}
                  className={`${
                    currentPage == index + 1
                      ? "bg-color-primary-dark"
                      : "bg-primary-lightTeal scale-90"
                  } no-underline relative text-white w-8 h-8 m-1 rounded-full z-10 block hover:bg-teal-700`}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Blog;
