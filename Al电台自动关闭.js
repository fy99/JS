// ==UserScript==
// @name         定时关闭
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://listen.aljazeera.com/english/livestream
// @icon         https://www.google.com/s2/favicons?sz=64&domain=aljazeera.com
// @grant        none
// ==/UserScript==

(function() {
// 创建一个浮动的标签元素
var countdownLabel = document.createElement('div');
countdownLabel.style.position = 'fixed';
countdownLabel.style.bottom = '10px';
countdownLabel.style.right = '10px';
countdownLabel.style.background = 'black';
countdownLabel.style.padding = '10px';
countdownLabel.style.borderRadius = '5px';
countdownLabel.style.zIndex = '9999';

// 添加标签元素到页面中
document.body.appendChild(countdownLabel);

// 定义倒计时时间（单位：秒）
var countdownTime = 0.5 * 60; // 30分钟

// 定义剩余时间的分钟数和秒数
var remainingMinutes = Math.floor(countdownTime / 60);
var remainingSeconds = countdownTime % 60;

// 更新倒计时标签的内容
function updateCountdownLabel() {
  // 减少剩余时间的秒数
  remainingSeconds--;

  // 如果秒数为负数，则将分钟数减一，并将秒数重置为 59
  if (remainingSeconds < 0) {
    remainingMinutes--;
    remainingSeconds = 59;

      // 如果分钟数为负数，则执行后退操作
      if (remainingMinutes < 0) {
          window.history.back();

          var body = document.getElementsByTagName('body')[0];
          while (body.firstChild) {
              body.removeChild(body.firstChild);
          }
          clearInterval(timer);
      }
  }


  // 更新倒计时标签的内容
  countdownLabel.innerHTML = '倒计时：' + remainingMinutes + ' 分钟 ' + remainingSeconds + ' 秒';
}

// 每秒钟更新一次倒计时标签的内容
var timer=setInterval(updateCountdownLabel, 1000);

// 更新倒计时标签的内容
updateCountdownLabel();
})();
