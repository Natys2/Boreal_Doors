fx_version 'cerulean'
game 'gta5'

author 'Natasha'
description 'Sistema dos computadores de Boreal RP'
version '1.0.0'

client_scripts {
    'client.lua'
}

server_scripts {
    'server.lua'
}

dependency 'oxmysql'

-- Configuração de banco de dados
oxmysql = {
    host = '127.0.0.1',        -- IP do servidor MySQL
    port = 3306,               -- Porta MySQL
    database = 'inix',         -- Nome do banco de dados
    username = 'root',         -- Usuário do banco de dados
    password = 'senha'         -- Senha do banco de dados
}


files {
    'loginUI/index.html', -- Página de login
    'loginUI/login.css', -- CSS da página de login
    'loginUI/login.js', -- Script do login
    'loginUI/login.png', -- Imagem de usuário no login
    'loginUI/Iniciando-Door-_Finalizado_.mp4', -- Vídeo de início quando clica E
    'loginUI/Iniciando-Door -_Finalizado_.avi', 
    'loginUI/background.jpg', -- Background do login
    'computer/index.html', -- Página do computador (não será usada diretamente no NUI)
    'computer/scripts.js', -- Script da página do computador
    'computer/styles.css', -- CSS da página do computador
    'computer/Logo_BR_trans_LGBT.png', 
    'computer/notify.png',
    'computer/novalogorevo.png',
    'computer/ocurrency.png',
    'computer/paste.png',
    'computer/rb_5846.png',
    'computer/rb_5915.png',
    'computer/saude_geometria.png',
    'computer/workbadge.png'
}
ui_page 'computer/index.html'