'use strict';

var skizze = require('..');

var client = skizze.createClient("127.0.0.1:3596", { insecure: true });  
var name = "testnodedomain";

function main() {
  // Using node-async would make this look nicer, but trying to avoid deps!
  client.createDomain(name, function(err) {
    if (err) return onError(err);

    client.addToDomain(name, ['alvin', 'simon', 'theodore'], function(err) {
      if (err) return onError(err);

      printSketches(name, client, function(err) {
        if (err) return onError(err);

        client.addToDomain(name, ['alvin', 'alvin', 'simon', 'claire', 'patrick', 'rajendra'], function(err) {
          if (err) return onError(err);

          printSketches(name, client, function(err) {
            if (err) return onError(err);
            client.deleteDomain(name, process.exit);
          });
        });
      });
    });
  });
}

function printSketches(name, client, done) {
  let values = ['alvin', 'simon', 'theodore', 'gary'];

  client.getMembership(name, values, function(err, result) {
    printResults('Membership', err, result);

    client.getFrequency(name, values, function(err, result) {
      printResults('Frequency', err, result);

      client.getRankings(name, function(err, result) {
        printResults('Rankings', err, result);

        client.getCardinality(name, function(err, result) {
          printResults('Cardinality', err, result);
          done();
        });
      });
    });
  });
}

function printResults(type, err, result) {
  if (err) return onError(err)
  console.log(type + ':', result);
  console.log("");
}

function onError(err) {
  console.error(err);
  client.deleteDomain(name, process.exit.bind(null, 1));
}


main();
