import Link from "next/link";
import IPost from '@/interface/IPost'
const BlogPost: React.FC<IPost> = ({ id , title, tags, description, data, fileUrl }) => {
  const calculateReadingTime = (text: string) => {
    if (!text) return 0; // Обработка случая, когда текст не определен
  
    const wordsPerMinute = 200; // Средняя скорость чтения в словах в минуту
    const words = text.split(/\s+/).length; // Разбиваем текст на слова
    const minutes = words / wordsPerMinute; // Расчет времени чтения в минутах
    return Math.ceil(minutes); // Округляем время чтения до ближайшего целого числа
  };
  const readingTime = calculateReadingTime(description);
  return (
    <div className="max-w-[50%] p-5 w-full">
      <div className="bg-gray-100 rounded-[10px] shadow-lg">
        <Link
          className="relative h-64 overflow-hidden block bg-black rounded-t-[10px]"
          href=""
          data-wpel-link="internal"
        >
          <img
            width="548"
            height="143"
            src={fileUrl}
            className="attachment-548x234 size-548x234 wp-post-image  w-full"
            alt="20 Most Innovative Real Estate Tech Companies and Startups"
            decoding="async"
            loading="lazy"
            sizes="(max-width: 548px) 100vw, 548px"
          />
        </Link>
        <div className="min-h-[256px] p-2 md:p-5 flex flex-col justify-between">
          <div className="card-top">
            <p className="card-tag">
              <span className="tags-list text-2xl font-semibold text-primary-darkTeal">{tags}</span>{" "}
            </p>

            <Link
              href="https://inoxoft.com/blog/20-most-innovative-real-estate-tech-companies-and-startups/"
              className="text-2xl font-bold"
              data-wpel-link="internal"
            >
              {title}
            </Link>
            <div className="py-2">{description}</div>
          </div>
          <div className="flex justify-between">
          <span className="card-read">{`${readingTime} min read`}</span>
            <svg width="4" height="4" viewBox="0 0 4 4" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="2" cy="2" r="2" fill="#ACBAC2"></circle>
            </svg>
            <span className="card-date">{data}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
