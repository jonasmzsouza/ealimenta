import React, {
  useEffect,
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

import { getFoods } from '../../stores/services/FoodService'

const ListRegisteredFoodScreen = (props) => {

  const { refresh } = props.route.params || '';

  const [foodData, setFoodData] = useState({})
  const [isRefreshing, setIsRefreshing] = useState(false)
    
  const getInitialData = () => {
    setIsRefreshing(true)
    getFoods()
      .then((response) => setFoodData(response.data))
      .catch(() => Alert.alert('Erro', 'Não foi possível recuperar os dados da API'))
      .finally(() => setIsRefreshing(false))                 
  }
  
  useFocusEffect(
    React.useCallback(() => {
      console.log(refresh)
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

      <FlatList
        data={ foodData }
        keyExtractor={(food) => food.id }
        renderItem={({item}) => (
          <ListFoodItem item={ item } editMode={ true } />
        )} 
        refreshControl={
          <RefreshControl
          onRefresh={ () => getInitialData()}
          refreshing={ isRefreshing } 
          colors={[ '#07e09f' ]} />
        }
      />

    </View>
  )
}

export default ListRegisteredFoodScreen