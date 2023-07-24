import { IsString } from 'class-validator';

export class AuthAdminDto {
  @IsString()
  name: string;

  @IsString()
  password: string;
}
