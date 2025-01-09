local computerCoords = vector3(456.82, -630.15, 28.5) -- Coordenadas do computador
local isNearComputer = false

-- Detecta se o jogador está próximo do computador
CreateThread(function()
    while true do
        local playerPed = PlayerPedId()
        local playerCoords = GetEntityCoords(playerPed)
        local distance = #(playerCoords - computerCoords)

        -- Verifica se o jogador está próximo do computador
        if distance < 2.0 then
            isNearComputer = true
            -- Exibe o texto 3D
            DrawText3D(computerCoords.x, computerCoords.y, computerCoords.z, "[E] Iniciar Computador")
            
            -- Verifica se a tecla 'E' foi pressionada
            if IsControlJustPressed(0, 38) then -- 38 é o código para a tecla 'E'
                SetNuiFocus(true, true) -- Ativa a interface NUI
                SendNUIMessage({ action = 'openUI' }) -- Envia a mensagem para abrir a interface
            end
        else
            isNearComputer = false
        end

        Wait(0)
    end
end)

-- Fecha a interface com ESC
RegisterNUICallback('close', function(data, cb)
    SetNuiFocus(false, false) -- Desativa a interface NUI
    cb('ok')
end)

-- Função para exibir texto 3D
function DrawText3D(x, y, z, text)
    local onScreen, _x, _y = World3dToScreen2d(x, y, z)
    local px, py, pz = table.unpack(GetGameplayCamCoords())

    SetTextScale(0.35, 0.35)
    SetTextFont(4)
    SetTextProportional(1)
    SetTextEntry("STRING")
    SetTextCentre(1)
    AddTextComponentString(text)
    DrawText(_x, _y)
    local factor = #text / 370
    DrawRect(_x, _y + 0.0150, 0.015 + factor, 0.03, 0, 0, 0, 75)
end
