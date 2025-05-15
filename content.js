let miniPlayer = null;

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'playVideo') {
    createMiniPlayer(request.videoId);
    // Send response to acknowledge receipt
    sendResponse({ success: true });
  }
  return true; // Keep the message channel open for async response
});

function createMiniPlayer(videoId) {
  // Remove existing player if any
  if (miniPlayer) {
    miniPlayer.remove();
  }

  // Create player container
  miniPlayer = document.createElement('div');
  miniPlayer.className = 'youtube-mini-player';
  
  // Create iframe for YouTube video
  const iframe = document.createElement('iframe');
  iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&rel=0&enablejsapi=1`;
  iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
  iframe.allowFullscreen = true;
  
  // Create close button
  const closeButton = document.createElement('button');
  closeButton.className = 'close-button';
  closeButton.innerHTML = '×';
  closeButton.onclick = () => {
    if (miniPlayer) {
      miniPlayer.remove();
      miniPlayer = null;
    }
  };
  
  // Create drag handle
  const dragHandle = document.createElement('div');
  dragHandle.className = 'drag-handle';
  
  // Assemble player
  miniPlayer.appendChild(closeButton);
  miniPlayer.appendChild(dragHandle);
  miniPlayer.appendChild(iframe);
  document.body.appendChild(miniPlayer);
  
  // Make player draggable
  makeDraggable(miniPlayer, dragHandle);

  // Ensure the player is visible
  miniPlayer.style.display = 'block';
}

function makeDraggable(element, handle) {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  
  handle.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    
    element.style.top = (element.offsetTop - pos2) + "px";
    element.style.left = (element.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
} 