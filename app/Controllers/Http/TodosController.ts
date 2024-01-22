import { bind } from '@adonisjs/route-model-binding'
import Todo from 'App/Models/Todo'
import TodoValidator from 'App/Validators/TodoValidator'

import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class TodosController {
  public async index({ view, auth }: HttpContextContract) {
    const user = await auth.user
    const todos = await user?.related('todos').query()

    return view.render('todos', { todos })
  }

  public async create({}: HttpContextContract) {}

  public async store({ auth, request, response }: HttpContextContract) {
    const userId = await auth.user?.id
    const payload = await request.validate(TodoValidator)

    await Todo.create({ ...payload, userId })

    return response.redirect().back()
  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  @bind()
  public async destroy({ response }: HttpContextContract, todo: Todo) {
    await todo.delete()

    return response.status(200)
  }
}
