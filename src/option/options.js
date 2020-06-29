function save_options() {
    // chromeアカウントと紐づくストレージに保存
    chrome.storage.sync.set({
        api_key: document.getElementById('api_key').value,
        secret_key: document.getElementById('secret_key').value
    }, function () {
        // 保存できたら、画面にメッセージを表示(0.75秒だけ)
        var status = document.getElementById('status');
        status.textContent = 'Saved.';
        setTimeout(function () {
            status.textContent = '';
        }, 750);
    })
}

// 設定画面で設定を表示する
function restore_options() {
    // デフォルト値は、ここで設定する
    chrome.storage.sync.get({
        api_key: 'input here',
        secret_key: 'input here'

        // 保存された値があったら、それを使う
    }, function (items) {
        document.getElementById('api_key').value = items.api_key;
        document.getElementById('secret_key').value = items.secret_key;
    });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
