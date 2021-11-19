import React from 'react'

import {
  Alert,
  Text,
  View
} from 'react-native'

import { useNavigation } from '@react-navigation/native';

import { Button } from 'react-native-elements'

import typeOfFood from '../../data/typeOfFood.json'

import styles from '../../styles/Styles'

import { dataObjectToString, getName } from '../../stores/constants/Constants';

import { deleteFood } from '../../stores/services/FoodService'

const ListFoodItem = (props) => {
  const { item, editMode, withdrawnMode } = props
  const navigation = useNavigation();

  const editFood = () => {
    navigation.navigate('RegisterFoodScreen', {
      item: item,
      editMode: editMode
    })
  }

  const excludeFood = () => {
    Alert.alert(
      'Atenção',
      'Você realmente deseja deletar este alimento: ' + item.nome,
      [
        {
          text : 'Sim',
          onPress : () => {     
            deleteFood(item.id)
              .then(() => {
                Alert.alert('Sucesso', 'Alimento excluído com sucesso!'),
                navigation.navigate('ListRegisteredFoodScreen', {
                  refresh: true
                })
              })
              .catch(() => Alert.alert('Erro', 'Não foi possível excluir o alimento!'))
          }
        },
        {
          text : 'Não'
        }
      ]      
    )
  }

  const withdrawFood = () => {
    navigation.navigate('FoodWithdrawalScreen', {
      item: item
    })
  }

  return (
    <View style={[ styles.itemContent ]}>
      
      <View style={[ styles.itemLabels ]}>
        { withdrawnMode && (
          <>
            <Text style={[ styles.labelItemList, styles.labelDateItemList ]}>
              Retirado em: { dataObjectToString(item.dataRetirada) }
            </Text>
            <Text style={[ styles.labelItemList, styles.labelNameItemList ]}>
              { item.nomeAlimento }
            </Text>
            <View style={[ styles.labelItemInfo ]}>
              <Text style={[ styles.labelItemList ]}>
                Tipo: { getName(typeOfFood, item.tipo) }
              </Text>
              <Text style={[ styles.labelItemList ]}>
                Quantidade: { item.quantidadeRetirados } 
              </Text>                    
            </View>
            <Text style={[ styles.labelItemList, {fontSize: 16, color: "#ff0059"} ]}>
              Retirado por:{"\n"}{item.rg }
            </Text>            
          </>                 
        ) || (
          <>
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
          </>         
        )}
      </View>
      
      { editMode && (
        <>
          <Button
            buttonStyle={[styles.btn, {marginBottom: 8}]}
            icon={{
              color : '#FFF',
              name : 'sync',
              type : 'font-awesome-5'
            }} 
            onPress={() => editFood()}     
            title='Editar Alimento' />

          <Button 
            buttonStyle={[styles.btn, {backgroundColor : '#F00'}]}
            icon={{
              color : '#FFF',
              name : 'trash',
              type : 'font-awesome-5'
            }} 
            onPress={() => excludeFood()}     
            title='Excluir Alimento' />
        </>
      ) || withdrawnMode && (
        <>
        </>
      ) || (
        <Button 
          buttonStyle={[styles.btn, {marginBottom: 8}]}
          icon={{
            color : '#FFF',
            name : 'shopping-cart',
            type : 'font-awesome-5'
          }} 
          onPress={() => withdrawFood()} 
          title='Retirar' />          
      )}

    </View>
  )
}

export default ListFoodItem