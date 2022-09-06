"use strict";

import Knex from 'knex'
import 'dotenv/config'

export default class DBClass {
  static instance
  constructor () {
    this.query = this.connect()
  }
  connect () {
    return Knex({
      client: 'pg',
      connection: {
        host: process.env.HOST,
        user: process.env.DATABASE,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
        port: 5432,
      },
      debug: false,
    });
  }
  static getInstance () {
    if (!DBClass.instance) DBClass.instance = new DBClass()
    return DBClass.instance
  }
}
