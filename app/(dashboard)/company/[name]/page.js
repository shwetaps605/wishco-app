'use client'
import { useQuery } from '@tanstack/react-query'
import CompanyDetails from '../../../../components/CompanyDetails'
import { fetchCompanyDetails } from '../../../../utils/actions'


const CompanyDetailPage = ({params}) => {

    const companyQuery = useQuery({
        queryKey: [ 'company',params.name],
        queryFn: () => fetchCompanyDetails(params.name)
    })

    if(companyQuery.data) {
        console.log("COMPANYDATA-->",companyQuery.data)
    }
    
    return(
        <div>
            {/* <h1>Company Details for {params.name}</h1> */}

            {companyQuery.isPending ? <p>Fetching company details...</p>
            : <CompanyDetails company={companyQuery?.data}/>}
        </div>
    )
}

export default CompanyDetailPage;