import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:3000/test'),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
