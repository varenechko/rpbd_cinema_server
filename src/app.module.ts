import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './Middleware/logger.middleware';
import { UsersModule } from './users/users.module';
import { CinemaModule } from './cinema/cinema.module';
import { CinemaHallModule } from './cinema_hall/cinema_hall.module';
import { SeatModule } from './seat/seat.module';
import { TicketModule } from './ticket/ticket.module';
import { FilmModule } from './film/film.module';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'psa2001asp',
      database: 'rpbd',
      autoLoadEntities: true,
      synchronize: true,
    }),
    CinemaModule,
    CinemaHallModule,
    SeatModule,
    TicketModule,
    FilmModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
    // .forRoutes({ path: 'cats', method: RequestMethod.GET });
  }
}
