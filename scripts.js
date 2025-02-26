// Função para verificar o status do bot

async function fetchBotStatus() {
    try {
        let response = await fetch('http://localhost:80/bot-status'); // Endpoint para verificar status do bot
        if (!response.ok) throw new Error("Falha ao obter status");
        let data = await response.json();
        let statusIndicator = $("#status-indicator");

        if (data.running) {
            statusIndicator.removeClass("bg-secondary bg-danger").addClass("bg-success").text("🟢 Bot está rodando");
            $("#qr-container").hide(); // Esconde QR Code quando o bot já está conectado
        } else {
            statusIndicator.removeClass("bg-secondary bg-success").addClass("bg-danger").text("🔴 Bot desligado");
            await loadQRCode(); // Tenta carregar o QR Code se o bot não estiver rodando
        }
    } catch (error) {
        console.error("Erro ao buscar status:", error);
        $("#status-indicator").text("⚠️ Erro ao verificar status.");
    }
}

// Função para carregar o QR Code
async function loadQRCode() {
    try {
        const response = await fetch('http://localhost:80/qrcode');  // Endpoint para obter o QR Code
        if (response.ok) {
            const data = await response.json();
            $("#qrCode").attr("src", data.qrcode); // Usa o QR Code gerado
            $("#qr-container").show(); // Exibe o QR Code
        } else {
            $("#qr-container").hide(); // Caso não consiga carregar o QR Code
        }
    } catch (error) {
        console.error("Erro ao carregar o QR Code:", error);
        $("#qr-container").hide();
    }
}

// Função que chama a verificação de status e carrega a cada 5 segundos
$(document).ready(() => {
    fetchBotStatus();
    setInterval(fetchBotStatus, 5000); // Verifica status a cada 5 segundos
});