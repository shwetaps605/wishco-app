'use client'
import { useUser } from "@clerk/nextjs"
import CompanyTile from "../../components/CompanyTile"
import GridLayout from "../../layouts/GridLayout"
import AddCompany from "../../components/AddCompany"
import { useQuery } from "@tanstack/react-query"
import { findUser } from "../../utils/actions"
import SkeletonLoader from "../../components/SkeletonLoader"

import Head from "next/head"

const CompanyPage = () => {
    const userQuery = useUser();
    const { data, isPending , isError} = useQuery({
        queryKey: ['user', userQuery.user?.id],
        queryFn: () => findUser(userQuery.user?.id),
        enabled: userQuery.isLoaded
    });
    let renderedContent;

    if(isError|| data?.data?.companies !== undefined || data?.data?.companies?.length === 0 ) {
        renderedContent = <div>
            <h1 className="text-xl text-secondary m-auto">You have not wishlisted any companies yet.</h1>
        </div>
    }

    if(data?.data?.companies?.length > 0 ) {
        const companies = data.data?.companies;
        renderedContent = companies.map(company => {
                return <CompanyTile company={company} key={company.name}/>
        })
    }


    return(
        <>
            <Head>
                <link rel='icon' href='/fav.png' />
            </Head>
            <div>
                <AddCompany user={userQuery.user}/>
                {isPending ? <SkeletonLoader/> :  <GridLayout>{renderedContent}</GridLayout>}
            </div>
        </>
        
        
    )
}

export default CompanyPage;