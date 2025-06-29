
const rssUrl = 'https://rss.blog.naver.com/beonfascicles.xml';
const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;

fetch(apiUrl)
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('blog-list');
    container.innerHTML = "";
    data.items.forEach(item => {
      const imgMatch = item.description.match(/<img.*?src="(.*?)"/);
      const imageUrl = imgMatch ? imgMatch[1] : '';

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
    document.getElementById('blog-list').innerHTML = "불러오는 데 실패했습니다.";
  });
