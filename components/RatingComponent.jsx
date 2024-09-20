
const RatingComponent = ({rating}) => {
    // console.log("RATING-->",rating)
    const afterDecimal = Number.parseInt(rating.toString().split('.')[1]);
    let totalFilledStars = Number.parseInt(rating.toString().split('.')[0]);
    totalFilledStars *= 2;
    let renderedStars = []

    // console.log('totla', totalFilledStars)

    for(let i = 0; i < totalFilledStars; i++) {
        if(i%2 === 0)
        renderedStars.push(<input type="radio" name="rating-10" className="mask mask-star-2 mask-half-1 bg-orange-400" />)
        if(i%2 !== 0)
        renderedStars.push(<input type="radio" name="rating-10" className="mask mask-star-2 mask-half-2 bg-orange-400" />)
    }

    // console.log('after decimal-->', afterDecimal , typeof(afterDecimal))

    if(afterDecimal === 0 || afterDecimal === NaN) {
        let poppedOut = renderedStars.pop();
        renderedStars.push(<input type="radio" name="rating-10" className="mask mask-star-2 mask-half-2 bg-orange-400" checked="checked" />)
    }
    else if(afterDecimal < 5){ 
        //push two half stars, mark the first one as checked
        renderedStars.push(<input type="radio" name="rating-10" className="mask mask-star-2 mask-half-1 bg-orange-400" checked="checked" />)
        renderedStars.push(<input type="radio" name="rating-10" className="mask mask-star-2 mask-half-2 bg-orange-400" />)
    }
    else{
        //push two half stars, mark the last one as checked
        renderedStars.push(<input type="radio" name="rating-10" className="mask mask-star-2 mask-half-1 bg-orange-400" />)
        renderedStars.push(<input type="radio" name="rating-10" className="mask mask-star-2 mask-half-2 bg-orange-400" checked="checked"  />)
    }

    // console.log('ALL FILED STARS COUNT-->',renderedStars.length)

    if(renderedStars.length < 10) {
        let remaining = 10 - renderedStars.length;
        // console.log('^^', remaining)
        for(let i=0; i< remaining; i++) {
            if(i%2 === 0)
            renderedStars.push(<input type="radio" name="rating-10" className="mask mask-star-2 mask-half-1 bg-orange-400" />)
            if(i%2 !== 0)
            renderedStars.push(<input type="radio" name="rating-10" className="mask mask-star-2 mask-half-2 bg-orange-400" />)
        }
       

    }
    

    // console.log(renderedStars)

    
    return( 
        <div class="rating rating-md rating-half">
            {renderedStars.map(star => star)}
        </div>
    );


}

export default RatingComponent;