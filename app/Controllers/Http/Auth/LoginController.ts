import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import LoginValidator from 'App/Validators/LoginValidator'

export default class LoginController {
  public async index({ view }: HttpContextContract) {
    return view.render('login')
  }

  public async login({ auth, request, response }: HttpContextContract) {
    const payload = await request.validate(LoginValidator)

    try {
      await auth.use('web').attempt(payload.email, payload.password)

      return response.redirect().toRoute('todos.index')
    } catch {
      return response.badRequest('Invalid credentials')
    }
  }

  public async logout({ auth, response }: HttpContextContract) {
    await auth.use('web').logout()

    return response.redirect().toRoute('login.index')
  }
}
