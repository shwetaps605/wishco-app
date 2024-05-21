'use client'
import React from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getAllJobs } from '../utils/actions'

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
    <div className='grid grid-rows-3 gap-5'>
      {data.map(job => 
      <div key={job.id} className='card w-100 bg-base-300 shadow-xl card-bordered'>
        <div className='card-body'>
        <div className='flex justify-between align-middle items-center'>
          <div>
            <h2 className='card-title'>{job.jobTitle}</h2>
            <p className='text-sm font-semibold'>@{job.companyName}</p>
          </div>
          <div className={`badge ${getBadgeColor(job.status)} badge-outline`}>{job.status}</div>
        </div>
        </div>
        
      </div>)}
    </div>
  )
}

export default JobsComponent