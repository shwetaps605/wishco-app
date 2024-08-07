'use server'
import { redirect } from "next/navigation"
import prisma from "./db"
import { create } from "domain"

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
    let user = null;
    //const companyData = payload.compnayData
    const existingUserResponse = await findUser(payload.userData.userId)
    user = existingUserResponse.data;
    if(user === null) {
        const newUserResponse = await addNewUser(payload.userData)
        user = newUserResponse.data;
        
    }
    //Here user is either existing user or new user
    console.log("USER DATA-->", user)

    let companies = null;

    if(typeof(user.companies) === 'undefined') {
        //it's a new user with no companies
        companies = [payload.companyData]
    } else {
        const existingCompanies = user.companies;
        companies = [...existingCompanies,payload.companyData ]
    }

    console.log("Adding companies-->", companies)

    try {
        const updateUserResponse = await prisma.user.update({
            where: {
                userId: payload.userData.userId
            },
            data: {
                companies: {
                    create: [
                    {
                        name: payload.companyData.name,
                        url: payload.companyData.url,
                        addedAt: payload.companyData.addedAt,
                        jobs: {
                            create: []
                        }
                    }]
                }
            },
            include: {
                companies: {
                    include: {
                        jobs: true
                    }
                }
            }
        })
        console.log("USER UPDATED SUCCESSFULLY", updateUserResponse)
    }catch(e) {
        console.log("USER UPDATE FAILED with error", e)
    }
    
    
        return { message: 'err'}
}

export const findUser = async userId => {
    console.log('Getting Existing User')
    try {
        const response = await prisma.user.findUnique({
            where:{
                userId: userId
            },
            include: {
                companies: true
            }
        })
        return { message: 'Companies loaded for user successfully', data: response}
    }
    catch(err){
        return { message: 'Companies not loaded for user', data: null}
    }
}

export const addNewUser = async userPayload => {
    console.log('Adding New User')
    try{
        const response = await prisma.user.create({
            data: {
                userId: userPayload.userId,
                name: userPayload.name,
                companies: {
                    create: []
                }
            },
            include: {
                companies: true
            }
        })

        return { message: 'User added successfully', data: response}
    }
    catch(e) {
        return { message: 'Error occured while adding user', data: e}
    }
}