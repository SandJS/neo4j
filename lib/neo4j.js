"use strict";

const SandGrain = require('sand-grain');

const Client = require('./client');

class Neo4j extends SandGrain {

  constructor() {
    super();
    this.name = 'neo';
    this.configName = 'neo4j';
    this.defaultConfig = require('./defaultConfig');
    this.version = require('../package').version;
  }

  bindToContext(ctx) {
    ctx.neo = new Client(this.config);
  }

}

module.exports = Neo4j;

Neo4j.Client = Client;