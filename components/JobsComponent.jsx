import React from 'react'
import JobTile from './JobTile'
import GridLayout from '../layouts/GridLayout'
import AddNewJobButton from './AddJobButton'

const JobsComponent = ({jobs,preSelectedCompany}) => {
  if(!jobs || jobs?.length === 0) {
    return <div className='flex flex-col w-full align-middle items-center justify-between '>
      <h1 className='text-2xl text-white opacity-20 pointer-events-none mb-5'>add your first job</h1>
      <AddNewJobButton companyName={preSelectedCompany ? preSelectedCompany : ''}/>
    </div>
  }
  return (
    <GridLayout>
      {jobs?.map(job => <JobTile key={job.id} job={job}/>)}
    </GridLayout>
  )
}

export default JobsComponent