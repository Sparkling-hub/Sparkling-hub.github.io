

import MainLayout from '../layouts/MainLayuout';
import * as Section from '../data/data-sections/data-section-careers'
import Sections from '../components/sections/sections'
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setLastPageSlug } from '@/store/redusers/navigationReducer';


const CareersPage = () => {

    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(setLastPageSlug("careers"));

    }, []);

    return (

        <MainLayout>
            <meta name="description" content="Sparkling Co. is Swiss headquartered company with presence all around Europe always in search of great professionals! Want to join the team? Here are the current open positions." />
            <meta name="keywords" content="careers, work, Europe, developer, consultant, sales, management, junior, senior, middle, full time, part time, hibrid work," />

            <meta property="og:title" content="Sparkling.Co. Careers" />
            <meta property="og:description" content="Sparkling Co. is Swiss headquartered company with presence all around Europe always in search of great professionals! Want to join the team? Here are the current open positions." />

            <meta property="og:url" content="/careers" />
            <div >
                <Sections {...Section.sections.SectionOne} />
                <Sections {...Section.sections.SectionTwo} />
            </div>

        </MainLayout>

    );

};

export default CareersPage;