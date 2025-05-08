const { app, BrowserWindow } = require("electron");
const path = require("path");

function createWindow() {
  // Create the browser window
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // Set path to the built React app's index.html
  const filePath = path.join(__dirname, "../dist/index.html");
  console.log("Loading file:", filePath); // Log the file path for debugging

  // Load the file from the dist folder
  win.loadFile(filePath).catch((err) => {
    console.error("Failed to load file:", err); // Log any errors
  });

}

// When Electron is ready, create the window
app.whenReady().then(() => {
  createWindow();

  // On macOS, reopen the window when clicked in the dock
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit the app when all windows are closed (except on macOS)
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
