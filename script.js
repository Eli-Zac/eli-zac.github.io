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
  
  function renderFiles(files, folderName) {
    const resultsList = document.getElementById('results');
    resultsList.innerHTML = `<h2>${folderName.charAt(0).toUpperCase() + folderName.slice(1)}</h2>` +
      files.map(file => {
        const url = folderName === 'images'
          ? `https://files.spectracraft.com.au/${file}`
          : file;
  
        return `<li><a href="${url}" target="_blank">${formatFileName(file)}</a></li>`;
      }).join('');
  }
  
  async function setupExplorer() {
    const manifest = await fetchManifest();
    renderFolders(manifest);
  }
  
  setupExplorer();
  