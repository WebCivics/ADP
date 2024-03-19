**

Mandatory Fields


-   agentType: This field serves to define whether the ADP profile relates to a natural person or other agent.  
-   lastModified: This field serves to provide information about when the file was last modified. 
    -   Could this then be checked via web-server records?
-   Name:  this field provides the name the user wants to be denoted as / by / etc.
-   

The point of this service is to define links to users data locals, like an index. There's not much point in having an ADP file, without declaring web-services.

- Social Network Accounts
- Online Personal data Storage
- Cryprocurrency Accounts
- Chat Platform Accounts
- Email Address

Support For 
- 'internet identifiers' 
- 'web 2.0' identifiers
- 'web 3' identifiers 
- Social Web Identifiers (was Web 3.0)
- 

There's alot of potential identifiers that could be added to an ADP file.  there are also questions about how ADP files are designed, whether and who is responsible for different ADP files - for instance, as the method uses RDF & Namespaces, each provider could define their own ontologies for their own namespaces.

-   as the primary, unambiguous identifier for the agent. A valid URI MUST be used. Utilizing URIs that conform to the WebID specification [WebID] is strongly RECOMMENDED to promote integration within the broader Web of Data ecosystem.
    
-   agentType: This field designates the fundamental classification of the agent. The following controlled vocabulary terms MUST be supported:
    
-   schema:Person (from Schema.org vocabulary)
    
-   schema:Organization (from Schema.org vocabulary)
    
-   adp:SoftwareService (Defined within the ADP namespace)
    



**