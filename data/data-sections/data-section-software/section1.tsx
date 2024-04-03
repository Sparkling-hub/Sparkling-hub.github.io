import React from "react";

const header =
  <h1 className="leading-[60px] mb-2 text-5xl">
 <span className="text-primary-darkTeal font-bold">Software Development<br/></span>
  
  </h1>

const content =<div>
<strong className=" text-2xl text-primary-darkTeal "> Your Vision, Our Code, Incredible Potential</strong>
  <p className="text-xl mt-2">
    
    Accelerate your software development endeavours with a team you can rely on!
    Our expertly managed engineers aren’t just rapid and reliable, they care.
    Taking great pride in what they do. Sprint after sprint
    </p>
    </div>


const image = <img src='/img/software/software_development_icon.svg' className="w-full" alt="sofrware_icon" />;


const element = {
  content: content,
  header: header,
  image: image,
  padding_bottom: "pb-40 custom-pb-60",
  index: 1,

}
export default element