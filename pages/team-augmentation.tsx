import MainLayout from '../layouts/MainLayuout';
import * as Section from '../data/data-sections/data-section-team'
import Sections from '../components/sections/sections'
import { useDispatch } from 'react-redux';
import { setLastPageSlug } from '@/store/redusers/navigationReducer';
import React, { useEffect } from 'react';

const TeamAugmentation = () => {

    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(setLastPageSlug("team_augmentation"));

    }, []);

    return (

        <MainLayout>
            <meta name="description" content="Level up your projects with enhanced teams Enhance your development efforts by integrating seasoned developers. At Sparkling, our skilled engineers smoothly integrate into your project, empowering you to excel at what you do best. Experience a significant boost in production and enjoy peace of mind" />
            <meta name="keywords" content="solutions, code, team, start, MVP, adaptability, launch, agile" />
            <meta property="og:title" content="Sparkling.Co. Team Augmentation" />
            <meta property="og:description" content="Level up your projects with enhanced teams Enhance your development efforts by integrating seasoned developers. At Sparkling, our skilled engineers smoothly integrate into your project, empowering you to excel at what you do best. Experience a significant boost in production and enjoy peace of mind" />
            <meta property="og:url" content="/team-augmentation" />

            <div className=''>

                <Sections {...Section.sections.SectionOne} />
                <Sections {...Section.sections.SectionTwo} />
                <Sections {...Section.sections.SectionThree} />
                <Sections {...Section.sections.SectionFour} />
            </div>
        </MainLayout>

    );
};

export default TeamAugmentation;