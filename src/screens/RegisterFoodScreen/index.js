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

import { 
  Button, 
  Icon  
} from 'react-native-elements'

import { useFocusEffect } from '@react-navigation/core';

import { Picker } from '@react-native-picker/picker';

import DatePicker from 'react-native-date-picker'

import { format } from "date-fns";

import styles from '../../styles/Styles';

import typeOfFood from '../../data/typeOfFood.json'

import { dataObjectToString, getItems, validateQuantity } from '../../stores/constants/Constants';

import { postFood, putFood } from '../../stores/services/FoodService';

const RegisterFoodScreen = (props) => {

  const { item, editMode } = props.route.params || '';
  
  const [name, setName] = useState('');
  const [selectedType, setSelectedType] = useState(0);
  const [quantity, setQuantity] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)  

  const clearFields = () => {
    setName('');
    setSelectedType(0);
    setQuantity('');
    setDueDate('');
  }

  const loadInputEditMode = () => {
    if(editMode) {
      setName(item.nome)
      setSelectedType(parseInt(item.tipo))
      setQuantity(String(item.quantidade))
      setDueDate(dataObjectToString(item.dataVencimento))
    }
  }

  const validateFieldData = () => {

    let errors = [];
    
    if (name.trim().length == 0)
      errors.push('o nome do alimento');

    if (selectedType === 0 || selectedType === undefined)
      errors.push('o tipo');

    if (quantity.trim().length == 0)
      errors.push('a quantidade');

    if (dueDate.trim().length == 0)
    errors.push('a data de vencimento');

    if (errors.length > 0) {
      let mensagemErro = '';
      errors.forEach(element => {
        mensagemErro += '\n - ' + element
      });

      Alert.alert("Erro", "Informe corretamente:" + mensagemErro);
      return false;
    }

    return true
  }

  const registerFood = () => {
    if (validateFieldData()) {
      if(validateQuantity(quantity)) {
        postFood(name, selectedType, date, quantity)
          .then(() => {
            Alert.alert('Sucesso', 'Alimento cadastrado com sucesso!')
            clearFields()
          })
          .catch(() => Alert.alert('Erro', 'Não foi possível cadastrar o alimento!'))
      }
    }
  }

  const validateData = () => {
    if (dataObjectToString(item.dataVencimento) === dueDate) {
      return item.dataVencimento;
    } else {
      return date
    }
  }

  const updateFood = () => {
    if(validateFieldData()) {
      putFood(item.id, name, selectedType, validateData(), quantity)
        .then(() => {
          Alert.alert('Sucesso', 'Alimento atualizado com sucesso!')
          clearFields()
          props.navigation.goBack()
        })
        .catch(() => Alert.alert('Erro', 'Não foi possível atualizar o alimento!'))
    }
  }

  useFocusEffect(
    React.useCallback(() => {
        loadInputEditMode()
      return () => {
      };
    }, [])
  );

  return (
    <ScrollView style={[styles.container]}>
      <View style={[styles.content, styles.center, {paddingTop: '5%'}]}>
        <View style={{ width: '90%', alignItems: 'center' }}>
          
          <View>
            <Text style={[styles.fieldLabel]}>
              Nome do Alimento:
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
              Tipo do Alimento:
            </Text>

            <View style={[styles.registrationSelectionView]}>
              <Picker
                style={[styles.registrationSelectionPicker]}
                selectedValue={selectedType}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedType(itemValue)
                }
              >
                
                { getItems(typeOfFood) }
                  
              </Picker>
            </View>
          </View>

          <View>
            <Text style={[styles.fieldLabel]}>
              Quantidade:
            </Text>

            <TextInput
              keyboardType="numeric"
              onChangeText={(txt) => setQuantity(txt)}
              style={[styles.field, styles.registrationField]}
              underlineColorAndroid='transparent'
              value={quantity}
            />
          </View>

          <View>
            <Text style={[styles.fieldLabel]}>
              Data de Vencimento:
            </Text>

            <View style={{flexDirection: 'row'}}>
              <Text style={[styles.field, styles.registrationField, styles.fieldLeft]}>
                {dueDate}
              </Text>
              <Icon
                onPress={() => {
                  setOpen(true)
                }}
                name='calendar-alt'
                type='font-awesome-5'
                color='#fff'
                size={25}
                iconStyle={[styles.icon, styles.iconRight]}
              />
            </View>
          </View>

          
          <DatePicker
            modal
            mode="date"
            locale="pt-BR"
            title="Selecione a Data"
            confirmText="Confirmar"
            cancelText="Cancelar"
            open={open}
            date={date}
            onConfirm={(date) => {
              setOpen(false)
              setDate(date)
              setDueDate(format(date, 'dd/MM/yyyy'))
            }}
            onCancel={() => {
              setOpen(false)
            }}
          />

          { editMode && (
            <>
              <View>
                <Button
                  buttonStyle={styles.btn}
                  icon={{
                    color : '#fff',
                    name : 'save',
                    type : 'font-awesome-5'
                  }}
                  onPress={() => updateFood()}
                  titleStyle={{
                    fontSize: 20,
                    fontWeight: 'bold'
                  }}
                  title="Atualizar"
                />
              </View>
              
              <View>
                <Button
                  buttonStyle={[styles.btn, {backgroundColor : '#F00'}]}
                  icon={{
                    color : '#fff',
                    name : 'times-circle',
                    type : 'font-awesome-5'
                  }}
                  onPress={() => {
                    props.navigation.goBack()
                  }}
                  titleStyle={{
                    fontSize: 20,
                    fontWeight: 'bold'
                  }}
                  title="Cancelar"
                />
              </View>
            </>
          ) || (
            <>
              <View>
                <Button
                  buttonStyle={styles.btn}
                  icon={{
                    color : '#fff',
                    name : 'save',
                    type : 'font-awesome-5'
                  }}
                  onPress={() => registerFood()}
                  titleStyle={{
                    fontSize: 20,
                    fontWeight: 'bold'
                  }}
                  title="Cadastrar"
                />
              </View>

              <View>
                <Button
                  buttonStyle={styles.btn}
                  icon={{
                    color : '#fff',
                    name : 'clipboard-list',
                    type : 'font-awesome-5'
                  }}
                  onPress={() => {
                    props.navigation.navigate('ListRegisteredFoodScreen')
                  }}
                  titleStyle={{
                    fontSize: 20,
                    fontWeight: 'bold'
                  }}
                  title="Listar Cadastro"
                />
              </View>
            </>
          )}

        </View>        
      </View>
    </ScrollView>
  )
}

export default RegisterFoodScreen