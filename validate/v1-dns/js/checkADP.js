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
    }
}

async function fetchADPFromFile(domain) {
    const corsProxyUrl = 'https://corsproxy.io/';  // Use the CORS proxy if needed
    const adpUrl = `${corsProxyUrl}https://${domain}/.well-known/adp.jsonld`;

    const response = await fetch(adpUrl);

    if (response.ok) {
        const adpData = await response.json();
        return adpData;
    } else {
        throw new Error(`Failed to fetch ADP file: ${response.status}`);
    }
}


async function fetchADPFromDNS(domain) {
    const dnsUrl = `https://dns.google/resolve?name=_adp.${domain}&type=TXT`;

    const response = await fetch(dnsUrl);
    const data = await response.json();

    if (data.Answer && data.Answer[0] && data.Answer[0].data) {
        const txtRecord = data.Answer[0].data;
        return JSON.parse(txtRecord);
    } else {
        throw new Error('ADP entry not found in DNS');
    }
}

function processAndPresentGraph(adpData, container) {
    // Use jsonld.js to process and present the graph
    jsonld.toRDF(adpData, { format: 'application/nquads' }, (err, nquads) => {
        if (err) {
            console.error('Error processing JSON-LD to RDF:', err);
            return;
        }

        // Optionally, you can visualize the RDF data or handle it as needed
        console.log('Processed RDF data:', nquads);

        // Present the graph in the specified container (you can customize this part)
        container.innerHTML = '<p>Graph presentation goes here.</p>';
    });
}
