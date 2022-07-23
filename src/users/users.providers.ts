import { Provider } from '@nestjs/common';
import { Connection } from 'mongoose';
import { CONSTANTS } from 'src/constants';
import { UserSchema } from './schemas/user.schema';

export const userProvider: Provider[] = [
  {
    provide: CONSTANTS.USER_MODEL,
    useFactory: (connection: Connection) => {
      return connection.model('User', UserSchema);
    },
    inject: [CONSTANTS.DATABASE_CONNECTION],
  },
];
