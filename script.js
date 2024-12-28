// Sample manifest data
const manifest = {
    images: {
      root: [
        { path: "image/gradient.png", name: "Gradient" },
        { path: "image/logo-bg.png", name: "Logo Background" },
        { path: "image/logo.png", name: "Logo" }
      ],
      background: [
        { path: "image/background/BG-Slide-1.webp", name: "BG Slide 1" },
        { path: "image/background/BG-Slide-2.webp", name: "BG Slide 2" },
        { path: "image/background/BG-Slide-3.webp", name: "BG Slide 3" },
        { path: "image/background/BG-Slide-4.webp", "name": "BG Slide 4" }
      ],
      favicon: [
        { path: "image/favicon/android-chrome-192x192.png", name: "Android Chrome 192x192" },
        { path: "image/favicon/android-chrome-512x512.png", name: "Android Chrome 512x512" },
        { path: "image/favicon/apple-touch-icon.png", name: "Apple Touch Icon" },
        { path: "image/favicon/favicon-16x16.png", name: "Favicon 16x16" },
        { path: "image/favicon/favicon-32x32.png", name: "Favicon 32x32" },
        { path: "image/favicon/favicon.ico", name: "Favicon ICO" },
        { path: "image/favicon/site.webmanifest", name: "Site Web Manifest" }
      ]
    }
  };
  
  // DOM elements
  const searchInput = document.getElementById('search-input');
  const foldersContainer = document.getElementById('folders');
  const fileListContainer = document.getElementById('file-list');
  
  // Function to display folders and files
  function displayFoldersAndFiles() {
    // Display folders (main categories like 'images')
    Object.keys(manifest).forEach(folderKey => {
      const folderDiv = document.createElement('div');
      folderDiv.classList.add('folder');
      folderDiv.textContent = folderKey.charAt(0).toUpperCase() + folderKey.slice(1); // Capitalize the folder name
      folderDiv.onclick = () => displaySubFoldersAndFiles(folderKey);
      foldersContainer.appendChild(folderDiv);
    });
  }
  
  // Function to display files in the selected folder and its subfolders
  function displaySubFoldersAndFiles(folderKey) {
    const subFolders = manifest[folderKey];
    fileListContainer.innerHTML = ''; // Clear previous file list
    
    // Display subfolders (e.g., background, favicon)
    Object.keys(subFolders).forEach(subFolder => {
      const subFolderDiv = document.createElement('div');
      subFolderDiv.classList.add('folder');
      subFolderDiv.textContent = subFolder.charAt(0).toUpperCase() + subFolder.slice(1); // Capitalize the subfolder name
      subFolderDiv.onclick = () => displayFilesInSubFolder(subFolder, subFolders[subFolder]);
      foldersContainer.appendChild(subFolderDiv);
    });
  }
  
  // Function to display files in a subfolder
  function displayFilesInSubFolder(subFolder, files) {
    fileListContainer.innerHTML = ''; // Clear previous file list
    
    files.forEach(file => {
      const listItem = document.createElement('li');
      
      // Create a thumbnail (placeholder for now)
      const img = document.createElement('img');
      img.src = `https://files.spectracraft.com.au/${file.path}`;
      img.alt = file.name;
  
      // Create a link to download or view the file
      const fileLink = document.createElement('a');
      fileLink.href = `https://files.spectracraft.com.au/${file.path}`;
      fileLink.target = "_blank";
      fileLink.textContent = file.name;
  
      // Append thumbnail and link to the list item
      listItem.appendChild(img);
      listItem.appendChild(fileLink);
  
      fileListContainer.appendChild(listItem);
    });
  }
  
  // Function to handle search functionality
  function handleSearch() {
    const query = searchInput.value.toLowerCase();
    
    // Filter and display files based on the search query
    fileListContainer.innerHTML = ''; // Clear previous file list
    
    // Search through all folders and files
    Object.keys(manifest).forEach(folderKey => {
      const subFolders = manifest[folderKey];
      
      Object.keys(subFolders).forEach(subFolder => {
        const filteredFiles = subFolders[subFolder].filter(file =>
          file.name.toLowerCase().includes(query)
        );
        
        if (filteredFiles.length > 0) {
          filteredFiles.forEach(file => {
            const listItem = document.createElement('li');
            
            const img = document.createElement('img');
            img.src = `https://files.spectracraft.com.au/${file.path}`;
            img.alt = file.name;
  
            const fileLink = document.createElement('a');
            fileLink.href = `https://files.spectracraft.com.au/${file.path}`;
            fileLink.target = "_blank";
            fileLink.textContent = file.name;
  
            listItem.appendChild(img);
            listItem.appendChild(fileLink);
  
            fileListContainer.appendChild(listItem);
          });
        }
      });
    });
  }
  
  // Event listener for search input
  searchInput.addEventListener('input', handleSearch);
  
  // Initial display of folders
  displayFoldersAndFiles();
  