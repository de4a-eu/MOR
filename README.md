# MOR

## Overview

- The user identity data is stored in the web portal session.
- MOR components are HTML pages without access to web portal session data.
- MOR components can interact with the web portal pages by means of HTTP GET requests and client-side javascript.
- MOR components can access Connector’s APIs by means of Javascript HTTP requests (Ajax)

## Tasks

- [**Translation** of the canonical models](/../../issues/1),
- [Implementation of **explicit request (ER) page**](/../../issues/2),
- [Implementation of **preview**](/../../issues/3),
- [Interchangeable CSS for individual portal](/../../issues/4).

## Materials

- [initial PoC](material/PoC/initial) provided by Ana Rosa,
- [translation](material/translation) of the descriptions of the the canonical evidence type and associated common types.

## Open issues

### 1. Which steps of IP and USIP (according to the BPMN diagram) are directly related to the MOR component?

[Intermediation Pattern (IP)](https://wiki.de4a.eu/index.php/Intermediation_Pattern) 
![IP](https://wiki.de4a.eu/images/2/29/Intermediation_process.jpg)

[User-supported Intermediation Pattern](https://wiki.de4a.eu/index.php/User-supported_Intermediation_Pattern)
![USIP](https://wiki.de4a.eu/images/8/88/User-supported_Intermediation_process.jpg)

### 2. Review interactions of [ER](/../../issues/2) and [Preview](/../../issues/3).

* It is not clear how is information about the user transfered to the component. There is no input parameter defined at the component level for user information.
* The details of the communication with the parent Web site that includes the component should be defined (currently only the `outputJSArrayId` is defined).

### 3. Specification of interfaces for data retrieval.

* Where can we get the specification of interfaces for data retrieval to be able to provide mock data?