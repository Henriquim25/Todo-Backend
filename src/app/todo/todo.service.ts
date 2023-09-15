import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TodoEntity } from './entity/todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private readonly todoRepository: Repository<TodoEntity>,
  ) {}

  async findAll() {
    return this.todoRepository.find();
  }

  async findOne(id: string) {
    const entity = await this.todoRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!entity) {
      throw new NotFoundException();
    }
    return entity;
  }

  async create(data: CreateTodoDto) {
    return await this.todoRepository.save(this.todoRepository.create(data));
  }

  async update(id: string, data: UpdateTodoDto) {
    const todo = await this.findOne(id);

    this.todoRepository.merge(todo, data);
    return await this.todoRepository.save(todo);
  }

  async deleteById(id: string) {
    await this.todoRepository.softDelete(id);
  }
}
