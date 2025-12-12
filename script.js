const { useState, useEffect, useMemo, useRef } = React;

// --- Icons Component ---
const Icon = ({ path, className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        {path}
    </svg>
);

const Icons = {
    Wallet: (props) => <Icon path={<><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" /><path d="M3 5v14a2 2 0 0 0 2 2h16v-5" /><path d="M18 12a2 2 0 0 0 0 4h4v-4Z" /></>} {...props} />,
    TrendingUp: (props) => <Icon path={<polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />} {...props} />,
    TrendingDown: (props) => <Icon path={<polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />} {...props} />,
    Moon: (props) => <Icon path={<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />} {...props} />,
    Sun: (props) => <Icon path={<><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></>} {...props} />,
    Trash: (props) => <Icon path={<><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></>} {...props} />,
    Search: (props) => <Icon path={<><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></>} {...props} />,
    Filter: (props) => <Icon path={<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />} {...props} />,
    Download: (props) => <Icon path={<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />} {...props} />,
    Upload: (props) => <Icon path={<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" />} {...props} />,
    Target: (props) => <Icon path={<><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></>} {...props} />,
    Dollar: (props) => <Icon path={<><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></>} {...props} />,
    Alert: (props) => <Icon path={<><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></>} {...props} />,
    // Category Icons
    Home: (props) => <Icon path={<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />} {...props} />,
    Coffee: (props) => <Icon path={<path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />} {...props} />,
    Car: (props) => <Icon path={<rect x="1" y="3" width="15" height="13" rx="2" ry="2" />} {...props} />,
    Shopping: (props) => <Icon path={<path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />} {...props} />,
    Zap: (props) => <Icon path={<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />} {...props} />,
    More: (props) => <Icon path={<circle cx="12" cy="12" r="1" />} {...props} />,
};

// --- Data & Config ---
const CATEGORIES = {
    expense: [
        { id: 'food', label: 'طعام', icon: Icons.Coffee, color: 'text-orange-500 bg-orange-100 dark:bg-orange-900/30' },
        { id: 'housing', label: 'سكن', icon: Icons.Home, color: 'text-blue-500 bg-blue-100 dark:bg-blue-900/30' },
        { id: 'transport', label: 'نقل', icon: Icons.Car, color: 'text-indigo-500 bg-indigo-100 dark:bg-indigo-900/30' },
        { id: 'shopping', label: 'تسوق', icon: Icons.Shopping, color: 'text-pink-500 bg-pink-100 dark:bg-pink-900/30' },
        { id: 'bills', label: 'فواتير', icon: Icons.Zap, color: 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900/30' },
        { id: 'other', label: 'أخرى', icon: Icons.More, color: 'text-gray-500 bg-gray-100 dark:bg-gray-700/50' },
    ],
    income: [
        { id: 'salary', label: 'راتب', icon: Icons.Wallet, color: 'text-green-500 bg-green-100 dark:bg-green-900/30' },
        { id: 'freelance', label: 'عمل حر', icon: Icons.TrendingUp, color: 'text-teal-500 bg-teal-100 dark:bg-teal-900/30' },
        { id: 'gift', label: 'هدايا', icon: Icons.Wallet, color: 'text-purple-500 bg-purple-100 dark:bg-purple-900/30' },
    ]
};

// --- Components ---

const StatCard = ({ title, amount, icon: IconComponent, type }) => {
    const colors = {
        balance: "from-indigo-600 to-blue-600 text-white shadow-indigo-500/20",
        income: "bg-white dark:bg-dark-card border-l-4 border-green-500 text-gray-800 dark:text-white",
        expense: "bg-white dark:bg-dark-card border-l-4 border-red-500 text-gray-800 dark:text-white"
    };
    const isBalance = type === 'balance';
    return (
        <div className={`rounded-2xl p-5 sm:p-6 shadow-sm relative overflow-hidden transition-all duration-300 ${isBalance ? 'bg-gradient-to-br shadow-lg ' + colors.balance : 'border border-gray-100 dark:border-gray-700 ' + colors[type]}`}>
            <div className="flex justify-between items-start mb-3 sm:mb-4">
                <div>
                    <p className={`text-xs sm:text-sm font-medium mb-1 ${isBalance ? 'text-indigo-100' : 'text-gray-500 dark:text-gray-400'}`}>{title}</p>
                    <h3 className="text-2xl sm:text-3xl font-bold tracking-tight" dir="ltr">
                        {amount.toLocaleString()} <span className="text-xs sm:text-sm opacity-60 font-normal">ج.م</span>
                    </h3>
                </div>
                <div className={`p-2 sm:p-3 rounded-xl ${isBalance ? 'bg-white/20 backdrop-blur-md' : 'bg-gray-50 dark:bg-gray-800'}`}>
                    <IconComponent className={`w-5 h-5 sm:w-6 sm:h-6 ${isBalance ? 'text-white' : type === 'income' ? 'text-green-500' : 'text-red-500'}`} />
                </div>
            </div>
        </div>
    );
};

const ExpenseChart = ({ data }) => {
    if (data.length === 0) return (
        <div className="flex flex-col items-center justify-center h-48 text-gray-400 dark:text-gray-600">
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-full mb-3">
                <Icons.TrendingUp className="w-8 h-8 opacity-50" />
            </div>
            <p className="text-sm">لا توجد مصروفات</p>
        </div>
    );
    const gradientString = data.reduce((acc, item, index) => {
        const prev = index === 0 ? 0 : acc.prev;
        const current = prev + item.percentage;
        acc.str += `${getColor(index)} ${prev}% ${current}%, `;
        acc.prev = current;
        return acc;
    }, {str: '', prev: 0}).str.slice(0, -2);
    function getColor(i) {
        const colors = ['#6366f1', '#ec4899', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6'];
        return colors[i % colors.length];
    }
    return (
        <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative w-32 h-32 shrink-0">
                <div className="w-full h-full rounded-full" style={{ background: `conic-gradient(${gradientString})` }}></div>
                <div className="absolute inset-0 m-auto w-24 h-24 bg-white dark:bg-dark-card rounded-full flex items-center justify-center">
                    <span className="text-xs text-gray-500 font-bold">المصروفات</span>
                </div>
            </div>
            <div className="flex-1 w-full space-y-2">
                {data.slice(0, 4).map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-xs sm:text-sm">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: getColor(idx) }}></span>
                            <span className="text-gray-600 dark:text-gray-300 truncate">{item.label}</span>
                        </div>
                        <span className="font-bold dark:text-gray-200">{item.percentage}%</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

// --- New Feature: Saving Goal Card ---
const GoalCard = ({ goal, onAddFunds, onDelete }) => {
    const progress = Math.min((goal.saved / goal.target) * 100, 100);
    return (
        <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-100 dark:border-gray-700 mb-3 animate-slideUp">
            <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg text-indigo-600">
                        <Icons.Target className="w-4 h-4" />
                    </div>
                    <h4 className="font-bold text-sm dark:text-gray-200">{goal.title}</h4>
                </div>
                <button onClick={() => onDelete(goal.id)} className="text-gray-400 hover:text-red-500"><Icons.Trash className="w-4 h-4" /></button>
            </div>
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                <span dir="ltr">{goal.saved.toLocaleString()} ج.م</span>
                <span dir="ltr">{goal.target.toLocaleString()} ج.م</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 h-2.5 rounded-full overflow-hidden mb-3">
                <div className="bg-indigo-600 h-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
            </div>
            <button 
                onClick={() => {
                    const amount = prompt("أدخل المبلغ المراد إضافته للهدف:");
                    if(amount) onAddFunds(goal.id, parseFloat(amount));
                }}
                className="w-full py-1.5 bg-white dark:bg-dark-card border border-gray-200 dark:border-gray-600 rounded-lg text-xs font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-50"
            >
                + إضافة رصيد
            </button>
        </div>
    );
};

// --- New Feature: Budget Progress ---
const BudgetRow = ({ category, spent, limit, onSetLimit }) => {
    const percentage = limit > 0 ? (spent / limit) * 100 : 0;
    const isDanger = percentage >= 80;
    
    return (
        <div className="mb-3">
            <div className="flex justify-between items-center text-xs mb-1">
                <span className="font-bold dark:text-gray-300 flex items-center gap-1">
                    {category} 
                    {isDanger && limit > 0 && <Icons.Alert className="w-3 h-3 text-red-500 animate-pulse" />}
                </span>
                <div className="flex items-center gap-2">
                    <span className={`dark:text-gray-400 ${isDanger ? 'text-red-500 font-bold' : ''}`}>
                        {spent.toLocaleString()} / {limit > 0 ? limit.toLocaleString() : '---'}
                    </span>
                    <button onClick={onSetLimit} className="text-indigo-500 hover:underline">تعديل</button>
                </div>
            </div>
            <div className="w-full bg-gray-100 dark:bg-gray-700 h-1.5 rounded-full overflow-hidden">
                <div 
                    className={`h-full transition-all duration-500 ${isDanger ? 'bg-red-500' : 'bg-green-500'}`} 
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                ></div>
            </div>
        </div>
    );
};

const TransactionItem = ({ t, onDelete }) => {
    const isIncome = t.type === 'income';
    const catInfo = isIncome 
        ? CATEGORIES.income.find(c => c.label === t.category) 
        : CATEGORIES.expense.find(c => c.label === t.category);
    const IconComp = catInfo ? catInfo.icon : Icons.More;

    return (
        <div className="group flex items-center justify-between p-3 bg-white dark:bg-dark-card border border-gray-100 dark:border-gray-700 rounded-xl hover:shadow-md transition-all animate-slideUp">
            <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className={`w-10 h-10 rounded-xl flex shrink-0 items-center justify-center ${catInfo?.color || 'bg-gray-100 text-gray-500'}`}>
                    <IconComp className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                    <h4 className="font-bold text-sm text-gray-800 dark:text-gray-200 truncate">{t.desc}</h4>
                    <div className="flex gap-2 text-[10px] text-gray-400 mt-1">
                        <span className="bg-gray-100 dark:bg-gray-700 px-1.5 rounded">{t.category}</span>
                        <span>{t.date}</span>
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-2 pl-1">
                <span className={`text-sm font-bold ${isIncome ? 'text-green-500' : 'text-gray-800 dark:text-gray-200'}`} dir="ltr">
                    {isIncome ? '+' : '-'}{t.amount.toLocaleString()}
                </span>
                <button onClick={() => onDelete(t.id)} className="text-gray-400 hover:text-red-500 p-1.5"><Icons.Trash className="w-4 h-4" /></button>
            </div>
        </div>
    );
};

// --- Main App ---
const App = () => {
    // State: Transactions
    const [transactions, setTransactions] = useState(() => {
        const saved = localStorage.getItem('mahfazty_pro_data');
        return saved ? JSON.parse(saved) : [];
    });
    // State: Goals
    const [goals, setGoals] = useState(() => {
        const saved = localStorage.getItem('mahfazty_goals');
        return saved ? JSON.parse(saved) : [];
    });
    // State: Budgets (Limits per category)
    const [budgets, setBudgets] = useState(() => {
        const saved = localStorage.getItem('mahfazty_budgets');
        return saved ? JSON.parse(saved) : {};
    });

    const [darkMode, setDarkMode] = useState(() => localStorage.getItem('mahfazty_theme') === 'dark');
    const [searchTerm, setSearchTerm] = useState('');
    const [newTrans, setNewTrans] = useState({ type: 'expense', amount: '', desc: '', category: '' });
    
    // Currency Converter State
    const [usdRate, setUsdRate] = useState(50.5); // Default manual rate
    const [convertAmount, setConvertAmount] = useState('');

    const fileInputRef = useRef(null);

    // Storage Effects
    useEffect(() => localStorage.setItem('mahfazty_pro_data', JSON.stringify(transactions)), [transactions]);
    useEffect(() => localStorage.setItem('mahfazty_goals', JSON.stringify(goals)), [goals]);
    useEffect(() => localStorage.setItem('mahfazty_budgets', JSON.stringify(budgets)), [budgets]);
    
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('mahfazty_theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('mahfazty_theme', 'light');
        }
    }, [darkMode]);

    // Computed
    const stats = useMemo(() => {
        const income = transactions.filter(t => t.type === 'income').reduce((a, b) => a + b.amount, 0);
        const expense = transactions.filter(t => t.type === 'expense').reduce((a, b) => a + b.amount, 0);
        return { income, expense, balance: income - expense };
    }, [transactions]);

    const expenseByCat = useMemo(() => {
        const expenses = transactions.filter(t => t.type === 'expense');
        const byCat = expenses.reduce((acc, curr) => {
            acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
            return acc;
        }, {});
        return byCat;
    }, [transactions]);

    const expenseChartData = Object.entries(expenseByCat)
        .sort(([,a], [,b]) => b - a)
        .map(([label, amount]) => ({
            label,
            amount,
            percentage: stats.expense ? Math.round((amount / stats.expense) * 100) : 0
        }));

    // Actions
    const addTransaction = () => {
        if (!newTrans.amount || !newTrans.desc) return;
        const category = newTrans.category || (newTrans.type === 'income' ? 'راتب' : 'أخرى');
        const item = {
            id: Date.now(),
            type: newTrans.type,
            amount: parseFloat(newTrans.amount),
            desc: newTrans.desc,
            category,
            date: new Date().toISOString().split('T')[0]
        };
        setTransactions([item, ...transactions]);
        setNewTrans({ type: newTrans.type, amount: '', desc: '', category: '' });
    };

    const addGoal = () => {
        const title = prompt("اسم الهدف (مثلاً: لابتوب جديد):");
        if (!title) return;
        const target = parseFloat(prompt("المبلغ المطلوب تحويشه:"));
        if (!target) return;
        setGoals([...goals, { id: Date.now(), title, target, saved: 0 }]);
    };

    const updateGoalFunds = (id, amount) => {
        setGoals(goals.map(g => g.id === id ? { ...g, saved: g.saved + amount } : g));
    };

    const setBudgetLimit = (category) => {
        const limit = prompt(`ضع حداً أقصى لمصروفات (${category}):`, budgets[category] || 0);
        if (limit !== null) {
            setBudgets({ ...budgets, [category]: parseFloat(limit) });
        }
    };

    // --- Export / Import Logic (JSON Backup) ---
    const backupData = () => {
        const data = { transactions, goals, budgets, date: new Date().toISOString() };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `mahfazty_full_backup_${new Date().toISOString().slice(0,10)}.json`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const restoreData = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const data = JSON.parse(event.target.result);
                if(data.transactions) setTransactions(data.transactions);
                if(data.goals) setGoals(data.goals);
                if(data.budgets) setBudgets(data.budgets);
                alert("تم استرجاع البيانات بنجاح! ✅");
            } catch (err) {
                alert("ملف غير صالح ❌");
            }
        };
        reader.readAsText(file);
    };

    return (
        <div className="min-h-screen pb-12 transition-colors duration-300">
            {/* Header */}
            <nav className="fixed w-full z-20 top-0 left-0 bg-white/90 dark:bg-dark-card/90 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 transition-colors duration-300">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="bg-indigo-600 p-1.5 sm:p-2 rounded-lg"><Icons.Wallet className="w-5 h-5 text-white" /></div>
                        <h1 className="text-lg sm:text-xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">محفظتي برو</h1>
                    </div>
                    <div className="flex items-center gap-2">
                        <button onClick={backupData} title="نسخ احتياطي" className="p-2 text-indigo-600 dark:text-indigo-300 hover:bg-indigo-50 rounded-full"><Icons.Download className="w-5 h-5" /></button>
                        <button onClick={() => fileInputRef.current.click()} title="استرجاع بيانات" className="p-2 text-indigo-600 dark:text-indigo-300 hover:bg-indigo-50 rounded-full"><Icons.Upload className="w-5 h-5" /></button>
                        <input type="file" ref={fileInputRef} onChange={restoreData} className="hidden" accept=".json" />
                        <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-yellow-400">
                            {darkMode ? <Icons.Sun className="w-5 h-5" /> : <Icons.Moon className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
            </nav>

            <main className="pt-24 px-4 sm:px-6 max-w-6xl mx-auto space-y-6">
                
                {/* Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <StatCard title="الرصيد الحالي" amount={stats.balance} icon={Icons.Wallet} type="balance" />
                    <div className="grid grid-cols-2 gap-3 md:col-span-2">
                        <StatCard title="الدخل" amount={stats.income} icon={Icons.TrendingUp} type="income" />
                        <StatCard title="المصروفات" amount={stats.expense} icon={Icons.TrendingDown} type="expense" />
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                    {/* Left Column: Tools & Forms */}
                    <div className="lg:col-span-1 space-y-6">
                        
                        {/* Currency Converter */}
                        <div className="bg-white dark:bg-dark-card p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                            <h3 className="font-bold text-sm mb-3 dark:text-white flex items-center gap-2"><Icons.Dollar className="w-4 h-4" /> محول العملات السريع</h3>
                            <div className="flex gap-2 mb-2">
                                <input type="number" value={convertAmount} onChange={e => setConvertAmount(e.target.value)} placeholder="المبلغ ($)" className="w-1/2 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg text-sm dark:text-white" />
                                <input type="number" value={usdRate} onChange={e => setUsdRate(e.target.value)} placeholder="سعر الدولار" className="w-1/2 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg text-sm dark:text-white" />
                            </div>
                            <div className="text-center bg-indigo-50 dark:bg-indigo-900/20 p-2 rounded-lg text-indigo-600 dark:text-indigo-300 font-bold">
                                {convertAmount ? (convertAmount * usdRate).toLocaleString() : '0'} ج.م
                            </div>
                        </div>

                        {/* Add Transaction Form */}
                        <div className="bg-white dark:bg-dark-card p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                            <h3 className="font-bold text-lg mb-4 dark:text-white">عملية جديدة</h3>
                            <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-xl mb-4">
                                <button onClick={() => setNewTrans({...newTrans, type: 'expense'})} className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${newTrans.type === 'expense' ? 'bg-white dark:bg-dark-bg shadow text-red-500' : 'text-gray-500'}`}>مصروف</button>
                                <button onClick={() => setNewTrans({...newTrans, type: 'income'})} className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${newTrans.type === 'income' ? 'bg-white dark:bg-dark-bg shadow text-green-500' : 'text-gray-500'}`}>دخل</button>
                            </div>
                            <div className="space-y-3">
                                <input type="number" placeholder="المبلغ" value={newTrans.amount} onChange={e => setNewTrans({...newTrans, amount: e.target.value})} className="w-full bg-gray-50 dark:bg-gray-800 rounded-xl px-4 py-3 font-bold dark:text-white" />
                                <input type="text" placeholder="الوصف" value={newTrans.desc} onChange={e => setNewTrans({...newTrans, desc: e.target.value})} className="w-full bg-gray-50 dark:bg-gray-800 rounded-xl px-4 py-3 dark:text-white" />
                                <div className="grid grid-cols-3 gap-2">
                                    {CATEGORIES[newTrans.type].map(cat => (
                                        <button key={cat.id} onClick={() => setNewTrans({...newTrans, category: cat.label})} className={`p-2 rounded-xl border flex flex-col items-center gap-1 ${newTrans.category === cat.label ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600' : 'border-transparent bg-gray-50 dark:bg-gray-800 text-gray-500'}`}>
                                            <cat.icon className="w-4 h-4" /><span className="text-[10px]">{cat.label}</span>
                                        </button>
                                    ))}
                                </div>
                                <button onClick={addTransaction} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-indigo-500/30">حفظ العملية</button>
                            </div>
                        </div>
                    </div>

                    {/* Middle Column: Goals & Budget */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Saving Goals */}
                        <div className="bg-white dark:bg-dark-card p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-bold text-lg dark:text-white">أهداف الادخار</h3>
                                <button onClick={addGoal} className="text-sm bg-indigo-100 text-indigo-600 px-3 py-1 rounded-lg hover:bg-indigo-200 font-bold">+</button>
                            </div>
                            {goals.length === 0 ? <p className="text-gray-400 text-sm text-center py-4">لا توجد أهداف حالياً</p> : goals.map(g => (
                                <GoalCard key={g.id} goal={g} onAddFunds={updateGoalFunds} onDelete={(id) => setGoals(goals.filter(x => x.id !== id))} />
                            ))}
                        </div>

                        {/* Budgeting */}
                        <div className="bg-white dark:bg-dark-card p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                            <h3 className="font-bold text-lg mb-4 dark:text-white">مراقبة الميزانية</h3>
                            {CATEGORIES.expense.map(cat => (
                                <BudgetRow 
                                    key={cat.id} 
                                    category={cat.label} 
                                    spent={expenseByCat[cat.label] || 0} 
                                    limit={budgets[cat.label] || 0}
                                    onSetLimit={() => setBudgetLimit(cat.label)}
                                />
                            ))}
                        </div>
                         {/* Analytics Chart */}
                         <div className="bg-white dark:bg-dark-card p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                            <h3 className="font-bold text-lg mb-4 dark:text-white">تحليل المصروفات</h3>
                            <ExpenseChart data={expenseChartData} />
                        </div>
                    </div>

                    {/* Right Column: Transactions List */}
                    <div className="lg:col-span-1">
                        <div className="bg-white dark:bg-dark-card p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 min-h-[500px]">
                            <h3 className="font-bold text-lg mb-4 dark:text-white">سجل المعاملات</h3>
                            <div className="relative mb-4">
                                <Icons.Search className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" />
                                <input type="text" placeholder="بحث..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full bg-gray-50 dark:bg-gray-800 rounded-full py-2 pr-10 pl-4 text-sm outline-none dark:text-white" />
                            </div>
                            <div className="space-y-1">
                                {transactions.filter(t => t.desc.toLowerCase().includes(searchTerm.toLowerCase()) || t.category.includes(searchTerm)).map(t => (
                                    <TransactionItem key={t.id} t={t} onDelete={(id) => setTransactions(transactions.filter(x => x.id !== id))} />
                                ))}
                                {transactions.length === 0 && <div className="text-center py-10 opacity-50"><Icons.Filter className="w-10 h-10 mx-auto mb-2" /><p>لا توجد بيانات</p></div>}
                            </div>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);