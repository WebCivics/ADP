// Declare JSONLD_CHECKSUM globally
let JSONLD_CHECKSUM;

function generateJSONLD() {
    const dataForm = document.getElementById('dataForm');
    const formData = new FormData(dataForm);
    const ontologyNamespace = "http://webcivics.github.io/ontologies/adp#";

    // Get the user's provided domain
    const userDomain = formData.get('domain');

    // Generate Ontology Document
    const ontologyDocument = `
    @prefix adp: <${ontologyNamespace}> .
    // ... (your existing ontologyDocument code)
    `;

    // Creating a checksum for the ontology.ttl file
    const ontologyChecksum = generateChecksum(ontologyDocument);

    // Update form with the ontology checksum
    formData.set('ontologyChecksum', ontologyChecksum);
    
    // Generate Agent JSON-LD
    const agent = {
        // ... (your existing agent code)
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

    // Update form with the ontology.ttl filename
    formData.set('ontologyFilename', 'ontology.ttl');

    // Submit the form to generate.php for server-side processing
    dataForm.submit();
}

function generateChecksum(data) {
    return sha256(data);
}
