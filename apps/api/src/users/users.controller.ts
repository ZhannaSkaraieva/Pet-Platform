import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UserResponseDto } from './dto/user-response.dto.js';
import { FindUsersDto } from './dto/find-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() dto: CreateUserDto): Promise<UserResponseDto> {
    return this.usersService.createUser(dto);
  }

  @Get()
  async findAll(@Query() dto: FindUsersDto): Promise<UserResponseDto[]> {
    return this.usersService.findAll(dto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserResponseDto | null> {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    return this.usersService.updateUser(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<UserResponseDto> {
    return this.usersService.deleteUser(id);
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
