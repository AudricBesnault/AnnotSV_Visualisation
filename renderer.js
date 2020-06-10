'use strict'

const fs = require('fs')
const path = require('path')
const app = require('electron').remote.app

window.sql = require('sql_request.js')
window.sql.dbpath = path.join(app.getPath('userData'), 'sv_base.db')

$('document').ready(function () {
  window.sql.getPatient()
}
