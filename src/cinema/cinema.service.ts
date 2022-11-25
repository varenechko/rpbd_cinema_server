import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCinemaDto } from './dto/create-cinema.dto';
import { UpdateCinemaDto } from './dto/update-cinema.dto';
import { Cinema } from './entities/cinema.entity';

@Injectable()
export class CinemaService {
  constructor(
    @InjectRepository(Cinema)
    private cinemaRepository: Repository<Cinema>,
  ) {}

  async create(createCinemaDto: CreateCinemaDto) {
    try {
      const id = (await this.cinemaRepository.count()) + 1;
      const cinema = new Cinema();
      cinema.cinema_id = id;
      cinema.name = createCinemaDto.name;
      cinema.address = createCinemaDto.address;
      return await this.cinemaRepository.save(cinema);
    } catch (error) {
      console.error(error);
      throw new HttpException('could not create new cinema', 450);
    }
  }

  async findAll() {
    return await this.cinemaRepository.find();
  }

  async findOne(id: number) {
    return await this.cinemaRepository.findOneBy({ cinema_id: id });
  }

  async update(id: number, updateCinemaDto: UpdateCinemaDto) {
    try {
      await this.cinemaRepository.update(
        { cinema_id: id },
        { cinema_id: id, ...updateCinemaDto },
      );
      return { status: 200 };
    } catch (error) {
      throw new HttpException('could not update new cinema', 451);
    }
  }

  async remove(id: number) {
    try {
      await this.cinemaRepository.delete({ cinema_id: id });
      return { status: 200 };
    } catch (error) {
      return new HttpException('could not delete cinema', 452);
    }
  }
}
