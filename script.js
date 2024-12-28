async function fetchManifest() {
    try {
      const response = await fetch('manifest.json');
      const data = await response.json();
      return data.files;
    } catch (error) {
      console.error('Error fetching manifest:', error);
      return [];
    }
  }
  
  function searchFiles(files, query) {
    return files.filter(file => file.toLowerCase().includes(query.toLowerCase()));
  }
  
  async function setupSearch() {
    const files = await fetchManifest();
    const searchInput = document.getElementById('search');
    const resultsList = document.getElementById('results');
  
    searchInput.addEventListener('input', () => {
      const query = searchInput.value;
      const results = searchFiles(files, query);
  
      resultsList.innerHTML = results.map(file => 
        `<li><a href="${file}" target="_blank">${file}</a></li>`
      ).join('');
    });
  }
  
  setupSearch();
  