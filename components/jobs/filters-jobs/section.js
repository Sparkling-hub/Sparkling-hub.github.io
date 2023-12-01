import React, { useState, useEffect } from 'react';
import gps from '../image/gps.png'
import dataJobs from '../../../data/data-jobs'
import Link from 'next/link';
import Button from '../../ui/circle-button';


const JobsFiltre = ({dataJobs, filter}) => {
  const filterJobs = (jobs, filterValue) => {
   
    return jobs.filter((job) => {
      console.log((job.bid.props.children));
    
      return job.bid.props.children == filterValue});
  };
  console.log(filterJobs(dataJobs,filter));
 
  return (<>
  
      {(filter? filterJobs(dataJobs,filter):dataJobs).map((job, index) => (
      
        <div className="job-content bg-white rounded-xl" key={index}>


          <div className='h-20  py-3 px-5 text-gray-500'>{job.bid}</div>




          <div className=" bg-gray-100   shadow-sm flex text-gray-500  flex justify-between ">
            <div className='flex pr-5 py-3  overflow-hidden w-full items-baseline'>
              <div className='w-5/6 z-10  ml-5 text-left  items-left'>

                {job.head}

                {job.text}
                {job.salary}


              </div>

              <Link href={job.slug} className='h-2/3 w-1/6 animation flex justify-end'><Button /> <div className="border-animation" key={index}></div></Link>
            </div>


          </div>
          <div className="flex items-center p-2  mx-5 uppercase text-base">  <img src={gps} alt="GPS" className="h-8" />{job.place.img}{job.place.place}</div>

        </div>    ))}</>)

}
export default JobsFiltre;
