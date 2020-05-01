import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtServer:JwtService,
    ) { };

    async signUp(authCredentials:AuthCredentialsDto): Promise<void> { 
       return this.userRepository.singnUp(authCredentials);
    };

    async SignIn(authCredentials:AuthCredentialsDto): Promise<{accessToken:string}> { 
        const username = await this.userRepository.validateUserPassword(authCredentials);
        if(!username) throw new UnauthorizedException(`Invalid credentials`);

        const payload:JwtPayload = { username };
        const accessToken = await this.jwtServer.sign(payload);

        return { accessToken }
    };
};
