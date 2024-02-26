** 
File Format

-   RDF Foundation: The Agent Discovery Protocol (ADP) fundamentally employs the Resource Description Framework (RDF) as its data model.
    
-   Mandatory Serializations: To ensure interoperability, the following serializations MUST be supported:
    

-   Turtle (.ttl) [RFC 3023]
    
-   JSON-LD (.jsonld) [RFC 8725]
    

-   Optional Serializations: Implementations MAY choose to additionally support the N3 format [Berners-Lee, T. et al.].
    
-   Media Type Considerations: If ADP's use extends beyond standard JSON-LD or Turtle representations, a dedicated IANA media type registration may be necessary. This registration will be defined separately if required.
    

**