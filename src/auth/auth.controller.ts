
import { Controller, Body, Post, ValidationPipe } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';



@Controller('auth')
export class AuthController {

    constructor(private authService:AuthService) { }

    @Post('/signup')
    async signUp(@Body(ValidationPipe) authCredential: AuthCredentialsDto):Promise<void> {
        return this.authService.signUp(authCredential);
      };

    @Post('signin')
    async signIn(@Body(ValidationPipe) authCredential: AuthCredentialsDto): Promise<{accessToken:string}> {
        return await this.authService.SignIn(authCredential);
    };

};
