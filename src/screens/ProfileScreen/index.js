import React from 'react'

import {
  Alert,
  Image,
  SafeAreaView,
  Text,
  View
} from 'react-native'

import { Button } from 'react-native-elements'

import { clear, remove } from '../../database/Db';

import styles from '../../styles/Styles'

import ealimenta from '../../assets/img/ealimenta.png'

const ProfileScreen = ( props ) => {

  const { email, obj } = props.route.params || '';

  const deleteAccount = () => {
    Alert.alert(
      'Atenção',
      'Ahh!!! Você realmente deseja excluir sua conta?',
      [
        {
          text : 'Sim',
          onPress : () => {     
            remove(email, (error) => {
              if (error) {
                Alert.alert('Erro', 'Erro ao excluir a conta -erro!')
                return
              }
              Alert.alert('Sucesso', 'Conta excluída com sucesso!')
              props.navigation.reset({
                index: 0,
                routes: [{
                  name: 'LoginScreen'
                }]
              });
            })
          }
        },
        {
          text : 'Não'
        }
      ]      
    )
  }
       
  const clearUserDatabase = () => {
    Alert.alert(
      'Atenção',
      'Você realmente deseja limpar a banco de dados de usuário?',
      [
        {
          text : 'Sim',
          onPress : () => {     
            clear((error) =>{
              if(error) {
                Alert.alert('Erro', 'Não foi possível limpar o banco de dados')
              } else {
                Alert.alert('Sucesso', 'Banco de dados resetado com sucesso!')
              }
            })
          }
        },
        {
          text : 'Não'
        }
      ]      
    )
  }

  return (
    <SafeAreaView style={styles.container}>
       
        <View style={[styles.center, {top: '10%'}]}>
          <Image source={ealimenta} />
        </View>

        { email === 'ealimenta@email.com' && (
          <View style={[styles.content, styles.center]}>
            <Text style={[ styles.label, {marginBottom: 30} ]}>Olá,{'\n'}Admin!</Text> 
            <Button 
              buttonStyle={[styles.btn, {backgroundColor : '#F00'}]}
              icon={{
                color : '#FFF',
                name : 'trash',
                type : 'font-awesome-5'
              }} 
              onPress={() => clearUserDatabase()}     
              title='Limpar base de usuários' />
          </View>
        ) || (
          <View style={[styles.content, styles.center]}>
            <Text style={[ styles.label, {marginBottom: 30} ]}>Olá, {obj.name}!{'\n'}({obj.email})</Text>  
            <Button 
              buttonStyle={[styles.btn, {backgroundColor : '#F00'}]}
              icon={{
                color : '#FFF',
                name : 'trash',
                type : 'font-awesome-5'
              }} 
              onPress={() => deleteAccount()}     
              title='Excluir minha conta' />
          </View>
        )}       
      
    </SafeAreaView>
  )
}

export default ProfileScreen