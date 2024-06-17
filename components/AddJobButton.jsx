import Link from 'next/link';

const AddNewJobButton = ({companyName}) => {
    const getLink = () => companyName ? `?company=${companyName}` : ''
    return(
        <Link href={`/jobify/new-job${getLink()}`}>
            <button className='float-right btn btn-primary btn-outline btn-sm mr-5'>Add Job</button>
        </Link>
    )
}

export default AddNewJobButton;