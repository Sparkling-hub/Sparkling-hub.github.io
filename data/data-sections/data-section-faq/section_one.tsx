const header = (
  <h1 className="text-5xl mb-10 text-primary-darkTeal font-bold">
    FAQs
  </h1>
);

const content = (<p className="text-primary-darkTeal leading-[40px] text-2xl ">
<strong className=""> 
    Got any question? </strong>
    <br />

    <strong className="font-black text-primary-darkTeal">We have answers!
    </strong>
  </p>
);

const image = <img src="/img/section/SectionFAQ.svg" className="w-full p-10" alt="FAQ" />

const element = {
  content: content,
  header: header,
  image: image,
};
export default element;
