import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { TodoService } from './todo.service';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  async create(@Body('title') title: string) {
    return this.todoService.create(title);
  }

  @Get()
  async findAll() {
    return this.todoService.findAll();
  }

  @Patch(':id/edit-title')
  async editTitle(@Param('id') id: string, @Body('title') newTitle: string) {
    return this.todoService.editTitle(id, newTitle);
  }

  @Patch(':id/toggle-complete')
  async toggleComplete(@Param('id') id: string) {
    return this.todoService.toggleComplete(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    console.log('hello did this work?')
    await this.todoService.remove(id);
  }
}
