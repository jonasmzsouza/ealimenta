import React from 'react'

import { Alert } from 'react-native'

import { Picker } from "@react-native-picker/picker"

export const emailRegex = /^([\w]\.?)+@([\w]+\.)+([a-zA-Z]{2,4})+$/;

export const numRegex = /[^0-9]/g;

/**
 * 
 * @param {int} quantity 
 * @returns {boolean}
 */
export const validateQuantity = (quantity) => {
  if ( quantity.trim().length === 0 ) {
    Alert.alert('Erro', 'Informe uma quantidade!')
    return false
  }
  
  if ( ! /^\d+$/.test(quantity) ) {
    Alert.alert('Erro', 'A quantidade deve ser um valor numérico!')
    return false
  }

  if ( parseInt(quantity) < 1 ) {
    Alert.alert('Erro', 'Informe um valor positivo para a quantidade')
    return false
  }

  return true
}

/**
 * 
 * @param {Array} itemData 
 * @returns {Array} items
 */
 export const getItems = (itemData) => {
  let items = []
  items.push(<Picker.Item key={0} label="Selecione..." value={0} />)
  for (let i=0; i<itemData.length; i++) {
    items.push(<Picker.Item key={itemData[i].id} label={itemData[i].nome} value={itemData[i].id} />)
  }
  return items
}

/**
 * 
 * @param {Array} itemData 
 * @param {int} itemId 
 * @returns {string} name
 */
 export const getName = (itemData, itemId) => {
  let name
  itemData.forEach(element => { 
    if(element.id == itemId) {
      name = element.nome
    }
  });
  return name
}

/**
 * 
 * @param {Array} date 
 * @returns {string} formated date "dd/mm/yyyy"
 */
export const dataObjectToString = (date) => {
  return date[2] + '/' + date[1] + '/' + date[0]
}