import MainLayout from '../layouts/MainLayuout';
import * as Section from '../data/data-sections/data-section-about'
import Sections from '../components/sections/sections'
import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { setLastPageSlug } from '@/store/redusers/navigationReducer';


const AboutUs = () => {

    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(setLastPageSlug("About"));

    }, []);


    return (

        <MainLayout>
            <meta name="description" content="Sparkling Co. is an industry expert in digital services with over a decade of field experience in Software Development. Our expertise extends to providing dedicated teams of developers and project managers for both in-house project as well as in Team Augmentation, where our experts seamlessly integrate into client-led endeavours. Headquartered in Switzerland our branches reach out across Europe and North Africa, from London to Tunis." />
            <meta name="keywords" content="vision, principles, we, overview" />

            <meta property="og:title" content="Sparkling.Co. About Us" />
            <meta property="og:description" content="Sparkling Co. is an industry expert in digital services with over a decade of field experience in Software Development. Our expertise extends to providing dedicated teams of developers and project managers for both in-house project as well as in Team Augmentation, where our experts seamlessly integrate into client-led endeavours. Headquartered in Switzerland our branches reach out across Europe and North Africa, from London to Tunis." />

            <meta property="og:url" content="/careers" />
            <div className=''>

                <Sections {...Section.sections.SectionOne} />

                <Sections {...Section.sections.SectionTwo} />
                <Sections {...Section.sections.SectionThree} />
            </div>
        </MainLayout>

    );
};

export default AboutUs;