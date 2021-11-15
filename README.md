# MOR
The user identity data is stored in the web portal session

MOR components are HTML pages without access to web portal session data

MOR components can interact with the web portal pages by means of HTTP GET requests and client-side javascript

MOR components can access Connector’s APIs by means of Javascript HTTP requests (Ajax)



MOR ER = {
to be invoked when the user select the evidence types to be issued abroad
input parameters: {defaulLang, requesterCountryCode, [canonicalEvidenceType], outputJSArraytId}
output parameters: [ outputJSArraytId=ialProvisionData ]
Interactions:
- the connector provides the mor contents in the selected language
- the user  can see the information provided in the selected language for one of the canonical types
- the user selects the provider country for each canonical type
- the connector provides the ial provisions per canonical type and selected provider country
- the user selects the ial provision per canonical type 
- the user selects to upload the evidence per canonical type
- the user confirms the selection to proceed
- the morER returns the selected ial provision by writing the corresponding JSON structure in the javascript array of the parent window whose id was specified as input parameter
} 

MOR Preview = {

to be invoked when the required evidences have been received
input parameters = {defaultLang, postActionValue, [ { evidenceXMLobjectId, canonicalEvidenceType } ] }
Interations:
- the connector provides the mor contents in the selected language
- the user  sees each evidence in the selected language 
- the user can confirm the evidence sending
- the user can cancel the evidence sending and then a document must be uploaded instead
- the user submits the evidence choices
