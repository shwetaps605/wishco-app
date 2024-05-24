import EditJob from '../../../../components/EditJob'

const JobPage = ({params}) => {
    console.log("PARAMS->",params)
    return(
        <>
        Job Details
        <EditJob/>
        
        </>
    )
}

export default JobPage;