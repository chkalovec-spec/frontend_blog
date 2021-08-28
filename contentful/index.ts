import { createClient } from 'contentful'

const client = createClient({
  space: process.env.CONTENTFUL_SPACE || '',
  accessToken: process.env.CONTENTFUL_ACCESSTOKEN || '',
})

export default client
