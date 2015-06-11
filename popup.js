function saveAll() {
	var openTabs = [];

	chrome.tabs.query({}, function(tabs) {
		for (var i = 0; i < tabs.length; i++) {
			openTabs[i] = tabs[i];
			//WORKS console.log(tabs[i].url)
			//WORKS console.log(openTabs[i].url);
		}

		createSavedPage(openTabs);

		// for(var i = 0; i < openTabs.length; i++) {
		// 	var id = openTabs[i].id;
		// 	deleteTab(id);
		// }
	});
}


function saveRange(min, max) {
	var openTabs = [];

	chrome.tabs.query({}, function(tabs){
		for (var i = min; i < max; i++) {
			openTabs[i] = tabs[i];
		}

		createSavedPage(openTabs);

		//I should probably refactor this and the other part. Maybe have only one save function
		for(var i = min; i < max; i++) {
 			var id = openTabs[i].id;
 			deleteTab(id);
		}	
	});
}


function deleteTab(id) {
	chrome.tabs.remove(id);
}


function createSavedPage(tabsToSave) {
	chrome.tabs.create({"url": chrome.extension.getURL("template.html"), "active": false}, 
		function(tab) {
			console.log(tab.url);
			sendListToPage(tab, tabsToSave);
		}
	);
}


function sendListToPage(tab, tabsArray) {
	chrome.tabs.sendMessage(tab.id, {"action": "fill-list", "data": tabsArray}, function() {
		console.log("MSG SENT");
		console.log(tab.id);
	});
}


var saveAllButton = document.getElementById("select-all-tabs");
saveAllButton.addEventListener("click", saveAll);
