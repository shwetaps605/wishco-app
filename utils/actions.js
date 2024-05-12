'use server'

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