
const rssUrl = 'https://rss.blog.naver.com/beonfascicles.xml';
const apiKey = ''; // 여기에 필요시 rss2json API key를 넣으세요
const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}${apiKey ? '&api_key=' + apiKey : ''}`;

fetch(apiUrl)
  .then(res => res.json())
  .then(data => {
    console.log("RSS DATA:", data);
    const container = document.getElementById('blog-list');
    if (!data.items || data.items.length === 0) {
      container.innerHTML = "표시할 블로그 글이 없습니다.";
      return;
    }
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
