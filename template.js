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

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		console.log("RECEIVED");

		if(request.action == "fill-list") {
			var data = request.data;
			createListItems(data);
		}
	}
);