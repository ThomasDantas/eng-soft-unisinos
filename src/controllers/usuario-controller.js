'use strict'

import { generateToken } from '../services/auth-service.js'
import { 
  PgUsuarioRepositorio
} from '../model/usuario-model.js'

export async function criar(req, res, next) {
  const Pg = new PgUsuarioRepositorio()
  try {
    const { nome, email, cpfCnpj, telefone, senha, numero, logradouro, municipio, uf } = req.body
    const emailUnico = await Pg.validarEmailUnico({ email })
    if(!emailUnico){
      return res.status(400).send({
        message: 'Email ja esta cadastado'
      })
    }
    const usuario = await Pg.criarUsuario({ nome, email, cpfCnpj, telefone, senha })
    if(usuario.error){
      return res.status(400).send({
        message: 'Falha ao inserir usuario'
      })
    }
    const endereco = await Pg.cadastrarEndereco({ idUsuario: usuario.id, logradouro, numero, municipio, uf })
    if(endereco.error){
      await deletarUsuario({ id: usuario.id })
      return res.status(400).send({
        message: 'Falha ao cadastrar endereco do usuario'
      })
    }
    const accessToken = await generateToken(usuario)
    return res.status(200).send({
      usuario: {
        nome, email, cpfCnpj, telefone, numero, logradouro, municipio, uf
      },
      token: accessToken
    })
  } catch (e) {
    console.log(e)
    return res.status(500).send({
      message: 'Falha ao processar sua requisição'
    })
  }
}

export async function login(req, res, next) {
  const Pg = new PgUsuarioRepositorio()
  try {
    const { email, senha } = req.body
    const { id, ...usuario } = await Pg.validarUsuario({ email, senha })
    if(usuario.error){
      return res.status(400).send({
        message: 'Falha ao realizar login, dados incorretos'
      })
    }
    const endereco = await Pg.buscarEndereco({ id })
    const accessToken = await generateToken({ id })
    return res.status(200).send({
      usuario: { ...usuario, ...endereco },
      token: accessToken
    })
  } catch (e) {
    console.log(e)
    return res.status(500).send({
      message: 'Falha ao processar sua requisição'
    })
  }
}

export async function editar(req, res, next) {
  const Pg = new PgUsuarioRepositorio()
  try {
    const { idUsuario } = res.locals
    const { nome, cpfCnpj, telefone, senha, numero, logradouro, municipio, uf } = req.body
    const usuario = await Pg.editarUsuario({ id: idUsuario, nome, cpfCnpj, telefone, senha })
    if(usuario.error){
      return res.status(400).send({
        message: 'Falha ao editar usuario'
      })
    }
    const endereco = await Pg.editarEndereco({ idUsuario, numero, logradouro, municipio, uf})
    if(endereco.error){
      return res.status(400).send({
        message: 'Falha ao editar endereco do usuario'
      })
    }
    return res.status(200).send({ nome, cpfCnpj, telefone, numero, logradouro, municipio, uf  })
  } catch (e) {
    console.log(e)
    return res.status(500).send({
      message: 'Falha ao processar sua requisição'
    })
  }
}


export async function deletar(req, res, next) {
  const Pg = new PgUsuarioRepositorio()
  try {
    const { idUsuario } = res.locals
    await Pg.deletarUsuario({ id: idUsuario })
    return res.status(200).send({ mensagem: 'OK' })
  } catch (e) {
    console.log(e)
    return res.status(500).send({
      message: 'Falha ao processar sua requisição'
    })
  }
}

export async function entidades(req, res, next) {
  const Pg = new PgUsuarioRepositorio()
  try {
    const { idUsuario } = res.locals
    const entidades = await Pg.buscarEntidades({ idUsuario })
    return res.status(200).send(entidades)
  } catch (e) {
    console.log(e)
    return res.status(500).send({
      message: 'Falha ao processar sua requisição'
    })
  }
}