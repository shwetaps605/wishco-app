'use client'
import React, {useCallback} from 'react'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { filterJobs} from '../utils/actions';
import AddNewJobButton from './AddJobButton';
import { useRouter,useSearchParams, usePathname } from 'next/navigation'
import JobTile from './JobTile'


const statusOptions = ['Applied','Offer','Interview','Rejected']

const JobsComponent = () => {
  const jobsQuery = useQuery({
    queryKey: ['jobs'],
    queryFn: () => filterJobs(searchParams),
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

  const filterJobsQuery = useMutation({
    mutationFn: async (params) => {
        const response = await filterJobs(params)
        queryClient.setQueryData(['jobs'], () => response)
    }
  })

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
            <input 
              type='text' 
              name='company' 
              required 
              className='join-item input bg-base-300'
              value={searchParams.get('companyName') ?? '' } 
              onChange={(e)=>handleFilterQuery('companyName',e.currentTarget.value)}/>
        </div>
        <div className='join'>
            <label htmlFor="role" className='bg-base-200 join-item  flex justify-center align-middle text-center items-center pl-2'>
              <span className='text-xs mr-5'>Role</span>
            </label>
            <input type='text' name='role' required value={searchParams.get('role') ?? '' }  className='join-item input bg-base-300' onChange={(e)=>handleFilterQuery('role',e.currentTarget.value)}/>
        </div>
      </form>
    </div>
    <div className='mt-10 grid grid-cols-[1fr,1fr,1fr,1fr] gap-5'>
      {jobsQuery.data.map(job => <JobTile job={job}/>)}
    </div>
    </>
    
  )
}

export default JobsComponent