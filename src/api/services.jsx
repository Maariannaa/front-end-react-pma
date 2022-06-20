import client from "./client"

export const newList = (params) => {
  return client.post("/lists", params)
}

export const getList = (id) => {
  return client.get(`/lists/${id}`)
}

export const getProduct = (id) => {
  return client.get(`/products/${id}`)
}

export const newProduct = (params) => {
  return client.post("/products", params)
}

export const editProduct = (params, id) => {
  return client.put(`/products/${id}`, params)
}

export const editTitleList = (params, id) => {
  return client.put(`/lists/${id}`, params)
}

export const removeProduct = (id) => {
  return client.delete(`/products/${id}`)
}

export const removeList = (id) => {
  return client.delete(`/lists/${id}`)
}

