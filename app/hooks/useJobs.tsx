import { useQuery } from "@tanstack/react-query";
import { filterJobs, getJobsBasedOnCompanies } from "../../utils/actions";


export const useJobs = (params) => useQuery({
    queryKey: ['jobs'],
    queryFn: () => filterJobs(params)
    
})

export const useJobsForCompanies = name => useQuery({
    queryKey: ['jobs'],
    queryFn: () => getJobsBasedOnCompanies(name)
})