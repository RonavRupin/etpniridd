// Mock database
const MOCK_DB = {
  hello: {username:'hello', password:'123', academicStatus:'All projects on track!', moodStatus:'good', todos:[{id:1,text:'Review notes',completed:false}], nextTodoId:2},
};

// Global State
let currentUser = null;

// DOM Elements
const loginScreen = document.getElementById('login-screen');
const dashboardScreen = document.getElementById('dashboard-screen');
const loginForm = document.getElementById('login-form');
const loginMessage = document.getElementById('login-message');
const logoutBtn = document.getElementById('logout-btn');
const userDisplayName = document.getElementById('user-display-name');

const academicStatusEl = document.getElementById('academic-status');
const moodStatusEl = document.getElementById('mood-status');
const motivationQuoteEl = document.getElementById('motivation-quote');

const tabButtons = document.querySelectorAll('.tab-btn');
const pages = document.querySelectorAll('.page-content');

const moodButtons = document.querySelectorAll('.mood-btn');
const moodMessage = document.getElementById('mood-message');

const chatLog = document.getElementById('chat-log');
const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');

const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoListEl = document.getElementById('todo-list');
const todoStatusEl = document.getElementById('todo-status');

// Utility Functions
function showDashboard() {
  loginScreen.classList.add('hidden');
  dashboardScreen.classList.remove('hidden');
}
function showLogin() {
  dashboardScreen.classList.add('hidden');
  loginScreen.classList.remove('hidden');
}
function updateDashboardUI() {
  if (!currentUser) return;
  userDisplayName.textContent = currentUser.username;
  academicStatusEl.textContent = currentUser.academicStatus;
  const moods = {great:'Feeling Great 😄', good:'Feeling Good 😊', neutral:'Neutral 😐', sad:'A Little Down 😟', stressed:'Stressed 😰'};
  moodStatusEl.textContent = moods[currentUser.moodStatus] || 'Mood not set';
  motivationQuoteEl.textContent = ["Keep going!", "You are doing great!", "Small wins count!"][Math.floor(Math.random()*3)];
  moodButtons.forEach(btn=>btn.classList.remove('selected'));
  const moodBtn = Array.from(moodButtons).find(b=>b.dataset.mood===currentUser.moodStatus);
  if(moodBtn) moodBtn.classList.add('selected');
  renderTodos();
}
function renderTodos() {
  if(!currentUser) return;
  todoListEl.innerHTML='';
  if(currentUser.todos.length===0){todoListEl.innerHTML='<p class="text-gray-500">No tasks yet.</p>';}
  currentUser.todos.forEach(todo=>{
    const li=document.createElement('li');
    li.className='flex justify-between items-center p-2 bg-gray-50 rounded';
    li.innerHTML=`<div><input type="checkbox" ${todo.completed?'checked':''} class="mr-2">${todo.text}</div><button class="text-red-500">Delete</button>`;
    li.querySelector('input').addEventListener('change',()=>{todo.completed=!todo.completed;updateDashboardUI();});
    li.querySelector('button').addEventListener('click',()=>{currentUser.todos=currentUser.todos.filter(t=>t.id!==todo.id);updateDashboardUI();});
    todoListEl.appendChild(li);
  });
  const completed=currentUser.todos.filter(t=>t.completed).length;
  todoStatusEl.textContent=`${completed}/${currentUser.todos.length} Tasks Completed`;
}

// Login Form
loginForm.addEventListener('submit', e=>{
  e.preventDefault();
  const username=e.target.username.value;
  const password=e.target.password.value;
  if(MOCK_DB[username] && MOCK_DB[username].password===password){
    currentUser=JSON.parse(JSON.stringify(MOCK_DB[username]));
    showDashboard();
    updateDashboardUI();
  } else {
    loginMessage.textContent='Invalid username/password';
    loginMessage.classList.remove('hidden');
  }
});

// Logout
logoutBtn.addEventListener('click', ()=>{
  currentUser=null;
  showLogin();
  loginForm.reset();
  chatLog.innerHTML=`<div class="flex justify-start"><div class="chat-bubble bg-gray-200 text-gray-800 p-3 rounded-xl max-w-xs"><p>Hello! I'm your student wellness assistant. How can I help you today?</p></div></div>`;
});

// Tabs
tabButtons.forEach(btn=>{
  btn.addEventListener('click', ()=>{
    tabButtons.forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    pages.forEach(p=>p.classList.add('hidden'));
    document.getElementById(`${btn.dataset.page}-content`).classList.remove('hidden');
  });
});

// Mood Tracker
moodButtons.forEach(btn=>{
  btn.addEventListener('click', ()=>{
    if(!currentUser) return;
    currentUser.moodStatus=btn.dataset.mood;
    updateDashboardUI();
    moodMessage.textContent=`Mood updated to ${btn.dataset.mood}`;
    moodMessage.classList.remove('hidden');
    setTimeout(()=>moodMessage.classList.add('hidden'),2000);
  });
});

// Chat
chatForm.addEventListener('submit', e=>{
  e.preventDefault();
  const msg=chatInput.value.trim();
  if(msg==='') return;
  const userDiv=document.createElement('div');
  userDiv.className='flex justify-end';
  userDiv.innerHTML=`<div class="chat-bubble bg-blue-600 text-white">${msg}</div>`;
  chatLog.appendChild(userDiv);
  chatInput.value='';
  setTimeout(()=>{
    const botDiv=document.createElement('div');
    botDiv.className='flex justify-start';
    botDiv.innerHTML=`<div class="chat-bubble bg-gray-200 text-gray-800">I'm here to help! Try taking a deep breath or reviewing your tasks.</div>`;
    chatLog.appendChild(botDiv);
    chatLog.scrollTop=chatLog.scrollHeight;
  },1000);
});

// Todo Form
todoForm.addEventListener('submit', e=>{
  e.preventDefault();
  if(!currentUser) return;
  const text=todoInput.value.trim();
  if(text==='') return;
  currentUser.todos.push({id:currentUser.nextTodoId++,text:text,completed:false});
  todoInput.value='';
  updateDashboardUI();
});
