function createListItems(tabs) {
	var list = document.getElementById("link-list");

	for(var i = 0, j = tabs.length; i < j; i++) {
		var listNode = document.createElement("li");
		listNode.classList.add("list-group-item");

		var icon = document.createElement("img");
		icon.classList.add("icon");
		var iconUrl = tabs[i].favIconUrl;
		icon.src = iconUrl;

		var link = document.createElement("a");
		link.href = tabs[i].url;
		link.innerHTML = tabs[i].title;
		link.target = "_blank"; //Opens link in new tab

		//Adds <img> and <a> to <li> and <li> to <ul>
		listNode.appendChild(icon);
		listNode.appendChild(link);
		list.appendChild(listNode);
	}
}


function clearList() {
	var list = document.getElementById("link-list");
	while (list.firstChild) {
		list.removeChild(list.firstChild);
	}
}


function restoreTabs() {
	var links = document.links;
	var numLinks = links.length;

	if (numLinks > 0) {
		for(var i = 0; i < numLinks; i++)
			window.open(links[i].href);
	}

	//Clear local storage
	chrome.storage.local.remove("saved-tabs");

	window.close();	
}


var restoreBtn = document.getElementById("restore-button");
restoreBtn.addEventListener("click", restoreTabs);

//Check local storage first
var currentlySaved = 0;

chrome.storage.local.get("saved-tabs", function(data) {
	//Check to see if data is empty
	if (Object.keys(data).length == 0)
		return;
	else {
		currentlySaved = data["saved-tabs"] ;
		createListItems(currentlySaved);
	}
});


chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		var data = request.data;

		if(request.action == "fill-list-new-data" && data != currentlySaved) {
			clearList();

			//Save to local storage
			chrome.storage.local.set({"saved-tabs":data});

			//Pass data to fill in <ul>
			createListItems(data);
		}
	}
);