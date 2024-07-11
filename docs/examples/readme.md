# Technical Examples


## Introduction

This document seeks to provide some examples of how ADP is intended to be used.  It will seek to clean-up some of the previous examples.

ADP has two major components. 

1. The technical method to make the file securely available and consumable by the maximum amount of internet connected devices.
2. Ontological Design

This document will mainly act to illustrate notions of how the ontological design frameworks can be defined.  This is not a perscriptive document and the formal definitions of these ontological requirements is sought to be established through community works to better define the framework taking into account the many various related considerations.

This document therefore illustrates a range of notions associated to the intended purposes of ADP, without seeking to be perscriptive at this stage.  The ontology frameworks have two aspects, the first is top-level ontology which is required to ensure the file is consumable. The second level, is descriptive and is able to be customised.

The ontological design frameworks can employ resources from multiple domain and/or sub-domain locations.  

### Top Level Ontology

In-order for ADP to work, there is a series of 'top level ontology' requirements that needs to be supported.  

#### Cryptography

Ontology to provide support for various kinds of cryptographic supports is needed to support validation of the ADP file.

#### Profiles

There are various 'profiles' that should exist in relation to the use of ADP.  It is important to note that the file is public, as such, private, sensitive or permissive data should not be provided in the ADP file itself.

Some Profile Examples;
- Personal Profile: Personal Profile is intended for domains and sub-domains owned and operated by a natural person.
- Legal Entity Profile: Legal Entity Profile is intended for domains and sub-domains that represent a legal personality.
- Project & Product Profile: Project and Product profile is for domains that relate to an activity or product, that is otherwise managed by a seperate legal entity.
- Service Profile: Service profile is for descripting a domain or sub-domain that has an API.


## Examples

### Personal Profile
NOTE: ADP is not intended to provide private, sensitive or permissive information.  ADP Can link to a seperate service that can then act to do so. 

- Basic Personal Information 
- Online Identifiers (ie: Social Media)
- Crypto Accounts (ie: bitcoin address)
- Online Data Storage Service (ie: solid server account)
- Public Keys

### Essential Services
An essential service is a form of Humanitarian ICT domain or sub-domain and related services, that should be prioritised for availability at all times when the technical capacity to do so is available.  

Examples of situations where this may be important.

- Natural Disaster Recovery: Where only temporary Internet Services are able to be enabled, and the use of that service requires prioritisation of particular categories of Online Services.

- Internet Shut-Down Events: Where the internet may be 'turned off' for some reason, there are some services that should remain on regardless.

- War, Conflict, Sanctions, etc:  Where wide-spread availability of internet services is impaired for some reason, a defined class of services that are required to continue to be available regardless.

#### Categories of Essential Services

TBD

### Content Moderation
The content moderation function is intended to be employed by the end-user of online content and/or the last-mile internet connection user / subscriber (ie: within a K12 school network).  There is a known risk that these functions could be employed by other network participants, which would negatively impact. VPN technologies are able to route around local restrictions, whilst the intended purpose is to define restrictions by users (or their parents / guardians) on end-user devices.






