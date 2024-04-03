
import IJob from "@/interface/IJob";

import List from "./listInfo";
import Link from "next/link";
interface JobComponentProps {
  job: IJob;
}
const JobComponent: React.FC<JobComponentProps> = ({job}) => {


  return (
    
    <div className="my-14 max-w-screen-2xl pb-14 mx-auto w-full px-8">
      	<meta name="description"content={job.head +" "+ job.overview} />
				<meta name="keywords" content="web development, programming, frontend, backend, website, careers, work" />
			
      <meta property="og:title" content={`Sparkling.Co. ${job.head}`} />
			<meta property="og:description" content={job.overview} />
			<meta property="og:url" content={`/careers/job?id=${job.slug}`} />


      <Link href='/careers' className="flex items-center text-xl  mb-4"> <img src="/img/jobs/arrowBack.png" alt="back"  className="h-4"/> Explore all vacancies</Link>
     <h1 className="text-5xl mb-6 mx-1 ">{job.head}</h1>
     <p className="text-xl pb-8">
   {job.workMode}, {job.location}, {job.experienceHTML}
  </p>  
  <Link href={{ pathname: '/careers/form', query: {id:job.slug}}}  className="no-underline relative text-white py-3 px-8 bg-teal-500 rounded-full z-10  hover:bg-teal-400">Apply</Link>
      <div className="my-10">
        <h2 className="text-2xl">Role overview:</h2>
      <p className="">
      {job.overview}
      </p>

      <List title="Core Responsibilities" content= {job.coreResponsibilities}/>
      <List title="Skills Requirements" content= {job.skillsRequirements}/>
      <List title="Additional Qualifications" content= {job.additionalQualifications}/>
      <List title="Benefits" content= {job.benefits}/>
    
  
      </div>

    </div>
  );
};

export default JobComponent;

