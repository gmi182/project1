import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';

const WORK_TITLE = "Work Time";
const BREAK_TITLE = "Take a Break";
const WORK_TIME = 2 * 10;
const BREAK_TIME = 1 * 10;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "transparent",
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 40,
        fontWeight: "bold"
    },
    timer: {
        fontSize: 24
    }
});


class MyTimer extends React.Component {
    constructor(props) {
        super(props);
        momentDurationFormatSetup(moment);
        this.state = {
            count: WORK_TIME,
            isPaused: false,
            buttonTitle: "| |",
            isWork: true,
            title: WORK_TITLE
        }
    }

    componentDidMount() {
        setInterval(() => this.increment(), 1000);
    }

    playPauseButton() {
        this.setState(prevState => ({
            isPaused: !prevState.isPaused,
            buttonTitle: prevState.isPaused ? "| |" : "| >",
        }));
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
                <Button onPress={() => this.playPauseButton()} title={this.state.buttonTitle}></Button>
            </View>
        )
    }
}

export default MyTimer;
