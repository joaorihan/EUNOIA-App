import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PerguntasScreen } from '../screens/checkin/PerguntasScreen';
import { FotoScreen } from '../screens/checkin/FotoScreen';
import { AnaliseScreen } from '../screens/checkin/AnaliseScreen';
import { CheckinStackParamList } from '../types';

const Stack = createNativeStackNavigator<CheckinStackParamList>();

export const CheckinStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#6C5CE7',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="Perguntas"
        component={PerguntasScreen}
        options={{ title: 'Perguntas' }}
      />
      <Stack.Screen
        name="Foto"
        component={FotoScreen}
        options={{ title: 'Captura Facial' }}
      />
      <Stack.Screen
        name="Analise"
        component={AnaliseScreen}
        options={{ 
          title: 'Análise',
          headerLeft: () => null, // Remove o botão de voltar
          gestureEnabled: false // Desabilita o gesto de voltar
        }}
      />
    </Stack.Navigator>
  );
};


