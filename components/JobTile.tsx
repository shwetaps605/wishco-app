import { GrLocation } from "react-icons/gr";
import { deleteJob, getAllJobs , redirectToJobPage, getJobsBasedOnCompanies,filterJobs} from '../utils/actions';
import { useMutation, useQueryClient } from "@tanstack/react-query";

const JobTile = ({job}) => {

    const queryClient = useQueryClient(); 

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
     <div key={job.id} className='px-5 py-3 border-2 border-base-100 shadow-md hover:shadow-lg rounded-lg hover:cursor-pointer'>
        <div>
          <div className='flex justify-between items-top align-middle'>
            <div className='items-center'>
              <h2 className='text-secondary text-md'>{job.jobTitle}</h2>
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