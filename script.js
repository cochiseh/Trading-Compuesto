// ==================== CONFIGURATION ====================
const CONFIG = {
    SUPABASE_URL: 'https://agvjxfekuxmvnanlnacx.supabase.co',
    SUPABASE_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFndmp4ZmVrdXhtdm5hbmxuYWN4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg1NjUwMjksImV4cCI6MjA4NDE0MTAyOX0.W5ZVBr3y1y_OVD9EeYVTRmeiU04ImcuUXFxooHE4J64',
    LOCALE: 'es-ES',
    CURRENCY: 'USD'
};

// Strategy Types
const STRATEGY_TYPES = {
    COMPOUND: 'compound',
    NORMAL: 'normal',
    OBJECTIVES: 'objectives'
};

// Top 100 Cryptocurrencies
const CRYPTO_LIST = [
    { symbol: 'BTC', name: 'Bitcoin', logo: 'https://assets.coingecko.com/coins/images/1/small/bitcoin.png' },
    { symbol: 'ETH', name: 'Ethereum', logo: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png' },
    { symbol: 'USDT', name: 'Tether', logo: 'https://assets.coingecko.com/coins/images/325/small/Tether.png' },
    { symbol: 'BNB', name: 'BNB', logo: 'https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png' },
    { symbol: 'SOL', name: 'Solana', logo: 'https://assets.coingecko.com/coins/images/4128/small/solana.png' },
    { symbol: 'XRP', name: 'XRP', logo: 'https://assets.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png' },
    { symbol: 'USDC', name: 'USD Coin', logo: 'https://assets.coingecko.com/coins/images/6319/small/usdc.png' },
    { symbol: 'ADA', name: 'Cardano', logo: 'https://assets.coingecko.com/coins/images/975/small/cardano.png' },
    { symbol: 'DOGE', name: 'Dogecoin', logo: 'https://assets.coingecko.com/coins/images/5/small/dogecoin.png' },
    { symbol: 'AVAX', name: 'Avalanche', logo: 'https://assets.coingecko.com/coins/images/12559/small/Avalanche_Circle_RedWhite_Trans.png' },
    { symbol: 'SHIB', name: 'Shiba Inu', logo: 'https://assets.coingecko.com/coins/images/11939/small/shiba.png' },
    { symbol: 'DOT', name: 'Polkadot', logo: 'https://assets.coingecko.com/coins/images/12171/small/polkadot.png' },
    { symbol: 'LINK', name: 'Chainlink', logo: 'https://assets.coingecko.com/coins/images/877/small/chainlink-new-logo.png' },
    { symbol: 'MATIC', name: 'Polygon', logo: 'https://assets.coingecko.com/coins/images/4713/small/polygon.png' },
    { symbol: 'LTC', name: 'Litecoin', logo: 'https://assets.coingecko.com/coins/images/2/small/litecoin.png' },
    { symbol: 'UNI', name: 'Uniswap', logo: 'https://assets.coingecko.com/coins/images/12504/small/uni.jpg' },
    { symbol: 'PEPE', name: 'Pepe', logo: 'https://assets.coingecko.com/coins/images/29850/small/pepe-token.jpeg' },
    { symbol: 'APT', name: 'Aptos', logo: 'https://assets.coingecko.com/coins/images/26455/small/aptos_round.png' },
    { symbol: 'ATOM', name: 'Cosmos', logo: 'https://assets.coingecko.com/coins/images/1481/small/cosmos_hub.png' },
    { symbol: 'ARB', name: 'Arbitrum', logo: 'https://assets.coingecko.com/coins/images/16547/small/photo_2023-03-29_21.47.00.jpeg' },
    { symbol: 'OP', name: 'Optimism', logo: 'https://assets.coingecko.com/coins/images/25244/small/Optimism.png' },
    { symbol: 'SUI', name: 'Sui', logo: 'https://assets.coingecko.com/coins/images/26375/small/sui_asset.jpeg' },
    { symbol: 'INJ', name: 'Injective', logo: 'https://assets.coingecko.com/coins/images/12882/small/Secondary_Symbol.png' },
    { symbol: 'AAVE', name: 'Aave', logo: 'https://assets.coingecko.com/coins/images/12645/small/AAVE.png' },
    { symbol: 'FTM', name: 'Fantom', logo: 'https://assets.coingecko.com/coins/images/4001/small/Fantom_round.png' },
    { symbol: 'BONK', name: 'Bonk', logo: 'https://assets.coingecko.com/coins/images/28600/small/bonk.jpg' },
    { symbol: 'WIF', name: 'dogwifhat', logo: 'https://assets.coingecko.com/coins/images/33566/small/dogwifhat.jpg' },
    { symbol: 'JUP', name: 'Jupiter', logo: 'https://assets.coingecko.com/coins/images/34188/small/jup.png' },
    { symbol: 'NEAR', name: 'NEAR', logo: 'https://assets.coingecko.com/coins/images/10365/small/near.jpg' },
    { symbol: 'FIL', name: 'Filecoin', logo: 'https://assets.coingecko.com/coins/images/12817/small/filecoin.png' }
];

// Supabase Client
let supabaseClient = null;
if (window.supabase) {
    supabaseClient = window.supabase.createClient(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_KEY);
}

// Global State
let state = { activeProfileId: null, profiles: {}, cryptoUsage: {} };
let currentUser = null;
let isSignUpMode = false;
let elements = {};
let selectedCrypto = null;
let selectedStrategy = null;
let currentTradeId = null;
let selectedTimeFilter = 'ALL';
let currentCryptoTarget = 'compound'; // 'compound' or 'normal'
let currentGoalId = null; // For goal detail view
let currentGoalTradeId = null; // For editing goal trades

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', init);

async function init() {
    mapElements();
    setupEventListeners();

    // Apply saved language preference on load
    applyLanguage();

    if (supabaseClient) {
        try {
            const { data: { session } } = await supabaseClient.auth.getSession();
            if (session) {
                await handleSessionSuccess(session.user);
            } else {
                showAuth();
            }
            supabaseClient.auth.onAuthStateChange((event, session) => {
                if (event === 'SIGNED_IN' && session) handleSessionSuccess(session.user);
                else if (event === 'SIGNED_OUT') { currentUser = null; showAuth(); }
            });
        } catch (err) { showAuth(); }
    } else { showAuth(); }

    document.getElementById('tradeDate').valueAsDate = new Date();
    document.getElementById('tradeDateNormal').valueAsDate = new Date();
}

function mapElements() {
    elements = {
        appContainer: document.getElementById('appContainer'),
        mainHeader: document.getElementById('mainHeader'),
        bottomNav: document.getElementById('bottomNav'),
        views: document.querySelectorAll('.view'),
        navItems: document.querySelectorAll('.nav-item'),
        appTitle: document.getElementById('appTitle'),
        userAvatar: document.getElementById('userAvatar'),
        userDropdown: document.getElementById('userDropdown'),
        dropdownAvatar: document.getElementById('dropdownAvatar'),
        dropdownEmail: document.getElementById('dropdownEmail'),
        dropdownLogout: document.getElementById('dropdownLogout'),
        languageToggle: document.getElementById('languageToggle'),
        strategyBadge: document.getElementById('strategyBadge'),
        strategyBadgeIcon: document.getElementById('strategyBadgeIcon'),
        strategyBadgeText: document.getElementById('strategyBadgeText'),

        // Auth
        authForm: document.getElementById('authForm'),
        authTitle: document.getElementById('authTitle'),
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

        // Forms
        compoundFormContainer: document.getElementById('compoundFormContainer'),
        normalFormContainer: document.getElementById('normalFormContainer'),
        tradeForm: document.getElementById('tradeForm'),
        normalTradeForm: document.getElementById('normalTradeForm'),
        cryptoSelector: document.getElementById('cryptoSelector'),
        cryptoSelectorNormal: document.getElementById('cryptoSelectorNormal'),
        cryptoSelectorGoal: document.getElementById('cryptoSelectorGoal'),

        // Analytics
        analyticsEquity: document.getElementById('analyticsEquity'),
        equityPercent: document.getElementById('equityPercent'),
        equityBadge: document.getElementById('equityBadge'),
        timeFilters: document.getElementById('timeFilters'),
        longShortStats: document.getElementById('longShortStats'),
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

        // Modals
        cryptoModal: document.getElementById('cryptoModal'),
        strategyModal: document.getElementById('strategyModal'),
        tradeDetailModal: document.getElementById('tradeDetailModal'),
        profileList: document.getElementById('profileList'),
        clearDataBtn: document.getElementById('clearDataBtn'),
        createProfileBtn: document.getElementById('createProfileBtn'),

        // Objectives
        goalsList: document.getElementById('goalsList'),
        createGoalModal: document.getElementById('createGoalModal'),
        addGoalTradeModal: document.getElementById('addGoalTradeModal'),
        goalTradeDetailModal: document.getElementById('goalTradeDetailModal')
    };
}

function setupEventListeners() {
    // Auth
    elements.authForm?.addEventListener('submit', handleAuthSubmit);
    elements.authToggleLink?.addEventListener('click', (e) => { e.preventDefault(); toggleAuthMode(); });
    elements.logoutBtn?.addEventListener('click', handleLogout);

    // User Dropdown Menu
    elements.userAvatar?.addEventListener('click', toggleUserDropdown);
    elements.dropdownLogout?.addEventListener('click', () => { closeUserDropdown(); handleLogout(); });
    elements.languageToggle?.addEventListener('click', handleLanguageSwitch);
    document.addEventListener('click', (e) => {
        if (elements.userDropdown?.classList.contains('active')) {
            const container = document.querySelector('.user-menu-container');
            if (container && !container.contains(e.target)) {
                closeUserDropdown();
            }
        }
    });

    // Navigation
    elements.navItems?.forEach(item => {
        item.addEventListener('click', () => switchView(item.dataset.target));
    });

    // Forms
    elements.tradeForm?.addEventListener('submit', handleAddTradeCompound);
    elements.normalTradeForm?.addEventListener('submit', handleAddTradeNormal);
    elements.cryptoSelector?.addEventListener('click', () => { currentCryptoTarget = 'compound'; openCryptoModal(); });
    elements.cryptoSelectorNormal?.addEventListener('click', () => { currentCryptoTarget = 'normal'; openCryptoModal(); });
    elements.cryptoSelectorGoal?.addEventListener('click', () => { currentCryptoTarget = 'goal'; openCryptoModal(); });

    // Trade Type Toggle
    document.getElementById('btnLong')?.addEventListener('click', () => setTradeType('long'));
    document.getElementById('btnShort')?.addEventListener('click', () => setTradeType('short'));

    // Profile
    elements.createProfileBtn?.addEventListener('click', openStrategyModal);
    elements.clearDataBtn?.addEventListener('click', handleClearData);
    elements.profileList?.addEventListener('click', handleProfileClick);
    elements.tradesList?.addEventListener('click', handleTradeClick);

    // Crypto Modal
    document.getElementById('closeCryptoModal')?.addEventListener('click', closeCryptoModal);
    document.getElementById('cryptoSearch')?.addEventListener('input', (e) => renderCryptoList(e.target.value));
    document.getElementById('addCustomCrypto')?.addEventListener('click', addCustomCrypto);
    elements.cryptoModal?.addEventListener('click', (e) => { if (e.target === elements.cryptoModal) closeCryptoModal(); });

    // Strategy Modal
    document.getElementById('closeStrategyModal')?.addEventListener('click', closeStrategyModal);
    document.querySelectorAll('.strategy-card').forEach(card => {
        card.addEventListener('click', () => selectStrategy(card.dataset.strategy));
    });
    document.getElementById('confirmStrategy')?.addEventListener('click', confirmCreateProfile);
    elements.strategyModal?.addEventListener('click', (e) => { if (e.target === elements.strategyModal) closeStrategyModal(); });

    // Trade Detail Modal
    document.getElementById('closeTradeDetail')?.addEventListener('click', closeTradeDetail);
    document.getElementById('deleteTradeBtn')?.addEventListener('click', deleteCurrentTrade);
    elements.tradeDetailModal?.addEventListener('click', (e) => { if (e.target === elements.tradeDetailModal) closeTradeDetail(); });

    // Time Filters
    document.querySelectorAll('.time-filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.time-filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            selectedTimeFilter = btn.dataset.period;
            renderAnalytics(getActiveProfile());
        });
    });

    // Objectives/Goals
    document.getElementById('createGoalBtn')?.addEventListener('click', openCreateGoalModal);
    document.getElementById('closeCreateGoalModal')?.addEventListener('click', closeCreateGoalModal);
    document.getElementById('createGoalForm')?.addEventListener('submit', handleCreateGoal);
    document.getElementById('createGoalModal')?.addEventListener('click', (e) => { if (e.target.id === 'createGoalModal') closeCreateGoalModal(); });

    document.getElementById('closeAddGoalTradeModal')?.addEventListener('click', closeAddGoalTradeModal);
    document.getElementById('addGoalTradeForm')?.addEventListener('submit', handleAddGoalTrade);
    document.getElementById('addGoalTradeModal')?.addEventListener('click', (e) => { if (e.target.id === 'addGoalTradeModal') closeAddGoalTradeModal(); });

    document.getElementById('addGoalTradeBtn')?.addEventListener('click', openAddGoalTradeModal);
    document.getElementById('deleteGoalBtn')?.addEventListener('click', handleDeleteGoal);

    document.getElementById('closeGoalTradeDetail')?.addEventListener('click', closeGoalTradeDetail);
    document.getElementById('deleteGoalTradeBtn')?.addEventListener('click', deleteCurrentGoalTrade);
    document.getElementById('goalTradeDetailModal')?.addEventListener('click', (e) => { if (e.target.id === 'goalTradeDetailModal') closeGoalTradeDetail(); });
}

// ==================== AUTH ====================
function toggleAuthMode() {
    isSignUpMode = !isSignUpMode;
    elements.authTitle.textContent = isSignUpMode ? 'Create Account' : 'Welcome Back';
    elements.authSubmitBtn.textContent = isSignUpMode ? 'Sign Up' : 'Sign In';
    elements.authToggleText.textContent = isSignUpMode ? 'Already have an account?' : "Don't have an account?";
    elements.authToggleLink.textContent = isSignUpMode ? 'Sign In' : 'Sign Up';
    elements.authError.style.display = 'none';
}

async function handleAuthSubmit(e) {
    e.preventDefault();
    if (!supabaseClient) return;
    const email = elements.authEmail.value.trim();
    const password = elements.authPassword.value;
    if (!email || !password || password.length < 6) { showAuthError('Valid email and password (min 6 chars) required'); return; }
    elements.authSubmitBtn.disabled = true;
    elements.authSubmitBtn.textContent = 'Processing...';
    elements.authError.style.display = 'none';
    try {
        if (isSignUpMode) {
            const { error } = await supabaseClient.auth.signUp({ email, password });
            if (error) throw error;
            alert('Registration successful!');
            toggleAuthMode();
        } else {
            const { error } = await supabaseClient.auth.signInWithPassword({ email, password });
            if (error) throw error;
        }
    } catch (err) {
        showAuthError(err.message.includes('Invalid login') ? 'Invalid credentials' : err.message);
    } finally {
        elements.authSubmitBtn.disabled = false;
        elements.authSubmitBtn.textContent = isSignUpMode ? 'Sign Up' : 'Sign In';
    }
}

function showAuthError(msg) { elements.authError.textContent = msg; elements.authError.style.display = 'block'; }
function showAuth() { elements.appContainer?.classList.remove('logged-in'); elements.mainHeader.style.display = 'none'; switchView('view-auth'); }

async function handleSessionSuccess(user) {
    currentUser = user;
    elements.appContainer?.classList.add('logged-in');
    elements.mainHeader.style.display = 'flex';

    // Update avatar and dropdown with user info
    if (user.email) {
        const initials = user.email.substring(0, 2).toUpperCase();
        if (elements.userAvatar) elements.userAvatar.textContent = initials;
        if (elements.dropdownAvatar) elements.dropdownAvatar.textContent = initials;
        if (elements.dropdownEmail) elements.dropdownEmail.textContent = user.email;
    }

    // Apply saved language
    applyLanguage();

    await loadStateFromCloud();
    switchView('view-dashboard');
}

async function handleLogout() { if (supabaseClient) await supabaseClient.auth.signOut(); }

// ==================== USER DROPDOWN ====================
function toggleUserDropdown(e) {
    e.stopPropagation();
    elements.userDropdown?.classList.toggle('active');
}

function closeUserDropdown() {
    elements.userDropdown?.classList.remove('active');
}

function handleLanguageSwitch(e) {
    const langOption = e.target.closest('.lang-option');
    if (!langOption) return;

    const lang = langOption.dataset.lang;
    if (!lang) return;

    // Update active state
    document.querySelectorAll('.lang-option').forEach(opt => opt.classList.remove('active'));
    langOption.classList.add('active');

    // Save language preference
    localStorage.setItem('appLanguage', lang);

    // Apply language
    applyLanguage();
}

function applyLanguage() {
    const lang = localStorage.getItem('appLanguage') || 'es';

    // Update toggle UI
    document.querySelectorAll('.lang-option').forEach(opt => {
        opt.classList.toggle('active', opt.dataset.lang === lang);
    });

    // Apply translations
    const translations = getTranslations(lang);
    applyTranslations(translations);
}

function getTranslations(lang) {
    const texts = {
        es: {
            // Header & Navigation
            portfolio: 'Portfolio',
            dashboard: 'Inicio',
            log: 'Añadir',
            analytics: 'Análisis',
            accounts: 'Cuentas',

            // Auth
            welcomeBack: 'Bienvenido',
            createAccount: 'Crear Cuenta',
            signIn: 'Iniciar Sesión',
            signUp: 'Registrarse',
            emailAddress: 'Correo Electrónico',
            password: 'Contraseña',
            noAccount: '¿No tienes cuenta?',
            hasAccount: '¿Ya tienes cuenta?',

            // Dashboard
            totalNetPnl: 'Ganancia Neta Total',
            allTimeProfit: 'Ganancia total desde el inicio',
            totalTrades: 'Trades Totales',
            winRate: 'Win Rate',
            winLoss: 'Ganados / Perdidos',
            recentTrades: 'Trades Recientes',
            viewAll: 'Ver Todo',
            noTradesYet: 'Aún no hay trades registrados.',
            logTrade: 'Añadir Trade',
            logOut: 'Cerrar Sesión',

            // Dropdown
            language: 'Idioma',
            user: 'Usuario',
            logout: 'Cerrar Sesión',

            // Forms
            newEntry: 'Nueva Entrada',
            enterDetails: 'Introduce los detalles de tu posición cerrada.',
            cryptoPair: 'Par de Criptomoneda',
            searchCrypto: 'Buscar cripto...',
            tradeDate: 'Fecha del Trade',
            totalCapital: 'Capital Total (USDT)',
            totalAfterTrade: 'Tu capital total después de cerrar este trade.',
            save: 'Guardar',

            // Analytics
            equityGrowth: 'Crecimiento del Capital',
            avgGain: 'Ganancia Media',
            profitFactor: 'Factor de Beneficio',
            bestTrade: 'Mejor Trade',
            worstTrade: 'Peor Trade',
            monthlyBreakdown: 'Desglose Mensual',
            noDataAvailable: 'Sin datos disponibles',

            // Accounts
            myAccounts: 'Mis Cuentas',
            newPortfolio: 'Nueva Cuenta',

            // Strategy
            selectStrategy: 'Selecciona el Tipo de Estrategia',
            strategyWarning: 'El tipo de estrategia no se puede cambiar después de crear la cuenta.',
            compoundTrading: 'Trading Compuesto',
            compoundDesc: 'Cada trade usa el 100% del capital. El sistema calcula ganancias compuestas.',
            normalTrading: 'Trading Normal',
            normalDesc: 'Define tu propio capital por trade. Ideal para gestión de riesgo manual.',
            objectivesStrategy: 'Estrategia por Objetivos',
            objectivesDesc: 'Define metas económicas con subcuentas independientes.',

            // Objectives
            myObjectives: 'Mis Objetivos',
            newObjective: 'Nuevo Objetivo',
            total: 'Total',
            completed: 'Completados',
            active: 'Activos',
            lost: 'Perdidos',
            successRate: 'Éxito',

            // Common
            cancel: 'Cancelar',
            delete: 'Eliminar',
            edit: 'Editar',
            create: 'Crear',
        },
        en: {
            // Header & Navigation
            portfolio: 'Portfolio',
            dashboard: 'Home',
            log: 'Log',
            analytics: 'Analytics',
            accounts: 'Accounts',

            // Auth
            welcomeBack: 'Welcome Back',
            createAccount: 'Create Account',
            signIn: 'Sign In',
            signUp: 'Sign Up',
            emailAddress: 'Email Address',
            password: 'Password',
            noAccount: "Don't have an account?",
            hasAccount: 'Already have an account?',

            // Dashboard
            totalNetPnl: 'Total Net PNL',
            allTimeProfit: 'All time profit since inception',
            totalTrades: 'Total Trades',
            winRate: 'Win Rate',
            winLoss: 'Win / Loss',
            recentTrades: 'Recent Trades',
            viewAll: 'View All',
            noTradesYet: 'No trades recorded yet.',
            logTrade: 'Log Trade',
            logOut: 'Log Out',

            // Dropdown
            language: 'Language',
            user: 'User',
            logout: 'Log Out',

            // Forms
            newEntry: 'New Entry',
            enterDetails: 'Enter the details of your closed position.',
            cryptoPair: 'Cryptocurrency Pair',
            searchCrypto: 'Search crypto...',
            tradeDate: 'Trade Date',
            totalCapital: 'Total Capital (USDT)',
            totalAfterTrade: 'Your total capital after closing this trade.',
            save: 'Save',

            // Analytics
            equityGrowth: 'Equity Growth',
            avgGain: 'Avg Gain',
            profitFactor: 'Profit Factor',
            bestTrade: 'Best Trade',
            worstTrade: 'Worst Trade',
            monthlyBreakdown: 'Monthly Breakdown',
            noDataAvailable: 'No data available',

            // Accounts
            myAccounts: 'My Accounts',
            newPortfolio: 'New Portfolio',

            // Strategy
            selectStrategy: 'Select Strategy Type',
            strategyWarning: 'Strategy type cannot be changed after creating the account.',
            compoundTrading: 'Compound Trading',
            compoundDesc: 'Each trade uses 100% of capital. System calculates compound gains.',
            normalTrading: 'Normal Trading',
            normalDesc: 'Define your own capital per trade. Ideal for manual risk management.',
            objectivesStrategy: 'Objectives Strategy',
            objectivesDesc: 'Define economic goals with independent sub-accounts.',

            // Objectives
            myObjectives: 'My Objectives',
            newObjective: 'New Objective',
            total: 'Total',
            completed: 'Completed',
            active: 'Active',
            lost: 'Lost',
            successRate: 'Success',

            // Common
            cancel: 'Cancel',
            delete: 'Delete',
            edit: 'Edit',
            create: 'Create',
        }
    };
    return texts[lang] || texts.es;
}

function applyTranslations(t) {
    // Navigation
    const navLabels = document.querySelectorAll('.nav-item .nav-label');
    if (navLabels[0]) navLabels[0].textContent = t.dashboard;
    if (navLabels[1]) navLabels[1].textContent = t.log;
    if (navLabels[2]) navLabels[2].textContent = t.analytics;
    if (navLabels[3]) navLabels[3].textContent = t.accounts;

    // Dashboard
    const pnlLabel = document.querySelector('.pnl-label');
    if (pnlLabel) pnlLabel.textContent = t.totalNetPnl;

    const pnlSub = document.querySelector('.pnl-sub');
    if (pnlSub) pnlSub.textContent = t.allTimeProfit;

    const pnlStatLabels = document.querySelectorAll('.pnl-stat-label');
    if (pnlStatLabels[0]) pnlStatLabels[0].textContent = t.totalTrades;
    if (pnlStatLabels[1]) pnlStatLabels[1].textContent = t.winRate;
    if (pnlStatLabels[2]) pnlStatLabels[2].textContent = t.winLoss;

    const recentTradesHeader = document.querySelector('#view-dashboard .section-header h3');
    if (recentTradesHeader) recentTradesHeader.textContent = t.recentTrades;

    const viewAllBtn = document.querySelector('.view-all-btn');
    if (viewAllBtn) viewAllBtn.textContent = t.viewAll;

    const emptyStateText = document.querySelector('#emptyState p');
    if (emptyStateText) emptyStateText.textContent = t.noTradesYet;

    const emptyStateBtn = document.querySelector('#emptyState .btn-small');
    if (emptyStateBtn) emptyStateBtn.textContent = t.logTrade;

    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.innerHTML = `<span class="material-symbols-outlined">logout</span>${t.logOut}`;
    }

    // Dropdown
    const dropdownRole = document.querySelector('.dropdown-role');
    if (dropdownRole) dropdownRole.textContent = t.user;

    const languageLabel = document.querySelector('#languageToggle .dropdown-label');
    if (languageLabel) languageLabel.textContent = t.language;

    const dropdownLogoutLabel = document.querySelector('#dropdownLogout .dropdown-label');
    if (dropdownLogoutLabel) dropdownLogoutLabel.textContent = t.logout;

    // Auth
    if (!isSignUpMode) {
        if (elements.authTitle) elements.authTitle.textContent = t.welcomeBack;
        if (elements.authSubmitBtn) elements.authSubmitBtn.textContent = t.signIn;
        if (elements.authToggleText) elements.authToggleText.textContent = t.noAccount;
        if (elements.authToggleLink) elements.authToggleLink.textContent = t.signUp;
    } else {
        if (elements.authTitle) elements.authTitle.textContent = t.createAccount;
        if (elements.authSubmitBtn) elements.authSubmitBtn.textContent = t.signUp;
        if (elements.authToggleText) elements.authToggleText.textContent = t.hasAccount;
        if (elements.authToggleLink) elements.authToggleLink.textContent = t.signIn;
    }

    const emailLabel = document.querySelector('#view-auth .form-group:first-of-type label');
    if (emailLabel) emailLabel.textContent = t.emailAddress;

    const passwordLabel = document.querySelector('#view-auth .form-group:nth-of-type(2) label');
    if (passwordLabel) passwordLabel.textContent = t.password;
}

// ==================== DATA ====================
async function loadStateFromCloud() {
    if (!currentUser || !supabaseClient) return;
    try {
        const { data } = await supabaseClient.from('user_data').select('content').eq('user_id', currentUser.id).maybeSingle();
        if (data?.content) {
            state = { ...state, ...data.content };
            // Migration: ensure all profiles have strategyType
            Object.values(state.profiles).forEach(p => {
                if (!p.strategyType) p.strategyType = STRATEGY_TYPES.COMPOUND;
            });
        } else {
            const id = Date.now().toString();
            state = {
                activeProfileId: id,
                profiles: { [id]: { id, name: 'My Portfolio', strategyType: STRATEGY_TYPES.COMPOUND, trades: [], initialCapital: 0 } },
                cryptoUsage: {}
            };
            await saveState();
        }
    } catch (err) { console.error('Load error:', err); }
    updateUI();
}

async function saveState() {
    if (!currentUser || !supabaseClient) return;
    updateUI();
    try {
        const { error } = await supabaseClient.from('user_data').upsert(
            { user_id: currentUser.id, content: state, updated_at: new Date().toISOString() },
            { onConflict: 'user_id' }
        );
        if (error) console.error('Save error:', error);
    } catch (err) { console.error('Save error:', err); }
}

// ==================== UI ====================
function getActiveProfile() {
    if (!state.profiles[state.activeProfileId]) {
        const keys = Object.keys(state.profiles);
        if (keys.length) state.activeProfileId = keys[0];
    }
    return state.profiles[state.activeProfileId];
}

function switchView(targetId) {
    elements.views?.forEach(v => v.classList.toggle('active', v.id === targetId));
    elements.navItems?.forEach(n => n.classList.toggle('active', n.dataset.target === targetId));
    const profile = getActiveProfile();

    if (targetId === 'view-dashboard') {
        elements.appTitle.textContent = profile?.name || 'Portfolio';
        updateStrategyBadge(profile);
        // For objectives strategy, show different dashboard
        if (profile?.strategyType === STRATEGY_TYPES.OBJECTIVES) {
            renderObjectivesDashboard(profile);
        }
    } else if (targetId === 'view-analytics') {
        if (profile?.strategyType === STRATEGY_TYPES.OBJECTIVES) {
            renderObjectivesAnalytics(profile);
        } else {
            renderAnalytics(profile);
        }
    } else if (targetId === 'view-profile') {
        renderProfileList();
    } else if (targetId === 'view-log') {
        if (profile?.strategyType === STRATEGY_TYPES.OBJECTIVES) {
            switchView('view-objectives');
        } else {
            setupLogView(profile);
        }
    } else if (targetId === 'view-objectives') {
        renderObjectivesView(profile);
    } else if (targetId === 'view-goal-detail') {
        renderGoalDetail(profile);
    }
}

function updateStrategyBadge(profile) {
    if (!profile || !elements.strategyBadge) return;
    const strategyType = profile.strategyType;
    elements.strategyBadge.style.display = 'flex';

    if (strategyType === STRATEGY_TYPES.OBJECTIVES) {
        elements.strategyBadge.className = 'strategy-badge objectives';
        elements.strategyBadgeIcon.textContent = 'flag';
        elements.strategyBadgeText.textContent = 'Objetivos';
    } else if (strategyType === STRATEGY_TYPES.NORMAL) {
        elements.strategyBadge.className = 'strategy-badge normal';
        elements.strategyBadgeIcon.textContent = 'candlestick_chart';
        elements.strategyBadgeText.textContent = 'Normal';
    } else {
        elements.strategyBadge.className = 'strategy-badge';
        elements.strategyBadgeIcon.textContent = 'all_inclusive';
        elements.strategyBadgeText.textContent = 'Compound';
    }
}

function setupLogView(profile) {
    if (!profile) return;
    const isNormal = profile.strategyType === STRATEGY_TYPES.NORMAL;
    elements.compoundFormContainer.style.display = isNormal ? 'none' : 'block';
    elements.normalFormContainer.style.display = isNormal ? 'block' : 'none';
}

function updateUI() {
    const profile = getActiveProfile();
    if (!profile) return;

    const strategyType = profile.strategyType;

    if (strategyType === STRATEGY_TYPES.OBJECTIVES) {
        updateUIObjectives(profile);
    } else if (strategyType === STRATEGY_TYPES.NORMAL) {
        updateUINormal(profile);
        renderTradesList(profile);
    } else {
        updateUICompound(profile);
        renderTradesList(profile);
    }
}

function updateUICompound(profile) {
    const currentBalance = profile.trades.length ? profile.trades[0].balanceAfter : 0;
    const totalDiff = currentBalance - profile.initialCapital;
    const totalPerc = profile.initialCapital > 0 ? (totalDiff / profile.initialCapital) * 100 : 0;

    const sign = totalDiff >= 0 ? '+' : '';
    if (elements.totalProfitLoss) elements.totalProfitLoss.textContent = sign + formatMoney(totalDiff);
    if (elements.percentageGain) elements.percentageGain.textContent = sign + totalPerc.toFixed(1) + '%';
    if (elements.percentageBadge) {
        elements.percentageBadge.className = 'pnl-badge ' + (totalDiff >= 0 ? 'positive' : 'negative');
        const icon = elements.percentageBadge.querySelector('.material-symbols-outlined');
        if (icon) icon.textContent = totalDiff >= 0 ? 'trending_up' : 'trending_down';
    }

    const activeTrades = profile.trades.filter(t => !t.isInitial);
    const wins = activeTrades.filter(t => t.profit > 0).length;
    const losses = activeTrades.filter(t => t.profit <= 0).length;
    const winRateVal = activeTrades.length ? Math.round((wins / activeTrades.length) * 100) : 0;

    if (elements.totalTrades) elements.totalTrades.textContent = activeTrades.length;
    if (elements.winRate) elements.winRate.textContent = winRateVal + '%';
    if (elements.winLoss) elements.winLoss.textContent = wins + 'W / ' + losses + 'L';
}

function updateUINormal(profile) {
    const activeTrades = profile.trades.filter(t => !t.isInitial);
    const totalProfit = activeTrades.reduce((sum, t) => sum + (t.result || 0), 0);
    const currentBalance = profile.trades.length ? profile.trades[0].balanceAfter : profile.initialCapital;
    const totalPerc = profile.initialCapital > 0 ? (totalProfit / profile.initialCapital) * 100 : 0;

    const sign = totalProfit >= 0 ? '+' : '';
    if (elements.totalProfitLoss) elements.totalProfitLoss.textContent = sign + formatMoney(totalProfit);
    if (elements.percentageGain) elements.percentageGain.textContent = sign + totalPerc.toFixed(1) + '%';
    if (elements.percentageBadge) {
        elements.percentageBadge.className = 'pnl-badge ' + (totalProfit >= 0 ? 'positive' : 'negative');
        const icon = elements.percentageBadge.querySelector('.material-symbols-outlined');
        if (icon) icon.textContent = totalProfit >= 0 ? 'trending_up' : 'trending_down';
    }

    const wins = activeTrades.filter(t => (t.result || 0) > 0).length;
    const losses = activeTrades.filter(t => (t.result || 0) <= 0).length;
    const winRateVal = activeTrades.length ? Math.round((wins / activeTrades.length) * 100) : 0;

    if (elements.totalTrades) elements.totalTrades.textContent = activeTrades.length;
    if (elements.winRate) elements.winRate.textContent = winRateVal + '%';
    if (elements.winLoss) elements.winLoss.textContent = wins + 'W / ' + losses + 'L';
}

function renderTradesList(profile) {
    if (!elements.tradesList) return;
    elements.tradesList.innerHTML = '';
    if (!profile.trades.length) { elements.emptyState?.classList.remove('hidden'); return; }
    elements.emptyState?.classList.add('hidden');

    const isNormal = profile.strategyType === STRATEGY_TYPES.NORMAL;

    profile.trades.forEach(trade => {
        const crypto = CRYPTO_LIST.find(c => c.symbol === trade.asset) || { symbol: trade.asset, name: trade.asset, logo: '' };
        const pnlValue = isNormal ? (trade.result || 0) : (trade.profit || 0);
        const isProfit = pnlValue >= 0;
        const sign = isProfit ? '+' : '';
        const percValue = isNormal ? (trade.percentage || 0) : (trade.percentage || 0);
        const percSign = percValue >= 0 ? '+' : '';

        const card = document.createElement('div');
        card.className = 'trade-card';
        card.dataset.id = trade.id;
        card.innerHTML = `
            <div class="trade-icon">
                ${crypto.logo ? `<img src="${crypto.logo}" alt="${crypto.symbol}" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"><span class="fallback" style="display:none">${crypto.symbol[0]}</span>` : `<span class="fallback">${crypto.symbol[0]}</span>`}
            </div>
            <div class="trade-info">
                <div class="trade-asset">
                    ${trade.asset}/USDT
                    ${isNormal && trade.tradeType ? `<span class="trade-type-badge ${trade.tradeType}">${trade.tradeType}</span>` : ''}
                </div>
                <div class="trade-date">${formatDate(trade.date)}</div>
            </div>
            <div class="trade-right">
                <div class="trade-pnl ${trade.isInitial ? '' : (isProfit ? 'profit' : 'loss')}">
                    ${trade.isInitial ? 'Initial' : `${sign}${formatMoney(pnlValue)} <small>(${percSign}${percValue.toFixed(1)}%)</small>`}
                </div>
                <div class="trade-balance">Bal: ${formatMoney(trade.balanceAfter)}</div>
            </div>
        `;
        elements.tradesList.appendChild(card);
    });
}

// ==================== TRADES ====================
function setTradeType(type) {
    document.getElementById('tradeTypeNormal').value = type;
    document.getElementById('btnLong').classList.toggle('active', type === 'long');
    document.getElementById('btnShort').classList.toggle('active', type === 'short');
}

function handleAddTradeCompound(e) {
    e.preventDefault();
    const profile = getActiveProfile();
    if (!profile) return;

    const asset = document.getElementById('assetName').value.trim();
    const balance = parseFloat(document.getElementById('investedAmount').value);
    const date = document.getElementById('tradeDate').value;
    const isInitial = document.getElementById('isInitialInvestment').checked;

    if (!asset) { alert('Please select a cryptocurrency'); return; }
    if (isNaN(balance) || balance <= 0) { alert('Please enter a valid balance'); return; }

    if (isInitial) {
        profile.trades = [];
        profile.initialCapital = balance;
        profile.trades.push({ id: Date.now(), asset, date, balanceAfter: balance, profit: 0, percentage: 0, isInitial: true });
    } else {
        if (!profile.trades.length) { alert('Please log initial capital first'); return; }
        const prevBalance = profile.trades[0].balanceAfter;
        const profit = balance - prevBalance;
        const percentage = prevBalance > 0 ? (profit / prevBalance) * 100 : 0;
        profile.trades.unshift({ id: Date.now(), asset, date, balanceAfter: balance, profit, percentage, isInitial: false });
    }

    state.cryptoUsage[asset] = (state.cryptoUsage[asset] || 0) + 1;
    saveState();
    resetTradeForm();
    switchView('view-dashboard');
}

function handleAddTradeNormal(e) {
    e.preventDefault();
    const profile = getActiveProfile();
    if (!profile) return;

    const asset = document.getElementById('assetNameNormal').value.trim();
    const date = document.getElementById('tradeDateNormal').value;
    const tradeType = document.getElementById('tradeTypeNormal').value;
    const amountRisked = parseFloat(document.getElementById('amountRisked').value);
    const result = parseFloat(document.getElementById('tradeResult').value);
    const isInitial = document.getElementById('isInitialCapitalNormal').checked;

    if (!asset) { alert('Please select a cryptocurrency'); return; }

    if (isInitial) {
        if (isNaN(amountRisked) || amountRisked <= 0) { alert('Please enter initial capital amount'); return; }
        profile.trades = [];
        profile.initialCapital = amountRisked;
        profile.trades.push({ id: Date.now(), asset, date, balanceAfter: amountRisked, result: 0, percentage: 0, isInitial: true, tradeType: null, amountRisked: 0 });
    } else {
        if (isNaN(amountRisked) || amountRisked <= 0) { alert('Please enter amount risked'); return; }
        if (isNaN(result)) { alert('Please enter trade result'); return; }
        if (!profile.trades.length) { alert('Please log initial capital first'); return; }

        const prevBalance = profile.trades[0].balanceAfter;
        const newBalance = prevBalance + result;
        const percentage = amountRisked > 0 ? (result / amountRisked) * 100 : 0;

        profile.trades.unshift({
            id: Date.now(), asset, date, tradeType, amountRisked, result, percentage, balanceAfter: newBalance, isInitial: false
        });
    }

    state.cryptoUsage[asset] = (state.cryptoUsage[asset] || 0) + 1;
    saveState();
    resetNormalTradeForm();
    switchView('view-dashboard');
}

function resetTradeForm() {
    elements.tradeForm?.reset();
    document.getElementById('assetName').value = '';
    document.getElementById('selectedCryptoText').textContent = 'Search asset (e.g. BTC)';
    document.getElementById('selectedCryptoLogo').style.display = 'none';
    document.querySelector('#selectedCrypto .search-icon').style.display = 'block';
    document.getElementById('tradeDate').valueAsDate = new Date();
}

function resetNormalTradeForm() {
    elements.normalTradeForm?.reset();
    document.getElementById('assetNameNormal').value = '';
    document.getElementById('selectedCryptoTextNormal').textContent = 'Search asset (e.g. BTC)';
    document.getElementById('selectedCryptoLogoNormal').style.display = 'none';
    document.querySelector('#selectedCryptoNormal .search-icon').style.display = 'block';
    document.getElementById('tradeDateNormal').valueAsDate = new Date();
    setTradeType('long');
}

function handleTradeClick(e) {
    const card = e.target.closest('.trade-card');
    if (card) openTradeDetail(Number(card.dataset.id));
}

function openTradeDetail(tradeId) {
    const profile = getActiveProfile();
    const trade = profile?.trades.find(t => t.id === tradeId);
    if (!trade) return;

    currentTradeId = tradeId;
    const crypto = CRYPTO_LIST.find(c => c.symbol === trade.asset) || { symbol: trade.asset, logo: '' };
    const isNormal = profile.strategyType === STRATEGY_TYPES.NORMAL;
    const pnl = isNormal ? (trade.result || 0) : (trade.profit || 0);

    document.getElementById('tradeDetailContent').innerHTML = `
        <div class="trade-detail-header">
            <div class="trade-detail-icon">
                ${crypto.logo ? `<img src="${crypto.logo}" alt="${trade.asset}">` : `<span style="font-size:24px;font-weight:700">${trade.asset[0]}</span>`}
            </div>
            <div class="trade-detail-title">
                <h4>${trade.asset}/USDT ${trade.tradeType ? `<span class="trade-type-badge ${trade.tradeType}">${trade.tradeType}</span>` : ''}</h4>
                <span>${formatDate(trade.date)}</span>
            </div>
        </div>
        <div class="trade-detail-stats">
            <div class="detail-stat">
                <label>Result</label>
                <span style="color:${pnl >= 0 ? 'var(--success)' : 'var(--danger)'}">${pnl >= 0 ? '+' : ''}${formatMoney(pnl)}</span>
            </div>
            <div class="detail-stat">
                <label>Percentage</label>
                <span>${trade.percentage >= 0 ? '+' : ''}${(trade.percentage || 0).toFixed(2)}%</span>
            </div>
            <div class="detail-stat">
                <label>Balance After</label>
                <span>${formatMoney(trade.balanceAfter)}</span>
            </div>
            ${isNormal && trade.amountRisked ? `<div class="detail-stat"><label>Amount Risked</label><span>${formatMoney(trade.amountRisked)}</span></div>` : ''}
        </div>
    `;

    document.getElementById('deleteTradeBtn').style.display = trade.isInitial ? 'none' : 'flex';
    elements.tradeDetailModal?.classList.add('active');
}

function closeTradeDetail() { elements.tradeDetailModal?.classList.remove('active'); currentTradeId = null; }

function deleteCurrentTrade() {
    if (!currentTradeId) return;
    const profile = getActiveProfile();
    const idx = profile.trades.findIndex(t => t.id === currentTradeId);
    if (idx !== -1 && confirm('Delete this trade?')) {
        profile.trades.splice(idx, 1);
        // Recalculate balances for normal strategy
        if (profile.strategyType === STRATEGY_TYPES.NORMAL) recalculateNormalBalances(profile);
        saveState();
        closeTradeDetail();
    }
}

function recalculateNormalBalances(profile) {
    const sorted = [...profile.trades].sort((a, b) => new Date(a.date) - new Date(b.date));
    let balance = profile.initialCapital;
    sorted.forEach(t => {
        if (!t.isInitial) balance += (t.result || 0);
        t.balanceAfter = balance;
    });
    profile.trades = sorted.reverse();
}

// ==================== PROFILES ====================
function openStrategyModal() {
    selectedStrategy = null;
    document.getElementById('newProfileName').value = '';
    document.querySelectorAll('.strategy-card').forEach(c => c.classList.remove('selected'));
    document.getElementById('confirmStrategy').disabled = true;
    elements.strategyModal?.classList.add('active');
}

function closeStrategyModal() { elements.strategyModal?.classList.remove('active'); }

function selectStrategy(strategy) {
    selectedStrategy = strategy;
    document.querySelectorAll('.strategy-card').forEach(c => c.classList.toggle('selected', c.dataset.strategy === strategy));
    document.getElementById('confirmStrategy').disabled = !document.getElementById('newProfileName').value.trim();
}

function confirmCreateProfile() {
    const name = document.getElementById('newProfileName').value.trim();
    if (!name || !selectedStrategy) return;

    const id = Date.now().toString();
    state.profiles[id] = { id, name, strategyType: selectedStrategy, trades: [], initialCapital: 0 };
    state.activeProfileId = id;

    saveState();
    closeStrategyModal();
    switchView('view-dashboard');
}

function handleProfileClick(e) {
    const deleteBtn = e.target.closest('.delete-btn-card');
    const card = e.target.closest('.profile-card');

    if (deleteBtn) {
        const id = deleteBtn.dataset.id;
        if (Object.keys(state.profiles).length <= 1) { alert('Need at least one portfolio'); return; }
        if (confirm('Delete this portfolio?')) {
            delete state.profiles[id];
            if (state.activeProfileId === id) state.activeProfileId = Object.keys(state.profiles)[0];
            saveState();
            renderProfileList();
        }
    } else if (card) {
        state.activeProfileId = card.dataset.id;
        saveState();
        switchView('view-dashboard');
    }
}

function renderProfileList() {
    if (!elements.profileList) return;
    elements.profileList.innerHTML = Object.values(state.profiles).map(p => {
        const isActive = p.id === state.activeProfileId;
        const strategyType = p.strategyType;

        let badgeClass = '';
        let badgeText = 'Compound';
        let subText = `${p.trades?.length || 0} trades`;

        if (strategyType === STRATEGY_TYPES.OBJECTIVES) {
            badgeClass = 'objectives';
            badgeText = 'Objetivos';
            const goals = p.goals || [];
            const completed = goals.filter(g => g.status === 'completed').length;
            subText = `${goals.length} objetivos · ${completed} completados`;
        } else if (strategyType === STRATEGY_TYPES.NORMAL) {
            badgeClass = 'normal';
            badgeText = 'Normal';
        }

        return `
            <div class="profile-card ${isActive ? 'active-profile' : ''}" data-id="${p.id}">
                <div class="profile-left">
                    <div class="profile-avatar ${badgeClass}">${p.name[0].toUpperCase()}</div>
                    <div class="profile-info">
                        <span class="profile-name">${p.name} <span class="profile-strategy-badge ${badgeClass}">${badgeText}</span></span>
                        <span class="profile-sub">${subText}</span>
                    </div>
                </div>
                ${!isActive ? `<button class="delete-btn-card" data-id="${p.id}"><span class="material-symbols-outlined">delete</span></button>` : ''}
            </div>
        `;
    }).join('');
}

function handleClearData() {
    if (confirm('Delete all data from current portfolio?')) {
        const profile = getActiveProfile();
        if (profile) { profile.trades = []; profile.initialCapital = 0; saveState(); }
    }
}

// ==================== CRYPTO MODAL ====================
function openCryptoModal() { renderCryptoList(); renderFavorites(); elements.cryptoModal?.classList.add('active'); document.getElementById('cryptoSearch').value = ''; }
function closeCryptoModal() { elements.cryptoModal?.classList.remove('active'); }

function renderCryptoList(filter = '') {
    const list = document.getElementById('cryptoList');
    if (!list) return;
    const filtered = filter ? CRYPTO_LIST.filter(c => c.symbol.toLowerCase().includes(filter.toLowerCase()) || c.name.toLowerCase().includes(filter.toLowerCase())) : CRYPTO_LIST;
    list.innerHTML = filtered.map(c => `<div class="crypto-item" data-symbol="${c.symbol}">${c.logo ? `<img src="${c.logo}" alt="${c.symbol}" onerror="this.style.display='none'">` : `<div style="width:36px;height:36px;background:var(--input-bg);border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700">${c.symbol[0]}</div>`}<div class="crypto-item-info"><div class="crypto-item-name">${c.name}</div><div class="crypto-item-symbol">${c.symbol}</div></div></div>`).join('');
    list.querySelectorAll('.crypto-item').forEach(item => item.addEventListener('click', () => selectCrypto(item.dataset.symbol)));
}

function renderFavorites() {
    const list = document.getElementById('favoritesList');
    if (!list) return;
    const usage = state.cryptoUsage || {};
    let favs = Object.entries(usage).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([s]) => CRYPTO_LIST.find(c => c.symbol === s)).filter(Boolean);
    if (!favs.length) favs = CRYPTO_LIST.slice(0, 5);
    list.innerHTML = favs.map(c => `<div class="favorite-chip" data-symbol="${c.symbol}">${c.logo ? `<img src="${c.logo}" alt="${c.symbol}">` : ''}<span>${c.symbol}</span></div>`).join('');
    list.querySelectorAll('.favorite-chip').forEach(chip => chip.addEventListener('click', () => selectCrypto(chip.dataset.symbol)));
}

function selectCrypto(symbol) {
    const crypto = CRYPTO_LIST.find(c => c.symbol === symbol);
    if (!crypto) return;

    if (currentCryptoTarget === 'compound') {
        document.getElementById('assetName').value = crypto.symbol;
        if (crypto.logo) { document.getElementById('selectedCryptoLogo').src = crypto.logo; document.getElementById('selectedCryptoLogo').style.display = 'block'; document.querySelector('#selectedCrypto .search-icon').style.display = 'none'; }
        document.getElementById('selectedCryptoText').textContent = crypto.symbol + ' - ' + crypto.name;
    } else if (currentCryptoTarget === 'normal') {
        document.getElementById('assetNameNormal').value = crypto.symbol;
        if (crypto.logo) { document.getElementById('selectedCryptoLogoNormal').src = crypto.logo; document.getElementById('selectedCryptoLogoNormal').style.display = 'block'; document.querySelector('#selectedCryptoNormal .search-icon').style.display = 'none'; }
        document.getElementById('selectedCryptoTextNormal').textContent = crypto.symbol + ' - ' + crypto.name;
    } else if (currentCryptoTarget === 'goal') {
        document.getElementById('goalAssetName').value = crypto.symbol;
        if (crypto.logo) { document.getElementById('selectedCryptoLogoGoal').src = crypto.logo; document.getElementById('selectedCryptoLogoGoal').style.display = 'block'; document.querySelector('#selectedCryptoGoal .search-icon').style.display = 'none'; }
        document.getElementById('selectedCryptoTextGoal').textContent = crypto.symbol + ' - ' + crypto.name;
    }
    closeCryptoModal();
}

function addCustomCrypto() {
    const symbol = prompt('Enter token symbol:');
    if (!symbol) return;
    const upper = symbol.toUpperCase().trim();
    if (!CRYPTO_LIST.find(c => c.symbol === upper)) CRYPTO_LIST.push({ symbol: upper, name: upper, logo: '' });
    selectCrypto(upper);
}

// ==================== ANALYTICS ====================
function renderAnalytics(profile) {
    if (!profile) return;
    const isNormal = profile.strategyType === STRATEGY_TYPES.NORMAL;

    // Show/hide normal-specific elements
    elements.timeFilters.style.display = isNormal ? 'flex' : 'none';
    elements.longShortStats.style.display = isNormal ? 'block' : 'none';

    const currentEquity = profile.trades.length ? profile.trades[0].balanceAfter : 0;
    const activeTrades = filterTradesByTime(profile.trades.filter(t => !t.isInitial));

    // Total profit calculation
    let totalProfit, totalPerc;
    if (isNormal) {
        totalProfit = activeTrades.reduce((s, t) => s + (t.result || 0), 0);
        totalPerc = profile.initialCapital > 0 ? (totalProfit / profile.initialCapital) * 100 : 0;
    } else {
        totalProfit = currentEquity - profile.initialCapital;
        totalPerc = profile.initialCapital > 0 ? (totalProfit / profile.initialCapital) * 100 : 0;
    }

    if (elements.analyticsEquity) elements.analyticsEquity.textContent = formatMoney(currentEquity);
    if (elements.equityPercent) elements.equityPercent.textContent = (totalPerc >= 0 ? '+' : '') + totalPerc.toFixed(1) + '%';
    if (elements.equityBadge) elements.equityBadge.className = 'equity-badge ' + (totalPerc >= 0 ? 'positive' : 'negative');

    // Avg gain
    const avgPerc = activeTrades.length ? activeTrades.reduce((s, t) => s + (t.percentage || 0), 0) / activeTrades.length : 0;
    if (elements.statAvgGain) { elements.statAvgGain.textContent = (avgPerc >= 0 ? '+' : '') + avgPerc.toFixed(1) + '%'; elements.statAvgGain.className = 'metric-value ' + (avgPerc >= 0 ? 'profit' : 'loss'); }

    // Best/Worst
    if (activeTrades.length) {
        const sorted = [...activeTrades].sort((a, b) => (b.percentage || 0) - (a.percentage || 0));
        const best = sorted[0], worst = sorted[sorted.length - 1];
        if (elements.statBestTrade) elements.statBestTrade.textContent = '+' + (best.percentage || 0).toFixed(1) + '%';
        if (elements.statBestTradeAsset) elements.statBestTradeAsset.textContent = best.asset;
        if (elements.statWorstTrade) elements.statWorstTrade.textContent = (worst.percentage || 0).toFixed(1) + '%';
        if (elements.statWorstTradeAsset) elements.statWorstTradeAsset.textContent = worst.asset;
    }

    // Profit Factor
    const grossWin = activeTrades.filter(t => (isNormal ? t.result : t.profit) > 0).reduce((s, t) => s + Math.abs(isNormal ? t.result : t.profit), 0);
    const grossLoss = activeTrades.filter(t => (isNormal ? t.result : t.profit) < 0).reduce((s, t) => s + Math.abs(isNormal ? t.result : t.profit), 0);
    const pf = grossLoss > 0 ? grossWin / grossLoss : (grossWin > 0 ? 999 : 0);
    if (elements.statProfitFactor) elements.statProfitFactor.textContent = pf === 999 ? '∞' : pf.toFixed(2);
    if (elements.statProfitFactorText) elements.statProfitFactorText.textContent = pf > 2 ? 'Excellent' : pf > 1.5 ? 'Good' : pf > 1 ? 'Profitable' : 'Unprofitable';

    // Long/Short stats for normal
    if (isNormal) {
        const longs = activeTrades.filter(t => t.tradeType === 'long');
        const shorts = activeTrades.filter(t => t.tradeType === 'short');
        const longWins = longs.filter(t => t.result > 0).length;
        const shortWins = shorts.filter(t => t.result > 0).length;
        document.getElementById('longAccuracy').textContent = longs.length ? Math.round((longWins / longs.length) * 100) + '%' : '0%';
        document.getElementById('shortAccuracy').textContent = shorts.length ? Math.round((shortWins / shorts.length) * 100) + '%' : '0%';
        document.getElementById('longCount').textContent = longs.length + ' trades';
        document.getElementById('shortCount').textContent = shorts.length + ' trades';
    }

    generateChartSVG(profile, isNormal);
    renderMonthlyBreakdown(profile.trades, isNormal);
}

function filterTradesByTime(trades) {
    if (selectedTimeFilter === 'ALL') return trades;
    const now = new Date();
    let cutoff;
    switch (selectedTimeFilter) {
        case '1D': cutoff = new Date(now - 24 * 60 * 60 * 1000); break;
        case '1W': cutoff = new Date(now - 7 * 24 * 60 * 60 * 1000); break;
        case '1M': cutoff = new Date(now - 30 * 24 * 60 * 60 * 1000); break;
        case '1Y': cutoff = new Date(now - 365 * 24 * 60 * 60 * 1000); break;
        default: return trades;
    }
    return trades.filter(t => new Date(t.date) >= cutoff);
}

function generateChartSVG(profile, isNormal) {
    const trades = [...profile.trades].sort((a, b) => new Date(a.date) - new Date(b.date));
    let points;
    if (isNormal) {
        let cumulative = 0;
        points = trades.map(t => { if (!t.isInitial) cumulative += (t.result || 0); return cumulative; });
    } else {
        points = trades.map(t => t.balanceAfter);
    }
    if (points.length < 2) { elements.chartLine?.setAttribute('d', ''); elements.chartFill?.setAttribute('d', ''); return; }

    const maxVal = Math.max(...points) * 1.05, minVal = Math.min(...points) * 0.95, range = maxVal - minVal || 1, width = 375, height = 180;
    const coords = points.map((val, idx) => ({ x: (idx / (points.length - 1)) * width, y: height - ((val - minVal) / range) * height }));
    let d = 'M ' + coords[0].x + ' ' + coords[0].y;
    coords.slice(1).forEach(pt => d += ' L ' + pt.x + ' ' + pt.y);
    elements.chartLine?.setAttribute('d', d);
    elements.chartFill?.setAttribute('d', d + ` L ${width} ${height} L 0 ${height} Z`);
}

function renderMonthlyBreakdown(trades, isNormal) {
    if (!elements.monthlyList) return;
    const months = {};
    trades.forEach(t => {
        if (t.isInitial) return;
        const d = new Date(t.date), key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`, monthName = d.toLocaleDateString('en-US', { month: 'short' });
        if (!months[key]) months[key] = { name: monthName, profit: 0 };
        months[key].profit += isNormal ? (t.result || 0) : (t.profit || 0);
    });
    const sorted = Object.entries(months).sort((a, b) => b[0].localeCompare(a[0])).slice(0, 4);
    if (!sorted.length) { elements.monthlyList.innerHTML = '<p style="color:var(--text-secondary);text-align:center;padding:20px">No monthly data</p>'; return; }
    const maxProfit = Math.max(...sorted.map(([_, m]) => Math.abs(m.profit))) || 1;
    elements.monthlyList.innerHTML = sorted.map(([_, m]) => {
        const isPos = m.profit >= 0, width = Math.min((Math.abs(m.profit) / maxProfit) * 100, 100);
        return `<div class="month-row"><span class="month-name">${m.name}</span><div class="progress-container"><div class="progress-bar ${isPos ? 'positive' : 'negative'}" style="width:${width}%"></div></div><span class="month-value" style="color:${isPos ? 'var(--success)' : 'var(--danger)'}">${isPos ? '+' : ''}${formatMoney(m.profit)}</span></div>`;
    }).join('');
}

// ==================== UTILITIES ====================
function formatMoney(amount) {
    return new Intl.NumberFormat(CONFIG.LOCALE, { style: 'currency', currency: CONFIG.CURRENCY, minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(amount);
}

function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}

// Enable confirm button when name is entered
document.getElementById('newProfileName')?.addEventListener('input', (e) => {
    document.getElementById('confirmStrategy').disabled = !e.target.value.trim() || !selectedStrategy;
});

// ==================== OBJECTIVES STRATEGY ====================

function updateUIObjectives(profile) {
    if (!profile || profile.strategyType !== STRATEGY_TYPES.OBJECTIVES) return;

    const goals = profile.goals || [];
    const activeGoals = goals.filter(g => g.status === 'active');
    const completedGoals = goals.filter(g => g.status === 'completed');
    const lostGoals = goals.filter(g => g.status === 'lost');

    // Calculate totals
    let totalBalance = 0;
    let totalProfit = 0;
    let totalInitial = 0;

    goals.forEach(g => {
        const currentBalance = getGoalCurrentBalance(g);
        totalBalance += currentBalance;
        totalInitial += g.initialAmount || 0;
        totalProfit += currentBalance - (g.initialAmount || 0);
    });

    const totalPerc = totalInitial > 0 ? (totalProfit / totalInitial) * 100 : 0;
    const successRate = goals.length > 0 ? Math.round((completedGoals.length / goals.length) * 100) : 0;

    // Update dashboard UI
    const sign = totalProfit >= 0 ? '+' : '';
    if (elements.totalProfitLoss) elements.totalProfitLoss.textContent = sign + formatMoney(totalProfit);
    if (elements.percentageGain) elements.percentageGain.textContent = sign + totalPerc.toFixed(1) + '%';
    if (elements.percentageBadge) {
        elements.percentageBadge.className = 'pnl-badge ' + (totalProfit >= 0 ? 'positive' : 'negative');
        const icon = elements.percentageBadge.querySelector('.material-symbols-outlined');
        if (icon) icon.textContent = totalProfit >= 0 ? 'trending_up' : 'trending_down';
    }

    if (elements.totalTrades) elements.totalTrades.textContent = goals.length;
    if (elements.winRate) elements.winRate.textContent = successRate + '%';
    if (elements.winLoss) elements.winLoss.textContent = `${completedGoals.length}C / ${lostGoals.length}P`;

    // Render goals list in dashboard
    renderGoalsListDashboard(profile);
}

function renderObjectivesDashboard(profile) {
    updateUIObjectives(profile);
}

function renderGoalsListDashboard(profile) {
    if (!elements.tradesList) return;
    elements.tradesList.innerHTML = '';

    const goals = profile.goals || [];
    if (!goals.length) {
        elements.emptyState?.classList.remove('hidden');
        return;
    }
    elements.emptyState?.classList.add('hidden');

    // Sort: active first, then completed, then lost
    const sorted = [...goals].sort((a, b) => {
        const order = { active: 0, completed: 1, lost: 2 };
        return (order[a.status] || 0) - (order[b.status] || 0);
    });

    sorted.forEach(goal => {
        const currentBalance = getGoalCurrentBalance(goal);
        const progress = goal.targetAmount > 0 ? Math.min((currentBalance / goal.targetAmount) * 100, 100) : 0;
        const remaining = Math.max(goal.targetAmount - currentBalance, 0);

        const card = document.createElement('div');
        card.className = `trade-card goal-card ${goal.status}`;
        card.dataset.goalId = goal.id;
        card.innerHTML = `
            <div class="trade-icon goal-icon ${goal.status}">
                <span class="material-symbols-outlined">${goal.status === 'completed' ? 'check_circle' : goal.status === 'lost' ? 'cancel' : 'flag'}</span>
            </div>
            <div class="trade-info">
                <div class="trade-asset">${goal.name}</div>
                <div class="trade-date">${goal.trades?.length || 0} trades · ${formatMoney(goal.targetAmount)} objetivo</div>
                <div class="goal-mini-progress">
                    <div class="goal-mini-progress-fill ${goal.status}" style="width:${progress}%"></div>
                </div>
            </div>
            <div class="trade-right">
                <div class="trade-pnl ${goal.status === 'completed' ? 'profit' : goal.status === 'lost' ? 'loss' : ''}">${formatMoney(currentBalance)}</div>
                <div class="trade-balance">${goal.status === 'completed' ? '¡Completado!' : goal.status === 'lost' ? 'Perdido' : `Faltan ${formatMoney(remaining)}`}</div>
            </div>
        `;
        card.addEventListener('click', () => openGoalDetail(goal.id));
        elements.tradesList.appendChild(card);
    });
}

function getGoalCurrentBalance(goal) {
    if (!goal.trades || !goal.trades.length) return goal.initialAmount || 0;
    // Get the most recent trade balance
    const sortedTrades = [...goal.trades].sort((a, b) => new Date(b.date) - new Date(a.date));
    return sortedTrades[0].balanceAfter;
}

function renderObjectivesView(profile) {
    if (!profile || profile.strategyType !== STRATEGY_TYPES.OBJECTIVES) return;

    const goals = profile.goals || [];
    const activeGoals = goals.filter(g => g.status === 'active');
    const completedGoals = goals.filter(g => g.status === 'completed');
    const lostGoals = goals.filter(g => g.status === 'lost');
    const successRate = goals.length > 0 ? Math.round((completedGoals.length / goals.length) * 100) : 0;

    // Update stats
    document.getElementById('totalGoals').textContent = goals.length;
    document.getElementById('completedGoals').textContent = completedGoals.length;
    document.getElementById('activeGoals').textContent = activeGoals.length;
    document.getElementById('lostGoals').textContent = lostGoals.length;
    document.getElementById('successRateGoals').textContent = successRate + '%';

    // Render goals list
    const goalsList = document.getElementById('goalsList');
    if (!goalsList) return;

    if (!goals.length) {
        goalsList.innerHTML = `
            <div class="empty-state">
                <span class="material-symbols-outlined">flag</span>
                <p>No tienes objetivos aún.</p>
                <button class="btn-primary btn-small" onclick="openCreateGoalModal()">Crear Objetivo</button>
            </div>
        `;
        return;
    }

    // Sort: active first
    const sorted = [...goals].sort((a, b) => {
        const order = { active: 0, completed: 1, lost: 2 };
        return (order[a.status] || 0) - (order[b.status] || 0);
    });

    goalsList.innerHTML = sorted.map(goal => {
        const currentBalance = getGoalCurrentBalance(goal);
        const progress = goal.targetAmount > 0 ? Math.min((currentBalance / goal.targetAmount) * 100, 100) : 0;
        const remaining = Math.max(goal.targetAmount - currentBalance, 0);
        const profit = currentBalance - (goal.initialAmount || 0);
        const profitPerc = goal.initialAmount > 0 ? (profit / goal.initialAmount) * 100 : 0;

        return `
            <div class="goal-card-large ${goal.status}" data-goal-id="${goal.id}" onclick="openGoalDetail('${goal.id}')">
                <div class="goal-card-header">
                    <div class="goal-card-title">
                        <span class="material-symbols-outlined">${goal.status === 'completed' ? 'check_circle' : goal.status === 'lost' ? 'cancel' : 'flag'}</span>
                        <h4>${goal.name}</h4>
                    </div>
                    <span class="goal-status-badge ${goal.status}">${goal.status === 'completed' ? 'Completado' : goal.status === 'lost' ? 'Perdido' : 'Activo'}</span>
                </div>
                <div class="goal-progress-bar-container">
                    <div class="goal-progress-bar-fill ${goal.status}" style="width:${progress}%"></div>
                </div>
                <div class="goal-card-stats">
                    <div class="goal-card-stat">
                        <span class="label">Balance</span>
                        <span class="value">${formatMoney(currentBalance)}</span>
                    </div>
                    <div class="goal-card-stat">
                        <span class="label">Objetivo</span>
                        <span class="value">${formatMoney(goal.targetAmount)}</span>
                    </div>
                    <div class="goal-card-stat">
                        <span class="label">Ganancia</span>
                        <span class="value ${profit >= 0 ? 'profit' : 'loss'}">${profit >= 0 ? '+' : ''}${formatMoney(profit)}</span>
                    </div>
                    <div class="goal-card-stat">
                        <span class="label">Trades</span>
                        <span class="value">${goal.trades?.length || 0}</span>
                    </div>
                </div>
                ${goal.status === 'active' ? `<div class="goal-remaining-text">Faltan ${formatMoney(remaining)} (${progress.toFixed(1)}%)</div>` : ''}
            </div>
        `;
    }).join('');
}

function renderObjectivesAnalytics(profile) {
    // For now, redirect to objectives view
    renderObjectivesView(profile);
}

// Goal Modal Functions
function openCreateGoalModal() {
    document.getElementById('createGoalForm')?.reset();
    document.getElementById('createGoalModal')?.classList.add('active');
}

function closeCreateGoalModal() {
    document.getElementById('createGoalModal')?.classList.remove('active');
}

function handleCreateGoal(e) {
    e.preventDefault();
    const profile = getActiveProfile();
    if (!profile || profile.strategyType !== STRATEGY_TYPES.OBJECTIVES) return;

    const name = document.getElementById('goalName').value.trim();
    const initialAmount = parseFloat(document.getElementById('goalInitialAmount').value);
    const targetAmount = parseFloat(document.getElementById('goalTargetAmountInput').value);

    if (!name) { alert('Por favor ingresa un nombre para el objetivo'); return; }
    if (isNaN(initialAmount) || initialAmount < 0) { alert('Por favor ingresa un importe inicial válido'); return; }
    if (isNaN(targetAmount) || targetAmount <= 0) { alert('Por favor ingresa un importe objetivo válido'); return; }
    if (targetAmount <= initialAmount) { alert('El objetivo debe ser mayor al importe inicial'); return; }

    if (!profile.goals) profile.goals = [];

    const newGoal = {
        id: Date.now().toString(),
        name,
        initialAmount,
        targetAmount,
        status: 'active',
        trades: [],
        createdAt: new Date().toISOString()
    };

    profile.goals.push(newGoal);
    saveState();
    closeCreateGoalModal();
    switchView('view-objectives');
}

// Goal Detail Functions
function openGoalDetail(goalId) {
    currentGoalId = goalId;
    switchView('view-goal-detail');
}

function renderGoalDetail(profile) {
    if (!profile || !currentGoalId) return;

    const goal = (profile.goals || []).find(g => g.id === currentGoalId);
    if (!goal) { switchView('view-dashboard'); return; }

    const currentBalance = getGoalCurrentBalance(goal);
    const progress = goal.targetAmount > 0 ? Math.min((currentBalance / goal.targetAmount) * 100, 100) : 0;
    const remaining = Math.max(goal.targetAmount - currentBalance, 0);
    const profit = currentBalance - (goal.initialAmount || 0);
    const profitPerc = goal.initialAmount > 0 ? (profit / goal.initialAmount) * 100 : 0;

    // Update header
    document.getElementById('goalDetailTitle').textContent = goal.name;

    // Update status badge
    const statusBadge = document.getElementById('goalStatusBadge');
    if (statusBadge) {
        statusBadge.textContent = goal.status === 'completed' ? 'Completado' : goal.status === 'lost' ? 'Perdido' : 'Activo';
        statusBadge.className = 'goal-status-badge ' + goal.status;
    }

    // Update progress card
    document.getElementById('goalCurrentAmount').textContent = formatMoney(currentBalance);
    document.getElementById('goalTargetAmount').textContent = formatMoney(goal.targetAmount);
    document.getElementById('goalProgressFill').style.width = progress + '%';
    document.getElementById('goalProgressFill').className = 'progress-bar-fill ' + goal.status;
    document.getElementById('goalRemainingText').textContent = goal.status === 'completed' ? '¡Objetivo alcanzado!' : goal.status === 'lost' ? 'Objetivo perdido' : `Faltan ${formatMoney(remaining)}`;
    document.getElementById('goalProgressPercent').textContent = progress.toFixed(1) + '%';

    // Update stats
    document.getElementById('goalBalance').textContent = formatMoney(currentBalance);
    document.getElementById('goalProfit').textContent = (profit >= 0 ? '+' : '') + formatMoney(profit);
    document.getElementById('goalProfit').className = 'goal-stat-value ' + (profit >= 0 ? 'profit' : 'loss');
    document.getElementById('goalPercent').textContent = (profitPerc >= 0 ? '+' : '') + profitPerc.toFixed(1) + '%';
    document.getElementById('goalTradeCount').textContent = goal.trades?.length || 0;

    // Show/hide add trade button based on status
    const addTradeBtn = document.getElementById('addGoalTradeBtn');
    if (addTradeBtn) {
        addTradeBtn.style.display = goal.status === 'active' ? 'flex' : 'none';
    }

    // Render trades list
    renderGoalTradesList(goal);
}

function renderGoalTradesList(goal) {
    const tradesList = document.getElementById('goalTradesList');
    if (!tradesList) return;

    if (!goal.trades || !goal.trades.length) {
        tradesList.innerHTML = `
            <div class="empty-state" style="padding:24px;">
                <span class="material-symbols-outlined">show_chart</span>
                <p>Sin trades registrados.</p>
            </div>
        `;
        return;
    }

    // Sort by date descending
    const sorted = [...goal.trades].sort((a, b) => new Date(b.date) - new Date(a.date));

    tradesList.innerHTML = sorted.map(trade => {
        const isProfit = trade.profit >= 0;
        const crypto = CRYPTO_LIST.find(c => c.symbol === trade.asset) || { symbol: trade.asset || '???', name: trade.asset || 'Trade', logo: '' };

        // Date formatting (ensure no time)
        const dateObj = new Date(trade.date);
        const dateStr = dateObj.toLocaleDateString(CONFIG.LOCALE || 'es-ES', { year: 'numeric', month: 'short', day: 'numeric' });

        return `
            <div class="trade-card goal-trade-card" data-trade-id="${trade.id}" onclick="openGoalTradeDetail('${trade.id}')">
                <div class="trade-icon">
                    ${crypto.logo ?
                `<img src="${crypto.logo}" alt="${crypto.symbol}" class="crypto-logo-small" onerror="this.parentElement.innerHTML='<span class=\'material-symbols-outlined\'>${isProfit ? 'trending_up' : 'trending_down'}</span>'">` :
                `<span class="material-symbols-outlined">${isProfit ? 'trending_up' : 'trending_down'}</span>`
            }
                </div>
                <div class="trade-info">
                    <div class="trade-asset">${crypto.name || crypto.symbol} <small>${crypto.symbol !== (crypto.name || crypto.symbol) ? crypto.symbol : ''}</small></div>
                    <div class="trade-date">${dateStr}</div>
                </div>
                <div class="trade-right">
                    <div class="trade-pnl ${isProfit ? 'profit' : 'loss'}">${isProfit ? '+' : ''}${formatMoney(trade.profit)} <small>(${isProfit ? '+' : ''}${trade.percentage.toFixed(1)}%)</small></div>
                    <div class="trade-balance">Bal: ${formatMoney(trade.balanceAfter)}</div>
                </div>
            </div>
        `;
    }).join('');
}

// Goal Trade Modal Functions
function openAddGoalTradeModal() {
    const profile = getActiveProfile();
    const goal = (profile?.goals || []).find(g => g.id === currentGoalId);
    if (!goal || goal.status !== 'active') return;

    const currentBalance = getGoalCurrentBalance(goal);

    document.getElementById('addGoalTradeForm')?.reset();
    document.getElementById('goalTradeDate').valueAsDate = new Date();
    document.getElementById('goalAvailableBalance').textContent = `Disponible: ${formatMoney(currentBalance)}`;
    document.getElementById('goalTradeAmount').max = currentBalance;
    document.getElementById('addGoalTradeModal')?.classList.add('active');
}

function closeAddGoalTradeModal() {
    document.getElementById('addGoalTradeModal')?.classList.remove('active');
}

function handleAddGoalTrade(e) {
    e.preventDefault();
    const profile = getActiveProfile();
    const goal = (profile?.goals || []).find(g => g.id === currentGoalId);
    if (!goal || goal.status !== 'active') return;

    const date = document.getElementById('goalTradeDate').value;
    const asset = document.getElementById('goalAssetName').value;
    const tradeAmount = parseFloat(document.getElementById('goalTradeAmount').value);
    const balanceAfter = parseFloat(document.getElementById('goalBalanceAfter').value);

    const currentBalance = getGoalCurrentBalance(goal);

    if (!date) { alert('Por favor selecciona una fecha'); return; }
    if (!asset) { alert('Por favor selecciona una criptomoneda'); return; }
    if (isNaN(tradeAmount) || tradeAmount <= 0) { alert('Por favor ingresa un importe de trade válido'); return; }
    if (tradeAmount > currentBalance) { alert('El importe del trade no puede superar el balance disponible'); return; }
    if (isNaN(balanceAfter) || balanceAfter < 0) { alert('Por favor ingresa el balance final válido'); return; }

    const profit = balanceAfter - currentBalance;
    const percentage = currentBalance > 0 ? (profit / currentBalance) * 100 : 0;

    const newTrade = {
        id: Date.now(),
        date,
        asset,
        tradeAmount,
        balanceAfter,
        profit,
        percentage
    };

    if (!goal.trades) goal.trades = [];
    goal.trades.push(newTrade);

    // Update goal status
    updateGoalStatus(goal);

    saveState();
    closeAddGoalTradeModal();
    renderGoalDetail(profile);

    // Check for completion animation
    if (goal.status === 'completed') {
        triggerGoalCompletionAnimation(goal);
    }
}

function updateGoalStatus(goal) {
    const currentBalance = getGoalCurrentBalance(goal);

    if (currentBalance >= goal.targetAmount) {
        goal.status = 'completed';
    } else if (currentBalance <= 0) {
        goal.status = 'lost';
    } else {
        goal.status = 'active';
    }
}

function triggerGoalCompletionAnimation(goal) {
    // Create celebration overlay
    const overlay = document.createElement('div');
    overlay.className = 'goal-celebration-overlay';
    overlay.innerHTML = `
        <div class="goal-celebration-content">
            <span class="material-symbols-outlined celebration-icon">celebration</span>
            <h2>¡Objetivo Completado!</h2>
            <p>${goal.name}</p>
            <p class="celebration-amount">${formatMoney(goal.targetAmount)}</p>
        </div>
    `;
    document.body.appendChild(overlay);

    setTimeout(() => {
        overlay.classList.add('show');
    }, 100);

    setTimeout(() => {
        overlay.classList.remove('show');
        setTimeout(() => overlay.remove(), 500);
    }, 3000);
}

// Goal Trade Detail
function openGoalTradeDetail(tradeId) {
    currentGoalTradeId = tradeId;
    const profile = getActiveProfile();
    const goal = (profile?.goals || []).find(g => g.id === currentGoalId);
    const trade = goal?.trades?.find(t => t.id == tradeId);
    if (!trade) return;

    const isProfit = trade.profit >= 0;

    document.getElementById('goalTradeDetailContent').innerHTML = `
        <div class="trade-detail-header">
            <div class="trade-detail-icon ${isProfit ? 'profit' : 'loss'}">
                <span class="material-symbols-outlined">${isProfit ? 'trending_up' : 'trending_down'}</span>
            </div>
            <div class="trade-detail-title">
                <h4>Trade #${trade.id.toString().slice(-4)}</h4>
                <span>${formatDate(trade.date)}</span>
            </div>
        </div>
        <div class="trade-detail-stats">
            <div class="detail-stat">
                <label>Resultado</label>
                <span style="color:${isProfit ? 'var(--success)' : 'var(--danger)'}">${isProfit ? '+' : ''}${formatMoney(trade.profit)}</span>
            </div>
            <div class="detail-stat">
                <label>Porcentaje</label>
                <span>${isProfit ? '+' : ''}${trade.percentage.toFixed(2)}%</span>
            </div>
            <div class="detail-stat">
                <label>Balance Después</label>
                <span>${formatMoney(trade.balanceAfter)}</span>
            </div>
            <div class="detail-stat">
                <label>Importe Trade</label>
                <span>${formatMoney(trade.tradeAmount)}</span>
            </div>
        </div>
    `;

    // Show/hide delete button based on goal status
    const deleteBtn = document.getElementById('deleteGoalTradeBtn');
    if (deleteBtn) {
        deleteBtn.style.display = goal.status === 'active' ? 'flex' : 'none';
    }

    document.getElementById('goalTradeDetailModal')?.classList.add('active');
}

function closeGoalTradeDetail() {
    document.getElementById('goalTradeDetailModal')?.classList.remove('active');
    currentGoalTradeId = null;
}

function deleteCurrentGoalTrade() {
    if (!currentGoalTradeId) return;
    const profile = getActiveProfile();
    const goal = (profile?.goals || []).find(g => g.id === currentGoalId);
    if (!goal || goal.status !== 'active') return;

    const idx = goal.trades?.findIndex(t => t.id == currentGoalTradeId);
    if (idx !== -1 && confirm('¿Eliminar este trade?')) {
        goal.trades.splice(idx, 1);

        // Recalculate balances if needed
        recalculateGoalBalances(goal);
        updateGoalStatus(goal);

        saveState();
        closeGoalTradeDetail();
        renderGoalDetail(profile);
    }
}

function recalculateGoalBalances(goal) {
    if (!goal.trades || !goal.trades.length) return;

    // Sort by date ascending
    const sorted = [...goal.trades].sort((a, b) => new Date(a.date) - new Date(b.date));

    // First trade uses initial amount as previous balance
    let prevBalance = goal.initialAmount;
    sorted.forEach(trade => {
        trade.profit = trade.balanceAfter - prevBalance;
        trade.percentage = prevBalance > 0 ? (trade.profit / prevBalance) * 100 : 0;
        prevBalance = trade.balanceAfter;
    });

    goal.trades = sorted;
}

function handleDeleteGoal() {
    if (!currentGoalId) return;
    const profile = getActiveProfile();
    if (!profile) return;

    const goalIdx = (profile.goals || []).findIndex(g => g.id === currentGoalId);
    if (goalIdx !== -1 && confirm('¿Eliminar este objetivo y todos sus trades?')) {
        profile.goals.splice(goalIdx, 1);
        saveState();
        currentGoalId = null;
        switchView('view-dashboard');
    }
}
