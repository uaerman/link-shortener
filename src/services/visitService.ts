import {client} from '../database/client';
import {getVisitLocation} from "./locationService";

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

export const writeVisitLocation = async (remoteAddress: string): Promise<number> => {
  try {
    const data = await getVisitLocation(remoteAddress);
    if (data.error) return 0
    const {country_code, country_name, city_name, timezone, lat, lon} = data;
    const result = await client.query(
      'INSERT INTO visit_locations (country_code, country_name, city_name, timezone, lat, lon) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [country_code, country_name, city_name, timezone, lat, lon]
    );
    return result.rows[0].id;
  } catch (error) {
    console.error('Error writing visit location:', error);
    return 0;
  }
}

export const writeVisit = async (visitData: object) => {
  try {
    const {} = visitData;

  } catch (error) {
    console.error('Error writing visit:', error)
  }
};
