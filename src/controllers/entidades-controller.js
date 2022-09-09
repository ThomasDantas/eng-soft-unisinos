'use strict'

import { 
  PgEntidadesRepositorio
} from '../model/entidades-model.js'

export async function criar(req, res, next) {
  const Pg = new PgEntidadesRepositorio()
  try {
    const { idUsuario } = res.locals
    const { nome, objetivos, logradouro, email, telefone, numero, municipio, uf } = req.body
    const entidade = await Pg.criarEntidade({ idUsuario, nome, objetivos, logradouro, email, telefone, numero, municipio, uf })
    if(entidade.error){
      return res.status(400).send({
        message: 'Falha ao inserir entidade social'
      })
    }
    return res.status(200).send({
      ...entidade
    })
  } catch (e) {
    console.log(e)
    return res.status(500).send({
      message: 'Falha ao processar sua requisição'
    })
  }
}

export async function editar(req, res, next) {
  const Pg = new PgEntidadesRepositorio()
  try {
    const { idUsuario } = res.locals
    const { id } = req.params
    const { nome, objetivos, logradouro, email, telefone, numero, municipio, uf } = req.body
    const entidade = await Pg.editarEntidade({ id: Number(id), idUsuario, nome, objetivos, logradouro, email, telefone, numero, municipio, uf })
    if(entidade.error){
      return res.status(400).send({
        message: 'Falha ao editar entidade'
      })
    }
    return res.status(200).send({ id: entidade.id, nome, objetivos, logradouro, email, telefone, numero, municipio, uf })
  } catch (e) {
    console.log(e)
    return res.status(500).send({
      message: 'Falha ao processar sua requisição'
    })
  }
}


export async function deletar(req, res, next) {
  const Pg = new PgEntidadesRepositorio()
  try {
    const { idUsuario } = res.locals
    const { id } = req.params
    await Pg.deletarEntidade({ id: Number(id), idUsuario })
    return res.status(204).send()
  } catch (e) {
    console.log(e)
    return res.status(500).send({
      message: 'Falha ao processar sua requisição'
    })
  }
}

export async function listar(req, res, next) {
  const Pg = new PgEntidadesRepositorio()
  try {
    const entidades = await Pg.listarEntidades()
    if(entidades.error){
      return res.status(400).send({
        message: 'Falha ao listar entidades'
      })
    }
    return res.status(200).send(entidades)
  } catch (e) {
    console.log(e)
    return res.status(500).send({
      message: 'Falha ao processar sua requisição'
    })
  }
}