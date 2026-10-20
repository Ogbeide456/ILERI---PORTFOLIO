import type { NextApiRequest, NextApiResponse } from 'next';
import contactExpressHandler from '../../lib/contactExpress';

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  contactExpressHandler(req, res);
}
