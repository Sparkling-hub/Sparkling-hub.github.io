
import React from 'react';
import Button from "../../components/button";

const header =
	<h1 className='h-fit'><span><strong className='color-primary-light'>Team Augmentation</strong></span> </h1>


const content =
<div className=" 2xl:mb-12  pb-4 2xl:pt-0 ">
<p className='2xl:h-[200px] text-xl'>Enhance your development efforts by extending your existing team or build your new team from scratch. Customise it to your needs to create a perfect fit!</p>
	<ul className='text-left text-2xl 2xl:text-xl w-fit m-auto  2xl:p-0 p-4'>
			<li>
				<img className='w-4 h-4 inline-block mx-2' src='/img/right-arrow-circle.svg' alt="" />Full stack develoment
			</li>
			<li>
				<img className='w-4 h-4 inline-block mx-2' src='/img/right-arrow-circle.svg' alt="" />Technical support
			</li>
			<li>
				<img className='w-4 h-4 inline-block mx-2' src='/img/right-arrow-circle.svg' alt="" />Agile Collaboration
			</li>
		</ul>
	</div>


const image = <img src='/img/services/team_augmentation_icon.png' className='' alt="teamAugmentation" />;
const button = <Button href="/team-augmentation" text="Find out more" />
const element = {
	content: content,
	header: header,
	image: image,
	button: button,
	index: 1,
}

export default element