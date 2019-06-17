import axios from 'axios'

const client = axios.create({
  baseURL: 'http://localhost:9000',
  timeout: 10000,
  validateStatus: status => status >= 200 && status < 300,
})

const allUsers = () => {
  return client.get('/')
}

const createUser = data => {
  return client.post('/', data)
}

const updateUser = user => {
  return client.patch(`/${user.id}`, user)
}

const destroyUser = userId => {
  return client.delete(`/${userId}`)
}

const sortUsers = users => {
  return users.sort((a, b) => a.name.localeCompare(b.name) )
}

const isSynced = () => {
  return client.get('/synced')
}

const sync = () => {
  return client.patch('/sync')
}

export {
  allUsers,
  createUser,
  updateUser,
  destroyUser,
  sortUsers,
  isSynced,
  sync,
}
