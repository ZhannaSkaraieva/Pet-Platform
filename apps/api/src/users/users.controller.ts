import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service.js';
import { UserResponseDto } from './dto/user-response.dto.js';
import { FindUsersDto } from './dto/user-find.dto.js';
import { UpdateUserDto } from './dto/user-update.dto.js';
import { Public } from '../auth/public.decorator.js';
import { Public as AuthPublic } from '@nestjs/authentication';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Public()
  // //Post /users
  // @Post()
  // async createUser(@Body() dto: CreateUserDto): Promise<UserResponseDto> {
  //   return await this.usersService.createUser(dto);
  // }

  //Get /users/all
  @AuthPublic()
  @Get('all')
  async findAllUsers(@Query() dto: FindUsersDto): Promise<UserResponseDto[]> {
    const users = await this.usersService.findAllUsers(dto);
    return users.map((user) => new UserResponseDto(user));
  }
  //Get users/:id
  @AuthPublic()
  @Get(':id')
  async findById(@Param('id') id: string): Promise<UserResponseDto | null> {
    return await this.usersService.findById(id);
  }

  //Patch users/:id
  @AuthPublic()
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    return await this.usersService.updateUser(id, dto);
  }

  //Delete users/:id
  @AuthPublic()
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<UserResponseDto> {
    return await this.usersService.deleteUser(id);
  }
}
