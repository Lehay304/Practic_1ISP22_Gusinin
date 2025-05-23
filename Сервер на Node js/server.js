let http = require('http');
let fs = require('fs');
let path = require('path');
// Инициализация страниц
let server = http.createServer((req, res) => {
    let filePath = './public' + req.url;
    // Для главной страницы
    if (req.url === '/') {
        filePath = './public/index.html';
    }
    // Для http://192.168.3.206/script.js и http://192.168.3.206/style.css
    let extname = path.extname(filePath);
    let contentType = 'text/html';

    if (extname === 'js'){
        contentType = 'text/javascript';
    } else if (extname === '.css') {
        contentType = 'text/css'
    }
    // Для http://192.168.3.206/kdflvklsdk ака страница не найдена
    fs.readFile(filePath, (err, content) => {
        if (err) {
            fs.readFile('./public/error.html', (err404, content404) => {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end(content404 || '<h1>Page not found (404)');
            });
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});
// Сервер запустился
server.listen(3000, '0.0.0.0', () => {
    console.log('Сервер запущен');
});