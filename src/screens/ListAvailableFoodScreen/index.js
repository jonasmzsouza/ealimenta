import React,{
  useState
} from 'react'

import {
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  View
} from 'react-native'

import { useFocusEffect } from '@react-navigation/core';

import ListFoodItem from '../../components/ListFoodItem'

import styles from '../../styles/Styles'

import { getFoods } from '../../stores/services/FoodService'

const ListAvailableFoodScreen = (props) => {

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
      getInitialData()
      return () => {
      };
    }, [])
  );  

  const listWithdrawn = () => {
    props.navigation.navigate('ListWithdrawnFoodScreen')
  }

  return (
    <View>
      
      <View style={[styles.btnListWithdrawnContainer]}>
        <TouchableOpacity
          style={[ styles.btnListWithdrawn ]}
          onPress={() => listWithdrawn()}
        >
          <Text style={[styles.labelBtnListWithdrawn]}>Listar Retirados</Text>
        </TouchableOpacity>          
      </View>

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
          <ListFoodItem item={ item } />
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

export default ListAvailableFoodScreen