
# 🎬 YouTube Popup Extension

A lightweight Chrome extension that enables users to open YouTube videos in a separate popup window, allowing for multitasking and an uninterrupted viewing experience.

## 🚀 Features

- **Popup Video Player**: Open any YouTube video in a standalone popup window.
- **Minimal Interface**: Provides a clean and distraction-free viewing environment.
- **Easy to Use**: Simple interface with intuitive controls.

## 🛠️ Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/saikowluru2005/Youtube-popup-extension.git
   ```

2. **Load Extension in Chrome**:

   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" (toggle switch in the top right)
   - Click on "Load unpacked"
   - Select the directory where you cloned the repository

3. **Using the Extension**:

   - Navigate to any YouTube video
   - Click on the extension icon in the Chrome toolbar
   - The video will open in a new popup window

## 📁 Project Structure

```plaintext
Youtube-popup-extension/
├── content.js
├── convert.html
├── create_icon.html
├── icon.svg
├── icon16.png
├── manifest.json
├── popup.html
├── popup.js
├── save_icon.js
└── styles.css
```

- **manifest.json**: Defines the extension's metadata and permissions
- **popup.html / popup.js**: Handles the popup window's UI and functionality
- **content.js**: Injects scripts into YouTube pages to facilitate the popup feature
- **styles.css**: Styling for the extension's UI components

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
