import config from './config'
import auth from './auth'
import request from './request'
import { color } from './theme'
import {tools} from './tools'
import shouldComponentUpdate from './shouldComponentUpdate'

/**
 * @param   {String}
 * @return  {String}
 */

const queryURL = (name) => {
  let reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i')
  let r = window.location.search.substr(1).match(reg)
  if (r != null) return decodeURI(r[2])
  return null
}


/**
 * 数组内查询
 * @param   {array}     array
 * @param   {String}    id
 * @param   {String}    keyAlias
 * @return  {Array}
 */
const queryArray = (array, key, keyAlias = 'key') => {
  if (!(array instanceof Array)) {
    return null
  }
  const item = array.filter(_ => _[keyAlias] === key)
  if (item.length) {
    return item[0]
  }
  return null
}

module.exports = {
	queryURL,
  queryArray,
  config,
  auth,
  request,
  color,
  tools,
  shouldComponentUpdate
}
