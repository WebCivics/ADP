// Constants
const ontologySelect = document.getElementById('ontology-select');
const adpForm = document.getElementById('adp-form');
const outputCode = document.getElementById('output-code');
const outputHash = document.getElementById('output-hash');
const generateButton = document.getElementById('generate-button');

// Namespaces
const FOAF = $rdf.Namespace('http://xmlns.com/foaf/0.1/');
const RDF = $rdf.Namespace('http://www.w3.org/1999/02/22-rdf-syntax-ns#');
const SCHEMA = $rdf.Namespace('http://schema.org/');
const RDFS = $rdf.Namespace('http://www.w3.org/2000/01/rdf-schema#');

// Global to store the Fetcher
let fetcher;

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
    fetcher.load(absolutePath).then(graph => {
        clearForm(); 
        buildForm(graph); 
    }).catch(error => console.error('Error loading ontology:', error));
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
    const adpGraph = new $rdf.Graph(); // Using the $rdf namespace 

    // Agent Type and ID
    adpGraph.add(adpGraph.sym(''), RDF('type'), FOAF('Agent')); 
    const agentURI = document.getElementById(FOAF('Agent')).value;
    adpGraph.add(adpGraph.sym(agentURI), FOAF('Agent'), $rdf.lit(agentURI)); 
    // ... rest of your ADP generation logic


    // Extract values from form fields
    const formFields = document.querySelectorAll('.form-field');
    formFields.forEach(field => {
        const propertyURI = field.dataset.propertyUri;
        const inputValue = document.getElementById(propertyURI).value;
        if (inputValue) { 
            adpGraph.add(adpGraph.sym(agentURI), $rdf.sym(propertyURI), $rdf.lit(inputValue)); 
        }
    });

    // Serialize ADP in Turtle format
    const adpSerializer = new $rdf.Serializer(adpGraph);
    const adpOutput = adpSerializer.toN3(adpGraph); 
    outputCode.textContent = adpOutput; 

    // Hash Calculation (assuming you have included 'sha256.js')
    const hash = sha256.sha256(adpOutput);
    outputHash.textContent = hash;
});

// Initialization 
fetcher = new $rdf.Fetcher(); 
loadOntologies();

ontologySelect.addEventListener('change', () => {
    const selectedPath = ontologySelect.value;
    loadOntology(selectedPath); 
});
