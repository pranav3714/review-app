import React from 'react';
import {
    View
} from 'react-native';
const { vw, vh, vmin, vmax } = require('react-native-viewport-units');
import Icon from "react-native-vector-icons/FontAwesome";

let fullStar = <Icon name="star" size={20} color="#ffd700" />, halfStar = <Icon name="star-half-empty" size={20} color="#ffd700" />, emptyStar = <Icon name="star-o" size={20} color="#ffd700" />
let starMaker = (arr) => {
    let returnArray = [], i, fullPlusHalf = arr[0];
    for(i=0;i<arr[0];i++) {
    	returnArray.push(fullStar)
    }
    if(arr[1] == 1) {
    	returnArray.push(halfStar)
        fullPlusHalf=(fullPlusHalf+1)
    }
    for(i=0; i < (5-fullPlusHalf);i++) {
    	returnArray.push(emptyStar)
    }
    return returnArray
}

const RatingPad: () => React$Node = (props) => {
    return (
        <View style={{ width: 26.5 * vw, flexDirection: "row", marginTop: 10, justifyContent: "center" }}>
            {
                starMaker(props.rating)
            }
        </View>
    );
};

export default RatingPad;
