// ============================================
// LSP Traductor - JavaScript Functionality
// ============================================

// State Management
let currentScreen = 'welcome';
let translationHistory = [];
let isRecording = false;

// Sample translations for demo
const sampleTranslations = [
    "Hola, ¿cómo estás?",
    "Gracias",
    "Buenos días",
    "¿Necesitas ayuda?",
    "Mucho gusto",
    "Hasta luego",
    "Por favor",
    "De nada"
];

// ============================================
// Screen Navigation
// ============================================
function goToCamera() {
    switchScreen('camera');
    // Simulate starting detection
    setTimeout(() => {
        startRandomTranslations();
    }, 1000);
}

function switchScreen(screenName) {
    // Remove active class from all screens
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });

    // Add active class to target screen
    const targetScreen = document.querySelector(`.${screenName}-screen`);
    if (targetScreen) {
        targetScreen.classList.add('active');
        currentScreen = screenName;
    }
}

// ============================================
// Side Panel Management
// ============================================
function toggleHistory() {
    const panel = document.querySelector('.history-panel');
    panel.classList.toggle('active');

    // Close settings if open
    if (panel.classList.contains('active')) {
        document.querySelector('.settings-panel').classList.remove('active');
    }
}

function toggleSettings() {
    const panel = document.querySelector('.settings-panel');
    panel.classList.toggle('active');

    // Close history if open
    if (panel.classList.contains('active')) {
        document.querySelector('.history-panel').classList.remove('active');
    }
}

// ============================================
// Translation Functions
// ============================================
function updateTranslation(text) {
    const textElement = document.getElementById('translationText');
    if (textElement) {
        // Trigger fade out
        textElement.style.opacity = '0';
        textElement.style.transform = 'translateY(10px)';

        setTimeout(() => {
            textElement.textContent = text;
            // Trigger fade in
            textElement.style.opacity = '1';
            textElement.style.transform = 'translateY(0)';
        }, 200);

        // Add to history
        addToHistory(text);
    }
}

function addToHistory(text) {
    const now = new Date();
    const timeString = now.toLocaleTimeString('es-PE', {
        hour: '2-digit',
        minute: '2-digit'
    });

    translationHistory.unshift({
        text: text,
        time: timeString
    });

    // Keep only last 10 items
    if (translationHistory.length > 10) {
        translationHistory.pop();
    }

    updateHistoryPanel();
}

function updateHistoryPanel() {
    const historyPanel = document.querySelector('.history-panel .panel-content');
    if (!historyPanel) return;

    // Clear current items (except empty state)
    const emptyState = historyPanel.querySelector('.empty-state');
    historyPanel.innerHTML = '';

    // Add history items
    translationHistory.forEach(item => {
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        historyItem.innerHTML = `
            <div class="history-time">${item.time}</div>
            <div class="history-text">${item.text}</div>
        `;
        historyPanel.appendChild(historyItem);
    });

    // Add empty state if no history
    if (translationHistory.length === 0 && emptyState) {
        historyPanel.appendChild(emptyState);
    }
}

function startRandomTranslations() {
    // Simulate random sign language detection
    setInterval(() => {
        if (currentScreen === 'camera' && Math.random() > 0.7) {
            const randomTranslation = sampleTranslations[
                Math.floor(Math.random() * sampleTranslations.length)
            ];
            updateTranslation(randomTranslation);
            updateConfidence(Math.floor(Math.random() * 20) + 75); // 75-95%
        }
    }, 5000);
}

function updateConfidence(value) {
    const fill = document.querySelector('.confidence-fill');
    const valueText = document.querySelector('.confidence-value');

    if (fill) {
        fill.style.width = value + '%';
    }
    if (valueText) {
        valueText.textContent = value + '%';
    }
}

// ============================================
// Audio Functions
// ============================================
function playAudio() {
    const button = document.querySelector('.audio-button');
    const waves = button.querySelectorAll('.wave');

    // Visual feedback
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 150);

    // Animate sound waves
    waves.forEach((wave, index) => {
        wave.style.animation = 'none';
        setTimeout(() => {
            wave.style.animation = `wave-animation 0.6s ease-in-out infinite`;
            wave.style.animationDelay = `${index * 0.1}s`;
        }, 10);
    });

    // In a real app, this would use Web Speech API
    const text = document.getElementById('translationText').textContent;
    console.log('Playing audio for:', text);

    // Simulate audio playback
    showNotification('Reproduciendo audio...');
}

// ============================================
// Copy Function
// ============================================
function copyText() {
    const text = document.getElementById('translationText').textContent;

    // Copy to clipboard
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            showNotification('Texto copiado');
        }).catch(err => {
            console.error('Error copying text:', err);
        });
    } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showNotification('Texto copiado');
    }
}

// ============================================
// Notification System
// ============================================
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        left: 50%;
        transform: translateX(-50%) translateY(-20px);
        background: rgba(0, 217, 163, 0.95);
        color: white;
        padding: 12px 24px;
        border-radius: 100px;
        font-weight: 600;
        font-size: 0.875rem;
        z-index: 1000;
        opacity: 0;
        transition: all 0.3s ease;
        box-shadow: 0 4px 16px rgba(0, 217, 163, 0.4);
    `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(-50%) translateY(0)';
    }, 10);

    // Remove after 2 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(-50%) translateY(-20px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 2000);
}

// ============================================
// Update Time
// ============================================
function updateTime() {
    const timeElement = document.querySelector('.time');
    if (timeElement) {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        timeElement.textContent = `${hours}:${minutes}`;
    }
}

// ============================================
// Keyboard Shortcuts
// ============================================
document.addEventListener('keydown', (e) => {
    // ESC to close panels
    if (e.key === 'Escape') {
        document.querySelector('.history-panel').classList.remove('active');
        document.querySelector('.settings-panel').classList.remove('active');
    }

    // H for history
    if (e.key === 'h' || e.key === 'H') {
        toggleHistory();
    }

    // S for settings
    if (e.key === 's' || e.key === 'S') {
        toggleSettings();
    }

    // Space to play audio
    if (e.key === ' ' && currentScreen === 'camera') {
        e.preventDefault();
        playAudio();
    }

    // C to copy
    if (e.key === 'c' || e.key === 'C') {
        if (currentScreen === 'camera') {
            copyText();
        }
    }
});

// ============================================
// Initialize App
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('LSP Traductor initialized');

    // Update time immediately and every minute
    updateTime();
    setInterval(updateTime, 60000);

    // Add smooth transitions to text content
    const textContent = document.getElementById('translationText');
    if (textContent) {
        textContent.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    }
});

// ============================================
// Export functions for inline onclick handlers
// ============================================
window.goToCamera = goToCamera;
window.toggleHistory = toggleHistory;
window.toggleSettings = toggleSettings;
window.playAudio = playAudio;
window.copyText = copyText;
