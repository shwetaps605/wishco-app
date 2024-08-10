'use client'
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCompanyForUser } from "../utils/actions";

const AddCompany = ({user}) => {

    const queryClient = useQueryClient();

    const getCompanyNameFromUrl = (url) => {
        const formattedURL = url.trim().split('/')
        const previousIndex = formattedURL.findIndex(val => val === 'company')
        let companyName = formattedURL[previousIndex+1]
        if(companyName.includes('-')) {
            companyName = companyName.trim().split('-').join(' ')
            companyName = companyName[0].toUpperCase() + companyName.slice(1)
        }
        return companyName;
    }


    const addCompanyQuery = useMutation({  
        mutationFn: async (url) => {
            const companyData = {
                name: getCompanyNameFromUrl(url) ,
                url: url,
                addedAt: new Date().toISOString(),
                jobs: [],
                userId: user.id
            }
            const userData = {
                name: user.fullName,
                userId: user.id
            }
            const payload = { userData, companyData}
            const response = await addCompanyForUser(payload);
            console.log("RESPONSE", response);
            if(response.data != null) {
                //Company was added succesfully for the user
                //invalidate the cache for user
                queryClient.invalidateQueries({ queryKey:['user', user?.id]})
            }
        }
    });


    const onSubmitCompany = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const url = Object.fromEntries(formData.entries()).companyUrl;
        if(url.length > 0)
        {
            addCompanyQuery.mutate(url)
        } 
        
    }

    return(
        <form onSubmit={onSubmitCompany}>
            <input
            required
            name="companyUrl"
            className="input input-bordered w-full max-w-full bg-base-300" 
            type="text"
            placeholder="paste linkedIn url"/>

        </form>
    )
}

export default AddCompany;