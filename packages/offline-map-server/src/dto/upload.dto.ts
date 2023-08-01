import { IsString } from 'class-validator';

export class UploadDto {
  @IsString()
  readonly z: string;

  @IsString()
  readonly x: string;
}
