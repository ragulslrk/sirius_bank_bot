var unirest = require("unirest");

const msg_otp=(phone,otp)=>{
var req = unirest("GET", "https://www.fast2sms.com/dev/bulkV2");

req.query({
  "authorization": "64rPcoiYAknJFaxmlqebB9UgTSu0Z2QhO5VRMdX713KsLHDwvNlX58hHu7UybkpejnIx2L14mSVGf9Ft",
  "sender_id": "TXTIND",
  "message": `Your OTP is ${otp}`,
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
});

}
module.exports=msg_otp