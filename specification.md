# Social Value Orientation (SVO) スライダー課題（単独版）

## 概要
本リポジトリは、Social Value Orientation (SVO) を測定するためのスライダー（9択）課題を単独で実行・編集できるように切り出したものです。
Qualtrics等のオンライン調査プラットフォームに組み込んで使用することを前提としています。

## ファイル構成
* `experiment.html`: 課題を実行するためのメインのHTMLファイルです。
* `main.js`: SVOの配点データ、教示テキスト、およびjsPsychの実行ロジックが含まれています。編集が必要な場合は主にこのファイルを変更します。
* `style.css`: スライダーやボタンの見た目を調整するスタイルシートです。
* `jspsych-6.3.1/`: 実験制御に使用する jsPsych ライブラリ一式です。

## 課題の流れ
1. **教示画面**: 自分と他者へのポイント分配ルールを説明します。
2. **SVO試行 (15問)**:
   - 各試行で9つの選択肢（配点パターン）が提示されます。
   - 「自分にとって最も好ましい」選択肢を1つ選びます。
3. **終了画面**: データを保存して終了します。

## データの保存とQualtricsへの連携
本プログラムは終了時に取得した全データをJSON形式で出力します。
Qualtrics内で実行された場合（IFrame内での動作を検知した場合）、`window.parent.postMessage` を使用して親画面（Qualtrics側）にデータを送信します。

**保存されるデータについて:**
本課題ではQualtricsの容量制限（約20KB）を回避するため、全データではなく、**本命のSVO選択試行（`task: 'svo'`）のデータのみを自動的に抽出して送信**する仕様になっています。そのため、分析時に空白画面などのダミーデータを手動でフィルタリング・除外する必要はありません。

**Qualtrics側の設定手順:**

本プログラムはJavaScriptで動的にIFrame（全画面）を生成するため、質問文のHTMLビューへのタグ貼り付けは**不要**です。以下の手順で設定してください。

1. **アンケートフローの設定（前半）**
   課題ブロックより**前**に「埋め込みデータ」を追加し、変数名を **`__js_datajs`** に設定します。（※ `__` はアンダーバー2つです。Qualtricsの仕様により、JSから保存する変数にはこの接頭辞が必須となります）

2. **JavaScriptの追加**
   課題を実施する質問の「JavaScriptを追加」を開き、以下のコードを貼り付けてください（`task_url` と `event.origin` のURLはご自身のGitHubのアカウント名に合わせて変更してください）。

   ```javascript
   Qualtrics.SurveyEngine.addOnload(function () {
       var qthis = this;
       qthis.hideNextButton(); // 次へボタンを隠す
   
       // URLの指定（キャッシュ回避付き）
       var nocache = "?nocache=" + new Date().getTime();
       var task_url = "https://[あなたのGitHubアカウント].github.io/SSM/experiment.html" + nocache;
   
       // 全画面IFrameの生成
       var iframe = document.createElement('iframe');
       iframe.src = task_url;
       iframe.allowFullscreen = true;
       iframe.style.position = "fixed";
       iframe.style.top = "0";
       iframe.style.left = "0";
       iframe.style.width = "100vw";
       iframe.style.height = "100vh";
       iframe.style.border = "none";
       iframe.style.zIndex = "99999";
       iframe.style.backgroundColor = "#f7f9fa";
       document.body.appendChild(iframe);
   
       // データ受信処理
       var messageListener = function(event) {
           if (event.origin === "https://[あなたのGitHubアカウント].github.io") {
               if (event.data && event.data.type === 'jspsych-data') {
                   // データをQualtricsに保存（コード上は datajs と指定）
                   Qualtrics.SurveyEngine.setJSEmbeddedData("datajs", event.data.data);
                   
                   if (document.body.contains(iframe)) {
                       document.body.removeChild(iframe);
                   }
                   window.removeEventListener("message", messageListener);
                   setTimeout(function () {
                       qthis.clickNextButton();
                   }, 500);
               }
           }
       };
       window.addEventListener("message", messageListener);
   });
   ```

## 編集方法
* 教示の文章を変更したい場合: `main.js` の `svo_instructions` 内の `html` 変数を修正してください。
* 配点を変更したい場合: `main.js` の `svo_endpoints` 配列内の数値を修正してください。
