document.addEventListener('DOMContentLoaded', function() {
  const videoUrlInput = document.getElementById('videoUrl');
  const playButton = document.getElementById('playButton');

  playButton.addEventListener('click', async () => {
    const videoUrl = videoUrlInput.value.trim();
    
    if (!videoUrl) {
      alert('Please enter a YouTube video URL');
      return;
    }

    // Extract video ID from URL
    const videoId = extractVideoId(videoUrl);
    if (!videoId) {
      alert('Invalid YouTube URL');
      return;
    }

    try {
      // Get all tabs
      const tabs = await chrome.tabs.query({});
      
      // Send message to each tab
      for (const tab of tabs) {
        try {
          // First try to inject the content script
          await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ['content.js']
          });
          
          // Then inject the CSS
          await chrome.scripting.insertCSS({
            target: { tabId: tab.id },
            files: ['styles.css']
          });
          
          // Finally send the message
          await chrome.tabs.sendMessage(tab.id, {
            action: 'playVideo',
            videoId: videoId
          });
        } catch (error) {
          console.error(`Error in tab ${tab.id}:`, error);
        }
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while trying to play the video');
    }
  });
});

function extractVideoId(url) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
} 