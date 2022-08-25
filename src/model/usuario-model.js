"use strict";

import { knex } from "../index.js";

export const validarEmailUnico = async (data) => {
  try {
    const { rows } = await knex.raw(
      `SELECT email FROM public."usuarios" WHERE email = :email`, data)
    if(!rows[0]) return true
    else return false
  } catch (error) {
    return { error }
  }
};

export const criarUsuario = async (data) => {
  try {
    const { rows } = await knex.raw(
      `INSERT INTO public."usuarios" (nome, email, cpf_cnpj, telefone, senha) 
        VALUES (:nome, :email, :cpfCnpj, :telefone, :senha)
        RETURNING id`, data)
    return { id: Number(rows[0].id) } 
  } catch (error) {
    return { error }
  }
};

export const cadastrarEndereco = async (data) => {
  try {
    const { rows } = await knex.raw(
      `INSERT INTO public."enderecos" (id_usuario, logradouro, numero, municipio, uf) 
        VALUES (:idUsuario, :logradouro, :numero, :municipio, :uf)
        RETURNING id`, data)
    return { id: Number(rows[0].id) } 
  } catch (error) {
    return { error }
  }
};

export const deletarUsuario = async (data) => {
  try {
    await knex.raw(`DELETE FROM public."usuarios" WHERE id=:id`, data)
    return undefined
  } catch (error) {
    return { error }
  }
};

export const validarUsuario = async (data) => {
  try {
    const { rows } = await knex.raw(`SELECT id, nome, email, telefone, cpf_cnpj FROM public."usuarios" WHERE email = :email AND senha = :senha`, data)
    const { cpf_cnpj, id, nome, email, telefone } = rows[0]
    return { id, cpfCnpj: cpf_cnpj, nome, email, telefone }
  } catch (error) {
    return { error }
  }
};

export const buscarEndereco = async (data) => {
  try {
    const { rows } = await knex.raw(
      `SELECT logradouro, numero, uf, municipio FROM public."enderecos" WHERE id_usuario = :id`, data)
    return { ...rows[0], numero: Number(rows[0].numero) }
  } catch (error) {
    return { error }
  }
};

export const editarUsuario = async (data) => {
  try {
    const { rows } = await knex.raw(
      `UPDATE public."usuarios" SET nome=:nome, cpf_cnpj=:cpfCnpj, telefone=:telefone, senha=:senha
        WHERE id=:id
        RETURNING id`, data)
    return { id: Number(rows[0].id) } 
  } catch (error) {
    return { error }
  }
};

export const editarEndereco = async (data) => {
  try {
    const { rows } = await knex.raw(
      `UPDATE public."enderecos" SET logradouro=:logradouro, numero=:numero, municipio=:municipio, uf=:uf
        WHERE id_usuario=:idUsuario
        RETURNING id`, data)
    return { id: Number(rows[0].id) } 
  } catch (error) {
    return { error }
  }
};