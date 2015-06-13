function saveAll() {
	var openTabs = [];

	chrome.tabs.query({}, function(tabs) {
		for (var i = 0; i < tabs.length; i++)
			openTabs[i] = tabs[i];

		createSavedPage(openTabs);

		// for(var i = 0; i < openTabs.length; i++) {
		// 	var id = openTabs[i].id;
		// 	deleteTab(id);
		// }
	});
}

function deleteTab(id) {
	chrome.tabs.remove(id);
}


function createSavedPage(tabsToSave) {
	chrome.tabs.create({"url": chrome.extension.getURL("template.html"), "active": false}, 
		function(tab) {
			chrome.tabs.onUpdated.addListener(function(tabId, info) {
				if(tabId == tab.id && info.status == "complete")
					chrome.tabs.sendMessage(tab.id, {"action": "fill-list-new-data", "data": tabsToSave});
			});
		}
	);
}


var saveAllButton = document.getElementById("select-all-tabs");
saveAllButton.addEventListener("click", saveAll);
