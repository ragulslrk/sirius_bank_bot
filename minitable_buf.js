function  minitable(columns,values,speech,heading){
    var message = {
        "type": "template",
        "payload": {
           "template_type": "mini_table",
           "layout": "horizontal",
           "text":heading,
           "elements": [
              {
               "primary":columns,
               "additional":values
              }
             ],
           speech_hint:speech
          }
        };
        return JSON.stringify(message);
 }