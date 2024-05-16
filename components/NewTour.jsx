'use client'
import TourInfo from './TourInfo';
import { generateTourResponse, getExistingTour, createNewTour} from "../utils/actions"
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const NewTour = () => {

    const queryClient = useQueryClient();

    const { mutate, isPending , data} = useMutation({
        mutationFn: async (destination) => {
            const existingTour = await getExistingTour(destination);
            if(existingTour) return existingTour;

            const newTour = await generateTourResponse(destination);
            if(newTour) {
                const response = await createNewTour(newTour);
                queryClient.invalidateQueries({ queryKey:['tours'] });
                return newTour
            }
            console.log('tour response-->', newTour)
            toast.error('No matching city found...')
            return null
        },
        onSuccess: () => {

        }
    })


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e);
        const formData = new FormData(e.currentTarget);
        const destination = Object.fromEntries(formData.entries());
        mutate(destination)
    }

    if(isPending) {
        return <span className='loading loading-lg'></span>
    }


  return (
    <>
    <form onSubmit={handleSubmit} className='max-w-2xl'>
        <h2 className='mb-4'>
            Select your dream destination
        </h2>
        <div className='join-w-full'>
            <input 
            type="text" 
            className='input join-item input-bordered w-full'
            placeholder='City'
            required
            name='City' />
            <input 
            type="text" 
            className='input join-item input-bordered w-full'
            placeholder='Country'
            required
            name='Country' />
            <button className='btn btn-primary join-item' type='submit'>
                Generate tour
            </button>
        </div>
    </form>

    <div className='mt-5'>
        {data && <TourInfo tour={data}/>}
    </div>
    </>
    
  )
}

export default NewTour