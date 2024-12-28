async function fetchManifest() {
    try {
      const response = await fetch('manifest.json');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching manifest:', error);
      return {};
    }
  }
  
  function formatFileName(path) {
    const fileName = path.split('/').pop().split('.')[0];
    return fileName.charAt(0).toUpperCase() + fileName.slice(1);
  }
  
  function renderFolders(manifest) {
    const foldersDiv = document.getElementById('folders');
    foldersDiv.innerHTML = '';
  
    for (const section in manifest) {
      const folderDiv = document.createElement('div');
      folderDiv.className = 'folder';
      folderDiv.textContent = section.charAt(0).toUpperCase() + section.slice(1);
      folderDiv.addEventListener('click', () => renderFiles(manifest[section], section));
      foldersDiv.appendChild(folderDiv);
    }
  }
  
  function getThumbnail(file) {
    const fileExtension = file.split('.').pop().toLowerCase();
  
    if (fileExtension === 'png' || fileExtension === 'jpg' || fileExtension === 'jpeg') {
      return `https://files.spectracraft.com.au/${file}`;
    }
  
    if (fileExtension === 'pdf') {
      return 'https://upload.wikimedia.org/wikipedia/commons/3/3b/PDF_icon.svg';
    }
  
    if (fileExtension === 'exe') {
      return 'https://upload.wikimedia.org/wikipedia/commons/9/91/Windows_Icon.png';
    }
  
    return 'https://upload.wikimedia.org/wikipedia/commons/1/12/File_icon.svg';
  }
  
  function renderFiles(files, folderName) {
    const resultsList = document.getElementById('results');
    resultsList.innerHTML = `<h2 style="text-align: center; margin-bottom: 20px;">${folderName.charAt(0).toUpperCase() + folderName.slice(1)}</h2>` +
      files.map(file => {
        const url = folderName === 'images'
          ? `https://files.spectracraft.com.au/${file}`
          : file;
  
        const thumbnail = getThumbnail(file);
  
        return `
          <a href="${url}" target="_blank">${formatFileName(file)}
          <li>
            <img src="${thumbnail}" alt="${file}">
          </li>
          </a>`;
      }).join('');
  }
  
  async function setupExplorer() {
    const manifest = await fetchManifest();
    renderFolders(manifest);
  }
  
  setupExplorer();
  