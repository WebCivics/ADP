# TLS method

A thought about the method, is that, it is desirable to ensure that the document is reliably discoverable.

SO,

theory is;

Generate TLS Cert

1. Add URI of adp.ttl document
2. add IP address of document
3. add 1.3.6.1.4 (objectIdentifier); Checksum of document

Therefore,

a HTTPS user is able to validate the document with the information stored in the TLS Certificate.

https://datatracker.ietf.org/doc/html/rfc5280



OID

http://oid-info.com/get/1.3.112.4.59

Description: Checksum identifiers
 
 http://oid-info.com/get/1.3.112.4.59.1
 Modular checksum
Output Length 32
