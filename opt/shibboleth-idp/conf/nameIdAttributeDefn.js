NameIDBuilder = Java.type("org.opensaml.saml.saml2.core.impl.NameIDBuilder");
XMLObjectAttributeValue = Java.type("net.shibboleth.idp.attribute.XMLObjectAttributeValue");
AuthnRequest = Java.type("org.opensaml.saml.saml2.core.AuthnRequest");

logger = Java.type("org.slf4j.LoggerFactory").getLogger("net.shibboleth.idp.attribute");

inboundMessage = profileContext.getInboundMessageContext().getMessage();
if (inboundMessage instanceof AuthnRequest
    && inboundMessage.getNameIDPolicy() != null
    && inboundMessage.getNameIDPolicy().getSPNameQualifier() != null) {
   recipientId = inboundMessage.getNameIDPolicy().getSPNameQualifier();
   } else {
   recipientId = resolutionContext.getAttributeRecipientID();
}

persistentIds = persistentId.getValues().iterator();

while (persistentIds.hasNext()) {
   pai = persistentIds.next();
   if (pai.startsWith(recipientId + "|")) {
   logger.info("Found a persistentId attribute value for {}", recipientId);
   matches = pai.match(/^([^\|]+)\|([^\|]+)\|(.*)$/);

   logger.info("Creating a NameID for {}", matches[1]);
   nameIdBuilder = new NameIDBuilder();
   nameIdObject = nameIdBuilder.buildObject();
   nameIdObject.setFormat("urn:oasis:names:tc:SAML:2.0:nameid-format:persistent");
   nameIdObject.setNameQualifier(matches[2]);
   nameIdObject.setSPNameQualifier(matches[1]);
   nameIdObject.setValue(matches[3]);

   nameIdAttributeValue = new XMLObjectAttributeValue(nameIdObject);

   nameId.addValue(nameIdAttributeValue);
   break;
   }
}
