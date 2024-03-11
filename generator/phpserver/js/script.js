// Declare JSONLD_CHECKSUM globally
let JSONLD_CHECKSUM;

function generateJSONLD() {
    const dataForm = document.getElementById('dataForm');
    const formData = new FormData(dataForm);
    const ontologyNamespace = "http://webcivics.github.io/ontologies/adp#";

    // Get the user's provided domain
    const userDomain = formData.get('domain');

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

    // Creating a checksum for the agent.jsonld file
    const jsonldChecksum = generateChecksum(jsonData);

    // Update form with the JSON-LD checksum
    formData.set('jsonldChecksum', jsonldChecksum);

    // Update form with the JSON-LD data
    formData.set('jsonldData', jsonData);

    // Update form with the agent.jsonld filename
    formData.set('jsonldFilename', 'agent.jsonld');

    // Update form with the agent_checksum.txt filename
    formData.set('checksumFilename', 'agent_checksum.txt');

    // Submit the form to generate.php for server-side processing
    submitForm(formData);
}

function submitForm(formData) {
    fetch('generate.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(response => {
        // Display success message or handle errors
        alert(response);
    })
    .catch(error => {
        // Handle fetch error
        console.error('Error:', error);
    });
}

function generateChecksum(data) {
    return sha256(data);
}
