import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSeatDto } from './dto/create-seat.dto';
import { UpdateSeatDto } from './dto/update-seat.dto';
import { Seat } from './entities/seat.entity';

@Injectable()
export class SeatService {
  constructor(
    @InjectRepository(Seat)
    private seatRepository: Repository<Seat>,
  ) {}

  create(createSeatDto: CreateSeatDto) {
    return 'This action adds a new seat';
  }

  async findSeatsByHallId(id: number) {
    return await this.seatRepository.find({
      where: { hall_id: id },
      relations: {
        hall: true,
      },
    });
  }

  async findOne(id: number) {
    return await this.seatRepository.find({
      where: { seat_id: id },
      relations: {
        hall: true,
      },
    });
  }

  update(id: number, updateSeatDto: UpdateSeatDto) {
    return `This action updates a #${id} seat`;
  }

  remove(id: number) {
    return `This action removes a #${id} seat`;
  }
}
