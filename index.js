/*
 * Copyright 2016: Neil Jagdish Patel <njpatel@gmail.com>
 */
'use strict';

var events = require('events');

var grpc = require('grpc');

var defaultMembUnique = 1000000;
var defaultMembErrorRate = 0.01;
var defaultFreqUnique = 100000;
var defaultFreqErrorRate = 0.01;
var defaultRankSize = 100;

/**
 * Enum for Sketch type values.
 * @readonly
 * @enum {number}
 */
var sketchType = {
  MEMBERSHIP  = 1,
  FREQUENCY   = 2,
  RANKINGS    = 3,
  CARDINALITY = 4
};

/**
 * Enum for Snapshot state values.
 * @readonly
 * @enum {number}
 */
var snapshotState = {
  PENDING     = 1,
  IN_PROGRESS = 2,
  SUCCESSFUL  = 3,
  FAILED      = 4
};

/**
 * Represents a connection to the Skizze database.
 * @constructor
 */
function SkizzeClient(address, options) {
  events.EventEmitter.call(this);

  this.skizzeProto = grpc.load("./skizze.proto").protobuf;

  var clientOpts = options.insecure ? grpc.Credentials.createInsecure() : null;
  this.client = new skizzeProto.Skizze(address, clientOpts);
}

/**
 * Request a snapshot to be taken.
 * @param {function(Error)} callback - A callback to call when a reply is received.
 */
SkizzeClient.prototype.createSnapshot = function(callback) {
  this.client.createSnapshot({}, function(err) {
    callback(err);
  });
}

/**
 * Get details of the current or last snapshot.
 * @param {function(Error)} callback - A callback to call with the details of the snapshot.
 */
SkizzeClient.prototype.getSnapshot = function(callback) {
  this.client.getSnapshot({}, callback);
}

/**
 * List Sketches of a specific type.
 * @param {number} type - The type of sketch to list.
 * @param {function(Error,Array)} callback - A callback to call with the list of Sketches.
 */
SkizzeClient.prototype.listSketches = function(type, callback) {
  this.client.list({ type: type }, callback);
}

/**
 * List all domains.
 * @param {function(Error,Array)} callback - A callback to call with the list of Domains.
 */
SkizzeClient.prototype.listDomains = function(callback) {
  this.client.listDomains({}, callback);
}

/**
 * List all Sketches.
 * @param {function(Error,Array)} callback - A callback to call with the list of Sketches.
 */
SkizzeClient.prototype.listAll = function(callback) {
  this.client.listAll({}, callback);
}

/**
 * Create a new domain with default settings for it's Sketches.
 * @param {string} name - The name of the new domain.
 * @param {function(Error)} callback - A callback to call with the newly created domain.
 */
SkizzeClient.prototype.createDomain = function(name, callback) {
  var args = {
    name: name,
    sketches: [
      {
        name: name,
        type: sketchType.MEMBERSHIP,
        properties: {
          maxUniqueItems: defaultMembUnique,
          errorRate: defaultMembErrorRate
        }
      },
      {
        name: name,
        type: sketchType.FREQUENCY,
        properties: {
          maxUniqueItems: defaultFreqUnique,
          errorRate: defaultFreqErrorRate
        }
      },
      {
        name: name,
        type: sketchType.RANKINGS,
        properties: {
          size: defaultRankSize
        }
      },
      {
        name: name,
        type: sketchType.CARDINALITY
      }
    ]
  };

  this.client.createDomain(args, callback)
}

/**
 * Create a new domain with customized settings.
 * @param {string} name - The name of the new domain.
 * @param {Object} sketches - Configuration for each sketch type.
 * @param {function(Error)} callback - A callback to call with the newly created domain.
 */
SkizzeClient.prototype.createDomainWithProperties = function(name, sketches, callback) {
  var args = {
    name: name,
    sketches: [sketches.membership, sketches.frequency, sketches.rankings, sketches.cardinality]
  };
  this.client.createDomain(args, callback)
}

/**
 * Delete a domain.
 * @param {string} name - The name of the domain to delete.
 * @param {function(Error)} callback - A callback to call when the operation is complete.
 */
SkizzeClient.prototype.deleteDomain = function(name, callback) {
  this.client.deleteDomain({ name: name }, function(err) {
    callback(err);                       
  });
}

/**
 * Get details of an existing domain.
 * @param {string} name - The name of the domain to get.
 * @param {function(Error,Object)} callback - A callback to call with the domain details.
 */
SkizzeClient.prototype.getDomain = function(name, callback) {
  this.client.getDomain({ name: name }, callback);
}

/**
 * Create a new Sketch.
 * @param {string} name - The name of the Sketch to create.
 * @param {function(Error,Object)} callback - A callback to call with the new Sketch.
 */
SkizzeClient.prototype.createSketch = function(name, type, props) {
  this.client.createSketch({
    name: name,
    type: type,
    properties: props
  }, callback);
}

/**
 * Delete a Sketch.
 * @param {string} name - The name of the sketch to delete.
 * @param {function(Error)} callback - A callback to call when the operation is complete.
 */
SkizzeClient.prototype.deleteSketch = function(name, callback) {
  this.client.deleteSketch({ name: name }, function(err) {
    callback(err);
  });
}

/**
 * Get details of an existing sketch.
 * @param {string} name - The name of the sketch to get.
 * @param {function(Error,Object)} callback - A callback to call with the sketch details.
 */
SkizzeClient.prototype.getSketch = function(name, callback) {
  this.client.getSketch({ name: name }, callback);
}

/**
 * Add values to a domain.
 * @param {string} name - The name of the domain.
 * @param {Array(string)} values - The values to add to the domain.
 * @param {function(Error)} callback - A callback to call when the operation is complete.
 */
SkizzeClient.prototype.addToDomain = function(name, values, callback) {
  this.client.add({
    domain: {
      name: name
    },
    values: values
  },
  function(err) {
    callback(err);
  });
}

/**
 * Add values to a sketch.
 * @param {string} name - The name of the sketch.
 * @param {Array(string)} values - The values to add to the sketch.
 * @param {function(Error)} callback - A callback to call when the operation is complete.
 */
SkizzeClient.prototype.addToSketch = function(name, values, callback) {
  this.client.add({
    sketch: {
      name: name
    },
    values: values
  },
  function(err) {
    callback(err);
  });
}

/**
 * Query the sketch for membership (true/false) for the provided values.
 * @param {string} name - The name of the sketch.
 * @param {Array(string)} values - The values to query the membership of.
 * @param {function(Error,Object)} callback - A callback to call with the results.
 */
SkizzeClient.prototype.getMembership = function(name, values, callback) {
  this.client.getMembership({
    sketches: [
      { name: name, type: sketchType.MEMBERSHIP }
    ],
    values: values
  },
  function(err, reply) {
    calback(err, reply ? reply.results[0] : null);
  });
}

/**
 * Query the sketches for membership (true/false) for the provided values.
 * @param {Array(string)} names - The names of the sketches to check.
 * @param {Array(string)} values - The values to query the membership of.
 * @param {function(Error,Array(Object))} callback - A callback to call with the results.
 */
SkizzeClient.prototype.getMultiMembership = function(names, values, callback) {
  var sketches = [];
  names.forEach(function(name) {
    sketches.push({
      name: name,
      type: sketchType.MEMBERSHIP
    });
  });

  this.client.getMembership({
    sketches: sketches,
    values: values
  },
  function(err, reply) {
    calback(err, reply ? reply.results : null);
  });
}

/**
 * Query the sketch for frequency of the provided values.
 * @param {string} name - The name of the sketch.
 * @param {Array(string)} values - The values to query the frequency of.
 * @param {function(Error,Object)} callback - A callback to call with the results.
 */
SkizzeClient.prototype.getFrequency = function(name, values, callback) {
  this.client.getFrequency({
    sketches: [
      { name: name, type: sketchType.FREQUENCY }
    ],
    values: values
  },
  function(err, reply) {
    calback(err, reply ? reply.results[0] : null);
  });
}

/**
 * Query the sketches for frequency of the provided values.
 * @param {Array(string)} names - The names of the sketches to check.
 * @param {Array(string)} values - The values to query the frequency of.
 * @param {function(Error,Array(Object))} callback - A callback to call with the results.
 */
SkizzeClient.prototype.getMultiFrequency = function(names, values, callback) {
  var sketches = [];
  names.forEach(function(name) {
    sketches.push({
      name: name,
      type: sketchType.FREQUENCY
    });
  });

  this.client.getFrequency({
    sketches: sketches,
    values: values
  },
  function(err, reply) {
    calback(err, reply ? reply.results : null);
  });
}

/**
 * Query the sketch for top rankings.
 * @param {string} name - The name of the sketch.
 * @param {function(Error,Object)} callback - A callback to call with the results.
 */
SkizzeClient.prototype.getRankings = function(name, callback) {
  this.client.getRankings({
    sketches: [
      { name: name, type: sketchType.RANKINGS }
    ]
  },
  function(err, reply) {
    calback(err, reply ? reply.results[0] : null);
  });
}

/**
 * Query the sketches top rankings.
 * @param {Array(string)} names - The names of the sketches to check.
 * @param {function(Error,Array(Object))} callback - A callback to call with the results.
 */
SkizzeClient.prototype.getMultiRankings = function(names, callback) {
  var sketches = [];
  names.forEach(function(name) {
    sketches.push({
      name: name,
      type: sketchType.RANKINGS
    });
  });

  this.client.getRankings({
    sketches: sketches
  },
  function(err, reply) {
    calback(err, reply ? reply.results : null);
  });
}

/**
 * Query the sketch for cardinality.
 * @param {string} name - The name of the sketch.
 * @param {function(Error,Object)} callback - A callback to call with the results.
 */
SkizzeClient.prototype.getCardinality = function(name, callback) {
  this.client.getCardinality({
    sketches: [
      { name: name, type: sketchType.CARDINALITY }
    ]
  },
  function(err, reply) {
    calback(err, reply ? reply.results[0] : null);
  });
}

/**
 * Query the sketches for cardinality.
 * @param {Array(string)} names - The names of the sketches to check.
 * @param {function(Error,Array(Object))} callback - A callback to call with the results.
 */
SkizzeClient.prototype.getMultiCardinality = function(names, callback) {
  var sketches = [];
  names.forEach(function(name) {
    sketches.push({
      name: name,
      type: sketchType.CARDINALITY
    });
  });

  this.client.getCardinality({
    sketches: sketches
  },
  function(err, reply) {
    calback(err, reply ? reply.results : null);
  });
}

/**
 * Creates and returns a new client connection to Skizze
 * @param {string} address - The address of the Skizze server e.g. "127.0.0.1:3596"
 * @param {Object} options - Options for configuring the client connection.
 * @param {boolean} options.insecure - Whether to create an insecure connection with the server.
 * @returns {SkizzeClient} - A SkizzeClient.
 */
var createClient = function(address, options) {
  if (typeof address !== 'string') {
    throw new Error("Address must be valid.");
  }
  return new SkizzeClient(address, options || {});
}

exports.createClient = createClient;
exports.SkizzeClient = SkizzeClient;
exports.sketchType = sketchType;
exports.snapshotState = snapshotState;
