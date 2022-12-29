import axios from "axios"

// let baseURL = "http://localhost:9000"
let baseURL = "http://197.54.238.177:9001"
// let baseURL = "http://ec2-3-9-43-164.eu-west-2.compute.amazonaws.com:9000"

// deprecated
if (process.env.GATSBY_STORE_URL) {
  baseURL = process.env.GATSBY_STORE_URL
}

// takes precedence over GATSBY_STORE_URL
if (process.env.GATSBY_MEDUSA_BACKEND_URL) {
  baseURL = process.env.GATSBY_MEDUSA_BACKEND_URL
}

const client = axios.create({ baseURL })

export default function medusaRequest(method, path = "", payload = {}) {
  const options = {
    method,
    withCredentials: true,
    url: path,
    data: payload,
    json: true,
  }
  return client(options)
}

export const multipartRequest = (path, payload) => {
  const options = {
    withCredentials: true,
    headers: {
      "content-type": "multipart/form-data",
    },
  }

  return client.post(path, payload, options)
}
