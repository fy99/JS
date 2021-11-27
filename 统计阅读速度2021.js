// ==UserScript==
// @name         统计阅读速度2021
// @namespace    http://tampermonkey.net/
// @version      1.1127
// @description  try to take over the world!
// @author       You
// @match        https://www.aljazeera.com/*
// @match        https://www.thinkchina.sg/*
// @require      http://code.jquery.com/jquery-3.4.1.min.js
// @grant        none
// ==/UserScript==


$(() => {
    window.mainInterval = undefined
    let domain = document.domain;
    let selectionDict = {
        "www.reuters.com": ".StandardArticleBody_body>p",
        "www.aljazeera.com": ".wysiwyg--all-content>p",
        'www.thinkchina.sg': ".post-block p"
    };

    let jqBody = $("body")


    function main() {
        let date = new Date();
        let time = date.getHours() + ":" + date.getMinutes()

        let worldNumbers = $(selectionDict[domain]).text().split(" ").filter(i => {
            if (i !== "") return true
        }).length;


        if (worldNumbers < 80) {
            console.log("失败" + f)
            f += 1
            if (f > 10) {
                clearInterval(window.mainInterval)
            }
            return false;
        } else {
            clearInterval(window.mainInterval)
            console.log("成功")

        }

        let minute = 0;
        let htmlInner = $(`<span>开始:${time} 总数:${worldNumbers} </span>`);
        let html = $("<div></div>");
        html.append(htmlInner);
        let speedHtml = $(`<span></span>`);
        htmlInner.append(speedHtml);
        let css = " z-index:10;" +
            "width:fit-content;" +
            "height:fit-content;" +
            "position:fixed;" +
            "right:0;" +
            "bottom:30px;" +
            "background:#aaffaa;" +
            "font-size:1.5em;" +
            "border-radius:0.5em;text-align:center;";
        html.prop("style", css);


        function clock() {
            minute += 0.1;
            let minuteStr = "用时:" + minute.toFixed(1)
            let speed = worldNumbers / minute;
            if (speed > 500) {
                speedHtml.html(minuteStr);
            } else {
                if (speed < 40) {
                    clearInterval(interval);
                    running = false
                    html.css("background", "#888888");
                }
                speedHtml.html(`${minuteStr} 速度:${speed.toPrecision(3)} `);
            }
        }


        let running = true;

        jqBody.append(html);

        interval = setInterval(clock, 6000);
        htmlInner.click(() => {
            if (running) {
                clearInterval(interval);
                html.css("background", "#888888");
                // html.append("P");
                running = false;

            } else {
                interval = setInterval(clock, 6000);
                html.css("background", "#aaffaa");

                running = true
            }

        })

        if (domain === "www.aljazeera.com") {
            let button = $("<button>重置</button>");
            button.click(() => {
                htmlInner.remove()
                f=0
                if (main() === false) {
                    window.mainInterval = setInterval(main, 5000);
                }
            });
            html.append(button)


        }


        return true
    }

    let f = 0
    if (main() === false) {
        window.mainInterval = setInterval(main, 5000);
    }


});
