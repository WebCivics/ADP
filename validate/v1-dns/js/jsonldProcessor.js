// jsonldProcessor.js

import jsonld from 'https://cdn.skypack.dev/jsonld';

export async function processAndPresentGraph(jsonldData) {
  try {
    // Check if jsonld is available
    if (!jsonld) {
      throw new Error('jsonld library not found. Please ensure it is imported correctly.');
    }

    // Existing JSON-LD processing logic
    const expanded = await jsonld.expand(jsonldData);
    const flattened = await jsonld.flatten(expanded);
    const formattedData = JSON.stringify(flattened, null, 2);  
    const outputContainer = document.getElementById('output-container');
    outputContainer.textContent = formattedData;

  } catch (error) {
    console.error('Error processing JSON-LD:', error);

    // Display an error message to the user
    const outputContainer = document.getElementById('output-container');
    outputContainer.textContent = 'Error: JSON-LD library not available. Please check your imports.';
  }
}

