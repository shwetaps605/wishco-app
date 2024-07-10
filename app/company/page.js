import CompanyTile from "../../components/CompanyTile"
import GridLayout from "../../layouts/GridLayout"
import AddCompany from "../../components/AddCompany"

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
    return(
        <div>
            <AddCompany/>
            <GridLayout>
                {companyMock.map(company => {
                    return <CompanyTile company={company} key={company.name}/>
                })}
            </GridLayout>

        </div>
        
    )
}

export default CompanyPage;