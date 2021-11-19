import React from 'react'
import { 
  StatusBar
} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import RegisterUserScreen from './src/screens/RegisterUserScreen';
import RegisterTabNavigation from './src/navigation/RegisterTabNavigation';
import RegisterFoodScreen from './src/screens/RegisterFoodScreen';
import ListRegisteredFoodScreen from './src/screens/ListRegisteredFoodScreen';
import ListAvailableFoodScreen from './src/screens/ListAvailableFoodScreen';
import FoodWithdrawalScreen from './src/screens/FoodWithdrawalScreen';
import ListWithdrawnFoodScreen from './src/screens/ListWithdrawnFoodScreen';

const Stack = createNativeStackNavigator()

const App = () => {

  return (
    <NavigationContainer>
      <StatusBar backgroundColor={'#4a488a'} />
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#4a488a'          
          },
          headerTintColor: '#FFF',
        }}
      >

        <Stack.Screen
          component={LoginScreen}
          name="LoginScreen"
          options={{ headerShown: false }}
        />

        <Stack.Screen
          component={RegisterUserScreen}
          name="RegisterUserScreen"
          options={{ 
            title: 'Criar meu cadastro'
          }}
        /> 

        <Stack.Screen
          component={HomeScreen}
          name="HomeScreen"
          options={{ headerShown: false }}
        />

        <Stack.Screen
          component={ProfileScreen}
          name="ProfileScreen"
          options={{ 
            title: 'Meu Perfil'
          }}
        />
        
        <Stack.Screen
          component={RegisterTabNavigation}
          name="RegisterTabNavigation"
          options={{ headerShown: false }}
        />

        <Stack.Screen
          component={RegisterFoodScreen}
          name="RegisterFoodScreen"
          options={{ headerShown: false }}
        />

        <Stack.Screen
          component={ListRegisteredFoodScreen}
          name="ListRegisteredFoodScreen"
          options={{ 
            title: 'Alimentos Cadastrados'
          }}
        />

        <Stack.Screen
          component={ListAvailableFoodScreen}
          name="ListAvailableFoodScreen"
          options={{ 
            title: 'Alimentos Disponíveis',
            headerShadowVisible: false           
          }}
        />

        <Stack.Screen
          component={FoodWithdrawalScreen}
          name="FoodWithdrawalScreen"
          options={{ 
            title: 'Retirada de Alimento',         
          }}
        />          

        <Stack.Screen
          component={ListWithdrawnFoodScreen}
          name="ListWithdrawnFoodScreen"
          options={{ 
            title: 'Alimentos Retirados'
          }}
        />
                          
      </Stack.Navigator>
    </NavigationContainer>   
  )
}

export default App