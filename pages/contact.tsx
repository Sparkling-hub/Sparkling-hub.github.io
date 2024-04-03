

import MainLayout from '../layouts/MainLayuout';
import * as Section from '../data/data-sections/data-section-contact'
import Sections from '../components/sections/sections'
import React from 'react';

const Contact = () => {

    return (

        <MainLayout>
              <meta name="description" content="Drop us a message to learn more about our innovative solutions." />
            <meta name="keywords" content="questions, answers, work, contact, send, get in touch, form" />

             <meta property="og:title" content="Sparkling.Co. Contact" />
            <meta property="og:description" content="Drop us a message to learn more about our innovative solutions." />

            <meta property="og:url" content="/contact" />
           
            <div >
                <Sections {...Section.sections.SectionOne} />
                <Sections {...Section.sections.SectionTwo} />
            </div>
        </MainLayout>

    );
};

export default Contact;