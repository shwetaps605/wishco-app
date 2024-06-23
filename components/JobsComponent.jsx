'use client'
import React, {useCallback} from 'react'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { deleteJob, getAllJobs , redirectToJobPage, getJobsBasedOnCompanies,filterJobs} from '../utils/actions';
import EditJob from "./EditJob"
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { GrLocation } from "react-icons/gr";
import toast from 'react-hot-toast';
import AddNewJobButton from './AddJobButton';
import { useRouter,useSearchParams, usePathname } from 'next/navigation'


const statusOptions = ['Applied','Offer','Interview','Rejected']

const JobsComponent = () => {
  const jobsQuery = useQuery({
    queryKey: ['jobs'],
    queryFn: () => getAllJobs(),
  })

  const queryClient = useQueryClient();                                                                                                                                       

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)
      filterJobsQuery.mutate(params)
      return params.toString()
    },
    [searchParams]
  )


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

  // const filterJobsQuery = useMutation({
  //   mutationFn: async queryObj => {
  //     console.log("QUERY OBJECT->", queryObj)
  //     //console.log("QUERY PARAMS",searchParams.getAll())
  //     if(queryObj.field === 'companyName') {
  //       const response = await getJobsBasedOnCompanies(queryObj.query)
  //       queryClient.setQueryData(['jobs'], (oldData) => response.data)
  //     }
  //   }
  // })

  const filterJobsQuery = useMutation({
    mutationFn: async (params) => {
        const response = await filterJobs(params)
        queryClient.setQueryData(['jobs'], () => response.data)
    }
  })

  const getBadgeColor = (jobStatus) => {
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

  const handleFilterQuery = (field,queryString) => {
      router.push(pathname + '?' + createQueryString(field,queryString),{ scroll: false });
  }

  if(jobsQuery.isPending) return <div>
    <span className='loading loading-dots loading-lg'></span>
  </div>

  return (
    <>
    <AddNewJobButton companyName={''}/>
    <div className='bg-base-100 px-4 py-5 rounded-lg shadow-lg mt-4 mb-4 mx-auto'>
      <h2 className='text-md text-base-400 mb-2'>Filters</h2>
      <form className='flex gap-4'>
        <div className='join'>
            <label htmlFor="company" className='bg-base-200 join-item  flex justify-center align-middle text-center items-center pl-2'>
              <span className='text-xs mr-5'>Company Name</span>
            </label>
            <input type='text' name='company' required className='join-item input bg-base-300' onChange={(e)=>handleFilterQuery('companyName',e.currentTarget.value)}/>
        </div>
        <div className='join'>
            <label htmlFor="role" className='bg-base-200 join-item  flex justify-center align-middle text-center items-center pl-2'>
              <span className='text-xs mr-5'>Role</span>
            </label>
            <input type='text' name='role' required className='join-item input bg-base-300' onChange={(e)=>handleFilterQuery('role',e.currentTarget.value)}/>
        </div>
        {/* <div className='join w-full'>
            <label htmlFor="status" className='bg-base-200 join-item flex justify-center align-middle text-center items-center pl-2'>
                <span className='text-xs mr-5'>Status</span>
            </label>
            <select name="status" id="status" className="select select-accent join-item max-w-sm">
                {statusOptions.map(option => <option key={option} defaultValue={jobsQuery.data.status} value={option} selected={jobsQuery.data.status === option} > 
                    {option}
                </option>)}
            </select>
        </div> */}
      </form>
    </div>
    <div className='mt-10 grid grid-cols-[1fr,1fr,1fr,1fr] gap-5'>
      {jobsQuery.data.map(job => 
      <div key={job.id} className='px-5 py-3 border-2 border-base-100 shadow-md hover:shadow-lg rounded-lg hover:cursor-pointer'>
        <div>
          <div className='flex justify-between items-top align-middle'>
            <div className='items-center'>
              <h2 className='text-secondary text-md'>{job.jobTitle}</h2>
              <p className='text-md text-info opacity-55'>@{job.companyName}</p>
              <div className='mt-2 flex align-middle items-center text-slate-500 text-sm'>
                <GrLocation className='mr-1'/>
                {job.location ? job.location : 'Not Available'}
                </div>
            </div>
            <div className={`text-white opacity-40 text-xs`}>{job.status}</div>
          </div>
          {/* <div className="card-actions mt-3">
            <button className="btn btn-accent btn-sm" onClick={()=> handleEditOption(job.id)}>
              <span>Edit</span>
              <FaRegEdit/>
            </button>
            <button className="btn btn-ghost btn-sm" onClick={()=>handleDeleteOption(job.id)}>
              <span>Delete</span>
              <RiDeleteBin6Line/>
            </button>

          </div> */}
          {/* <EditJob data={job}/> */}

        </div>
        
      </div>)}
    </div>
    </>
    
  )
}

export default JobsComponent