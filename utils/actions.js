'use server'
import { redirect } from "next/navigation"
import prisma from "./db"

export const generateChatResponse = async (chatMessage) => {
    await new Promise((resolve,reject) => setTimeout(resolve,1200))
    console.log(chatMessage)
    return { role: 'assistant',content: 'awesome'}
}

export const getAllJobs = async () => {
    return await prisma.jobApplication.findMany({orderBy: {
        createdAt: 'desc'
    }});
}

export const findCompany = async companyName => {
    try {
        const companyResponse = await prisma.company.findFirst({
            where: {
                name: {
                    startsWith: companyName
                }
            },
            include: {
                jobs: true
            }
        });
        return { message: 'Company found!', data: companyResponse}
    } catch(err) {
        return { message:'Company not found', data: null}
    }
}

export const addNewJob = async (formData) => {
    const job = Object.fromEntries(formData.entries())
    const existingCompany = await findCompany(job.company);
    const companyId = existingCompany.data?.id;

    try {
        const updatingCompanyResponse = await prisma.jobApplication.create({
            data: {
                jobTitle: job.jobTitle,
                companyName: job.company,
                location: job.location,
                status: job.status.charAt(0).toUpperCase()+job.status.slice(1),
                jobUrl: job.jobUrl,
                wishlisted: false,
                company: {
                    connectOrCreate: {
                        where: {
                            id: companyId,
                            name: job.company
                        },
                        create: {
                            name: job.company,
                            url: `https://www.linkedin.com/company/${job.company}/`,
                            user: {
                                connect: {
                                    userId: 'user_2gGhfNmDBp8QMs7eZwTgCsA5C43'
                                }
                            }
                        }
                    }
                }
            },
            
        });

        //const updatingCompanyResponse = await findCompany(job.company)


        console.log("COMPANY UPDATED WITH JOB-->", updatingCompanyResponse)
        return { message: 'success',data: updatingCompanyResponse}

    }catch(err) {
        console.log("SOMETHING FAILED--->",err)
        return { message: 'failed to add job',data: null, error:err}
    }
    //return { message: 'success'}
// } catch (error) {
//     return { message: 'error'}
// }
}

export const deleteJob = async id => {
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
    console.log('DICT-->',dict)
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
    redirect(`/jobs/${id}`)
}

export const redirectToJobsPage = id => {
    redirect(`/jobs`)
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
    let user = null;
    const existingUserResponse = await findUser(payload.userData.userId)
    user = existingUserResponse.data;
    if(user === null) {
        const newUserResponse = await addNewUser(payload.userData)
        user = newUserResponse.data;
    }
    
    let existingCompany = await findCompany(payload.companyData.name);
    if(existingCompany.data !== null) {
        return { message:'Company already exists!', data: existingCompany.data}
    }

    
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
        return { message:'Company added successfully!', data: updateUserResponse}
    }catch(e) {
        return { message: 'Company could not be added', data: e.message}
    }
    
    
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