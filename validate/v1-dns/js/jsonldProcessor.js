// jsonldProcessor.js

import jsonld from 'https://cdn.skypack.dev/jsonld';

export async function processAndPresentGraph(jsonldData) {
    // Expand JSON-LD data
    const expanded = await jsonld.expand(jsonldData);
    
    // Flatten the expanded data
    const flattened = await jsonld.flatten(expanded);

    // Convert the flattened data to a more readable format
    const formattedData = JSON.stringify(flattened, null, 2);

    // Display the formatted data in a pre tag
    const outputContainer = document.getElementById('output-container');
    outputContainer.textContent = formattedData;
}
