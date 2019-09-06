var logger = Java.type("org.slf4j.LoggerFactory").getLogger("net.shibboleth.idp.attribute");

var recipientId = resolutionContext.getAttributeRecipientID();
logger.info("Attribute Recipient ID {} ", recipientId);

var transientIds = transientId.getValues().iterator();

if (transientIds.hasNext()) { //Assume only one
   var claimSource = persistentIds.next();
   var matches = claimSource.match(/^([^\|]+)\|([^\|]+)\|(.*)$/);
   var expiry = matches[1];
   var rpEntity = matches[2];
   var token = matches[3];
   
   if (new Date().getTime() > parseInt(expiry)
      && rpEntity === recipienmtId) {
         
   accessToken.addValue(token);
}
