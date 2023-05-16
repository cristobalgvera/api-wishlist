import { IsNotEmpty, IsString } from 'class-validator';

export class ToggleCheckedDto {
  @IsString()
  @IsNotEmpty()
  toggledBy: string;
}
