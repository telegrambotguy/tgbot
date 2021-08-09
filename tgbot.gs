var token = ""; // FILL IN YOUR OWN TOKEN
var telegramUrl = "https://api.telegram.org/bot" + token;
var webAppUrl = ""; // FILL IN YOUR GOOGLE WEB APP ADDRESS
var ssId = ""; // FILL IN THE ID OF YOUR SPREADSHEET

function getMe() {
  var url = telegramUrl + "/getMe";
  var response = UrlFetchApp.fetch(url);
  Logger.log(response.getContentText());
}

function setWebhook() {
  var url = telegramUrl + "/setWebhook?url=" + webAppUrl;
  var response = UrlFetchApp.fetch(url);
  Logger.log(response.getContentText());
}

function sendText(userId,text,messageId,data) {
  var url = telegramUrl + "/sendMessage?chat_id=" + userId + "&text=" + text + "&reply_to_message_id=" + messageId;
  var response = UrlFetchApp.fetch(url);
  // GmailApp.sendEmail(Session.getEffectiveUser().getEmail(),"Message sent to bot", JSON.stringify(url,data,4));
  Logger.log(response.getContentText());
}

function doGet(e) {
  return HtmlService.createHtmlOutput("Ready!");
}

function doPost(e) {
  // this is where telegram works
  var data = JSON.parse(e.postData.contents);
  var userId = data.message.from.id;
  var isBot = data.message.from.is_bot;
  var userName = data.message.from.username;
  var firstName = data.message.from.first_name;
  var lastName = data.message.chat.last_name;
  var chatId = data.message.chat.id;
  var chatTitle = data.message.chat.title;
  var chatType = data.message.chat.type;
  var messageId = data.message.message_id;
  var textReceived = data.message.text;
  var sheet = SpreadsheetApp.openById(ssId);

  // GmailApp.sendEmail(Session.getEffectiveUser().getEmail(),"Message sent to bot", JSON.stringify(data,data,4));

  if(textReceived.toLowerCase().indexOf("cro")>-1) {
    var quotes = sheet.getSheets()[0].getDataRange().getValues();
    var randomIndex = Math.floor(Math.random() * quotes.length);
    var quote = quotes[randomIndex].toLocaleString();
    // GmailApp.sendEmail(Session.getEffectiveUser().getEmail(),"Message sent to bot", JSON.stringify(data,data,4));

    sendText(chatId,quote,messageId,data);
  }

  sheet.getSheets()[1].appendRow([new Date(),userId,isBot,userName,firstName,lastName,chatId,chatTitle,chatType,messageId,textReceived,quote]);
}