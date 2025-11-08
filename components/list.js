import React, {Component} from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';

class List extends Component {
  state = {
    names: [
      {
        id: 0,
        name: 'Alberta',
      },
      {
        id: 1,
        name: 'British Columbia',
      },
      {
        id: 2,
        name: 'Manitoba',
      },
      {
        id: 3,
        name: 'New Brunswick',
      },
      {
        id: 4,
        name: 'Newfoundland and Labrador',
      },
      {
        id: 5,
        name: 'Nova Scotia',
      },
      {
        id: 6,
        name: 'Ontario',
      },
    ],
  };
  alertItemName = item => {
    alert(item.name);
  };
  render() {
    return (
      <View testID={'ListGroup'} accessibilityLabel={'ListGroup'}>
        {this.state.names.map((item, index) => (
          <TouchableOpacity
            key={item.id}
            style={styles.container}
            onPress={() => this.alertItemName(item)}>
            <Text
              style={styles.text}
              testID={'ListItem'}
              accessibilityLabel={'ListItem'}>
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  }
}
export default List;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 3,
    backgroundColor: '#A6E9F1',
    alignItems: 'center',
  },
  text: {
    color: '#00458B',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
