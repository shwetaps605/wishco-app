
import GridLayout from "../layouts/GridLayout"
const SkeletonLoader = () => {
    return(
        <GridLayout>
            <div className="skeleton h-32 w-full"></div>
            <div className="skeleton h-32 w-full"></div>
            <div className="skeleton h-32 w-full"></div>
            <div className="skeleton h-32 w-full"></div>
            <div className="skeleton h-32 w-full"></div>
        </GridLayout>
    )
}

export default SkeletonLoader