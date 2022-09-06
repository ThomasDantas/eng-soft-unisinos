import DBClass from './connect.js'

export class PgRepositorio {
  constructor (connection = DBClass.getInstance()) {
    this.connection = connection
  }
  perform (query, data) {
    return this.connection.query.raw(query, data)
  }
}

