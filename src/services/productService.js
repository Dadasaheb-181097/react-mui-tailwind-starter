import { apiClient } from './apiClient'
import { API_ENDPOINTS } from './apiEndpoints'

export async function getProducts(params) {
  const { data } = await apiClient.get(API_ENDPOINTS.PRODUCTS.LIST, { params })
  return data
}

export async function getProductById(productId) {
  const { data } = await apiClient.get(API_ENDPOINTS.PRODUCTS.DETAILS(productId))
  return data
}

export async function createProduct(payload) {
  const { data } = await apiClient.post(API_ENDPOINTS.PRODUCTS.CREATE, payload)
  return data
}

export async function updateProduct(productId, payload) {
  const { data } = await apiClient.put(API_ENDPOINTS.PRODUCTS.UPDATE(productId), payload)
  return data
}

export async function deleteProduct(productId) {
  const { data } = await apiClient.delete(API_ENDPOINTS.PRODUCTS.DELETE(productId))
  return data
}
