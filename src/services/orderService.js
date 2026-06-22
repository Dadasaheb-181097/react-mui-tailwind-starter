import { apiClient } from './apiClient'
import { API_ENDPOINTS } from './apiEndpoints'

export async function getOrders(params) {
  const { data } = await apiClient.get(API_ENDPOINTS.ORDERS.LIST, { params })
  return data
}

export async function getOrderById(orderId) {
  const { data } = await apiClient.get(API_ENDPOINTS.ORDERS.DETAILS(orderId))
  return data
}

export async function createOrder(payload) {
  const { data } = await apiClient.post(API_ENDPOINTS.ORDERS.CREATE, payload)
  return data
}

export async function updateOrder(orderId, payload) {
  const { data } = await apiClient.put(API_ENDPOINTS.ORDERS.UPDATE(orderId), payload)
  return data
}

export async function deleteOrder(orderId) {
  const { data } = await apiClient.delete(API_ENDPOINTS.ORDERS.DELETE(orderId))
  return data
}
