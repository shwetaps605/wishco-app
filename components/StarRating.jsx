

const StarRating = () => {
    // return[<input type="radio" name="rating-10" className="mask mask-star-2 mask-half-1 bg-orange-400" />,
    //     <input type="radio" name="rating-10" className="mask mask-star-2 mask-half-2 bg-orange-400" />
    // ]

    return(
        <>
            <input type="radio" name="rating-10" className="mask mask-star-2 mask-half-1 bg-orange-400" />
            <input type="radio" name="rating-10" className="mask mask-star-2 mask-half-2 bg-orange-400" />
        </>
    )
    
    

}

export default StarRating;