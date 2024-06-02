import React from 'react'

const CompanyDetails = ({company}) => {
  return (
    <div>
        <span className='text-xl text-secondary'>{company.name}</span>
        <p>{company.overallRating}</p>
    </div>
  )
}

export default CompanyDetails