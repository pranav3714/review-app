import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Button,
    TouchableOpacity
} from 'react-native';
const { vw, vh, vmin, vmax } = require('react-native-viewport-units');
import RatingPad from "./RatingPad";

const UserComments: () => React$Node = (props) => {
    return (
        <TouchableOpacity style={styles.commentContainer}>
            <View style={{ flexDirection: "row" }}>
                <View style={styles.userAvatar}>
                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>{props.name[0].toUpperCase()}</Text>
                </View>
                <View style={{ marginRight: 12 * vw }}>
                    <Text style={{ color: "grey" }}>{props.name}</Text>
                    <Text style={{ color: "white" , marginBottom: 10}}>{props.comment}</Text>
                </View>
            </View>
            <View style={{borderColor: "grey", borderWidth: 0.2}}></View>
        </TouchableOpacity>
    );
};
export default UserComments;
const styles = StyleSheet.create({
    commentContainer: {
        width: 100 * vw,
        backgroundColor: "transparent",
        marginTop: 3,
        marginBottom: 4
    },
    userAvatar: {
        width: 10 * vw,
        height: 5 * vh,
        backgroundColor: "#1f65ff",
        borderRadius: 50,
        marginTop: 3,
        marginLeft: 3,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 1 * vw
    }
})
