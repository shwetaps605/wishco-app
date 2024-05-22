'use client'
import React from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getAllJobs } from '../utils/actions'
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { GrLocation } from "react-icons/gr";

const JobsComponent = () => {
  const { isLoading, isError, data, i} = useQuery({
    queryKey: ['jobs'],
    queryFn: () => getAllJobs(),
  })

  const getBadgeColor = (jobStatus) => {
    if(jobStatus === 'Applied')
      return 'badge-info'
    if(jobStatus === 'Interview')
      return 'badge-warning'
    if(jobStatus === 'Declined')
      return 'badge-error'
    return 'badge-success'
  }

  if(isLoading) return <div>
    Loading...
    <span className='loading loading-dots loading-sm'></span>
  </div>

  return (
    <>
    <h1 className='text-2xl'>My Jobs</h1>
    <div className='grid grid-cols-3 gap-5 mt-5'>
      {data.map(job => 
      <div key={job.id} className='card w-100 bg-base-300 shadow-md card-bordered'>
        <div className='card-body'>
          <div className='flex justify-between items-top align-middle'>
            <div>
              <h2 className='card-title'>{job.jobTitle}</h2>
              <p className='text-sm text-primary'>@{job.companyName}</p>
                <span className='mt-2'><GrLocation/>{job.location}</span>
            </div>
            <div className={`badge ${getBadgeColor(job.status)} badge-outline badge-lg`}>{job.status}</div>
          </div>
          <div class="card-actions mt-3">
            <button class="btn btn-secondary btn-outline btn-sm">
              <span>Edit</span>
              <FaRegEdit/>
            </button>
            <button class="btn btn-ghost btn-sm">
              <span>Delete</span>
              <RiDeleteBin6Line/>
            </button>
          </div>
        </div>
        
      </div>)}
    </div>
    </>
    
  )
}

export default JobsComponent