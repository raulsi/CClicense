/*
Copyright 2015 Rahul Singh

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
 */
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.status == 'complete') {
        // Execute some script when the page is fully (DOM) ready
        //chrome.tabs.executeScript(null, {code:"init();"});
        chrome.tabs.sendMessage(tabId, {greeting: "hello"}, function(response) {
			var bd = document.createElement('html');
			if(response != undefined){
				bd.innerHTML=response.doc;
				va=$(response.doc).find('a');
				bd=null;
				$.each(va,function(k,v){
					var patt = new RegExp("license");
					if(patt.test($(v).attr('rel'))){
						var patt = new RegExp("creativecommons.org");
						if(patt.test($(v).attr('href'))){
							chrome.pageAction.show(tabId);			
						}
					}
				});
			}
		});
    }
});