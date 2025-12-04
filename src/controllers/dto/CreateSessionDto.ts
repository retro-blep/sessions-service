import { IsBoolean, IsNumber, IsOptional, IsString, MinLength } from "class-validator";

export class CreateSessionDto {
  @IsString()
  @MinLength(1)
  name!: string;

  @IsOptional()
  @IsString()
  subName?: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
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
