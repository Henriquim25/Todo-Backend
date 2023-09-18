import { Test, TestingModule } from '@nestjs/testing';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { TodoEntity } from './entity/todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';

const todoEntityList: TodoEntity[] = [
  new TodoEntity({ id: '1', task: 'task-1', isDone: false }),
  new TodoEntity({ id: '2', task: 'task-1', isDone: false }),
  new TodoEntity({ id: '3', task: 'task-1', isDone: false }),
];

const newTodoEntity = new TodoEntity({ task: 'new-task', isDone: false });

describe('TodoController', () => {
  let todoController: TodoController;
  let todoService: TodoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoController],
      providers: [
        {
          provide: TodoService,
          useValue: {
            findAll: jest.fn().mockResolvedValue(todoEntityList),
            findOne: jest.fn(),
            create: jest.fn().mockResolvedValue(newTodoEntity),
            update: jest.fn(),
            deleteById: jest.fn(),
          },
        },
      ],
    }).compile();

    todoController = module.get<TodoController>(TodoController);
    todoService = module.get<TodoService>(TodoService);
  });

  it('should be defined', () => {
    expect(todoController).toBeDefined();
    expect(todoService).toBeDefined();
  });

  describe('find', () => {
    it('should return a todo list succesfully', async () => {
      const result = await todoController.findAll();

      expect(result).toEqual(todoEntityList);
    });
  });

  describe('create', () => {
    it('should create a new todo item successfully', async () => {
      const body: CreateTodoDto = {
        task: 'new-task',
        isDone: false,
      };

      const result = await todoController.create(body);

      expect(result).toEqual(newTodoEntity);
    });
  });
});
