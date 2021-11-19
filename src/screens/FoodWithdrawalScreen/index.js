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

import typeOfFood from '../../data/typeOfFood.json'

import styles from '../../styles/Styles';

import { numRegex, dataObjectToString, getName } from '../../stores/constants/Constants';

import { postWithdrawal } from '../../stores/services/WithdrawalService';

const FoodWithdrawalScreen = (props) => {

  const [quantity, setQuantity] = useState('')
  const [documentNumber, setDocumentNumber] = useState('');

  const { item } = props.route.params || '';

  const clearFields = () => {
    setQuantity('');
    setDocumentNumber('');
  }

  const validateFieldData = () => {

    let errors = [];

    if (quantity.trim().length == 0 || numRegex.test(quantity) || quantity < 1 || quantity > item.quantidade)
      errors.push(`a quantidade deve ser no mínimo 1 e no máximo ${item.quantidade}`);

    if (documentNumber.trim().length == 0)
      errors.push('o número do documento');

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

  const registerWithdrawn = () => {
    if (validateFieldData()) {
      postWithdrawal(documentNumber, quantity, item.id)
        .then(() => {
          Alert.alert('Sucesso', 'Alimento retirado com sucesso!')
          clearFields()
          props.navigation.goBack()
        })
        .catch(() => Alert.alert('Erro', 'Não foi possível retirar o alimento!'))
    }
  }

  return (
    <ScrollView style={[styles.container]}>
      <View style={[styles.content, styles.center, {paddingTop: '5%'}]}>
        <View style={{ width: '90%', alignItems: 'center' }}>
          
          <View style={[ styles.itemLabels ]}>
            <Text style={[ styles.labelItemList, styles.labelDateItemList ]}>
              Vence em: { dataObjectToString(item.dataVencimento) }
            </Text>          

            <Text style={[ styles.labelItemList, styles.labelNameItemList ]}>
              { item.nome }
            </Text>

            <View style={[ styles.labelItemInfo ]}>
              <Text style={[ styles.labelItemList ]}>
                Tipo: { getName(typeOfFood, item.tipo) }
              </Text>

              <Text style={[ styles.labelItemList ]}>
                Estoque: { item.quantidade }
              </Text>
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
              Número do RG:
            </Text>

            <TextInput
              keyboardType="numeric"
              onChangeText={(txt) => setDocumentNumber(txt)}
              style={[styles.field, styles.registrationField]}
              underlineColorAndroid='transparent'
              value={documentNumber}
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
              onPress={() => registerWithdrawn()}
              titleStyle={{
                fontSize: 20,
                fontWeight: 'bold'
              }}
              title="Registrar Retirada"
            />
          </View>

        </View>        
      </View>
    </ScrollView>
  )
}

export default FoodWithdrawalScreen