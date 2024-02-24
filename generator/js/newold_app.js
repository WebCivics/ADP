// Constants
const ontologySelect = document.getElementById('ontology-select');
const adpForm = document.getElementById('adp-form');
const outputCode = document.getElementById('output-code');
const outputHash = document.getElementById('output-hash');
const generateButton = document.getElementById('generate-button');
const iriInput = document.getElementById('iri-input');
const agentElement = document.getElementById('Agent');

// Namespaces
const FOAF = $rdf.Namespace('http://xmlns.com/foaf/0.1/');
const RDF = $rdf.Namespace('http://www.w3.org/1999/02/22-rdf-syntax-ns#');
const SCHEMA = $rdf.Namespace('http://schema.org/');
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
                option.value = ontology.path;
                option.text = ontology.name;
                ontologySelect.add(option);
            });
        })
        .catch(error => console.error('Error loading ontologies:', error));
}

// Function to fetch and parse an ontology (Modified for absolute IRIs)
function loadOntology(path) {
    const absolutePath = new URL(path, window.location.origin).href; // Construct absolute IRI
    fetcher.load(absolutePath)
        .then(graph => {
            clearForm();
            buildForm(graph); 
        })
        .catch(error => console.error('Error loading ontology:', error));
}

// Helper functions
function clearForm() {
    adpForm.innerHTML = ''; 
}

function buildForm(graph) {
    addTextInput(null, RDF('type'), 'Agent Type'); // Mandatory property
    addTextInput(null, FOAF('Agent'), 'Agent ID (URI)'); 

    // Find relevant classes 
    const relevantClasses = graph.match(null, RDF('type'), RDFS('Class'));
    relevantClasses.forEach(classSubject => {
        const classURI = classSubject.subject;
        const label = graph.any(classURI, RDFS('label'))?.value || classURI.value; 

        // Get properties of this class
        const properties = graph.match(classURI, null, null); 
        properties.forEach(propertySubject => {
            const propertyURI = propertySubject.predicate;
            const propertyLabel = graph.any(propertyURI, RDFS('label'))?.value || propertyURI.value;
            addTextInput(classURI, propertyURI, propertyLabel); 
        });
    });
}

// Event Listener for ontologySelect
ontologySelect.addEventListener('change', () => {
    const selectedPath = ontologySelect.value;

    if (selectedPath) {
        loadOntology(selectedPath); 
    } else {
        console.error("No ontology selected.");
    }
});

// Modify the buildForm function to accept the ontology name
function buildForm(graph, ontologyName) {
    clearForm();

    // Add common fields
    addTextInput(null, RDF('type'), 'Agent Type'); // Mandatory property
    addTextInput(null, FOAF('Agent'), 'Agent ID (URI)'); 

    // Find relevant classes 
    const relevantClasses = graph.match(null, RDF('type'), RDFS('Class'));
    relevantClasses.forEach(classSubject => {
        const classURI = classSubject.subject;
        const label = graph.any(classURI, RDFS('label'))?.value || classURI.value; 

        // Check if the class belongs to the selected ontology
        if (label.toLowerCase() === ontologyName.toLowerCase()) {
            // Get properties of this class
            const properties = graph.match(classURI, null, null); 
            properties.forEach(propertySubject => {
                const propertyURI = propertySubject.predicate;
                const propertyLabel = graph.any(propertyURI, RDFS('label'))?.value || propertyURI.value;
                addTextInput(classURI, propertyURI, propertyLabel); 
            });
        }
    });
}

// Update the loadOntology function to pass the ontology name
function loadOntology(path) {
    const ontologyName = path.split('/').pop().split('.')[0]; // Extract ontology name from the path
    const absolutePath = new URL(path, window.location.origin).href;

    fetcher.load(absolutePath)
        .then(graph => {
            buildForm(graph, ontologyName); 
        })
        .catch(error => console.error('Error loading ontology:', error));
}

function addTextInput(classURI, propertyURI, labelText) {
    const fieldContainer = document.createElement('div'); // Create a container for better styling
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

// Event Listener for Generate Button 
generateButton.addEventListener('click', () => {
    const adpGraph = $rdf.graph(); // Create a new graph

    // Agent Type and ID
    const agentElement = document.getElementById(FOAF('Agent'));
    
    if (agentElement) {
        const agentURI = agentElement.value;
        adpGraph.add(agentBlankNode, FOAF('Agent'), $rdf.lit(agentURI)); 
    } else {
        console.error("Element with ID 'FOAF('Agent')' not found.");
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

ontologySelect.addEventListener('change', () => {
    const selectedPath = ontologySelect.value;
    loadOntology(selectedPath); 
});

// Basic IRI Validation Function (Optional)
function isValidIRI(iri) {
    const iriPattern = /^(https?|ftp):\/\/[^\s$.?#].[^\s]*$/; 
    return iriPattern.test(iri); 
}
