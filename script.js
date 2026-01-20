// ==================== CONFIGURACIÓN ====================
const CONFIG = {
    SUPABASE_URL: 'https://agvjxfekuxmvnanlnacx.supabase.co',
    SUPABASE_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFndmp4ZmVrdXhtdm5hbmxuYWN4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg1NjUwMjksImV4cCI6MjA4NDE0MTAyOX0.W5ZVBr3y1y_OVD9EeYVTRmeiU04ImcuUXFxooHE4J64',
    LOCALE: 'es-ES',
    CURRENCY: 'USD'
};

// Top 100 Cryptocurrencies with logos from CoinGecko
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
    { symbol: 'TRX', name: 'TRON', logo: 'https://assets.coingecko.com/coins/images/1094/small/tron-logo.png' },
    { symbol: 'AVAX', name: 'Avalanche', logo: 'https://assets.coingecko.com/coins/images/12559/small/Avalanche_Circle_RedWhite_Trans.png' },
    { symbol: 'SHIB', name: 'Shiba Inu', logo: 'https://assets.coingecko.com/coins/images/11939/small/shiba.png' },
    { symbol: 'DOT', name: 'Polkadot', logo: 'https://assets.coingecko.com/coins/images/12171/small/polkadot.png' },
    { symbol: 'LINK', name: 'Chainlink', logo: 'https://assets.coingecko.com/coins/images/877/small/chainlink-new-logo.png' },
    { symbol: 'BCH', name: 'Bitcoin Cash', logo: 'https://assets.coingecko.com/coins/images/780/small/bitcoin-cash-circle.png' },
    { symbol: 'NEAR', name: 'NEAR Protocol', logo: 'https://assets.coingecko.com/coins/images/10365/small/near.jpg' },
    { symbol: 'MATIC', name: 'Polygon', logo: 'https://assets.coingecko.com/coins/images/4713/small/polygon.png' },
    { symbol: 'LTC', name: 'Litecoin', logo: 'https://assets.coingecko.com/coins/images/2/small/litecoin.png' },
    { symbol: 'UNI', name: 'Uniswap', logo: 'https://assets.coingecko.com/coins/images/12504/small/uni.jpg' },
    { symbol: 'PEPE', name: 'Pepe', logo: 'https://assets.coingecko.com/coins/images/29850/small/pepe-token.jpeg' },
    { symbol: 'ICP', name: 'Internet Computer', logo: 'https://assets.coingecko.com/coins/images/14495/small/Internet_Computer_logo.png' },
    { symbol: 'APT', name: 'Aptos', logo: 'https://assets.coingecko.com/coins/images/26455/small/aptos_round.png' },
    { symbol: 'ETC', name: 'Ethereum Classic', logo: 'https://assets.coingecko.com/coins/images/453/small/ethereum-classic-logo.png' },
    { symbol: 'FET', name: 'Fetch.ai', logo: 'https://assets.coingecko.com/coins/images/5681/small/Fetch.jpg' },
    { symbol: 'ATOM', name: 'Cosmos', logo: 'https://assets.coingecko.com/coins/images/1481/small/cosmos_hub.png' },
    { symbol: 'XLM', name: 'Stellar', logo: 'https://assets.coingecko.com/coins/images/100/small/Stellar_symbol_black_RGB.png' },
    { symbol: 'RENDER', name: 'Render', logo: 'https://assets.coingecko.com/coins/images/11636/small/rndr.png' },
    { symbol: 'STX', name: 'Stacks', logo: 'https://assets.coingecko.com/coins/images/2069/small/Stacks_logo_full.png' },
    { symbol: 'FIL', name: 'Filecoin', logo: 'https://assets.coingecko.com/coins/images/12817/small/filecoin.png' },
    { symbol: 'ARB', name: 'Arbitrum', logo: 'https://assets.coingecko.com/coins/images/16547/small/photo_2023-03-29_21.47.00.jpeg' },
    { symbol: 'HBAR', name: 'Hedera', logo: 'https://assets.coingecko.com/coins/images/3688/small/hbar.png' },
    { symbol: 'MKR', name: 'Maker', logo: 'https://assets.coingecko.com/coins/images/1364/small/Mark_Maker.png' },
    { symbol: 'VET', name: 'VeChain', logo: 'https://assets.coingecko.com/coins/images/1167/small/VeChain-Logo-768x725.png' },
    { symbol: 'OP', name: 'Optimism', logo: 'https://assets.coingecko.com/coins/images/25244/small/Optimism.png' },
    { symbol: 'INJ', name: 'Injective', logo: 'https://assets.coingecko.com/coins/images/12882/small/Secondary_Symbol.png' },
    { symbol: 'AAVE', name: 'Aave', logo: 'https://assets.coingecko.com/coins/images/12645/small/AAVE.png' },
    { symbol: 'IMX', name: 'Immutable', logo: 'https://assets.coingecko.com/coins/images/17233/small/immutableX-symbol-BLK-RGB.png' },
    { symbol: 'GRT', name: 'The Graph', logo: 'https://assets.coingecko.com/coins/images/13397/small/Graph_Token.png' },
    { symbol: 'ALGO', name: 'Algorand', logo: 'https://assets.coingecko.com/coins/images/4380/small/download.png' },
    { symbol: 'SEI', name: 'Sei', logo: 'https://assets.coingecko.com/coins/images/28205/small/Sei_Logo_-_Transparent.png' },
    { symbol: 'SUI', name: 'Sui', logo: 'https://assets.coingecko.com/coins/images/26375/small/sui_asset.jpeg' },
    { symbol: 'TIA', name: 'Celestia', logo: 'https://assets.coingecko.com/coins/images/31967/small/tia.jpg' },
    { symbol: 'SAND', name: 'The Sandbox', logo: 'https://assets.coingecko.com/coins/images/12129/small/sandbox_logo.jpg' },
    { symbol: 'MANA', name: 'Decentraland', logo: 'https://assets.coingecko.com/coins/images/878/small/decentraland-mana.png' },
    { symbol: 'AXS', name: 'Axie Infinity', logo: 'https://assets.coingecko.com/coins/images/13029/small/axie_infinity_logo.png' },
    { symbol: 'GALA', name: 'Gala', logo: 'https://assets.coingecko.com/coins/images/12493/small/GALA-COINGECKO.png' },
    { symbol: 'FTM', name: 'Fantom', logo: 'https://assets.coingecko.com/coins/images/4001/small/Fantom_round.png' },
    { symbol: 'FLOW', name: 'Flow', logo: 'https://assets.coingecko.com/coins/images/13446/small/5f6294c0c7a8cda55cb1c936_Flow_Wordmark.png' },
    { symbol: 'THETA', name: 'Theta Network', logo: 'https://assets.coingecko.com/coins/images/2538/small/theta-token-logo.png' },
    { symbol: 'XTZ', name: 'Tezos', logo: 'https://assets.coingecko.com/coins/images/976/small/Tezos-logo.png' },
    { symbol: 'EOS', name: 'EOS', logo: 'https://assets.coingecko.com/coins/images/738/small/eos-eos-logo.png' },
    { symbol: 'CRO', name: 'Cronos', logo: 'https://assets.coingecko.com/coins/images/7310/small/cro_token_logo.png' },
    { symbol: 'EGLD', name: 'MultiversX', logo: 'https://assets.coingecko.com/coins/images/12335/small/egld-token-logo.png' },
    { symbol: 'NEO', name: 'Neo', logo: 'https://assets.coingecko.com/coins/images/480/small/NEO_512_512.png' },
    { symbol: 'KAVA', name: 'Kava', logo: 'https://assets.coingecko.com/coins/images/9761/small/kava.png' },
    { symbol: 'XMR', name: 'Monero', logo: 'https://assets.coingecko.com/coins/images/69/small/monero_logo.png' },
    { symbol: 'IOTA', name: 'IOTA', logo: 'https://assets.coingecko.com/coins/images/692/small/IOTA_Swirl.png' },
    { symbol: 'ZEC', name: 'Zcash', logo: 'https://assets.coingecko.com/coins/images/486/small/circle-zcash-color.png' },
    { symbol: 'DASH', name: 'Dash', logo: 'https://assets.coingecko.com/coins/images/19/small/dash-logo.png' },
    { symbol: 'CAKE', name: 'PancakeSwap', logo: 'https://assets.coingecko.com/coins/images/12632/small/pancakeswap-cake-logo.png' },
    { symbol: 'LDO', name: 'Lido DAO', logo: 'https://assets.coingecko.com/coins/images/13573/small/Lido_DAO.png' },
    { symbol: 'CRV', name: 'Curve DAO', logo: 'https://assets.coingecko.com/coins/images/12124/small/Curve.png' },
    { symbol: 'COMP', name: 'Compound', logo: 'https://assets.coingecko.com/coins/images/10775/small/COMP.png' },
    { symbol: 'SNX', name: 'Synthetix', logo: 'https://assets.coingecko.com/coins/images/3406/small/SNX.png' },
    { symbol: 'SUSHI', name: 'Sushi', logo: 'https://assets.coingecko.com/coins/images/12271/small/512x512_Logo_no_chop.png' },
    { symbol: '1INCH', name: '1inch', logo: 'https://assets.coingecko.com/coins/images/13469/small/1inch-token.png' },
    { symbol: 'ENS', name: 'Ethereum Name Service', logo: 'https://assets.coingecko.com/coins/images/19785/small/acatxTm8_400x400.jpg' },
    { symbol: 'BONK', name: 'Bonk', logo: 'https://assets.coingecko.com/coins/images/28600/small/bonk.jpg' },
    { symbol: 'WIF', name: 'dogwifhat', logo: 'https://assets.coingecko.com/coins/images/33566/small/dogwifhat.jpg' },
    { symbol: 'FLOKI', name: 'Floki', logo: 'https://assets.coingecko.com/coins/images/16746/small/PNG_image.png' },
    { symbol: 'NOT', name: 'Notcoin', logo: 'https://assets.coingecko.com/coins/images/36674/small/Notcoin_%281%29.png' },
    { symbol: 'JUP', name: 'Jupiter', logo: 'https://assets.coingecko.com/coins/images/34188/small/jup.png' },
    { symbol: 'W', name: 'Wormhole', logo: 'https://assets.coingecko.com/coins/images/35087/small/womrhole_logo_full_color_rgb_2000px_72ppi_fb766ac85a.png' },
    { symbol: 'PYTH', name: 'Pyth Network', logo: 'https://assets.coingecko.com/coins/images/31924/small/pyth.png' },
    { symbol: 'ONDO', name: 'Ondo', logo: 'https://assets.coingecko.com/coins/images/26580/small/ONDO.png' },
    { symbol: 'TAO', name: 'Bittensor', logo: 'https://assets.coingecko.com/coins/images/28452/small/ARUsPeNQ_400x400.jpeg' },
    { symbol: 'ORDI', name: 'ORDI', logo: 'https://assets.coingecko.com/coins/images/30162/small/ordi.png' },
    { symbol: 'WLD', name: 'Worldcoin', logo: 'https://assets.coingecko.com/coins/images/31069/small/worldcoin.jpeg' },
    { symbol: 'BLUR', name: 'Blur', logo: 'https://assets.coingecko.com/coins/images/28453/small/blur.png' },
    { symbol: 'MEME', name: 'Memecoin', logo: 'https://assets.coingecko.com/coins/images/32528/small/memecoin.jpeg' },
    { symbol: 'ZRO', name: 'LayerZero', logo: 'https://assets.coingecko.com/coins/images/28206/small/ftxG9_TJ_400x400.jpeg' },
    { symbol: 'STRK', name: 'Starknet', logo: 'https://assets.coingecko.com/coins/images/26433/small/starknet.png' },
    { symbol: 'PENDLE', name: 'Pendle', logo: 'https://assets.coingecko.com/coins/images/15069/small/Pendle_Logo_Normal-03.png' },
    { symbol: 'JASMY', name: 'JasmyCoin', logo: 'https://assets.coingecko.com/coins/images/13876/small/JASMY200x200.jpg' },
    { symbol: 'ENJ', name: 'Enjin Coin', logo: 'https://assets.coingecko.com/coins/images/1102/small/enjin-coin-logo.png' },
    { symbol: 'CHZ', name: 'Chiliz', logo: 'https://assets.coingecko.com/coins/images/8834/small/CHZ_Token_updated.png' },
    { symbol: 'ROSE', name: 'Oasis Network', logo: 'https://assets.coingecko.com/coins/images/13162/small/rose.png' },
    { symbol: 'ZIL', name: 'Zilliqa', logo: 'https://assets.coingecko.com/coins/images/2687/small/Zilliqa-logo.png' },
    { symbol: 'HOT', name: 'Holo', logo: 'https://assets.coingecko.com/coins/images/3348/small/Holologo_Profile.png' },
    { symbol: 'BAT', name: 'Basic Attention Token', logo: 'https://assets.coingecko.com/coins/images/677/small/basic-attention-token.png' },
    { symbol: 'ANKR', name: 'Ankr', logo: 'https://assets.coingecko.com/coins/images/4324/small/U85xTl2.png' },
    { symbol: 'ONE', name: 'Harmony', logo: 'https://assets.coingecko.com/coins/images/4344/small/Y88JAze.png' },
    { symbol: 'GMT', name: 'STEPN', logo: 'https://assets.coingecko.com/coins/images/23597/small/gmt.png' },
    { symbol: 'MASK', name: 'Mask Network', logo: 'https://assets.coingecko.com/coins/images/14051/small/Mask_Network.jpg' },
    { symbol: 'SKL', name: 'SKALE', logo: 'https://assets.coingecko.com/coins/images/13245/small/SKALE_token_300x300.png' },
    { symbol: 'CELO', name: 'Celo', logo: 'https://assets.coingecko.com/coins/images/11090/small/InjsUxU.png' },
    { symbol: 'RVN', name: 'Ravencoin', logo: 'https://assets.coingecko.com/coins/images/3412/small/ravencoin.png' },
    { symbol: 'ICX', name: 'ICON', logo: 'https://assets.coingecko.com/coins/images/1060/small/icon-icx-logo.png' },
    { symbol: 'CUSTOM', name: 'Custom Token', logo: '' }
];

// Supabase Client
let supabaseClient = null;
if (window.supabase) {
    supabaseClient = window.supabase.createClient(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_KEY);
    console.log('Supabase initialized');
}

// Global State
let state = { activeProfileId: null, profiles: {}, cryptoUsage: {} };
let currentUser = null;
let isSignUpMode = false;
let elements = {};
let selectedCrypto = null;

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', init);

async function init() {
    console.log('Initializing app...');
    mapElements();
    setupEventListeners();

    if (supabaseClient) {
        try {
            const { data: { session } } = await supabaseClient.auth.getSession();
            if (session) {
                await handleSessionSuccess(session.user);
            } else {
                showAuth();
            }

            supabaseClient.auth.onAuthStateChange((event, session) => {
                if (event === 'SIGNED_IN' && session) {
                    handleSessionSuccess(session.user);
                } else if (event === 'SIGNED_OUT') {
                    currentUser = null;
                    showAuth();
                }
            });
        } catch (err) {
            console.error('Session error:', err);
            showAuth();
        }
    } else {
        showAuth();
    }

    // Set today's date
    const dateInput = document.getElementById('tradeDate');
    if (dateInput) dateInput.valueAsDate = new Date();
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

        // Analytics
        analyticsEquity: document.getElementById('analyticsEquity'),
        equityPercent: document.getElementById('equityPercent'),
        equityBadge: document.getElementById('equityBadge'),
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

        // Trade Form
        tradeForm: document.getElementById('tradeForm'),
        cryptoSelector: document.getElementById('cryptoSelector'),
        selectedCrypto: document.getElementById('selectedCrypto'),
        selectedCryptoText: document.getElementById('selectedCryptoText'),
        selectedCryptoLogo: document.getElementById('selectedCryptoLogo'),
        assetName: document.getElementById('assetName'),

        // Profile
        createProfileForm: document.getElementById('createProfileForm'),
        newProfileName: document.getElementById('newProfileName'),
        clearDataBtn: document.getElementById('clearDataBtn'),
        profileList: document.getElementById('profileList'),

        // Crypto Modal
        cryptoModal: document.getElementById('cryptoModal'),
        closeCryptoModal: document.getElementById('closeCryptoModal'),
        cryptoSearch: document.getElementById('cryptoSearch'),
        cryptoList: document.getElementById('cryptoList'),
        favoritesList: document.getElementById('favoritesList'),
        addCustomCrypto: document.getElementById('addCustomCrypto')
    };
}

function setupEventListeners() {
    // Auth
    elements.authForm?.addEventListener('submit', handleAuthSubmit);
    elements.authToggleLink?.addEventListener('click', (e) => {
        e.preventDefault();
        toggleAuthMode();
    });
    elements.logoutBtn?.addEventListener('click', handleLogout);

    // Navigation
    elements.navItems?.forEach(item => {
        item.addEventListener('click', () => switchView(item.dataset.target));
    });

    // Trade Form
    elements.tradeForm?.addEventListener('submit', handleAddTrade);
    elements.cryptoSelector?.addEventListener('click', openCryptoModal);

    // Profile
    elements.createProfileForm?.addEventListener('submit', handleCreateProfile);
    elements.clearDataBtn?.addEventListener('click', handleClearData);
    elements.profileList?.addEventListener('click', handleProfileClick);
    elements.tradesList?.addEventListener('click', handleTradeClick);

    // Crypto Modal
    elements.closeCryptoModal?.addEventListener('click', closeCryptoModal);
    elements.cryptoSearch?.addEventListener('input', filterCryptos);
    elements.addCustomCrypto?.addEventListener('click', addCustomCrypto);
    elements.cryptoModal?.addEventListener('click', (e) => {
        if (e.target === elements.cryptoModal) closeCryptoModal();
    });
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

    if (!email || !password || password.length < 6) {
        showAuthError('Please enter valid email and password (min 6 chars)');
        return;
    }

    elements.authSubmitBtn.disabled = true;
    elements.authSubmitBtn.textContent = 'Processing...';
    hideAuthError();

    try {
        if (isSignUpMode) {
            const { error } = await supabaseClient.auth.signUp({ email, password });
            if (error) throw error;
            alert('Registration successful! You can now sign in.');
            toggleAuthMode();
        } else {
            const { error } = await supabaseClient.auth.signInWithPassword({ email, password });
            if (error) throw error;
        }
    } catch (err) {
        let msg = err.message;
        if (msg.includes('Invalid login')) msg = 'Invalid credentials';
        if (msg.includes('already registered')) msg = 'Email already registered';
        showAuthError(msg);
    } finally {
        elements.authSubmitBtn.disabled = false;
        elements.authSubmitBtn.textContent = isSignUpMode ? 'Sign Up' : 'Sign In';
    }
}

function showAuthError(msg) {
    elements.authError.textContent = msg;
    elements.authError.style.display = 'block';
}

function hideAuthError() {
    elements.authError.style.display = 'none';
}

function showAuth() {
    elements.appContainer?.classList.remove('logged-in');
    elements.mainHeader.style.display = 'none';
    switchView('view-auth');
}

async function handleSessionSuccess(user) {
    currentUser = user;
    elements.appContainer?.classList.add('logged-in');
    elements.mainHeader.style.display = 'flex';

    // Set user avatar initials
    if (elements.userAvatar && user.email) {
        const initials = user.email.substring(0, 2).toUpperCase();
        elements.userAvatar.textContent = initials;
    }

    await loadStateFromCloud();
    switchView('view-dashboard');
}

async function handleLogout() {
    if (supabaseClient) {
        await supabaseClient.auth.signOut();
    }
}

// ==================== DATA ====================
async function loadStateFromCloud() {
    if (!currentUser || !supabaseClient) return;

    try {
        const { data } = await supabaseClient
            .from('user_data')
            .select('content')
            .eq('user_id', currentUser.id)
            .maybeSingle();

        if (data?.content) {
            state = { ...state, ...data.content };
        } else {
            const id = Date.now().toString();
            state = {
                activeProfileId: id,
                profiles: { [id]: { id, name: 'My Portfolio', trades: [], initialCapital: 0 } },
                cryptoUsage: {}
            };
            await saveState();
        }
    } catch (err) {
        console.error('Load error:', err);
    }

    updateUI();
}

async function saveState() {
    if (!currentUser || !supabaseClient) return;

    updateUI();

    try {
        const { error } = await supabaseClient.from('user_data').upsert(
            {
                user_id: currentUser.id,
                content: state,
                updated_at: new Date().toISOString()
            },
            { onConflict: 'user_id' }
        );

        if (error) {
            console.error('Save error:', error);
        } else {
            console.log('Data saved successfully');
        }
    } catch (err) {
        console.error('Save error:', err);
    }
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

    if (elements.appTitle) {
        switch (targetId) {
            case 'view-dashboard':
                elements.appTitle.textContent = profile?.name || 'Portfolio';
                break;
            case 'view-analytics':
                renderAnalytics(profile);
                break;
            case 'view-profile':
                renderProfileList();
                break;
        }
    }
}

function updateUI() {
    const profile = getActiveProfile();
    if (!profile) return;

    const currentBalance = profile.trades.length ? profile.trades[0].balanceAfter : 0;
    const totalDiff = currentBalance - profile.initialCapital;
    const totalPerc = profile.initialCapital > 0 ? (totalDiff / profile.initialCapital) * 100 : 0;

    // PNL Display
    const sign = totalDiff >= 0 ? '+' : '';
    if (elements.totalProfitLoss) {
        elements.totalProfitLoss.textContent = sign + formatMoney(totalDiff);
    }

    if (elements.percentageGain) {
        elements.percentageGain.textContent = sign + totalPerc.toFixed(1) + '%';
    }

    if (elements.percentageBadge) {
        elements.percentageBadge.className = 'pnl-badge ' + (totalDiff >= 0 ? 'positive' : 'negative');
        const icon = elements.percentageBadge.querySelector('.material-symbols-outlined');
        if (icon) icon.textContent = totalDiff >= 0 ? 'trending_up' : 'trending_down';
    }

    // Stats
    const activeTrades = profile.trades.filter(t => !t.isInitial);
    const wins = activeTrades.filter(t => t.profit > 0).length;
    const losses = activeTrades.filter(t => t.profit <= 0).length;
    const winRateVal = activeTrades.length ? Math.round((wins / activeTrades.length) * 100) : 0;

    if (elements.totalTrades) elements.totalTrades.textContent = activeTrades.length;
    if (elements.winRate) elements.winRate.textContent = winRateVal + '%';
    if (elements.winLoss) elements.winLoss.textContent = wins + 'W / ' + losses + 'L';

    renderTradesList(profile.trades);
}

function renderTradesList(trades) {
    if (!elements.tradesList) return;

    elements.tradesList.innerHTML = '';

    if (!trades.length) {
        elements.emptyState?.classList.remove('hidden');
        return;
    }

    elements.emptyState?.classList.add('hidden');

    trades.forEach(trade => {
        const crypto = CRYPTO_LIST.find(c => c.symbol === trade.asset) || { symbol: trade.asset, name: trade.asset, logo: '' };
        const isProfit = trade.profit >= 0;
        const sign = isProfit ? '+' : '';
        const percSign = trade.percentage >= 0 ? '+' : '';

        const card = document.createElement('div');
        card.className = 'trade-card';
        card.innerHTML = `
            <div class="trade-icon">
                ${crypto.logo ? `<img src="${crypto.logo}" alt="${crypto.symbol}" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"><span class="fallback" style="display:none">${crypto.symbol[0]}</span>` : `<span class="fallback">${crypto.symbol[0]}</span>`}
            </div>
            <div class="trade-info">
                <div class="trade-asset">${trade.asset}/USDT</div>
                <div class="trade-date">${formatDate(trade.date)}</div>
            </div>
            <div class="trade-right">
                <div class="trade-pnl ${trade.isInitial ? '' : (isProfit ? 'profit' : 'loss')}">
                    ${trade.isInitial ? 'Initial' : `${sign}${formatMoney(trade.profit)} <small>(${percSign}${trade.percentage.toFixed(1)}%)</small>`}
                </div>
                <div class="trade-balance">Bal: ${formatMoney(trade.balanceAfter)}</div>
            </div>
            <button class="delete-btn-card" data-id="${trade.id}">
                <span class="material-symbols-outlined">close</span>
            </button>
        `;
        elements.tradesList.appendChild(card);
    });
}

// ==================== CRYPTO SELECTOR ====================
function openCryptoModal() {
    renderCryptoList();
    renderFavorites();
    elements.cryptoModal?.classList.add('active');
    elements.cryptoSearch.value = '';
    elements.cryptoSearch.focus();
}

function closeCryptoModal() {
    elements.cryptoModal?.classList.remove('active');
}

function renderCryptoList(filter = '') {
    if (!elements.cryptoList) return;

    const filtered = filter
        ? CRYPTO_LIST.filter(c =>
            c.symbol.toLowerCase().includes(filter.toLowerCase()) ||
            c.name.toLowerCase().includes(filter.toLowerCase())
        )
        : CRYPTO_LIST.filter(c => c.symbol !== 'CUSTOM');

    elements.cryptoList.innerHTML = filtered.map(crypto => `
        <div class="crypto-item" data-symbol="${crypto.symbol}">
            ${crypto.logo ? `<img src="${crypto.logo}" alt="${crypto.symbol}" onerror="this.style.display='none'">` : '<div style="width:36px;height:36px;background:var(--input-bg);border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700">' + crypto.symbol[0] + '</div>'}
            <div class="crypto-item-info">
                <div class="crypto-item-name">${crypto.name}</div>
                <div class="crypto-item-symbol">${crypto.symbol}</div>
            </div>
        </div>
    `).join('');

    // Add click listeners
    elements.cryptoList.querySelectorAll('.crypto-item').forEach(item => {
        item.addEventListener('click', () => selectCrypto(item.dataset.symbol));
    });
}

function renderFavorites() {
    if (!elements.favoritesList) return;

    // Get top 5 most used cryptos
    const usage = state.cryptoUsage || {};
    const sortedCryptos = Object.entries(usage)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([symbol]) => CRYPTO_LIST.find(c => c.symbol === symbol))
        .filter(Boolean);

    if (!sortedCryptos.length) {
        // Show default favorites
        sortedCryptos.push(...CRYPTO_LIST.slice(0, 5));
    }

    elements.favoritesList.innerHTML = sortedCryptos.map(crypto => `
        <div class="favorite-chip" data-symbol="${crypto.symbol}">
            ${crypto.logo ? `<img src="${crypto.logo}" alt="${crypto.symbol}">` : ''}
            <span>${crypto.symbol}</span>
        </div>
    `).join('');

    elements.favoritesList.querySelectorAll('.favorite-chip').forEach(chip => {
        chip.addEventListener('click', () => selectCrypto(chip.dataset.symbol));
    });
}

function filterCryptos(e) {
    renderCryptoList(e.target.value);
}

function selectCrypto(symbol) {
    const crypto = CRYPTO_LIST.find(c => c.symbol === symbol);
    if (!crypto) return;

    selectedCrypto = crypto;
    elements.assetName.value = crypto.symbol;

    if (crypto.logo) {
        elements.selectedCryptoLogo.src = crypto.logo;
        elements.selectedCryptoLogo.style.display = 'block';
        elements.selectedCrypto.querySelector('.search-icon').style.display = 'none';
    } else {
        elements.selectedCryptoLogo.style.display = 'none';
        elements.selectedCrypto.querySelector('.search-icon').style.display = 'block';
    }

    elements.selectedCryptoText.textContent = crypto.symbol + ' - ' + crypto.name;

    // Track usage
    state.cryptoUsage = state.cryptoUsage || {};
    state.cryptoUsage[crypto.symbol] = (state.cryptoUsage[crypto.symbol] || 0) + 1;

    closeCryptoModal();
}

function addCustomCrypto() {
    const symbol = prompt('Enter token symbol (e.g. TOKEN):');
    if (!symbol) return;

    const upperSymbol = symbol.toUpperCase().trim();

    // Add to list if not exists
    if (!CRYPTO_LIST.find(c => c.symbol === upperSymbol)) {
        CRYPTO_LIST.push({ symbol: upperSymbol, name: upperSymbol, logo: '' });
    }

    selectCrypto(upperSymbol);
}

// ==================== TRADES ====================
function handleAddTrade(e) {
    e.preventDefault();
    const profile = getActiveProfile();
    if (!profile) return;

    const asset = elements.assetName.value.trim();
    const balance = parseFloat(document.getElementById('investedAmount').value);
    const date = document.getElementById('tradeDate').value;
    const isInitial = document.getElementById('isInitialInvestment').checked;

    if (!asset) {
        alert('Please select a cryptocurrency');
        return;
    }

    if (isNaN(balance) || balance <= 0) {
        alert('Please enter a valid balance');
        return;
    }

    if (isInitial) {
        profile.trades = [];
        profile.initialCapital = balance;
        profile.trades.push({
            id: Date.now(),
            asset,
            date,
            balanceAfter: balance,
            profit: 0,
            percentage: 0,
            isInitial: true
        });
    } else {
        if (!profile.trades.length) {
            alert('Please log initial capital first');
            return;
        }

        const prevBalance = profile.trades[0].balanceAfter;
        const profit = balance - prevBalance;
        const percentage = prevBalance > 0 ? (profit / prevBalance) * 100 : 0;

        profile.trades.unshift({
            id: Date.now(),
            asset,
            date,
            balanceAfter: balance,
            profit,
            percentage,
            isInitial: false
        });
    }

    saveState();
    resetTradeForm();
    switchView('view-dashboard');
}

function resetTradeForm() {
    elements.tradeForm?.reset();
    selectedCrypto = null;
    elements.assetName.value = '';
    elements.selectedCryptoText.textContent = 'Search asset (e.g. BTC)';
    elements.selectedCryptoLogo.style.display = 'none';
    elements.selectedCrypto.querySelector('.search-icon').style.display = 'block';
    document.getElementById('tradeDate').valueAsDate = new Date();
}

function handleTradeClick(e) {
    const btn = e.target.closest('.delete-btn-card');
    if (btn) {
        const id = Number(btn.dataset.id);
        const profile = getActiveProfile();
        const idx = profile.trades.findIndex(t => t.id === id);

        if (idx !== -1 && confirm('Delete this trade?')) {
            if (profile.trades[idx].isInitial) {
                profile.trades = [];
                profile.initialCapital = 0;
            } else {
                profile.trades.splice(idx, 1);
            }
            saveState();
        }
    }
}

// ==================== PROFILES ====================
function handleCreateProfile(e) {
    e.preventDefault();
    const name = elements.newProfileName.value.trim();
    if (!name) return;

    const id = Date.now().toString();
    state.profiles[id] = { id, name, trades: [], initialCapital: 0 };
    state.activeProfileId = id;
    elements.newProfileName.value = '';

    saveState();
    switchView('view-dashboard');
}

function handleProfileClick(e) {
    const deleteBtn = e.target.closest('.delete-btn-card');
    const card = e.target.closest('.profile-card');

    if (deleteBtn) {
        const id = deleteBtn.dataset.id;
        if (Object.keys(state.profiles).length <= 1) {
            alert('You need at least one portfolio');
            return;
        }
        if (confirm('Delete this portfolio?')) {
            delete state.profiles[id];
            if (state.activeProfileId === id) {
                state.activeProfileId = Object.keys(state.profiles)[0];
            }
            saveState();
            renderProfileList();
        }
    } else if (card) {
        state.activeProfileId = card.dataset.id;
        saveState();
        renderProfileList();
    }
}

function renderProfileList() {
    if (!elements.profileList) return;

    elements.profileList.innerHTML = Object.values(state.profiles).map(p => {
        const isActive = p.id === state.activeProfileId;
        return `
            <div class="profile-card ${isActive ? 'active-profile' : ''}" data-id="${p.id}">
                <div class="profile-left">
                    <div class="profile-avatar">${p.name[0].toUpperCase()}</div>
                    <div class="profile-info">
                        <span class="profile-name">${p.name}${isActive ? ' (Active)' : ''}</span>
                        <span class="profile-sub">${p.trades.length} trades</span>
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
        if (profile) {
            profile.trades = [];
            profile.initialCapital = 0;
            saveState();
        }
    }
}

// ==================== ANALYTICS ====================
function renderAnalytics(profile) {
    if (!profile) return;

    const currentEquity = profile.trades.length ? profile.trades[0].balanceAfter : 0;
    const totalDiff = currentEquity - profile.initialCapital;
    const totalPerc = profile.initialCapital > 0 ? (totalDiff / profile.initialCapital) * 100 : 0;

    if (elements.analyticsEquity) {
        elements.analyticsEquity.textContent = formatMoney(currentEquity);
    }

    if (elements.equityPercent) {
        const sign = totalPerc >= 0 ? '+' : '';
        elements.equityPercent.textContent = sign + totalPerc.toFixed(1) + '%';
    }

    if (elements.equityBadge) {
        elements.equityBadge.className = 'equity-badge ' + (totalPerc >= 0 ? 'positive' : 'negative');
    }

    const activeTrades = profile.trades.filter(t => !t.isInitial);

    // Average gain
    const avgPerc = activeTrades.length
        ? activeTrades.reduce((s, t) => s + t.percentage, 0) / activeTrades.length
        : 0;
    if (elements.statAvgGain) {
        elements.statAvgGain.textContent = (avgPerc >= 0 ? '+' : '') + avgPerc.toFixed(1) + '%';
        elements.statAvgGain.className = 'metric-value ' + (avgPerc >= 0 ? 'profit' : 'loss');
    }

    // Best/Worst
    if (activeTrades.length) {
        const sorted = [...activeTrades].sort((a, b) => b.percentage - a.percentage);
        const best = sorted[0];
        const worst = sorted[sorted.length - 1];

        if (elements.statBestTrade) {
            elements.statBestTrade.textContent = '+' + best.percentage.toFixed(1) + '%';
        }
        if (elements.statBestTradeAsset) {
            elements.statBestTradeAsset.textContent = best.asset + ' Long';
        }
        if (elements.statWorstTrade) {
            elements.statWorstTrade.textContent = worst.percentage.toFixed(1) + '%';
        }
        if (elements.statWorstTradeAsset) {
            elements.statWorstTradeAsset.textContent = worst.asset + ' Trade';
        }
    }

    // Profit Factor
    const grossWin = activeTrades.filter(t => t.profit > 0).reduce((s, t) => s + t.profit, 0);
    const grossLoss = Math.abs(activeTrades.filter(t => t.profit < 0).reduce((s, t) => s + t.profit, 0));
    const pf = grossLoss > 0 ? grossWin / grossLoss : (grossWin > 0 ? 999 : 0);

    if (elements.statProfitFactor) {
        elements.statProfitFactor.textContent = pf === 999 ? '∞' : pf.toFixed(2);
    }
    if (elements.statProfitFactorText) {
        let pfText = 'Neutral';
        if (pf > 2) pfText = 'Excellent';
        else if (pf > 1.5) pfText = 'Good';
        else if (pf > 1) pfText = 'Profitable';
        else if (pf > 0) pfText = 'Unprofitable';
        elements.statProfitFactorText.textContent = pfText;
    }

    generateChartSVG(profile.trades);
    renderMonthlyBreakdown(profile.trades);
}

function generateChartSVG(trades) {
    const chronological = [...trades].sort((a, b) => new Date(a.date) - new Date(b.date));
    const points = chronological.map(t => t.balanceAfter);

    if (points.length < 2) {
        if (elements.chartLine) elements.chartLine.setAttribute('d', '');
        if (elements.chartFill) elements.chartFill.setAttribute('d', '');
        return;
    }

    const maxVal = Math.max(...points) * 1.05;
    const minVal = Math.min(...points) * 0.95;
    const range = maxVal - minVal || 1;
    const width = 375;
    const height = 180;

    const coords = points.map((val, idx) => ({
        x: (idx / (points.length - 1)) * width,
        y: height - ((val - minVal) / range) * height
    }));

    let d = 'M ' + coords[0].x + ' ' + coords[0].y;
    coords.slice(1).forEach(pt => d += ' L ' + pt.x + ' ' + pt.y);

    if (elements.chartLine) elements.chartLine.setAttribute('d', d);
    if (elements.chartFill) elements.chartFill.setAttribute('d', d + ` L ${width} ${height} L 0 ${height} Z`);

    if (elements.chartActivePoint) {
        const last = coords[coords.length - 1];
        elements.chartActivePoint.setAttribute('cx', last.x);
        elements.chartActivePoint.setAttribute('cy', last.y);
        elements.chartActivePoint.classList.remove('hidden');
    }
}

function renderMonthlyBreakdown(trades) {
    if (!elements.monthlyList) return;

    const months = {};

    trades.forEach(t => {
        if (t.isInitial) return;
        const d = new Date(t.date);
        const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
        const monthName = d.toLocaleDateString('en-US', { month: 'short' });

        if (!months[key]) months[key] = { name: monthName, profit: 0 };
        months[key].profit += t.profit;
    });

    const sorted = Object.entries(months).sort((a, b) => b[0].localeCompare(a[0])).slice(0, 4);

    if (!sorted.length) {
        elements.monthlyList.innerHTML = '<p style="color:var(--text-secondary);text-align:center;padding:20px">No monthly data</p>';
        return;
    }

    const maxProfit = Math.max(...sorted.map(([_, m]) => Math.abs(m.profit))) || 1;

    elements.monthlyList.innerHTML = sorted.map(([_, m]) => {
        const isPos = m.profit >= 0;
        const width = Math.min((Math.abs(m.profit) / maxProfit) * 100, 100);
        const perc = isPos ? '+' : '';

        return `
            <div class="month-row">
                <span class="month-name">${m.name}</span>
                <div class="progress-container">
                    <div class="progress-bar ${isPos ? 'positive' : 'negative'}" style="width:${width}%"></div>
                </div>
                <span class="month-value" style="color:${isPos ? 'var(--success)' : 'var(--danger)'}">${perc}${formatMoney(m.profit)}</span>
            </div>
        `;
    }).join('');
}

// ==================== UTILITIES ====================
function formatMoney(amount) {
    return new Intl.NumberFormat(CONFIG.LOCALE, {
        style: 'currency',
        currency: CONFIG.CURRENCY,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(amount);
}

function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}
