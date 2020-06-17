'use strict'

const path = require('path')
const fs = require('fs')
const SQL = require('sql.js')

let _rowsFromSqlDataObject = function (object) {
  let data = {}
  let i = 0
  let j = 0
  for (let valueArray of object.values) {
    data[i] = {}
    j = 0
    for (let column of object.columns) {
      Object.assign(data[i], {[column]: valueArray[j]})
      j++
    }
    i++
  }
  return data
}

SQL.dbOpen = function (dbpath) {
  try {
    return new SQL.Database(fs.readFileSync(dbpath))
  } 
  catch (error) {
    console.log("Can't open database file.", error.message)
    return null
  }
}

SQL.dbClose = function (dbpath, databaseHandle) {
  try {
    let data = databaseHandle.export()
    let buffer = Buffer.alloc(data.length, data)
    fs.writeFileSync(dbpath, buffer)
    databaseHandle.close()
    return true
  } 
  catch (error) {
    console.log("Can't close database file.", error)
    return null
  }
}

/*
  A function to create a new SQLite3 database from table.sql.
  This function is called from main.js during initialization 
*/
module.exports.initDb = function (pathDir, renderer_call) {
  let dbpath = path.join(pathDir, 'sv_base.db')
  let createDb = function (dbPath) {
    // Create a database.
    let db = new SQL.Database()
    let query = fs.readFileSync(path.join(__dirname, 'table.sql'), 'utf8')
    let result = db.exec(query)
    if (Object.keys(result).length === 0 &&
      typeof result.constructor === 'function' &&
      SQL.dbClose(dbPath, db)) {
      console.log('Created a new database.')
    } else {
      console.log('sql_request.initDb.createDb failed.')
    }
  }
  let db = SQL.dbOpen(dbpath)
  if (db === null) {
    createDb(dbpath)
  } else {
    let query = 'SELECT count(*) as `count` FROM `sqlite_master`'
    let row = db.exec(query)
    let tableCount = parseInt(row[0].values)
    if (tableCount === 0) {
      console.log('The file is an empty SQLite3 database.')
      createDb(dbpath)
    } else {
      console.log('The database has', tableCount, 'tables.')
    }
  }
  if (typeof renderer_call=== 'function') {
      renderer_call()
  }
}


module.exports.getSv = function () {
  let db = SQL.dbOpen(window.sql_request.dbpath)
  if (db !== null) {
    let query = "SELECT chrom FROM 'sv'"
    var row
    try {
      row = db.exec(query)
      if (row !== undefined && row.length > 0) {
        console.log(row[0])
        row = _rowsFromSqlDataObject(row[0])
      }
    } 
    catch (error) {
      console.log('Request getsv', error.message)
    } 
    finally {
      SQL.dbClose(window.sql_request.dbpath, db)
      return row
    }
  }
}

module.exports.addFileInfo = function(fileName) {
  let db = SQL.dbOpen(window.sql_request.dbpath)
  console.log(window.sql_request.dbpath)
  let string = fs.readFileSync(path.join(__dirname, fileName), 'utf8')
  let tab = string.split('\n')

  var arrayLength = tab.length
  for (var i = 1; i < arrayLength-1; i++) {
    var line = tab[i].split('\t')
    var query = "insert into 'sv' values (NULL, " + "NULL" + ", " + 
      Number(line[1]) + ", " + Number(line[2]) + ", " + Number(line[3]) + 
      ", NULL, NULL, NULL, NULL, NULL" + ");"
    console.log(query)
    db.exec(query)
  }
  SQL.dbClose(window.sql_request.dbpath, db)
}
