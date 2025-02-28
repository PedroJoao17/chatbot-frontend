document.getElementById('startButton').addEventListener('click', async () => {
    console.log('Botão foi clicado!'); // Mensagem no console
    document.getElementById('response-message').textContent = 'Botão clicado, aguardando resposta...'; // Mensagem no frontend

    try {
        // Enviar requisição para o backend online
        const response = await fetch('https://chatbot-backend-production-ec31.up.railway.app/start-service', {
            method: 'POST',
        });

        const data = await response.json();
        // Exibir a mensagem recebida do backend no frontend
        document.getElementById('response-message').textContent = data.message;
        console.log('Resposta do backend:', data.message); // Exibir resposta no console
    } catch (error) {
        console.error('Erro ao se comunicar com o backend:', error);
        document.getElementById('response-message').textContent = 'Erro ao iniciar o serviço.';
    }
});
