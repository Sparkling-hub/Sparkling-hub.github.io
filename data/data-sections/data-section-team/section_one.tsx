import React from "react";


const header = (
  <h1 className="text-5xl font-light mb-2 text-primary-darkTeal font-Ralevay_Light">
   Team <strong className="font-bold">Augmentation</strong>


  
  </h1>
);


const content = (<div className="text-primary-darkTeal">
  <strong className="text-2xl"> Level up your projects with enhanced teams</strong>
  <p className="text-xl my-2  text-primary-darkTeal">    
      Enhance your development efforts by integrating seasoned developers.
      At Sparkling, our skilled engineers smoothly integrate into your project, empowering you to excel at what you do best.
      Experience a significant boost in production and enjoy peace of mind
    </p></div>
);

const image = <img src="/img/team/team_augmentation_icon.svg" className="" alt='sectionOne' />;

const element = {
  content: content,
  header: header,
  index: 1,
  image: image,
  id: 'team'
};
export default element;
