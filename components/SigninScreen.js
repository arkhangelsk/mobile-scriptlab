import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Image,
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
    } else if (username !== 'scriptlab') {
      setUsernameError('Invalid username');
      isValid = false;
    }

    // Validate password
    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (password !== 'scriptlab123') {
      setPasswordError('Invalid password');
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
      {/* Logo Section */}
      <View style={styles.logoContainer}>
        <View style={styles.logoCircle}>
          <Image
            testID="testIDLogoImage"
            accessibilityLabel="Logo Image"
            source={require('../images/logo.png')}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>
        <Text testID="testIDUserName" style={styles.appTitle}>
          ScriptLab
        </Text>
        <Text style={styles.appSubtitle}>Mobile Test Automation</Text>
      </View>

      {/* Login Hint */}
      <View style={styles.hintContainer}>
        <Text style={styles.hintText}>Use credentials:</Text>
        <Text style={styles.hintCredentials}>Username: scriptlab</Text>
        <Text style={styles.hintCredentials}>Password: scriptlab123</Text>
      </View>

      <TextInput
        testID="testIDUserName"
        accessibilityLabel="User Name Input Field"
        style={[styles.input, usernameError ? styles.inputError : null]}
        underlineColorAndroid="transparent"
        placeholder="Username"
        placeholderTextColor="#666666"
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
        placeholderTextColor="#666666"
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
          <ActivityIndicator color="#FFFFFF" />
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
    backgroundColor: '#FFFFFF',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  logoImage: {
    width: 70,
    height: 70,
  },
  appTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 5,
  },
  appSubtitle: {
    fontSize: 16,
    color: '#333333',
    fontWeight: '500',
  },
  hintContainer: {
    backgroundColor: '#F0F0F0',
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 15,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#000000',
  },
  hintText: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
    fontWeight: '600',
  },
  hintCredentials: {
    fontSize: 13,
    color: '#000000',
    fontFamily: 'monospace',
    marginLeft: 8,
  },
  input: {
    margin: 15,
    marginBottom: 5,
    height: 40,
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
    color: '#000000',
  },
  inputError: {
    borderColor: '#FF4444',
    borderWidth: 2,
  },
  errorText: {
    color: '#FF4444',
    fontSize: 12,
    marginHorizontal: 15,
    marginBottom: 10,
    marginTop: 0,
  },
  submitButton: {
    backgroundColor: '#000000',
    padding: 10,
    margin: 15,
    height: 40,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: '#666666',
    opacity: 0.7,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
