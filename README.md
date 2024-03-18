# ADP
**Agent Discovery Protocol**

![diagram](images/2024-03-02_diagram-2.png)

Note: 'Agreements' method is out of scope.  


## Description

The Agent Discovery Protocol (ADP) project, is intended to create a mechanism for providing discovery of information relating to a domain or sub-domain name, as an agent. 

Their associated Web of Data services and relevant metadata at a Given URL. ADP is intended to be defined in a manner that builds upon existing web standards and leverages RDF for rich, machine-readable descriptions but ALSO seeks to caters specifically for natural persons, by supporting the means through which decentralized and data-ownership-centric nature of emerging internet technologies and protocols. Some of the early notes about related concepts include this [blogpost about social web](https://web.archive.org/web/20130122051820/http://jeffsayre.com/2010/09/15/web-3-0-smartups-the-social-web-and-the-web-of-data/) and TimBL's note on [Socially Aware Cloud Storage
](https://web.archive.org/web/20130922093256/http://www.w3.org/DesignIssues/CloudStorage.html).  In this **Personal Domain Profile** use of ADP, the mechanism seeks to provide reliable pointers to online services that provide the functionality produced by projects that have been developing over many years to deliver these more advanced services.

In other use-cases, the solution is intended to provide information that can be used to provide basic information that can be then employed by other agents, for some purpose.  The hope is that the method will provide a solution that can more easily support context related considerations in association to the management of the availability of online resources, and the means to discover end-points, but, moreover it is also considered that the general method provides a broad-range of potential future applications.

Whilst The protocol supports agent identification, capability descriptions, service endpoints, access control information, and various classifications.  To enhance Trust and verifiability, ADP accommodates the inclusion of [Verifiable Credentials](https://en.wikipedia.org/wiki/Verifiable_credentials) and supports DNS-based Verification Methods.


## Background

Few Background Notes.  There are some complex underlying considerations, associated to the notion of ADP.  During initial discovery, it was found that one of the most common objections related to persons who were not aware of linked-data or semantic web.  As such, i have sought to provide more information below.


## Related Work: WebID

[WebID](https://www.w3.org/wiki/WebID)  (seeAlso: [foaf](https://en.wikipedia.org/wiki/FOAF))

Work formerally known as [FOAF+SSL](https://web.archive.org/web/20100105172819/http://blogs.sun.com/bblfish/entry/more_on_authorization_in_foaf), led to the beginnings of 'web-id protocol' as [foaf+ssl](https://www.w3.org/wiki/Foaf%2Bssl) which then led to the [WebID Specifications](https://dvcs.w3.org/hg/WebID/raw-file/tip/spec/index.html), including [WebID-TLS](https://dvcs.w3.org/hg/WebID/raw-file/tip/spec/tls-respec.html), WebID-RSA(https://github.com/solid/solid/blob/main/proposals/auth-webid-rsa.md) (better link preferred but not found yet), and [WebID-OIDC](https://github.com/solid/webid-oidc-spec).

### Semantic Web

‘Web Science, AI and the Future of the Internet’ at #WWSSS19 ["Semantic Web / Knowledge Graph is inherantly AI"](https://twitter.com/DameWendyDBE/status/1172470883610431489)

Many are not aware of of the status and use of 'semantic web' or related 'web of data' bodies of work, primarily produced in the form of web-standardisation efforts via W3C, although not exclusively. Semantic Web is a high-level term that represents a broad ecosystem of components. One of the earlier presentations about the underlying notions is from WWW94 (1994) [TimBL Snippet 1994](https://www.youtube.com/watch?v=UkjyCPuTKPw), however 'semantic web' was more formerally launched some years later via the paper [The Semantic Web "by TIM BERNERS-LEE, JAMES HENDLER and ORA LASSILA"](https://www-sop.inria.fr/acacia/cours/essi2006/Scientific%20American_%20Feature%20Article_%20The%20Semantic%20Web_%20May%202001.pdf).  

Some of the earliest work was produced via DARPA, see [DAML+Oil](https://en.wikipedia.org/wiki/DARPA_Agent_Markup_Language) and the [Web of Data](https://www.w3.org/2013/data/) has since developed substantially. The [Open Linked Data Cloud](https://lod-cloud.net/) provides some insights about it.  

Semantic web involves many 'loosly coupled' components.  There are query languages, rules and logical programming languages and more recently also, supports for credentials, personal data-storage; where, [Solid](https://www.w3.org/community/solid/) and [cognative ai](https://www.w3.org/community/cogai/) works are underway.  

Other Notes; [owl](https://en.wikipedia.org/wiki/Web_Ontology_Language), [rdfs](https://en.wikipedia.org/wiki/RDF_Schema), [rif](https://en.wikipedia.org/wiki/Rule_Interchange_Format), [shacl](https://en.wikipedia.org/wiki/SHACL), [TimBL Design Issues](https://web.archive.org/web/20240000000000*/https://www.w3.org/DesignIssues/)


### Library Resources

- [Semantic Web Docs](https://drive.google.com/drive/folders/1oirZT3b4YJhAdrjt2WINKjLs_6e-L1mD)
- [RWW Resources](https://drive.google.com/drive/folders/1lpeoEFowRcq3VTAp5LH6cFN251O9g9iE) - note; [W3C RWW](https://www.w3.org/community/rww/) work is now being advanced as [w3c solid](https://www.w3.org/community/solid/)     


- [What is Linked Data (RDF) - Wikipedia](https://en.wikipedia.org/wiki/Linked_data)

Note also, more general considerations about [ontology](https://drive.google.com/drive/folders/1OiVwrEFikpl5pPsveEPwULB8Yqoa1YpK)


### What about IoT

IoT is supported via [Web Of Things](https://www.w3.org/WoT/) 
