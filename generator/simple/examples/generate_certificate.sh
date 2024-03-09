#!/bin/bash   

# Variables - Update these!
DOMAIN="sailingdigital.com"  # The domain for the certificate
PERSON_URI="null"  
PERSON_OID="null"  # Replace with the actual OID for person identification
CHECKSUM_ALGORITHM="sha256"  # Could be sha1, sha256, etc.

# Calculate the checksum of the JSON-LD file
JSONLD_CHECKSUM=$(openssl dgst -$CHECKSUM_ALGORITHM -binary <(echo -n $jsonData) | openssl enc -base64)

# Obtain the certificate with certbot
certbot certonly --standalone -d $DOMAIN --expand --cert-name $DOMAIN  
-m "null" --agree-tos --cert-request <(echo -e "[ req ]
distinguished_name=dn
[ dn ]
[ SAN ]
subjectAltName=DNS:sailingdigital.com/.well-known/adp#,otherName:1.3.112.4.59;FORMAT:HEX,VALUE:466b30f2e0f46dc12cab4f3c87a46fc71e7420b7c2cf1309775b57225f9adfdf") # Adjust email as needed

# Incorporating the URI, OID, and Checksum (Method Dependent)

# **1. Certificate Extension:** (Requires Certbot with DNS Challenge or Custom Work)
#     - Certbot supports limited extensions; you might need a DNS challenge or 
#       create a custom plugin for complex extensions with the URI and OID.

# **2. Separate Storage:** 
#      - Store the URI, OID, and CHECKSUM in a metadata file or database associated with
#        the certificate's common name ($DOMAIN)

# Example: Create metadata file
METADATA_FILE="/etc/letsencrypt/live/$DOMAIN/metadata.txt"
echo "Person URI: $PERSON_URI" >> $METADATA_FILE
echo "Person OID: $PERSON_OID" >> $METADATA_FILE
echo "JSON-LD Checksum ($CHECKSUM_ALGORITHM): $JSONLD_CHECKSUM" >> $METADATA_FILE
echo "OID $PERSON_OID; $CHECKSUM_ALGORITHM Checksum: $JSONLD_CHECKSUM" > checksum.txt