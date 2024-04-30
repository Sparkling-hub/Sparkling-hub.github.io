

import MainLayout from '../layouts/MainLayuout';
import Section from '../data/data-sections/data-section-blog'
import Sections from '../components/sections/sections'
import React, { useEffect, useState } from 'react';


const BlogPage = () => {


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

export default BlogPage;