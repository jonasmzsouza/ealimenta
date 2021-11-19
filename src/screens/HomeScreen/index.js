import React from 'react'

import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View
} from 'react-native'

import { Icon } from 'react-native-elements'

import styles from '../../styles/Styles'

import ealimenta from '../../assets/img/ealimenta.png'

const HomeScreen = ( props ) => {

  const { email, obj } = props.route.params || '';

  const logout = () => {
    props.navigation.reset({
      index: 0,
      routes: [{
        name: 'LoginScreen'
      }]
    });
  }

  const profile = () => {
    props.navigation.navigate('ProfileScreen', { email, obj })
  }

  const renderBtn = (name, iconName, screen, params) => {
    return (
      <TouchableOpacity
        style={[styles.center, styles.btnHomeScreen]}
        onPress={() => {
          props.navigation.navigate(screen, {
            screen: params
          })
        }}>
        <Icon
          name={iconName}
          type='font-awesome-5'
          color='#fff'
          size={50}
        />
        <Text style={[styles.txtBtnHomeScreen]}>{name}</Text>
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView style={styles.container}>

        <View style={[styles.center]}>
          <View style={[styles.btnProfile]}>
            <TouchableOpacity
              onPress={() => profile()}
            >
              <Icon
                name='user-alt'
                type='font-awesome-5'
                color='#fff'
                size={20}
              />
            </TouchableOpacity>
          </View>          
        </View>
        
        <View style={[styles.center, {top: '10%'}]}>
          <Image source={ealimenta} />
        </View>

        <View style={[styles.content, styles.center]}>
          {renderBtn('Cadastrar', 'plus-circle', 'RegisterTabNavigation')}

          {renderBtn('Retirar', 'minus-circle', 'ListAvailableFoodScreen', 'alimento')}
        </View>

        <View style={[styles.center, {bottom: '10%'}]}>
          <View style={[styles.btnLogout]}>
            <TouchableOpacity
              onPress={() => logout()}
            >
              <Icon
                name='sign-out-alt'
                type='font-awesome-5'
                color='#fff'
              />
              <Text style={[styles.labelLogout]}>Sair</Text>
            </TouchableOpacity>
          </View>          
        </View>
      
    </SafeAreaView>
  )
}

export default HomeScreen