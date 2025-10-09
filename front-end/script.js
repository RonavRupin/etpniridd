// Mock database
const MOCK_DB = {};

// Global state
let currentUser = null;

// DOM Elements
const loginScreen = document.getElementById('login-screen');
const registerScreen = document.getElementById('register-screen');
const dashboardScreen = document.getElementById('dashboard-screen');

const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');

const loginMessage = document.getElementById('login-message');
const registerMessage = document.getElementById('register-message');

const goRegister = document.getElementById('go-register');
const goLogin = document.getElementById('go-login');

const logoutBtn = document.getElementById('logout-btn');
const userDisplayName = document.getElementById('user-display-name');

const tabButtons = document.querySelectorAll('.tab-btn');
const pages = document.querySelectorAll('.page-content');

const academicStatusEl = document.getElementById('academic-status');
const moodStatusEl = document.getElementById('mood-status');
const motivationQuoteEl = document.getElementById('motivation-quote');

const moodButtons = document.querySelectorAll('.mood-btn');
const moodMessage = document.getElementById('mood-message');

const chatLog = document.getElementById('chat-log');
const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');

const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoListEl = document.getElementById('todo-list');
const todoStatusEl = document.getElementById('todo-status');

// --- Utility Functions ---
function showDashboard() {
  loginScreen.classList.add('hidden');
  registerScreen.classList.add('hidden');
  dashboardScreen.classList.remove('hidden');
}
function showLogin() {
  dashboardScreen.classList.add('hidden');
  registerScreen.classList.add('hidden');
  loginScreen.classList.remove('hidden');
}
function showRegister() {
  dashboardScreen.classList.add('hidden');
  loginScreen.classList.add('hidden');
  registerScreen.classList.remove('hidden');
}

function updateDashboardUI() {
  if(!currentUser) return;
  userDisplayName.textContent = currentUser.username;
  academicStatusEl.textContent = currentUser.academicStatus || "No status yet";
  const moods = {great:'Feeling Great 😄', good:'Feeling Good 😊', neutral:'Neutral 😐', sad:'A Little Down 😟', stressed:'Stressed 😰'};
  moodStatusEl.textContent = moods[currentUser.moodStatus] || "Mood not set";
  motivationQuoteEl.textContent = ["Keep going!", "You are doing great!", "Small wins count!"][Math.floor(Math.random()*3)];
  moodButtons.forEach(btn => btn.classList.remove('selected'));
  const moodBtn = Array.from(moodButtons).find(b => b.dataset.mood === currentUser.moodStatus);
  if(moodBtn) moodBtn.classList.add('selected');
  renderTodos();
}

function renderTodos() {
  if(!currentUser) return;
  todoListEl.innerHTML = '';
  if(!currentUser.todos || currentUser.todos.length === 0) {
    todoStatusEl.textContent = '';
    return;
  }
  currentUser.todos.forEach(todo => {
    const li = document.createElement('li');
    li.innerHTML = `<span><input type="checkbox" ${todo.completed?'checked':''}> ${todo.text}</span> <button>Delete</button>`;
    li.querySelector('input').addEventListener('change', () => {
      todo.completed = !todo.completed;
      updateDashboardUI();
    });
    li.querySelector('button').addEventListener('click', () => {
      currentUser.todos = currentUser.todos.filter(t => t !== todo);
      updateDashboardUI();
    });
    todoListEl.appendChild(li);
  });
  const completed = currentUser.todos.filter(t => t.completed).length;
  todoStatusEl.textContent = `${completed}/${currentUser.todos.length} Tasks Completed`;
}

// --- Login ---
loginForm.addEventListener('submit', e => {
  e.preventDefault();
  const username = loginForm.username.value.trim();
  const password = loginForm.password.value.trim();
  if(MOCK_DB[username] && MOCK_DB[username].password === password) {
    currentUser = JSON.parse(JSON.stringify(MOCK_DB[username]));
    showDashboard();
    updateDashboardUI();
  } else {
    loginMessage.textContent = "Invalid username or password";
  }
});

// --- Register ---
registerForm.addEventListener('submit', e => {
  e.preventDefault();
  const username = document.getElementById('reg-username').value.trim();
  const password = document.getElementById('reg-password').value.trim();
  if(MOCK_DB[username]) {
    registerMessage.textContent = "Username exists!";
    return;
  }
  MOCK_DB[username] = {username, password, academicStatus:"All projects on track!", moodStatus:"neutral", todos:[], nextTodoId:1};
  registerMessage.textContent = "Registered successfully! Login now.";
  setTimeout(showLogin, 800);
});

// --- Toggle screens ---
goRegister.addEventListener('click', showRegister);
goLogin.addEventListener('click', showLogin);

// --- Logout ---
logoutBtn.addEventListener('click', () => { currentUser = null; showLogin(); });

// --- Tabs ---
tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    tabButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    pages.forEach(p => p.classList.add('hidden'));
    document.getElementById(`${btn.dataset.page}-content`).classList.remove('hidden');
  });
});

// --- Mood ---
moodButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    if(!currentUser) return;
    currentUser.moodStatus = btn.dataset.mood;
    updateDashboardUI();
    moodMessage.textContent = `Mood updated to ${btn.dataset.mood}`;
    moodMessage.classList.remove('hidden');
    setTimeout(() => moodMessage.classList.add('hidden'), 2000);
  });
});

// --- Chat ---
chatForm?.addEventListener('submit', e => {
  e.preventDefault();
  const msg = chatInput.value.trim();
  if(!msg) return;
  const userDiv = document.createElement('div');
  userDiv.className = 'chat-bubble user';
  userDiv.textContent = msg;
  chatLog.appendChild(userDiv);
  chatInput.value = '';
  setTimeout(() => {
    const botDiv = document.createElement('div');
    botDiv.className = 'chat-bubble bot';
    botDiv.textContent = "I'm here to help! Take a deep breath or review your tasks.";
    chatLog.appendChild(botDiv);
    chatLog.scrollTop = chatLog.scrollHeight;
  }, 800);
});

// --- To-Do ---
todoForm?.addEventListener('submit', e => {
  e.preventDefault();
  const text = todoInput.value.trim();
  if(!text || !currentUser) return;
  if(!currentUser.todos) currentUser.todos = [];
  currentUser.todos.push({id:currentUser.nextTodoId++, text, completed:false});
  todoInput.value = '';
  updateDashboardUI();
});
