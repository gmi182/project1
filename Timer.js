import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';
import {vibrate} from './utils';

const WORK_TITLE = "Work Time";
const BREAK_TITLE = "Take a Break";
const WORK_TIME = 20 * 60;
const BREAK_TIME = 10 * 60;
const BUTTON_PLAY = require("./assets/button-play.png");
const BUTTON_PAUSE = require("./assets/button-pause.png");

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "transparent",
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 40,
        fontWeight: "bold",
    },
    timer: {
        fontSize: 24,
    },
    buttonsContainer: {
        flexDirection: "row",
        marginBottom: 20,
    },
    button: {
        marginHorizontal: 10,
    },
    image: {
        width: 50,
        height: 50,
    },
    inputContainer: {
        paddingTop: 10,
    },
    textInput: {
        width: 150,
        borderColor: "#000000",
        borderBottomWidth: 1,
        padding: 5,
    }
});

class MyTimer extends React.Component {
    constructor(props) {
        super(props);
        momentDurationFormatSetup(moment);
        this.state = {
            count: WORK_TIME,
            isPaused: true,
            buttonSource: BUTTON_PLAY,
            isWork: true,
            title: WORK_TITLE,
            workTime: WORK_TIME,
            breakTime: BREAK_TIME,
        }
    }

    componentDidMount() {
        setInterval(() => this.increment(), 1000);
    }

    playPauseButtonPressed() {
        this.setState(prevState => ({
            isPaused: !prevState.isPaused,
            buttonSource: prevState.isPaused ? BUTTON_PAUSE : BUTTON_PLAY
        }));
    }

    resetButtonPressed() {
        this.setState({
            count: WORK_TIME,
            isPaused: true,
            buttonSource: BUTTON_PLAY,
            isWork: true,
            title: WORK_TITLE,
            workTime: WORK_TIME,
            breakTime: BREAK_TIME,
        });
        this.props.onTypeChange(true);
    }

    increment() {
        if (this.state.count === 0) {
            this.props.onTypeChange(!this.state.isWork);
            if (this.state.isWork === true) {
                this.setState(prevState => ({
                    isWork: !prevState.isWork,
                    count: prevState.breakTime,
                    title: BREAK_TITLE
                }));
            } else {
                this.setState(prevState => ({
                    isWork: !prevState.isWork,
                    count: prevState.workTime,
                    title: WORK_TITLE
                }));
            }
            vibrate();
        }
        if (this.state.isPaused === false) {
            this.setState(prevState => ({
                count: prevState.count - 1
            }));
        }
    }

    workTimeChanged = newValue => {
        let newTimeValue = parseInt(newValue) * 60;
        if (Number.isInteger(newTimeValue) === false) return;

        this.setState({
            workTime: newTimeValue,
        });
        this._updateCount(true, newTimeValue);
    };

    breakTimeChanged = newValue => {
        let newTimeValue = parseInt(newValue) * 60;
        if (Number.isInteger(newTimeValue) === false) return;

        this.setState({
            breakTime: newTimeValue,
        });
        this._updateCount(false, newTimeValue);
    };

    _updateCount(isWork, value) {
        if (this.state.isWork === isWork) {
            this.setState({
                count: value,
            });
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>{this.state.title}</Text>
                <Text style={styles.timer}>{moment.duration(this.state.count, "second").format("mm:ss")}</Text>
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => this.playPauseButtonPressed()}>
                        <Image source={this.state.buttonSource} style={styles.image} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => this.resetButtonPressed()}>
                        <Image source={require("./assets/button-reset.png")} style={styles.image} />
                    </TouchableOpacity>
                </View>
                <View style={styles.inputContainer}>
                    <Text>Work Time (min):</Text>
                    <TextInput style={styles.textInput} keyboardType="numeric" onChangeText={this.workTimeChanged}>{this.state.workTime / 60}</TextInput>
                </View>
                <View style={styles.inputContainer}>
                    <Text>Break Time (min):</Text>
                    <TextInput style={styles.textInput} keyboardType="numeric" onChangeText={this.breakTimeChanged}>{this.state.breakTime / 60}</TextInput>
                </View>
            </View>
        )
    }
}

export default MyTimer;
