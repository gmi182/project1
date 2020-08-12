import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MyTimer from './Timer.js';

export default class App extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Open up App.js to start working on your app!</Text>
                <MyTimer></MyTimer>
            </View>
            
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
