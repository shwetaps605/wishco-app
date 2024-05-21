import React from 'react'
import { dehydrate, HydrationBoundary, QueryClient} from '@tanstack/react-query'
import JobsComponent from '../../../components/JobsComponent'

const JobifyPage = () => {
  const queryClient = new QueryClient()
  return(
    <HydrationBoundary state={dehydrate(queryClient)}>
      <JobsComponent/>
    </HydrationBoundary>
   
  )
 
}

export default JobifyPage