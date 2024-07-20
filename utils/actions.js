'use server'
import { redirect } from "next/navigation"
import prisma from "./db"

export const generateChatResponse = async (chatMessage) => {
    await new Promise((resolve,reject) => setTimeout(resolve,1200))
    console.log(chatMessage)
    return { role: 'assistant',content: 'awesome'}
}


export const getExistingTour = async ({city,country}) => {
    return null
}

export const generateTourResponse = async ({city,country}) => {
    return null
}

export const createNewTour = async tour => {
    return null
}

export const getAllTours = async searchTerm => {
    if(!searchTerm) {
    }

}

export const getAllJobs = async () => {
    return await prisma.jobApplication.findMany({orderBy: {
        createdAt: 'desc'
    }});
}

// export const addNewJob = async (prevState,formData) => {
//     const job = Object.fromEntries(formData.entries())
//     try {
//         await prisma.jobApplication.create({
//             data: {
//                 jobTitle: job.jobTitle,
//                 companyName: job.company,
//                 location: job.location,
//                 status: job.status,
//                 jobUrl: job.jobUrl
//             }
//         });
//         return { message: 'success'}
//     } catch (error) {
//         return { message: 'error'}
//     }
// }

export const addNewJob = async (formData) => {
    const job = Object.fromEntries(formData.entries())
    try {
        await prisma.jobApplication.create({
            data: {
                jobTitle: job.jobTitle,
                companyName: job.company,
                location: job.location,
                status: job.status.charAt(0).toUpperCase()+job.status.slice(1),
                jobUrl: job.jobUrl
            }
        });
        return { message: 'success'}
    } catch (error) {
        return { message: 'error'}
    }
}

export const deleteJob = async id => {
    //await new Promise((resolve,reject) => setTimeout(resolve,1200))
    try {
        await prisma.jobApplication.delete({
            where: {
                id: id
            }
        });
        return { message: 'success'}
    } catch(err) {
        return { message: 'error' }

    }
}

export const fetchJobDetails = async id => {
    try {
        const jobResponse = await prisma.jobApplication.findUnique({
            where: {
                id: id
            }
        });
        return jobResponse;
    } catch(err) {
        return null;
    }
}

export const updateJob = async (id,formData) => {
    const jobStatus = Object.fromEntries(formData.entries()).status;
    try {
        await prisma.jobApplication.update({
            where: {
                id: id
            },
            data : {
                status: jobStatus
            }
        });
        return { message: 'success'}
    } catch(err) {
        return { message: 'error'}
    }
}

export const getJobsBasedOnCompanies = async (name) => {
    try{
        const jobsResponse = await prisma.jobApplication.findMany({
            where: {
                companyName: {
                    equals: name,
                }
            }
        })
        return { message: 'success', data:jobsResponse}
    }
    catch(err) {
        return { message: 'Error', data: null}
    }
}

export const filterJobs = async (queryParams) => {
    console.log('filter params->',queryParams)
    let dict = {}
    queryParams.forEach(query => {
        dict[query[0]] = query[1]
    })
    try{
        const jobsResponse = await prisma.jobApplication.findMany({
            where: {
                companyName: {
                    startsWith: dict['companyName']
                },
                jobTitle: {
                    startsWith: dict['role']
                },
                status : {
                    equals: dict['status']
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        })
        return jobsResponse
    }
    catch(err) {
        return null
    }
}

export const redirectToJobPage = id => {
    redirect(`/jobify/${id}`)
}

export const redirectToJobsPage = id => {
    redirect(`/jobify`)
}

export const redirectToCompanyDetailsPage = name => {
    redirect(`/company/${name}`)
}

export const fetchCompanyDetails = async companyName => {
    
    try {
        const response = await fetch(`http://api.glassdoor.com/api/api.htm?v=1&format=json&t.p=102567&t.k=bEJk395y8Qe&action=employers&q=${companyName}`);
        const companyData = await response.json();
        return companyData.response?.employers[0];
    }catch(err) {
        console.log("ERROR")
    }
    
}

export const addCompanyForUser = async payload => {
    console.log("PAYLOADDD-->", payload)
    const companyData = payload.compnayData
    await loadCompaniesForUser(payload.userData.userId)
    // const data = {
    //     userId: payload.userData.userId,
    //     name:  payload.userData.name,
    //     companies: [...companies,companyData]
    // }
    // console.log("ADD USER DATA...", data)
    // try {
    //     await prisma.user.create({
    //         data: {
    //             userId: payload.userData.userId,
    //             name:  payload.userData.name,
    //         }

    //     })
    // } catch(err) {
        return { message: 'err'}
    //}
}

export const loadCompaniesForUser = async userId => {
    try {
        const response = await prisma.user.findUnique({
            where:{
                userId: userId
            }
        })
        console.log('RESPONSE-->',response)
    }
    catch(err){
        console.log('ERROR-->',err)
    }
}