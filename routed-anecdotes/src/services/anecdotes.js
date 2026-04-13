const baseUrl = 'http://localhost:3001/anecdotes'

const service = async (url, options = {}) => {

  const response = await fetch(url, options)

  if (!response.ok) {
    throw new Error('Failed to fetch notes')
  }

  return await response.json()
}

const getAll = async () => {
  return await service(baseUrl)
}

const createNew = async (object) => {
  return await service(baseUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(object),
  })
}

const remove = async(id) => {
  return await service(`${baseUrl}/${id}`, {
    method: 'DELETE'
  })
}

export default { getAll, createNew, remove }