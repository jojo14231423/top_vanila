// Всплывающее окно при запуске (как у тебя и было)
alert("Сайт запущен!");

function checkServerStatus() {
    const ip = 'top_vanila.aternos.me';
    
    // Запрашиваем данные у бесплатного API мониторинга
    fetch(`https://mcapi.us/server/status?ip=${ip}`)
        .then(response => response.json())
        .then(data => {
            // Находим тот самый элемент с id="online"
            const onlineElement = document.getElementById("online");
            
            if (onlineElement) {
                if (data.online) {
                    // Если сервер включен, пишем реальное число игроков
                    onlineElement.innerText = "Онлайн: " + data.players.now;
                } else {
                    // Если Aternos выключен или спит
                    onlineElement.innerText = "Оффлайн";
                }
            }
        })
        .catch(error => {
            console.error("Ошибка при получении онлайна:", error);
            // Если что-то пошло не так, выведем хотя бы базовый текст
            const onlineElement = document.getElementById("online");
            if (onlineElement) {
                onlineElement.innerText = "Не удалось узнать онлайн";
            }
        });
}

// Проверяем онлайн сразу при загрузке страницы
checkServerStatus();

// Обновляем статус каждые 30 секунд
setInterval(checkServerStatus, 30000);