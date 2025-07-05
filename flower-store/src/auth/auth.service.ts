import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/user.model';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) {}

  async register(body: { name: string; email: string; password: string }) {
    const existingUser = await User.query().findOne({ email: body.email });
    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);

    const user = await User.query().insert({
      name: body.name,
      email: body.email,
      password: hashedPassword,
    });

    const token = this.jwtService.sign({ id: user.id, email: user.email });
    return { token };
  }

  async login(body: { email: string; password: string }) {
    const user = await User.query().findOne({ email: body.email });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(body.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.jwtService.sign({ id: user.id, email: user.email,name:user.name });
    return { token };
  }
}
