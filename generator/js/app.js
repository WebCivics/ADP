// Constants
const ontologySelect = document.getElementById('ontology-select');
const adpForm = document.getElementById('adp-form');
const outputCode = document.getElementById('output-code');
const outputHash = document.getElementById('output-hash');
const generateButton = document.getElementById('generate-button');
const iriInput = document.getElementById('iri-input');

// Namespaces
const FOAF = $rdf.Namespace('http://xmlns.com/foaf/0.1/');
const RDF = $rdf.Namespace('http://www.w3.org/1999/02/22-rdf-syntax-ns#');
const RDFS = $rdf.Namespace('http://www.w3.org/2000/01/rdf-schema#');

// Global to store the Fetcher
let fetcher = new $rdf.Fetcher(); 

// Function to fetch and populate ontologies
function loadOntologies() {
    fetch('config.json')
        .then(response => response.json())
        .then(config => {
            config.ontologies.forEach(ontology => {
                let option = document.createElement('option');
                option.value = JSON.stringify(ontology); 
                option.text = ontology.name;
                ontologySelect.add(option);
            });
        })
        .catch(error => console.error('Error loading ontologies:', error));
}

// Function to fetch and parse an ontology (Modified for JSON-LD)
function loadOntology(ontologyInfo) {
    const { name,  jsonldUri } = ontologyInfo; 
    if (!jsonldUri) {
        console.error(`JSON-LD URI is missing for ontology: ${name}`);
        return;
    }

    const absoluteJsonLdUri = new URL(jsonldUri, window.location.origin).href;

// ...

fetch(absoluteJsonldUri)
    .then(response => {
        if (!response.ok) {
            console.error(`Failed to load ontology (${response.status}): ${response.statusText || 'Unknown error'}`);
            throw new Error('Failed to load ontology');
        }
        return response.json(); // Parse as JSON
    })
    .then(data => {
        // Parse the JSON-LD data into a graph
        const graph = $rdf.graph();
        $rdf.parse(data, graph, absoluteJsonldUri, 'application/ld+json'); // Specify the correct content type

        // Check if the graph is empty or undefined
        if (!graph || graph.length === 0) {
            console.error(`No data loaded for ontology: ${name}`);
            throw new Error('No data loaded for ontology');
        }

        // Call the buildForm function with the graph and ontologyName
        buildForm(graph, name);
    })
    .catch(error => console.error('Error loading ontology:', error));

// ...

}

// Helper functions
function clearForm() {
    adpForm.innerHTML = ''; 
}

function addTextInput(classURI, propertyURI, labelText) {
    const fieldContainer = document.createElement('div');
    fieldContainer.className = 'form-field';
    fieldContainer.dataset.propertyUri = propertyURI.value; 

    const label = document.createElement('label');
    label.htmlFor = propertyURI.value; 
    label.textContent = labelText;

    const input = document.createElement('input');
    input.type = 'text'; 
    input.id = propertyURI.value; 

    fieldContainer.appendChild(label); 
    fieldContainer.appendChild(input);
    adpForm.appendChild(fieldContainer); 
}

function buildForm(graph, ontologyName) {
    clearForm();

    // Add common fields
    addTextInput(null, RDF('type'), 'Agent Type'); // Mandatory property
    addTextInput(null, FOAF('Agent'), 'Agent ID (URI)');

    // Create a section for the ontology
    const ontologySection = document.createElement('div');
    ontologySection.className = 'ontology-section';
    ontologySection.innerHTML = `<h3>${ontologyName}</h3>`;
    adpForm.appendChild(ontologySection);

    // Find relevant classes
    graph.forEach(quad => {
        const classURI = quad.subject;
        const label = graph.any(classURI, RDFS('label'))?.value || classURI.value;

        // Check if the class belongs to the selected ontology
        if (label.toLowerCase() === ontologyName.toLowerCase()) {
            // Get properties of this class
            const properties = graph.match(classURI, null, null);
            properties.forEach(propertyQuad => {
                const propertyURI = propertyQuad.predicate;
                const propertyLabel = graph.any(propertyURI, RDFS('label'))?.value || propertyURI.value;

                // Create a vocabulary entry with a drop-down box, input fields, and an "Add" button
                addVocabularyEntry(ontologySection, propertyLabel);
            });
        }
    });
}

function addVocabularyEntry(section, propertyLabel) {
    const vocabularyEntry = document.createElement('div');
    vocabularyEntry.className = 'vocabulary-entry';

    const vocabularyLabel = document.createElement('label');
    vocabularyLabel.textContent = propertyLabel;

    const inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.placeholder = 'Provide input';

    const typeField = document.createElement('input');
    typeField.type = 'text';
    typeField.placeholder = 'Input type (e.g., text, int)';

    const addButton = document.createElement('button');
    addButton.textContent = 'Add';
    addButton.addEventListener('click', () => {
        // Handle the "Add" button click (you can customize this logic)
        console.log('Add button clicked');
    });

    vocabularyEntry.appendChild(vocabularyLabel);
    vocabularyEntry.appendChild(inputField);
    vocabularyEntry.appendChild(typeField);
    vocabularyEntry.appendChild(addButton);

    section.appendChild(vocabularyEntry);
}

// Event Listener for ontologySelect
ontologySelect.addEventListener('change', () => {
    const selectedOntologyInfo = JSON.parse(ontologySelect.value);
    if (selectedOntologyInfo.turtleUri) {
        loadOntology(selectedOntologyInfo);
    } else {
        console.error(`Turtle URI is missing for ontology: ${selectedOntologyInfo.name}`);
    }
});
// Event Listener for Generate Button 
generateButton.addEventListener('click', () => {
    const adpGraph = $rdf.graph();

    // Agent Type and ID
    const agentElement = document.getElementById(FOAF('Agent'));

    if (agentElement) {
        const agentURI = agentElement.value;
        adpGraph.add($rdf.sym(agentURI), RDF('type'), FOAF('Agent'));
    } else {
        console.error("Element with ID 'Agent' not found.");
        return;
    }

    // Get IRI value (With Default Handling)
    let iriValue = iriInput.value;
    if (!iriValue) { 
        iriValue = "https://example.org/"; 
    }

    // Basic IRI Validation (Optional) 
    if (!isValidIRI(iriValue)) {
        console.error("Invalid IRI format provided.");
        return; 
    }

    // ... (Extract values from form fields)

    // Serialize ADP in Turtle format 
    const adpSerializer = new $rdf.Serializer(adpGraph);
    const adpOutput = adpSerializer.statementsToN3(adpGraph.statements); 
    outputCode.textContent = adpOutput; 

    // Hash Calculation (assuming you have included 'js-sha256.js')
    const hash = sha256.sha256(adpOutput);
    outputHash.textContent = hash;
});

// Initialization 
loadOntologies();

// Basic IRI Validation Function (Optional)
function isValidIRI(iri) {
    const iriPattern = /^(https?|ftp):\/\/[^\s$.?#].[^\s]*$/; 
    return iriPattern.test(iri); 
}
