'use server'
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

export const addNewJob = async (prevState,formData) => {
    const job = Object.fromEntries(formData.entries())
    try {
        await prisma.jobApplication.create({
            data: {
                jobTitle: job.jobTitle,
                companyName: job.company,
                location: job.location,
                status: job.status,
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