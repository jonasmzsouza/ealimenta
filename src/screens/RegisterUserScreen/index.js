import React, {
  useState
} from 'react'

import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  View
} from 'react-native'

import { Button } from 'react-native-elements'

import { insertObject } from '../../database/Db';

import { Picker } from '@react-native-picker/picker';

import { read } from '../../database/Db';

import { emailRegex, getItems } from '../../stores/constants/Constants';

import institution from '../../data/institution.json'

import styles from '../../styles/Styles';

const RegisterUserScreen = (props) => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedInstitution, setSelectedInstitution] = useState(0);

  const clearFields = () => {
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setSelectedInstitution(0);
  }

  const validateFieldData = () => {

    let errors = [];
    
    if (name.trim().length == 0)
      errors.push('o nome completo');

    if (selectedInstitution === 0 || selectedInstitution === undefined)
      errors.push('a instituição');      

    if (!emailRegex.test(email))
      errors.push('o email');

    if (password.trim().length == 0)
      errors.push('a senha');

    if (password != confirmPassword)
      errors.push('as senhas devem ser iguais');    

    if (errors.length > 0) {
      let mensagemErro = '';
      errors.forEach(element => {
        mensagemErro += '\n - ' + element
      });

      Alert.alert("Erro", "Informe corretamente:" + mensagemErro);
      return false;
    }

    if (email == 'ealimenta@email.com') {
      Alert.alert('Erro', 'Email não disponível, por favor escolha outro email para o cadastro')
      return false
    }

    return true
  }

  const registerData = () => {
    if (validateFieldData()) {
      read(email, (error, value) => {
        if (error) {
          Alert.alert('Erro', 'Erro ao realizar o cadastro');
          return
        }
  
        let obj = JSON.parse(value)
        if (obj != null && email === obj.email) {
          Alert.alert('Erro', 'Usuário (email) já registrado no sistema!');
        } else {
          let objUser = {
            name: name,
            institution: selectedInstitution,
            email: email,
            password: password,
          };
          insertObject(email, objUser, (error) => {
            if (error) {
              Alert.alert('Erro', 'Erro ao realizar o cadastro');
            } else {
              Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
              clearFields()
              props.navigation.navigate('LoginScreen')
            }
          });
        }
      })
    }
  }

  return (
    <ScrollView style={[styles.container]}>
      <View style={[styles.content, styles.center, {paddingTop: '5%'}]}>
        <View style={{ width: '90%', alignItems: 'center' }}>
          
          <View>
            <Text style={[styles.fieldLabel]}>
              Nome Completo:
            </Text>

            <TextInput
              onChangeText={(txt) => setName(txt)}
              style={[styles.field, styles.registrationField]}
              underlineColorAndroid='transparent'
              value={name}
            />
          </View>

          <View>
            <Text style={[styles.fieldLabel]}>
              Instituição:
            </Text>

            <View style={[styles.registrationSelectionView]}>
              <Picker
                style={[styles.registrationSelectionPicker]}
                selectedValue={selectedInstitution}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedInstitution(itemValue)
                }
              >
                
                { getItems(institution) }
                  
              </Picker>
            </View>
          </View>

          <View>
            <Text style={[styles.fieldLabel]}>
              Email:
            </Text>

            <TextInput
              onChangeText={(txt) => setEmail(txt)}
              style={[styles.field, styles.registrationField]}
              underlineColorAndroid='transparent'
              value={email}
            />
          </View>

          <View>
            <Text style={[styles.fieldLabel]}>
              Senha:
            </Text>

            <TextInput
              onChangeText={(txt) => setPassword(txt)}
              style={[styles.field, styles.registrationField]}
              underlineColorAndroid='transparent'
              secureTextEntry
              value={password}
            />
          </View>

          <View>
            <Text style={[styles.fieldLabel]}>
              Confirmar Senha:
            </Text>

            <TextInput
              onChangeText={(txt) => setConfirmPassword(txt)}
              style={[styles.field, styles.registrationField]}
              underlineColorAndroid='transparent'
              secureTextEntry
              value={confirmPassword}
            />
          </View>

          <View>
            <Button
              buttonStyle={styles.btn}
              icon={{
                color : '#fff',
                name : 'save',
                type : 'font-awesome-5'
              }}
              onPress={() => registerData()}
              titleStyle={{
                fontSize: 20,
                fontWeight: 'bold'
              }}
              title="Criar meu cadastro"
            />
          </View>

        </View>        
      </View>
    </ScrollView>
  )
}

export default RegisterUserScreen