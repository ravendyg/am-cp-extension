/// <reference path="./../../typings/tsd.d.ts" />
`use strict`;

var dataElementTemplate: string;
var popup: HTMLDivElement;
var counter: HTMLSpanElement;

document.addEventListener(`DOMContentLoaded`, () => {
    var data: {
        url: string,
        title: string,
        description: string
    } [] = [];


    dataElementTemplate = document.getElementById(`data-element-template`).textContent;
    popup = <HTMLDivElement> document.getElementById(`content`);
    counter = <HTMLSpanElement> document.getElementById(`c-num`);

    // get ready for incoming data
    chrome.runtime.onMessage.addListener(function(message: {
        action: string, timestamp: number, data: aDataType []
    }, sender: any) {
        debugger;
        if (message.action === `show popup`) {
            console.log(message.data);
            // <div id="offers-list" class="column"></div>
            var content = document.createElement(`div`);
            var row: HTMLDivElement;
            content.setAttribute(`class`, `column`); 
            counter.textContent = `${message.data.length}`;
console.log(counter);
            for (var i=0; i < message.data.length; i++ ) {
                row = <HTMLDivElement> document.createElement(`div`);
                row.setAttribute(`class`, `row`);
                row.textContent = message.data[i].title;
                content.appendChild(row);
            }
            popup.appendChild(content);
console.log(content);
        }
    });
    // report popup ready
    chrome.runtime.sendMessage({
        action: `popup online`
    });

});

// chrome.runtime.onMessage.addListener(
//     function(message, sender) {
//           console.log(message);
//         // if (message.action === `show popup`) {
//         //     console.log(message);
//         //     popup.textContent = `sdfsdfs`;
//         //     // popup.innerHTML = dataTemplate;
//         //     // chrome.browserAction.setBadgeText({text: ''+message.length})
//         // }
//         // console.log(sender.tab ?
//         //             "from a content script:" + sender.tab.url :
//         //             "from the extension");
//         // if (request.greeting == "hello")
//         //   sendResponse({farewell: "goodbye"});
//     });