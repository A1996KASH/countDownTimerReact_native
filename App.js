import React, { Component } from 'react';
import Sound from 'react-native-sound';
import { Platform, StyleSheet, Text, View, TextInput, Button, Vibration } from 'react-native';
import TimerCountdown from 'react-native-timer-countdown';
var whoosh = new Sound('http://www.slspencer.com/Sounds/1048.mp3', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
  // loaded successfully
  console.log('duration in seconds: ' + whoosh.getDuration() + 'number of channels: ' + whoosh.getNumberOfChannels());
});

export default class App extends Component {

  state = {
    showTimer: false,//Toggle to Show CountDown Timer
    time: null, //Number of seconds for which timer will run
    showISTTime: false, // Toggle to Show Time after the finish of CountDown
    currentTime: null //current IST Time 
  }


  //Function to handle onPress Start Button
  start = () => {
    this.setState(previousState => {
      return {
        showTimer: !previousState.showTimer,
        showISTTime: false
      };
    });
  }

  //Function run on End of Timer plays Vibrations and Sound for 10 seconds
  finish = () => {

    // Play the sound with an onEnd callback
    whoosh.play((success) => {
      if (success) {
        console.log('successfully finished playing');
      } else {
        console.log('playback failed due to audio decoding errors');
        // reset the player to its uninitialized state (android only)
        // this is the only option to recover after an error occured and use the player again
        whoosh.reset();
      }
    });
    whoosh.setNumberOfLoops(-1);//palys sound in loop

    //Stop Sound after 10 Seconds
    setTimeout(() => {
      whoosh.stop(() => {
      });
    }, 10000)

    //Palys Vibration for 10 Seconds Vibration.vibrate(DURATION)
    Vibration.vibrate(10000);

    //set value of state
    this.setState(previousState => {
      return {
        showTimer: !previousState.showTimer,
        showISTTime: true,
        currentTime: new Date(new Date().getTime() + 1000).toLocaleTimeString()

      };
    });
  }

  //Set number of milliseconds from user entered minutes
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
      time = <Text style={{ color: '#fff', fontSize: 30 }}>{this.state.currentTime}</Text>
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
            placeholder='Enter Number of Minutes'
            placeholderTextColor='#fff'
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
