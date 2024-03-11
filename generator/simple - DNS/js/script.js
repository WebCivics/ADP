
function generateJSONLD() {
    const dataForm = document.getElementById('dataForm');
    const formData = new FormData(dataForm);
    const ontologyNamespace = "http://webcivics.github.io/ontologies/adp#";

    // Get the user's provided domain
    const userDomain = formData.get('domain');
   
    // Generate Agent JSON-LD
    const agent = {
        "@context": {
            "adp": "http://webcivics.github.io/ontologies/adp#",
            "schema": "http://schema.org/",
            "foaf": "http://xmlns.com/foaf/0.1/",
            "ogp": "http://ogp.me/ns#",

        },
        "@type": "adp:Agent",
        "foaf:name": formData.get('name'),
        "adp:hasOnlineAccount": [
            {"@type": "adp:OnlineAccount", "adp:hasLinkedinAccount": formData.get('linkedinAccount')},
            {"@type": "adp:OnlineAccount", "adp:hasTwitterAccount": formData.get('twitterAccount')},
            {"@type": "adp:OnlineAccount", "adp:hasGithubAccount": formData.get('githubAccount')},
            {"@type": "adp:OnlineAccount", "adp:hasSolidWebID": formData.get('SolidwebID')},
            {"@type": "adp:OnlineAccount", "adp:hasSolidPodStorage": formData.get('SoldPodStorage')}
            {"@type": "adp:OnlineAccount", "adp:hasFacebookAccount": formData.get('facebookAccount')},
            {"@type": "adp:OnlineAccount", "adp:hasInstagramAccount": formData.get('instagramAccount')},
            {"@type": "adp:OnlineAccount", "adp:hasYoutubeAccount": formData.get('youtubeAccount')},
            {"@type": "adp:OnlineAccount", "adp:hasTiktokAccount": formData.get('tiktokAccount')},
            {"@type": "adp:OnlineAccount", "adp:hasSnapchatAccount": formData.get('snapchatAccount')},
            {"@type": "adp:OnlineAccount", "adp:hasPinterestAccount": formData.get('pinterestAccount')},
            {"@type": "adp:OnlineAccount", "adp:hasRedditAccount": formData.get('redditAccount')},
            {"@type": "adp:OnlineAccount", "adp:hasTumblrAccount": formData.get('tumblrAccount')},
            {"@type": "adp:OnlineAccount", "adp:hasFlickrAccount": formData.get('flickrAccount')},
            {"@type": "adp:OnlineAccount", "adp:hasVimeoAccount": formData.get('vimeoAccount')},
            {"@type": "adp:OnlineAccount", "adp:hasSoundcloudAccount": formData.get('soundcloudAccount')},
            {"@type": "adp:OnlineAccount", "adp:hasSpotifyAccount": formData.get('spotifyAccount')},
            {"@type": "adp:OnlineAccount", "adp:hasTwitchAccount": formData.get('twitchAccount')},
            {"@type": "adp:OnlineAccount", "adp:hasClubhouseAccount": formData.get('clubhouseAccount')},
            {"@type": "adp:OnlineAccount", "adp:hasTelegramAccount": formData.get('telegramAccount')},
            {"@type": "adp:OnlineAccount", "adp:hasWhatsappAccount": formData.get('whatsappAccount')},
            {"@type": "adp:OnlineAccount", "adp:hasSignalAccount": formData.get('signalAccount')},
            {"@type": "adp:OnlineAccount", "adp:hasSkypeAccount": formData.get('skypeAccount')},
            {"@type": "adp:OnlineAccount", "adp:hasZoomAccount": formData.get('zoomAccount')},
            {"@type": "adp:OnlineAccount", "adp:hasSlackAccount": formData.get('slackAccount')},
            {"@type": "adp:OnlineAccount", "adp:hasDiscordAccount": formData.get('discordAccount')},
            {"@type": "adp:OnlineAccount", "adp:hasMastodonAccount": formData.get('mastodonAccount')},
            {"@type": "adp:OnlineAccount", "adp:hasDiasporaAccount": formData.get('diasporaAccount')},
            {"@type": "adp:OnlineAccount", "adp:hasMatrixAccount": formData.get('matrixAccount')},
            {"@type": "adp:OnlineAccount", "adp:hasNextcloudAccount": formData.get('nextcloudAccount')},
            {"@type": "adp:OnlineAccount", "adp:hasOwncloudAccount": formData.get('owncloudAccount')},
            {"@type": "adp:OnlineAccount", "adp:hasGiteaAccount": formData.get('giteaAccount')},
            {"@type": "adp:OnlineAccount", "adp:hasGitlabAccount": formData.get('gitlabAccount')},
            {"@type": "adp:OnlineAccount", "adp:hasBitbucketAccount": formData.get('bitbucketAccount')},
            {"@type": "adp:OnlineAccount", "adp:hasSourceforgeAccount": formData.get('sourceforgeAccount')},
            {"@type": "adp:OnlineAccount", "adp:hasFosstodonAccount": formData.get('fosstodonAccount')},
            {"@type": "adp:OnlineAccount", "adp:hasW3CAccount": formData.get('w3cAccount')},
            {"@type": "adp:OnlineAccount", "adp:hasIETFAccount": formData.get('ietfAccount')},
            {"@type": "adp:OnlineAccount", "adp:hasWikipediaAccount": formData.get('wikipediaAccount')},
            {"@type": "adp:OnlineAccount", "adp:hasWikimediaAccount": formData.get('wikimediaAccount')},
            {"@type": "adp:OnlineAccount", "adp:hasWikidataAccount": formData.get('wikidataAccount')},
            {"@type": "adp:OnlineAccount", "adp:hasOpenstreetmapAccount": formData.get('openstreetmapAccount')},
            {"@type": "adp:OnlineAccount", "adp:hasOSMAccount": formData.get('osmAccount')},
            {"@type": "adp:OnlineAccount", "adp:hasSlideshareaccount": formData.get('slideshareAccount')},
            {"@type": "adp:OnlineAccount", "adp:hasSpeakerdeckAccount": formData.get('speakerdeckAccount')},
            {"@type": "adp:OnlineAccount", "adp:hasPreziAccount": formData.get('preziAccount')},
            {"@type": "adp:OnlineAccount", "adp:hasCanvaAccount": formData.get('canvaAccount')},
            {"@type": "adp:OnlineAccount", "adp:hasBehanceAccount": formData.get('behanceAccount')},
            {"@type": "adp:OnlineAccount", "adp:hasDribbbleAccount": formData.get('dribbbleAccount')},
            {"@type": "adp:OnlineAccount", "adp:hasDeviantartAccount": formData.get('deviantartAccount')},
            {"@type": "adp:OnlineAccount", "adp:hasArtstationAccount": formData.get('artstationAccount')},
            {"@type": "adp:OnlineAccount", "adp:hasEtsyAccount": formData.get('etsyAccount')},
            {"@type": "adp:OnlineAccount", "adp:hasEbayAccount": formData.get('ebayAccount')},
            {"@type": "adp:OnlineAccount", "adp:hasAmazonAccount": formData.get('amazonAccount')},
            {"@type": "adp:OnlineAccount", "adp:hasPaypalAccount": formData.get('paypalAccount')},
            
        ],
        "adp:hasCryptoAccount": [{"@type": "adp:CryptoAccount", "adp:hasEcashAccount": formData.get('cryptoAccounts')}],
        "adp:hasDomain": userDomain, "schema:domain": formData.get('domain')},
        
    }
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

// Creating a download link for Ontology Document
const ontologyLink = document.createElement('a');
ontologyLink.href = ontologyFile;
ontologyLink.download = 'ontology.ttl';

// Simulating click to trigger download
document.body.appendChild(jsonldLink);
jsonldLink.click();
document.body.removeChild(jsonldLink);

document.body.appendChild(jsonldChecksumLink);
jsonldChecksumLink.click();
document.body.removeChild(jsonldChecksumLink);

document.body.appendChild(ontologyLink);
ontologyLink.click();
document.body.removeChild(ontologyLink);

// Update form with the JSON-LD checksum
JSONLD_CHECKSUM = jsonldChecksum;


    function generateChecksum(data) {
        return sha256(data);
    }

        // Ask the user if they want to see the howto.html document
        const showHowto = window.confirm("You should now receive the files generated for you. Would you like tosee the howto.html document, describing how to install on linux?");
    
        if (showHowto) {
            window.location.href = 'howto.html'; // Redirect to howto.html
        }
    

