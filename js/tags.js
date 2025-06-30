// tags.js - 标签页面功能

// 加载所有标签
function loadAllTags() {
    const tagsContainer = document.getElementById('tags-container');
    if (!tagsContainer) return;
    
    tagsContainer.innerHTML = '';
    
    tagsData.forEach(tag => {
        const tagElement = document.createElement('div');
        tagElement.className = 'tag-item';
        tagElement.innerHTML = `
            <h3 class="tag-name">${tag.name}</h3>
            <span class="tag-count">${tag.count} 篇文章</span>
            <div class="tag-posts">
                <!-- 标签对应的文章将由JS加载 -->
            </div>
        `;
        
        tagsContainer.appendChild(tagElement);
        
        // 加载该标签的文章
        loadTagPosts(tag.name, tagElement.querySelector('.tag-posts'));
    });
}

// 加载标签对应的文章
function loadTagPosts(tagName, container) {
    const filteredPosts = postsData.filter(post => 
        post.tags.includes(tagName)
    );
    
    if (filteredPosts.length === 0) {
        container.innerHTML = '<p>该标签下暂无文章</p>';
        return;
    }
    
    container.innerHTML = '';
    
    filteredPosts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'tag-post-item';
        postElement.innerHTML = `
            <a href="#" class="tag-post-title">${post.title}</a>
            <div class="tag-post-meta">
                <span>${post.author}</span>
                <span>${post.date}</span>
            </div>
        `;
        
        container.appendChild(postElement);
    });
}

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', function() {
    loadAllTags();
});