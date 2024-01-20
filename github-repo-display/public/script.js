// script.js
async function getRepos() {
    const username = document.getElementById('username').value;
    const perPage = document.getElementById('perPage').value;
    const search = document.getElementById('search').value;
    const repoList = document.getElementById('repoList');
    const loader = document.getElementById('loader');
  
    try {
      loader.style.display = 'block';
  
      const response = await fetch(`/repos/${username}?perPage=${perPage}&search=${search}`);
      const repos = await response.json();
  
      repoList.innerHTML = '';
  
      if (repos.length === 0) {
        repoList.innerHTML = '<li>No repositories found.</li>';
      } else {
        repos.forEach(repo => {
          const listItem = document.createElement('li');
          listItem.innerHTML = `<strong>${repo.name}</strong>: ${repo.description} - <a href="${repo.url}" target="_blank">View on GitHub</a>`;
          if (repo.topics.length > 0) {
            listItem.innerHTML += `<br>Topics: ${repo.topics.join(', ')}`;
          }
          repoList.appendChild(listItem);
        });
      }
    } catch (error) {
      console.error('Error fetching repositories:', error);
      repoList.innerHTML = '<li>Error fetching repositories. Please try again later.</li>';
    } finally {
      loader.style.display = 'none';
    }
  }
  
  