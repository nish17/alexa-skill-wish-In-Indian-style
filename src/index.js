const Alexa = require('alexa-sdk');
var APP_ID = 'amzn1.ask.skill.3988ddbf-5998-49d1-ac56-fc084b488040';
exports.handler = function(event, context, callback){
  var alexa = Alexa.handler(event, context, callback);
  alexa.appId = APP_ID;
  alexa.registerHandlers(handlers);
  alexa.execute();
};

function wishTime(){
  var dateIST = new Date();
  var time = {}
  time.hour = dateIST.getUTCHours + 5;
  time.minutes = dateIST.getUTCMinutes + 30;
  //date shifting for IST timezone +5 hours and 30 minutes
  
  if (time.hour < 12) return 'Good morning';
  else if(time.hour < 18) return 'Good noon';
  else return 'Good evening';
}

function getLanguage_wish(lang){
  if(lang == "Gujarati") return ` Namaste! kem cho? `;
  else if(lang == "Hindi") return ` Namaste! kaise ho aap? `;
  else if(lang == "Punjabi") return ` Sat sri akaal. Tussi kiwen ho? `
  else if(lang == "Tamil") return ` Halō eppaṭi irukkiṟāy? `;
  else if(lang == "Nepali") return ` Namastē timī kasarī hō? `;
  else if (lang == "Malayalam") return ` halēā, niṅṅaḷkk sukhamāṇēā? `;
  else if(lang == "Bengali") return ` Hyālō, āpani kēmana āchēna? `;
}

function getLanguage_welcome(lang){
  if(lang == "Gujarati") return ` Namaste! Tamaro ghar ma swagat che! `;
  else if(lang == "Hindi") return ` Namaste! Aapka swagat hai! `;
  else if(lang == "Punjabi") return ` Sat sri akaal. Su'āgata hai! `;
  else if(lang == "Tamil") return ` Eṅkaḷ illattiṟku varavēṟkiṟōm `;
  else if(lang == "Nepali") return ` Hāmrō gharamā svāgata cha `;
  else if (lang == "Malayalam") return ` ñaṅṅaḷuṭe vīṭṭilēkk svāgataṁ `;
  else if(lang == "Bengali") return ` Āmādēra bāṛitē sbāgata jānā'i `; 
}

getLanguage_wish();
getLanguage_welcome();
wishTime();
var handlers={
  'LaunchRequest': function(){
    var speechOutput = 'Welcome to Indian Wish. Using this skill you can wish or welcome your guests in different Languages of India.';
    var reprompt = 'for example, You can say welcome Nimesh in hindi style';
    this.emit(':ask', speechOutput);
  },
  'wisherIntent': function(){
     let name = this.event.request.intent.slots.guestName.value;
     let lang = this.event.request.intent.slots.language.value;
     if(name === undefined) name = "";
     if(lang === undefined) lang = " Sorry, I don't know that language yet! I'll learn it soon. ";
     let speechOutput = name + getLanguage_wish(lang) + wishTime();
     this.emit(':tell', speechOutput); 
  },
  'welcomeIntent': function(){
    let name = this.event.request.intent.slots.guestName.value;
    let lang = this.event.request.intent.slots.language.value;
    if(name == undefined) name = " ";
    if(lang === undefined) {let speechOutput = name +  ' Welcome to our sweet home! ';}
    let speechOutput = name + getLanguage_welcome(lang);
    this.emit(':tell', speechOutput); 
  },
  'AMAZON.StopIntent'() {
    this.response.speak('Bye');
    this.emit(':responseReady');
  },

  'AMAZON.HelpIntent'() {
    let speechOutput = "You can try: alexa, open Indian wish or alexa, ask Indian wish to welcome or wish the person name in different Indian Languages!";
    let repromptSpeech = "Are you still there?" + speechOutput;
    this.emit(':ask',speechOutput,repromptSpeech);
  },

  'AMAZON.CancelIntent'() {
    this.response.speak('Bye');
    this.emit(':responseReady');
  },

  Unhandled() {
    this.response.speak(
      `Sorry, I didn't get that. You can try: 'alexa, open Indian wish'` +
        ` or 'alexa, ask Indian wish app to welcome or wish person in different Indian Languages!'`
    );
    this.emit(':responseReady');
  }
};