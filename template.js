function createListItems(tabs) {
	var list = document.getElementById("link-list");

	for(var i = 0, j = tabs.length; i < j; i++) {
		var listNode = document.createElement("li");
		var link = document.createElement("a");

		link.href = tabs[i].url;
		link.innerHTML = tabs[i].title;
		link.target = "_blank"; //Opens link in new tab

		//Adds <a> to <li> and <li> to <ul>
		listNode.appendChild(link);
		list.appendChild(listNode);
	}
}


function restoreTabs() {
	var links = document.links;
	var numLinks = links.length;

	if (numLinks > 0) {
		for(var i = 0; i < numLinks; i++)
			window.open(links[i].href);
	}
}


var restoreBtn = document.getElementById("restore-button");
restoreBtn.addEventListener("click", restoreTabs);


//If template.html is opened without popup.js 
//By restarting browser/refreshing
//Use local storage


chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		if(request.action == "fill-list-new-data") {
			var data = request.data;

			//Save to local storage
			chrome.storage.local.set({"saved-tabs":data});

			//Pass data to fill in <ul>
			createListItems(data);
		}
	}
);
