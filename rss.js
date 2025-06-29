
const rssUrl = 'https://rss.blog.naver.com/beonfascicles.xml';
const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;

fetch(apiUrl)
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('blog-list');
    container.innerHTML = "";
    data.items.forEach(item => {
      const blogItem = document.createElement('div');
      blogItem.className = 'blog-card';

      blogItem.innerHTML = `
        <h3><a href="${item.link}" target="_blank">${item.title}</a></h3>
        <p class="date">${new Date(item.pubDate).toLocaleDateString()}</p>
        <p class="snippet">${item.description.replace(/<[^>]*>?/gm, '').slice(0, 100)}...</p>
      `;

      container.appendChild(blogItem);
    });
  })
  .catch(error => {
    console.error("RSS 불러오기 실패:", error);
    document.getElementById('blog-list').innerHTML = "블로그 글을 불러오는 데 실패했습니다.";
  });
