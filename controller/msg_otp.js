var unirest = require("unirest");

const msg_otp=(otp,phone)=>{
var req = unirest("GET", "https://www.fast2sms.com/dev/bulkV2");

req.query({
  "authorization": "64rPcoiYAknJFaxmlqebB9UgTSu0Z2QhO5VRMdX713KsLHDwvNlX58hHu7UybkpejnIx2L14mSVGf9Ft",
  "sender_id": "TXTIND",
  "message": `${otp} is Your SiriusBank Bot OTP.` ,
  "route": "v3",
  "numbers":phone
});

req.headers({
  "cache-control": "no-cache"
});


req.end(function (res) {
  if (res.error) {
console.log(res.error);
  } 

  console.log(res.body);
  return 
});

}
module.exports=msg_otp