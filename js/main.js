// main.js - 主脚本功能

// 页面加载时执行
document.addEventListener('DOMContentLoaded', function() {
    // 滚动到内容区域
    const scrollDown = document.querySelector('.scroll-down');
    if (scrollDown) {
        scrollDown.addEventListener('click', function() {
            window.scrollTo({
                top: document.querySelector('.container').offsetTop,
                behavior: 'smooth'
            });
        });
    }
    
    // 加载博客文章
    loadLatestPosts();
    
    // 移动端菜单切换
    setupMobileMenu();
    
    // 登录表单交互
    setupLoginForm();
});

// 加载最新文章
function loadLatestPosts() {
    const postList = document.getElementById('post-list');
    if (!postList) return;
    
    // 获取最新3篇文章
    const latestPosts = postsData.slice(0, 3);
    
    latestPosts.forEach(post => {
        const tagsHtml = post.tags.map(tag => 
            `<a href="tags.html?tag=${tag}" class="post-tag">${tag}</a>`
        ).join('');
        
        const postElement = document.createElement('article');
        postElement.className = 'post-item';
        postElement.innerHTML = `
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
        `;
        
        postList.appendChild(postElement);
    });
}

// 设置移动端菜单
function setupMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            menuBtn.classList.toggle('active');
        });
    }
}

// 设置登录表单
function setupLoginForm() {
    const loginForm = document.querySelector('.login-form');
    if (!loginForm) return;
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        // 简单验证
        if (username && password) {
            // 在实际应用中，这里会有登录API调用
            alert(`欢迎回来，${username}！登录成功。`);
            
            // 跳转到管理后台
            window.location.href = 'admin.html';
        } else {
            alert('请输入用户名和密码！');
        }
    });
}

// 导航到页面
function navigateTo(page) {
    window.location.href = page;
}