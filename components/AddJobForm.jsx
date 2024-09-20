'use client'
import React from 'react'
import { addNewJob,redirectToJobsPage } from '../utils/actions'
import toast from 'react-hot-toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'

const AddJobForm = () => {

  const companyParams = useSearchParams();
  let company = companyParams.get('company')
  if(company) {
    company = company[0].toUpperCase() + company.slice(1);
  }
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (formData) => addNewJob(formData),
    onSuccess: (response) => {
      if(response.message === 'success') {
            toast.success(response.message);
            invalidateQueries().then(()=>{
              redirectToJobsPage();
            })
          } else {
            toast.error('Job could not be added')
          }
    }
  })

  const invalidateQueries = () => {
    return new Promise((resolve,reject) => {
      queryClient.invalidateQueries({queryKey:['jobs']})
      resolve();
    })
  }

  const handleSubmit = e => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    mutate(formData);
  }

  return (
    <form className='max-w-2xl' onSubmit={handleSubmit}>
        <h2 className='text-xl text-accent'>
            Add a new job
        </h2>
        <div className='join w-full mt-10'>
            <label htmlFor="jobTitle" className='bg-base-300 join-item flex justify-center align-middle text-center items-center pl-2 w-[50%]'>
              <span className='text-sm mr-5'>Enter job title</span>
            </label>
            <input type='text' name='jobTitle' required className='join-item input input-bordered w-full  '/>
        </div>

        <div className='join w-full mt-5'>
            <label htmlFor="company" className='bg-base-300 join-item  flex justify-center align-middle text-center items-center pl-2 w-[50%]'>
              <span className='text-sm mr-5'>Company Name</span>
            </label>
            <input type='text' name='company' required className='join-item input input-bordered w-full' value={company ? company : null}/>
        </div>

        <div className='join w-full mt-5'>
            <label htmlFor="jobUrl" className='bg-base-300 join-item  flex justify-center align-middle text-center items-center pl-2 w-[50%]'>
              <span className='text-sm mr-5'>JD link?</span>
            </label>
            <input type='text' name='jobUrl' className='join-item input input-bordered w-full '/>
        </div>

        <div className='join w-full mt-5'>
            <label htmlFor="location" className='bg-base-300 join-item  flex justify-center align-middle text-center items-center pl-2 w-[50%]'>
              <span className='text-sm mr-5'>Location</span>
            </label>
            <input type='text' name='location' className='join-item input input-bordered w-full  '/>
        </div>

        <div className='join w-full mt-5'>
            <label htmlFor="status" className='bg-base-300 join-item  flex justify-center align-middle text-center items-center pl-2  w-[50%]'>
              <span className='text-sm mr-5'>Status</span>
            </label>
            
            <select name="status" id="status" className='join-item select input-bordered w-full' defaultValue={'DEFAULT'}>
              <option disabled value='DEFAULT'>Choose here 👇</option>
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
            </select>
        </div>

        <button className='btn btn-secondary mt-10' type='submit' disabled={isPending}>
          {isPending ? 'Adding job...' : 'Add job'}
        </button>

    </form>
  )
}

export default AddJobForm