import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).end('Method Not Allowed')
  }

  const { url } = req.body
  if (!url) return res.status(400).json({ error: 'Missing image URL' })

  try {
    const record = await prisma.generatedPFP.create({ data: { url } })
    return res.status(201).json(record)
  } catch (e) {
    console.error(e)
    return res.status(500).json({ error: 'Database error' })
  }
}