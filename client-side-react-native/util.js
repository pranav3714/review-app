let voteAvgToArray = (avg) => {
    let halfValue=avg/2, valueFixedToOne = halfValue.toFixed(1),
    floorVal = Math.floor(valueFixedToOne),
    afterDecimal = (valueFixedToOne-floorVal).toFixed(1), halfStarCount=0, emptyStarCount;
    if(afterDecimal >= 0.5) {
    	halfStarCount = 1
    }
    emptyStarCount = 5-(floorVal+halfStarCount)
    return [floorVal, halfStarCount, emptyStarCount]
}
export default voteAvgToArray;

//main 3
