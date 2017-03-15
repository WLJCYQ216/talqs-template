import TalqsTemplate from 'talqsTemplate';
var escapeHtml = require('escape-html');

var data = [];
var currentIndex = 0;

// 试题收请求完成
var loadComplete = function(result) {
  data = result;
  renderIndex()
};

var app = document.getElementById('app');
var changeQSBtn =  document.getElementById('changeQS');
var info = document.getElementById('info');
var questionDifficultyNode = document.getElementById('questionDifficulty');
document.getElementById('template').innerHTML = escapeHtml(questionDifficultyNode.outerHTML);
TalqsTemplate.registerComponent({questionDifficulty: questionDifficultyNode.innerHTML})

// 渲染试题
var renderIndex = function() {
  var currentData = data[currentIndex];
  app.innerHTML = TalqsTemplate.render(currentData, {queIndex: currentIndex + 1});
  info.innerHTML = `逻辑类型： ${currentData.logicQuesTypeName}，逻辑类型ID： ${currentData.logicQuesTypeId}`;
};

// 切换下一道题
changeQSBtn.addEventListener('click', function(){
  currentIndex = currentIndex < data.length - 1 ? currentIndex + 1 : 0;
  renderIndex()
})

// 请求试题数据
;(function(cb) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', '../data.json');
  xhr.send();
  xhr.onload = function() {
    cb(JSON.parse(this.responseText).data)
  }
})(loadComplete)

