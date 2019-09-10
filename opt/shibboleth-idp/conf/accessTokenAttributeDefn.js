var logger = Java.type("org.slf4j.LoggerFactory").getLogger("net.shibboleth.idp.attribute");

var recipientId = resolutionContext.getAttributeRecipientID();
logger.info("Attribute Recipient ID {} ", recipientId);

var transientIds = transientId.getValues().iterator();

while (transientIds.hasNext()) {
   var transientIdValue = transientIds.next();
   logger.info("Found transient Id Value source {}", transientIdValue);
   var matches =  transientIdValue.match(/^([^\|]+)\|([^\|]+)\|(.*)$/);
   logger.info("Regex matches {}", matches);
   if (matches === null) continue; // Skip garbage
   var expiry = matches[1];
   var rpEntity = matches[2];
   var token = matches[3];

   logger.info("Found access token for {} with expiry {}", rpEntity, new Date(parseInt(expiry)));
   if (new Date().getTime() / 1000 > parseInt(expiry)
      && rpEntity === recipientId) {

      logger.info("Populating a value for the access token {}", token);
      accessToken.addValue(token);
      break;
   }
}
