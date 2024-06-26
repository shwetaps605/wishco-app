import { GrLocation } from "react-icons/gr";
import { deleteJob} from '../utils/actions';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { FiLink } from "react-icons/fi";

const JobTile = ({job}) => {

    const queryClient = useQueryClient(); 

    const router = useRouter();

    const deleteJobQuery = useMutation({
        mutationFn: async id => {
          const reponse = await deleteJob(id);
          if(reponse.message === 'success') {
            queryClient.invalidateQueries({ queryKey:['jobs']})
          } else {
          }
        },
        onMutate: (obj) => {
          console.log("On Mutate", obj)
        },
        onSuccess: (res) => {
        }
      })

    
  const handleDeleteOption = (jobId) => {
    if(jobId != null) {
      deleteJobQuery.mutate(jobId);
      queryClient.invalidateQueries({ queryKey:['jobs'] });
    }
  }
    return(
     <div className='px-5 py-3 border-2 border-base-100 shadow-md hover:shadow-lg rounded-lg'>
        <div>
          <div className='flex justify-between items-top align-middle'>
            <div className='items-center'>
              <div className='join'>
                        <h1 className='text-secondary text-md mr-1 capitalize join-item'>{job.jobTitle}</h1>
                        {
                            job.jobUrl.length > 0 ? <div className='join-item flex items-center'>
                                <a href={job.jobUrl} target="_blank"><FiLink className='text-accent text-sm'/></a>
                            </div> : null
                        }
                    </div>
              <p className='text-md text-info opacity-55'>@{job.companyName}</p>
              <div className='mt-2 flex align-middle items-center text-slate-500 text-sm'>
                <GrLocation className='mr-1'/>
                {job.location ? job.location : 'Not Available'}
                </div>
            </div>
            <div className={`text-white opacity-40 text-xs`}>{job.status}</div>
          </div>
        </div>
      </div>
    )
}

export default JobTile;