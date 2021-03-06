import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({
  timestamps: true,
})
export class User {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  birthDate: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  fullName: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
