import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { redirectToJobsPage, updateJob } from '../utils/actions'

const statusOptions = ['Applied','Offer','Interview','Rejected']


const EditJob = ({data}) => {

  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation({
    mutationFn: (formData) => updateJob(data.id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey:['jobs']})
      redirectToJobsPage();
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    //const job = Object.fromEntries(formData.entries())
    mutate(formData)
 }


  return (
    <form className='max-w-2xl mt-5' onSubmit={handleSubmit}>
        <div className='join w-full'>
            {/* <label htmlFor="status" className='bg-base-300 join-item flex justify-center align-middle text-center items-center pl-2'>
                <span className='text-sm mr-5'>Update status</span>
            </label> */}
            <select name="status" id="status" className="select select-accent input-bordered w-full join-item max-w-sm">
                {statusOptions.map(option => <option key={option} defaultValue={data.status} value={option} selected={data.status === option} > 
                    {option}
                </option>)}
            </select>
            <button type='submit' className="btn btn-accent join-item">Update</button>
        </div>
        
    </form>

  )
}

export default EditJob