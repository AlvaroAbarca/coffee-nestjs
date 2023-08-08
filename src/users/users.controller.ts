import { Body, Controller, Get, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { UsersService } from './users.service';
// import { User as UserDto } from './interfaces/users.interface';
import { UserDto } from './dto/user.dto';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('/')
  async getUsers(@Res() res) {
    const users = await this.userService.findAll();
    return res.status(HttpStatus.OK).json(users);
  }

  @Post('/')
  async createUser(@Body() userDto: UserDto, @Res() res) {
    const user = await this.userService.create(userDto);
    return res.status(HttpStatus.OK).json({
      message: 'Product Successfully Created',
      user,
    });
  }
}
