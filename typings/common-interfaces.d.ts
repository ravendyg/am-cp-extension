// Aja

declare type AjaType = () => IAja;
interface IAja {
    method: (type: string) => IAja;
    url: (url: string) => IAja;
    into: (element: string) => IAja;
    data: (data: any) => IAja;
    body: (data: any) => IAja;
    on: (code: string, callback: (resp: any) => void) => IAja;
    header: (name: string, value: string) => IAja;
    go: () => void; 
}


// Chrome

interface IChrome {
    tabs: IChromeTabs;
    runtime: IChromeRuntime;
    browserAction: IChromeActions;
}
interface IChromeTabs {
    onCreated: IChromeEvent;
    onUpdated: IChromeEvent;
    onActivated: IChromeEvent;
    onRemoved: IChromeEvent;
    onReplaced: IChromeEvent;
    onMoved: IChromeEvent;
    query: (options: ChromeTabQueryOptionsType, cb: (tabs: IChromeTabs []) => void) => void;
    url: string;
    create: (options: {url: string}) => void;
    tab: ChromeTabType;
}
declare type ChromeTabType = any; 
interface IChromeEvent {
    addListener: (callback: (tabId: number, changeInfo: any) => void ) => void;
}
interface IChromeRuntime {
    sendMessage: (message: any, callback?: (response :any) => void ) => void;
    onMessage: IChromeRuntimeMessage;
}
interface IChromeActions {
    setTitle: (details: {title: string, tabId?: number}) => void;
    getTitle: (details: {tabId?: number}, cb: (result: string) => void) => void;
    setIcon (details: {imageData?: Uint8ClampedArray, path?: string, tabId?: number}, cb: () => void): void;
    setIcon (details: {imageData?: any, path?: string, tabId?: number}, cb: () => void): void;
    setIcon (details: {imageData?: Uint8ClampedArray, path?: any, tabId?: number}, cb: () => void): void;
    setIcon (details: {imageData?: any, path?: any, tabId?: number}, cb: () => void): void;
    setPopup: (details: {tabId?: number, popup: string}) => void;
    getPopup: (details: {tabId?: number}, cb: (result: string) => void) => void;
    setBadgeText: (details: {text: string, tabId?: number}) => void;
    getBadgeText: (details: {tabId?: number}, cb: (result: string) => void) => void;
    setBadgeBAckgroundColor (details: {color: string, tabId?: number}): void;
    setBadgeBAckgroundColor (details: {colorArray: number [], tabId?: number}): void;
    getBadgeBackgroundColor: (details: {tabId?: number}, cb: (colorArray: number []) => void) => void;
    enable: (tabId?: number) => void;
    disable: (tabId?: number) => void;
    
    onClicked: {
        addListener: (cb: (tab: ChromeTabType) => void) => void;
    }
}
interface IChromeRuntimeMessage {
    addListener: (callback:
        (message: any, sender: ChromeSenderType, callback?: (response :any) => void ) => void
    ) => void;
}
declare type ChromeSenderType = {
    tab: {
        url: string
    }
};
declare type ChromeTabQueryOptionsType = {
    active?: boolean,
    lastFocusedWindow?: boolean
} 

declare type ImageDataType = any;