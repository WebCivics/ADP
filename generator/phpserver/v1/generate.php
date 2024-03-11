<?php

// Retrieve form data
$name = $_POST['name'];
$domain = $_POST['domain'];
$jsonldData = $_POST['jsonldData'];
$jsonldChecksum = $_POST['jsonldChecksum'];
$jsonldFilename = $_POST['jsonldFilename'];
$checksumFilename = $_POST['checksumFilename'];
$ontologyFilename = $_POST['ontologyFilename'];

// Create a directory to store files
$directory = __DIR__ . "/.well-known/adp/$domain";

try {
    if (!is_dir($directory)) {
        if (!mkdir($directory, 0755, true)) {
            throw new Exception("Failed to create directory: $directory");
        }
    }

    // Save agent.jsonld file
    if (!file_put_contents("$directory/$jsonldFilename", $jsonldData)) {
        throw new Exception("Failed to save agent.jsonld file.");
    }

    // Save agent_checksum.txt file
    if (!file_put_contents("$directory/$checksumFilename", $jsonldChecksum)) {
        throw new Exception("Failed to save agent_checksum.txt file.");
    }

    // Save ontology.ttl file
    if (!file_put_contents("$directory/$ontologyFilename", getOntologyDocument())) {
        throw new Exception("Failed to save ontology.ttl file.");
    }

    // Run Certbot command
    $certbotCommand = [
        'certbot',
        'certonly',
        '--standalone',
        '-d',
        $domain,
        '--expand',
        '--cert-name',
        $domain,
        '-m',
        'your-email@example.com', // Replace with your actual email
        '--agree-tos',
        '--cert-request',
        '<(echo -e "[ req ]\ndistinguished_name=dn\n[ dn ]\n[ SAN ]\nsubjectAltName=DNS:' . $domain . '/.well-known/adp#,otherName:1.3.112.4.59;FORMAT:HEX,VALUE:' . $jsonldChecksum . '")',
    ];

    $output = [];
    $returnVar = 0;
    exec(implode(' ', array_map('escapeshellarg', $certbotCommand)), $output, $returnVar);

    if ($returnVar !== 0) {
        throw new Exception("Certbot command failed. Return code: $returnVar");
    }

    // Display success message
    echo "Files generated and Certbot command executed successfully.";
} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}

// Function to get the ontology document
function getOntologyDocument()
{
    $ontologyNamespace = "http://webcivics.github.io/ontologies/adp#";
    return "
        @prefix adp: <$ontologyNamespace> .
        @prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
    @prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
    @prefix xsd: <http://www.w3.org/2001/XMLSchema#> .
    @prefix schema: <http://schema.org/> .
    @prefix foaf: <http://xmlns.com/foaf/0.1/> .
    @prefix ogp: <http://ogp.me/ns#> .
    
    adp:Agent rdf:type adp:Class ;
        rdfs:label "Agent" .
    
    adp:OnlineAccount rdf:type adp:Class ;
        rdfs:label "OnlineAccount" .
        sameAs: [ schema:OnlineAccount ] .
    
    adp:CryptoAccount rdf:type adp:Class ;
        rdfs:label "CryptoAccount" ;
        rdfs:subClassOf adp:Agent .
    
    adp:hasName rdf:type rdf:Property ;
        rdfs:domain adp:Agent ;
        rdfs:label "hasName" ;
        rdfs:range xsd:string ;
        sameAs: [ foaf:name ] .
    
    adp:hasOnlineAccount rdf:type rdf:Property ;
        rdfs:domain adp:Agent ;
        rdfs:label "hasOnlineAccount" ;
        rdfs:range adp:OnlineAccount ;
        sameAs: [ schema:account ] .
    
    adp:hasLinkedinAccount rdf:type rdf:Property ;
        rdfs:domain adp:OnlineAccount ;
        rdfs:label "hasLinkedinAccount" ;
        rdfs:range xsd:string ;
        sameAs: [ schema:socialMedia, schema:sameAs, foaf:account ] .
    
    adp:hasTwitterAccount rdf:type rdf:Property ;
        rdfs:domain adp:OnlineAccount ;
        rdfs:label "hasTwitterAccount" ;
        rdfs:range xsd:string ;
        sameAs: [ schema:socialMedia, schema:sameAs, foaf:account ] .
    
    adp:hasGithubAccount rdf:type rdf:Property ;
        rdfs:domain adp:OnlineAccount ;
        rdfs:label "hasGithubAccount" ;
        rdfs:range xsd:string ;
        sameAs: [ schema:socialMedia, schema:sameAs, foaf:account ] .
    
    adp:hasCryptoAccount rdf:type rdf:Property ;
        rdfs:domain adp:Agent ;
        rdfs:label "hasCryptoAccount" ;
        rdfs:range adp:CryptoAccount .
    
    adp:hasEcashAccount rdf:type rdf:Property ;
        rdfs:domain adp:CryptoAccount ;
        rdfs:label "hasEcashAccount" ;
        rdfs:range xsd:string ;
        sameAs: [ schema:accountId ] .
    `;
}

?>
