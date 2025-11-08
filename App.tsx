/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import Inputs from './components/SigninScreen';
import MenuScreen from './components/MenuScreen';
import UserRegistrationForm from './components/UserRegistrationForm';
import ShoppingCart from './components/ShoppingCart';
import UIComponents from './components/UIComponents';
import SwipeScreen from './components/SwipeScreen';
import DragScreen from './components/DragScreen';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [currentScreen, setCurrentScreen] = useState<string>('menu');

  const handleLogin = async (user: string, _password: string) => {
    // Simulate login process
    // In a real app, you would validate credentials with a backend
    setUsername(user);
    setIsLoggedIn(true);
    setCurrentScreen('menu');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setCurrentScreen('menu');
  };

  const handleMenuItemPress = (item: { id: number; title: string }) => {
    // Navigate to different screens based on menu selection
    if (item.title === 'Forms & Inputs') {
      setCurrentScreen('registration-form');
    } else if (item.title === 'Shopping Cart') {
      setCurrentScreen('shopping-cart');
    } else if (item.title === 'UI Components') {
      setCurrentScreen('ui-components');
    } else if (item.title === 'Swipe') {
      setCurrentScreen('swipe');
    } else if (item.title === 'Drag') {
      setCurrentScreen('drag');
    } else {
      // For other menu items, you can add more screens later
      setCurrentScreen('menu');
    }
  };

  const handleBackToMenu = () => {
    setCurrentScreen('menu');
  };

  const renderScreen = () => {
    if (!isLoggedIn) {
      return <Inputs onLogin={handleLogin} />;
    }

    switch (currentScreen) {
      case 'registration-form':
        return <UserRegistrationForm onBack={handleBackToMenu} />;
      case 'shopping-cart':
        return <ShoppingCart onBack={handleBackToMenu} />;
      case 'ui-components':
        return <UIComponents onBack={handleBackToMenu} />;
      case 'swipe':
        return <SwipeScreen onBack={handleBackToMenu} />;
      case 'drag':
        return <DragScreen onBack={handleBackToMenu} />;
      case 'menu':
      default:
        return (
          <MenuScreen
            username={username}
            onLogout={handleLogout}
            onMenuItemPress={handleMenuItemPress}
          />
        );
    }
  };

  return <View style={styles.container}>{renderScreen()}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
