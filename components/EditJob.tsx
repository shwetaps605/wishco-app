import React from 'react'

const statusOptions = ['Applied','Offer','Interview','Rejected']


const EditJob = ({data}) => {

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const job = Object.fromEntries(formData.entries())
    console.log("KEYSS",job)
 }

  return (
    <form className='max-w-2xl mt-5' onSubmit={handleSubmit}>
        <div className='join w-full'>
            <label htmlFor="status" className='bg-base-300 join-item flex justify-center align-middle text-center items-center pl-2'>
                <span className='text-sm mr-5'>Update status</span>
            </label>
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