import axios from "axios"

import { URL_DOMAIN } from "../../constants/Domain" 

const URL_WITHDRAWN_API = URL_DOMAIN + '/retirada'

const headers = new Headers()
    headers.append('Content-Type', 'application/json')

/**
 * List all withdrawn via API
 * @returns {Promise}
 */ 
export const getWithdrawn = () => {
  return axios({
    url : URL_WITHDRAWN_API
  })
}

/**
 * List a withdrawal via API
 * @param {string} id 
 * @returns 
 */
 export const getWithdrawal = (id) => {
  return axios({
    method : 'get',
    url : URL_WITHDRAWN_API + '/' + id,
  })
}

/**
 * Register a withdrawal via API
 * @param {int} rg 
 * @param {int} quantidadeRetirados 
 * @param {int} idAlimento
 * @returns {Promise}
 */
export const postWithdrawal = (rg, quantidadeRetirados, idAlimento) => {
  return axios({
    method : 'post',
    url : URL_WITHDRAWN_API,
    headers : headers,
    data : {
      rg,
      quantidadeRetirados,
      idAlimento,
    }
  })
}

/**
 * Update a withdrawal via API
 * @param {string} id 
 * @param {int} rg 
 * @param {int} quantidadeRetirados 
 * @param {int} idAlimento
 * @returns {Promise}
 */
 export const putWithdrawal = (id, rg, quantidadeRetirados, idAlimento) => {
  return axios({
    method : 'put',
    url : URL_WITHDRAWN_API + '/' + id,
    headers : headers,
    data : {
      rg,
      quantidadeRetirados,
      idAlimento
    }
  })
}

/**
 * Delete a withdrawal via API
 * @param {string} id 
 * @returns 
 */
export const deleteWithdrawal = (id) => {
  return axios({
    method : 'delete',
    url : URL_WITHDRAWN_API + '/' + id,
  })
}