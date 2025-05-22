// массив алфавита
let rusAlphavit = [];
let i = 0;
while (i < 33) {
  // с 1072 до 1103  с а до я а потом нужно добавить ё
  if (i === 6) {
    rusAlphavit[i] = "ё";
  } else {
    let code = 1072 + (i > 6 ? i - 1 : i);
    rusAlphavit[i] = String.fromCharCode(code);
  }
  i = i + 1;
}

function encryptROT13Russian(text) {
  let result = "";
  let j = 0;

  while (j < text.length) {
    let ch = text[j];
    let Upper = false;

    // проверка если буква заглавная
    if (ch >= "А" && ch <= "Я" || ch === "Ё") {
      ch = ch.toLowerCase();
      Upper = true;
    }

    let k = 0;
    let found = false;

    while (k < 33) {
      if (rusAlphavit[k] === ch) {
        let newIndex = (k + 13) % 33;
        let newChar = rusAlphavit[newIndex];
        if (Upper) {
          newChar = newChar.toUpperCase();
        }
        result = result + newChar;
        found = true;
        break;
      }
      k = k + 1;
    }

    if (!found) {
      result = result + ch;
    }
    j = j + 1;
  }
  return result;
}

let button = document.querySelector("button");
button.onclick = function () {
  let input = document.querySelector("textarea").value;
  let encrypted = encryptROT13Russian(input);

  let resultDiv = document.querySelector(".result");
  resultDiv.innerHTML = "<p class='resultTitle'>Result</p><p>" + encrypted + "</p>";

  // dsdjl fkafabnf
  let alphavitText = "";
  let z = 0;
  while (z < 33) {
    alphavitText = alphavitText + rusAlphavit[z] + " ";
    z = z + 1;
  }

  resultDiv.innerHTML += "<p><strong>Алфавит:</strong><br>" + alphavitText + "</p>";
};
