"use client"
import Link from 'next/link';

const AddNewJobButton = ({companyName}) => {
    console.log("COMPANY NAME-->",companyName)
    const getLink = () => companyName ? `?company=${companyName.toLowerCase()}` : ''
    return(
        <div>
            <Link href={`/jobs/new-job${getLink()}`}>
            <button className='btn btn-primary btn-outline btn-sm mr-5'>Add Job</button>
        </Link>
        </div>
        
    )
}

export default AddNewJobButton;