import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('todos')
@ApiTags('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um Todo' })
  @ApiResponse({ status: 201, description: 'Tarefa Criada' })
  @ApiResponse({ status: 400, description: 'Parametros Invalidos' })
  async create(@Body() body: CreateTodoDto) {
    return this.todoService.create(body);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos Todo' })
  @ApiResponse({ status: 200, description: 'Lista de Tarefas' })
  async findAll() {
    return this.todoService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Listar um Todo pelo ID' })
  @ApiResponse({ status: 200, description: 'Tarefa selecionada pelo ID' })
  async findById(@Param('id', ParseUUIDPipe) id: string) {
    return this.todoService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar um Todo pelo ID' })
  @ApiResponse({ status: 400, description: 'Parametros Invalidos' })
  @ApiResponse({ status: 200, description: 'Tarefa Atualizada' })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateTodoDto,
  ) {
    return this.todoService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Deletar um Todo pelo ID' })
  @ApiResponse({ status: 201, description: 'Deletado com Sucesso' })
  @ApiResponse({ status: 400, description: 'Id invalido' })
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    await this.todoService.deleteById(id);
  }
}
