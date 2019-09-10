var logger = Java.type("org.slf4j.LoggerFactory").getLogger("net.shibboleth.idp.attribute");

var recipientId = resolutionContext.getAttributeRecipientID();
logger.info("Attribute Recipient ID {} ", recipientId);

var transientIds = transientId.getValues().iterator();
var profileValues = profile.getValues().iterator();

while (transientIds.hasNext()) {
   var transientIdValue = transientIds.next();
   var matches = transientIdValue.match(/^([^\|]+)\|([^\|]+)\|(.*)$/);
   if (matches === null) continue; // Skip garbage
   var expiry = matches[1];
   var rpEntity = matches[2];

   logger.info("Found access token for {} with expiry {}", rpEntity, new Date(parseInt(expiry)));
   if (new Date().getTime() / 1000 > parseInt(expiry) && rpEntity === recipientId && profileValues.hasNext()) {
      var profileValue = profileValues.next();
      logger.info("Populating a value for the claim source {}", profileValue);
      claimSource.addValue(profileValue);
      break;
   }
}
