

import MainLayout from '../layouts/MainLayuout';
import * as Section from '../data/data-sections/data-section-faq'
import Sections from '../components/sections/sections'
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setLastPageSlug  } from '@/store/redusers/navigationReducer';


const Faq = () => {
	
    const dispatch = useDispatch();
    
    useEffect(() => {

        dispatch(setLastPageSlug("About"));

    }, []);

	return (

		<MainLayout>
			            <meta name="description" content="Got any question? We have answers!" />
            <meta name="keywords" content="questions, answers, located, started, language, prices, work, assisting" />
			<meta property="og:title" content="Sparkling.Co. FAQ" />
			<meta property="og:description" content="Got any question? We have answers!" />
			<meta property="og:url" content="/faq" />

			<div >
				<Sections {...Section.sections.SectionOne} />
				<Sections {...Section.sections.SectionTwo} />
			</div>

		</MainLayout>

	);
};

export default Faq;