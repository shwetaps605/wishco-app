

import React from 'react'
import AddJobForm from '../../../../components/AddJobForm'
import { Suspense } from 'react'

function NewJobFallback() {
  return <>Loading...</>
}

const NewJob = () => {
    return (
        <>
          <Suspense fallback={<NewJobFallback/>}>
            <AddJobForm />
          </Suspense>
        </>
      )
}

export default NewJob