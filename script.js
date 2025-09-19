// 1. 辞書読み込み
let dictionary = {};
fetch('dictionary.json')
  .then(res => res.json())
  .then(data => dictionary = data);

// 2. 翻訳関数（単語単位の簡易翻訳）
function translate(text) {
  const words = text.split(/\s+/);
  const translated = words.map(w => dictionary[w] || w);
  return translated.join(' ');
}

// 翻訳ボタンイベント
document.getElementById('translateBtn').addEventListener('click', () => {
  const input = document.getElementById('inputText').value;
  document.getElementById('outputText').textContent = translate(input);
});

// 3. Discord Webhook 送信
async function sendToDiscord(name, message) {
  const webhookURL = "YOUR_DISCORD_WEBHOOK_URL"; // ←ここにWebhook URL
  await fetch(webhookURL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content: `名前: ${name}\n意見: ${message}` })
  });
}

// お問い合わせフォーム
document.getElementById('contactForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = e.target.name.value;
  const msg = e.target.message.value;
  await sendToDiscord(name, msg);
  alert("Discord に送信しました！");
  e.target.reset();
});
