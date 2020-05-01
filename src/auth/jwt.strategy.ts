import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SEDD } from 'src/config/jwt.-secret';
import { JwtPayload } from './jwt-payload.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { User } from './user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ) {
        super({ //To refer to the superclass PassportStrategy
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),// Set how we will retrieve the JWT from the request
            secretOrKey: SEDD, // The secret that passport is gonna use to verify the signature of the token extracted
        });
    };

    async validate(payload: JwtPayload): Promise<User> { //This method should exists for every Strategy
        //Do validation which its result that will be injected into the request of any operation that is guarded whit authorization
        const { username } = payload;
        const user = await this.userRepository.findOne({ username });

        if (!user) {
            throw new UnauthorizedException();
        };

        return user;
    };

};