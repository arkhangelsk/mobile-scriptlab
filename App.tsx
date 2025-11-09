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
import AboutScreen from './components/AboutScreen';
import PrivacyScreen from './components/PrivacyScreen';
import ConnectScreen from './components/ConnectScreen';
import UserRegistrationForm from './components/UserRegistrationForm';
import ShoppingCart from './components/ShoppingCart';
import UIComponents from './components/UIComponents';
import SwipeScreen from './components/SwipeScreen';
import DragScreen from './components/DragScreen';
import WebviewScreen from './components/WebviewScreen';
import { StatusBar, useColorScheme, Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const PracticeStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();

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
        {({ navigation }) => (
          <HomeScreen navigation={navigation} username={username} />
        )}
      </HomeStack.Screen>
    </HomeStack.Navigator>
  );
}

function PracticeStackScreen() {
  return (
    <PracticeStack.Navigator screenOptions={{ headerShown: false }}>
      <PracticeStack.Screen name="PracticeMain" component={PracticeScreen} />
      <PracticeStack.Screen
        name="RegistrationForm"
        options={{ headerShown: true, title: 'Forms & Inputs' }}
      >
        {({ navigation }) => (
          <UserRegistrationForm onBack={() => navigation.goBack()} />
        )}
      </PracticeStack.Screen>
      <PracticeStack.Screen
        name="ShoppingCart"
        options={{ headerShown: true, title: 'Shopping Cart' }}
      >
        {({ navigation }) => (
          <ShoppingCart onBack={() => navigation.goBack()} />
        )}
      </PracticeStack.Screen>
      <PracticeStack.Screen
        name="UIComponents"
        options={{ headerShown: true, title: 'UI Components' }}
      >
        {({ navigation }) => (
          <UIComponents onBack={() => navigation.goBack()} />
        )}
      </PracticeStack.Screen>
      <PracticeStack.Screen
        name="Swipe"
        options={{ headerShown: true, title: 'Swipe' }}
      >
        {({ navigation }) => <SwipeScreen onBack={() => navigation.goBack()} />}
      </PracticeStack.Screen>
      <PracticeStack.Screen
        name="Drag"
        options={{ headerShown: true, title: 'Drag' }}
      >
        {({ navigation }) => <DragScreen onBack={() => navigation.goBack()} />}
      </PracticeStack.Screen>
      <PracticeStack.Screen
        name="Webview"
        component={WebviewScreen}
        options={{ headerShown: true, title: 'Webview' }}
      />
    </PracticeStack.Navigator>
  );
}

function ProfileStackScreen({
  username,
  handleLogout,
}: {
  username: string;
  handleLogout: () => void;
}) {
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerShown: false,
        headerTintColor: '#000000',
      }}
    >
      <ProfileStack.Screen name="Back">
        {props => (
          <ProfileScreen
            {...props}
            username={username}
            onLogout={handleLogout}
          />
        )}
      </ProfileStack.Screen>
      <ProfileStack.Screen
        name="Privacy"
        component={PrivacyScreen}
        options={{ headerShown: true, title: 'Privacy Policy' }}
      />
      <ProfileStack.Screen
        name="Connect"
        component={ConnectScreen}
        options={{ headerShown: true, title: 'Connect' }}
      />
      <ProfileStack.Screen
        name="About"
        component={AboutScreen}
        options={{ headerShown: true, title: 'About' }}
      />
    </ProfileStack.Navigator>
  );
}

function TabNavigator({
  username,
  handleLogout,
}: {
  username: string;
  handleLogout: () => void;
}) {
  return (
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
        component={PracticeStackScreen}
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
          tabBarLabel: 'More',
          tabBarIcon: () => <Text style={{ fontSize: 24 }}>⋯</Text>,
        }}
      >
        {props => (
          <ProfileStackScreen
            {...props}
            username={username}
            handleLogout={handleLogout}
          />
        )}
      </Tab.Screen>
    </Tab.Navigator>
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
      <TabNavigator username={username} handleLogout={handleLogout} />
    </NavigationContainer>
  );
}

export default App;
