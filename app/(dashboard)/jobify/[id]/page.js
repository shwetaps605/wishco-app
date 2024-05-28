'use client'
import { useQuery } from '@tanstack/react-query'
import EditJob from '../../../../components/EditJob'
import { fetchJobDetails, redirectToJobsPage } from '../../../../utils/actions'
import { useEffect, useState } from 'react'


const JobPage = (props) => {
    const [status,setStatus] = useState("");

    const {data, isPending} = useQuery({
        queryKey: ['jobs',props?.params?.id],
        queryFn: () => fetchJobDetails(props.params?.id),
    
    })

    useEffect(()=>{
        console.log("DATA-->",data)
        if(data != undefined) {
            console.log(data.status)
            setStatus(data.status)
            console.log('status added -->',status)
        }
       
    },[data])


    if(isPending) return <div>
        <div className="flex flex-col gap-4 w-52">
            {/* <div className="skeleton h-32 w-full"></div> */}
            <div className="skeleton h-4 w-28"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
        </div>
    </div>


   

    const viewOption = obj => {
        
    }

    return(
        <>
            {/* <EditJob/> */}
            <button className='mb-5 btn btn-accent btn-md' onClick={()=>redirectToJobsPage()}>Back to Jobs</button>
            <div className='flex flex-col mb-5'>
                <div>
                    <span>
                        <h1 className='text-2xl mr-1 capitalize'>{data.jobTitle}</h1>
                        {data.jobUrl ?? 
                            <a href={data.jobUrl} title='View Job'/>
                        }
                    </span>
                    <p className='text-lg text-primary'>@{data.companyName}</p>
                </div>

                {/* <p className='text-secondary'>Added at: {data.createdAt.getTime().toLocaleString()}</p> */}

                <EditJob data={data}/>

                

               
                


            </div>

        </>
    )
}

export default JobPage;