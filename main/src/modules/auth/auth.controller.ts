import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { UserDecorator } from '../../shared/decorator';
import { LoginDto, LoginResponse, RegisterDto } from './dtos';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtPayload } from './types';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @ApiOkResponse({
    type: LoginResponse,
  })
  @HttpCode(200)
  @Post('login')
  async login(
    @Body() _loginDto: LoginDto,
    @UserDecorator() user: JwtPayload,
  ): Promise<LoginResponse> {
    return this.authService.login(user);
  }

  @HttpCode(201)
  @Post('register')
  async register(
    @Body() registerDto: RegisterDto,
  ): Promise<{ message: string }> {
    await this.authService.register(registerDto);
    return {
      message: 'Register successfully',
    };
  }
}
