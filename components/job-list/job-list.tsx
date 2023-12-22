import React from 'react';
import JobsFiltre from './job/job';
import IJobListProps from '@/interface/IJobListProps';
import IJob from '@/interface/IJob';

const JobList: React.FC<IJobListProps> = ({ jobs }) => {
  return (
    <div className='w-full overflow-auto flex flex-col m-6 '>
      {jobs.length ? (
        <div className="flex flex-wrap w-auto relative w-full">
          {jobs.map((job: IJob) => (
            <div className={`job-content bg-white rounded-xl  mx-6 mb-6 `} key={job.slug}>
              <JobsFiltre job={job} />
            </div>
          ))}
        </div>
		) : (
	
			<h3 className='font-medium absolute right-[40%] left-auto top-1/2 w-25 text-5xl text-teal-700 justify-center'>
				No found jobs
			</h3>
			
		)}
    </div>
  );
};

export default JobList;
