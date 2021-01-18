//extending the Array prototype to the diff function
Array.prototype.diff = function(arr2) {
  var result = [];
  for (var i in this) {
    if (arr2.indexOf(this[i]) > -1) {
      result.push(this[i]);
    }
  }
  return result;
};
var app = {
  load: function() {
    app.form.load();
  },
  form: {
    listWords: document.getElementById("listWords"),
    resultButton: document.getElementById("resultButton"),
    resultText: document.getElementById("resultMatchText"),
    load: function() {
      app.form.getResult();
    },
    getResult: function() {
      if (app.form.resultButton != null)
        app.form.resultButton.addEventListener("click", function() {
          app.form.getMatchingChar();
        });
    },
    showResult: function(result) {
      app.form.resultText.innerHTML = "<h2>" + result + "</h2>";
    },
    toArray: function(stringToSplit) {
      return stringToSplit.split("");
    },
    getMatchingChar: function() {
      var listWords = app.form.listWords.value.toLowerCase();
      var arrWords = listWords.split(",");
      var wordsCount = arrWords.length;

      //transforn the character string to array
      arrWords.forEach(function(element, index, array) {
        this[index] = app.form.toArray(element);
      }, arrWords);
      //get diff of the first pair of array elements and substitue with the result
      while (arrWords.length > 1) {
        arrWords[1] = arrWords[0].diff(arrWords[1]);
        arrWords.shift();
      }

      //show the remaining element representing the matching chars
      if (arrWords.length == 1) {
        result = arrWords[0].filter(function(item, pos) {
          return arrWords[0].indexOf(item) == pos;
        });
        app.form.showResult(result);
      }
    }
  }
};

app.load();
