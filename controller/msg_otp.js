var unirest = require("unirest");

const msg_otp=(otp,phone)=>{
var req = unirest("GET", "https://www.fast2sms.com/dev/bulkV2");

req.query({
  "authorization": "CHSz21vplxkZEJE90hPfSFCeML65SJgDL5y5G9ZAeuL7N16HsOlM7ZDW8KvN",
  "sender_id": "TXTIND",
  "message": `Your Otp is ${otp}.` ,
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