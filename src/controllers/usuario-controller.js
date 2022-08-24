'use strict'

import { generateToken } from '../services/auth-service.js'
import { criarUsuario } from '../model/usuario-model.js'

export async function criar(req, res, next) {
  try {
    const { nome, email, cpfCnpj, telefone, senha } = req.body
    const inserir = await criarUsuario({ nome, email, cpfCnpj, telefone, senha })
    if(inserir.error){
      return res.status(400).send({
        message: 'Falha ao inserir usuario'
      })
    }
    console.log(inserir)
    const accessToken = await generateToken(inserir)
    return res.status(200).send({
      usuario: {
        nome, 
        email,
        cpfCnpj,
        telefone,
        senha
      },
      accessToken
    })
  } catch (e) {
    console.log(e)
    return res.status(500).send({
      message: 'Falha ao processar sua requisição'
    })
  }
}

export async function editar(req, res, next) {
  try {
    const { idUsuario } = res.locals
  } catch (e) {
    return res.status(500).send({
      message: 'Falha ao processar sua requisição'
    })
  }
}
