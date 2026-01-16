const CONFIG = {
    // ⚠️ REPLACE THESE WITH YOUR OWN SUPABASE KEYS ⚠️
    SUPABASE_URL: 'https://agvjxfekuxmvnanlnacx.supabase.co',
    SUPABASE_KEY: 'sb_publishable_CGSoHknNKXtYJ_jwubGbQw_fo3lGdAE',

    LOCALE: 'en-US',
    CURRENCY: 'USD'
};

// Initialize Supabase (Check if keys are set)
let supabase;
if (CONFIG.SUPABASE_URL !== 'YOUR_SUPABASE_URL') {
    supabase = window.supabase.createClient(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_KEY);
} else {
    console.warn("Supabase Keys missing in script.js");
}

let state = {
    activeProfileId: null,
    profiles: {}
};

let currentUser = null;
let isSignUpMode = false;

const elements = {
    appContainer: document.getElementById('appContainer'),
    mainHeader: document.getElementById('mainHeader'),
    views: document.querySelectorAll('.view'),
    navItems: document.querySelectorAll('.nav-item'),
    appTitle: document.getElementById('appTitle'),

    // Auth Elements
    authForm: document.getElementById('authForm'),
    authEmail: document.getElementById('authEmail'),
    authPassword: document.getElementById('authPassword'),
    authSubmitBtn: document.getElementById('authSubmitBtn'),
    authToggleLink: document.getElementById('authToggleLink'),
    authToggleText: document.getElementById('authToggleText'),
    authError: document.getElementById('authError'),
    logoutBtn: document.getElementById('logoutBtn'),

    // Dashboard Stats
    totalProfitLoss: document.getElementById('totalProfitLoss'),
    percentageBadge: document.getElementById('percentageBadge'),
    percentageGain: document.getElementById('percentageGain'),
    totalTrades: document.getElementById('totalTrades'),
    winRate: document.getElementById('winRate'),
    winLoss: document.getElementById('winLoss'),
    tradesList: document.getElementById('tradesList'),
    emptyState: document.getElementById('emptyState'),

    // Analytics
    analyticsEquity: document.getElementById('analyticsEquity'),
    statAvgGain: document.getElementById('statAvgGain'),
    statProfitFactor: document.getElementById('statProfitFactor'),
    statProfitFactorText: document.getElementById('statProfitFactorText'),
    statBestTrade: document.getElementById('statBestTrade'),
    statBestTradeAsset: document.getElementById('statBestTradeAsset'),
    statWorstTrade: document.getElementById('statWorstTrade'),
    statWorstTradeAsset: document.getElementById('statWorstTradeAsset'),
    monthlyList: document.getElementById('monthlyList'),
    chartFill: document.getElementById('chartFill'),
    chartLine: document.getElementById('chartLine'),
    chartActivePoint: document.getElementById('chartActivePoint'),

    // Inputs
    tradeForm: document.getElementById('tradeForm'),
    createProfileForm: document.getElementById('createProfileForm'),
    newProfileName: document.getElementById('newProfileName'),
    clearDataBtn: document.getElementById('clearDataBtn'),
    profileList: document.getElementById('profileList')
};

async function init() {
    setupEventListeners();

    // Check Session logic
    if (supabase) {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
            handleSessionSuccess(session.user);
        } else {
            showAuth();
        }

        // Listen for auth changes
        supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_IN' && session) {
                handleSessionSuccess(session.user);
            } else if (event === 'SIGNED_OUT') {
                currentUser = null;
                showAuth();
            }
        });
    } else {
        alert("Please configure Supabase URL and Key in script.js");
    }

    document.getElementById('tradeDate').valueAsDate = new Date();
}

// --- AUTH LOGIC ---

function showAuth() {
    elements.appContainer.classList.remove('logged-in');
    elements.mainHeader.style.display = 'none';
    switchView('view-auth');
}

async function handleSessionSuccess(user) {
    currentUser = user;
    elements.appContainer.classList.add('logged-in');
    elements.mainHeader.style.display = 'flex';

    // Load Data from Cloud
    await loadStateFromCloud();

    switchView('view-dashboard');
}

async function handleAuthSubmit(e) {
    e.preventDefault();
    if (!supabase) return;

    const email = elements.authEmail.value;
    constpassword = elements.authPassword.value;

    elements.authError.style.display = 'none';
    elements.authSubmitBtn.disabled = true;
    elements.authSubmitBtn.textContent = 'Processing...';

    try {
        if (isSignUpMode) {
            const { data, error } = await supabase.auth.signUp({
                email: email,
                password: elements.authPassword.value
            });
            if (error) throw error;
            alert('Registration successful! Please sign in.');
            toggleAuthMode(); // Switch to login
        } else {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: elements.authPassword.value
            });
            if (error) throw error;
            // onAuthStateChange will handle redirection
        }
    } catch (err) {
        elements.authError.textContent = err.message;
        elements.authError.style.display = 'block';
    } finally {
        elements.authSubmitBtn.disabled = false;
        elements.authSubmitBtn.textContent = isSignUpMode ? 'Sign Up' : 'Sign In';
    }
}

function toggleAuthMode() {
    isSignUpMode = !isSignUpMode;
    elements.authTitle.textContent = isSignUpMode ? 'Create Account' : 'Welcome Back';
    elements.authSubmitBtn.textContent = isSignUpMode ? 'Sign Up' : 'Sign In';
    elements.authToggleText.textContent = isSignUpMode ? 'Already have an account?' : "Don't have an account?";
    elements.authToggleLink.textContent = isSignUpMode ? 'Sign In' : 'Sign Up';
    elements.authError.style.display = 'none';
}

async function handleLogout() {
    if (supabase) await supabase.auth.signOut();
}

// --- CLOUD DATA LOGIC ---

// Database Schema (Run this in Supabase SQL Editor):
// create table if not exists user_data (
//   user_id uuid primary key references auth.users(id),
//   content jsonb
// );
// alter table user_data enable row level security;
// create policy "Users can all their own data" on user_data for all using (auth.uid() = user_id);

async function loadStateFromCloud() {
    if (!currentUser) return;

    const { data, error } = await supabase
        .from('user_data')
        .select('content')
        .eq('user_id', currentUser.id)
        .single();

    if (data && data.content) {
        state = data.content;
    } else {
        // Initialize Default State for new user
        const defaultId = Date.now().toString();
        state = {
            activeProfileId: defaultId,
            profiles: {
                [defaultId]: {
                    id: defaultId,
                    name: 'My Portfolio',
                    trades: [],
                    initialCapital: 0
                }
            }
        };
        saveState(); // Save initial state to cloud
    }
    updateUI();
}

async function saveState() {
    if (!currentUser || !supabase) return;

    // Optimistic UI Update first (optional)
    updateUI();

    // Persist to Cloud
    // Using upsert on user_data table
    const { error } = await supabase
        .from('user_data')
        .upsert({
            user_id: currentUser.id,
            content: state
        });

    if (error) console.error('Error saving to cloud:', error);
}


// --- EXISTING APP LOGIC ---

function getActiveProfile() {
    return state.profiles[state.activeProfileId];
}

function switchView(targetId) {
    elements.views.forEach(view => {
        if (view.id === targetId) {
            view.classList.add('active');
        } else {
            view.classList.remove('active');
        }
    });

    elements.navItems.forEach(nav => {
        if (nav.dataset.target === targetId) {
            nav.classList.add('active');
        } else {
            nav.classList.remove('active');
        }
    });

    if (targetId === 'view-dashboard') elements.appTitle.textContent = getActiveProfile()?.name || 'Portfolio';
    if (targetId === 'view-log') elements.appTitle.textContent = 'Log Trade';
    if (targetId === 'view-profile') elements.appTitle.textContent = 'Profiles';
    if (targetId === 'view-analytics') {
        elements.appTitle.textContent = 'Analytics';
        renderAnalytics(getActiveProfile());
    }
}

function setupEventListeners() {
    elements.navItems.forEach(item => {
        item.addEventListener('click', () => switchView(item.dataset.target));
    });

    // Auth Listeners
    elements.authForm.addEventListener('submit', handleAuthSubmit);
    elements.authToggleLink.addEventListener('click', (e) => {
        e.preventDefault();
        toggleAuthMode();
    });
    elements.logoutBtn.addEventListener('click', handleLogout);

    // Trade Listeners
    elements.tradeForm.addEventListener('submit', handleAddTrade);
    elements.createProfileForm.addEventListener('submit', handleCreateProfile);
    elements.clearDataBtn.addEventListener('click', () => clearCurrentProfileData());

    elements.tradesList.addEventListener('click', (e) => {
        const btn = e.target.closest('.delete-btn-card');
        if (!btn) return;
        handleDeleteTrade(Number(btn.dataset.id));
    });

    elements.profileList.addEventListener('click', (e) => {
        const card = e.target.closest('.profile-card');
        if (card && !e.target.closest('.delete-profile-btn')) {
            switchProfile(card.dataset.id);
        }
        const deleteBtn = e.target.closest('.delete-profile-btn');
        if (deleteBtn) {
            handleDeleteProfile(deleteBtn.dataset.id);
        }
    });
}

function handleCreateProfile(e) {
    e.preventDefault();
    const name = elements.newProfileName.value.trim();
    if (!name) return;

    const newId = Date.now().toString();
    state.profiles[newId] = {
        id: newId,
        name: name,
        trades: [],
        initialCapital: 0
    };

    state.activeProfileId = newId;
    elements.newProfileName.value = '';

    saveState();
    switchView('view-dashboard');
    renderProfileList();
}

function switchProfile(id) {
    if (state.profiles[id]) {
        state.activeProfileId = id;
        saveState();
        renderProfileList();
    }
}

function handleDeleteProfile(id) {
    if (Object.keys(state.profiles).length <= 1) {
        alert("You must have at least one profile.");
        return;
    }
    if (confirm(`Delete profile "${state.profiles[id].name}"?`)) {
        delete state.profiles[id];
        if (state.activeProfileId === id) {
            state.activeProfileId = Object.keys(state.profiles)[0];
        }
        saveState();
        renderProfileList();
    }
}

function renderProfileList() {
    elements.profileList.innerHTML = '';
    const profiles = Object.values(state.profiles || {});

    profiles.forEach(p => {
        const card = document.createElement('div');
        const isActive = p.id === state.activeProfileId;
        card.className = `profile-card ${isActive ? 'active-profile' : ''}`;
        card.dataset.id = p.id;

        const initialChar = p.name ? p.name.charAt(0).toUpperCase() : '?';

        card.innerHTML = `
            <div style="display:flex; align-items:center;">
                <div class="profile-avatar">${initialChar}</div>
                <div class="profile-info">
                    <span class="profile-name">${p.name} ${isActive ? '(Active)' : ''}</span>
                    <span class="profile-sub">${p.trades.length} Trades</span>
                </div>
            </div>
            ${!isActive ? `<button class="delete-btn-card delete-profile-btn" data-id="${p.id}"><span class="material-icons-round">delete_outline</span></button>` : ''}
        `;
        elements.profileList.appendChild(card);
    });
}

// --- TRADE LOGIC ---
function handleAddTrade(e) {
    e.preventDefault();
    const profile = getActiveProfile();

    const asset = document.getElementById('assetName').value;
    const newBalance = parseFloat(document.getElementById('investedAmount').value);
    const date = document.getElementById('tradeDate').value;
    const isInitial = document.getElementById('isInitialInvestment').checked;

    if (!asset || isNaN(newBalance)) return;

    if (isInitial) {
        if (profile.trades.length > 0) {
            if (!confirm('Warning: Setting Initial Capital will reset all previous trades. Continue?')) {
                return;
            }
        }
        profile.trades = [];
        profile.initialCapital = newBalance;

        profile.trades.push({
            id: Date.now(),
            asset,
            date,
            balanceAfter: newBalance,
            profit: 0,
            percentage: 0,
            isInitial: true,
            timestamp: new Date().toISOString()
        });
    } else {
        if (profile.trades.length === 0) {
            alert('Please register Initial Capital first.');
            return;
        }
        const previousBalance = profile.trades[0].balanceAfter; // Newest is 0
        const profit = newBalance - previousBalance;
        const percentage = previousBalance > 0 ? (profit / previousBalance) * 100 : 0;

        profile.trades.unshift({
            id: Date.now(),
            asset,
            date,
            balanceAfter: newBalance,
            profit: profit,
            percentage: percentage,
            isInitial: false,
            timestamp: new Date().toISOString()
        });
    }

    saveState();
    elements.tradeForm.reset();
    document.getElementById('tradeDate').valueAsDate = new Date();
    switchView('view-dashboard');
}

function handleDeleteTrade(id) {
    const profile = getActiveProfile();
    const tradeIndex = profile.trades.findIndex(t => t.id === id);
    if (tradeIndex === -1) return;

    const trade = profile.trades[tradeIndex];
    if (trade.isInitial) {
        if (confirm('Removing Initial Capital will reset all data. Are you sure?')) {
            profile.trades = [];
            profile.initialCapital = 0;
            saveState();
        }
        return;
    }
    if (confirm('Delete this trade?')) {
        profile.trades.splice(tradeIndex, 1);
        saveState();
    }
}

function clearCurrentProfileData() {
    if (confirm('Clear ALL data for the CURRENT profile?')) {
        const profile = getActiveProfile();
        profile.trades = [];
        profile.initialCapital = 0;
        saveState();
    }
}

function updateUI() {
    const profile = getActiveProfile();
    if (!profile) return;

    // Summary
    const currentVal = profile.trades.length > 0 ? profile.trades[0].balanceAfter : 0;
    const totalDiff = currentVal - profile.initialCapital;
    const totalPerc = profile.initialCapital > 0 ? (totalDiff / profile.initialCapital) * 100 : 0;

    const sign = totalDiff > 0 ? '+' : '';
    elements.totalProfitLoss.textContent = `${sign}${formatMoney(totalDiff)}`;
    elements.percentageGain.textContent = `${totalPerc.toFixed(1)}%`;

    // Badge
    elements.percentageBadge.className = 'pnl-badge ' + (totalDiff >= 0 ? 'positive' : 'negative');
    elements.percentageBadge.querySelector('.material-icons-round').textContent = totalDiff >= 0 ? 'trending_up' : 'trending_down';

    // Stats
    const activeTrades = profile.trades.filter(t => !t.isInitial);
    const totalTradesCount = activeTrades.length;
    const wins = activeTrades.filter(t => t.profit > 0).length;
    const losses = activeTrades.filter(t => t.profit <= 0).length;
    const winRateVal = totalTradesCount > 0 ? Math.round((wins / totalTradesCount) * 100) : 0;

    elements.totalTrades.textContent = totalTradesCount;
    elements.winRate.textContent = `${winRateVal}%`;
    elements.winLoss.textContent = `${wins}W / ${losses}L`;

    renderTradesList(profile.trades);
}

function renderTradesList(trades) {
    elements.tradesList.innerHTML = '';
    if (trades.length === 0) {
        elements.emptyState.classList.remove('hidden');
        return;
    }
    elements.emptyState.classList.add('hidden');

    trades.forEach(trade => {
        const card = document.createElement('div');
        card.className = 'trade-card';
        const isProfit = trade.profit >= 0;
        const profitClass = isProfit ? 'profit-text' : 'loss-text';
        const sign = isProfit ? '+' : '';
        const displayProfit = trade.isInitial ? 'Start' : `${sign}${formatMoney(trade.profit)}`;
        const displayPerc = trade.isInitial ? '' : `<span class="trade-perc ${profitClass}">(${sign}${trade.percentage.toFixed(1)}%)</span>`;

        // Logo Logic
        const assetInitial = trade.asset ? trade.asset.charAt(0).toUpperCase() : '?';
        const symbolLower = trade.asset ? trade.asset.toLowerCase() : '';
        const logoUrl = `https://assets.coincap.io/assets/icons/${symbolLower}@2x.png`;

        card.innerHTML = `
            <div class="trade-left">
                <div class="asset-icon">
                    <img src="${logoUrl}" alt="${assetInitial}" onerror="this.onerror=null; this.style.display='none'; this.parentElement.innerText='${assetInitial}';">
                </div>
                <div class="trade-info">
                    <span class="trade-asset">${trade.asset}/USDT</span>
                    <span class="trade-date">${formatDate(trade.date)}</span>
                </div>
            </div>
            <div class="trade-right">
                <div class="trade-pnl ${!trade.isInitial ? profitClass : ''}">
                    ${displayProfit} ${displayPerc}
                </div>
                <span class="trade-balance">Bal: ${formatMoney(trade.balanceAfter)}</span>
            </div>
            <button class="delete-btn-card" data-id="${trade.id}"><span class="material-icons-round">close</span></button>
        `;
        elements.tradesList.appendChild(card);
    });
}

// --- ANALYTICS LOGIC ---

function renderAnalytics(profile) {
    if (!profile || profile.trades.length === 0) {
        elements.analyticsEquity.textContent = "$0.00";
        elements.statAvgGain.textContent = "0%";
        elements.monthlyList.innerHTML = "<p style='color:var(--text-muted); text-align:center;'>No data available</p>";
        elements.chartLine.setAttribute('d', '');
        elements.chartFill.setAttribute('d', '');
        return;
    }

    // 1. Equity
    const currentEquity = profile.trades[0].balanceAfter;
    elements.analyticsEquity.textContent = formatMoney(currentEquity);

    // 2. Metrics
    const activeTrades = profile.trades.filter(t => !t.isInitial);

    // Avg Gain
    const totalPerc = activeTrades.reduce((sum, t) => sum + t.percentage, 0);
    const avgPerc = activeTrades.length > 0 ? (totalPerc / activeTrades.length) : 0;
    elements.statAvgGain.textContent = `${avgPerc > 0 ? '+' : ''}${avgPerc.toFixed(1)}%`;
    elements.statAvgGain.className = `metric-value ${avgPerc >= 0 ? 'profit-text' : 'loss-text'}`;

    // Best / Worst
    if (activeTrades.length > 0) {
        const sorted = [...activeTrades].sort((a, b) => b.percentage - a.percentage);
        const best = sorted[0];
        const worst = sorted[sorted.length - 1];

        elements.statBestTrade.textContent = `+${best.percentage.toFixed(1)}%`;
        elements.statBestTradeAsset.textContent = best.asset;

        elements.statWorstTrade.textContent = `${worst.percentage.toFixed(1)}%`;
        elements.statWorstTradeAsset.textContent = worst.asset;
    } else {
        elements.statBestTrade.textContent = "0%";
        elements.statWorstTrade.textContent = "0%";
    }

    // Profit Factor
    const grossWin = activeTrades.filter(t => t.profit > 0).reduce((s, t) => s + t.profit, 0);
    const grossLoss = Math.abs(activeTrades.filter(t => t.profit < 0).reduce((s, t) => s + t.profit, 0));
    const pf = grossLoss > 0 ? (grossWin / grossLoss) : (grossWin > 0 ? 999 : 0);
    elements.statProfitFactor.textContent = pf === 999 ? "∞" : pf.toFixed(2);

    let pfText = "Neutral";
    if (pf > 2) pfText = "Excellent";
    else if (pf > 1.5) pfText = "Good";
    else if (pf > 1) pfText = "Profitable";
    else if (pf > 0) pfText = "Unprofitable";
    elements.statProfitFactorText.textContent = pfText;


    // 3. Render Chart
    generateChartSVG(profile.trades);

    // 4. Monthly Breakdown
    renderMonthlyBreakdown(profile.trades);
}

function generateChartSVG(trades) {
    // Sort chronological: Oldest first
    const chronological = [...trades].sort((a, b) => new Date(a.date) - new Date(b.date));

    // Prepare data points (Balance history)
    // We want to map balances to Y axis (0 to 220px)
    // Map dates to X axis (0 to 375px)
    const points = chronological.map(t => t.balanceAfter);
    if (points.length < 2) {
        // Not enough data for a line
        elements.chartLine.setAttribute('d', '');
        elements.chartFill.setAttribute('d', '');
        return;
    }

    const maxVal = Math.max(...points) * 1.05; // 5% buffer
    const minVal = Math.min(...points) * 0.95;
    const range = maxVal - minVal;

    const width = 375;
    const height = 220;

    const coords = points.map((val, index) => {
        const x = (index / (points.length - 1)) * width;
        const normalized = (val - minVal) / (range || 1);
        const y = height - (normalized * height);
        return { x, y };
    });

    let d = `M ${coords[0].x} ${coords[0].y}`;
    coords.slice(1).forEach(pt => {
        d += ` L ${pt.x} ${pt.y}`;
    });

    elements.chartLine.setAttribute('d', d);

    // Fill Area
    const fillD = `${d} L ${width} ${height} L 0 ${height} Z`;
    elements.chartFill.setAttribute('d', fillD);

    // Active Point (Last)
    const last = coords[coords.length - 1];
    elements.chartActivePoint.setAttribute('cx', last.x);
    elements.chartActivePoint.setAttribute('cy', last.y);
    elements.chartActivePoint.classList.remove('hidden');
}

function renderMonthlyBreakdown(trades) {
    const months = {};

    trades.forEach(t => {
        if (t.isInitial) return;
        const d = new Date(t.date);
        const key = `${d.getFullYear()}-${d.getMonth() + 1}`; // "2024-1"
        const monthName = d.toLocaleDateString(CONFIG.LOCALE, { month: 'short' });

        if (!months[key]) months[key] = { name: monthName, profit: 0 };
        months[key].profit += t.profit;
    });

    const sortedKeys = Object.keys(months).sort((a, b) => {
        const [y1, m1] = a.split('-').map(Number);
        const [y2, m2] = b.split('-').map(Number);
        return (y1 * 12 + m1) - (y2 * 12 + m2);
    }).reverse();

    let html = '';
    const maxProfit = Math.max(...Object.values(months).map(m => Math.abs(m.profit))) || 1;

    sortedKeys.forEach(key => {
        const m = months[key];
        const isPos = m.profit >= 0;
        const width = (Math.abs(m.profit) / maxProfit) * 100;
        const colorClass = isPos ? 'positive' : 'negative';
        const textColor = isPos ? 'var(--text-white)' : 'var(--danger-red)';

        html += `
            <div class="month-row">
                <span class="month-name">${m.name}</span>
                <div class="progress-container">
                    <div class="progress-bar ${colorClass}" style="width: ${width}%;"></div>
                </div>
                <span class="month-value" style="color:${textColor}">${isPos ? '+' : ''}${formatMoney(m.profit)}</span>
            </div>
        `;
    });

    if (html === '') html = '<p style="color:var(--text-muted); text-align:center;">No monthly data</p>';
    elements.monthlyList.innerHTML = html;
}

function formatMoney(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

init();
