"use strict";

import { knex } from "../index.js";

export const criarUsuario = async (data) => {
  try {
    const { rows } = await knex.raw(
      `INSERT INTO public."usuarios" (nome, email, cpf_cnpj, telefone, senha) 
        VALUES (:nome, :email, :cpfCnpj, :telefone, :senha)
        RETURNING id`, data)
    return { id: Number(rows[0].id) } 
  } catch (error) {
    throw new Error(error)
  }
};
