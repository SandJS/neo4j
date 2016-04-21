"use strict";

const neo4j = require('neo4j');
const promisify = require('callback-and-promise');

class Client {

  constructor(config) {
    this.db = new neo4j.GraphDatabase(config);
  }

  query(query, params) {
    if (1 == arguments.length && !_.isString(arguments[0])) {
      params = arguments[0].params;
      query = arguments[0].query;
    }
    return new Promise(function(resolve, reject) {
      this.db.cypher({ query, params }, function(err, results) {
        if (err) {
          return reject(err);
        }
        resolve(results);
      });
    }.bind(this));
  }

  http(opts) {
    return new Promise(function(resolve, reject) {
      this.db.http(opts, function(err, resp) {
        if (err) {
          return reject(err);
        }
        resolve(resp);
      });
    }.bind(this));
  }

}

module.exports = Client;

// neo4j.Transaction.prototype.beginTransaction = promisify(neo4j.Transaction.prototype.beginTransaction);
// neo4j.Transaction.prototype.commit = promisify(neo4j.Transaction.prototype.commit);
// neo4j.Transaction.prototype.rollback = promisify(neo4j.Transaction.prototype.rollback);