'use client'
import { useQuery } from '@tanstack/react-query'
import EditJob from '../../../../components/EditJob'
import { fetchCompanyDetails, fetchJobDetails, redirectToJobsPage } from '../../../../utils/actions'
import { useEffect, useState } from 'react'
import { FiLink } from "react-icons/fi";
import CompanyDetails from "../../../../components/CompanyDetails"

const JobPage = (props) => {

    const jobQuery = useQuery({
        queryKey: ['jobs',props?.params?.id],
        queryFn: () => fetchJobDetails(props.params?.id),
    })

    const companyQuery = useQuery({
        queryKey: ['jobs',jobQuery?.data?.id, 'company'],
        enabled: jobQuery?.data?.companyName != null,
        queryFn: () => fetchCompanyDetails(jobQuery?.data?.companyName)
    })


    if(jobQuery.isPending) return <div>
        <div className="flex flex-col gap-4 w-52">
            {/* <div className="skeleton h-32 w-full"></div> */}
            <div className="skeleton h-4 w-28"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
        </div>
    </div>

    if(companyQuery.data) {
        console.log("COMPANY DATA->",companyQuery.data)
    }


    return(
        <>
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
                    {/* <p className='text-lg text-primary'>@{jobQuery.data.companyName}</p> */}
                    {companyQuery.isPending ? <p>Fetching company details...</p>
                    : <CompanyDetails company={companyQuery?.data}/>}
                </div>
                {/* <EditJob data={jobQuery.data}/> */}
            </div>

        </>
    )
}

export default JobPage;