// ---- НАШИ ДАННЫЕ ----
// Это массив объектов. Каждый объект = одна статья.
// Вы можете легко добавлять новые, копируя блок между {} и меняя текст.
const posts = [
    {
        id: 1,
        title: "Первая запись в блоге",
        date: "3 марта 2026",
        excerpt: "Это краткое описание первого поста. Оно отображается на главной странице, чтобы заинтересовать читателя.",
        content: `
            <p>Это текст моей первой статьи. Здесь я могу написать о чем угодно. В этом блоке можно использовать HTML-теги для форматирования.</p>

            <h2>Почему минимализм — это хорошо</h2>
            <p>Минимализм в дизайне сайтов помогает читателю сосредоточиться на главном — на тексте. Никаких отвлекающих баннеров и ярких кнопок.</p>

            <blockquote>«Хороший дизайн — это как можно меньше дизайна.» — Дитер Рамс</blockquote>

            <p>Также можно делать списки:</p>
            <ul>
                <li>Простота</li>
                <li>Читаемость</li>
                <li>Скорость загрузки</li>
            </ul>

            <p>И это именно то, что мы ценим в платформах вроде Teletype.</p>
        `,
        slug: "pervaya-zapis" // Уникальная часть адреса для этой статьи
    },
    {
        id: 2,
        title: "Как создать свой сайт",
        date: "4 марта 2026",
        excerpt: "Пошаговое руководство по созданию своего блога с нуля с помощью HTML, CSS и JavaScript.",
        content: `
            <p>Создать свой сайт не так сложно, как кажется. В этой статье мы разберем базовые шаги.</p>
            <p>Вам понадобятся: текстовый редактор (например, VS Code), базовое понимание HTML/CSS и желание учиться.</p>
            <h3>План действий:</h3>
            <ol>
                <li>Придумать структуру сайта.</li>
                <li>Написать HTML-каркас.</li>
                <li>Добавить стили в CSS.</li>
                <li>Оживить страницу с помощью JavaScript.</li>
                <li>Выложить всё на бесплатный хостинг (например, GitHub Pages).</li>
            </ol>
        `,
        slug: "kak-sozdat-sait"
    },
    {
        id: 3,
        title: "Выбор бесплатного хостинга",
        date: "5 марта 2026",
        excerpt: "Обзор лучших бесплатных хостингов для статических сайтов: GitHub Pages, Vercel, Netlify.",
        content: `
            <p>Когда сайт готов, его нужно показать миру. Для этого нужен хостинг. Для простых сайтов на HTML/CSS/JS отлично подходят бесплатные сервисы.</p>
            <p><strong>GitHub Pages</strong> — идеален для начала. Он бесплатен, надежен и интегрирован с системой контроля версий Git.</p>
            <p><strong>Netlify</strong> и <strong>Vercel</strong> предлагают больше возможностей для продвинутых разработчиков, но также имеют щедрые бесплатные тарифы.</p>
        `,
        slug: "besplatnyy-hosting"
    }
];

// ---- ЛОГИКА ДЛЯ ГЛАВНОЙ СТРАНИЦЫ (index.html) ----
function displayPostsOnMainPage() {
    // Находим контейнер, куда будем вставлять карточки постов
    const postsContainer = document.getElementById('posts-container');
    
    // Если мы не на главной странице (такого контейнера нет), то ничего не делаем
    if (!postsContainer) return;

    // Очищаем контейнер (убираем "Загрузка...")
    postsContainer.innerHTML = '';

    // Перебираем все посты из массива и создаем для каждого HTML-код карточки
    posts.forEach(post => {
        // Создаем ссылку на страницу поста, используя slug
        const postLink = `post.html?post=${post.slug}`;
        
        // Формируем HTML карточки
        const postCard = document.createElement('div');
        postCard.className = 'post-card';
        postCard.innerHTML = `
            <h2><a href="${postLink}">${post.title}</a></h2>
            <div class="post-meta">${post.date}</div>
            <p class="post-excerpt">${post.excerpt}</p>
            <a href="${postLink}" class="read-more">Читать далее →</a>
        `;
        
        // Добавляем карточку в контейнер на странице
        postsContainer.appendChild(postCard);
    });
}

// ---- ЛОГИКА ДЛЯ СТРАНИЦЫ ПОСТА (post.html) ----
function displaySinglePost() {
    const postContentDiv = document.getElementById('post-content');
    
    // Если мы не на странице поста (такого контейнера нет), то ничего не делаем
    if (!postContentDiv) return;

    // 1. Получаем slug поста из адресной строки (то, что после "?post=")
    const urlParams = new URLSearchParams(window.location.search);
    const postSlug = urlParams.get('post');

    if (!postSlug) {
        postContentDiv.innerHTML = '<p>Статья не найдена (не указан ID).</p>';
        return;
    }

    // 2. Ищем в нашем массиве пост, у которого slug совпадает с тем, что в адресе
    const foundPost = posts.find(post => post.slug === postSlug);

    // 3. Если пост найден, отображаем его. Если нет — показываем ошибку.
    if (foundPost) {
        // Меняем заголовок страницы (во вкладке браузера)
        document.title = `${foundPost.title} | Мой блог`;
        
        // Заполняем контейнер содержимым поста
        postContentDiv.innerHTML = `
            <h1>${foundPost.title}</h1>
            <div class="post-meta">${foundPost.date}</div>
            <div>${foundPost.content}</div>
        `;
    } else {
        postContentDiv.innerHTML = '<p>Извините, статья с таким адресом не найдена.</p>';
    }
}

// ---- ЗАПУСК ----
// Эта функция вызывает другие функции в зависимости от того, на какой странице мы находимся.
function init() {
    displayPostsOnMainPage();
    displaySinglePost();
}

// Ждем, пока весь HTML загрузится, и запускаем init
document.addEventListener('DOMContentLoaded', init);
