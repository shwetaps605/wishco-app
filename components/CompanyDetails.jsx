import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { LuExternalLink } from "react-icons/lu";
import * as dayjs from 'dayjs'
import AddNewJobButton from "../components/AddJobButton"
import { useJobs } from '../app/hooks/useJobs';
import JobTile from './JobTile';
var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

const CompanyDetails = ({company}) => {

    const jobsDataQuery = useJobs([[]])
    let filteredJobs = [];
    if(jobsDataQuery.data) filteredJobs = jobsDataQuery.data.filter(job => job.companyName.toLowerCase() == company.name.toLowerCase());
        
  return (
    <>
    <AddNewJobButton companyName={company?.name}/>
    <div className='grid grid-cols-[2fr,2fr] w-full gap-5'>
        <div className='bg-base-100 px-5 py-3 rounded-xl shadow-lg mt-3'>
            <div className='flex flex-row justify-between items-center'>
                <div className='flex flex-row align-middle items-center mt-2'>
                    <Image 
                        src={company?.squareLogo}
                        height={30}
                        width={30}
                        className='w-30 h-30 rounded-full shadow-lg mr-2 object-scale-down'
                        alt={company?.name}
                    />
                    <div>
                        <p className='text-md'>
                            <a href={`https://${company?.website}`} target="_blank" className='hover:cursor-pointer' rel="noopener noreferrer">
                                {company?.name}
                            </a>
                        </p>
                        <p className='text-sm opacity-40'>{company.sectorName}</p>
                    </div>
                </div>
                <div className="rating">
                    <input type="radio" name="rating-4" className="mask mask-star-2 bg-orange-400" />
                    <input type="radio" name="rating-4" className="mask mask-star-2 bg-orange-400"  />
                    <input type="radio" name="rating-4" className="mask mask-star-2 bg-orange-400" checked/>
                    <input type="radio" name="rating-4" className="mask mask-star-2 bg-orange-400" />
                    <input type="radio" name="rating-4" className="mask mask-star-2 bg-orange-400" />
                </div>
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
                    <div className="chat-bubble mt-2 bg-base-200">
                        <p className='text-md text-info'>{company?.featuredReview?.headline}</p>
                        <span className='text-sm mr-2'>Pros: {company?.featuredReview?.pros}</span> 
                        <span className='text-sm'>Cons: {company?.featuredReview?.cons}</span> 
                    </div>
                </div>
            </div>
            : <h2 className='text-md text-'>No Featured reviews.</h2> }
        </div>
        
        <div className=' px-5 py-3 rounded-xl mt-3 grid grid-cols-[1fr,1fr,1fr] gap-2'> 
            <div className='bg-base-300 w-[50] h-[50] p-3 rounded-xl'>
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

    <div className='mt-10'>
       
        {
        jobsDataQuery.isPending ?
        <SkeletonLoader/>
        : 
        <div>
            <h1 className='mb-7 text-lg opacity-40'>{filteredJobs.length > 0 ? 'added jobs' : 'no added jobs' }</h1>
            <JobsComponent jobs={filteredJobs}/>
        </div>
        }
    </div>
    </>
    
  )
}

export default CompanyDetails