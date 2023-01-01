import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { Session } from './entities/session.entity';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(Session)
    private sessionRepository: Repository<Session>,
  ) {}

  async create(createSessionDto: CreateSessionDto) {
    const id = (await this.sessionRepository.count()) + 1;
    const session = this.sessionRepository.create({
      session_id: id,
      ...createSessionDto,
    });
    return await this.sessionRepository.save(session);
  }

  async findAll() {
    return await this.sessionRepository.find({
      relations: {
        film: true,
        hall: {
          cinema: true,
        },
      },
    });
  }

  async findOne(id: number) {
    return await this.sessionRepository.findOneBy({ session_id: id });
  }

  async findAllByFilm(id: number) {
    return await this.sessionRepository.find({
      where: {
        film_id: id,
      },
      relations: {
        film: true,
        hall: {
          cinema: true,
        },
      },
    });
  }

  async findAllByCinema(id: number) {
    return await this.sessionRepository.find({
      where: {
        hall: {
          cinema: {
            cinema_id: id,
          },
        },
      },
      relations: {
        hall: {
          cinema: true,
        },
      },
    });
  }

  async findAllToday() {
    return await this.sessionRepository.find({
      where: {
        date: new Date(), //TODO: заменить на moment
      },
      relations: {
        hall: {
          cinema: true,
        },
      },
    });
  }

  update(id: number, updateSessionDto: UpdateSessionDto) {
    return `This action updates a #${id} session`;
  }

  remove(id: number) {
    return `This action removes a #${id} session`;
  }
}
