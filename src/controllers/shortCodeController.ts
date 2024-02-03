import {Request, Response} from 'express';
import {client} from '../database/client';
import {checkMaxVisits, writeVisitLocation} from '../services/visitService';
import {checkValidSince, checkValidUntil} from '../services/dateService';

export const redirectUser = async (req: Request, res: Response) => {
  const {shortCode} = req.params;
  try {
    const result = await client.query(
      'SELECT * FROM short_urls WHERE short_code = $1',
      [shortCode]
    );

    if (result.rows.length === 0) {
      return res.status(404).send('Short URL not found');
    }
    const {id, original_url, valid_since, valid_until} = result.rows[0];

    const forwardedFor = req.headers['x-forwarded-for'];
    const remoteAddress: string = forwardedFor ? (Array.isArray(forwardedFor) ? forwardedFor[0] : forwardedFor) : req.socket.remoteAddress || '';

    const allowVisit = await checkMaxVisits(id);
    if (!allowVisit) {
      return res.status(403).send('Maximum visits threshold reached');
    }
    if (valid_since && checkValidSince(valid_since)) {
      return res.status(403).send('Short URL is not valid yet');
    }
    if (valid_until && checkValidUntil(valid_until)) {
      return res.status(403).send('Short URL has expired');
    }
    writeVisitLocation(remoteAddress)
    return res.status(302).redirect(original_url);
  } catch (error) {
    console.error('Error retrieving short URL:', error);
    return res.status(500).send('Internal server error');
  }
};
