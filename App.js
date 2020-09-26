import React from 'react';
import { StyleSheet, View, Keyboard, TouchableWithoutFeedback } from 'react-native';
import MyTimer from './Timer.js';

const WORK_BG_COLOR = "green";
const BREAK_BG_COLOR = "blue";
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
});

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            isWork: true,
            backgroundColor: WORK_BG_COLOR
        }
    }

    onTimeTypeChange = isWork => {
        let bgColor = isWork ? WORK_BG_COLOR : BREAK_BG_COLOR;
        this.setState({
            backgroundColor: bgColor,
            isWork: isWork
        });
    }

    viewportTap() {
        Keyboard.dismiss();
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={() => this.viewportTap()}>
                <View style={[styles.container, {backgroundColor: this.state.backgroundColor}]}>
                    <MyTimer onTypeChange={this.onTimeTypeChange}></MyTimer>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}
