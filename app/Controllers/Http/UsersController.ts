import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
  public async index({ response }: HttpContextContract) {
    try {
      const users = User.all()
      response.status(200)
      response.send({ users: users })
      return
    } catch (error) {
      response.status(500)
      response.send({
        error: error.message,
      })
    }
  }

  public async create({}: HttpContextContract) {} // For the frontend

  public async store({ request, response }: HttpContextContract) {
    const data = request.only(['email', 'password'])
    const user = await User.create({ email: data.email, password: data.password })
    response.status(200)
    response.send({ user: user })
  }

  public async show({ request, response }: HttpContextContract) {
    const data = request.only(['id'])
    try {
      const user = await User.findOrFail(data.id)
      response.status(200)
      response.send({ user: user })
    } catch (error) {
      response.status(404)
      response.send({
        error: error.message,
      })
    }
  }

  public async edit({}: HttpContextContract) {} // ???

  public async update({}: HttpContextContract) {} // ???

  public async destroy({ request, response }: HttpContextContract) {
    const data = request.only(['id'])
    let user
    try {
      user = await User.findOrFail(data.id)
      return
    } catch (error) {
      response.status(404)
      response.send({
        error: error.message,
      })
    }
    try {
      await user.delete()
      response.status(200)
      response.send({ user: user })
    } catch (error) {
      response.status(500)
      response.send({
        error: error.message,
      })
    }
  }
}
