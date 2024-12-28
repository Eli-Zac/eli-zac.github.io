// Sample manifest data
const manifest = {
    images: [
      { path: "image/logo.png", name: "Logo" },
      { path: "image/banner.png", name: "Banner" },
    ],
    files: [
      { path: "file/document.txt", name: "Document" },
      { path: "file/readme.pdf", name: "ReadMe" },
    ]
  };
  
  // DOM elements
  const searchInput = document.getElementById('search-input');
  const foldersContainer = document.getElementById('folders');
  const fileListContainer = document.getElementById('file-list');
  
  // Function to display folders and files
  function displayFoldersAndFiles() {
    // Display folders (images and files)
    const folderNames = Object.keys(manifest);
    foldersContainer.innerHTML = ''; // Clear previous folders
    
    folderNames.forEach(folder => {
      const folderDiv = document.createElement('div');
      folderDiv.classList.add('folder');
      folderDiv.textContent = folder.charAt(0).toUpperCase() + folder.slice(1); // Capitalize the folder name
      folderDiv.onclick = () => displayFilesInFolder(folder);
      foldersContainer.appendChild(folderDiv);
    });
  }
  
  // Function to display files in the selected folder
  function displayFilesInFolder(folder) {
    const files = manifest[folder];
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
    const folderNames = Object.keys(manifest);
    fileListContainer.innerHTML = ''; // Clear previous file list
    
    folderNames.forEach(folder => {
      const filteredFiles = manifest[folder].filter(file =>
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
  }
  
  // Event listener for search input
  searchInput.addEventListener('input', handleSearch);
  
  // Initial display of folders
  displayFoldersAndFiles();
  