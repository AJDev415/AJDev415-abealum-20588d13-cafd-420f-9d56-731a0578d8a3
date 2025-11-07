import { Controller, Post, Body, HttpStatus, HttpCode, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { AuthGuard } from '../auth/auth.guard';

// Controller level guard for the final authentication on a request
@UseGuards(AuthGuard)
@Controller('addUser')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    // Create a new user
    @HttpCode(HttpStatus.OK)
    @Post()
    create(@Body() userData: {
        username: string,
        password: string,
        role: string,
        org: string,
    }): Promise<User> {
        return this.usersService.addUser(userData.username, userData.password, userData.role, userData.org);
    }
}
