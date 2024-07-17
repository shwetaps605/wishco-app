'use client'
import { useUser } from "@clerk/nextjs"
import { useMutation } from "@tanstack/react-query";
import { addCompanyForUser } from "../utils/actions";

const AddCompany = () => {
    const { user, isLoaded, isSignedIn} = useUser();
    console.log("Signed in user:", user)

    const getCompanyNameFromUrl = (url) => {
        return 'name';

    }


    const addCompanyQuery = useMutation({  
        mutationFn: async (url) => {
            const companyData = {
                name: getCompanyNameFromUrl(url) ,
                url: url,
                addedAt: Date.now(),
                jobs: [],
                userId: user.id
            }
            const userData = {
                name: user.fullName,
                userId: user.id
            }
            const payload = { userData, companyData}
            console.log("PAYLOAD-->", payload)
            const response = await addCompanyForUser(payload);
            console.log("RESPONSE", response)
        }
    });


    const onSubmitCompany = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        console.log("FORM DATA", formData)
        const url = Object.fromEntries(formData.entries()).companyUrl;
        console.log("URL-->", url)
        addCompanyQuery.mutate(url)
    }

    return(
        <form onSubmit={onSubmitCompany}>
            <input
            name="companyUrl"
            className="input input-bordered w-full max-w-full bg-base-300" 
            type="text"
            placeholder="paste linkedIn url"/>

        </form>
    )
}

export default AddCompany;