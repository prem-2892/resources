import redis from 'redis'
const client = redis.createClient({ url: process.env.REDIS_URL })

export const setUser = async (key, value) => {
  try {
    return await client.set(key, JSON.stringify(value))
  } catch (error) {
    console.error('Error setting Redis key:', error)
    throw error
  }
}

export const getUser = async (key) => {
  try {
    const value = await client.get(key)
    return JSON.parse(value)
  } catch (error) {
    console.error('Error getting Redis key:', error)
    throw error
  }
}
