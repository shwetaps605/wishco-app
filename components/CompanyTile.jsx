'use client'
import { fetchCompanyDetails, redirectToCompanyDetailsPage } from "../utils/actions";
import * as dayjs from 'dayjs'
var relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

const CompanyTile = ({company}) => {
    return(
        <div className="px-5 py-3 border-2 border-base-100 shadow-md hover:shadow-lg rounded-lg hover:cursor-pointer" onClick={()=> redirectToCompanyDetailsPage(company.name)}>
            <p className="text-secondary text-md">{company.name}</p>
            <span className="text-xs mt-2 text-white opacity-20">wishlisted {dayjs(company.addedAt).fromNow()}</span>
        </div>
    )
}

export default CompanyTile;