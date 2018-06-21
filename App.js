import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TextInput, Button, Vibration } from 'react-native';

import TimerCountdown from 'react-native-timer-countdown'


export default class App extends Component {
  state = {
    showTimer: false,
    time: null,
    showISTTime: false,
    currentTime: null
  }

  start = () => {
    this.setState(previousState => {
      return {
        showTimer: !previousState.showTimer,
        showISTTime: false
      };
    });
  }
  finish = () => {
    Vibration.vibrate(10000);
    this.setState(previousState => {
      return {
        showTimer: !previousState.showTimer,
        showISTTime: true,
        currentTime:new Date(new Date().getTime() + 1000).toLocaleTimeString()

      };
    });
  }
  setTime = (time) => {
    var milliseconds = time * 60000;
    this.setState(previousState => {
      return { time: milliseconds };
    });
  }
  render() {
    let timer = null;
    let time = null;
    if (this.state.showTimer) {
      timer = <TimerCountdown
        initialSecondsRemaining={this.state.time}
        onTick={() => console.log('tick')}
        onTimeElapsed={this.finish}
        allowFontScaling={true}
        style={{ fontSize: 40, color: '#fff' }}
      />

    }
    if (this.state.showISTTime) {
      time = <Text style={{color:'#fff',fontSize:30}}>{this.state.currentTime}</Text>
    }
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Count Down Timer</Text>
        <View style={{ paddingTop: 40 }}>
          <TextInput
            keyboardType='numeric'
            editable={!this.state.showTimer}
            style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1, color: '#fff' }}
            onChangeText={(time) => this.setTime(time)}
            value={this.props.time}
          />
        </View>
        <View style={styles.button}>
          <Button
            onPress={this.start}
            title="Start"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
            disabled={this.state.showTimer}
          />
        </View>
        <View>
          {timer}
        </View>
       
          {time}

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    alignItems: 'center',
    backgroundColor: '#000',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  heading: {
    color: '#fff',
    fontSize: 20
  },
  button: {
    paddingTop: 40,
    width: '60%'
  }
});
