import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service.js';
import { CreateUserDto } from './dto/user-create.dto.js';
import { UserResponseDto } from './dto/user-response.dto.js';
import { FindUsersDto } from './dto/user-find.dto.js';
import { UpdateUserDto } from './dto/user-update.dto.js';
import { Public } from '@nestjs/authentication';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Public()
  // //Post /users
  // @Post()
  // async createUser(@Body() dto: CreateUserDto): Promise<UserResponseDto> {
  //   return await this.usersService.createUser(dto);
  // }

  @Public()
  //Get /users/all
  @Get('all')
  async findAllUsers(@Query() dto: FindUsersDto): Promise<UserResponseDto[]> {
    const users = await this.usersService.findAllUsers(dto);
    return users.map((user) => new UserResponseDto(user));
  }

  @Public()
  //Get users/:id
  @Get(':id')
  async findById(@Param('id') id: string): Promise<UserResponseDto | null> {
    return await this.usersService.findById(id);
  }

  @Public()
  //Patch users/:id
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    return await this.usersService.updateUser(id, dto);
  }

  @Public()
  //Delete users/:id
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<UserResponseDto> {
    return await this.usersService.deleteUser(id);
  }
}

// http://localhost:3001/users
// {
//   "email": "anna@example.com",
//   "phone": "+380501112233",
//   "password": "TestPassword123",
//   "firstName": "Anna",
//   "lastName": "Ivanenko",
//   "avatarUrl": "https://example.com/avatar.jpg"
// }
