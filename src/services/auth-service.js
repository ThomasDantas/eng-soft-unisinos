'use strict'

import pkg from 'jsonwebtoken';
const { sign, verify } = pkg;

export async function generateToken(data) {
  return sign(data, global.SALT_KEY)
}

export async function decodeToken(token) {
  try {
    const decoded = verify(token, global.SALT_KEY)
    return decoded
  } catch (err) {
    return err
  }
}

export async function authorize (req, res, next) {
  const authHeader = req.headers.authorization
  if (!authHeader) {
    return res.status(401).send({ error: 'Token não informado.' })
  }
  const parts = authHeader.split(' ')
  if (!parts.length === 2) {
    return res.status(401).send({ error: 'Token error.' })
  }
  const [scheme, token] = parts
  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).send({ error: 'Token mal formatado.' })
  }
  verify(token, global.SALT_KEY, async function (error, decoded) {
    if (error) {
      return res.status(401).json({
        message: 'Token Inválido'
      })
    } else {
      res.locals.idUsuario = Number(decoded.id)
      next()
    }
  })
}