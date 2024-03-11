function generateJSONLD() {
    const dataForm = document.getElementById('dataForm');
    const formData = new FormData(dataForm);
    const ontologyNamespace = "http://webcivics.github.io/ontologies/adp#";

    // Get the user's provided domain
    const userDomain = formData.get('domain');
    
    // Generate Ontology Document
    const ontologyDocument = `@prefix adp: <${ontologyNamespace}> .
        @prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
        @prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
        @prefix xsd: <http://www.w3.org/2001/XMLSchema#> .
        @prefix schema: <http://schema.org/> .
        @prefix foaf: <http://xmlns.com/foaf/0.1/> .
        @prefix ogp: <http://ogp.me/ns#> .
        
        adp:Agent rdf:type adp:Class ;
            rdfs:label "Agent" .
        
        adp:OnlineAccount rdf:type adp:Class ;
            rdfs:label "OnlineAccount" .
            sameAs: [ schema:OnlineAccount ] .
        
        adp:CryptoAccount rdf:type adp:Class ;
            rdfs:label "CryptoAccount" ;
            rdfs:subClassOf adp:Agent .
        
        adp:hasName rdf:type rdf:Property ;
            rdfs:domain adp:Agent ;
            rdfs:label "hasName" ;
            rdfs:range xsd:string ;
            sameAs: [ foaf:name ] .
        
        adp:hasOnlineAccount rdf:type rdf:Property ;
            rdfs:domain adp:Agent ;
            rdfs:label "hasOnlineAccount" ;
            rdfs:range adp:OnlineAccount ;
            sameAs: [ schema:account ] .
        
        adp:hasLinkedinAccount rdf:type rdf:Property ;
            rdfs:domain adp:OnlineAccount ;
            rdfs:label "hasLinkedinAccount" ;
            rdfs:range xsd:string ;
            sameAs: [ schema:socialMedia, schema:sameAs, foaf:account ] .
        
        adp:hasTwitterAccount rdf:type rdf:Property ;
            rdfs:domain adp:OnlineAccount ;
            rdfs:label "hasTwitterAccount" ;
            rdfs:range xsd:string ;
            sameAs: [ schema:socialMedia, schema:sameAs, foaf:account ] .
        
        adp:hasGithubAccount rdf:type rdf:Property ;
            rdfs:domain adp:OnlineAccount ;
            rdfs:label "hasGithubAccount" ;
            rdfs:range xsd:string ;
            sameAs: [ schema:socialMedia, schema:sameAs, foaf:account ] .
        
        adp:hasCryptoAccount rdf:type rdf:Property ;
            rdfs:domain adp:Agent ;
            rdfs:label "hasCryptoAccount" ;
            rdfs:range adp:CryptoAccount .
        
        adp:hasEcashAccount rdf:type rdf:Property ;
            rdfs:domain adp:CryptoAccount ;
            rdfs:label "hasEcashAccount" ;
            rdfs:range xsd:string ;
            sameAs: [ schema:accountId ] .
        `;

    const agent = {
        "@context": {
            "adp": "http://webcivics.github.io/ontologies/adp#",
            "rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
            "rdfs": "http://www.w3.org/2000/01/rdf-schema#",
            "xsd": "http://www.w3.org/2001/XMLSchema#",
            "schema": "http://schema.org/",
            "foaf": "http://xmlns.com/foaf/0.1/",
            "ogp": "http://ogp.me/ns#",
            "@embed": "@context",
            "@context": {
                "adp:seeAlso": { "@id": `${userDomain}/ns/ontology.ttl`, "@type": "@id" },
            }
        },
        "@type": "adp:Agent",
        "adp:hasName": formData.get('name'),
        "adp:hasOnlineAccount": [
            {"@type": "adp:OnlineAccount", "adp:hasLinkedinAccount": formData.get('onlineAccounts')},
            {"@type": "adp:OnlineAccount", "adp:hasTwitterAccount": formData.get('onlineAccounts')},
            {"@type": "adp:OnlineAccount", "adp:hasGithubAccount": formData.get('onlineAccounts')},
            {"@type": "adp:OnlineAccount", "adp:hasSolidWebID": formData.get('webID')},
            {"@type": "adp:OnlineAccount", "adp:hasSolidPodStorage": formData.get('podStorage')}
        ],
        "adp:hasCryptoAccount": [{"@type": "adp:CryptoAccount", "adp:hasEcashAccount": formData.get('cryptoAccounts')}],
        "adp:seeAlso": `${userDomain}/ns/ontology.ttl`
    };

    const jsonData = JSON.stringify(agent, null, 2);

    // Creating a Blob to download JSON-LD file
    const blob = new Blob([jsonData], { type: 'application/ld+json' });
    const jsonldFile = URL.createObjectURL(blob);

    // Creating a checksum
    const checksum = generateChecksum(jsonData);

    // Creating a Blob to download checksum file
    const checksumBlob = new Blob([checksum], { type: 'text/plain' });
    const checksumFile = URL.createObjectURL(checksumBlob);

    // Creating a download link for JSON-LD file
    const jsonldLink = document.createElement('a');
    jsonldLink.href = jsonldFile;
    jsonldLink.download = 'agent.jsonld';

    // Creating a download link for checksum file
    const checksumLink = document.createElement('a');
    checksumLink.href = checksumFile;
    checksumLink.download = 'checksum.txt';

    // Creating a download link for Ontology Document
    const ontologyBlob = new Blob([ontologyDocument], { type: 'text/turtle' });
    const ontologyFile = URL.createObjectURL(ontologyBlob);

    // Creating a download link for Ontology Document
    const ontologyLink = document.createElement('a');
    ontologyLink.href = ontologyFile;
    ontologyLink.download = 'ontology.ttl';

    // Simulating click to trigger download
    document.body.appendChild(jsonldLink);
    jsonldLink.click();
    document.body.removeChild(jsonldLink);

    document.body.appendChild(checksumLink);
    checksumLink.click();
    document.body.removeChild(checksumLink);

    document.body.appendChild(ontologyLink);
    ontologyLink.click();
    document.body.removeChild(ontologyLink);
}

function generateChecksum(data) {
    return sha256(data);
}
