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

  async create(createTicketDtoArray: CreateTicketDto[]) {
    console.log('--------------------', createTicketDtoArray);
    createTicketDtoArray.forEach(async (createTicketDto, index) => {
      // try {
      const id = (await this.ticketRepository.count()) + 1 + index;
      console.log('==========================', id);

      const ticket = this.ticketRepository.create({
        ticket_id: id,
        ...createTicketDto,
      });
      return await this.ticketRepository.save(ticket);
      // } catch (error) {
      //   throw new HttpException('could not creare ticket', 460);
      // }
    });
  }

  async getTopFilms() {
    return await this.ticketRepository.query(`
    select film.title, count(ti.ticket_id) as "count" from ticket ti 
    left join "session" s ON s.session_id = ti.session_id
    left join film ON film.film_id = s.film_id
    GROUP by film.title
    order by "count" DESC
    `);
  }

  async findAll() {
    return await this.ticketRepository.find({
      relations: {
        session: true,
        user: true,
        seat: {
          hall: {
            cinema: true,
          },
        },
      },
    });
  }

  async findOne(id: number) {
    return await this.ticketRepository.find({
      where: { ticket_id: id },
      relations: {
        session: true,
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
        session: true,
        seat: true,
      },
    });
  }

  async findBySession(id: number) {
    return await this.ticketRepository.find({
      where: { session_id: id },
      relations: {
        session: true,
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
