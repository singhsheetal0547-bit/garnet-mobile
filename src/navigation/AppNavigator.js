import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Import screens (to be created)
import HomeScreen from '../screens/HomeScreen';
import CameraScreen from '../screens/CameraScreen';
import EditorScreen from '../screens/EditorScreen';
import LibraryScreen from '../screens/LibraryScreen';
import ProfileScreen from '../screens/ProfileScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import SignupScreen from '../screens/auth/SignupScreen';
import AIAssistantScreen from '../screens/AIAssistantScreen';
import PublishScreen from '../screens/PublishScreen';
import WatermarkScreen from '../screens/WatermarkScreen';
import SubscriptionScreen from '../screens/SubscriptionScreen';

import useAuthStore from '../store/useAuthStore';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Main tab navigator
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Camera') {
            iconName = focused ? 'camera' : 'camera-outline';
          } else if (route.name === 'Library') {
            iconName = focused ? 'folder' : 'folder-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#8B5CF6',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen 
        name="Camera" 
        component={CameraScreen}
        options={{
          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
              style={{
                ...props.style,
                top: -10,
              }}
            >
              <View
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 30,
                  backgroundColor: '#8B5CF6',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Ionicons name="add" size={32} color="white" />
              </View>
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen name="Library" component={LibraryScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

// Auth stack
function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

// Main app stack
function AppStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="MainTabs" 
        component={MainTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="Editor" 
        component={EditorScreen}
        options={{ 
          headerShown: true,
          title: 'Edit',
          headerStyle: { backgroundColor: '#8B5CF6' },
          headerTintColor: '#fff',
        }}
      />
      <Stack.Screen 
        name="AIAssistant" 
        component={AIAssistantScreen}
        options={{ 
          headerShown: true,
          title: 'AI Assistant',
          headerStyle: { backgroundColor: '#8B5CF6' },
          headerTintColor: '#fff',
        }}
      />
      <Stack.Screen 
        name="Publish" 
        component={PublishScreen}
        options={{ 
          headerShown: true,
          title: 'Publish',
          headerStyle: { backgroundColor: '#8B5CF6' },
          headerTintColor: '#fff',
        }}
      />
      <Stack.Screen 
        name="Watermark" 
        component={WatermarkScreen}
        options={{ 
          headerShown: true,
          title: 'Watermark Tools',
          headerStyle: { backgroundColor: '#8B5CF6' },
          headerTintColor: '#fff',
        }}
      />
      <Stack.Screen 
        name="Subscription" 
        component={SubscriptionScreen}
        options={{ 
          headerShown: true,
          title: 'Upgrade',
          headerStyle: { backgroundColor: '#8B5CF6' },
          headerTintColor: '#fff',
        }}
      />
    </Stack.Navigator>
  );
}

// Root navigator
export default function AppNavigator() {
  const { isAuthenticated, isLoading } = useAuthStore();

  if (isLoading) {
    return null; // Or a loading screen
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
