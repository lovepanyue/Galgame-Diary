// admin.js - 管理后台功能

// 初始化管理后台
function initAdminDashboard() {
    // 加载文章统计
    document.querySelector('.stat-card:nth-child(1) h3').textContent = postsData.length;
    document.querySelector('.stat-card:nth-child(2) h3').textContent = tagsData.length;
    
    // 加载最近文章
    loadRecentPosts();
    
    // 设置表单提交事件
    setupPostForm();
}

// 加载最近文章
function loadRecentPosts() {
    const tableBody = document.querySelector('.admin-table tbody');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    // 只显示最近3篇文章
    const recentPosts = postsData.slice(0, 3);
    
    recentPosts.forEach(post => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${post.title}</td>
            <td>${post.author}</td>
            <td>${post.date}</td>
            <td>${post.tags.map(tag => `<span class="table-tag">${tag}</span>`).join(' ')}</td>
            <td>
                <button class="btn-icon edit-post" data-id="${post.id}"><i class="fas fa-edit"></i></button>
                <button class="btn-icon delete-post" data-id="${post.id}"><i class="fas fa-trash"></i></button>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
    
    // 添加编辑和删除事件
    document.querySelectorAll('.edit-post').forEach(btn => {
        btn.addEventListener('click', function() {
            const postId = this.getAttribute('data-id');
            editPost(postId);
        });
    });
    
    document.querySelectorAll('.delete-post').forEach(btn => {
        btn.addEventListener('click', function() {
            const postId = this.getAttribute('data-id');
            deletePost(postId);
        });
    });
}

// 设置文章表单
function setupPostForm() {
    const form = document.querySelector('.post-form');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const title = document.getElementById('post-title').value;
        const author = document.getElementById('post-author').value;
        const date = document.getElementById('post-date').value;
        const excerpt = document.getElementById('post-excerpt').value;
        const content = document.getElementById('post-content').value;
        
        // 获取标签
        const tags = [];
        document.querySelectorAll('.tags-container .tag').forEach(tag => {
            tags.push(tag.textContent.trim().replace('×', ''));
        });
        
        if (!title || !content) {
            alert('标题和内容不能为空');
            return;
        }
        
        // 创建新文章
        const newPost = {
            id: postsData.length + 1,
            title,
            author,
            date: date || new Date().toISOString().split('T')[0].replace(/-/g, '/'),
            excerpt,
            content,
            tags
        };
        
        // 添加到文章数据
        postsData.unshift(newPost);
        
        // 显示成功消息
        alert('文章发布成功!');
        
        // 重置表单
        form.reset();
        document.querySelector('.tags-container').innerHTML = '';
        
        // 刷新最近文章列表
        loadRecentPosts();
    });
    
    // 标签输入功能
    const tagInput = document.querySelector('.tag-input');
    tagInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && this.value.trim()) {
            e.preventDefault();
            
            const tagValue = this.value.trim();
            const tagElement = document.createElement('span');
            tagElement.className = 'tag';
            tagElement.innerHTML = `${tagValue} <i class="fas fa-times"></i>`;
            
            tagElement.querySelector('i').addEventListener('click', function() {
                tagElement.remove();
            });
            
            document.querySelector('.tags-container').insertBefore(
                tagElement, 
                document.querySelector('.tag-input')
            );
            
            this.value = '';
        }
    });
}

// 编辑文章
function editPost(postId) {
    const post = postsData.find(p => p.id == postId);
    if (!post) return;
    
    // 填充表单
    document.getElementById('post-title').value = post.title;
    document.getElementById('post-author').value = post.author;
    document.getElementById('post-date').value = post.date.replace(/\//g, '-');
    document.getElementById('post-excerpt').value = post.excerpt;
    document.getElementById('post-content').value = post.content;
    
    // 填充标签
    const tagsContainer = document.querySelector('.tags-container');
    tagsContainer.innerHTML = '';
    
    post.tags.forEach(tag => {
        const tagElement = document.createElement('span');
        tagElement.className = 'tag';
        tagElement.innerHTML = `${tag} <i class="fas fa-times"></i>`;
        
        tagElement.querySelector('i').addEventListener('click', function() {
            tagElement.remove();
        });
        
        tagsContainer.appendChild(tagElement);
    });
    
    // 滚动到表单
    document.querySelector('.post-form').scrollIntoView({ behavior: 'smooth' });
}

// 删除文章
function deletePost(postId) {
    if (!confirm('确定要删除这篇文章吗？')) return;
    
    const index = postsData.findIndex(p => p.id == postId);
    if (index !== -1) {
        postsData.splice(index, 1);
        loadRecentPosts();
        alert('文章已删除');
    }
}

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', initAdminDashboard);