// Function to process and present the JSON-LD graph in a table
async function processAndPresentGraph() {
    const adpUrl = 'http://127.0.0.1:5501/validate/v2/adp.jsonld';

    try {
        // Fetch the JSON-LD file
        const adpData = await jsonld.frame(adpUrl, {});

        // Extract relevant information
        const { foaf, adp } = adpData['@graph'][0];

        // Create a table with the extracted information
        const tableBody = document.querySelector('#adpTable tbody');
        for (const key in foaf) {
            const value = foaf[key];
            const row = `<tr><td>${key}</td><td>${value}</td></tr>`;
            tableBody.innerHTML += row;
        }

        // Process and append online accounts with proper links
        const onlineAccounts = adp.hasOnlineAccount || [];
        onlineAccounts.forEach(account => {
            if (account['@type'] === 'adp:OnlineAccount') {
                for (const accountType in account) {
                    if (account[accountType] && accountType !== '@type') {
                        const link = createLink(accountType, account[accountType]);
                        const row = `<tr><td>${accountType}</td><td>${link}</td></tr>`;
                        tableBody.innerHTML += row;
                    }
                }
            }
        });

        // Process and append crypto accounts
        const cryptoAccounts = adp.hasCryptoAccount || [];
        cryptoAccounts.forEach(cryptoAccount => {
            if (cryptoAccount['@type'] === 'adp:CryptoAccount') {
                for (const cryptoType in cryptoAccount) {
                    if (cryptoAccount[cryptoType] && cryptoType !== '@type') {
                        const row = `<tr><td>${cryptoType}</td><td>${cryptoAccount[cryptoType]}</td></tr>`;
                        tableBody.innerHTML += row;
                    }
                }
            }
        });
    } catch (error) {
        console.error(`Error processing JSON-LD: ${error}`);
    }
}

// Helper function to create links for online accounts
function createLink(accountType, value) {
    let link = value;
    if (accountType === 'adp:hasLinkedinAccount') {
        link = `linkedin.com/in/${value}`;
    } else if (accountType === 'adp:hasTwitterAccount') {
        link = `twitter.com/${value}`;
    }
    return `<a href="https://${link}" target="_blank">${link}</a>`;
}

// Call the processing function when the document is ready
document.addEventListener('DOMContentLoaded', processAndPresentGraph);
