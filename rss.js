
const rssUrl = 'https://rss.blog.naver.com/beonfascicles.xml';
const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;

// helper: <description>에서 첫 <img src="..."> 추출
function extractFirstImageFromDescription(description) {
  const div = document.createElement('div');
  div.innerHTML = description;
  const img = div.querySelector('img');
  return img && img.src ? img.src : 'https://via.placeholder.com/400x200?text=No+Image';
}

fetch(apiUrl)
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('blog-list');
    container.innerHTML = "";
    data.items.forEach(item => {
      const imageUrl = extractFirstImageFromDescription(item.description);

      const blogItem = document.createElement('div');
      blogItem.className = 'blog-card';

      blogItem.innerHTML = `
        <img src="${imageUrl}" class="thumb" alt="썸네일">
        <div class="blog-text">
          <h3><a href="${item.link}" target="_blank">${item.title}</a></h3>
          <p class="date">${new Date(item.pubDate).toLocaleDateString()}</p>
          <p class="snippet">${item.description.replace(/<[^>]*>?/gm, '').slice(0, 100)}...</p>
        </div>
      `;

      container.appendChild(blogItem);
    });
  })
  .catch(error => {
    console.error("RSS 불러오기 실패:", error);
    document.getElementById('blog-list').innerHTML = "블로그 글을 불러오는 데 실패했습니다.";
  });
