# ADP Web Extension

## User
Write a script for a web-extension that looks for a DNS TXT record, that contains an ADP JSON-LD URI and a checksum. the web-extension should validate the checksum and then process the JSON-LD file to identify the account information stored in the file. The user should also be able to save the domain as an addressbook entry, storing the information from the JSON-LD file. 

The web-extension should also support a sidebar where addressbook and chat functions will be provided to the user.


```js
_adp.example.com TXT "checksum=abc123&jsonld=https://example.com/adp.jsonld"
```

## GIST

1. the ability to deploy ADP as an easy way to find users & related accounts.

2. integrate a solution for non-public communications using a decentralised method.  The current strategy is to use solid.

3. Address CORS problem

code below for linking with cors.
```js
const podUrl = 'https://example.pod/resource';
const proxyUrl = 'https://your-domain.com/cors-proxy.php?url=' + encodeURIComponent(podUrl);

// Make a request to the CORS proxy
fetch(proxyUrl)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
```

Solid
Solid Chat
Linked-Data Notifications

Functions

Get ADP information
Use ADP information to discover user via Solid

Store Account Information

Addressbook categories

Natural Persons
Other (ontology)
