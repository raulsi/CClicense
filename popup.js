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
window.onload = function(e) {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
			var bd = document.createElement('html');
			if(response != undefined){
				bd.innerHTML=response.doc;
				va=$(response.doc).find('a');
				bd=null;
				var i=0;
				$.each(va,function(k,v){
					var patt = new RegExp("license");
					if(patt.test($(v).attr('rel'))){
						var patt = new RegExp("creativecommons.org");
						if(patt.test($(v).attr('href'))){
							i++;
							var ne = $(document.createElement('div'));
							var al = $(document.createElement('a'));
							var lbl = $(document.createElement('label'));
							al.attr('href',$(v).attr('href'));
							al.text('license'+i);
							al.bind( "click",golink);
							lbl.text($(v).attr('title'));
							lbl.css('font-size','75%');
							ne.append(al);
							ne.append('<br/>');
							ne.append(lbl);
							$('#cclicense').append(ne);		
						}
					}
				});
				$('#content').append(i+' License Available this Page:');
			}
	    });
	});
}
function golink(){
	var patt = new RegExp("http");
	if(patt.test($(this).attr('href'))) chrome.tabs.update({url: $(this).attr('href')});
	else chrome.tabs.update({url: 'https:'+$(this).attr('href')});
}
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('btn').addEventListener('focusin', golink);
});