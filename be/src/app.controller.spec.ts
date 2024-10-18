import { Test, TestingModule } from '@nestjs/testing';
import { TodoController } from './todo/todo.controller';
import { TodoService } from './todo/todo.service';

describe('AppController', () => {
  let todoController: TodoController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TodoController],
      providers: [TodoService],
    }).compile();

    todoController = app.get<TodoController>(TodoController);
  });

  describe('root', () => {
    it('should return ""', () => {
      expect(todoController.findAll()).toBe('');
    });
  });
});
