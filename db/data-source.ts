import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  synchronize: true, // ⚠️ dev only
  entities: [__dirname + '/../src/**/*.entity.{js,ts}'], // Adjusted path to look into src from db folder
  logging: false,
};

export const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
