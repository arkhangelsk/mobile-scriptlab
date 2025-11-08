/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Inputs from './components/SigninScreen';
import HomeScreen from './components/HomeScreen';
import PracticeScreen from './components/PracticeScreen';
import ChallengesScreen from './components/ChallengesScreen';
import LearnScreen from './components/LearnScreen';
import ProfileScreen from './components/ProfileScreen';
import UserRegistrationForm from './components/UserRegistrationForm';
import ShoppingCart from './components/ShoppingCart';
import UIComponents from './components/UIComponents';
import SwipeScreen from './components/SwipeScreen';
import DragScreen from './components/DragScreen';
import { StatusBar, useColorScheme, Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppContent />
    </SafeAreaProvider>
  );
}

function HomeStackScreen({ username }: { username: string }) {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HomeMain">
        {props => <HomeScreen {...props} username={username} />}
      </HomeStack.Screen>
      <HomeStack.Screen
        name="RegistrationForm"
        options={{ headerShown: true, title: 'Forms & Inputs' }}
      >
        {({ navigation }) => (
          <UserRegistrationForm onBack={() => navigation.goBack()} />
        )}
      </HomeStack.Screen>
      <HomeStack.Screen
        name="ShoppingCart"
        options={{ headerShown: true, title: 'Shopping Cart' }}
      >
        {({ navigation }) => (
          <ShoppingCart onBack={() => navigation.goBack()} />
        )}
      </HomeStack.Screen>
      <HomeStack.Screen
        name="UIComponents"
        options={{ headerShown: true, title: 'UI Components' }}
      >
        {({ navigation }) => (
          <UIComponents onBack={() => navigation.goBack()} />
        )}
      </HomeStack.Screen>
      <HomeStack.Screen
        name="Swipe"
        options={{ headerShown: true, title: 'Swipe' }}
      >
        {({ navigation }) => <SwipeScreen onBack={() => navigation.goBack()} />}
      </HomeStack.Screen>
      <HomeStack.Screen
        name="Drag"
        options={{ headerShown: true, title: 'Drag' }}
      >
        {({ navigation }) => <DragScreen onBack={() => navigation.goBack()} />}
      </HomeStack.Screen>
    </HomeStack.Navigator>
  );
}

function AppContent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  const handleLogin = async (user: string, _password: string) => {
    setUsername(user);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
  };

  if (!isLoggedIn) {
    return <Inputs onLogin={handleLogin} />;
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#007AFF',
          tabBarInactiveTintColor: '#8E8E93',
          tabBarStyle: {
            backgroundColor: '#FFFFFF',
            borderTopWidth: 1,
            borderTopColor: '#E5E5EA',
          },
        }}
      >
        <Tab.Screen
          name="Home"
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: () => <Text style={{ fontSize: 24 }}>🏠</Text>,
          }}
        >
          {props => <HomeStackScreen {...props} username={username} />}
        </Tab.Screen>
        <Tab.Screen
          name="Practice"
          component={PracticeScreen}
          options={{
            tabBarLabel: 'Practice',
            tabBarIcon: () => <Text style={{ fontSize: 24 }}>🎯</Text>,
          }}
        />
        <Tab.Screen
          name="Challenges"
          component={ChallengesScreen}
          options={{
            tabBarLabel: 'Challenges',
            tabBarIcon: () => <Text style={{ fontSize: 24 }}>🏆</Text>,
          }}
        />
        <Tab.Screen
          name="Learn"
          component={LearnScreen}
          options={{
            tabBarLabel: 'Learn',
            tabBarIcon: () => <Text style={{ fontSize: 24 }}>📚</Text>,
          }}
        />
        <Tab.Screen
          name="Profile"
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: () => <Text style={{ fontSize: 24 }}>👤</Text>,
          }}
        >
          {props => (
            <ProfileScreen
              {...props}
              username={username}
              onLogout={handleLogout}
            />
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
