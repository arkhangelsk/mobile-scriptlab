import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

const WelcomeScreen = ({ username, onLogout }) => {
  return (
    <View
      style={styles.container}
      testID="WelcomeScreen"
      accessibilityLabel="Welcome Screen"
    >
      <View style={styles.contentContainer}>
        <Text style={styles.welcomeTitle} testID="welcomeTitle">
          Welcome!
        </Text>
        <Text style={styles.usernameText} testID="usernameText">
          {username}
        </Text>
        <Text style={styles.messageText}>You have successfully logged in.</Text>

        {onLogout && (
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={onLogout}
            testID="logoutButton"
            accessibilityLabel="Logout Button"
          >
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

WelcomeScreen.propTypes = {
  username: PropTypes.string.isRequired,
  onLogout: PropTypes.func,
};

WelcomeScreen.defaultProps = {
  onLogout: null,
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 20,
  },
  contentContainer: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 40,
    borderRadius: 10,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  welcomeTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#00458B',
    marginBottom: 20,
  },
  usernameText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 15,
  },
  messageText: {
    fontSize: 16,
    color: '#7B8794',
    textAlign: 'center',
    marginBottom: 30,
  },
  logoutButton: {
    backgroundColor: '#00458B',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
    minWidth: 150,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
