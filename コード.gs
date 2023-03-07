const now = dayjs.dayjs().format()
const nowaday = dayjs.dayjs().format("YYYYMMDDHHmm")
var ss = SpreadsheetApp.openById(PropertiesService.getScriptProperties().getProperty('spreadSheetId'));

function debug() {
  Logger.log(now)
}

function getduration(userId) {
  let response = UrlFetchApp.fetch("https://api.studyplus.jp/2/users/" + userId + "/records/summary").getContentText("utf-8");
  let json = JSON.parse(response);
  return json["record_duration_yesterday"]
}

function getData() {
  const sheet = ss.getSheetByName("シート1");
  const yesterday = dayjs.dayjs().subtract(1, 'day').format("YYYY-MM-DD");
  var write = [yesterday]
  var userIds = ["12345678901234567890123456789012"] // StudyPlus UserName
  for (const userId of userIds) {
    var saveData = getduration(userId)
    write.push(saveData)
  }
  sheet.appendRow(write);
}

function discordnotify() {
  const sheet = ss.getSheetByName("シート2");
  const discordWebHookURL = PropertiesService.getScriptProperties().getProperty('discordWebhookUrl');
  const remain = sheet.getRange("C5").getValues()
  const target = sheet.getRange("B5").getValues()
  const total = sheet.getRange("A5").getValues()
  const message = {
    "content": `テスト`,
    "tts": false,
    "embeds": [
      {
        "title": `勉強時間報告`,
        "description": `${total} / ${target} (時間) - 残り ${remain} (時間)`,
        "timestamp": now, 
        "thumbnail": {"url": "https://example.com/icon.png"}, // サムネイル画像
        "image": { "url": PropertiesService.getScriptProperties().getProperty('GraphUrl') + "&time=" + nowaday }, // 公開したグラフ
        "color": parseInt("A1736B", 16), // カラーコード
        "footer": {
            "text": "sasakulab/benkyo-siro",
            "url": "https://github.com/sasakulab/benkyo-siro",
            "icon_url": "https://avatars.githubusercontent.com/u/58127312"
        },
      }
    ]
  }
  const param = {
    "method": "POST",
    "headers": { 'Content-type': "application/json" },
    "payload": JSON.stringify(message)
  }
  UrlFetchApp.fetch(discordWebHookURL, param);
}
