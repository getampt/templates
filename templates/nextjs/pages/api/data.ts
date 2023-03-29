import { data } from '@ampt/data'

export default async function handler(req, res) {
  const result = (await data.get('user:*', true)) as any

  res.json({
    users: result.items
  })
}
