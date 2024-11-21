import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/home/HomeScreen';
import VideoDetailsScreen from '../screens/home/VideoDetailsScreen';
import { RouteProp } from '@react-navigation/native';
import LiveStreamScreen from '../screens/live_stream/LiveStreamScreen';

export type RootStackParamList = {
  Home: undefined; // Tela inicial
  VideoDetail: { videoId: string; title: string }; // Tela de detalhes do vídeo
  LiveStream: undefined; // Tela para funcionalidade de transmissão ao vivo
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#EE3965',
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
        <Stack.Screen
          name="LiveStream"
          component={LiveStreamScreen}
          options={{ title: 'Transmissão ao Vivo' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
