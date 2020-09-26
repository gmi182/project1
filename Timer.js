import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';

const WORK_TITLE = "Work Time";
const BREAK_TITLE = "Take a Break";
const WORK_TIME = 2 * 10;
const BREAK_TIME = 1 * 10;
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
    },
    button: {
        marginHorizontal: 10,
    },
    image: {
        width: 50,
        height: 50,
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
            title: WORK_TITLE
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
            title: WORK_TITLE
        });
        this.props.onTypeChange(true);
    }

    increment() {
        if (this.state.count === 0) {
            this.props.onTypeChange(!this.state.isWork);
            if (this.state.isWork === true) {
                this.setState(prevState => ({
                    isWork: !prevState.isWork,
                    count: BREAK_TIME,
                    title: BREAK_TITLE
                }));
            } else {
                this.setState(prevState => ({
                    isWork: !prevState.isWork,
                    count: WORK_TIME,
                    title: WORK_TITLE
                }));
            }
        }
        if (this.state.isPaused === false) {
            this.setState(prevState => ({
                count: prevState.count - 1
            }));
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
            </View>
        )
    }
}

export default MyTimer;
