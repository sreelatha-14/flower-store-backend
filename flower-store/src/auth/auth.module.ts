import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { KnexModule } from 'src/db/knex.module';
import { JwtStrategyService } from './jwt.strategy.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService,JwtStrategyService],
  imports:[
    PassportModule,
    JwtModule.register({
      secret: 'myFlowerStoreSecret',
      signOptions: { expiresIn: '7d' },
    }),
    KnexModule,
  ]
})
export class AuthModule {}
