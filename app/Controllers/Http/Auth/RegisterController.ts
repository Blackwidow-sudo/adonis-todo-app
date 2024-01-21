import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import UserValidator from 'App/Validators/UserValidator'

export default class AuthController {
  public async index({ view }: HttpContextContract) {
    return view.render('register')
  }

  public async register({ request, response }: HttpContextContract) {
    const payload = await request.validate(UserValidator)

    User.create(payload)

    return response.redirect().toRoute('login.index')
  }
}
