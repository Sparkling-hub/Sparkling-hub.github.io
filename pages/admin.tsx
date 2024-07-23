import MainLayout from '../layouts/MainLayuout';
import Section from '../data/data-sections/data-section-admin'
import Sections from '../components/sections/sections'


const AboutUs = () => {
    return (
        <MainLayout>
           <div>
           {Section.map((section) => (
                <Sections key={section.id} {...section} />
            ))}
           </div>
        </MainLayout>
    );
};

export default AboutUs;