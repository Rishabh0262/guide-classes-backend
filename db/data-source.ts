import { DataSource } from 'typeorm';
import { dataSourceOptions } from '../src/config/db.config';

export const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
