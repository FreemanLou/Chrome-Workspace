function fillList(array) {
	var list = document.getElementById("link-list");
	for (item in array) {
		console.log(item);		
		// var iconSrc = "<img src=&quot;" + item.favIconUrl + "&quot;/>";
		// var listItem = "<li>" + item.title + " " + "<a href=&quot;" + item.url +
		// 	"&quot;>Link</a></li>";
		// console.log(iconSrc + listItem);
		// list.innerHtml += iconSrc + listItem;
	}
}

function showMsgReceieved() {
	console.log("RECEIVED")
}

chrome.runtime.onMessage.addListener(
	function(request, sender, showMsgReceieved) {
		if(request.action == "fill-list") {
			var data = request.data;
			fillList(data);
		}
});


function restoreTabs() {
	var listItems = document.getElementsByTagName("a");

	if (listItems.length > 0) {
		for(item in listItems) {
			window.open(item.href);
		}
	}
}

var restoreBtn = document.getElementById("restore-button");
restoreBtn.addEventListener("click", restoreTabs);