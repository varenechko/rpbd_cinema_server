import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from './entities/user.entity';
import { User } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async create(createUserInfo: CreateUserDto): Promise<Users> {
    try {
      const id = await this.usersRepository.count();
      const user = new Users();
      user.profile_id = id;
      user.bonus_card_number = id;
      user.user_name = createUserInfo.login;
      user.password = createUserInfo.password;
      const res = await this.usersRepository.save(user);
      return res;
    } catch (error) {
      if (error.code === '23505')
        throw new HttpException('login already exists', 420);
    }
  }

  async login(loginUserInfo: CreateUserDto): Promise<User> {
    try {
      const user = await this.usersRepository.findOneBy({
        user_name: loginUserInfo.login,
        password: loginUserInfo.password,
      });
      if (!user) throw new HttpException('', 421);
      return {
        id: user.profile_id,
        login: user.user_name,
        password: user.password,
        bonusCardNumber: user.bonus_card_number,
        isAdmin: user.is_admin,
      };
    } catch (error) {
      throw new HttpException('wrong login or password', 421);
    }
  }

  async findAll(): Promise<Users[]> {
    // const res = (await this.usersRepository.find()).map(
    //   (value) => value.user_name,
    // );
    // const set = new Set(res);
    return await this.usersRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOneBy({ profile_id: id });
    await this.usersRepository.update(id, {
      user_name: updateUserDto.login,
      password: updateUserDto.password,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
