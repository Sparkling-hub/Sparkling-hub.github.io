const header = (
 <h1 className="text-5xl my-2 text-primary-darkTeal font-bold mb-10"> Contact Us
  </h1>
);

const content = (
  <div className="text-2xl text-primary-darkTeal leading-[40px]">
    <h2 className="font-bold">Get in touch!</h2>

    <h2 className="leading-[30px] font-bold">Drop us a message to learn more about our innovative solutions.</h2> 
  </div>
);

const image = <img src="/img/section/ContactUs.svg" className="" alt="SectionOne"/>;

const element = {
  content: content,
  header: header,
  image: image,
};
export default element;
