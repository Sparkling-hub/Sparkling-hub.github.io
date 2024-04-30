import Blog from '@/components/blog'

const header = (
  <h1 className="text-5xl my-4 mx-1 text-primary-darkTeal font-bold mb-10"></h1>
);

const content = (
<div>
<Blog/>

</div>
);

const element = {
  content: content,
  header: header,
  id: "blog",
};
export default element;
