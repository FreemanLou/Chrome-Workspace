function saveAll() {
	var openTabs = [];

	chrome.tabs.query({}, function(tabs){
		for (var i = 0; i < tabs.length; i++) {
			openTabs[i] = tabs[i];
		}


	});
}

function saveRange() {

}

function deleteTab(id) {
	chrome.tabs.remove(id);
}

function createSavedPage(tabsToSave) {
	
}



var saveAllButton = document.getElementById("select-all-tabs");
saveAllButton.addEventListener("click", saveAll);
