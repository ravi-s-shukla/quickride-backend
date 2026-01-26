import dotenv from 'dotenv';
dotenv.config();

const env = {
    MAPBOX_ACCESS_TOKEN: process.env.MAPBOX_ACCESS_TOKEN
}

export default env;