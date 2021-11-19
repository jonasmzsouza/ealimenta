import axios from "axios"

import { URL_DOMAIN } from "../../constants/Domain" 

const URL_FOOD_API = URL_DOMAIN + '/alimento'

const headers = new Headers()
    headers.append('Content-Type', 'application/json')

/**
 * List all foods via API
 * @returns {Promise}
 */ 
export const getFoods = () => {
  return axios({
    url : URL_FOOD_API
  })
}

/**
 * List a food via API
 * @param {string} id 
 * @returns 
 */
 export const getFood = (id) => {
  return axios({
    method : 'get',
    url : URL_FOOD_API + '/' + id,
  })
}

/**
 * Register a food via API
 * @param {string} nome 
 * @param {string} tipo 
 * @param {string} dataVencimento 
 * @param {int} quantidade 
 * @returns {Promise}
 */
export const postFood = (nome, tipo, dataVencimento, quantidade) => {
  return axios({
    method : 'post',
    url : URL_FOOD_API,
    headers : headers,
    data : {
      nome,
      tipo,
      dataVencimento,
      quantidade
    }
  })
}

/**
 * Update a food via API
 * @param {string} id 
 * @param {string} nome 
 * @param {string} tipo 
 * @param {Array} dataVencimento 
 * @param {int} quantidade 
 * @returns {Promise}
 */
 export const putFood = (id, nome, tipo, dataVencimento, quantidade) => {
  return axios({
    method : 'put',
    url : URL_FOOD_API + '/' + id,
    headers : headers,
    data : {
      nome,
      tipo,
      dataVencimento,
      quantidade
    }
  })
}

/**
 * Delete a food via API
 * @param {string} id 
 * @returns 
 */
export const deleteFood = (id) => {
  return axios({
    method : 'delete',
    url : URL_FOOD_API + '/' + id,
  })
}