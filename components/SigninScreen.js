import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import PropTypes from 'prop-types';

const SignInForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    let isValid = true;

    // Reset errors
    setUsernameError('');
    setPasswordError('');

    // Validate username
    if (!username.trim()) {
      setUsernameError('Username is required');
      isValid = false;
    } else if (username.length < 3) {
      setUsernameError('Username must be at least 3 characters');
      isValid = false;
    }

    // Validate password
    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      isValid = false;
    }

    return isValid;
  };

  const handleLogin = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Call parent component's onLogin handler if provided
      if (onLogin) {
        await onLogin(username, password);
      } else {
        // Default behavior
        Alert.alert(
          'Login Successful',
          `Username: ${username}\nPassword: ${password.replace(/./g, '*')}`,
          [{ text: 'OK' }],
        );
      }
    } catch (error) {
      Alert.alert(
        'Login Failed',
        error.message || 'An error occurred during login',
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View
      style={styles.container}
      testID="SignInForm"
      accessibilityLabel="SignInForm Accessibility Label"
    >
      <TextInput
        testID="testIDUserName"
        accessibilityLabel="User Name Input Field"
        style={[styles.input, usernameError ? styles.inputError : null]}
        underlineColorAndroid="transparent"
        placeholder="Username"
        placeholderTextColor="#7B8794"
        autoCapitalize="none"
        autoCorrect={false}
        value={username}
        onChangeText={text => {
          setUsername(text);
          if (usernameError) setUsernameError('');
        }}
        editable={!isLoading}
      />
      {usernameError ? (
        <Text style={styles.errorText} testID="usernameError">
          {usernameError}
        </Text>
      ) : null}

      <TextInput
        testID="Password"
        accessibilityLabel="Password Input Field"
        style={[styles.input, passwordError ? styles.inputError : null]}
        underlineColorAndroid="transparent"
        placeholder="Password"
        placeholderTextColor="#7B8794"
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry={true}
        value={password}
        onChangeText={text => {
          setPassword(text);
          if (passwordError) setPasswordError('');
        }}
        editable={!isLoading}
      />
      {passwordError ? (
        <Text style={styles.errorText} testID="passwordError">
          {passwordError}
        </Text>
      ) : null}

      <TouchableOpacity
        style={[styles.submitButton, isLoading && styles.submitButtonDisabled]}
        onPress={handleLogin}
        disabled={isLoading}
        testID="testIDLoginButton"
        accessibilityLabel="Login Button"
      >
        {isLoading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.submitButtonText}>Login</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

SignInForm.propTypes = {
  onLogin: PropTypes.func,
};

SignInForm.defaultProps = {
  onLogin: null,
};

export default SignInForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  input: {
    margin: 15,
    marginBottom: 5,
    height: 40,
    borderColor: '#00458B',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
  },
  inputError: {
    borderColor: '#D32F2F',
    borderWidth: 2,
  },
  errorText: {
    color: '#D32F2F',
    fontSize: 12,
    marginHorizontal: 15,
    marginBottom: 10,
    marginTop: 0,
  },
  submitButton: {
    backgroundColor: '#00458B',
    padding: 10,
    margin: 15,
    height: 40,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: '#7B8794',
    opacity: 0.7,
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
