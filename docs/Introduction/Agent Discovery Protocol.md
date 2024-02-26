**

Table of Contents

1.  Introduction
    
-   1.1 Terminology
    
2.  Agent Discovery Protocol (ADP) Specification
    
-   2.1 File Format
    
-   2.2 File Location
    
-   2.3 Mandatory Fields
    
-   2.4 Optional Fields
    
-   2.4.1 Service Descriptions
    
-   2.4.2 Classifications
    
-   2.4.3 Access Control Information
    
-   2.5 Extensibility
    
3.  Verification Mechanisms
    
-   3.1 DNS-Based Verification
    
-   3.2 Verifiable Credentials
    
-   3.3 Other Methods (Placeholder)
    
4.  Security Considerations
    
5.  Privacy Considerations
    
6.  IANA Considerations
    
-   6.1 Media Type Registration (if needed)
    
-   6.2 Vocabulary Registration (if needed)
    
10.  Examples
    
11.  References
    
-   11.1 Normative References
    
-   11.2 Informative References
    

  

1.  Introduction
    

## The Need for Agent Discovery

The increasing decentralization of data ownership and the emergence of protocols like Solid and MyData necessitate a flexible mechanism for describing agents and their capabilities on the web. Robots.txt and sitemap.xml, while useful for traditional web crawling and search engine optimization, are not designed to express the rich metadata often associated with agents in a structured, machine-readable manner.  

### Agent Discovery Protocol (ADP)

This document specifies the Agent Discovery Protocol (ADP). ADP is a lightweight protocol that enables agents to advertise metadata about themselves and the Web of Data services they provide or interact with. The metadata is expressed in RDF, providing a flexible and extensible format for rich descriptions.

Key Features of ADP   

-   Agent Identification: ADP includes fields for basic agent identification (WebID, URI, etc.) and supports the classification of agents as persons, organizations, or software services.  
      
-   Service Descriptions: ADP facilitates the description of data storage locations, SPARQL endpoints, and other services.  
      
-   Optional Metadata: ADP provides optional fields for conveying agent-specific information such as age-appropriateness ratings, accessibility features, essential service designations, and more.  
      
-   Verification: ADP supports DNS-based verification mechanisms and the integration of Verifiable Credentials to enhance trust and authenticity.  
      

#### Benefits of RDF

The use of RDF (Resource Description Framework) as the underlying metadata format offers several advantages:

-   Expressivity: RDF's graph-based model allows for representing complex relationships between agents and services.
    
-   Extensibility: Ontologies can be developed or extended to support the specific needs of various domains and applications.
    

#### Security and Privacy

This document includes sections dedicated to security and privacy considerations associated with ADP. Implementers should carefully evaluate these considerations in the context of their applications.  

1.1 Terminology

The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in BCP 14 (RFC2119: [https://datatracker.ietf.org/doc/html/rfc2119](https://datatracker.ietf.org/doc/html/rfc2119), RFC8174: [https://datatracker.ietf.org/doc/html/rfc8174](https://datatracker.ietf.org/doc/html/rfc8174)) when they appear in ALL CAPITALS.

-   Agent: A person, organization, software program, or other entity capable of acting on the web.
    
-   Agent Discovery Protocol (ADP): The protocol defined in this document, enabling agents to expose metadata about themselves and their associated services.
    
-   ADP File:  The file (typically .ttl or .jsonld) containing the metadata structured according to the ADP specification.
    
-   Web of Data:  The broader ecosystem of linked data and decentralized services, within which ADP facilitates discovery.
    
-   Resource:  Following RDF conventions, a resource is anything that can be identified by a URI.
    
-   Service: A functionality or capability provided by an agent. This could include data storage, query endpoints, or other capabilities.
    
-   Verification:  The process of establishing the authenticity and trustworthiness of an agent's claims within the ADP file.
    

2. Agent Discovery Protocol (ADP) Specification

#### File Format

-   RDF Foundation: The Agent Discovery Protocol (ADP) fundamentally employs the Resource Description Framework (RDF) as its data model.
    
-   Mandatory Serializations: To ensure interoperability, the following serializations MUST be supported:
    
-   Turtle (.ttl) [RFC 3023]
    
-   JSON-LD (.jsonld) [RFC 8725]
    
-   Optional Serializations: Implementations MAY choose to additionally support the N3 format [Berners-Lee, T. et al.].
    
-   Media Type Considerations: If ADP's use extends beyond standard JSON-LD or Turtle representations, a dedicated IANA media type registration may be necessary. This registration will be defined separately if required.  
      
    
#### File Location

-   Standard Placement: The ADP file MUST reside within the .well-known directory at the domain's root associated with the agent it describes (e.g., https://example.com/.well-known/adp). This aligns with established conventions for metadata discovery [RFC 8615].
    
-   File Naming: The file MUST be named adp with an appropriate extension indicating the serialization format (.ttl, .jsonld).  
      

#### Mandatory Fields

-   agentID: This field serves as the primary, unambiguous identifier for the agent. A valid URI MUST be used. Utilizing URIs that conform to the WebID specification [WebID] is strongly RECOMMENDED to promote integration within the broader Web of Data ecosystem.
    
-   agentType: This field designates the fundamental classification of the agent. The following controlled vocabulary terms MUST be supported:
    
-   foaf:Person (from foaf vocabulary)
    
-   schema:Organization (from Schema.org vocabulary)
    
-   adp:SoftwareService (Defined within the ADP namespace)
    

Optional Fields

-   2.4.1 Service Descriptions: This subsection will detail properties for describing data stores (e.g., adp:dataStorage), query endpoints (e.g., adp:sparqlEndpoint), and other services offered by or associated with the agent.
    
-   2.4.2 Classifications: This subsection will define properties enabling agents to indicate essential service designations (e.g., un:HumanitarianService), content classifications (e.g., gov:MA15+), and other relevant categories.
    
-   2.4.3 Access Control Information: This subsection will encompass properties for hinting at authentication/authorization requirements or mechanisms associated with the agent's services (e.g., adp:accessControl).
    
-   2.4.4 Additional Metadata: Flexibility for further metadata will be provided, potentially addressing areas such as contact information, capability descriptions, or links to external documentation.
    

#### Extensibility

-   Ontologies: ADP is designed to leverage existing ontologies (e.g., Schema.org, FOAF) and accommodate the development of domain-specific ontologies as needed.
    
-   RDF's Power: Emphasize that the choice of RDF as ADP's foundation inherently provides a level of extensibility through the use of well-defined ontologies.
    
-   Vocabulary Recommendations: Discuss existing ontologies that might be immediately suitable for ADP (e.g., FOAF, Schema.org, Dublin Core). Outline a process for recommending or endorsing ontologies for specific domains.
    
-   ADP Namespace: Introduce a dedicated ADP namespace (adp:) for core properties. Describe how it will be defined and governed.
    
-   Community Involvement: Underscore the potential for community participation in extending ADP through vocabulary development. Mention potential forums or working groups where such collaboration could occur.
    

3. Verification Mechanisms

-   General Principle: State that ADP's design allows for multiple, potentially co-existing verification methods to accommodate various trust models and scenarios.
    
-   Security Section Link: Add a forward reference to the Security Considerations section, stating that implementers should thoroughly analyze the trade-offs of different verification methods.  
      

3.1 DNS-Based Verification

-   TXT Record: Specify the use of DNS TXT records for embedding RDF snippets. Provide a basic structural example.
    
-   Property: Introduce an ADP property (e.g., adp:dnsVerification) that references the relevant TXT record.
    
-   Flexibility: Allow for various signature schemes or hash-based verification techniques. Recommend a set of well-established algorithms initially.  
    

3.2 Verifiable Credentials

-   Integration Point: Define how Verifiable Credentials (VCs) can be embedded within or referenced from the ADP file.
    
-   Syntax Considerations: Consider if specific JSON-LD structures are needed to harmonize VC representation in ADP.
    
-   Issuer Trust: Briefly address the importance of establishing trust anchors for VC issuers, potentially referencing external specifications or community-maintained registries.  
      

3.3 Other Methods (Placeholder)

-   Potential Mechanisms: Briefly mention that this section is reserved for outlining additional methods that might emerge in the future (e.g., DANE, reputation-based systems, etc.).
    

  

4. Security Considerations

The Agent Discovery Protocol (ADP) aims to facilitate the discoverability of agents and their services, making security a paramount concern. Implementers of ADP and any applications that rely on the metadata within ADP files MUST carefully consider the following aspects:

  

Sensitive Information

-   Minimization: ADP files should contain the minimum necessary metadata to fulfill their discovery purpose. Highly sensitive information (e.g., private keys, detailed personal data) SHOULD NOT be included directly within the ADP file.
    
-   Access Control: If sensitive information must be associated with an agent, it is RECOMMENDED to store it in a secure location and reference it indirectly from the ADP file using appropriate access control mechanisms.
    

  

Verification

-   Method Choice: Implementers MUST consider the trust model and security requirements of their applications when selecting verification methods (DNS-based, Verifiable Credentials, or others). The choice of method involves trade-offs in terms of complexity, dependency on external authorities, and potential attack vectors.
    
-   Trust Anchors: For the verification to be effective, there must be clearly established trust anchors. In the case of DNS-based methods, this implies robust DNSSEC deployment. In the case of Verifiable Credentials, it necessitates mechanisms for determining trustworthy issuers.
    

#### Data Integrity

-   Tampering: Implementations SHOULD take precautions against unauthorized modification of ADP files. This could involve mechanisms for signing or regularly verifying the content of the file.
    
-   Source Validation: Applications parsing ADP files MUST validate the source to ensure they are retrieving the genuine file from the intended domain.
    

#### Privacy Implications

-   Public Exposure: The ADP file is intended to be publicly accessible. Any information included within has the potential to be indexed or used by third parties.
    
-   Selective Disclosure: Where supported (e.g., with Verifiable Credentials), agents SHOULD leverage selective disclosure techniques to reveal only the information necessary for a given interaction.
    

#### Denial of Service

-   File Size: Implementations SHOULD place reasonable limits on the size of ADP files to prevent potential denial-of-service attacks through overly complex or large files. .
    

#### Evolving Threats

The security landscape is constantly changing. Implementers are advised to stay informed about emerging threats and vulnerabilities that might affect systems interacting with ADP.  The ADP specification itself may be revised to include updated security recommendations or mitigations.

Important:  This section provides a high-level overview of security considerations.  Specific applications leveraging ADP may warrant additional in-depth security analysis tailored to their use cases.

5. Privacy Considerations

The Agent Discovery Protocol (ADP), by design, involves making some information about agents and their services publicly discoverable.  It's crucial for both ADP creators and consumers to be mindful of privacy risks and best practices.

#### Information Exposure

-   Intended Discoverability: The core purpose of ADP is to facilitate discovery. However, implementers MUST carefully consider the trade-off between discoverability and the potential exposure of information that the agent owner might wish to keep private.
    
-   Minimize Personal Data: Where possible, personally identifiable information (PII) SHOULD be avoided within the ADP file. If PII is strictly necessary, it SHOULD be handled in accordance with relevant data protection regulations (e.g., GDPR) and user consent mechanisms.
    
-   Data Referencing: For sensitive data associated with an agent, it is generally RECOMMENDED to store that data in a protected location and only reference it indirectly from the ADP file.
    

#### Data Aggregation and Tracking

-   Profiling Risk: While a single ADP file might contain limited information, aggregators could potentially combine metadata from multiple ADP files to build profiles of agents or track behavior across services.
    
-   Mitigation: Agents SHOULD assess the risk of unwanted profiling and may consider techniques like pseudonymization or purposeful limitation of certain metadata to reduce this risk.
    

#### Selective Disclosure

-   Best Practice: Where ADP supports advanced mechanisms like Verifiable Credentials, agents are strongly RECOMMENDED to leverage selective disclosure. This allows agents to reveal only the necessary attributes for a specific interaction, minimizing the exposure of data.
    

#### User Awareness

-   Transparency: Applications interacting with ADP files SHOULD strive to be transparent with end-users about the collection and use of agent metadata.
    
-   Control: Where feasible, provide users with control mechanisms to manage what information is included in their associated ADP files.
    

#### Evolving Landscape

Privacy regulations and best practices are continuously evolving. Implementers SHOULD remain informed and adapt their use of ADP in line with these changes.

Important: The privacy considerations outlined in this document are not exhaustive. Applications leveraging ADP may require a more detailed privacy impact assessment to address the specific sensitivities of their use cases.  

6. IANA Considerations

6.1 Media Type Registration

-   Purpose: This subsection will register a media type (or types) specifically for ADP, if it goes beyond the standard serialization formats we've decided upon.
    
-   Template (if needed):
    

6.2 Vocabulary Registration

-   Purpose:  This subsection will address the registration of any core vocabularies defined within the ADP specification.
    
-   Considerations
    

-   Namespace: We'll need to finalize the URI for the ADP namespace (adp:).
    
-   Governance: Briefly outline how the vocabulary will be maintained (community group, etc.).
    

7. References

7.1 Normative References

-   [RFC2119] Bradner, S., "Key words for use in RFCs to Indicate Requirement Levels", BCP 14, RFC 2119, DOI 10.17487/RFC2119, March 1997, [https://www.rfc-editor.org/info/rfc2119](https://gemini.google.com/%3C2%3Ehttps://www.rfc-editor.org/info/rfc2119).
    
-   [RFC8174] Leiba, B., "Ambiguity of Uppercase vs Lowercase in RFC 2119 Key Words", BCP 14, RFC 8174, DOI 10.17487/RFC8174, May 2017, [https://www.rfc-editor.org/info/rfc8174](https://www.rfc-editor.org/info/rfc8174).
    
-   [RFC3023] Berners-Lee, T., Fielding, R., and Masinter, L., "XML Media Types", RFC 3023, January 2001. [http://www.rfc-editor.org/info/rfc3023](http://www.rfc-editor.org/info/rfc3023)
    
-   [RFC8725] Sporny, M., Longley, D., Kellogg, G., Lanthaler, M., and Lindstrom, N., "JSON-LD 1.1", W3C Recommendation, 16 July 2020, [https://www.w3.org/TR/json-ld/](https://www.w3.org/TR/json-ld/)
    
-   [RFC8615] Nottingham, M., and Hammer-Lahav, E., "Well-Known Uniform Resource Identifiers (URIs)", RFC 8615, DOI 10.17487/RFC8615, November 2019, [https://www.rfc-editor.org/info/rfc8615](https://www.rfc-editor.org/info/rfc8615).
    

8.2 Informative References

-   [WebID] Berners-Lee, T., Hawke, S., and Kagal, L., "WebID 1.0", W3C Community Group Report, 29 November 2018, [invalid URL removed]
    
-   [Schema.org] Schema.org web site [https://schema.org](https://schema.org/)
    
-   [IETF] The Internet Engineering Task Force website, [https://www.ietf.org](https://www.ietf.org/)
    
  

Original Content

Introduction

-   Problem Statement: Describe the limitations of robots.txt and sitemap.xml for representing rich agent descriptions and relationships within a social, linked-data environment.
    
-   Benefits of RDF: Explain advantages of using RDF to express structured, machine-readable metadata about agents, their capabilities, and associated data services.
    
-   Use Cases: Outline scenarios where ADP would be beneficial:
    

-   Solid Pod discovery
    
-   Agent capability advertisement
    
-   SPARQL endpoint listings
    

-   Protocol Scope: Clarify that ADP focuses on the metadata file's structure and location, not the underlying data services.
    
-   Broaden Scope: Emphasize ADP's use beyond Solid and MyData to support general discoverability of agents and their associated data on the web.
    
-   DNS Integration: Underscore the value of tying agents to DNS addresses, making them more easily locatable.
    

Specification

-   File Format:
    

-   Mandate support for Turtle (.ttl) and JSON-LD (.jsonld).
    
-   Optional recommendation for N3 support.
    
-   Encoding in encoding="UTF-8"  
      

-   File Location:
    

-   Specify the well-known URI path (e.g., /.well-known/adp or similar).
    

-   Mandatory Fields
    

-   DNS Association: A clear way to represent the domain or subdomain the ADP file describes.
    
-   Entity Type: Distinguish between natural persons, legal entities (organizations), and software services.  
      
    

-   Optional Fields (Expanded)
    

-   Service Classification: Explore relevant vocabularies or controlled lists for classifying services (human rights, child-appropriate, etc.). Address the complexity of potentially subjective classifications.
    
-   Accessibility Information: Consider adopting relevant properties for describing accessibility features of services.
    
-   Mirror Resources: Add fields to indicate equivalent resources on IPFS or other protocols.
    
-   Crypto Account Information: While possible, thoroughly discuss security implications and potential privacy concerns.
    
-   Address Book Reference: Explore how to connect ADP with contact list representations.
    

Extensibility

-   Emphasize RDF: Reinforce the use of RDF and its flexibility for incorporating domain-specific ontologies.
    
-   Example Ontologies: Provide examples for common use cases (accessibility, service classification) if suitable ontologies exist.
    

Considerations

-   Privacy vs. Discoverability: Carefully balance the desire for discoverability with user privacy. ADP might need mechanisms for specifying what information is publicly exposed.
    
-   Subjectivity: Service classifications can be highly subjective. Discuss the potential for community-driven classification standards or multiple classifications to represent different viewpoints.
    
-   Change Management: Emphasize the importance of clear procedures for updating ontologies and properties used in ADP to maintain its utility.
    

Agent Type Specification

1.  Agent Type Refinement:
    

-   Vocabulary: We'll likely need terms from relevant ontologies to differentiate between human agents and various software agents. We might propose an extension if nothing suitable exists.
    
-   Field Update: Adjust the mandatory "Agent Type" field to accommodate these distinctions.  
      
    

3.  AI-Specific Properties:
    

-   Capabilities: Define optional fields to describe the AI agent's capabilities (e.g., natural language processing, image recognition, etc.).
    
-   Model Information: Potentially include fields to link to model descriptions or metadata.
    
-   Input/Output: Fields to describe the expected input data types and the format of the output the AI agent produces.
    

#### Ethics Statement (Optional): A field to link to an ethics statement or guidelines governing the AI agent's use.  
  
-   Vocabularies
    

-   Explore existing relevant vocabularies (FOAF, schema.org, etc.).
    
-   Determine if extensions are needed for Solid/MyData-specific concepts.  
    
-   Mandatory Fields:
    
-   Agent identification (WebID, URI, etc.)
    
-   Agent type (person, organization, service, etc.)  
      

-   Optional Fields
    
-   Human-readable description
    
-   Links to data storage locations
    
-   SPARQL endpoints
    
-   Authentication requirements
    
-   ... (to be expanded)
    

Security Considerations

-   Sensitive Information: Caution against including highly sensitive data within the ADP file, propose alternative mechanisms if needed.
    
-   Public Readability: Address implications of the file being publicly accessible.
    
-   Transparency: Emphasize the importance of clear descriptions of AI agent capabilities to foster trust and avoid unintended uses.
    
-   Data Handling: If AI agents process or store sensitive data, outline how ADP might link to data usage policies or access control information.
    

How Verification Would Work

1.  An agent or service discovers the ADP file.
    
2.  It parses the adp:verification property.
    
3.  It queries the DNS TXT record specified.
    
4.  It retrieves the RDF snippet from the DNS record.
    
5.  Depending on the adp:verificationType, it performs the appropriate verification. This could involve:
    
-   Signature Check: Verifying a digital signature using the public key found at <https://example.com/profile#me>.
    
-   Hash Comparison: Calculating a hash of a certain resource and comparing it with a hash value in the DNS record.
    

RFC Considerations

-   Standardization of Properties: Clearly define adp:verification, adp:dnsRecord, adp:verificationType, etc.
    
-   Signature Schemes: Recommend supported signature schemes for use with ADP.
    
-   Alternative Methods: We might explore other DNS-based verification methods if suitable (e.g., DANE).
    

Advantages

-   Control: Domain owners retain control over verification.
    
-   No Central Authority: Decentralized, doesn't require a single trusted entity.
    
-   Flexibility: Can support different verification mechanisms.
    

### Examples

Provide clear examples in both Turtle and JSON-LD demonstrating basic and more complex ADP files.

```

DNS TXT record _adp.example.com  TXT  "adp:signer <https://example.com/profile#me> ."

```

ADP file (turtle)

```

@prefix adp: <http://www.example.org/adp#> .

@prefix foaf: <http://xmlns.com/foaf/0.1/> .

<#this>

    a adp:Agent ;

    foaf:name "Example Organization" ;

    adp:verification [

        adp:dnsRecord "_adp.example.com" ;

        adp:verificationType "Signature"

    ] .

```

## An AI Agent
```

@prefix adp: <http://www.example.org/adp#> .
@prefix foaf: <http://xmlns.com/foaf/0.1/> .
@prefix ai: <http://www.example.org/ai-ontology#> .

<#this>

    a adp:Agent, ai:ImageClassifier ;
    foaf:name "Acme Image Recognition Service" ;
    adp:description "A service for classifying images based on their content" ;
    ai:capability ai:ImageClassification ;
    ai:inputFormat "image/jpeg", "image/png" ;
    ai:outputFormat <https://schema.org/ImageObject> .

```


## Personal Data Storage

```

@prefix adp: <http://www.example.org/adp#> .

@prefix dct: <http://purl.org/dc/terms/> .

@prefix pds: <http://www.example.com/pds-ontology#> .

<#this>

    a adp:Agent, adp:DataStorageService ;
    adp:dnsDomain "example.com" ;
    pds:storageType pds:PersonalDataPod ;
    dct:description "My personal online data storage" ;
    adp:dataLocation <https://example.com/data/pod> ;
    pds:accessControlPolicy <https://mypod.com/policy.ttl> .
```
  

## AI Service

```

@prefix adp: <http://www.example.org/adp#> .
@prefix ai: <http://www.example.org/ai-ontology#> .

<#this>
    a adp:Agent, ai:TextSummarizer ;
    adp:dnsDomain "ai-service.com" ;
    ai:capability ai:Summarization ;
    ai:inputFormat <https://schema.org/Text> ;
    adp:serviceEndpoint <https://ai-service.com/api>.
```


##  Essential Service (Humanitarian)

```
@prefix adp: <http://www.example.org/adp#> .
@prefix hrt: <http://www.example.org/humanitarian#> .

<#this>
    a adp:Agent, hrt:EssentialService ;
    adp:dnsDomain "humanitarian-aid.org" ;
    hrt:serviceType hrt:EmergencyResponse .

```

```

@prefix adp: <http://www.example.org/adp#> .
@prefix un: <http://www.un.org/ontology#> .
@prefix vc: <https://www.w3.org/2018/credentials#> .

<#this>
    a adp:Agent, un:EssentialService ;
    adp:verifiableCredentials [
    a vc:VerifiableCredential ;
      vc:type "UNHumanitarianDesignation" ;
      vc:issuer <https://un.org/aid-registry>
    ] .

```

## Age-Appropriate Content

```
@prefix adp: <http://www.example.org/adp#> .
@prefix ac: <http://www.example.org/age-classification#> .

<#this>
    a adp:Agent, adp:ContentProvider ;
    adp:dnsDomain "media-site.com" ;
    ac:ageRating ac:PG-13 . 
```

```

@prefix adp: <http://www.example.org/adp#> .
@prefix ac: <http://www.gov.au/age-classification#> .
  
<#this>
    a adp:Agent, adp:ContentProvider ;
    ac:contentRating ac:MA15+ .
```

## News Site Agent

```

@prefix adp: <http://www.example.org/adp#> .

<#this>
    a adp:Agent, adp:NewsProvider ;
    adp:dnsDomain "news.org" ;
    adp:apiDescription <https://news.org/developer-api.html> .
```

## Library SPARQL Endpoint

```

@prefix adp: <http://www.example.org/adp#> .

<#this>
    a adp:Agent ;
    adp:dnsDomain "library.edu" ;
    adp:sparqlEndpoint <https://library.edu/sparql> .
```

## Verifiable Credentials in ADP

```
@prefix adp: <http://www.example.org/adp#> .
@prefix vc: <https://www.w3.org/2018/credentials#> .

<#this>
   a adp:Agent ;
   adp:verifiableCredentials [
       a vc:VerifiableCredential ;
       vc:type "DriversLicense" ;
       vc:issuer <https://dmv.gov.org/#issuer> ;
       # ... other VC properties
    ] .

```

## Website Verification

```
@prefix adp: <http://www.example.org/adp#> .
@prefix vc: <https://www.w3.org/2018/credentials#> .

<#this>
    a adp:Agent, adp:FinancialInstitution ;
    adp:dnsDomain "mybank.com" ;
    adp:verifiableCredentials [
      a vc:VerifiableCredential ;
        vc:type "BankingLicense" ;
        vc:issuer <https://finance.gov/licensing>
    ] .

```

**