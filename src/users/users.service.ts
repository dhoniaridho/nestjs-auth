import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { isValidObjectId, Model, ObjectId } from 'mongoose';
import { CONSTANTS } from 'src/constants';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(@Inject(CONSTANTS.USER_MODEL) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.userModel.create({
      ...createUserDto,
      fullName: `${createUserDto.firstName} ${createUserDto.lastName}`,
      password: bcrypt.hashSync(createUserDto.password, 8),
    });

    return user.toJSON();
  }

  async findAll(): Promise<User[]> {
    const users = await this.userModel.find().select('-password');
    return users;
  }

  async findOne(id: string) {
    const user = await this.userModel.findById(id);
    return user;
  }

  async findByEmail(email: string) {
    const user = await this.userModel.findOne({ email });
    return user;
  }

  async update(id: ObjectId, updateUserDto: UpdateUserDto) {
    if (!isValidObjectId(id)) throw new NotFoundException('User not found');
    const user = await this.userModel.findByIdAndUpdate(
      id,
      {
        ...updateUserDto,
        password: bcrypt.hashSync(updateUserDto.password, 8),
        fullName: `${updateUserDto.firstName} ${updateUserDto.lastName}`,
      },
      {
        returnOriginal: false,
      },
    );
    if (!user) throw new NotFoundException('User not found');
    const userUpdated = user.toJSON();
    delete userUpdated.password;
    return userUpdated;
  }

  async remove(id: ObjectId) {
    if (!isValidObjectId(id)) throw new NotFoundException('User not found');
    const user = await this.userModel.findByIdAndDelete(id);
    if (!user) throw new NotFoundException('User not found');
    return user.toJSON();
  }
}
