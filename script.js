// DIAGNÓSTICO DE ARRANQUE
console.log("Script cargando...");

const CONFIG = {
    SUPABASE_URL: 'https://agvjxfekuxmvnanlnacx.supabase.co',
    SUPABASE_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFndmp4ZmVrdXhtdm5hbmxuYWN4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg1NjUwMjksImV4cCI6MjA4NDE0MTAyOX0.W5ZVBr3y1y_OVD9EeYVTRmeiU04ImcuUXFxooHE4J64',
    LOCALE: 'es-ES',
    CURRENCY: 'USD'
};

// Initialize Supabase
let supabase;
try {
    if (window.supabase) {
        supabase = window.supabase.createClient(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_KEY);
        console.log("Cliente Supabase Inicializado");
    } else {
        console.error("Supabase SDK no cargado");
        alert("ERROR: La librería de Supabase no se cargó. ¿Tienes bloqueo de anuncios o falta internet?");
    }
} catch (err) {
    console.error("Error Inicialización Supabase:", err);
    alert("Error al iniciar Supabase: " + err.message);
}

// Global State
let state = {
    activeProfileId: null,
    profiles: {}
};

let currentUser = null;
let isSignUpMode = false;
let elements = {};

// --- INIT ---
async function init() {
    console.log("App Inicializándose...");

    // Map Elements
    elements = {
        appContainer: document.getElementById('appContainer'),
        mainHeader: document.getElementById('mainHeader'),
        views: document.querySelectorAll('.view'),
        navItems: document.querySelectorAll('.nav-item'),
        appTitle: document.getElementById('appTitle'),

        // Auth
        authForm: document.getElementById('authForm'),
        authEmail: document.getElementById('authEmail'),
        authPassword: document.getElementById('authPassword'),
        authSubmitBtn: document.getElementById('authSubmitBtn'),
        authToggleLink: document.getElementById('authToggleLink'),
        authToggleText: document.getElementById('authToggleText'),
        authError: document.getElementById('authError'),
        logoutBtn: document.getElementById('logoutBtn'),

        // Dashboard
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

    setupEventListeners();

    // Check Session logic
    if (supabase) {
        try {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                console.log("Sesión encontrada:", session.user.email);
                handleSessionSuccess(session.user);
            } else {
                console.log("Sin sesión, mostrando auth");
                showAuth();
            }

            // Listen for auth changes
            supabase.auth.onAuthStateChange((event, session) => {
                console.log("Cambio Auth:", event);
                if (event === 'SIGNED_IN' && session) {
                    handleSessionSuccess(session.user);
                } else if (event === 'SIGNED_OUT') {
                    currentUser = null;
                    showAuth();
                }
            });
        } catch (err) {
            console.error("Error Auth:", err);
            showAuth();
        }
    } else {
        showAuth();
    }

    if (document.getElementById('tradeDate')) {
        document.getElementById('tradeDate').valueAsDate = new Date();
    }
}

// --- AUTH LOGIC ---

function showAuth() {
    if (elements.appContainer) elements.appContainer.classList.remove('logged-in');
    if (elements.mainHeader) elements.mainHeader.style.display = 'none';
    switchView('view-auth');
}

async function handleSessionSuccess(user) {
    currentUser = user;
    if (elements.appContainer) elements.appContainer.classList.add('logged-in');
    if (elements.mainHeader) elements.mainHeader.style.display = 'flex';
    await loadStateFromCloud();
    switchView('view-dashboard');
}

async function handleAuthSubmit(e) {
    e.preventDefault();
    if (!supabase) {
        alert("ERROR CRÍTICO: No se pudo conectar con Supabase.");
        return;
    }

    const email = elements.authEmail.value;
    const password = elements.authPassword.value;

    if (!email || !password) {
        alert("Por favor introduce correo y contraseña");
        return;
    }

    elements.authError.style.display = 'none';
    elements.authSubmitBtn.disabled = true;
    elements.authSubmitBtn.textContent = 'Procesando...';

    try {
        if (isSignUpMode) {
            const { data, error } = await supabase.auth.signUp({
                email: email,
                password: password
            });
            if (error) throw error;
            alert('¡Registro exitoso! Verifica tu correo (si está habilitado) o Inicia Sesión.');
            toggleAuthMode();
        } else {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password
            });
            if (error) throw error;
        }
    } catch (err) {
        console.error(err);
        alert("DEBUG ERROR: " + JSON.stringify(err, null, 2));

        let msg = err.message;
        if (msg === "Invalid login credentials") msg = "Credenciales inválidas. Verifica tu correo y contraseña.";
        if (msg.includes("weak_password")) msg = "La contraseña debe tener al menos 6 caracteres.";

        elements.authError.textContent = msg;
        elements.authError.style.display = 'block';
    } finally {
        elements.authSubmitBtn.disabled = false;
        elements.authSubmitBtn.textContent = isSignUpMode ? 'Registrarse' : 'Iniciar Sesión';
    }
}

function toggleAuthMode() {
    isSignUpMode = !isSignUpMode;
    elements.authTitle.textContent = isSignUpMode ? 'Crear Cuenta' : 'Bienvenido de Nuevo';
    elements.authSubmitBtn.textContent = isSignUpMode ? 'Registrarse' : 'Iniciar Sesión';
    elements.authToggleText.textContent = isSignUpMode ? '¿Ya tienes cuenta?' : "¿No tienes cuenta?";
    elements.authToggleLink.textContent = isSignUpMode ? 'Iniciar Sesión' : 'Registrarse';
    elements.authError.style.display = 'none';
}

async function handleLogout() {
    if (supabase) await supabase.auth.signOut();
}

// --- CLOUD DATA LOGIC ---

async function loadStateFromCloud() {
    if (!currentUser) return;

    try {
        const { data, error } = await supabase
            .from('user_data')
            .select('content')
            .eq('user_id', currentUser.id)
            .maybeSingle();

        if (data && data.content) {
            state = data.content;
        } else {
            console.log("No se encontraron datos previos, creando nuevo estado.");
            const defaultId = Date.now().toString();
            state = {
                activeProfileId: defaultId,
                profiles: {
                    [defaultId]: {
                        id: defaultId,
                        name: 'Mi Portafolio',
                        trades: [],
                        initialCapital: 0
                    }
                }
            };
            await saveState();
        }
    } catch (err) {
        console.error("Error cargando datos:", err);
    }

    updateUI();
}

async function saveState() {
    if (!currentUser || !supabase) return;
    updateUI();

    try {
        const { error } = await supabase
            .from('user_data')
            .upsert({ user_id: currentUser.id, content: state });
        if (error) console.error('Error guardando en nube:', error);
    } catch (err) {
        console.error("Error guardando datos:", err);
    }
}

// --- HELPER & UI LOGIC ---

function getActiveProfile() {
    if (!state.profiles[state.activeProfileId]) {
        const keys = Object.keys(state.profiles);
        if (keys.length > 0) state.activeProfileId = keys[0];
    }
    return state.profiles[state.activeProfileId];
}

function switchView(targetId) {
    if (!elements.views) return;

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

    if (!elements.appTitle) return;

    const profile = getActiveProfile();
    const profileName = profile ? profile.name : 'Portafolio';

    if (targetId === 'view-dashboard') elements.appTitle.textContent = profileName;
    if (targetId === 'view-log') elements.appTitle.textContent = 'Registrar Op.';
    if (targetId === 'view-profile') elements.appTitle.textContent = 'Perfiles';
    if (targetId === 'view-analytics') {
        elements.appTitle.textContent = 'Análisis';
        renderAnalytics(profile);
    }
}

function setupEventListeners() {
    if (elements.authForm) elements.authForm.addEventListener('submit', handleAuthSubmit);
    if (elements.authToggleLink) elements.authToggleLink.addEventListener('click', (e) => {
        e.preventDefault();
        toggleAuthMode();
    });
    if (elements.logoutBtn) elements.logoutBtn.addEventListener('click', handleLogout);

    if (elements.navItems) {
        elements.navItems.forEach(item => {
            item.addEventListener('click', () => switchView(item.dataset.target));
        });
    }

    if (elements.tradeForm) elements.tradeForm.addEventListener('submit', handleAddTrade);
    if (elements.createProfileForm) elements.createProfileForm.addEventListener('submit', handleCreateProfile);
    if (elements.clearDataBtn) elements.clearDataBtn.addEventListener('click', () => clearCurrentProfileData());

    if (elements.tradesList) {
        elements.tradesList.addEventListener('click', (e) => {
            const btn = e.target.closest('.delete-btn-card');
            if (!btn) return;
            handleDeleteTrade(Number(btn.dataset.id));
        });
    }

    if (elements.profileList) {
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
        alert("Debes tener al menos un perfil.");
        return;
    }
    if (confirm(`¿Eliminar perfil "${state.profiles[id].name}"?`)) {
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
                    <span class="profile-name">${p.name} ${isActive ? '(Activo)' : ''}</span>
                    <span class="profile-sub">${p.trades.length} Operaciones</span>
                </div>
            </div>
            ${!isActive ? `<button class="delete-btn-card delete-profile-btn" data-id="${p.id}"><span class="material-icons-round">delete_outline</span></button>` : ''}
        `;
        elements.profileList.appendChild(card);
    });
}

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
            if (!confirm('Advertencia: Establecer Capital Inicial reiniciará todas las operaciones anteriores. ¿Continuar?')) {
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
            alert('Por favor registra el Capital Inicial primero.');
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
        if (confirm('Eliminar el Capital Inicial reiniciará todos los datos. ¿Estás seguro?')) {
            profile.trades = [];
            profile.initialCapital = 0;
            saveState();
        }
        return;
    }
    if (confirm('¿Eliminar esta operación?')) {
        profile.trades.splice(tradeIndex, 1);
        saveState();
    }
}

function clearCurrentProfileData() {
    if (confirm('¿Borrar TODOS los datos del perfil ACTUAL?')) {
        const profile = getActiveProfile();
        profile.trades = [];
        profile.initialCapital = 0;
        saveState();
    }
}

function updateUI() {
    const profile = getActiveProfile();
    if (!profile) return;

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
    elements.winLoss.textContent = `${wins}G / ${losses}P`;

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
        const displayProfit = trade.isInitial ? 'Inicio' : `${sign}${formatMoney(trade.profit)}`;
        const displayPerc = trade.isInitial ? '' : `<span class="trade-perc ${profitClass}">(${sign}${trade.percentage.toFixed(1)}%)</span>`;

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

function renderAnalytics(profile) {
    if (!profile || profile.trades.length === 0) {
        elements.analyticsEquity.textContent = "$0.00";
        elements.statAvgGain.textContent = "0%";
        elements.monthlyList.innerHTML = "<p style='color:var(--text-muted); text-align:center;'>No hay datos disponibles</p>";
        elements.chartLine.setAttribute('d', '');
        elements.chartFill.setAttribute('d', '');
        return;
    }

    const currentEquity = profile.trades[0].balanceAfter;
    elements.analyticsEquity.textContent = formatMoney(currentEquity);

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
    if (pf > 2) pfText = "Excelente";
    else if (pf > 1.5) pfText = "Bueno";
    else if (pf > 1) pfText = "Rentable";
    else if (pf > 0) pfText = "No Rentable";
    elements.statProfitFactorText.textContent = pfText;


    // Render Chart
    generateChartSVG(profile.trades);

    // Monthly Breakdown
    renderMonthlyBreakdown(profile.trades);
}

function generateChartSVG(trades) {
    const chronological = [...trades].sort((a, b) => new Date(a.date) - new Date(b.date));

    const points = chronological.map(t => t.balanceAfter);
    if (points.length < 2) {
        elements.chartLine.setAttribute('d', '');
        elements.chartFill.setAttribute('d', '');
        return;
    }

    const maxVal = Math.max(...points) * 1.05;
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

    const fillD = `${d} L ${width} ${height} L 0 ${height} Z`;
    elements.chartFill.setAttribute('d', fillD);

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
        const key = `${d.getFullYear()}-${d.getMonth() + 1}`;
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

    if (html === '') html = '<p style="color:var(--text-muted); text-align:center;">Sin datos mensuales</p>';
    elements.monthlyList.innerHTML = html;
}

function formatMoney(amount) {
    return new Intl.NumberFormat(CONFIG.LOCALE, {
        style: 'currency',
        currency: CONFIG.CURRENCY
    }).format(amount);
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString(CONFIG.LOCALE, { month: 'short', day: 'numeric' });
}

// Ensure DOM is fully loaded before init
document.addEventListener('DOMContentLoaded', init);
