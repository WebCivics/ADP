// Declare JSONLD_CHECKSUM globally
let JSONLD_CHECKSUM;

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
    
    // Creating a checksum for the ontology.ttl file
    const ontologyChecksum = generateChecksum(ontologyDocument);

    // Creating a Blob to download Ontology Document
    const ontologyBlob = new Blob([ontologyDocument], { type: 'text/turtle' });
    const ontologyFile = URL.createObjectURL(ontologyBlob);

    // Update form with the ontology checksum
    formData.set('ontologyChecksum', ontologyChecksum);
    
    // Generate Agent JSON-LD
    const agent = {
        "@context": {
            "adp": "http://webcivics.github.io/ontologies/adp#",
            "@embed": "@context",
            "@context": {
                "adp:seeAlso": { "@id": `${userDomain}/ns/ontology.ttl`, "@type": "@id" },
            }
        },
        "@type": "adp:Agent",
        "adp:hasName": formData.get('name'),
        "adp:hasOnlineAccount": [
            {"@type": "adp:OnlineAccount", "adp:hasLinkedinAccount": formData.get('linkedinAccount')},
            {"@type": "adp:OnlineAccount", "adp:hasTwitterAccount": formData.get('twitterAccount')},
            {"@type": "adp:OnlineAccount", "adp:hasGithubAccount": formData.get('githubAccount')},
            {"@type": "adp:OnlineAccount", "adp:hasSolidWebID": formData.get('SolidwebID')},
            {"@type": "adp:OnlineAccount", "adp:hasSolidPodStorage": formData.get('SoldPodStorage')}
        ],
        "adp:hasCryptoAccount": [{"@type": "adp:CryptoAccount", "adp:hasEcashAccount": formData.get('cryptoAccounts')}],
        "adp:seeAlso": {
            "@id": `${userDomain}/ns/ontology.ttl`,
            "adp:checksum": ontologyChecksum
        }
    };

    const jsonData = JSON.stringify(agent, null, 2);

    // Creating a Blob to download JSON-LD file
    const blob = new Blob([jsonData], { type: 'application/ld+json' });
    const jsonldFile = URL.createObjectURL(blob);

    // Creating a checksum for the agent.jsonld file
    const jsonldChecksum = generateChecksum(jsonData);

    // Creating a Blob to download checksum file for agent.jsonld
    const jsonldChecksumBlob = new Blob([jsonldChecksum], { type: 'text/plain' });
    const jsonldChecksumFile = URL.createObjectURL(jsonldChecksumBlob);

    // Creating a download link for JSON-LD file
const jsonldLink = document.createElement('a');
jsonldLink.href = jsonldFile;
jsonldLink.download = 'agent.jsonld';

// Creating a download link for checksum file for agent.jsonld
const jsonldChecksumLink = document.createElement('a');
jsonldChecksumLink.href = jsonldChecksumFile;
jsonldChecksumLink.download = 'agent_checksum.txt';

// Creating a download link for Ontology Document
const ontologyLink = document.createElement('a');
ontologyLink.href = ontologyFile;
ontologyLink.download = 'ontology.ttl';

// Simulating click to trigger download
document.body.appendChild(jsonldLink);
jsonldLink.click();
document.body.removeChild(jsonldLink);

document.body.appendChild(jsonldChecksumLink);
jsonldChecksumLink.click();
document.body.removeChild(jsonldChecksumLink);

document.body.appendChild(ontologyLink);
ontologyLink.click();
document.body.removeChild(ontologyLink);

// Update form with the JSON-LD checksum
JSONLD_CHECKSUM = jsonldChecksum;

// Call the function to generate the Bash script
generateBashScript(jsonData, JSONLD_CHECKSUM);

// Function to generate Bash script
function generateBashScript(jsonData, jsonldChecksum) {
    const bashScript = `#!/bin/bash   

# Variables - Update these!
DOMAIN="${userDomain}"  # The domain for the certificate
PERSON_URI="${formData.get('webID')}"  
PERSON_OID="${formData.get('oid')}"  # Replace with the actual OID for person identification
CHECKSUM_ALGORITHM="sha256"  # Could be sha1, sha256, etc.

# Calculate the checksum of the JSON-LD file
JSONLD_CHECKSUM=$(openssl dgst -$CHECKSUM_ALGORITHM -binary <(echo -n $jsonData) | openssl enc -base64)

# Obtain the certificate with certbot
certbot certonly --standalone -d $DOMAIN \
--expand \
--cert-name $DOMAIN \ 
-m "${formData.get('email')}" --agree-tos \
--cert-request <(echo -e "[ req ]\ndistinguished_name=dn\n[ dn ]\n[ SAN ]\nsubjectAltName=DNS:${userDomain}/.well-known/adp#,otherName:1.3.112.4.59;FORMAT:HEX,VALUE:${JSONLD_CHECKSUM}") # Adjust email as needed

# Incorporating the URI, OID, and Checksum (Method Dependent)

# **1. Certificate Extension:** (Requires Certbot with DNS Challenge or Custom Work)
#     - Certbot supports limited extensions; you might need a DNS challenge or 
#       create a custom plugin for complex extensions with the URI and OID.

# **2. Separate Storage:** 
#      - Store the URI, OID, and CHECKSUM in a metadata file or database associated with
#        the certificate's common name ($DOMAIN)

# Example: Create metadata file
METADATA_FILE="/etc/letsencrypt/live/$DOMAIN/metadata.txt"
echo "Person URI: $PERSON_URI" >> $METADATA_FILE
echo "Person OID: $PERSON_OID" >> $METADATA_FILE
echo "JSON-LD Checksum ($CHECKSUM_ALGORITHM): $JSONLD_CHECKSUM" >> $METADATA_FILE
echo "OID $PERSON_OID; $CHECKSUM_ALGORITHM Checksum: $JSONLD_CHECKSUM" > checksum.txt`;

    // Create a Blob to download Bash script
    const bashBlob = new Blob([bashScript], { type: 'text/plain' });
    const bashFile = URL.createObjectURL(bashBlob);

    // Creating a download link for Bash script
    const bashLink = document.createElement('a');
    bashLink.href = bashFile;
    bashLink.download = 'generate_certificate.sh';

    // Simulating click to trigger download
    document.body.appendChild(bashLink);
    bashLink.click();
    document.body.removeChild(bashLink);
}

    function generateChecksum(data) {
        return sha256(data);
    }

        // Ask the user if they want to see the howto.html document
        const showHowto = window.confirm("You should now receive the files generated for you. Would you like tosee the howto.html document, describing how to install on linux?");
    
        if (showHowto) {
            window.location.href = 'howto.html'; // Redirect to howto.html
        }
    }
    

