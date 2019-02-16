var blacklistedIds = ["none"];

/*var div = document.createElement('div');
div.setAttribute('position', 'float');
div.innerHTML = request.myCustomMessage;
document.getElementById('log').appendChild(div);
*/
chrome.runtime.onMessageExternal.addListener(
  function(request, sender, sendResponse) {
    if (sender.id in blacklistedIds) {
      sendResponse({"result":"sorry, could not process your message"});
      return;  // don't allow this extension access
    } else if (request.myCustomMessage) {
        //new Notification('Got message from '+sender.id,  { body: request.myCustomMessage });
		chrome.runtime.sendMessage({message: request.myCustomMessage}, function(response){});
		chrome.tabs.create({url: chrome.extension.getURL('index.html')});
    } else {
      sendResponse({"result":"Ops, I don't understand this message"});
    }
  });

