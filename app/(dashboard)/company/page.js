import CompanyTile from "../../../components/CompanyTile"
const companyMock = [
    {
        name: 'LinkedIn',
        url: '',
        jobs: [],
        addedAt: Date.now()
    },
    {
        name: 'Google',
        url: '',
        jobs: [],
        addedAt: Date.now()
    },
    {
        name: 'Spinny',
        url: '',
        jobs: [],
        addedAt: Date.now()
    },
    {
        name: 'Meta',
        url: '',
        jobs: [],
        addedAt: Date.now()
    }
]
const CompanyPage = () => {
    return(
        <div>
            <h1 className="text-2xl text-primary">
                <span className="underline underline-offset-8"><span className="text-accent font-medium">Wish</span>listed</span> companies
            </h1>
            <div className="mt-10 grid grid-cols-[1fr,1fr,1fr,1fr] gap-5">
                {companyMock.map(company => {
                    return <CompanyTile company={company} key={company.name}/>
                })}

            </div>
        </div>
    )
}

export default CompanyPage;