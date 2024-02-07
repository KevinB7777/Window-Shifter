var defaultURL = "";
var defaultID = 0;
var two = true;

chrome.action.onClicked.addListener(function(tab){
    chrome.tabs.query({active:true, lastFocusedWindow:true},function(tabt){
        defaultURL = tabt[0].url;
        defaultID = tabt[0].id;
        console.log(defaultID);
        console.log(defaultURL);
        if(two)
            minimizeWindow();
        else
            maximizeWindow();
    })
});

function minimizeWindow(){
    chrome.windows.getAll({},function(windows){
        windows.forEach( function(window){
            chrome.windows.update(window.id, {state:"minimized"});
        });
    });
    chrome.windows.create({url:defaultURL,state:"normal"});
    chrome.tabs.remove(defaultID);
    two = false;
}

function maximizeWindow(){
    chrome.windows.getAll({},function(windows){
        windows.forEach( function(window){
            if(window.focused)
                chrome.windows.update(window.id, {state:"minimized"});
            else
                chrome.windows.update(window.id, {state:"normal"});
        });
    });
    two = true;
}