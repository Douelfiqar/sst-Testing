import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, email, address } = req.body as { name: string; email: string; address: string };
    
    try {
      const newUser = await prisma.user.create({
        data: {
          name: name,
          email: email,
          address: address
        }
      });
      res.status(201).json({ user: newUser });
    } catch (error: any) {
      console.error("Request error", error);
      res.status(500).json({ error: "Error creating user", errorMessage: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
