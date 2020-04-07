import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image
} from 'react-native';
const { vw, vh, vmin, vmax } = require('react-native-viewport-units');
import RatingPad from "../components/RatingPad";
let pressHandler = (navigation, key, name) => {
    navigation.navigation.navigate("Reviews", {id: key, name })
}
const ReviewListItem: () => React$Node = (props) => {
    return (
        <TouchableOpacity onPress={() => {pressHandler(props.navigation, props.id, props.name)}}>
            <View style={styles.box}>
                <Image source={{ uri: props.image }} style={{ width: 40 * vw, height: "100%" }} ></Image>
                <View style={{ marginLeft: 0.9*vw }}>
                    <Text style={{...styles.textColor, fontSize: 16, fontWeight: "bold" }}>{(props.name.length<25) ? props.name : props.name.slice(0, 25)+"..."}</Text>
                    <View style={{width: 60*vw, paddingRight: 2*vw}}>
                        <Text style={{...styles.textColor, fontSize: 12 }}>{props.description}</Text>
                    </View>
                    <RatingPad rating={props.rating}></RatingPad>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    box: {
        marginTop: 0.9*vh,
        marginBottom: 0.2*vh,
        backgroundColor: "#6518f4",
        width: 99.5 * vw,
        flexDirection: "row",
        borderWidth: 1,
        minHeight: 25*vh
    },
    textColor: {
        color: "lightgreen"
    }
});

export default ReviewListItem;
