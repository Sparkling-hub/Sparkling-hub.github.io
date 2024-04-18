import MainLayout from '../layouts/MainLayuout';
import Section from '../data/data-sections/data-section-admin'
import Sections from '../components/sections/sections'
import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { setLastPageSlug } from '@/store/redusers/navigationReducer';


const AboutUs = () => {

    const dispatch = useDispatch();

    useEffect(() => {

        // dispatch(setLastPageSlug("Admin"));

    }, []);


    return (

        <MainLayout>
           <div>
           {Section.map((section) => (
                <Sections key={section.id} {...section} />
            ))
            }
            
           </div>
        </MainLayout>

    );
};

export default AboutUs;