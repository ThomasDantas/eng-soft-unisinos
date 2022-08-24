'use strict'

import { generateToken } from '../services/auth-service'
import { criarUsuario } from '../model/usuario-model'
import utils from '../services/index'

export async function criar(req, res, next) {
  try {
    const { logo, logoName } = req.body
    const insert = await criarUsuario({  })
    const accessToken = generateToken(insert)
  } catch (e) {
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
