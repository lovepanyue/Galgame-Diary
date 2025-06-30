// 加载所有文章
document.addEventListener('DOMContentLoaded', function() {
    loadAllPosts();
    
    // 搜索功能
    document.getElementById('search-button').addEventListener('click', searchPosts);
    document.getElementById('search-input').addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            searchPosts();
        }
    });
});

// 加载所有文章
function loadAllPosts() {
    const archiveList = document.getElementById('archive-list');
    archiveList.innerHTML = '';
    
    postsData.forEach(post => {
        const tagsHtml = post.tags.map(tag => 
            `<a href="tags.html?tag=${tag}" class="post-tag">${tag}</a>`
        ).join('');
        
        const postElement = `
            <article class="post-item archive-item">
                <div class="post-header">
                    <h3 class="post-title">${post.title}</h3>
                    <div class="post-meta">
                        <span class="post-author">${post.author}</span>
                        <span class="post-date">
                            <i class="far fa-calendar"></i> ${post.date}
                        </span>
                    </div>
                </div>
                <div class="post-content">
                    <p>${post.excerpt}</p>
                </div>
                <div class="post-tags">
                    ${tagsHtml}
                </div>
            </article>
        `;
        
        archiveList.innerHTML += postElement;
    });
}

// 搜索文章
function searchPosts() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const archiveList = document.getElementById('archive-list');
    archiveList.innerHTML = '';
    
    const filteredPosts = postsData.filter(post => {
        return (
            post.title.toLowerCase().includes(searchTerm) ||
            post.excerpt.toLowerCase().includes(searchTerm) ||
            post.tags.some(tag => tag.toLowerCase().includes(searchTerm))
        );
    });
    
    if (filteredPosts.length === 0) {
        archiveList.innerHTML = '<div class="no-results">没有找到匹配的文章</div>';
        return;
    }
    
    filteredPosts.forEach(post => {
        const tagsHtml = post.tags.map(tag => 
            `<a href="tags.html?tag=${tag}" class="post-tag">${tag}</a>`
        ).join('');
        
        const postElement = `
            <article class="post-item archive-item">
                <div class="post-header">
                    <h3 class="post-title">${post.title}</h3>
                    <div class="post-meta">
                        <span class="post-author">${post.author}</span>
                        <span class="post-date">
                            <i class="far fa-calendar"></i> ${post.date}
                        </span>
                    </div>
                </div>
                <div class="post-content">
                    <p>${post.excerpt}</p>
                </div>
                <div class="post-tags">
                    ${tagsHtml}
                </div>
            </article>
        `;
        
        archiveList.innerHTML += postElement;
    });
}