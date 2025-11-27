import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProffesorModule } from './proffesor/proffesor.module';
import { CursoModule } from './curso/curso.module';
import { OficinaModule } from './oficina/oficina.module';
import { EstudianteModule } from './estudiante/estudiante.module';
import { ApiKeyModule } from './api-key/api-key.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT!,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true, // SOLO EN DESARROLLO
    }),
    ProffesorModule,
    CursoModule,
    OficinaModule,
    EstudianteModule,
    ApiKeyModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
