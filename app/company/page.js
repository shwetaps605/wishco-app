'use client'
import { useUser } from "@clerk/nextjs"
import CompanyTile from "../../components/CompanyTile"
import GridLayout from "../../layouts/GridLayout"
import AddCompany from "../../components/AddCompany"
import { useQuery } from "@tanstack/react-query"
import { findUser } from "../../utils/actions"

const companyMock = [
    {
        name: 'LinkedIn',
        url: 'https://www.linkedin.com/company/leap-global-education/',
        jobs: [],
        addedAt: Date.now()
    },
    {
        name: 'Google',
        url: 'https://www.linkedin.com/company/google/',
        jobs: [],
        addedAt: Date.now()
    },
    {
        name: 'Spinny',
        url: 'https://www.linkedin.com/company/spinny/',
        jobs: [],
        addedAt: Date.now()
    },
    {
        name: 'Meta',
        url: 'https://www.linkedin.com/company/meta/',
        jobs: [],
        addedAt: Date.now()
    }
]

const CompanyPage = () => {

    const userQuery = useUser();
    const { data, isPending , isError} = useQuery({
        queryKey: ['user', userQuery.user?.id],
        queryFn: () => findUser(userQuery.user?.id),
        enabled: userQuery.isLoaded
    });

    let renderedContent;
//     renderedContent = companyMock.map(company => {
//         return <CompanyTile company={company} key={company.name}/>  
// })

    if(isPending) {
        renderedContent = <div>
            <h1 className="text-xl text-primary m-auto">Loading Companies For user</h1>
        </div>
    }

    if(isError|| data?.data?.companies !== undefined || data?.data?.companies?.length === 0 ) {
        renderedContent = <div>
            <h1 className="text-xl text-secondary m-auto">You have not wishlisted any companies yet.</h1>
        </div>
    }

    if(data?.data?.companies?.length > 0 ) {
        const companies = data.data?.companies;
        console.log("COMPANIES ADDED FOR USER:-->", companies)
        renderedContent = companies.map(company => {
                return <CompanyTile company={company} key={company.name}/>
        })
    }


    return(
        <div>
            <AddCompany user={userQuery.user}/>
            <GridLayout>
               {renderedContent}
            </GridLayout>

        </div>
        
    )
}

export default CompanyPage;