"use strict";

import { PgRepositorio } from './repositorio.js'

export class PgEntidadesRepositorio extends PgRepositorio {
  criarEntidade = async (data) => {
    try {
      const { rows } = await this.perform(
        `INSERT INTO public."entidadessociais" (id_usuario, nome, objetivos, logradouro, email, telefone, numero, municipio, uf) 
          VALUES (:idUsuario, :nome, :objetivos, :logradouro, :email, :telefone, :numero, :municipio, :uf)
          RETURNING id, nome, objetivos, logradouro, email, telefone, numero, municipio, uf`, data)
      return { ...rows[0], id: Number(rows[0].id), numero: Number(rows[0].numero) } 
    } catch (error) {
      return { error }
    }
  };
  editarEntidade = async (data) => {
    try {
      const { rows } = await this.perform(
        `UPDATE public."entidadessociais" SET nome=:nome, objetivos=:objetivos, logradouro=:logradouro, email=:email, telefone=:telefone, numero=:numero, municipio=:municipio, uf=:uf
          WHERE id=:id AND id_usuario=:idUsuario
          RETURNING id`, data)
      return { id: Number(rows[0].id) } 
    } catch (error) {
      return { error }
    }
  };
  deletarEntidade = async (data) => {
    try {
      await this.perform(`DELETE FROM public."entidadessociais" WHERE id=:id AND id_usuario=:idUsuario`, data)
      return undefined
    } catch (error) {
      return { error }
    }
  };
  listarEntidades = async (data) => {
    try {
      const { rows } = await this.perform(
        `SELECT id, nome, objetivos, logradouro, email, telefone, numero, municipio, uf FROM public."entidadessociais"`, data)
      return rows.map(el => ({ ...el, id: Number(el.id), numero: Number(el.numero) }))
    } catch (error) {
      return { error }
    }
  };
}
