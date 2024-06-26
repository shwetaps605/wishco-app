'use client'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import CompanyDetails from '../../../../components/CompanyDetails'
import { fetchCompanyDetails, getJobsBasedOnCompanies } from '../../../../utils/actions'


const CompanyDetailPage = ({params}) => {
    const companyQuery = useQuery({
        queryKey: ['companies',params.name],
        queryFn: async () => {
            const response = await fetchCompanyDetails(params.name)
            return response;
        }
    })

    return(
        <div>
            {companyQuery.isPending ? <div><span className='loading loading-dots loading-lg'></span></div>
            : <CompanyDetails company={companyQuery?.data}/>}
        </div>
    )
}

export default CompanyDetailPage;