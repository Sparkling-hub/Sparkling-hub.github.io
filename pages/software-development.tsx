
import MainLayout from '../layouts/MainLayuout';
import Section from '../data/data-sections/data-section-software'
import Sections from '../components/sections/sections'
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setLastPageSlug } from '@/store/redusers/navigationReducer';


const SoftwareDevelopment = () => {

    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(setLastPageSlug("software_development"));

    }, []);

    return (

        <MainLayout>
            <meta name="description" content="Accelerate your software development endeavours with a team you can rely on! Our expertly managed engineers aren’t just rapid and reliable, they care. Taking great pride in what they do. Sprint after sprint" />
            <meta name="keywords" content="solutions, code, vision, start, adaptability, launch, agile " />
            <meta property="og:title" content="Sparkling.Co. Software Development" />
            <meta property="og:description" content="Accelerate your software development endeavours with a team you can rely on! Our expertly managed engineers aren’t just rapid and reliable, they care. Taking great pride in what they do. Sprint after sprint" />
            <meta property="og:url" content="/software-development" />
            
            {Section.map((section) => (
                <Sections key={section.index} {...section} />
            ))
            }

        </MainLayout>

    );
};

export default SoftwareDevelopment;