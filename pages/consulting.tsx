

import MainLayout from '../layouts/MainLayuout';
import Section from '../data/data-sections/data-section-consulting'
import Sections from '../components/sections/sections'
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setLastPageSlug  } from '@/store/redusers/navigationReducer';


const ConsultingPage = () => {

    const dispatch = useDispatch();
    
    useEffect(() => {

        dispatch(setLastPageSlug("consulting"));

    }, []);

    return (

        <MainLayout>
              <meta name="description" content="In the face of challenges or in pursuit of business evolution, a thoughtful IT consultation is essential. Tailored to your unique needs and objectives our guidance is designed to steer your business on the right track!" />
            <meta name="keywords" content="project, work, Europe, developer, customised solutions, management, digital growth" />

      <meta property="og:title" content="Sparkling.Co. IT Consulting" />
            <meta property="og:description" content="In the face of challenges or in pursuit of business evolution, a thoughtful IT consultation is essential. Tailored to your unique needs and objectives our guidance is designed to steer your business on the right track!" />

            <meta property="og:url" content="/consulting" />
            {Section.map((section) => (
                <Sections key={section.index} {...section} />
            ))
            }

        </MainLayout>

    );
};

export default ConsultingPage;