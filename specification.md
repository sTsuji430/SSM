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

**Qualtrics側の設定手順:**
1. Qualtricsのアンケートフローで、「埋め込みデータ (Embedded Data)」ブロックを追加し、`SVO_DATA` という変数を設定します。
2. 質問のHTMLビューに以下のようなiframeタグを追加し、この課題を読み込ませます。
   ```html
   <iframe src="https://[あなたのGitHubアカウント].github.io/SSM/experiment.html" width="100%" height="800px" style="border:none;"></iframe>
   ```
3. Qualtrics側のJavaScriptに、iframeからのメッセージを受信して `SVO_DATA` に格納する処理（`window.addEventListener("message", ...)`）を記述します（既存のEEM_SD課題と同じスクリプトがそのまま使用できます）。

## 編集方法
* 教示の文章を変更したい場合: `main.js` の `svo_instructions` 内の `html` 変数を修正してください。
* 配点を変更したい場合: `main.js` の `svo_endpoints` 配列内の数値を修正してください。
