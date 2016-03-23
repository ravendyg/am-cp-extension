/// <reference path="./../../typings/tsd.d.ts" />
`use strict`;

const aja: AjaType = require('aja');

var oldUrl: string = ``;

// remove badge
function removeBadge () {
    chrome.browserAction.setBadgeText({text: ''});
    chrome.browserAction.setPopup({popup: `./html/default-popup.html`});
}

function leaveAmazon () {
    oldUrl = ``;
    // show empty popup
    chrome.runtime.sendMessage({
        action: `hide popup`
    });      
    removeBadge();
}

function enterAmazon() {
    oldUrl = `amazon`;
    aja()
        .method(`GET`)
        .url(`http://codebears.com/releases/deals.json`)
        .on(`200`, (data: aDataType []) => {
            if (data && oldUrl === `amazon`) {
                
                // add sale type
                data = data.map( e => {
                    return {
                        url: e.url,
                        description: e.description,
                        title: e.title,
                        type: `sale`
                    }
                });
                
                // get ready for popup message
                chrome.runtime.onMessage.addListener( function(message, sender) {
                    if (message.action === `popup online`) {
                        chrome.runtime.sendMessage({
                            action: `show popup`, data: data
                        });
                    }
                });
                                
                // initialize popup
                chrome.browserAction.setPopup({popup: `./html/data-popup.html`});
                
                // show badge
                chrome.browserAction.setBadgeText({text: `${data.length}`});        
            }
        })
        .on(`40x`, (resp) => {
            removeBadge();
        })
        .on(`50x`, (resp) => {
            removeBadge();
        })
        .go();
}

// check whether we are entering or leaving amazon web site
function checkUrl (newUrl: string) {
    if (newUrl.match(/www.amazon./) && oldUrl !== `amazon`) {
        enterAmazon();
    } else if (!newUrl.match(/www.amazon./) && oldUrl === `amazon`) {
        leaveAmazon();
    }
}

// tab event processors
function update (tabId: number, changeInfo: any) {
    if (changeInfo.url) {
        checkUrl(changeInfo.url);
    }    
}

function activate () {
    chrome.tabs.query({active: true, lastFocusedWindow: true}, function(tabs) {
        checkUrl(tabs[0].url);
    });
}

function replace () {
    chrome.tabs.query({active: true, lastFocusedWindow: true}, function(tabs) {
        checkUrl(tabs[0].url);
    });
}

chrome.tabs.onUpdated.addListener(update);
chrome.tabs.onActivated.addListener(activate);
chrome.tabs.onReplaced.addListener(replace);
