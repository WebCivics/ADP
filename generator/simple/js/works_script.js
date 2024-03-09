function generateJSONLD() {
    const dataForm = document.getElementById('dataForm');
    const formData = new FormData(dataForm);
    const ontologyNamespace = "http://webcivics.github.io/ontologies/adp#";

    // Get the user's provided domain
    const userDomain = formData.get('domain');

    // Generate Ontology Document
    const ontologyDocument = `@prefix adp: <${ontologyNamespace}> .
        @prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
        ... // Rest of your ontology definition`;

    // Creating a Blob to download Ontology Document
    const ontologyBlob = new Blob([ontologyDocument], { type: 'text/turtle' });
    const ontologyFile = URL.createObjectURL(ontologyBlob);

    // Creating a checksum for the ontology.ttl file
    const ontologyChecksum = generateChecksum(ontologyDocument);

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
            {"@type": "adp:OnlineAccount", "adp:hasLinkedinAccount": formData.get('onlineAccounts')},
            {"@type": "adp:OnlineAccount", "adp:hasTwitterAccount": formData.get('onlineAccounts')},
            {"@type": "adp:OnlineAccount", "adp:hasGithubAccount": formData.get('onlineAccounts')},
            {"@type": "adp:OnlineAccount", "adp:hasSolidWebID": formData.get('webID')},
            {"@type": "adp:OnlineAccount", "adp:hasSolidPodStorage": formData.get('podStorage')}
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

    // Creating a download link for Agent JSON-LD file
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
}

function generateChecksum(data) {
    return sha256(data);
}