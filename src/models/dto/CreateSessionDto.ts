import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CreateSessionDto {
  @IsString() @IsNotEmpty() @MaxLength(80)
  name!: string;

  @IsOptional() @IsString() @MaxLength(80)
  subName?: string;

  @IsOptional() @IsString()
  status?: string;

  @IsOptional() @IsString()
  roomCode?: string;

  @IsOptional()
  settings?: {
    psswd?: string;
    durationMinutes?: string;
    maxParticipants?: number;
    isPasswordProtected?: boolean;
    votingEnabled?: boolean;
  };
}
