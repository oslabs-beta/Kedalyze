import dotenv from 'dotenv';
dotenv.config();

export interface iAuth {
  mongodb: iMongo;
  jwt: iTokenSecret;
}

interface iMongo {
  url: string | undefined;
  port: number | undefined;
  username: string | undefined;
  password: string | undefined;
  collection: string | undefined;
}

interface iTokenSecret {
  access: string | undefined;
  refresh: string | undefined;
}

export const config: iAuth = {
  mongodb: {
    url: process.env.MONGO_URL,
    port: Number(process.env.MONGO_PORT),
    username: process.env.MONGO_USERNAME,
    password: process.env.MONGO_PASSWORD,
    collection: process.env.MONGO_COLLECTION,
  },
  jwt: {
    access: process.env.JWT_ACCESS_SECRET,
    refresh: process.env.JWT_REFRESH_SECRET,
  },
};
