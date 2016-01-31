# node-skizze

node-skizze are Node.js bindings for the [Skizze](https://github.com/skizzehq/skizze) database.

**NOTE** `node-skizze` is alpha software and still in heavy development.

## Installation

```
$ npm install --save skizze
```


## Example

```
var skizze = require('skizze');

var client = skizze.createClient("127.0.0.1:3596", { insecure: true });

client.createDomain("mydomain", function(err) {

	client.addToDomain("mydomain", ['alvin', 'simon', 'theodore'], function(err) {
		client.getCardinality("mydomain", function(err, card) {
			console.log(err, card);
		});
	});
});

```


## Documentation

### Classes

<dl>
<dt><a href="#SkizzeClient">SkizzeClient</a></dt>
<dd></dd>
</dl>

### Members

<dl>
<dt><a href="#sketchType">sketchType</a> : <code>enum</code></dt>
<dd><p>Enum for Sketch type values.</p>
</dd>
<dt><a href="#snapshotState">snapshotState</a> : <code>enum</code></dt>
<dd><p>Enum for Snapshot state values.</p>
</dd>
</dl>

### Functions

<dl>
<dt><a href="#createClient">createClient(address, options)</a> ⇒ <code><a href="#SkizzeClient">SkizzeClient</a></code></dt>
<dd><p>Creates and returns a new client connection to Skizze</p>
</dd>
</dl>

<a name="SkizzeClient"></a>
### SkizzeClient
**Kind**: global class  

* [SkizzeClient](#SkizzeClient)
    * [new SkizzeClient()](#new_SkizzeClient_new)
    * [.createSnapshot(callback)](#SkizzeClient+createSnapshot)
    * [.getSnapshot(callback)](#SkizzeClient+getSnapshot)
    * [.listSketches(type, callback)](#SkizzeClient+listSketches)
    * [.listDomains(callback)](#SkizzeClient+listDomains)
    * [.listAll(callback)](#SkizzeClient+listAll)
    * [.createDomain(name, callback)](#SkizzeClient+createDomain)
    * [.createDomainWithProperties(name, sketches, callback)](#SkizzeClient+createDomainWithProperties)
    * [.deleteDomain(name, callback)](#SkizzeClient+deleteDomain)
    * [.getDomain(name, callback)](#SkizzeClient+getDomain)
    * [.createSketch(name, callback)](#SkizzeClient+createSketch)
    * [.deleteSketch(name, callback)](#SkizzeClient+deleteSketch)
    * [.getSketch(name, callback)](#SkizzeClient+getSketch)
    * [.addToDomain(name, values, callback)](#SkizzeClient+addToDomain)
    * [.addToSketch(name, values, callback)](#SkizzeClient+addToSketch)
    * [.getMembership(name, values, callback)](#SkizzeClient+getMembership)
    * [.getMultiMembership(names, values, callback)](#SkizzeClient+getMultiMembership)
    * [.getFrequency(name, values, callback)](#SkizzeClient+getFrequency)
    * [.getMultiFrequency(names, values, callback)](#SkizzeClient+getMultiFrequency)
    * [.getRankings(name, callback)](#SkizzeClient+getRankings)
    * [.getMultiRankings(names, callback)](#SkizzeClient+getMultiRankings)
    * [.getCardinality(name, callback)](#SkizzeClient+getCardinality)
    * [.getMultiCardinality(names, callback)](#SkizzeClient+getMultiCardinality)

<a name="new_SkizzeClient_new"></a>
#### new SkizzeClient()
Represents a connection to the Skizze database.

<a name="SkizzeClient+createSnapshot"></a>
#### skizzeClient.createSnapshot(callback)
Request a snapshot to be taken.

**Kind**: instance method of <code>[SkizzeClient](#SkizzeClient)</code>  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | A callback to call when a reply is received. |

<a name="SkizzeClient+getSnapshot"></a>
#### skizzeClient.getSnapshot(callback)
Get details of the current or last snapshot.

**Kind**: instance method of <code>[SkizzeClient](#SkizzeClient)</code>  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | A callback to call with the details of the snapshot. |

<a name="SkizzeClient+listSketches"></a>
#### skizzeClient.listSketches(type, callback)
List Sketches of a specific type.

**Kind**: instance method of <code>[SkizzeClient](#SkizzeClient)</code>  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>number</code> | The type of sketch to list. |
| callback | <code>function</code> | A callback to call with the list of Sketches. |

<a name="SkizzeClient+listDomains"></a>
#### skizzeClient.listDomains(callback)
List all domains.

**Kind**: instance method of <code>[SkizzeClient](#SkizzeClient)</code>  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | A callback to call with the list of Domains. |

<a name="SkizzeClient+listAll"></a>
#### skizzeClient.listAll(callback)
List all Sketches.

**Kind**: instance method of <code>[SkizzeClient](#SkizzeClient)</code>  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | A callback to call with the list of Sketches. |

<a name="SkizzeClient+createDomain"></a>
#### skizzeClient.createDomain(name, callback)
Create a new domain with default settings for it's Sketches.

**Kind**: instance method of <code>[SkizzeClient](#SkizzeClient)</code>  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the new domain. |
| callback | <code>function</code> | A callback to call with the newly created domain. |

<a name="SkizzeClient+createDomainWithProperties"></a>
#### skizzeClient.createDomainWithProperties(name, sketches, callback)
Create a new domain with customized settings.

**Kind**: instance method of <code>[SkizzeClient](#SkizzeClient)</code>  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the new domain. |
| sketches | <code>Object</code> | Configuration for each sketch type. |
| callback | <code>function</code> | A callback to call with the newly created domain. |

<a name="SkizzeClient+deleteDomain"></a>
#### skizzeClient.deleteDomain(name, callback)
Delete a domain.

**Kind**: instance method of <code>[SkizzeClient](#SkizzeClient)</code>  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the domain to delete. |
| callback | <code>function</code> | A callback to call when the operation is complete. |

<a name="SkizzeClient+getDomain"></a>
#### skizzeClient.getDomain(name, callback)
Get details of an existing domain.

**Kind**: instance method of <code>[SkizzeClient](#SkizzeClient)</code>  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the domain to get. |
| callback | <code>function</code> | A callback to call with the domain details. |

<a name="SkizzeClient+createSketch"></a>
#### skizzeClient.createSketch(name, callback)
Create a new Sketch.

**Kind**: instance method of <code>[SkizzeClient](#SkizzeClient)</code>  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the Sketch to create. |
| callback | <code>function</code> | A callback to call with the new Sketch. |

<a name="SkizzeClient+deleteSketch"></a>
#### skizzeClient.deleteSketch(name, callback)
Delete a Sketch.

**Kind**: instance method of <code>[SkizzeClient](#SkizzeClient)</code>  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the sketch to delete. |
| callback | <code>function</code> | A callback to call when the operation is complete. |

<a name="SkizzeClient+getSketch"></a>
#### skizzeClient.getSketch(name, callback)
Get details of an existing sketch.

**Kind**: instance method of <code>[SkizzeClient](#SkizzeClient)</code>  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the sketch to get. |
| callback | <code>function</code> | A callback to call with the sketch details. |

<a name="SkizzeClient+addToDomain"></a>
#### skizzeClient.addToDomain(name, values, callback)
Add values to a domain.

**Kind**: instance method of <code>[SkizzeClient](#SkizzeClient)</code>  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the domain. |
| values | <code>Array(string)</code> | The values to add to the domain. |
| callback | <code>function</code> | A callback to call when the operation is complete. |

<a name="SkizzeClient+addToSketch"></a>
#### skizzeClient.addToSketch(name, values, callback)
Add values to a sketch.

**Kind**: instance method of <code>[SkizzeClient](#SkizzeClient)</code>  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the sketch. |
| values | <code>Array(string)</code> | The values to add to the sketch. |
| callback | <code>function</code> | A callback to call when the operation is complete. |

<a name="SkizzeClient+getMembership"></a>
#### skizzeClient.getMembership(name, values, callback)
Query the sketch for membership (true/false) for the provided values.

**Kind**: instance method of <code>[SkizzeClient](#SkizzeClient)</code>  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the sketch. |
| values | <code>Array(string)</code> | The values to query the membership of. |
| callback | <code>function</code> | A callback to call with the results. |

<a name="SkizzeClient+getMultiMembership"></a>
#### skizzeClient.getMultiMembership(names, values, callback)
Query the sketches for membership (true/false) for the provided values.

**Kind**: instance method of <code>[SkizzeClient](#SkizzeClient)</code>  

| Param | Type | Description |
| --- | --- | --- |
| names | <code>Array(string)</code> | The names of the sketches to check. |
| values | <code>Array(string)</code> | The values to query the membership of. |
| callback | <code>function</code> | A callback to call with the results. |

<a name="SkizzeClient+getFrequency"></a>
#### skizzeClient.getFrequency(name, values, callback)
Query the sketch for frequency of the provided values.

**Kind**: instance method of <code>[SkizzeClient](#SkizzeClient)</code>  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the sketch. |
| values | <code>Array(string)</code> | The values to query the frequency of. |
| callback | <code>function</code> | A callback to call with the results. |

<a name="SkizzeClient+getMultiFrequency"></a>
#### skizzeClient.getMultiFrequency(names, values, callback)
Query the sketches for frequency of the provided values.

**Kind**: instance method of <code>[SkizzeClient](#SkizzeClient)</code>  

| Param | Type | Description |
| --- | --- | --- |
| names | <code>Array(string)</code> | The names of the sketches to check. |
| values | <code>Array(string)</code> | The values to query the frequency of. |
| callback | <code>function</code> | A callback to call with the results. |

<a name="SkizzeClient+getRankings"></a>
#### skizzeClient.getRankings(name, callback)
Query the sketch for top rankings.

**Kind**: instance method of <code>[SkizzeClient](#SkizzeClient)</code>  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the sketch. |
| callback | <code>function</code> | A callback to call with the results. |

<a name="SkizzeClient+getMultiRankings"></a>
#### skizzeClient.getMultiRankings(names, callback)
Query the sketches top rankings.

**Kind**: instance method of <code>[SkizzeClient](#SkizzeClient)</code>  

| Param | Type | Description |
| --- | --- | --- |
| names | <code>Array(string)</code> | The names of the sketches to check. |
| callback | <code>function</code> | A callback to call with the results. |

<a name="SkizzeClient+getCardinality"></a>
#### skizzeClient.getCardinality(name, callback)
Query the sketch for cardinality.

**Kind**: instance method of <code>[SkizzeClient](#SkizzeClient)</code>  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the sketch. |
| callback | <code>function</code> | A callback to call with the results. |

<a name="SkizzeClient+getMultiCardinality"></a>
#### skizzeClient.getMultiCardinality(names, callback)
Query the sketches for cardinality.

**Kind**: instance method of <code>[SkizzeClient](#SkizzeClient)</code>  

| Param | Type | Description |
| --- | --- | --- |
| names | <code>Array(string)</code> | The names of the sketches to check. |
| callback | <code>function</code> | A callback to call with the results. |

<a name="sketchType"></a>
### sketchType : <code>enum</code>
Enum for Sketch type values.

**Kind**: global enum  
**Read only**: true  
**Properties**

| Name | Type | Default |
| --- | --- | --- |
| MEMBERSHIP | <code>number</code> | <code>MEMBERSHIP</code> | 
| FREQUENCY | <code>number</code> | <code>FREQUENCY</code> | 
| RANKINGS | <code>number</code> | <code>RANKINGS</code> | 
| CARDINALITY | <code>number</code> | <code>CARDINALITY</code> | 

<a name="snapshotState"></a>
### snapshotState : <code>enum</code>
Enum for Snapshot state values.

**Kind**: global enum  
**Read only**: true  
**Properties**

| Name | Type | Default |
| --- | --- | --- |
| PENDING | <code>number</code> | <code>PENDING</code> | 
| IN_PROGRESS | <code>number</code> | <code>IN_PROGRESS</code> | 
| SUCCESSFUL | <code>number</code> | <code>SUCCESSFUL</code> | 
| FAILED | <code>number</code> | <code>FAILED</code> | 

<a name="createClient"></a>
### createClient(address, options) ⇒ <code>[SkizzeClient](#SkizzeClient)</code>
Creates and returns a new client connection to Skizze

**Kind**: global function  
**Returns**: <code>[SkizzeClient](#SkizzeClient)</code> - - A SkizzeClient.  

| Param | Type | Description |
| --- | --- | --- |
| address | <code>string</code> | The address of the Skizze server e.g. "127.0.0.1:3596" |
| options | <code>Object</code> | Options for configuring the client connection. |
| options.insecure | <code>boolean</code> | Whether to create an insecure connection with the server. |


### TODO
 * [ ] Merge in testing
 * [ ] Hook up to Travis
 * [x] Example
 * [x] Versioning
 * [x] npm


### License
node-skizze is available under the Apache License, Version 2.0.


### Authors
- [Neil Jagdish Patel](https://twitter.com/njpatel)