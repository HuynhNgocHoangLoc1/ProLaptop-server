// create-chatbox.dto.ts
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateChatboxDto {
  @IsNotEmpty()
  @IsString()
  userId: string; 

  @IsNotEmpty()
  @IsString()
  content: string; 
}
