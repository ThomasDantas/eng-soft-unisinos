"use strict";

const conn = require("../index");

export const criarUsuario = async (data) => {
  try {
    return conn.knex
  } catch (error) {
    throw new Error(error)
  }
};
