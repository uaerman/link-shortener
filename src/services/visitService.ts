import {client} from '../database/client';

export const checkMaxVisits = async (shortUrlID: number): Promise<boolean> => {
  try {
    const result = await client.query(
      'SELECT max_visits FROM short_urls where id = $1',
      [shortUrlID]
    );
    if (result.rows.length === 0 || result.rows[0].max_visits === null) {
      return true;
    }
    const maxVisits = result.rows[0].max_visits;
    const totalVisits = await client.query(
      'SELECT COUNT(*) FROM visits where short_url_id = $1',
      [shortUrlID]
    );
    return totalVisits.rows[0].count < maxVisits;
  } catch (error) {
    console.error('Error checking max visits:', error);
    return true;
  }
};
