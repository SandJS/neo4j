"use strict";

const neo4j = require('neo4j');

class Client {

  constructor(config) {
    this.db = new neo4j.GraphDatabase(config);
  }

  query(query, params) {
    if (1 == arguments.length) {
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

}

Neo4j.Client = Client;