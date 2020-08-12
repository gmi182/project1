import React from 'react';
import { View, Text, Button } from 'react-native';

class MyTimer extends React.Component {
    constructor() {
        super()
        this.state = {
            count: 1,
            isPaused: false,
            buttonTitle: "| |"
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
        if (this.state.isPaused === false) {
            this.setState(prevState => ({
                count: prevState.count + 1,
            }));
        }
    }

    render() {
        return (
            <View>
                <Text>{this.state.count}</Text>
                <Button onPress={() => this.playPauseButton()} title={this.state.buttonTitle}></Button>
            </View>
        )
    }
}

export default MyTimer;
