import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import VideoDetailsScreen from '../screens/VideoDetailsScreen';
import { RouteProp } from '@react-navigation/native';

export type RootStackParamList = {
  Home: undefined;
  VideoDetail: { videoId: string; title: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#274F67',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Home' }}
        />
        <Stack.Screen
          name="VideoDetail"
          component={VideoDetailsScreen}
          options={({ route }: { route: RouteProp<RootStackParamList, 'VideoDetail'> }) => ({
            title: `Vídeo: ${route.params.title}`,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
