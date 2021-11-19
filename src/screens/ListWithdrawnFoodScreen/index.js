import React, {
  useState
} from 'react'

import {
  FlatList,
  RefreshControl,
  Text,
  View
} from 'react-native'

import { useFocusEffect } from '@react-navigation/core';

import ListFoodItem from '../../components/ListFoodItem'
import styles from '../../styles/Styles'

import { getWithdrawn } from '../../stores/services/WithdrawalService'

const ListWithdrawnFoodScreen = (props) => {

  const [foodData, setFoodData] = useState({})
  const [isRefreshing, setIsRefreshing] = useState(false)

  const getInitialData = () => {
    setIsRefreshing(true)
    getWithdrawn()
      .then((response) => setFoodData(response.data))
      .catch(() => Alert.alert('Erro', 'Não foi possível recuperar os dados da API'))
      .finally(() => setIsRefreshing(false))                 
  }
  
  useFocusEffect(
    React.useCallback(() => {
      getInitialData()
      return () => {
      };
    }, [])
  );

  return (
    <View>

      { isRefreshing && (
        <Text style={[ styles.label ]}>
          Carregando dados... 
        </Text>
      )}

      { !isRefreshing && foodData.length === 0 && (
        <Text style={[ styles.label, styles.labelList ]}>
          Não há dados para serem exibidos!
        </Text>
      )} 

      { foodData.length > 0 && (
        <FlatList
          data={ foodData }
          keyExtractor={(food) => food.id }
          renderItem={({item}) => (
            <ListFoodItem item={ item } withdrawnMode={ true } />
          )} 
          refreshControl={
            <RefreshControl
            onRefresh={ () => getInitialData()}
            refreshing={ isRefreshing } 
            colors={[ '#07e09f' ]} />
          }
        />
      )}

    </View>
  )
}

export default ListWithdrawnFoodScreen