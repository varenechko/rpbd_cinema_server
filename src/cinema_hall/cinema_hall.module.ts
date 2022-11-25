import { Module } from '@nestjs/common';
import { CinemaHallService } from './cinema_hall.service';
import { CinemaHallController } from './cinema_hall.controller';
import { CinemaHall } from './entities/cinema_hall.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CinemaHall])],
  controllers: [CinemaHallController],
  providers: [CinemaHallService],
})
export class CinemaHallModule {}
