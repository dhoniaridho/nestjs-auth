import * as mongoose from 'mongoose';
import config from 'src/config/config';
import { CONSTANTS } from 'src/constants';

export const databaseProviders = [
  {
    provide: CONSTANTS.DATABASE_CONNECTION,
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(config().database.mongodb_uri),
  },
];
