let dictionary = {};

// 辞書読み込み
fetch('dictionary.json')
  .then(res => res.json())
  .then(data => {
    dictionary = data;
    loadExamples();
  });

// 例文表示
function loadExamples() {
  const ul = document.getElementById('exampleList');
  dictionary.examples.forEach(ex => {
    const li = document.createElement('li');
    li.textContent = `${ex.narraq} → ${ex.ja}`;
    ul.appendChild(li);
  });
}

// 簡易翻訳（単語単位）
function translate(text) {
  const words = text.split(/\s+/);
  const result = words.map(w => {
    for (const cat of ['person_marker','pronouns','verbs','nouns','adjectives','particles']) {
      if(dictionary[cat][w]) return dictionary[cat][w];
    }
    return w; // 辞書にない場合はそのまま
  });
  return result.join(' ');
}

// 翻訳ボタン
document.getElementById('translateBtn').addEventListener('click', () => {
  const input = document.getElementById('inputText').value;
  document.getElementById('outputText').textContent = translate(input);
});

// Discord Webhook 送信
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
