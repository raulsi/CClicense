chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
		var aurl="";
		var d = window.document.all[0];
		var hd=[].slice.call(d.childNodes);
        if (request.greeting == "hello"){
            sendResponse({doc: d.innerHTML});
		}
		else{
			sendResponse({});
		}
});