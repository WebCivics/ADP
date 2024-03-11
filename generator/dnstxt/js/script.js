// Function to generate JSON-LD ADP file
function generateJSONLD() {
    const dataForm = document.getElementById('dataForm');
    const formData = new FormData(dataForm);
    const ontologyNamespace = "https://webcivics.github.io/adp/ontdev/adp#";

    // Get the user's provided domain
    const userDomain = formData.get('domain');

    // Generate Agent JSON-LD
    const agent = {
        "@context": {
            "adp": "http://webcivics.github.io/adp/ontdev/adp#",
            "schema": "http://schema.org/",
            "foaf": "http://xmlns.com/foaf/0.1/",
            "ogp": "http://ogp.me/ns#",
        },
        "@type": "adp:Agent",
        "adp:agentType": "naturalPerson", 
        "foaf:name": formData.get('name'),
        "adp:hasOnlineAccount": [
            {"@type": "adp:OnlineAccount", "adp:hasLinkedinAccount": formData.get('linkedinAccount')},
            {"@type": "adp:OnlineAccount", "adp:hasTwitterAccount": formData.get('twitterAccount')},
            // Add more online accounts as needed
        ],
        "adp:hasCryptoAccount": [{"@type": "adp:CryptoAccount", "adp:hasEcashAccount": formData.get('cryptoAccounts')}],
        "adp:hasDomain": userDomain,
        "schema:domain": formData.get('domain'),
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

    // Simulating click to trigger download
    document.body.appendChild(jsonldLink);
    jsonldLink.click();
    document.body.removeChild(jsonldLink);

    document.body.appendChild(jsonldChecksumLink);
    jsonldChecksumLink.click();
    document.body.removeChild(jsonldChecksumLink);

    // Update form with the JSON-LD checksum
    JSONLD_CHECKSUM = jsonldChecksum;

    function generateChecksum(data) {
        return sha256(data);
    }
}
