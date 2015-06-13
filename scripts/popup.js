function saveAll() {
	var openTabs = [];

	chrome.tabs.query({}, function(tabs) {
		for (var i = 0; i < tabs.length; i++)
			openTabs[i] = tabs[i];

		createSavedPage(openTabs);
	});
}

function deleteTabs(tabs) {
	for(var i = 0; i < tabs.length; i++)
		chrome.tabs.remove(tabs[i].id);
}


function createSavedPage(tabsToSave) {
	chrome.tabs.create({"url": chrome.extension.getURL("template.html"), "active": false}, 
		function(tab) {
			console.log(tabsToSave);
			chrome.tabs.onUpdated.addListener(function(tabId, info) {
				if(tabId == tab.id && info.status == "complete") {
					chrome.tabs.sendMessage(tab.id, {"action": "fill-list-new-data", "data": tabsToSave});

					//Clean Up tabs
					deleteTabs(tabsToSave);
				}
			});
		}
	);
}


var saveAllButton = document.getElementById("select-all-tabs");
saveAllButton.addEventListener("click", saveAll);
