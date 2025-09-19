let dictionary = {};

// 辞書読み込み
fetch('Dictionary.json')
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
