'use client'
import { redirectToCompanyDetailsPage } from "../utils/actions";
import * as dayjs from 'dayjs'
var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)
import { useJobs } from "../hooks/useJobs";

const CompanyTile = ({company}) => {

    const jobsDataQuery = useJobs([[]])

    const getJobsCount = () => {
        if(jobsDataQuery.data) return jobsDataQuery.data.filter(job => job.companyName.toLowerCase() == company.name.toLowerCase()).length;
    }

    const getSourceFromUrl = (url) => {
        console.log("urll-->",url)
        //const company = url.split('/')[2].split('.')[1]
        return "company"
    }

    return(
        <div className="px-5 py-3 border-2 border-base-100 shadow-md hover:shadow-lg rounded-lg hover:cursor-pointer" onClick={()=> redirectToCompanyDetailsPage(company.name)}>
            <div className="flex flex-row justify-between items-center">
                <h2 className="text-secondary text-md">{company.name}</h2>
                <p className="text-xs text-white opacity-40">{ getJobsCount()>0 ? `${getJobsCount()} job(s)` : 'No jobs'}</p>
            </div>
            <span className="text-xs mt-2 text-white opacity-20">wishlisted {dayjs(company.addedAt).fromNow()}</span>
            <p className="text-xs text-info opacity-55">sourced from <a className="capitalize hover:underline underline-offset-4" href={company?.url} target="_blank">{getSourceFromUrl(company.url)}</a></p>
        </div>
    )
}

export default CompanyTile;