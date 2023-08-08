import { IsEmail, IsNotEmpty } from 'class-validator';
export class UserDto {
  readonly firstname: string;
  readonly lastname: string;

  @IsEmail()
  readonly email: string;
  @IsNotEmpty()
  readonly password: string;
}
