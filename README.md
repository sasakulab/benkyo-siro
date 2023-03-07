# benkyo-siro

こんなの作っている暇があったら、勉強したほうが良かったと思う。

## これはなに？

私たちは中学校の同級生同士で、4人合わせて810時間勉強することになりました。

勉強のモチベーションを上げるために、毎日 WebHook でお伝えしてもらうことにしましょう。

<img src="/assets/webhook_sample.png" width="300px">

## 動作環境

- Google Apps Script
  - Google の提供する無料計算資源

## 通知例

<img src="/assets/img_0.png" width="300px">

## 環境変数

### プロパティに隠すもの

プロジェクトの設定から、スクリプトの設定に書き込んでください。

- `GraphUrl`

Google SpreadSheet のグラフを公開（公開範囲には留意）して、その URL を書きます。
公開形式は、「画像」を指定してください。

- `discordWebhookUrl`
  
Discord の WebHook Url を参照してください。

- `spreadSheetId`

データをストアする spreadSheetId を入力してください。

#### スプレッドシート の内容

- `"シート1"`

<img src="/assets/img_1.png" width="300px">

- `"シート2"`

<img src="/assets/img_2.png" width="300px">

### ソースコード内に直接書くもの

将来的に、プロパティに隠します。

- `StudyPlus UserName`
  - `userIds` に配列形式で格納
  - Web 版 StudyPlus Mypage の URL から見つけだしてください。`https://www.studyplus.jp/users/{UserName}`

```js
var userIds = ["12345678901234567890123456789012", "abcdefabcdefabcdefabcdefabcdefabcdef",] // StudyPlus UserName
```

- `サムネイル画像`

```js
"thumbnail": {"url": "https://example.com/icon.jpg"}, // サムネイル画像
```

### 注意

一般向けに公開するつもりはなかったので雑に作りました。
この README も雑に作っています。
ご理解ください。
