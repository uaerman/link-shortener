import {WebServiceClient} from '@maxmind/geoip2-node';

if (!process.env.GEOLITE_ACCOUNT_ID || !process.env.GEOLITE_KEY) {
  throw new Error('GEOLITE_ACCOUNT_ID and GEOLITE_KEY must be defined in the environment');
}

const geoClient = new WebServiceClient(process.env.GEOLITE_ACCOUNT_ID, process.env.GEOLITE_KEY, {host: 'geolite.info'});

type locationData = {
  country_code: string | undefined,
  country_name: string | undefined,
  city_name: string | undefined,
  timezone: string | undefined,
  lat: Number | undefined,
  lon: Number | undefined,
  error: boolean
}

export const getVisitLocation = async (remoteAddress: string): Promise<locationData> => {
  try {
    const resut = await geoClient.city(remoteAddress);
    const {country, location, city} = resut

    return {
      country_code: country?.isoCode,
      country_name: country?.names.en,
      city_name: city?.names.en,
      timezone: location?.timeZone,
      lat: location?.latitude,
      lon: location?.longitude,
      error: false
    };
  } catch (error) {
    console.error('Error getting visit location:', error);
    return {
      city_name: undefined,
      country_code: undefined,
      country_name: undefined,
      lat: undefined,
      lon: undefined,
      timezone: undefined,
      error: true
    };
  }
}
