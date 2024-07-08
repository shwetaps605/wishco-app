import { useRouter,useSearchParams, usePathname } from 'next/navigation'
import React, {useCallback} from 'react'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { filterJobs} from '../utils/actions';

const statusOptions = ['Applied','Offer','Interview','Rejected']
const FilterJobs = () => {

    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const queryClient = useQueryClient();

    const createQueryString = useCallback(
        (name, value) => {
          const params = new URLSearchParams(searchParams.toString())
          params.set(name, value)
          filterJobsQuery.mutate(params)
          return params.toString()
        },
        [searchParams]
      )

    const handleFilterQuery = (field,queryString) => {
        router.push(pathname + '?' + createQueryString(field,queryString),{ scroll: false });
    }

    const filterJobsQuery = useMutation({
        mutationFn: async (params) => {
            const response = await filterJobs(params)
            queryClient.setQueryData(['jobs'], () => response)
            //queryClient.in
        }
      })

    return(
    <div>
      {/* <h2 className='text-sm text-base-400 mb-2 opacity-40'>Filters</h2> */}
      <form className='flex gap-4'>
        <div className='join'>
            <label htmlFor="company" className='bg-base-100 join-item  flex justify-center align-middle text-center items-center pl-2'>
              <span className='text-xs mr-5'>Company Name</span>
            </label>
            <input 
              type='text' 
              name='company'
              required 
              className='join-item input bg-base-300'
              value={searchParams.get('companyName') ?? '' } 
              onChange={(e)=>handleFilterQuery('companyName',e.currentTarget.value)}/>
        </div>
        <div className='join'>
            <label htmlFor="role" className='bg-base-100 join-item  flex justify-center align-middle text-center items-center pl-2'>
              <span className='text-xs mr-5'>Role</span>
            </label>
            <input type='text' name='role' required value={searchParams.get('role') ?? '' }  className='join-item input bg-base-300' onChange={(e)=>handleFilterQuery('role',e.currentTarget.value)}/>
        </div>
      </form>
    </div>
    )
}


export default FilterJobs;