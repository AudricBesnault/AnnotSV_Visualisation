'use strict'

const fs = require('fs')
const path = require('path')
const app = require('electron').remote.app

window.$ = window.jQuery = require('jquery')
window.sql_request = require(path.join(__dirname,'sql_request.js'))
window.sql_request.dbpath = path.join(app.getPath('userData'), 'sv_base.db')

$('document').ready(function () {
  window.sql_request.addFileInfo("petittest.SV.annotated.tsv")
  var test = window.sql_request.getSv()
  $('body').append( "<p>Premier chrom de la table sv: " + test[0].chrom + "</p>" );
})
