import Link from 'next/link';

const AddNewJobButton = ({companyName}) => {
    const getLink = () => companyName ? `?company=${companyName}` : ''
    return(
        <div>
            <Link href={`/jobs/new-job${getLink()}`}>
            <button className='btn btn-primary btn-outline btn-sm mr-5'>Add Job</button>
        </Link>
        </div>
        
    )
}

export default AddNewJobButton;