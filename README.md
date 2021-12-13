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

## Demo

- https://de4a-wp3.github.io/MOR/

## Materials

- [initial PoC](material/PoC/initial) provided by Ana Rosa,
- [translation](material/translation) of the descriptions of the the canonical evidence type and associated common types.

## Open issues

### 1. Which steps of IP and USIP (according to the BPMN diagram) are directly related to the MOR component?
> [Request OOP transfer of evidence] and [Prepare preview], steps present in both patterns

[Intermediation Pattern (IP)](https://wiki.de4a.eu/index.php/Intermediation_Pattern) 
![IP](https://wiki.de4a.eu/images/2/29/Intermediation_process.jpg)

[User-supported Intermediation Pattern](https://wiki.de4a.eu/index.php/User-supported_Intermediation_Pattern)
![USIP](https://wiki.de4a.eu/images/8/88/User-supported_Intermediation_process.jpg)

### 2. Review interactions of [ER](/../../issues/2) and [Preview](/../../issues/3).

* It is not clear how is information about the user transfered to the component. There is no input parameter defined at the component level for user information.
> Neither the explicit request nor the preview MOR GUI components require the identification of the user. They are part of the eProcedure GUI interface.
> * For the explicit request, the only relevant information for the MOR GUI is the required canonical evidence types,  the country of the DE and the default language 
> * For the preview, the only relevat information for the MOR GUI is the IEM response, with the metadata and the issued evidence (payload) and the default language

* The details of the communication with the parent Web site that includes the component should be defined (currently only the `outputJSArrayId` is defined).
> The communication with the parent web site needs to be bi-directorial. Javascript resources for the communication to be defined according to the next requirements:
>
> For the explicit request
> > Input: 
> > - list of required canonical evidence types
> > - DE country (to exclude the use of the OOTS for that country)
> > - default language 
> > 
> > Output
> > - list of pairs [canonical type, country] resulted from the explicit request
> 
> For the preview
> > Input:
> > - list of pairs [name of the domestic type, id of the canonical type, issued canonical evidence]
> > - Identification of the Issuer (name, location)
> > - default language
> > 
> > Output:
> > - list of ids of the confirmed canonical types 

### 3. Specification of interfaces for data retrieval.

* Where can we get the specification of interfaces for data retrieval to be able to provide mock data?
> The PoC shows examples for the two interfaces, for both data and user interation. 
> Existing implementation in Slovenia (next point) can be also used as reference to desing the interfaces 

### 4. Existing implementation in Slovenia

* There is already an existing application in Slovenia as part of DE4A that supports a preview of canonical evidence. How should this be considered in the proposal?
> The existing pages for "Selection of evidence" and "Preview" could be the starting point for the explicit request and preview GUIs respectivelly.
> 
> The PoC also considers the case when the user either does not request the use of the OOTS or cancels the exchange in the preview. In this case, an upload document option should be displayed. 
> 
> The recommendation is to use the GUIs of the PoC and the existing implementation as the inspiration for desing the GUI of the integrable MOR component. 
* There is some demo material available: 
  * presentational videos available:
    * [Slovenia as a Data Provider](./material/SI-preview-app/final_es-de_si-do_compressed.mp4),
    * [Spain as a Data Provider](./material/SI-preview-app/SI-DE_ES-DO-2021-11-05.mp4),
  * screenshots of preview app ([select an evidence to preview](./material/SI-preview-app/si-previewapp-1.png), [preview of evidence](./material/SI-preview-app/si-previewapp-2.png)).
