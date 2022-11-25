import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCinemaHallDto } from './dto/create-cinema_hall.dto';
import { UpdateCinemaHallDto } from './dto/update-cinema_hall.dto';
import { CinemaHall } from './entities/cinema_hall.entity';

@Injectable()
export class CinemaHallService {
  constructor(
    @InjectRepository(CinemaHall)
    private hallRepository: Repository<CinemaHall>,
  ) {}

  async create(createCinemaHallDto: CreateCinemaHallDto) {
    try {
      const id = (await this.hallRepository.count()) + 1;
      const hall = this.hallRepository.create({
        hall_id: id,
        ...createCinemaHallDto,
      });
      return await this.hallRepository.save(hall);
    } catch (error) {
      throw new HttpException('could not creare hall', 460);
    }
  }

  async findHallByCinemaId(id: number) {
    return await this.hallRepository.find({
      where: { cinema_id: id },
      relations: {
        cinema: true,
      },
    });
  }

  async findOne(id: number) {
    return await this.hallRepository.find({
      where: { hall_id: id },
      relations: {
        cinema: true,
      },
    });
  }

  async update(id: number, updateCinemaHallDto: UpdateCinemaHallDto) {
    try {
      await this.hallRepository.update(
        { hall_id: id },
        { hall_id: id, ...updateCinemaHallDto },
      );
      return { status: 200 };
    } catch (error) {
      throw new HttpException('could not update new hall', 461);
    }
  }

  async remove(id: number) {
    try {
      await this.hallRepository.delete({ hall_id: id });
      return { status: 200 };
    } catch (error) {
      return new HttpException('could not delete hall', 462);
    }
  }
}
