import { v4 as uuidv4 } from 'uuid';
import validator from 'validator';
import {Request, Response} from 'express';
import {client} from '../database/client';

export const createShortLink = async (req: Request, res: Response) => {
  try {
    if (!req.body?.originalUrl)
      res.status(400).json({error: 'originalUrl is required!'});

    const {originalUrl, domainId, validSince, validUntil, maxVisits} = req.body;

    if (!validator.isURL(originalUrl))
      res
        .status(400)
        .json({error: 'originalUrl must be a URL! e.g. https://example.com'});

    const uuid = uuidv4();
    const shortCode = req.body.shortCode ? req.body.shortCode : uuid.substring(0, 6);
    const createdAt = new Date();
    const validSinceDate = validSince ? new Date(validSince) : null;
    const validUntilDate = validUntil ? new Date(validUntil) : null;

    const query = `
            INSERT INTO short_urls (domain_id, short_code, original_url, created_at, valid_since, valid_until, max_visits)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *;
        `;

    const {rows} = await client.query(query, [
      domainId,
      shortCode,
      originalUrl,
      createdAt,
      validSinceDate,
      validUntilDate,
      maxVisits,
    ]);

    res
      .status(201)
      .json({message: 'Short URL created successfully', shortUrl: rows[0]});
  } catch (error) {
    console.error('Error shortening link:', error);
    res.status(500).json({error: 'Internal server error'});
  }
};
