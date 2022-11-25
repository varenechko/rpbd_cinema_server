import { PartialType } from '@nestjs/mapped-types';
import { CreateCinemaHallDto } from './create-cinema_hall.dto';

export class UpdateCinemaHallDto extends PartialType(CreateCinemaHallDto) {}
