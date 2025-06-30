// posts.js - 博客文章数据和管理

// 博客文章数据
let postsData = [
    {
        id: 1,
        title: '《花咲workspring！》',
        author: 'Gui',
        date: '2023/4/3',
        excerpt: '今天看好了《花咲workspring！》，这是一款充满青春活力的校园恋爱游戏...',
        content: '完整的文章内容...',
        tags: ['游戏', '视觉小说', '校园']
    },
    {
        id: 2,
        title: '《天使的心跳》',
        author: 'Hero',
        date: '2023/4/5',
        excerpt: '今天看好了《天使的心跳》，这是一部令人感动的动画作品...',
        content: '完整的文章内容...',
        tags: ['动画', '催泪', '奇幻']
    },
    {
        id: 3,
        title: '《灰与幻想的格林姆迪尔》',
        author: 'Hero',
        date: '2023/4/31',
        excerpt: '今天看好了《灰与幻想的格林姆迪尔》，这部作品展现了一个真实的奇幻世界...',
        content: '完整的文章内容...',
        tags: ['动画', '奇幻', '冒险']
    },
    {
        id: 4,
        title: '《少女歌剧》',
        author: 'Mieru',
        date: '2023/6/29',
        excerpt: '今天看好了《少女歌剧》，这部作品以其独特的舞台表现和深刻的情感打动了我...',
        content: '完整的文章内容...',
        tags: ['动画', '音乐', '舞台剧']
    }
];

// 标签数据
const tagsData = [
    { name: '游戏', count: 12 },
    { name: '动画', count: 18 },
    { name: '视觉小说', count: 7 },
    { name: '校园', count: 5 },
    { name: '催泪', count: 9 },
    { name: '奇幻', count: 15 },
    { name: '冒险', count: 8 },
    { name: '音乐', count: 6 },
    { name: '舞台剧', count: 4 }
];

// 获取所有文章
function getAllPosts() {
    return postsData;
}

// 根据ID获取文章
function getPostById(id) {
    return postsData.find(post => post.id == id);
}

// 添加新文章
function addNewPost(post) {
    const newId = Math.max(...postsData.map(p => p.id), 0) + 1;
    const newPost = {
        id: newId,
        ...post
    };
    postsData.unshift(newPost);
    return newPost;
}

// 更新文章
function updatePost(id, updatedData) {
    const index = postsData.findIndex(post => post.id == id);
    if (index !== -1) {
        postsData[index] = { ...postsData[index], ...updatedData };
        return postsData[index];
    }
    return null;
}

// 删除文章
function deletePost(id) {
    const initialLength = postsData.length;
    postsData = postsData.filter(post => post.id != id);
    return initialLength > postsData.length;
}

// 获取所有标签
function getAllTags() {
    return tagsData;
}

// 获取标签对应的文章
function getPostsByTag(tagName) {
    return postsData.filter(post => post.tags.includes(tagName));
}