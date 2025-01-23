//Funçao para Abrir o sitema logo apos a chamada do OPENUI pelo Lua
function openUI() {
    const body = document.getElementsByTagName('body')[0];

    
    body.style.display = 'block';

    
    body.style.position = 'fixed'; // Fixa a posição na tela
    body.style.top = '50%'; // Centraliza na tela
    body.style.left = '50%'; // Centraliza na tela
    body.style.transform = 'translate(-50%, -50%)'; 
    body.style.width = '75%'; 
    body.style.height = '75%'; 
    body.style.border = '5px solid black'; 
    body.style.zIndex = '9999'; 
    body.style.overflow = 'hidden'; 


    setTimeout(function() {
        document.getElementById('loading-screen').style.opacity = '1'; 
        setTimeout(function() {
            document.getElementById('loading-screen').style.display = 'none'; 
            document.getElementById('desktop').style.display = 'flex'; 
        }, 1000); 
    }, 0); 
}
window.addEventListener('message', function(event) {
    if (event.data.action === 'openUI') {
        openUI(); // Chama a função openUI quando a mensagem for recebida
    }
});

// Função para fechar a janela
let zIndexCounter = 1;

function closeApp(appId) {
    const app = document.getElementById(appId);
    app.classList.remove('show');
    setTimeout(() => {
        app.style.display = 'none';
    }, 300);
}

function openApp(appId) {
    const app = document.getElementById(appId);
    app.style.display = 'block';
    app.style.zIndex = zIndexCounter++;
    setTimeout(() => {
        app.classList.add('show');
    }, 10);
}

function toggleStartMenu() {
    var startMenu = document.getElementById('startMenu');
    if (startMenu.style.display === 'block') {
        startMenu.style.display = 'none';
    } else {
        startMenu.style.display = 'block';
    }
}

function shutdown() {
    var overlay = document.getElementById('shutdownOverlay');
    overlay.style.display = 'block';
    setTimeout(function() {
        overlay.style.opacity = 1;
        setTimeout(function() {
           
        }, 20);
    }, 10);
    fetch(`https://${GetParentResourceName()}/close`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
    }).then(() => {
        console.log('Fechando interface');
    });
}

function toggleProfileMenu() {
    const profileMenu = document.getElementById('profile-menu');
    profileMenu.style.display = profileMenu.style.display === 'block' ? 'none' : 'block';
}


// Função para abrir o modal de edição do bloco de notas
function openNoteModal(note) {
    currentNote = note;
    document.getElementById('noteFileName').value = note.fileName;
    document.getElementById('noteText').value = note.text;
    document.getElementById('noteModal').style.display = 'block';
}

// Função para fechar o modal de bloco de notas
function closeNoteModal() {
    document.getElementById('noteModal').style.display = 'none';
}

// Função para excluir o bloco de notas
function deleteNote() {
    const noteItem = document.querySelector(`#filesList .file-item img[alt='Arquivo']`);
    noteItem.closest('.file-item').remove();  // Remove o item
    closeNoteModal();  // Fecha o modal
}

// Função para renomear o bloco de notas
function renameNote() {
    const newFileName = prompt("Digite o novo nome para o arquivo:", currentNote.fileName);
    if (newFileName) {
        currentNote.fileName = newFileName;
        document.querySelector(`#filesList .file-item p`).textContent = newFileName; // Atualiza o nome na lista
        closeNoteModal();
    }
}
// Função para alternar o painel de notificações
function toggleNotifications() {
    const panel = document.getElementById('notifications-panel');
    // Verifica se o painel está visível
    if (panel.style.display === 'none' || panel.style.display === '') {
        panel.style.display = 'block'; // Exibe o painel
    } else {
        panel.style.display = 'none'; // Esconde o painel
    }
}

// Função para atualizar hora e data
function atualizarHora() {
    const currentTime = document.getElementById('current-time');
    const now = new Date();
    const time = now.toLocaleTimeString();
    const date = now.toLocaleDateString();
    currentTime.innerHTML = `${time} <br> ${date}`;
}

// Atualiza o relógio a cada segundo
setInterval(atualizarHora, 1000);

// Atualizar o horário atual
// Atualizar o horário e a data
// Atualizar o horário e a data
function atualizarHora() {
    const currentTime = document.getElementById('current-time');
    const now = new Date();
    
    const dateString = now.toLocaleDateString('pt-BR'); // Data no formato brasileiro
    const timeString = now.toLocaleTimeString('pt-BR'); // Hora no formato brasileiro
    
    // Atualiza o conteúdo com a hora em cima e a data embaixo
    currentTime.innerHTML = `${timeString}<br>${dateString}`;
}

// Atualiza o horário e a data a cada segundo
setInterval(atualizarHora, 1000);


function generateRandomCode() {
    let code = '';
    while (code.length < 4) {
        const digit = Math.floor(Math.random() * 10);
        if (!code.includes(digit)) {
            code += digit;
        }
    }
    return code;
}

function updateFrame() {
    const name = document.getElementById('cardName').value;
    const gender = document.getElementById('cardGender').value;
    const dob = document.getElementById('cardDOB').value;
    const cpf = document.getElementById('cardCPF').value;
    const date = document.getElementById('cardDate').value;

    const checkboxes = document.querySelectorAll('input[name="bloodtype"]:checked');
    const bloodTypes = Array.from(checkboxes).map(cb => cb.value).join(', ');

    const frame = document.getElementById('frame');
    frame.innerHTML = `
        <img data-layer="Fundo" class="Fundo" style="width: 1012px; height: 637px; left: 0px; top: 0px; position: absolute; background: rgba(255, 255, 255, 0)" src="saude_geometria.png" />
        <img data-layer="Retângulo superior" class="RetNguloSuperior" style="width: 1012px; height: 154px; left: 0px; top: 0px; position: absolute; border-radius: 16px" src="escuro_cima_saude.png" />
        <div data-layer="Código: 0001 Nome: RG: Idade: Cidade: Revi" class="CDigo0001NomeRgIdadeCidadeRevi" id="info" style="width: 276px; height: 169px; left: 48px; top: 234px; position: absolute; color: white; font-size: 25px; font-family: Inter; font-weight: 500; word-wrap: break-word">Código: ${generateRandomCode()}<br/>Nome: ${name}<br/>RG: ${cpf}<br/>Idade: ${dob}<br/>Cidade: Boreal</div>
        <div data-layer="Foto de rosto" class="FotoDeRosto" id="photoFrame" style="width: 150px; height: 150px; left: 795px; top: 228px; position: absolute; background: #D9D9D9; border: 2px black solid; overflow: hidden"></div>
        <div data-layer="Cartão Saúde" class="CartOSaDe" style="width: 203px; height: 50px; left: 404px; top: 86px; position: absolute; color: white; font-size: 30px; font-family: Konkhmer Sleokchher; font-weight: 400; word-wrap: break-word">Cartão Saúde</div>
        <div data-layer="Tipo sanguíneo:" class="TipoSanguNeo" id="bloodType" style="width: 446px; height: 113px; left: 48px; top: 502px; position: absolute; color: white; font-size: 25px; font-family: Inter; font-weight: 500; word-wrap: break-word">Tipo sanguíneo: ${bloodTypes}</div>
        <div data-layer="Gênero:" class="GNero" id="gender" style="width: 165px; height: 49px; left: 795px; top: 502px; position: absolute; color: white; font-size: 25px; font-family: Inter; font-weight: 500; word-wrap: break-word">Gênero: ${gender}</div>
        <img data-layer="Logo HP " class="LogoHp" style="width: 134px; height: 123px; left: 439px; top: -8px; position: absolute" src="Hospital_Natasha_Souza_Branco.png" />
        <img data-layer="Boreal 1" class="Boreal1" style="width: 94px; height: 94px; left: 21px; top: 29px; position: absolute" src="Logo_BR_trans_LGBT.png" />
    `;

    // Recarregar a foto de rosto se já estiver carregada
    const photoFrame = document.getElementById('photoFrame');
    const photoInput = document.getElementById('cardPhoto');
    if (photoInput.files && photoInput.files[0]) {
        loadPhoto({ target: photoInput });
    }
}

function loadPhoto(event) {
    const photoFrame = document.getElementById('photoFrame');
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const img = document.createElement('img');
        img.src = e.target.result;
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'cover';
        photoFrame.innerHTML = '';
        photoFrame.appendChild(img);
    };

    reader.readAsDataURL(file);
}

let logsArray = [];
let currentNote = null;
let notes = [];

function addLog(message) {
    logsArray.push(`[${new Date().toLocaleString('pt-BR')}] [Computador Hospital] ${message}`);
    updateLogsDisplay();
}

function updateLogsDisplay() {
    const logsContent = document.getElementById('logsContent');
    logsContent.innerHTML = logsArray.map(log => `<p>${log}</p>`).join('');
}

function openApp(appId) {
    const app = document.getElementById(appId);
    if (app) {
        app.style.display = 'block';
        app.style.zIndex = zIndexCounter++;
        setTimeout(() => {
            app.classList.add('show');
        }, 10);
    } else {
        console.error(`Elemento com ID ${appId} não encontrado.`);
    }
}

function closeApp(appId) {
    const app = document.getElementById(appId);
    if (app) {
        app.classList.remove('show');
        setTimeout(() => {
            app.style.display = 'none';
        }, 300);
    } else {
        console.error(`Elemento com ID ${appId} não encontrado.`);
    }
}

function downloadImage() {
    html2canvas(document.getElementById('frame')).then(canvas => {
        canvas.toBlob(blob => {
            const formData = new FormData();
            formData.append('file', blob, 'carteira_saude.png');
            formData.append('payload_json', JSON.stringify({
                embeds: [{
                    title: 'Novo Cartão Saúde Gerad0',
                    description: 'Um novo Cartao de Saude foi gerado pelo sistema [ C.S | Cartao Saude] Pelo Medico:' ,
                    color: 3447003, // Cor azul
                    timestamp: new Date().toISOString(),
                    footer: {
                        text: "Computador Hospital C.M Boreal"
                    }
                }]
            }));

            fetch('https://discord.com/api/webhooks/1324586533361025196/CWyK9GNe2bSB5UBAQVzfO7QJiYZfso-jQLGp06atD_4jXJ_pLuZMyzKSKNMJFByBbJNz', {
                method: 'POST',
                body: formData
            }).then(response => {
                if (!response.ok) {
                    return response.json().then(errorInfo => Promise.reject(errorInfo));
                }
            }).catch(error => console.error('Erro ao enviar imagem para o Discord:', error));

            // Criar um link temporário para download da imagem
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'carteira_saude.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }, 'image/png');
    });
}

// Generate initial random code on page load
document.addEventListener('DOMContentLoaded', () => {
    updateFrame();
});

function logs() {
    openApp('logsApp');
    updateLogsDisplay();
}

function sendLogToDiscord(title, description) {
    const webhookUrl = 'https://discord.com/api/webhooks/1324586533361025196/CWyK9GNe2bSB5UBAQVzfO7QJiYZfso-jQLGp06atD_4jXJ_pLuZMyzKSKNMJFByBbJNz';
    const payload = {
        content: '',
        embeds: [{
            title: title,
            description: description,
            color: 3447003, // Cor azul
            timestamp: new Date().toISOString(),
            footer: {
                text: "Computador Hospital C.M Boreal"
            }
        }]
    };

    fetch(webhookUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(response => {
        if (!response.ok) {
            return response.json().then(errorInfo => Promise.reject(errorInfo));
        }
    }).catch(error => {
        console.error('Erro ao enviar log para o Discord:', error);
    });

    addLog(`${title}: ${description}`);
}

document.getElementById('healthRecordForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const healthRecordList = document.getElementById('healthRecordList');
    const record = {
        name: e.target.patientName.value,
        date: e.target.patientDOB.value,
        history: e.target.patientHistory.value,
    };
    const recordItem = document.createElement('div');
    recordItem.innerHTML = `<p><strong>Nome:</strong> ${record.name}</p><p><strong>Data de Registro:</strong> ${record.date}</p><p><strong>Ocorrido:</strong> ${record.history}</p>`;
    healthRecordList.appendChild(recordItem);
    e.target.reset();
    sendLogToDiscord('Novo Relatorio Medico', `**Nome:** ${record.name}\n**Data do Relatorio:** ${record.date}\n**Relatorio:** ${record.history}`);
});

document.getElementById('healthCardForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const healthCardList = document.getElementById('healthCardList');
    const card = {
        name: e.target.cardName.value,
        dob: e.target.cardDOB.value,
        cpf: e.target.cardCPF.value,
        address: e.target.cardAddress.value,
    };
    const cardItem = document.createElement('div');
    cardItem.innerHTML = `<p><strong>Nome Completo:</strong> ${card.name}</p><p><strong>Data de Nascimento:</strong> ${card.dob}</p><p><strong>ID:</strong> ${card.cpf}</p><p><strong>Obs:</strong> ${card.address}</p>`;
    healthCardList.appendChild(cardItem);
    e.target.reset();
    sendLogToDiscord('Novo Cartão Saude', `**Nome Completo:** ${card.name}\n**Data de Nascimento:** ${card.dob}\n**ID:** ${card.cpf}\n**Obs:** ${card.address}`);
    downloadImage(); // Enviar a imagem do cartão de saúde para o Discord
});

document.getElementById('notesForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const filesList = document.getElementById('filesList');
    const note = {
        fileName: e.target.noteFileName.value,
        text: e.target.noteText.value,
    };

    const noteItem = document.createElement('div');
    noteItem.classList.add('file-item');
    noteItem.innerHTML = `
        <img src="bloco.png" alt="Arquivo">
        <p>${note.fileName}</p>
    `;
    noteItem.onclick = () => openNoteModal(note);

    filesList.appendChild(noteItem);
    e.target.reset();
    sendLogToDiscord('Novo Bloco de Notas', `**Nome do Arquivo:** ${note.fileName}\n**Conteúdo:** ${note.text}`);
});

function openNoteModal(note) {
    currentNote = note;
    document.getElementById('noteFileName').value = note.fileName;
    document.getElementById('noteText').value = note.text;
    document.getElementById('noteModal').style.display = 'block';
}

function closeNoteModal() {
    document.getElementById('noteModal').style.display = 'none';
}

function deleteNote() {
    if (currentNote) {
        const noteIndex = notes.findIndex(n => n.fileName === currentNote.fileName);
        if (noteIndex > -1) {
            notes.splice(noteIndex, 1);
            sendLogToDiscord('Bloco de Notas Excluído', `**Nome do Arquivo:** ${currentNote.fileName}`);
            currentNote = null;
            closeNoteModal();
        }
    }
}

function renameNote() {
    if (currentNote) {
        const newFileName = document.getElementById('noteFileName').value;
        const newText = document.getElementById('noteText').value;
        currentNote.fileName = newFileName;
        currentNote.text = newText;
        sendLogToDiscord('Bloco de Notas Alterado', `**Nome do Arquivo:** ${newFileName}\n**Conteúdo:** ${newText}`);
        closeNoteModal();
    }
}

// Função para carregar a foto do usuário
function loadUserPhoto(event) {
    const reader = new FileReader();
    reader.onload = function() {
        const userPhoto = document.getElementById('userPhotoPreview');
        userPhoto.src = reader.result;
        userPhoto.style.display = 'block';
    };
    reader.readAsDataURL(event.target.files[0]);
}

// Função para abrir as configurações
function openSettings() {
    openApp('settingsApp');
}

// Função para salvar as configurações
document.getElementById('settingsForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = e.target.username.value;
    const userPhoto = document.getElementById('userPhotoPreview').src;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;

    if (password !== confirmPassword) {
        alert('As senhas não coincidem!');
        return;
    }

    console.log(`Nome de Usuário: ${username}`);
    console.log(`Foto de Perfil: ${userPhoto}`);
    console.log(`Senha: ${password}`);
    sendLogToDiscord('Configurações Salvas', `**Nome de Usuário:** ${username}\n**Foto de Perfil:** ${userPhoto}\n**Senha:** ${password}`);
    closeApp('settingsApp');
});
document.getElementById('settingsForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = e.target.username.value;
    const userPhoto = document.getElementById('userPhotoPreview').src;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;

    if (password !== confirmPassword) {
        alert('As senhas não coincidem!');
        return;
    }

    console.log(`Nome de Usuário: ${username}`);
    console.log(`Foto de Perfil: ${userPhoto}`);
    console.log(`Senha: ${password}`);
    sendLogToDiscord('Configurações Salvas', `**Nome de Usuário:** ${username}\n**Foto de Perfil:** ${userPhoto}\n**Senha:** ${password}`);
    closeApp('settingsApp');
});

// Verificar a permissão do usuário e ocultar elementos conforme necessário
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const permission = urlParams.get('permission');

    if (permission === 'Funcionario') {
        document.getElementById('logsIcon').style.display = 'none';
        document.getElementById('workBadgeIcon').style.display = 'none';
        document.getElementById('logsApp').style.display = 'none';
        document.getElementById('settingsApp').style.display = 'none';
    }
});
