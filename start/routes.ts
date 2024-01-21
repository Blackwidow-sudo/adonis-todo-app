/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async ({ view }) => {
  return view.render('welcome')
})

/**
 * Register & Login
 */
Route.group(() => {
  Route.get('register', 'RegisterController.index').as('register.index')
  Route.post('register', 'RegisterController.register').as('register.register')

  Route.get('login', 'LoginController.index').as('login.index')
  Route.post('login', 'LoginController.login').as('login.login')
  Route.get('logout', 'LoginController.logout').as('login.logout')
}).namespace('App/Controllers/Http/Auth')

/**
 * Authenticated routes
 */
Route.group(() => {
  /**
   * Todos
   */
  Route.resource('/todos', 'TodosController').as('todos')

  /**
   * Profile
   */
  Route.get('/profile', ({ view }) => {
    return view.render('profile')
  }).as('profile.index')
}).middleware('auth')
