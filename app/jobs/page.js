'use client'
import React from 'react'
import { dehydrate, HydrationBoundary, QueryClient} from '@tanstack/react-query'
import JobsComponent from '../../components/JobsComponent'
import { useSearchParams } from "next/navigation";
import { useJobs } from '../../hooks/useJobs';
import FilterJobs from '../../components/FilterJobs';
import AddNewJobButton from '../../components/AddJobButton';
import SkeletonLoader from '../../components/SkeletonLoader'

const JobifyPage = () => {
  const searchParams = useSearchParams();
  const jobsQuery = useJobs(searchParams);
  const queryClient = new QueryClient();

  return(

    <HydrationBoundary state={dehydrate(queryClient)}>
        {
          jobsQuery?.data?.length > 0  &&  <FilterJobs/>
        }
       {jobsQuery.isPending ? <SkeletonLoader/> : <JobsComponent jobs={jobsQuery.data}/>}
      <div className='mt-10 flex justify-center md:absolute md:bottom-10 md:left-[45%]'>
        <AddNewJobButton companyName={""}/>
      </div>
    </HydrationBoundary>
   
  )
 
}

export default JobifyPage