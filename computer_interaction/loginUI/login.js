
const video = document.getElementById('intro-video');
const loadingScreen = document.getElementById('loading-screen');
const loginContainer = document.querySelector('.login-container');
const loginForm = document.querySelector('form');

// Tenta desmutar o vídeo assim que a página for carregada
window.addEventListener('load', () => {
    video.play(); // Tenta reproduzir automaticamente
    video.muted = false; // Tenta desmutar o vídeo

    // Define um atraso de 3 segundos para esconder a tela de carregamento e mostrar o login
    setTimeout(() => {
        video.pause(); // Pausa o vídeo
        loadingScreen.style.display = 'none';
        loginContainer.style.display = 'block';
    }, 3000); // 3000 milissegundos = 3 segundos
});

// Enviar dados de login ao servidor
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = loginForm.username.value;
    const password = loginForm.password.value;

    // Envia os dados de login ao servidor
    fetch(`https://${GetParentResourceName()}/login:attempt`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    }).then(response => response.json()).then(data => {
        if (data.success) {
            // Redirecionar para computer/index.html
            window.location.href = 'computer/index.html';
        } else {
            alert('[DOORS] Houve um erro ao tentar fazer login. Verifique se o nome de usuário e a senha estão corretos.');
        }
    });
});