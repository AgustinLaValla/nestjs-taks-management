import { Repository, EntityRepository } from "typeorm";
import { User } from "./user.entity";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { genSalt, hash } from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async singnUp(authcredentials: AuthCredentialsDto): Promise<void> {
        const { username, password } = authcredentials; //Extract user credentials properties

        const user = new User();
        user.username = username;
        user.salt = await genSalt(10);
        user.password = await this.encryptPassword(password, user.salt);

        try {
            await user.save();
        } catch (error) {
            if (error.code == 23505) { //Duplicate username 
                throw new ConflictException(`Username already exists`);
            } else {
                throw new InternalServerErrorException();
            };
        };
    };

    async validateUserPassword(authCredentialsDto: AuthCredentialsDto): Promise<string> {
        const { username, password } = authCredentialsDto;
        const user = await this.findOne({ username });

        if (user && user.ValidatePassword(password)) {
            return username
        } else {
            null;
        };


    };

    async encryptPassword(password: string, salt: string): Promise<string> {
        return await hash(password, salt); //Encrypt the password
    };
};
