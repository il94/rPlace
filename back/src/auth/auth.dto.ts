import { IsString, MaxLength, MinLength } from "class-validator";
import { ContainsLowercase, ContainsNumber, ContainsSpecialCharacter, ContainsUppercase } from "./auth.decorators";

export class SignupDto {
	@MinLength(1)
	@MaxLength(13)
	@IsString()
	username: string;

	@IsString()
	@MinLength(8)
	@ContainsUppercase()
	@ContainsLowercase()
	@ContainsNumber()
	@ContainsSpecialCharacter()
	password: string;
}
