import { NextApiRequest, NextApiResponse } from 'next';
import stripe from 'stripe';

const stripeClient = new stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2023-08-16', // Ejemplo de versión, usa la versión que necesites
  });

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { session_id } = req.body;

  try {
    const session = await stripeClient.checkout.sessions.retrieve(session_id);
    if (session.payment_status === 'paid') {
      // Aquí puedes crear la reserva en tu base de datos
      // y realizar cualquier otra acción necesaria.

      res.status(200).json({ success: true });
    } else {
      res.status(400).json({ error: 'Payment not successful' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export default handler;