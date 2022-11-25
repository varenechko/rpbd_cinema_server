import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { Ticket } from './entities/ticket.entity';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(Ticket)
    private ticketRepository: Repository<Ticket>,
  ) {}

  async create(createTicketDto: CreateTicketDto) {
    try {
      const id = (await this.ticketRepository.count()) + 1;
      const hall = this.ticketRepository.create({
        ticket_id: id,
        ...createTicketDto,
      });
      return await this.ticketRepository.save(hall);
    } catch (error) {
      throw new HttpException('could not creare hall', 460);
    }
  }

  async findAll() {
    return await this.ticketRepository.find();
  }

  async findOne(id: number) {
    return await this.ticketRepository.find({
      where: { ticket_id: id },
      relations: {
        film: true,
        user: true,
        seat: {
          hall: {
            cinema: true,
          },
        },
      },
    });
  }

  async findByProfile(id: number) {
    return await this.ticketRepository.find({
      where: { profile_id: id },
      relations: {
        film: true,
        seat: true,
      },
    });
  }

  // update(id: number, updateTicketDto: UpdateTicketDto) {
  //   return `This action updates a #${id} ticket`;
  // }

  async remove(id: number) {
    try {
      await this.ticketRepository.delete({ ticket_id: id });
      return { status: 200 };
    } catch (error) {
      return new HttpException('could not delete hall', 462);
    }
  }
}
