import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Todo from 'App/Models/Todo'
import TodoValidator from 'App/Validators/TodoValidator'

export default class TodosController {
  public async index({ view }: HttpContextContract) {
    const todos = await Todo.all()

    return view.render('todos', {
      todos,
    })
  }

  public async create({}: HttpContextContract) {}

  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate(TodoValidator)

    await Todo.create(payload)

    return response.redirect().back()
  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
