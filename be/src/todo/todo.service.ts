import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo } from './schemas/todo.schema';

@Injectable()
export class TodoService {
  constructor(
    @InjectModel(Todo.name, 'local')
    private todoModel: Model<Todo>,
  ) {}

  async create(title: string): Promise<Todo> {
    const newTodo = new this.todoModel({ title });
    return newTodo.save();
  }

  async findAll(): Promise<Todo[]> {
    return this.todoModel.find().exec();
  }

  async editTitle(id: string, newTitle: string): Promise<Todo> {
    const todo = await this.todoModel.findById(id).exec();
    todo.title = newTitle;
    return todo.save();
  }

  async toggleComplete(id: string): Promise<Todo> {
    const todo = await this.todoModel.findById(id).exec();
    todo.completed = !todo.completed;
    return todo.save();
  }

  async remove(id: string): Promise<void> {
    await this.todoModel.findByIdAndDelete(id).exec();
  }
}
