async function checkADP() {
    const domainInput = document.getElementById('domainInput').value;
    const resultElement = document.getElementById('result');

    try {
        // Fetch ADP file from the specified URL using corsproxy.io
        const adpData = await fetchADPFromFile(domainInput);

        // Fetch _adp entry from DNS using corsproxy.io
        const dnsResponse = await fetchADPFromDNS(domainInput);
        const dnsChecksum = dnsResponse.checksum;

        // Compare checksum values
        if (adpData && adpData.adp && adpData.adp.checksum === dnsChecksum) {
            resultElement.textContent = 'ADP Check Passed!';
            
            // Process and present the JSON-LD graph
            const graphContainer = document.getElementById('graphContainer');
            processAndPresentGraph(adpData, graphContainer);
        } else {
            resultElement.textContent = 'ADP Check Failed!';
        }
    } catch (error) {
        resultElement.textContent = `Error: ${error.message}`;
        console.error("Error in checkADP:", error);  // Log to console for more detail
        resultElement.textContent = `Error: ${error.message}. Check the browser console for details.`; 
  
    }
}

async function fetchADPFromFile(domain) {
    const adpUrl = `https://${domain}/adp.jsonld`;

    const response = await fetch(adpUrl);

    if (response.ok) {
        const adpData = await response.json();
        return adpData;
    } else {
        throw new Error(`Failed to fetch ADP file: ${response.status} ${response.statusText}`);
    }
}

async function fetchADPFromDNS(domain) {
    const dnsUrl = `https://dns.google/resolve?name=_adp.${domain}&type=TXT`;
    const response = await fetch(dnsUrl);
  
    if (!response.ok) {
       throw new Error(`Failed to fetch DNS record: ${response.status} ${response.statusText}`);
    }
  
    const data = await response.json();
  
    if (data.Answer && data.Answer[0] && data.Answer[0].data) {
      const sha256Hash = data.Answer[0].data.replace(/"/g, '');  // Remove quotes
      return sha256Hash; 
    } else {
      throw new Error('ADP entry not found in DNS');
    }
  }

function processAndPresentGraph(adpData, container) {
    // Use jsonld.js to process and present the graph
    jsonld.toRDF(adpData, { format: 'application/nquads' }, (err, nquads) => {
        if (err) {
            console.error('Error processing JSON-LD to RDF:', err);
            container.innerHTML = '<p>Error processing graph data. See browser console.</p>'; 
            return; 
        }

        // Optionally, you can visualize the RDF data or handle it as needed
        console.log('Processed RDF data:', nquads);

        // Present the graph in the specified container (you can customize this part)
        container.innerHTML = '<p>Graph presentation goes here.</p>';
    });
}
