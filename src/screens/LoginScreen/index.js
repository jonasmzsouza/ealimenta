import React, {
  useState
} from 'react'

import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'

import { 
  Button, 
  Icon  
} from 'react-native-elements'

import ealimenta from '../../assets/img/ealimenta.png'

import { read } from '../../database/Db';

import { emailRegex } from '../../stores/constants/Constants'

import styles from '../../styles/Styles'

const LoginScreen = ( props ) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const redirectHome = (obj) => {
    clearFields()
    props.navigation.reset({
      index : 0,
      routes : [
        {
          name : 'HomeScreen',
          params : { email, obj }
        }
      ]
    })
  }

  const clearFields = () => {
    setEmail('');
    setPassword('');
  }

  const validateFieldData = () => {

    if (!emailRegex.test(email)) {
      Alert.alert('Erro', 'Informe um email válido')
      return false
    }

    if (password.trim().length === 0) {
      Alert.alert('Erro', 'Informe corretamente a senha')
      return false
    }

    return true
  }

  const signin = () => {  
    if (validateFieldData()) {
      if (email === 'ealimenta@email.com' && password === 'ealimenta') {
        redirectHome({})
      } else {
        read(email, (error, success) => {
          if (error) {
            Alert.alert('Erro', 'Email/senha inválidos!')
            return
          }
          
          let obj = JSON.parse( success )
          if (obj != null && password === obj.password ) {
            redirectHome(obj)
          }
          else {
            Alert.alert('Erro', 'Email/senha inválidos!')
          }
        })
      }
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      
      <View style={[styles.content, styles.center]}>

        <View style={[styles.center, {bottom: '10%'}]}>
          <Image source={ealimenta} />
        </View>
      
        <View style={{ width: '90%', alignItems: 'center' }}>

          <View style={{flexDirection: 'row'}}>
            <Icon
              name='email'
              type='entypo'
              color='#fff'
              size={25}
              style={[styles.icon, styles.iconLeft]}
            />
            <TextInput
              style={[styles.field, styles.loginField, styles.fieldRight]}
              onChangeText={(txt) => setEmail(txt)}
              placeholder="Digite seu email"
              underlineColorAndroid='transparent'
              value={email}
            />
          </View>

          <View style={{flexDirection: 'row'}}>
              <Icon
                name='lock'
                type='font-awesome-5'
                color='#fff'
                size={25}
                style={[styles.icon, styles.iconLeft]}
              />

              <TextInput
                style={[styles.field, styles.loginField, styles.fieldRight]}
                onChangeText={(txt) => setPassword(txt)}
                placeholder="Digite sua senha"
                underlineColorAndroid='transparent'
                secureTextEntry
                value={password}
              />
          </View>

          <Button
            buttonStyle={[styles.btn]}
            icon={{
              color : '#fff',
              name : 'sign-in-alt',
              type : 'font-awesome-5'
            }}
            onPress={() => signin()}
            titleStyle={{
              fontSize: 20,
              fontWeight: 'bold'
            }}
            title="Entrar"
          />

          <View style={[styles.center]}>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('RegisterUserScreen')
              }}
            >
              <Text style={[styles.txtBtnAccess]}>meu primeiro acesso</Text>
            </TouchableOpacity>         
          </View>

          <ActivityIndicator animating={ loading } />

        </View>
      </View>

    </SafeAreaView>
  )
}

export default LoginScreen