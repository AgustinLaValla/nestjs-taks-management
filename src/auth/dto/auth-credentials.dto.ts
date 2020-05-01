import { IsString, MinLength, MaxLength, IsNotEmpty, Matches } from "class-validator";

export class AuthCredentialsDto { 
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @IsNotEmpty()
    readonly username:string;

    @IsString()
    @MinLength(8)
    @MaxLength(20)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
     { message: 'Password too weak' })
    @IsNotEmpty()
    readonly password:string;
};
