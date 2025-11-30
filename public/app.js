// Check server health on page load
async function checkServerStatus() {
    try {
        const response = await fetch('/api/health');
        const data = await response.json();
        
        const statusElement = document.getElementById('server-status');
        if (data.status === 'ok') {
            statusElement.textContent = '✅ Server is running and healthy';
            statusElement.style.color = '#28a745';
        } else {
            statusElement.textContent = '⚠️ Server responded with unexpected status';
            statusElement.style.color = '#ffc107';
        }
    } catch (error) {
        const statusElement = document.getElementById('server-status');
        statusElement.textContent = '❌ Unable to connect to server';
        statusElement.style.color = '#dc3545';
        console.error('Error checking server status:', error);
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    checkServerStatus();
});

