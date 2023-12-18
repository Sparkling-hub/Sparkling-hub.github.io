import React from 'react';
import JobsFiltre from './job/job';
import IJobListProps from '@/interface/IJobListProps';

const JobList: React.FC<IJobListProps> = ( {jobs} ) => {

	return (
		<>
			<div className='sticky w-full overflow-auto flex flex-col max-h-[600px] relative' id="jobs-container">
				<div className="flex flex-wrap m-auto w-full m-3  relative">
									
					{jobs.map((job, index) => (
						<div className={`job-content bg-white rounded-xl m-5`} key={index}>
							<JobsFiltre job={job} />
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default JobList;
