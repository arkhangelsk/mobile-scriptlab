/* eslint-disable no-alert */
import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Button,
  Alert,
} from 'react-native';
import {testProps} from '../utils'

class ComponentMixture extends Component {
  render() {
    return (
      <View
        style={styles.container}
        testID={'sampleBtn'}
        accessibilityLabel={'Button Accessibility Label'}>
        <Button
        onPress={() => Alert.alert("Happy, you are autoamted!")}
        title="I am a Button, automate me!"
        color="blue"/>
      </View>
    );
  }
}
export default ComponentMixture;

const styles = StyleSheet.create({
  container: {
    paddingTop: 2,
  },
  input: {
    margin: 15,
    height: 40,
    borderColor: '#00458B',
    borderWidth: 1,
    paddingLeft: 5,
  },
  submitButton: {
    backgroundColor: '#00458B',
    padding: 10,
    margin: 15,
    height: 40,
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
