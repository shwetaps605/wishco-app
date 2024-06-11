import CompanyTile from "../../../components/CompanyTile"
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
        <div className="mt-10 grid grid-cols-[1fr,1fr,1fr,1fr] gap-5">
            {companyMock.map(company => {
                return <CompanyTile company={company} key={company.name}/>
            })}
        </div>
    )
}

export default CompanyPage;