import { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'
import { getSession } from 'next-auth/react'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const filePath = (req.query.path as string[]).join('/')
  const fullPath = path.join(process.cwd(), 'private', filePath)

  if (!fs.existsSync(fullPath)) {
    return res.status(404).json({ error: 'File not found' })
  }

  const contentType = 'application/zip'

  const fileContent = fs.readFileSync(fullPath)
  res.setHeader('Content-Type', contentType)
  res.setHeader('Content-Disposition', `inline; filename="${path.basename(fullPath)}"`)
  res.send(fileContent)
}