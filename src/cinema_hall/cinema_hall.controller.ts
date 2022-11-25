import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CinemaHallService } from './cinema_hall.service';
import { CreateCinemaHallDto } from './dto/create-cinema_hall.dto';
import { UpdateCinemaHallDto } from './dto/update-cinema_hall.dto';

@Controller('cinema-hall')
export class CinemaHallController {
  constructor(private readonly cinemaHallService: CinemaHallService) {}

  @Post()
  create(@Body() createCinemaHallDto: CreateCinemaHallDto) {
    return this.cinemaHallService.create(createCinemaHallDto);
  }

  @Get('byCinema/:id')
  findAll(@Param('id') id: string) {
    return this.cinemaHallService.findHallByCinemaId(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cinemaHallService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCinemaHallDto: UpdateCinemaHallDto,
  ) {
    return this.cinemaHallService.update(+id, updateCinemaHallDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cinemaHallService.remove(+id);
  }
}
