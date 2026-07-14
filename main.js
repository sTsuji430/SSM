// =========================================================
// SVO Standalone Version
// =========================================================
var repo_site = "https://stsuji430.github.io/SSM/";

var timeline = [];

// =========================================================
// 画像の事前読み込み（Preload）
// =========================================================
var preload_images = {
    type: 'preload',
    images: [
        repo_site + 'image/y_o.png',
        repo_site + 'image/post_match.png'
    ],
    message: '<p>データを読み込んでいます...</p>',
    show_progress_bar: true
};
timeline.push(preload_images);

// =========================================================
// フルスクリーン開始設定
// =========================================================
var enter_fullscreen = {
    type: 'fullscreen',
    fullscreen_mode: true,
    message: '<style>#jspsych-fullscreen-btn { font-size: 20px; padding: 15px 50px; margin: 20px; cursor: pointer; transition: all 0.1s; border: 1px solid #ccc; border-radius: 4px; background-color: #fff; color: #333; } #jspsych-fullscreen-btn:active { background-color: #d4edda; border-color: #28a745; transform: scale(0.95); }</style>' +
             '<div style="text-align: center; margin-top: 10%;">' +
             '<p style="font-size: 24px; font-weight: bold; margin-bottom: 20px;">この課題はフルスクリーンで実行されます。</p>' +
             '<p style="font-size: 20px; margin-top: 30px;">準備ができたら下のボタンを押してフルスクリーンモードを開始してください。</p>' +
             '</div>',
    button_label: 'フルスクリーンを開始する'
};
timeline.push(enter_fullscreen);

// =========================================================
// SVO 課題
// =========================================================
var custom_btn_html = '<button class="jspsych-btn" style="font-size: 20px; padding: 15px 30px; border-radius: 8px; background-color: #007bff; color: white; border: none; cursor: pointer; box-shadow: 0 4px 6px rgba(0,0,0,0.1); transition: all 0.2s ease;">%choice%</button>';

var svo_instructions = {
    type: 'html-button-response',
    on_start: function () {
        document.body.style.cursor = 'auto';
    },
    stimulus: function () {
        var img_url = repo_site + "image/y_o.png";
        var html = '<div style="text-align: left; line-height: 1.6; font-size: 20px; max-width: 800px; margin: 0 auto; padding-bottom: 20px;">';
        html += '<h1 style="color: #0056b3; font-size: 32px; text-align: center; border-bottom: 3px solid #0056b3; padding-bottom: 15px; margin-bottom: 30px;">これよりポイント分配課題が始まります</h1>';

        html += '<p style="margin-bottom: 10px;">この課題では、<strong>あなたが見知らぬ相手と二人組になった状況</strong>を思い浮かべてください。お互いに匿名です。</p>';

        var example_buttons = '<div style="display: flex; justify-content: center; gap: 6px; margin: 10px 0;">';
        var ex_s = [50, 52, 53, 54, 56, 57, 58, 59, 60];
        var ex_o = [45, 44, 42, 41, 40, 39, 37, 36, 35];
        for (var i = 0; i < 9; i++) {
            var is_active = (i === 4);
            var bg_color = is_active ? '#d4edda' : '#f8f9fa';
            var border_color = is_active ? '#28a745' : '#ccc';
            var shadow = is_active ? 'box-shadow: 0 0 8px rgba(40,167,69,0.5);' : '';
            var opacity = is_active ? '1' : '0.4';
            example_buttons += '<div style="padding: 2px 5px; border: 2px solid ' + border_color + '; border-radius: 6px; text-align: center; background-color: ' + bg_color + '; width: 80px; opacity: ' + opacity + '; ' + shadow + '; pointer-events: none; line-height: 1.1;">' +
                '<span style="font-size: 11px; font-weight: bold; color: #0056b3;">あなた</span><br><strong style="font-size: 14px;">' + ex_s[i] + '</strong><hr style="margin: 2px 0; border: none; border-top: 1px dashed #ccc;">' +
                '<span style="font-size: 11px; font-weight: bold; color: #E65F00;">Aさん</span><br><strong style="font-size: 14px;">' + ex_o[i] + '</strong>' +
                '</div>';
        }
        example_buttons += '</div>';

        html += '<p style="margin-bottom: 10px;">この相手とのポイントの配分についての決定を、あなたが行います。<br>' +
            '画面には <strong>9つの選択肢</strong> が横に並んで表示されますので、その中から、<strong>あなたにとって好ましい分配</strong>のボタンを1つクリックして選んでください。</p>';

        html += '<div style="text-align: center; margin: 15px 0;">';
        html += '<img src="' + img_url + '" style="max-width: 50%; max-height: 100px; width: auto; height: auto;">';
        html += '</div>';

        html += '<div style="background-color: #f8f9fa; border: 2px solid #333; padding: 10px 15px; border-radius: 8px; margin-top: 10px; text-align: center;">' +
            '<p style="margin-bottom: 5px; font-size: 20px; font-weight: bold; text-align: left;">【選択肢の例】</p>' +
            example_buttons +
            '<p style="font-size: 20px; margin: 0; text-align: left;">上の例では、<strong>あなたが56ポイント、相手が40ポイントを受け取るような配分</strong>を選択しています。</p>' +
            '</div>' +
            '</div>';

        return html;
    },
    choices: ['次へ進む'],
    button_html: custom_btn_html,
    post_trial_gap: 500
};

var svo_endpoints = [
    { item: 1, ep1: { s: 85, o: 85 }, ep2: { s: 85, o: 15 } },
    { item: 2, ep1: { s: 85, o: 15 }, ep2: { s: 100, o: 50 } },
    { item: 3, ep1: { s: 50, o: 100 }, ep2: { s: 85, o: 85 } },
    { item: 4, ep1: { s: 50, o: 100 }, ep2: { s: 85, o: 15 } },
    { item: 5, ep1: { s: 100, o: 50 }, ep2: { s: 50, o: 100 } },
    { item: 6, ep1: { s: 100, o: 50 }, ep2: { s: 85, o: 85 } },
    { item: 7, ep1: { s: 100, o: 50 }, ep2: { s: 70, o: 100 } },
    { item: 8, ep1: { s: 90, o: 100 }, ep2: { s: 100, o: 90 } },
    { item: 9, ep1: { s: 100, o: 70 }, ep2: { s: 50, o: 100 } },
    { item: 10, ep1: { s: 100, o: 70 }, ep2: { s: 70, o: 100 } },
    { item: 11, ep1: { s: 70, o: 100 }, ep2: { s: 100, o: 70 } },
    { item: 12, ep1: { s: 50, o: 100 }, ep2: { s: 100, o: 90 } },
    { item: 13, ep1: { s: 50, o: 100 }, ep2: { s: 100, o: 50 } },
    { item: 14, ep1: { s: 100, o: 90 }, ep2: { s: 70, o: 100 } },
    { item: 15, ep1: { s: 90, o: 100 }, ep2: { s: 100, o: 50 } }
];

var svo_stimuli = [];
for (var j = 0; j < svo_endpoints.length; j++) {
    var ep1 = svo_endpoints[j].ep1;
    var ep2 = svo_endpoints[j].ep2;
    var choices_html = [];
    var amounts = [];

    for (var k = 0; k < 9; k++) {
        var t = k / 8;
        var self_amt = Math.round(ep1.s + t * (ep2.s - ep1.s));
        var other_amt = Math.round(ep1.o + t * (ep2.o - ep1.o));

        var btn_html = '<div style="padding: 10px; border: 2px solid #333; border-radius: 6px; text-align: center; background-color: #fff; width: 80px;">' +
            '<span style="font-size: 14px; font-weight: bold; color: #0056b3;">あなた</span><br><strong style="font-size: 22px;">' + self_amt + '</strong><hr style="margin: 8px 0; border: none; border-top: 2px dashed #ccc;">' +
            '<span style="font-size: 14px; font-weight: bold; color: #E65F00;">Aさん</span><br><strong style="font-size: 22px;">' + other_amt + '</strong>' +
            '</div>';
        choices_html.push(btn_html);
        amounts.push({ self: self_amt, other: other_amt });
    }

    svo_stimuli.push({
        item_number: svo_endpoints[j].item,
        choices_array: choices_html,
        amounts_array: amounts
    });
}

var svo_trial = {
    type: 'html-button-response',
    stimulus: '<div style="text-align: center; margin-bottom: 30px;">' +
        '<p style="font-size: 20px; color: #666; margin-bottom: 5px; font-weight: bold;">【あなた と 見知らぬ相手（Aさん） とのポイント分配】</p>' +
        '<p style="font-size: 24px; font-weight: bold; margin: 0;">あなたにとって最も好ましい配分を1つ選んでください。</p>' +
        '</div>',
    choices: jsPsych.timelineVariable('choices_array'),
    button_html: '<button class="svo-btn" style="margin: 0; padding: 0; border: none; background: none; cursor: pointer; outline: none;">%choice%</button>',
    data: {
        task: 'svo',
        item_number: jsPsych.timelineVariable('item_number')
    },
    on_finish: function (data) {
        var selected_index = data.response;
        var amounts = jsPsych.timelineVariable('amounts_array', true);
        data.self_amount = amounts[selected_index].self;
        data.other_amount = amounts[selected_index].other;
    },
    post_trial_gap: 0
};

var svo_feedback = {
    type: 'html-button-response',
    stimulus: function () {
        return '<div style="text-align: center; margin-bottom: 30px;">' +
            '<p style="font-size: 20px; color: #666; margin-bottom: 5px; font-weight: bold;">【あなた と 見知らぬ相手（Aさん） とのポイント分配】</p>' +
            '<p style="font-size: 24px; font-weight: bold; margin: 0;">あなたにとって最も好ましい配分を1つ選んでください。</p>' +
            '</div>';
    },
    choices: jsPsych.timelineVariable('choices_array'),
    button_html: '<button class="svo-btn" style="margin: 0; padding: 0; border: none; background: none; cursor: default; outline: none;">%choice%</button>',
    trial_duration: 500,
    response_ends_trial: false,
    data: { task: 'svo_feedback_dummy' },
    on_load: function () {
        var last_trial_data = jsPsych.data.get().last(1).values()[0];
        var selected_index = parseInt(last_trial_data.response);
        var buttons = document.getElementsByClassName('jspsych-html-button-response-button');

        for (var i = 0; i < buttons.length; i++) {
            var btn = buttons[i].querySelector('button');
            var choice_inner = btn.querySelector('div');

            if (i === selected_index) {
                btn.style.opacity = '1';
                if (choice_inner) {
                    choice_inner.style.backgroundColor = '#d4edda';
                    choice_inner.style.border = '2px solid #28a745';
                    choice_inner.style.boxShadow = '0 0 10px rgba(40,167,69,0.5)';
                }
            } else {
                btn.style.opacity = '0.4';
                if (choice_inner) {
                    choice_inner.style.backgroundColor = '#f8f9fa';
                    choice_inner.style.border = '2px solid #ccc';
                }
            }
        }
    },
    post_trial_gap: 0
};

var svo_blank = {
    type: 'html-keyboard-response',
    stimulus: '',
    choices: jsPsych.NO_KEYS,
    trial_duration: 500,
    data: { task: 'svo_blank_dummy' },
    post_trial_gap: 0
};

var svo_procedure = {
    timeline: [svo_blank, svo_trial, svo_feedback],
    timeline_variables: svo_stimuli,
    randomize_order: true
};

timeline.push(svo_instructions);
timeline.push(svo_procedure);

// =========================================================
// 終了処理と初期化
// =========================================================
timeline.push({
    type: 'fullscreen',
    fullscreen_mode: false
});

timeline.push({
    type: 'html-keyboard-response',
    stimulus: `
        <div class="instructions">
            <h2>実験終了</h2>
            <p>課題はこれで終了です。ご協力ありがとうございました。</p>
            <p style="margin-top:40px; font-weight: bold;">スペースキーを押してデータを保存してください。</p>
        </div>
    `,
    choices: [' ']
});

jsPsych.init({
    timeline: timeline,
    on_finish: function () {
        var datajs = jsPsych.data.get().json();

        if (window.self !== window.top) {
            window.parent.postMessage({
                type: 'jspsych-data',
                data: datajs
            }, '*');
        } else {
            document.body.innerHTML = `
                <div style="text-align:center; margin-top:50px; font-family: sans-serif; font-size: 24px;">
                    <h2>データを保存しています...</h2>
                    <p>（この画面はローカル確認用のダミーです）</p>
                    <p>F12キーを押してコンソールから保存されるCSVデータを確認できます。</p>
                </div>
            `;
            console.log(jsPsych.data.get().csv());
        }
    }
});
