/// <reference path="./../../typings/tsd.d.ts" />
`use strict`;

var dataElementTemplate: string;
var popup: HTMLDivElement;
var counter: HTMLSpanElement;

document.addEventListener(`DOMContentLoaded`, () => {

    dataElementTemplate = document.getElementById(`data-element-template`).textContent;
    popup = <HTMLDivElement> document.getElementById(`content`);
    counter = <HTMLSpanElement> document.getElementById(`c-num`);
    
    // open a new tab when link clicked
    function openLink (event: any) {
        for (var i=0; i < event.path.length; i++) {
            if (event.path[i].getAttribute(`href`) && event.path[i].getAttribute(`href`).match(/www.amazon./)) {
                chrome.tabs.create({url: event.path[i].getAttribute(`href`)});
            }
        }
    } 

    // takes list of coupons and produces list in DOM
    function displayList (message: { action: string, data: aDataType [] }, sender: any) {
        if (message.action === `show popup`) {
            // show counter
            counter.textContent = `${message.data.length}`;
            // create list
            popup.innerHTML = message.data.reduce( (pv, cv, i) => {
                return pv + dataElementTemplate
                            .replace(/{{link}}/, cv.url)
                            .replace(/{{description}}/, cv.description)
                            .replace(/{{title}}/, cv.title);
            }, ``);
            // link processing
            document.addEventListener(`click`, openLink);
        }
    }
    
    // get ready for incoming data
    chrome.runtime.onMessage.addListener(displayList);
    
    // report popup ready
    chrome.runtime.sendMessage({
        action: `popup online`
    });

});