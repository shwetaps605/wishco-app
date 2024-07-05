'use client'
import { useQuery, useQueryClient ,dehydrate, HydrationBoundary, QueryClient} from '@tanstack/react-query'
// import EditJob from '../../../../components/EditJob'
import { fetchCompanyDetails, fetchJobDetails, redirectToJobsPage } from '../../../../utils/actions'
// import { useEffect, useState } from 'react'



const JobPage = (props) => {


    if(jobQuery.isPending) return <div>
        <div className="flex flex-col gap-4 w-52">
            {/* <div className="skeleton h-32 w-full"></div> */}
            <div className="skeleton h-4 w-28"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
        </div>
    </div>


    return(
        <>
        {/* <HydrationBoundary state={dehydrate(queryClientt)}> */}
        <button className='mb-5 btn btn-accent btn-md' onClick={()=>redirectToJobsPage()}>Back to Jobs</button>
            <div className='flex flex-col mb-5'>
                <div>
                    <div className='join'>
                        <h1 className='text-2xl mr-1 capitalize join-item'>{jobQuery.data.jobTitle}</h1>
                        {
                            jobQuery.data.jobUrl.length > 0 ? <div className='join-item flex items-center'>
                                <a href={jobQuery.data.jobUrl} target="_blank"><FiLink className='text-primary'/></a>
                            </div> : null
                        }
                    </div>
                    
                </div>
            </div>
        {/* </HydrationBoundary> */}
            

        </>
    )
}

export default JobPage;