async function fetchManifest() {
    try {
      const response = await fetch('manifest.json');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching manifest:', error);
      return { images: [], files: [] };
    }
  }
  
  function formatFileName(path) {
    // Extract filename from the path
    const fileName = path.split('/').pop().split('.')[0];
    // Capitalize the first letter and return
    return fileName.charAt(0).toUpperCase() + fileName.slice(1);
  }
  
  function searchFiles(manifest, query) {
    const imageResults = manifest.images.filter(image =>
      image.toLowerCase().includes(query.toLowerCase())
    ).map(image => ({
      url: `https://files.spectracraft.com.au/${image}`,
      name: formatFileName(image)
    }));
  
    const fileResults = manifest.files.filter(file =>
      file.toLowerCase().includes(query.toLowerCase())
    ).map(file => ({
      url: file,
      name: formatFileName(file)
    }));
  
    return [...imageResults, ...fileResults];
  }
  
  async function setupSearch() {
    const manifest = await fetchManifest();
    const searchInput = document.getElementById('search');
    const resultsList = document.getElementById('results');
  
    searchInput.addEventListener('input', () => {
      const query = searchInput.value;
      const results = searchFiles(manifest, query);
  
      resultsList.innerHTML = results.map(result =>
        `<li><a href="${result.url}" target="_blank">${result.name}</a></li>`
      ).join('');
    });
  }
  
  setupSearch();
  