'use client'
import { useQuery } from '@tanstack/react-query'
import EditJob from '../../../../components/EditJob'
import { fetchJobDetails } from '../../../../utils/actions'
import { getBadgeColor} from '../../../../utils/utilities'


const JobPage = (props) => {
    const {data, isPending} = useQuery({
        queryKey: ['jobs',props?.params?.id],
        queryFn: () => fetchJobDetails(props.params?.id),
    })


    if(isPending) return <div>
        <div class="flex flex-col gap-4 w-52">
            {/* <div class="skeleton h-32 w-full"></div> */}
            <div class="skeleton h-4 w-28"></div>
            <div class="skeleton h-4 w-full"></div>
            <div class="skeleton h-4 w-full"></div>
        </div>
    </div>

    console.log("job repsonse data...",data)

    return(
        <>
            {/* <EditJob/> */}
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

                <div className='mt-5'>
                    Update status
                    <select class="select select-accent w-full max-w-xs">
                        <option disabled selected>Dark mode or light mode?</option>
                        <option>Auto</option>
                        <option>Dark mode</option>
                        <option>Light mode</option>
                    </select>
                </div>
                


            </div>

        </>
    )
}

export default JobPage;