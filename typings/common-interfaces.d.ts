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



interface IChrome {
    tabs: IChromeTab;
    runtime: IChromeRuntime;
    browserAction: IChromeActions;
}
interface IChromeTab {
    onCreated: IChromeEvent;
    onUpdated: IChromeEvent;
    onActivated: IChromeEvent;
    onRemoved: IChromeEvent;
    onReplaced: IChromeEvent;
    onMoved: IChromeEvent;
    query: (options: ChromeTabQueryOptionsType, cb: (tabs: IChromeTab []) => void) => void;
    url: string;
}
interface IChromeEvent {
    addListener: (callback: (tabId: number, changeInfo: any) => void ) => void;
}
interface IChromeRuntime {
    sendMessage: (message: any, callback?: (response :any) => void ) => void;
    onMessage: IChromeRuntimeMessage;
}
interface IChromeActions {
    setBadgeText: (details: {text: string, tabId?: number}) => void;
    setPopup: (details: {tabId?: number, popup: string}) => void;
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