import Image from 'next/image'
import React from 'react'
import { FaRegUser } from "react-icons/fa6";
import { LuExternalLink } from "react-icons/lu";
import * as dayjs from 'dayjs'
var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

const CompanyDetails = ({company}) => {
  return (
    <div className='w-[60%] bg-base-100 px-5 py-3 rounded-xl shadow-lg mt-3'>
        <div className='flex flex-row align-middle items-center mt-2'>
            <Image 
                src={company?.squareLogo}
                height={30}
                width={30}
                className='w-30 h-30 rounded-full shadow-lg mr-2 object-scale-down'
                alt={company?.name}
            />
            <div>
            <p className='text-md'>{company.name}</p>
            <p className='text-sm opacity-40'>{company.sectorName}</p>


            </div>
        </div>
        {/* <p>{company.overallRating}</p> */}
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
                <div className='join hover:underline underline-offset-2'>
                    {/* <h2 className='text-xs text-accent join-item mr-2'>See review</h2> */}
                    <a href={company?.featuredReview?.attributionURL} target="_blank"><LuExternalLink className='text-accent hover:cursor-pointer'/></a>
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
  )
}

export default CompanyDetails