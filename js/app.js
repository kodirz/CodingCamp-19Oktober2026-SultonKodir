// Life Dashboard Application
// All functionality in one file as per requirements

// ============================================
// MICRO-INTERACTIONS & ANIMATIONS
// ============================================

// Add ripple effect to buttons
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'BUTTON' || e.target.closest('button')) {
        const button = e.target.tagName === 'BUTTON' ? e.target : e.target.closest('button');
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            pointer-events: none;
            animation: ripple 0.6s ease-out;
        `;
        
        if (!button.style.position || button.style.position === 'static') {
            button.style.position = 'relative';
        }
        button.style.overflow = 'hidden';
        
        button.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    }
});

// Add ripple animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ============================================
// THEME MANAGEMENT (Challenge 1: Light/Dark Mode)
// ============================================
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.querySelector('.theme-icon');

function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
    
    // Add celebration animation
    createThemeParticles();
}

function createThemeParticles() {
    const container = document.body;
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        const size = Math.random() * 10 + 5;
        particle.style.cssText = `
            position: fixed;
            width: ${size}px;
            height: ${size}px;
            background: linear-gradient(135deg, var(--accent), #f093fb);
            border-radius: 50%;
            pointer-events: none;
            top: ${Math.random() * 100}vh;
            left: ${Math.random() * 100}vw;
            opacity: 0;
            z-index: 9998;
            animation: particleFade 1s ease-out forwards;
        `;
        container.appendChild(particle);
        setTimeout(() => particle.remove(), 1000);
    }
}

const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes particleFade {
        0% {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
        100% {
            opacity: 0;
            transform: translateY(-100px) scale(0);
        }
    }
`;
document.head.appendChild(particleStyle);

function updateThemeIcon(theme) {
    themeIcon.textContent = theme === 'light' ? '🌙' : '☀️';
}

themeToggle.addEventListener('click', toggleTheme);

// ============================================
// GREETING SECTION
// ============================================
const currentTime = document.getElementById('currentTime');
const currentDate = document.getElementById('currentDate');
const greetingText = document.getElementById('greetingText');
const userNameInput = document.getElementById('userName');
const saveNameBtn = document.getElementById('saveName');
const userGreeting = document.getElementById('userGreeting');

function updateDateTime() {
    const now = new Date();
    
    // Update time
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    currentTime.textContent = `${hours}:${minutes}:${seconds}`;
    
    // Update date
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    currentDate.textContent = now.toLocaleDateString('en-US', options);
    
    // Update greeting
    const hour = now.getHours();
    let greeting = '';
    if (hour >= 5 && hour < 12) {
        greeting = 'Good Morning';
    } else if (hour >= 12 && hour < 17) {
        greeting = 'Good Afternoon';
    } else if (hour >= 17 && hour < 21) {
        greeting = 'Good Evening';
    } else {
        greeting = 'Good Night';
    }
    greetingText.textContent = greeting;
}

// Challenge 2: Custom name in greeting
function loadUserName() {
    const savedName = localStorage.getItem('userName');
    if (savedName) {
        userNameInput.value = savedName;
        displayUserGreeting(savedName);
    }
}

function saveUserName() {
    const name = userNameInput.value.trim();
    if (name) {
        localStorage.setItem('userName', name);
        displayUserGreeting(name);
        showNotification(`Welcome, ${name}! 👋`, 'success');
    }
}

function displayUserGreeting(name) {
    const hour = new Date().getHours();
    let greeting = '';
    if (hour >= 5 && hour < 12) {
        greeting = 'Good Morning';
    } else if (hour >= 12 && hour < 17) {
        greeting = 'Good Afternoon';
    } else if (hour >= 17 && hour < 21) {
        greeting = 'Good Evening';
    } else {
        greeting = 'Good Night';
    }
    userGreeting.textContent = `${greeting}, ${name}!`;
}

saveNameBtn.addEventListener('click', saveUserName);
userNameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        saveUserName();
    }
});

// Update every second
setInterval(updateDateTime, 1000);
updateDateTime();
loadUserName();

// ============================================
// FOCUS TIMER (Challenge 3: Change Pomodoro Time)
// ============================================
const timerDisplay = document.getElementById('timerDisplay');
const startTimerBtn = document.getElementById('startTimer');
const stopTimerBtn = document.getElementById('stopTimer');
const resetTimerBtn = document.getElementById('resetTimer');
const timerDurationInput = document.getElementById('timerDuration');
const setTimerBtn = document.getElementById('setTimer');

let timerInterval = null;
let timerSeconds = 25 * 60; // Default 25 minutes
let isTimerRunning = false;

function loadTimerDuration() {
    const savedDuration = localStorage.getItem('timerDuration');
    if (savedDuration) {
        timerDurationInput.value = savedDuration;
        timerSeconds = parseInt(savedDuration) * 60;
        updateTimerDisplay();
    }
}

function setTimerDuration() {
    const duration = parseInt(timerDurationInput.value);
    if (duration > 0 && duration <= 120) {
        localStorage.setItem('timerDuration', duration);
        timerSeconds = duration * 60;
        updateTimerDisplay();
        stopTimer();
        showNotification(`Timer set to ${duration} minutes! ⏱️`, 'info');
    } else {
        showNotification('Please enter a duration between 1 and 120 minutes', 'warning');
    }
}

function updateTimerDisplay() {
    const minutes = Math.floor(timerSeconds / 60);
    const seconds = timerSeconds % 60;
    timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function startTimer() {
    if (!isTimerRunning) {
        isTimerRunning = true;
        timerInterval = setInterval(() => {
            if (timerSeconds > 0) {
                timerSeconds--;
                updateTimerDisplay();
            } else {
                stopTimer();
                showNotification('🎉 Focus timer completed! Great job!', 'success');
                playCompletionAnimation();
            }
        }, 1000);
    }
}

function playCompletionAnimation() {
    const timerDisplay = document.getElementById('timerDisplay');
    timerDisplay.style.animation = 'none';
    setTimeout(() => {
        timerDisplay.style.animation = 'completionCelebration 0.6s ease-out';
    }, 10);
    
    // Add celebration particles
    for (let i = 0; i < 30; i++) {
        setTimeout(() => createThemeParticles(), i * 30);
    }
}

const completionStyle = document.createElement('style');
completionStyle.textContent = `
    @keyframes completionCelebration {
        0%, 100% {
            transform: scale(1);
        }
        25% {
            transform: scale(1.2) rotate(-5deg);
        }
        75% {
            transform: scale(1.2) rotate(5deg);
        }
    }
`;
document.head.appendChild(completionStyle);

function stopTimer() {
    isTimerRunning = false;
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

function resetTimer() {
    stopTimer();
    const duration = parseInt(timerDurationInput.value);
    timerSeconds = duration * 60;
    updateTimerDisplay();
    showNotification('Timer reset!', 'success');
}

// ============================================
// NOTIFICATION SYSTEM
// ============================================
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    const colors = {
        success: 'linear-gradient(135deg, #10b981, #059669)',
        danger: 'linear-gradient(135deg, #ef4444, #dc2626)',
        warning: 'linear-gradient(135deg, #f59e0b, #d97706)',
        info: 'linear-gradient(135deg, #667eea, #764ba2)'
    };
    
    // Responsive notification positioning
    const isMobile = window.innerWidth <= 768;
    
    notification.style.cssText = `
        position: fixed;
        ${isMobile ? `
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            max-width: 90%;
            animation: slideInBottom 0.3s ease-out, slideOutBottom 0.3s ease-in 2.7s;
        ` : `
            top: 110px;
            left: 30px;
            animation: slideInLeft 0.3s ease-out, slideOutLeft 0.3s ease-in 2.7s;
        `}
        background: ${colors[type] || colors.info};
        color: white;
        padding: ${isMobile ? '14px 20px' : '18px 28px'};
        border-radius: 50px;
        font-weight: 700;
        font-size: ${isMobile ? '0.9rem' : '1rem'};
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        pointer-events: none;
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        text-align: center;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => notification.remove(), 3000);
}

const notificationStyle = document.createElement('style');
notificationStyle.textContent = `
    @keyframes slideInLeft {
        from {
            transform: translateX(-400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutLeft {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(-400px);
            opacity: 0;
        }
    }
    
    @keyframes slideInBottom {
        from {
            transform: translateX(-50%) translateY(100px);
            opacity: 0;
        }
        to {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutBottom {
        from {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
        }
        to {
            transform: translateX(-50%) translateY(100px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyle);

setTimerBtn.addEventListener('click', setTimerDuration);
startTimerBtn.addEventListener('click', startTimer);
stopTimerBtn.addEventListener('click', stopTimer);
resetTimerBtn.addEventListener('click', resetTimer);

loadTimerDuration();
updateTimerDisplay();

// ============================================
// TO-DO LIST (Challenge 4: Prevent Duplicate & Challenge 5: Sort)
// ============================================
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTask');
const taskList = document.getElementById('taskList');
const sortTasksSelect = document.getElementById('sortTasks');

let tasks = [];

function loadTasks() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
        renderTasks();
    }
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask() {
    const taskText = taskInput.value.trim();
    
    if (!taskText) {
        showNotification('Please enter a task', 'warning');
        taskInput.focus();
        return;
    }
    
    // Challenge 4: Prevent duplicate tasks
    const isDuplicate = tasks.some(task => 
        task.text.toLowerCase() === taskText.toLowerCase()
    );
    
    if (isDuplicate) {
        showNotification('This task already exists!', 'danger');
        return;
    }
    
    const task = {
        id: Date.now(),
        text: taskText,
        completed: false,
        createdAt: new Date().getTime()
    };
    
    tasks.push(task);
    saveTasks();
    renderTasks();
    taskInput.value = '';
    showNotification('Task added successfully!', 'success');
    
    // Smooth scroll to bottom to show new task
    setTimeout(() => {
        const taskList = document.getElementById('taskList');
        if (taskList) {
            taskList.scrollTo({
                top: taskList.scrollHeight,
                behavior: 'smooth'
            });
        }
    }, 100);
}

function deleteTask(id) {
    const task = tasks.find(t => t.id === id);
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
    if (task) {
        showNotification(`"${task.text}" deleted`, 'danger');
    }
}

function toggleTaskComplete(id) {
    const task = tasks.find(task => task.id === id);
    if (task) {
        task.completed = !task.completed;
        saveTasks();
        renderTasks();
        if (task.completed) {
            showNotification('Task completed! 🎉', 'success');
        }
    }
}

function editTask(id) {
    const task = tasks.find(task => task.id === id);
    if (!task) return;
    
    const taskElement = document.querySelector(`[data-id="${id}"] .task-text`);
    const currentText = task.text;
    
    taskElement.contentEditable = true;
    taskElement.classList.add('editing');
    taskElement.focus();
    
    // Select all text
    const range = document.createRange();
    range.selectNodeContents(taskElement);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    
    function finishEdit() {
        const newText = taskElement.textContent.trim();
        
        if (!newText) {
            alert('Task cannot be empty');
            taskElement.textContent = currentText;
        } else {
            // Check for duplicates (excluding current task)
            const isDuplicate = tasks.some(t => 
                t.id !== id && t.text.toLowerCase() === newText.toLowerCase()
            );
            
            if (isDuplicate) {
                alert('This task already exists!');
                taskElement.textContent = currentText;
            } else {
                task.text = newText;
                saveTasks();
                showNotification('Task updated!', 'success');
            }
        }
        
        taskElement.contentEditable = false;
        taskElement.classList.remove('editing');
        renderTasks();
    }
    
    taskElement.addEventListener('blur', finishEdit, { once: true });
    taskElement.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            taskElement.blur();
        }
    }, { once: true });
}

// Challenge 5: Sort tasks
function getSortedTasks() {
    const sortValue = sortTasksSelect.value;
    const tasksCopy = [...tasks];
    
    switch (sortValue) {
        case 'alphabetical':
            return tasksCopy.sort((a, b) => a.text.localeCompare(b.text));
        case 'status':
            return tasksCopy.sort((a, b) => {
                if (a.completed === b.completed) return 0;
                return a.completed ? 1 : -1;
            });
        default:
            return tasksCopy.sort((a, b) => a.createdAt - b.createdAt);
    }
}

function renderTasks() {
    taskList.innerHTML = '';
    const sortedTasks = getSortedTasks();
    
    sortedTasks.forEach(task => {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''}`;
        li.setAttribute('data-id', task.id);
        
        li.innerHTML = `
            <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
            <span class="task-text">${task.text}</span>
            <div class="task-actions">
                <button class="task-btn edit-btn">Edit</button>
                <button class="task-btn delete-btn">Delete</button>
            </div>
        `;
        
        const checkbox = li.querySelector('.task-checkbox');
        checkbox.addEventListener('change', () => toggleTaskComplete(task.id));
        
        const editBtn = li.querySelector('.edit-btn');
        editBtn.addEventListener('click', () => editTask(task.id));
        
        const deleteBtn = li.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to delete this task?')) {
                deleteTask(task.id);
            }
        });
        
        taskList.appendChild(li);
    });
}

addTaskBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});
sortTasksSelect.addEventListener('change', renderTasks);

loadTasks();

// ============================================
// QUICK LINKS
// ============================================
const linkNameInput = document.getElementById('linkName');
const linkUrlInput = document.getElementById('linkUrl');
const addLinkBtn = document.getElementById('addLink');
const linksGrid = document.getElementById('linksGrid');

let links = [];

function loadLinks() {
    const savedLinks = localStorage.getItem('quickLinks');
    if (savedLinks) {
        links = JSON.parse(savedLinks);
        renderLinks();
    }
}

function saveLinks() {
    localStorage.setItem('quickLinks', JSON.stringify(links));
}

function addLink() {
    const name = linkNameInput.value.trim();
    const url = linkUrlInput.value.trim();
    
    if (!name || !url) {
        showNotification('Please enter both link name and URL', 'warning');
        return;
    }
    
    // Basic URL validation
    let finalUrl = url;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        finalUrl = 'https://' + url;
    }
    
    const link = {
        id: Date.now(),
        name: name,
        url: finalUrl
    };
    
    links.push(link);
    saveLinks();
    renderLinks();
    
    linkNameInput.value = '';
    linkUrlInput.value = '';
    showNotification('Link added successfully!', 'success');
}

function deleteLink(id) {
    const link = links.find(l => l.id === id);
    links = links.filter(link => link.id !== id);
    saveLinks();
    renderLinks();
    if (link) {
        showNotification(`"${link.name}" removed`, 'danger');
    }
}

function openLink(url) {
    window.open(url, '_blank');
}

function renderLinks() {
    linksGrid.innerHTML = '';
    
    links.forEach(link => {
        const linkDiv = document.createElement('div');
        linkDiv.className = 'link-item';
        linkDiv.setAttribute('data-id', link.id);
        
        linkDiv.innerHTML = `
            <button class="link-remove">×</button>
            <div>${link.name}</div>
        `;
        
        linkDiv.addEventListener('click', (e) => {
            if (!e.target.classList.contains('link-remove')) {
                openLink(link.url);
            }
        });
        
        const removeBtn = linkDiv.querySelector('.link-remove');
        removeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (confirm(`Remove link "${link.name}"?`)) {
                deleteLink(link.id);
            }
        });
        
        linksGrid.appendChild(linkDiv);
    });
}

addLinkBtn.addEventListener('click', addLink);
linkUrlInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addLink();
    }
});

loadLinks();

// ============================================
// INITIALIZE APPLICATION
// ============================================
initTheme();
console.log('Life Dashboard initialized successfully!');
