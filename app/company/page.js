import CompanyTile from "../../components/CompanyTile"
import GridLayout from "../../layouts/GridLayout"
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


import { useUser } from "@clerk/nextjs"

const CompanyPage = () => {
    const { user, isLoaded, isSignedIn} = useUser();
    console.log("Signed in user:", user)




    return(
        <GridLayout>
            {companyMock.map(company => {
                return <CompanyTile company={company} key={company.name}/>
            })}
        </GridLayout>
    )
}

export default CompanyPage;