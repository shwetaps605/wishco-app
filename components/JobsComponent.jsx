'use client'
import React from 'react'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { deleteJob, getAllJobs } from '../utils/actions'
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { GrLocation } from "react-icons/gr";
import toast from 'react-hot-toast';

const JobsComponent = () => {
  const { isPending, isError, data, isFetching,fetchStatus} = useQuery({
    queryKey: ['jobs'],
    queryFn: () => getAllJobs(),
  })

  const deleteJobQuery = useMutation({
    mutationFn: async id => {
      const reponse = await deleteJob(id);
      if(reponse.message === 'success') {
        console.log("IT WAS A SUCCESS");
        queryClient.invalidateQueries({ queryKey:['jobs']})
        toast.success('Job removed!')
      } else {
        toast.error('Something went wrong!!!')
      }

    },
    onMutate: (obj) => {
      console.log("On Mutate", obj)
    },
    onSuccess: (res) => {
     
    }
  })

  const queryClient = useQueryClient();

  const getBadgeColor = (jobStatus) => {
    if(jobStatus === 'Applied')
      return 'badge-info'
    if(jobStatus === 'Interview')
      return 'badge-warning'
    if(jobStatus === 'Declined')
      return 'badge-error'
    return 'badge-success'
  }

  const handleDeleteOption = (jobId) => {
    if(jobId != null) {
      deleteJobQuery.mutate(jobId);
      queryClient.invalidateQueries({ queryKey:['jobs'] });

      
    }
  }

  if(isPending) return <div>
    <span className='loading loading-dots loading-lg'></span>
  </div>

  return (
    <>
    <h1 className='text-2xl'>{isFetching ? 'Fetching...' : 'My Jobs'}</h1>
    <p>{fetchStatus}</p>
    <div className='grid lg:grid-cols-3 sm:grid-cols-1 gap-5 mt-5'>
      {data.map(job => 
      <div key={job.id} className='card w-100 bg-base-300 shadow-md card-bordered'>
        <div className='card-body'>
          <div className='flex justify-between items-top align-middle'>
            <div>
              <h2 className='card-title'>{job.jobTitle}</h2>
              <p className='text-md text-primary'>@{job.companyName}</p>
              <div className='mt-2 flex align-middle items-center text-slate-500 text-sm'>
                <GrLocation className='mr-1'/>
                {job.location ? job.location : 'Not Available'}
                </div>
            </div>
            <div className={`badge ${getBadgeColor(job.status)} badge-outline badge-lg`}>{job.status}</div>
          </div>
          <div class="card-actions mt-3">
            <button class="btn btn-accent btn-sm ">
              <span>Edit</span>
              <FaRegEdit/>
            </button>
            <button class="btn btn-ghost btn-sm" onClick={()=>handleDeleteOption(job.id)}>
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