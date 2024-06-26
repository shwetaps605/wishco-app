import React from 'react'
import JobTile from './JobTile'
import GridLayout from '../layouts/GridLayout'

const JobsComponent = ({jobs}) => {
  return (
    <GridLayout>
      {jobs.map(job => <JobTile key={job.id} job={job}/>)}
    </GridLayout>
  )
}

export default JobsComponent