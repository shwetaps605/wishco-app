'use client'
import React from 'react'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { deleteJob, getAllJobs , redirectToJobPage} from '../utils/actions';
import EditJob from "./EditJob"
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { GrLocation } from "react-icons/gr";
import toast from 'react-hot-toast';

const JobsComponent = () => {
  const { isPending, isError, data, isFetching,fetchStatus} = useQuery({
    queryKey: ['jobs'],
    queryFn: () => getAllJobs(),
  })

  const queryClient = useQueryClient();


  const deleteJobQuery = useMutation({
    mutationFn: async id => {
      const reponse = await deleteJob(id);
      if(reponse.message === 'success') {
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


  const getBadgeColor = (jobStatus) => {
    console.log(jobStatus)
    if(jobStatus === 'Applied')
      return 'badge-info'
    if(jobStatus === 'Interview')
      return 'badge-warning'
    if(jobStatus === 'Rejected')
      return 'badge-error'
    return 'badge-success'
  }

  const handleDeleteOption = (jobId) => {
    if(jobId != null) {
      deleteJobQuery.mutate(jobId);
      queryClient.invalidateQueries({ queryKey:['jobs'] });
    }
  }

  const handleEditOption = id => {
    if(id != null ) 
    redirectToJobPage(id);
  }

  if(isPending) return <div>
    <span className='loading loading-dots loading-lg'></span>
  </div>

  return (
    <>
    <div className='bg-base-100 px-4 py-5 rounded-lg shadow-lg mt-4 mb-4 mx-auto'>
      <h2 className='text-md text-base-400 mb-2'>Filters</h2>
      <form>
        <div className='join'>
            <label htmlFor="company" className='bg-base-300 join-item  flex justify-center align-middle text-center items-center pl-2'>
              <span className='text-xs mr-5'>Company Name</span>
            </label>
            <input type='text' name='company' required className='join-item input input-bordered'/>
        </div>
      </form>
    </div>
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
          <div className="card-actions mt-3">
            <button className="btn btn-accent btn-sm" onClick={()=> handleEditOption(job.id)}>
              <span>Edit</span>
              <FaRegEdit/>
            </button>
            <button className="btn btn-ghost btn-sm" onClick={()=>handleDeleteOption(job.id)}>
              <span>Delete</span>
              <RiDeleteBin6Line/>
            </button>

              <EditJob data={job}/>
          </div>
        </div>
        
      </div>)}
    </div>
    </>
    
  )
}

export default JobsComponent