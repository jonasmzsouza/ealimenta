import React from 'react'

import {
  TouchableOpacity
} from 'react-native';

import { Icon } from 'react-native-elements'

import Ionicons from 'react-native-vector-icons/Ionicons';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import styles from '../../styles/Styles'

import RegisterFoodScreen from '../../screens/RegisterFoodScreen';

const RegisterTab = createBottomTabNavigator()

const RegisterTabNavigation = (props) => {

  function renderScreen(screen, name) {
    return (
      <RegisterTab.Screen
        component={screen}
        name={name}
        titleS
        options={{
          title: name,
          headerTitle: 'Cadastro de ' + name,
          headerLeft: () => (          
            <TouchableOpacity
              style={styles.btnHeader}
              onPress={() => { 
                props.navigation.goBack();
              }}
            >
              <Icon
                name='home'
                type='font-awesome-5'
                color='#fff'
              />
            </TouchableOpacity>
          ),
        }}
      />
    )
  }

  return (
    <RegisterTab.Navigator
      screenOptions={({ route }) => ({
        headerStyle: {
          backgroundColor: '#4a488a'
        },
        headerTintColor: '#fff',
        tabBarLabelStyle: { fontSize: 14 },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Alimento') {
            iconName = focused ? 'ios-nutrition' : 'ios-nutrition';
          } else if (route.name === 'Ambiente') {
            iconName = focused ? 'ios-person' : 'ios-person';
          } 
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#07e09f',
        tabBarInactiveTintColor: '#808080',
      })}
    >

      {renderScreen(RegisterFoodScreen, "Alimento")}

    </RegisterTab.Navigator >

  );
}

export default RegisterTabNavigation