import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return res.status(405).end('Method Not Allowed')
  }

  try {
    const records = await prisma.generatedPFP.findMany({
      orderBy: { createdAt: 'desc' },
    })
    const images = records.map((r) => r.url)
    return res.status(200).json({ images })
  } catch (e) {
    console.error(e)
    return res.status(500).json({ error: 'Database error' })
  }
}
