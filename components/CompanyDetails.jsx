import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { LuExternalLink } from "react-icons/lu";
import * as dayjs from 'dayjs'
import AddNewJobButton from "./AddJobButton"
import { useJobs } from '../hooks/useJobs';
var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)
import JobsComponent from './JobsComponent';
import SkeletonLoader from './SkeletonLoader';
import RatingComponent from "./RatingComponent";

const CompanyDetails = ({company}) => {

    const jobsDataQuery = useJobs([[]])
    let filteredJobs = [];
    if(jobsDataQuery.data) filteredJobs = jobsDataQuery.data.filter(job => job.companyName.toLowerCase() == company.name.toLowerCase());
        
  return (
    <>
        <div className='grid lg:grid-cols-[2fr,2fr] md:grid-cols-1 w-full gap-10 mt-5 '>
            <div className='bg-base-100 px-5 py-5 rounded-xl shadow-lg sm:border'>
                <div className='flex flex-row justify-between items-center gap-4'>
                    <div className='flex flex-row align-middle items-center gap-4'>
                        <Image 
                            src={company?.squareLogo}
                            height={30}
                            width={30}
                            className='w-30 h-30 rounded-full shadow-lg object-scale-down'
                            alt={company?.name}
                        />
                        <div>
                            <p className='sm:text-sm text-md lg:text-md'>
                                <a href={`https://${company?.website}`} target="_blank" className='hover:cursor-pointer' rel="noopener noreferrer">
                                    {company?.name}
                                </a>
                            </p>
                            <p className='text-sm md:text-sm opacity-40'>{company.sectorName}</p>
                        </div>
                    </div>
                    <RatingComponent rating={company?.overallRating}/>
                </div>
            
            {company?.featuredReview ? 
            <div className='flex flex-col mt-5'>
                <div className='chat chat-start mt-4 w-full'>
                    {/* <div class="chat-image">
                        <div class="w-12 h-12 bg-base-300 flex items-center justify-center rounded-full">
                            <FaRegUser/>
                        </div>
                    </div> */}
                    <div className="chat-header flex flex-row justify-between items-center gap-2">
                        <div>
                            <span className='text-xs mr-2'>{company?.featuredReview?.jobTitle} | {company?.featuredReview?.location}</span>
                            <time className='text-xs opacity-50'>{dayjs(company?.featuredReview?.reviewDateTime).fromNow()}</time>
                        </div>
                        <div className='join'>
                            <a href={company?.featuredReview?.attributionURL} target="_blank" rel="noopener noreferrer"><LuExternalLink className='text-accent hover:cursor-pointer'/></a>
                        </div>
                    </div> 
                    <div className="chat-bubble mt-3 bg-base-200">
                        <p className='text-md sm:text-sm text-info'>{company?.featuredReview?.headline}</p>
                        <span className='text-sm mr-2'>Pros: {company?.featuredReview?.pros}</span> 
                        <span className='text-sm'>Cons: {company?.featuredReview?.cons}</span> 
                    </div>
                </div>
            </div>
            : <h2 className='text-md'>No Featured reviews.</h2> }
        </div>
        
        <div className='grid lg:grid-cols-[1fr,1fr,1fr] md:grid-cols-[2fr,2fr] grid-cols-[2fr,2fr] gap-4 md:gap-2'> 
            <div className='bg-base-300 w-[50] h-[50] p-3 rounded-md'>
                    <h2 className='text-accent text-sm'>Work Life Balance rating</h2>
                    <p>{company?.workLifeBalanceRating}</p>
            </div>
            <div className='bg-base-300 w-[50] h-[50] p-3 rounded-md'>
                    <h2 className='text-accent text-sm'>Culture and Values rating</h2>
                    <p>{company?.cultureAndValuesRating}</p>
            </div>
            <div className='bg-base-300 w-[50] h-[50] p-3 rounded-md'>
                    <h2 className='text-accent text-sm'>Culture and Values rating</h2>
                    <p>{company?.cultureAndValuesRating}</p>
            </div>
            <div className='bg-base-300 w-[50] h-[50] p-3 rounded-md'>
                    <h2 className='text-accent text-sm'>Culture and Values rating</h2>
                    <p>{company?.cultureAndValuesRating}</p>
            </div>
            <div className='bg-base-300 w-[50] h-[50] p-3 rounded-md'>
                    <h2 className='text-accent text-sm'>Culture and Values rating</h2>
                    <p>{company?.cultureAndValuesRating}</p>
            </div>
            <div className='bg-base-300 w-[50] h-[50] p-3 rounded-md'>
                    <h2 className='text-accent text-sm'>Culture and Values rating</h2>
                    <p>{company?.cultureAndValuesRating}</p>
            </div>

        </div>
    </div>

    <div className='mt-10 min-h-40'>
       
        {
        jobsDataQuery.isPending ?
        <SkeletonLoader/>
        : 
        <div className=''>
            {filteredJobs.length > 0 && 
                <div className='flex flex-row justify-between w-full'>
                    <h1 className='mb-7 text-lg opacity-40'>added jobs</h1>
                    <AddNewJobButton companyName={company?.name}/>
                </div>
            }
            <JobsComponent jobs={filteredJobs} preSelectedCompany={company?.name}/>
        </div>
        }
    </div>
    </>
    
  )
}

export default CompanyDetails