import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import { ContainsLowercase, ContainsNumber, ContainsSpecialCharacter, ContainsUppercase } from "./auth.decorators";

export class SigninDto {
	@IsString()
	@IsNotEmpty()
	username: string;

	@IsString()
	@IsNotEmpty()
	password: string;
}

export class SignupDto {
	@MaxLength(13)
	@IsString()
	@IsNotEmpty()
	username: string;

	@ContainsSpecialCharacter()
	@ContainsNumber()
	@ContainsUppercase()
	@ContainsLowercase()
	@MinLength(8)
	@IsString()
	@IsNotEmpty()
	password: string;
}
