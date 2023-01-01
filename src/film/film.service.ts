import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { Film } from './entities/film.entity';

@Injectable()
export class FilmService {
  constructor(
    @InjectRepository(Film)
    private filmRepository: Repository<Film>,
  ) {}

  async create(createFilmDto: CreateFilmDto) {
    try {
      const id = (await this.filmRepository.count()) + 1;
      const hall = this.filmRepository.create({
        film_id: id,
        ...createFilmDto,
      });
      return await this.filmRepository.save(hall);
    } catch (error) {
      throw new HttpException('could not creare hall', 460);
    }
  }

  async findAll(order?: string) {
    return await this.filmRepository.find({
      order: {
        title: order === 'DESC' ? 'DESC' : 'ASC',
      },
    });
  }

  async findOne(id: number) {
    return await this.filmRepository.findBy({ film_id: id });
  }

  async findByName(name: string) {
    if (name === '*') {
      return await this.filmRepository.find();
    }
    return await this.filmRepository.findBy({
      title: ILike(`%${name || ''}%`),
    });
  }

  async update(id: number, updateFilmDto: UpdateFilmDto) {
    try {
      await this.filmRepository.update(
        { film_id: id },
        { film_id: id, ...updateFilmDto },
      );
      return { status: 200 };
    } catch (error) {
      throw new HttpException('could not update new hall', 461);
    }
  }

  async remove(id: number) {
    try {
      await this.filmRepository.delete({ film_id: id });
      return { status: 200 };
    } catch (error) {
      return new HttpException('could not delete hall', 462);
    }
  }
}
