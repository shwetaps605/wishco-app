import Image from 'next/image'
import React from 'react'

const CompanyDetails = ({company}) => {
  return (
    <div>
        <div className='flex flex-row align-middle items-center mt-2'>
            <Image 
                src={company?.squareLogo}
                height={30}
                width={30}
                className='w-30 h-30 rounded-full shadow-lg mr-2'
                alt={company?.name}
            />
            <p className='text-md text-secondary'>{company.name}</p>
        </div>
        {/* <p>{company.overallRating}</p> */}
        {company?.featuredReview ? 
        <div className='flex flex-col px-5 py-2 bg-base-200 mt-5'>
        <h2 className='text-md text-primary'>Featured review</h2>
        <div className='chat chat-start mt-4'>
            <div className="chat-header">
                {company?.featuredReview?.jobTitle} | {company?.featuredReview?.location}
                <time className='text-xs opacity-50'>{company?.featuredReview?.reviewDateTime}</time>
            </div> 
            <div className="chat-bubble mt-2">
                <p className='text-lg text-slate-100'>{company?.featuredReview?.headline}</p>
                <span className='text-success text-sm mr-2'>Pros: {company?.featuredReview?.pros}</span> 
                <span className='text-error text-sm'>Cons: {company?.featuredReview?.cons}</span> 
            </div>
        </div>
    </div>
    : <h2 className='text-md text-'>No Featured reviews.</h2> }
        
    </div>
  )
}

export default CompanyDetails