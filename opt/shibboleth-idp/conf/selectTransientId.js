var logger = Java.type("org.slf4j.LoggerFactory").getLogger("net.shibboleth.idp.attribute");

var recipientId = resolutionContext.getAttributeRecipientID();
logger.info("Attribute Recipient ID {} ", recipientId);

var transientIds = transientId.getValues().iterator();

while (transientIds.hasNext()) {
   var transientIdValue = transientIds.next();
   var matches = transientIdValue.match(/^([^\|]+)\|([^\|]+)\|([^\|]+)\|(.*)$/);
   if (matches === null) continue; // Skip garbage
   var rpEntity = matches[1];
   var expiry = matches[2];
   var claimsURL = matches[3];
   var accessToken = matches[4];

   logger.info("Found access token for {} with expiry {}", rpEntity, new Date(parseInt(expiry)));
   if (rpEntity === recipientId && new Date().getTime() / 1000 > parseInt(expiry)) {
      logger.info("Populating a value for the userInfo reference {}", claimsURL);
      userInfo.addValue(claimsURL + "|" + accessToken);
      break;
   }
}
