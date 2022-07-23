import * as mongoose from 'mongoose';
import { CONSTANTS } from 'src/constants';

export const databaseProviders = [
  {
    provide: CONSTANTS.DATABASE_CONNECTION,
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(
        process.env.MONGODB_URI || 'mongodb://localhost/dhoniaridho',
      ),
  },
];
