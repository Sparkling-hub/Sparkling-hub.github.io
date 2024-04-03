

import MainLayout from '../layouts/MainLayuout';
import * as Section from '../data/data-sections/data-sections-home';
import Sections from '../components/sections/sections';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setLastPageSlug } from '@/store/redusers/navigationReducer';


const Index = () => {

	const dispatch = useDispatch();

	useEffect(() => {

		dispatch(setLastPageSlug("home"));

	}, []);

	return (

		<MainLayout>
				            <meta name="description" content="Whether you are looking to expand your Development Team, build your idea from scratch, or do some good old Research and Development (R&D) you need more than coders, you need problem-solvers. Talk to us for seasoned and affordable Software Engineers that add real value to your long-term future." />
            <meta name="keywords" content="solutions, answers, technologies, benefits, HTML, CSS, JavaScript" />
			<meta property="og:title" content="Sparkling.Co" />
			<meta property="og:description" content="Whether you are looking to expand your Development Team, build your idea from scratch, or do some good old Research and Development (R&D) you need more than coders, you need problem-solvers. Talk to us for seasoned and affordable Software Engineers that add real value to your long-term future." />

			<meta property="og:url" content="/" />

			<div >
				<Sections {...Section.sections.SectionOne} />
				<Sections {...Section.sections.SectionTwo} />
				<Sections {...Section.sections.SectionThree} />
				<Sections {...Section.sections.SectionFour} />
				<div className='lg:block hidden'><Sections {...Section.sections.SectionFive} /></div>

			</div>

		</MainLayout>

	);
};

export default Index;
