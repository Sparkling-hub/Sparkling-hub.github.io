
import React from 'react';
import Button from "../../components/button";

const header =
	<h1 className=''><span><strong className='color-primary-light'>IT Consulting</strong></span> </h1>


const content = <div className="lg:mb-12">
	<p className='2xl:h-[190px] xl:h-[180px] lg:h-[200px] text-xl'>
		Revamp your product strategy with personalized guidance addressing complex challenges with tailored solutions.
		Our experts are here to steer you back on the right track.
	</p>
	<ul className='text-left text-xl font-semibold  lg:text-xl w-fit m-auto flex flex-col   lg:whitespace-normal 2xl:p-0 py-4'>
		<li className='flex items-baseline'>
			<img className='w-4 h-4 inline-block mx-2' src='/img/right-arrow-circle.svg' alt="" />Research & Development (R&D)
		</li >
		<li className='flex items-baseline'>
			<img className='w-4 h-4 inline-block mx-2' src='/img/right-arrow-circle.svg' alt="" />Architecture and DevOps
		</li>
		<li className='flex items-baseline'>
			<img className='w-4 h-4 inline-block mx-2' src='/img/right-arrow-circle.svg' alt="" />Long-term Strategy Development
		</li>
	</ul>
</div>


const image = <img src='/img/services/IT_Consulting_icon.png' alt="IT Consulting" />;

const button = <Button href="/consulting" text="Find out more" />

const element = {
	content: content,
	header: header,
	image: image,
	button: button,
	index: 3,
}

export default element