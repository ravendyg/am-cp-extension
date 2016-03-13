/// <reference path="./../../typings/tsd.d.ts" />
`use strict`;

const aja: AjaType = require('aja');

var tabsHistory: any = {};
var oldUrl: string = ``;

function leaveAmazon () {
console.log(`leave`);
    oldUrl = ``;
    chrome.runtime.sendMessage({
        action: `hide popup`, timestamp: Date.now()
    });
    // remove badge
    chrome.browserAction.setBadgeText({text: ''});
    chrome.browserAction.setPopup({popup: `./html/default-popup.html`});
    
}

function enterAmazon() {
    oldUrl = `amazon`;
    aja()
        .method(`GET`)
        .url(`http://localhost:8080`)
        // .header(`Origin`, ``)
        .on(`200`, (resp) => {
            if (resp.text && oldUrl === `amazon`) {
                // got data and user hasn't changed the page
                var data = JSON.parse(resp.text);

                // get ready for popup message
                chrome.runtime.onMessage.addListener( function(message, sender) {
                    if (message.action === `popup online`) {
                        chrome.runtime.sendMessage({
                            action: `show popup`, timestamp: Date.now(), data: data
                        });
                    }
                });
                
                // show badge
                chrome.browserAction.setBadgeText({text: ''+data.length}); 
                
                // initialize popup
                chrome.browserAction.setPopup({popup: `./html/data-popup.html`});        
            }
        })
        .on(`40x`, (resp) => {
            // chrome.runtime.sendMessage({
            //     action: `40x popup`, timestamp: Date.now()
            // });
        })
        .on(`50x`, (resp) => {
            // chrome.runtime.sendMessage({
            //     action: `50x popup`, timestamp: Date.now()
            // });
        })
        .go();
}

function checkUrl (newUrl: string) {
console.log(`checking ${newUrl}`);
    if (newUrl.match(/www.amazon./) && oldUrl !== `amazon`) {
        enterAmazon();
    } else if (!newUrl.match(/www.amazon./) && oldUrl === `amazon`) {
        leaveAmazon();
    }
}

function update (tabId: number, changeInfo: any) {
    if (changeInfo.url) {
        tabsHistory[tabId] = changeInfo.url;
        checkUrl(changeInfo.url);
        // console.log(tabId, tabs[tabId]);
    }    
}

function activate (activeInfo: any) {
    // console.log(activeInfo.tabId, tabsHistory);
    if (tabsHistory[activeInfo.tabId]) {
        checkUrl(tabsHistory[activeInfo.tabId]);
    }
}

function removeTab (tabId: number) {
    delete tabsHistory[tabId];
}

function replace (addedTab: number, removedTab: number) {
    // for some reasons not yet clear some pages (like ngs.ru), sometimes trigger replace instead of update
    delete tabsHistory[removedTab];
    chrome.tabs.query({active: true, lastFocusedWindow: true}, function(tabs) {
        tabsHistory[addedTab] = tabs[0].url;
        checkUrl(tabs[0].url);
    });
}

chrome.tabs.onUpdated.addListener(update);
chrome.tabs.onActivated.addListener(activate);
chrome.tabs.onRemoved.addListener(removeTab);
chrome.tabs.onReplaced.addListener(replace);
