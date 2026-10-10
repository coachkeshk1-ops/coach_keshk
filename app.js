/**
 * Coach Keshk Personal Training & Fitness Application Logic
 * Modern, Isolated Client Portal & Hidden Admin Dashboard (Alt + X)
 */

// Initial Seed Data
const DEFAULT_TRAINEES = [
  {
    id: "KESH-101",
    name: "عمر السيد (Omar El-Sayed)",
    email: "omar@example.com",
    phone: "+20 100 123 4567",
    age: 27,
    weight: 84,
    targetWeight: 76,
    height: 180,
    goal: "تنشيف وبناء عضلات صافية (Recomposition)",
    joinDate: "2026-07-15",
    calories: 2350,
    macros: { protein: 185, carbs: 220, fats: 65 },
    meals: [
      {
        title: "وجبة الإفطار (Breakfast)",
        description: "4 بيضات مسلوقة + 100g شوفان بالحليب القليل الدسم + 15g مكسرات مشكلة + ثمرة موز",
        calories: 620,
        image: "assets/images/meal.png"
      },
      {
        title: "وجبة الغداء (Lunch)",
        description: "200g صدر دجاج مشوي + 200g أرز أبيض مسلوق + سلطة خضراء مع زيت زيتون (5ml)",
        calories: 780,
        image: "assets/images/meal.png"
      },
      {
        title: "وجبة قبل التمرين (Pre-Workout)",
        description: "1 ثمرة تفاح + 30g بروتين ويه (Whey) + 10g زبدة فول سوداني",
        calories: 350,
        image: "assets/images/meal.png"
      },
      {
        title: "وجبة العشاء (Dinner)",
        description: "150g علبة تونة مصفاة + 150g بطاطا حلوة مشوية + سلطة خضار",
        calories: 600,
        image: "assets/images/meal.png"
      }
    ],
    workouts: [
      { day: "الأحد (Sun)", title: "Push (صدر + أكتاف أمامية + تراي)", details: "Bench Press 4x8, Incline Dumbbell 3x10, Military Press 4x8, Tricep Dips 3x12" },
      { day: "الإثنين (Mon)", title: "Pull (ظهر + أكتاف خلفية + بايسپس)", details: "Deadlift 4x6, Lat Pulldown 4x10, Barbell Row 3x10, Bicep Curls 4x12" },
      { day: "الثلاثاء (Tue)", title: "Legs & Abs (أرجل + بطن)", details: "Barbell Squats 4x8, Romanian Deadlift 3x10, Leg Extension 4x12, Planks 4x60s" },
      { day: "الأربعاء (Wed)", title: "راحة نشطة (Active Recovery)", details: "مشي 45 دقيقة + إطالات شاملة" },
      { day: "الخميس (Thu)", title: "Upper Body Heavy (عاري علوي مكثف)", details: "Overhead Press 4x6, Pull-ups 4xMax, Dumbbell Chest Fly 3x12" },
      { day: "الجمعة (Fri)", title: "راحة تامة (Rest Day)", details: "استشفاء وتغذية متوازنة" }
    ],
    progress: [
      { date: "2026-07-15", weight: 87.0, note: "البداية مع الكابتن" },
      { date: "2026-07-22", weight: 86.2, note: "التزام ممتاز بالماكروز" },
      { date: "2026-07-29", weight: 85.1, note: "زيادة أوزان في التمرين" },
      { date: "2026-08-05", weight: 84.0, note: "تحسن واصل في التنشيف" }
    ],
    coachNotes: "أداء ممتاز يا عمر! استمر على نفس الماكروز هذا الأسبوع وواظب على 4 لتر ماء يومياً."
  },
  {
    id: "KESH-102",
    name: "سارة أحمد (Sara Ahmed)",
    email: "sara@example.com",
    phone: "+20 111 987 6543",
    age: 24,
    weight: 62,
    targetWeight: 57,
    height: 165,
    goal: "شد الجسم وزيادة اللياقة (Body Toning)",
    joinDate: "2026-08-01",
    calories: 1750,
    macros: { protein: 130, carbs: 165, fats: 50 },
    meals: [
      {
        title: "وجبة الإفطار (Breakfast)",
        description: "3 بيضات أومليت بالخضار + 50g خبز شوفان + كوبة شاي أخضر",
        calories: 420,
        image: "assets/images/meal.png"
      },
      {
        title: "وجبة الغداء (Lunch)",
        description: "180g سلمون مشوي أو سمك دنيس + 150g كينوا + خضار سوتيه",
        calories: 580,
        image: "assets/images/meal.png"
      },
      {
        title: "وجبة العشاء (Dinner)",
        description: "200g زبادي يوناني + 15g لوز نيئ + ملعقة عسل نحل صغيرة",
        calories: 320,
        image: "assets/images/meal.png"
      }
    ],
    workouts: [
      { day: "Full Body A", title: "تمرين جسم كامل أ", details: "Squats 3x12, Push-ups 3x10, Dumbbell Row 3x12, Plank 3x45s" },
      { day: "Full Body B", title: "تمرين جسم كامل ب", details: "Lunges 3x12, Shoulder Press 3x12, Lat Pulldown 3x12, Glute Bridges 3x15" }
    ],
    progress: [
      { date: "2026-08-01", weight: 63.5, note: "بداية البرنامج" },
      { date: "2026-08-07", weight: 62.0, note: "انخفاض المقاسات وطاقة عالية" }
    ],
    coachNotes: "التزام رائع يا سارة! ركزي على شرب الماء والنوم الجيد 8 ساعات."
  }
];

const DEFAULT_PENDING_CLIENTS = [
  {
    id: "PEND-901",
    name: "محمود حسن (Mahmoud Hassan)",
    phone: "+20 122 333 4444",
    email: "mahmoud@gmail.com",
    age: 29,
    weight: 95,
    height: 178,
    goal: "خسارة وزن حادة وتضخيم عضلات",
    activity: "متوسط النشاط (3 أيام تمرين/أسبوع)",
    requestDate: "2026-08-06"
  },
  {
    id: "PEND-902",
    name: "يوسف علي (Youssef Ali)",
    phone: "+20 101 555 7777",
    email: "youssef@hotmail.com",
    age: 22,
    weight: 68,
    height: 185,
    goal: "زيادة الوزن والكتلة العضلية (Clean Bulk)",
    activity: "نشيط جداً",
    requestDate: "2026-08-07"
  }
];

// App State
let state = {
  lang: localStorage.getItem('coach_keshk_lang') || 'ar',
  trainees: JSON.parse(localStorage.getItem('coach_keshk_trainees')) || DEFAULT_TRAINEES,
  pendingClients: JSON.parse(localStorage.getItem('coach_keshk_pending')) || DEFAULT_PENDING_CLIENTS,
  adminPassword: localStorage.getItem('coach_keshk_admin_pass') || 'm01226075283',
  excelApiUrl: localStorage.getItem('coach_keshk_excel_api') || '',
  isAdminLoggedIn: false,
  currentTrainee: null,
  activeAdminTab: 'pending' // 'pending' | 'customizer' | 'excel'
};

// Save state to localStorage
function saveState() {
  localStorage.setItem('coach_keshk_trainees', JSON.stringify(state.trainees));
  localStorage.setItem('coach_keshk_pending', JSON.stringify(state.pendingClients));
  localStorage.setItem('coach_keshk_admin_pass', state.adminPassword);
  localStorage.setItem('coach_keshk_excel_api', state.excelApiUrl);
  localStorage.setItem('coach_keshk_lang', state.lang);
}

// Translations Dictionary
const I18N = {
  ar: {
    navBrand: "Coach Keshk",
    navSub: "مدرب كمال أجسام ولياقة بدنية",
    navAbout: "عن المدرب",
    navServices: "الخدمات",
    navJoin: "انضم للتدريب",
    navLogin: "دخول المتدربين",
    heroBadge: "برامج تدريبية وتغذية مخصصة 100%",
    heroTitle: "غير جسمك وحياتك مع Coach Keshk",
    heroDesc: "احصل على خطة تدريبية وتغذية علمية مصممة خصيصاً لهدفك وجيناتك. متابعة يومية وتحليل دقيق للتقدم لضمان أفضل النتائج بأسرع وقت.",
    heroCtaJoin: "ابدأ رحلتك الآن",
    heroCtaLogin: "بوابة المتدربين (Login)",
    statClients: "+500 متدرب",
    statClientsSub: "تم تحقيق أهدافهم",
    statSuccess: "99.2%",
    statSuccessSub: "نسبة نجاح التحول",
    statExp: "+8 سنوات",
    statExpSub: "خبرة في التدريب الاحترافي",
    
    aboutTitle: "من هو Coach Keshk؟",
    aboutSubtitle: "خبرة تدريبية وعلمية لبناء القوة والفيزيك المثالي",
    aboutText1: "مرحباً بكم! أنا Coach Keshk، مدرب شخصي معتمد ومستشار تغذية رياضية. على مدار أكثر من 8 سنوات، قمت بمساعدة المئات من المتدربين في مصر والوطن العربي على إعادة تشكيل أجسامهم (Body Recomposition)، سواء لخسارة الدهون الصعبة أو بناء كتلة عضلية صافية.",
    aboutText2: "نظامي التدريبي يعتمد 100% على أسس علمية مثبتة، بدون حرمان أو جشع، مع تصميم كل وجبة وتمرين ليتناسب مع نمط حياتك وظروف عملك.",
    feat1Title: "أنظمة تغذية مخصصة",
    feat1Desc: "حساب دقيق للماكروز والسعرات مع وجبات بالصور تناسب ذوقك وتوفر احتياجك العضلي.",
    feat2Title: "جدول تمارين احترافي",
    feat2Desc: "برامج تدريبية مقسمة بعناية (Push/Pull/Legs أو Upper/Lower) مع شرح بالفيديو.",
    feat3Title: "متابعة وتقييم أسبوعي",
    feat3Desc: "تحليل تغيرات الوزن والمقاسات والأوزان المرفوعة مع تعديل مستمر للخطة.",

    servicesTitle: "خدمات التدريب الشخصي",
    servicesSub: "اختر النظام الأنسب لك للوصول لهدفك بأسرع وقت",
    srv1Title: "التدريب الأونلاين الشامل",
    srv1Desc: "متابعة يومية عبر الواتساب + خطة تغذية وتدريب مخصصة + مراجعة تكنيك التمارين.",
    srv2Title: "إعادة تشكيل الجسم (Recomp)",
    srv2Desc: "نظام مكثف لبناء العضلات وخسارة الدهون في نفس الوقت باستراتيجيات علمية.",
    srv3Title: "تجهيز البطولات والفيزيك",
    srv3Desc: "برنامج احترافي متقدم للمتسابقين يشمل تجفيف وتجهيز وتصوير التغيرات.",

    joinTitle: "قدم طلب انضمامك الآن",
    joinSub: "سيقوم Coach Keshk بمراجعة بياناتك والتواصل معك لإعداد حسابك المخصص",
    nameLabel: "الاسم بالكامل",
    phoneLabel: "رقم الهاتف / الواتساب",
    emailLabel: "البريد الإلكتروني",
    ageLabel: "العمر",
    weightLabel: "الوزن الحالي (كجم)",
    heightLabel: "الطول (سم)",
    goalLabel: "الهدف الرئيسي",
    goalOpt1: "تنشيف وخسارة دهون (Fat Loss)",
    goalOpt2: "تضخيم وبناء عضلات (Muscle Gain)",
    goalOpt3: "إعادة تشكيل الجسم (Body Recomp)",
    goalOpt4: "لياقة عامة وشد الجسم (Toning)",
    activityLabel: "مستوى النشاط اليومي",
    activityOpt1: "قليل النشاط (عمل مكتبي)",
    activityOpt2: "متوسط (تمرين 3 أيام أسبوعياً)",
    activityOpt3: "نشيط جداً (تمرين 5-6 أيام أسبوعياً)",
    btnSubmitJoin: "إرسال طلب الانضمام",
    joinSuccessMsg: "تم إرسال طلبك بنجاح! سيقوم Coach Keshk بمراجعته وإرسال كود الدخول الخاص بك قريباً.",

    loginModalTitle: "تسجيل دخول المتدرب",
    loginModalSub: "أدخل كود المتدرب الخاص بك (Unique ID) للوصول إلى خطتك المخصصة",
    traineeIdPlaceholder: "مثال: KESH-101",
    btnLoginSubmit: "دخول الحساب",
    loginError: "كود المتدرب غير صحيح أو غير مفعل. تواصل مع المدرب لتفعيله.",

    traineePortalTitle: "لوحة المتدرب المخصصة",
    welcomeUser: "أهلاً بك، ",
    logoutBtn: "تسجيل الخروج",
    targetMacrosTitle: "الأهداف الغذائية اليومية (Macros)",
    totalCalories: "السعرات اليومية",
    proteinGrams: "بروتين (Protein)",
    carbsGrams: "كاربوهيدرات (Carbs)",
    fatsGrams: "دهون صحية (Fats)",
    mealsTitle: "جدول الوجبات اليومي المخصص",
    workoutTitle: "برنامج التمارين الأسبوعي",
    progressTitle: "سجل التقدم والوزن الأسبوعي",
    coachNotesTitle: "توجيهات وملاحظات Coach Keshk",
    addProgressBtn: "تسجيل وزن جديد",

    adminPromptTitle: "منطقة المدرب السرية (Coach Only)",
    adminPassPlaceholder: "أدخل كلمة المرور السرية",
    btnAdminLogin: "تأكيد الدخول",
    adminPassError: "كلمة المرور غير صحيحة!",
    adminTitle: "لوحة التحكم السرية - Coach Keshk",
    tabPending: "الطلبات المعلقة (Pending)",
    tabCustomizer: "تعديل خطط المتدربين (Plan Editor)",
    tabSheets: "ربط Google Sheets / Excel",
    acceptBtn: "قبول وتفعيل (Accept)",
    rejectBtn: "رفض (Reject)",
    activeTrainees: "المتدربون النشطون",
    savePlanBtn: "حفظ التعديلات للخطة",
    planSavedMsg: "تم حفظ الخطة بنجاح وتحديث حساب المتدرب!"
  },
  en: {
    navBrand: "Coach Keshk",
    navSub: "Personal Trainer & Fitness Coach",
    navAbout: "About Me",
    navServices: "Services",
    navJoin: "Join Me",
    navLogin: "Trainee Portal",
    heroBadge: "100% Customized Training & Nutrition",
    heroTitle: "Transform Your Physique with Coach Keshk",
    heroDesc: "Get a custom science-backed workout and nutrition plan engineered for your goals and genetics. Daily check-ins and progress tracking for optimal results.",
    heroCtaJoin: "Start Your Journey",
    heroCtaLogin: "Trainee Login",
    statClients: "+500 Clients",
    statClientsSub: "Goals Reached",
    statSuccess: "99.2%",
    statSuccessSub: "Success Rate",
    statExp: "+8 Years",
    statExpSub: "Pro Coaching Experience",

    aboutTitle: "About Coach Keshk",
    aboutSubtitle: "Science-backed coaching for strength and aesthetic physique",
    aboutText1: "Welcome! I am Coach Keshk, a certified personal trainer and sports nutritionist. For over 8 years, I have helped hundreds of trainees across the globe reshape their bodies through targeted recomposition, sustainable fat loss, and lean muscle building.",
    aboutText2: "My approach is 100% evidence-based, eliminating extreme starvation diets and focusing on sustainable nutrition and effective progressive overload.",
    feat1Title: "Custom Nutrition Plans",
    feat1Desc: "Calculated macros and caloric targets with visual meal guides tailored to your lifestyle.",
    feat2Title: "Professional Workout Split",
    feat2Desc: "Structured training programs (Push/Pull/Legs, Upper/Lower) with exercise guidance.",
    feat3Title: "Weekly Progress Review",
    feat3Desc: "Consistent monitoring of body weight, measurements, and lifts to optimize results.",

    servicesTitle: "Personal Coaching Services",
    servicesSub: "Choose the ideal program to reach your peak performance",
    srv1Title: "1-on-1 Online Coaching",
    srv1Desc: "Daily WhatsApp support, custom nutrition & workout plan, and video form analysis.",
    srv2Title: "Body Recomposition",
    srv2Desc: "Simultaneous fat loss and muscle building backed by scientific protocols.",
    srv3Title: "Physique & Contest Prep",
    srv3Desc: "Advanced contest preparation including peak week strategy and conditioning.",

    joinTitle: "Apply to Join Coach Keshk",
    joinSub: "Fill out the form below for Coach Keshk to review and set up your private trainee account",
    nameLabel: "Full Name",
    phoneLabel: "Phone / WhatsApp",
    emailLabel: "Email Address",
    ageLabel: "Age",
    weightLabel: "Current Weight (kg)",
    heightLabel: "Height (cm)",
    goalLabel: "Primary Goal",
    goalOpt1: "Fat Loss & Shredding",
    goalOpt2: "Lean Muscle Building",
    goalOpt3: "Body Recomposition",
    goalOpt4: "General Fitness & Toning",
    activityLabel: "Daily Activity Level",
    activityOpt1: "Sedentary (Desk job)",
    activityOpt2: "Moderate (3 workout days/week)",
    activityOpt3: "Very Active (5-6 workout days/week)",
    btnSubmitJoin: "Submit Application",
    joinSuccessMsg: "Application submitted successfully! Coach Keshk will review and send your Trainee Access ID soon.",

    loginModalTitle: "Trainee Portal Login",
    loginModalSub: "Enter your assigned Trainee ID to access your private plan",
    traineeIdPlaceholder: "e.g., KESH-101",
    btnLoginSubmit: "Access My Profile",
    loginError: "Invalid Trainee ID. Please contact Coach Keshk to activate your account.",

    traineePortalTitle: "Trainee Dashboard",
    welcomeUser: "Welcome back, ",
    logoutBtn: "Log Out",
    targetMacrosTitle: "Daily Target Macros",
    totalCalories: "Total Calories",
    proteinGrams: "Protein (g)",
    carbsGrams: "Carbohydrates (g)",
    fatsGrams: "Healthy Fats (g)",
    mealsTitle: "Your Customized Meal Plan",
    workoutTitle: "Weekly Workout Program",
    progressTitle: "Progress & Weight Log",
    coachNotesTitle: "Coach Keshk's Direct Notes",
    addProgressBtn: "Log New Weight",

    adminPromptTitle: "Coach Administration (Locked)",
    adminPassPlaceholder: "Enter Secret Password",
    btnAdminLogin: "Verify & Enter",
    adminPassError: "Incorrect Password!",
    adminTitle: "Admin Control Center - Coach Keshk",
    tabPending: "Pending Applications",
    tabCustomizer: "Client Plan Editor",
    tabSheets: "Google Sheets / Excel Sync",
    acceptBtn: "Accept & Activate",
    rejectBtn: "Reject Application",
    activeTrainees: "Active Trainees",
    savePlanBtn: "Save Plan Changes",
    planSavedMsg: "Client plan updated and saved successfully!"
  }
};

// Initialize Application
document.addEventListener('DOMContentLoaded', async () => {
  initLanguage();
  initShortcutListener();
  await autoLoadLocalExcelFile();
  checkUrlParams();
  renderApp();
});

// Auto-Load Excel File (trainees.xlsx or trainees.csv) from Server Root
async function autoLoadLocalExcelFile() {
  try {
    let response = await fetch('trainees.xlsx?t=' + Date.now());
    if (!response.ok) {
      response = await fetch('trainees.csv?t=' + Date.now());
    }

    if (response.ok) {
      const arrayBuffer = await response.arrayBuffer();
      const workbook = XLSX.read(new Uint8Array(arrayBuffer), { type: 'array' });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const jsonRows = XLSX.utils.sheet_to_json(worksheet);

      const importedTrainees = [];
      jsonRows.forEach(row => {
        const parsed = parseExcelRowToTrainee(row);
        if (parsed) importedTrainees.push(parsed);
      });

      if (importedTrainees.length > 0) {
        state.trainees = importedTrainees;
        saveState();
        console.log(`Successfully auto-loaded ${importedTrainees.length} trainees from Excel file.`);
      }
    }
  } catch (e) {
    console.log("Local trainees.xlsx check completed.");
  }
}

// Setup Alt + X listener for Admin Dashboard trigger
function initShortcutListener() {
  document.addEventListener('keydown', (e) => {
    // Alt + X or Alt + Shift + X
    if (e.altKey && (e.key === 'x' || e.key === 'X' || e.code === 'KeyX')) {
      e.preventDefault();
      openAdminAuthModal();
    }
  });

  // Mobile fallback hidden trigger (Triple tap on footer copyright or footer secret icon)
  const secretTrigger = document.getElementById('secret-admin-trigger');
  if (secretTrigger) {
    secretTrigger.addEventListener('click', (e) => {
      e.preventDefault();
      openAdminAuthModal();
    });
  }
}

// Mobile Hamburger Menu
function toggleMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  const btn = document.getElementById('hamburger-btn');
  const l1 = document.getElementById('hb-line1');
  const l2 = document.getElementById('hb-line2');
  const l3 = document.getElementById('hb-line3');

  const isOpen = menu.classList.contains('open');
  if (isOpen) {
    menu.classList.remove('open');
    btn.classList.remove('bg-slate-700');
    l1.style.transform = '';
    l2.style.opacity = '1';
    l3.style.transform = '';
    l3.style.width = '1rem';
  } else {
    menu.classList.add('open');
    btn.classList.add('bg-slate-700');
    // Animate to X
    l1.style.transform = 'translateY(6px) rotate(45deg)';
    l2.style.opacity = '0';
    l3.style.transform = 'translateY(-6px) rotate(-45deg)';
    l3.style.width = '1.25rem';
  }
}

function closeMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  if (menu && menu.classList.contains('open')) {
    toggleMobileMenu();
  }
}


// Check URL parameter e.g. ?client=KESH-101 or ?client=omar
function checkUrlParams() {
  const urlParams = new URLSearchParams(window.location.search);
  const clientQuery = urlParams.get('client');
  
  if (clientQuery) {
    const found = state.trainees.find(t => 
      t.id.toLowerCase() === clientQuery.toLowerCase() || 
      t.name.toLowerCase().includes(clientQuery.toLowerCase())
    );
    
    if (found) {
      state.currentTrainee = found;
    }
  }
}

// Toggle Language
function toggleLanguage() {
  state.lang = state.lang === 'ar' ? 'en' : 'ar';
  saveState();
  initLanguage();
  renderApp();
}

function initLanguage() {
  const html = document.documentElement;
  html.setAttribute('lang', state.lang);
  html.setAttribute('dir', state.lang === 'ar' ? 'rtl' : 'ltr');

  const langBtnText = document.getElementById('lang-btn-text');
  if (langBtnText) {
    langBtnText.textContent = state.lang === 'ar' ? 'English' : 'عربي';
  }
}

function t(key) {
  return I18N[state.lang][key] || key;
}

// Render dynamic text throughout DOM elements with data-i18n attributes
function renderI18nTexts() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (I18N[state.lang][key]) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = I18N[state.lang][key];
      } else {
        el.textContent = I18N[state.lang][key];
      }
    }
  });
}

// Main Render Dispatcher
function renderApp() {
  renderI18nTexts();

  // Trainee View Display Check
  const traineeView = document.getElementById('trainee-portal-view');
  const mainPublicView = document.getElementById('main-public-view');
  const adminView = document.getElementById('admin-dashboard-view');

  if (state.isAdminLoggedIn) {
    mainPublicView.classList.add('hidden');
    traineeView.classList.add('hidden');
    adminView.classList.remove('hidden');
    renderAdminDashboard();
  } else if (state.currentTrainee) {
    mainPublicView.classList.add('hidden');
    adminView.classList.add('hidden');
    traineeView.classList.remove('hidden');
    renderTraineePortal();
  } else {
    mainPublicView.classList.remove('hidden');
    traineeView.classList.add('hidden');
    adminView.classList.add('hidden');
  }
}

// Trainee Portal Login Handler (Supports live Excel / Google Sheets API sync)
async function handleTraineeLogin(e) {
  e.preventDefault();
  const inputId = document.getElementById('trainee-id-input').value.trim();
  const errorEl = document.getElementById('login-error-msg');
  
  if (!inputId) return;

  let trainee = null;

  // 1. If Google Sheets / Excel Web API URL is configured, fetch live updates from spreadsheet
  if (state.excelApiUrl) {
    try {
      const fetchUrl = `${state.excelApiUrl}?id=${encodeURIComponent(inputId)}`;
      const resp = await fetch(fetchUrl);
      if (resp.ok) {
        const remoteRows = await resp.json();
        if (Array.isArray(remoteRows) && remoteRows.length > 0) {
          const row = remoteRows[0];
          trainee = parseExcelRowToTrainee(row);
        }
      }
    } catch (err) {
      console.warn("Excel API fetch warning, falling back to local database:", err);
    }
  }

  // 2. Local database lookup fallback
  if (!trainee) {
    trainee = state.trainees.find(t => 
      t.id.toLowerCase() === inputId.toLowerCase() ||
      t.email.toLowerCase() === inputId.toLowerCase() ||
      t.name.toLowerCase().includes(inputId.toLowerCase())
    );
  }

  // 3. Isolated session setup (Strict privacy: ONLY this trainee's data is loaded)
  if (trainee) {
    state.currentTrainee = trainee;
    closeModal('trainee-login-modal');
    errorEl.classList.add('hidden');
    
    // Update URL parameter without full reload
    const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?client=' + trainee.id;
    window.history.pushState({path: newUrl}, '', newUrl);

    renderApp();
  } else {
    errorEl.classList.remove('hidden');
  }
}

function logoutTrainee() {
  state.currentTrainee = null;
  const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
  window.history.pushState({path: newUrl}, '', newUrl);
  renderApp();
}

// Render Trainee Isolated Portal
function renderTraineePortal() {
  const tData = state.currentTrainee;
  if (!tData) return;

  document.getElementById('trainee-name-heading').textContent = tData.name;
  document.getElementById('trainee-id-badge').textContent = `ID: ${tData.id}`;
  document.getElementById('trainee-goal-badge').textContent = tData.goal;

  // Render Macros
  document.getElementById('trainee-calories').textContent = tData.calories;
  document.getElementById('trainee-protein').textContent = `${tData.macros.protein}g`;
  document.getElementById('trainee-carbs').textContent = `${tData.macros.carbs}g`;
  document.getElementById('trainee-fats').textContent = `${tData.macros.fats}g`;

  // Macro progress bars calculation
  const pCal = tData.macros.protein * 4;
  const cCal = tData.macros.carbs * 4;
  const fCal = tData.macros.fats * 9;
  const totalMacroCal = pCal + cCal + fCal || 1;

  document.getElementById('bar-protein').style.width = `${Math.round((pCal / totalMacroCal) * 100)}%`;
  document.getElementById('bar-carbs').style.width = `${Math.round((cCal / totalMacroCal) * 100)}%`;
  document.getElementById('bar-fats').style.width = `${Math.round((fCal / totalMacroCal) * 100)}%`;

  // Render Meals
  const mealsContainer = document.getElementById('trainee-meals-grid');
  mealsContainer.innerHTML = tData.meals.map((meal, index) => `
    <div class="glass-card overflow-hidden">
      <img src="${meal.image || 'assets/images/meal.png'}" alt="${meal.title}" class="w-full h-48 object-cover">
      <div class="p-5">
        <div class="flex justify-between items-center mb-2">
          <h4 class="font-bold text-lg text-emerald-400">${meal.title}</h4>
          <span class="badge-gold text-xs px-2.5 py-1 rounded-full font-semibold">${meal.calories} kcal</span>
        </div>
        <p class="text-slate-300 text-sm leading-relaxed">${meal.description}</p>
      </div>
    </div>
  `).join('');

  // Render Workouts
  const workoutContainer = document.getElementById('trainee-workout-list');
  workoutContainer.innerHTML = tData.workouts.map(w => `
    <div class="glass-card p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm shrink-0">
          <i class="fas fa-dumbbell"></i>
        </div>
        <div>
          <span class="text-xs text-amber-400 font-semibold uppercase tracking-wider">${w.day}</span>
          <h5 class="font-bold text-white text-base">${w.title}</h5>
        </div>
      </div>
      <div class="text-slate-300 text-sm bg-slate-900/60 p-3 rounded-lg border border-slate-800 md:max-w-md">
        ${w.details}
      </div>
    </div>
  `).join('');

  // Render Coach Notes
  document.getElementById('trainee-coach-notes').textContent = tData.coachNotes || "لا توجد ملاحظات جديدة اليوم. واصل الالتزام بالخطة!";

  // Render Progress
  const progressContainer = document.getElementById('trainee-progress-table');
  progressContainer.innerHTML = tData.progress.map(p => `
    <tr class="border-b border-slate-800 hover:bg-slate-800/40">
      <td class="py-3 px-4 text-slate-400 text-sm">${p.date}</td>
      <td class="py-3 px-4 font-bold text-emerald-400 text-sm">${p.weight} kg</td>
      <td class="py-3 px-4 text-slate-300 text-sm">${p.note}</td>
    </tr>
  `).join('');
}

// Add new progress log by trainee
function handleAddProgress(e) {
  e.preventDefault();
  const weightVal = parseFloat(document.getElementById('new-weight-input').value);
  const noteVal = document.getElementById('new-note-input').value.trim();

  if (!weightVal || !state.currentTrainee) return;

  const today = new Date().toISOString().split('T')[0];
  state.currentTrainee.progress.unshift({
    date: today,
    weight: weightVal,
    note: noteVal || 'متابعة أسبوعية'
  });
  state.currentTrainee.weight = weightVal;

  saveState();
  closeModal('add-progress-modal');
  renderTraineePortal();
}

// Join Me Form Submission
function handleJoinSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const newApp = {
    id: 'PEND-' + Math.floor(100 + Math.random() * 900),
    name: form.elements['name'].value,
    phone: form.elements['phone'].value,
    email: form.elements['email'].value,
    age: parseInt(form.elements['age'].value),
    weight: parseFloat(form.elements['weight'].value),
    height: parseFloat(form.elements['height'].value),
    goal: form.elements['goal'].value,
    activity: form.elements['activity'].value,
    requestDate: new Date().toISOString().split('T')[0]
  };

  state.pendingClients.unshift(newApp);
  saveState();

  form.reset();
  showNotification(t('joinSuccessMsg'), 'success');
}

// Admin Password Modal
function openAdminAuthModal() {
  openModal('admin-auth-modal');
  document.getElementById('admin-pass-input').focus();
}

function handleAdminAuth(e) {
  e.preventDefault();
  const pass = document.getElementById('admin-pass-input').value;
  const errorEl = document.getElementById('admin-pass-error');

  if (pass === state.adminPassword) {
    state.isAdminLoggedIn = true;
    closeModal('admin-auth-modal');
    document.getElementById('admin-pass-input').value = '';
    errorEl.classList.add('hidden');
    renderApp();
  } else {
    errorEl.classList.remove('hidden');
  }
}

function logoutAdmin() {
  state.isAdminLoggedIn = false;
  renderApp();
}

// Render Admin Dashboard
function renderAdminDashboard() {
  const pendingContainer = document.getElementById('admin-pending-table');
  pendingContainer.innerHTML = state.pendingClients.map(p => `
    <tr class="border-b border-slate-800 hover:bg-slate-800/40">
      <td class="py-3 px-4 font-bold text-white">${p.name}</td>
      <td class="py-3 px-4 text-slate-300 text-sm">${p.phone}<br><span class="text-xs text-slate-500">${p.email}</span></td>
      <td class="py-3 px-4 text-slate-300 text-sm">${p.age} سنة / ${p.weight}kg / ${p.height}cm</td>
      <td class="py-3 px-4 text-emerald-400 text-sm font-semibold">${p.goal}</td>
      <td class="py-3 px-4 text-slate-400 text-xs">${p.activity}</td>
      <td class="py-3 px-4 text-left">
        <button onclick="acceptPendingClient('${p.id}')" class="glow-btn-green text-slate-900 font-bold px-3 py-1.5 rounded text-xs ml-1">
          <i class="fas fa-check mr-1"></i> ${t('acceptBtn')}
        </button>
        <button onclick="rejectPendingClient('${p.id}')" class="bg-red-500/20 hover:bg-red-500/40 text-red-400 font-bold px-3 py-1.5 rounded text-xs border border-red-500/30">
          <i class="fas fa-times mr-1"></i> ${t('rejectBtn')}
        </button>
      </td>
    </tr>
  `).join('');

  if (state.pendingClients.length === 0) {
    pendingContainer.innerHTML = `<tr><td colspan="6" class="text-center py-8 text-slate-500">لا توجد طلبات انضمام معلقة حالياً.</td></tr>`;
  }

  // Populate active client dropdown for plan editor
  const selectClient = document.getElementById('admin-client-select');
  selectClient.innerHTML = state.trainees.map(t => `
    <option value="${t.id}">${t.name} (${t.id})</option>
  `).join('');

  if (state.trainees.length > 0) {
    loadClientIntoEditor(state.trainees[0].id);
  }
}

// Admin Accept/Reject Pending Client
function acceptPendingClient(pendingId) {
  const index = state.pendingClients.findIndex(p => p.id === pendingId);
  if (index === -1) return;

  const p = state.pendingClients[index];
  const newTraineeId = 'KESH-' + (103 + state.trainees.length);

  const newTrainee = {
    id: newTraineeId,
    name: p.name,
    email: p.email,
    phone: p.phone,
    age: p.age,
    weight: p.weight,
    targetWeight: p.weight - 5,
    height: p.height,
    goal: p.goal,
    joinDate: new Date().toISOString().split('T')[0],
    calories: 2200,
    macros: { protein: 170, carbs: 200, fats: 60 },
    meals: [
      { title: "وجبة 1", description: "4 بيضات + 80g شوفان", calories: 500, image: "assets/images/meal.png" },
      { title: "وجبة 2", description: "200g صدر دجاج + 200g أرز", calories: 700, image: "assets/images/meal.png" }
    ],
    workouts: [
      { day: "Day 1", title: "Full Body A", details: "Squats 4x10, Bench Press 4x10, Rows 4x10" }
    ],
    progress: [
      { date: p.requestDate, weight: p.weight, note: "تفعيل الحساب والقبول" }
    ],
    coachNotes: "أهلاً بك في الفريق! ابدأ باتباع الماكروز اليومية الموضحة."
  };

  state.trainees.push(newTrainee);
  state.pendingClients.splice(index, 1);
  saveState();

  showNotification(`تم قبول ${p.name} وتعيين الكود: ${newTraineeId}`, 'success');
  renderAdminDashboard();
}

function rejectPendingClient(pendingId) {
  state.pendingClients = state.pendingClients.filter(p => p.id !== pendingId);
  saveState();
  renderAdminDashboard();
}

// Load selected client data into plan editor form
function loadClientIntoEditor(clientId) {
  const trainee = state.trainees.find(t => t.id === clientId);
  if (!trainee) return;

  document.getElementById('edit-calories').value = trainee.calories;
  document.getElementById('edit-protein').value = trainee.macros.protein;
  document.getElementById('edit-carbs').value = trainee.macros.carbs;
  document.getElementById('edit-fats').value = trainee.macros.fats;
  document.getElementById('edit-coach-notes').value = trainee.coachNotes || '';
  
  // Direct access URL link generator
  const accessUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?client=' + trainee.id;
  document.getElementById('client-access-url').value = accessUrl;

  // Render meals editor list
  const mealsEditContainer = document.getElementById('admin-meals-editor');
  mealsEditContainer.innerHTML = trainee.meals.map((m, idx) => `
    <div class="glass-card p-4 space-y-3 relative border-slate-700">
      <div class="flex justify-between items-center">
        <h5 class="text-sm font-bold text-emerald-400">الوجبة #${idx + 1}</h5>
        <button type="button" onclick="removeMealFromEditor(${idx})" class="text-red-400 text-xs hover:underline">حذف</button>
      </div>
      <input type="text" class="admin-meal-title bg-slate-900 border border-slate-700 rounded px-3 py-1.5 w-full text-xs text-white" value="${m.title}" placeholder="عنوان الوجبة">
      <textarea class="admin-meal-desc bg-slate-900 border border-slate-700 rounded px-3 py-1.5 w-full text-xs text-white" rows="2" placeholder="تفاصيل الوجبة">${m.description}</textarea>
      <div class="grid grid-cols-2 gap-2">
        <input type="number" class="admin-meal-cal bg-slate-900 border border-slate-700 rounded px-3 py-1.5 w-full text-xs text-white" value="${m.calories}" placeholder="السعرات">
        <input type="text" class="admin-meal-img bg-slate-900 border border-slate-700 rounded px-3 py-1.5 w-full text-xs text-white" value="${m.image || ''}" placeholder="رابط الصورة Image URL">
      </div>
    </div>
  `).join('');
}

function addMealToEditor() {
  const mealsEditContainer = document.getElementById('admin-meals-editor');
  const idx = mealsEditContainer.children.length;
  const newMealHtml = `
    <div class="glass-card p-4 space-y-3 relative border-slate-700">
      <div class="flex justify-between items-center">
        <h5 class="text-sm font-bold text-emerald-400">وجبة جديدة #${idx + 1}</h5>
        <button type="button" onclick="this.parentElement.parentElement.remove()" class="text-red-400 text-xs hover:underline">حذف</button>
      </div>
      <input type="text" class="admin-meal-title bg-slate-900 border border-slate-700 rounded px-3 py-1.5 w-full text-xs text-white" placeholder="عنوان الوجبة (مثال: وجبة الإفطار)">
      <textarea class="admin-meal-desc bg-slate-900 border border-slate-700 rounded px-3 py-1.5 w-full text-xs text-white" rows="2" placeholder="مكونات الوجبة والجرامات"></textarea>
      <div class="grid grid-cols-2 gap-2">
        <input type="number" class="admin-meal-cal bg-slate-900 border border-slate-700 rounded px-3 py-1.5 w-full text-xs text-white" placeholder="السعرات">
        <input type="text" class="admin-meal-img bg-slate-900 border border-slate-700 rounded px-3 py-1.5 w-full text-xs text-white" placeholder="رابط الصورة Image URL (اختياري)">
      </div>
    </div>
  `;
  mealsEditContainer.insertAdjacentHTML('beforeend', newMealHtml);
}

function removeMealFromEditor(index) {
  const mealsEditContainer = document.getElementById('admin-meals-editor');
  if (mealsEditContainer.children[index]) {
    mealsEditContainer.children[index].remove();
  }
}

// Save edited client plan
function handleSaveClientPlan(e) {
  e.preventDefault();
  const selectedId = document.getElementById('admin-client-select').value;
  const trainee = state.trainees.find(t => t.id === selectedId);
  if (!trainee) return;

  trainee.calories = parseInt(document.getElementById('edit-calories').value);
  trainee.macros.protein = parseInt(document.getElementById('edit-protein').value);
  trainee.macros.carbs = parseInt(document.getElementById('edit-carbs').value);
  trainee.macros.fats = parseInt(document.getElementById('edit-fats').value);
  trainee.coachNotes = document.getElementById('edit-coach-notes').value;

  // Harvest meals from editor
  const mealCards = document.querySelectorAll('#admin-meals-editor > div');
  const updatedMeals = [];

  mealCards.forEach(card => {
    const title = card.querySelector('.admin-meal-title').value.trim();
    const description = card.querySelector('.admin-meal-desc').value.trim();
    const calories = parseInt(card.querySelector('.admin-meal-cal').value) || 0;
    const image = card.querySelector('.admin-meal-img').value.trim() || 'assets/images/meal.png';

    if (title) {
      updatedMeals.push({ title, description, calories, image });
    }
  });

  trainee.meals = updatedMeals;
  saveState();
  showNotification(t('planSavedMsg'), 'success');
}

function copyAccessUrl() {
  const input = document.getElementById('client-access-url');
  input.select();
  document.execCommand('copy');
  showNotification('تم نسخ رابط المتدرب الخاص بنجاح!', 'success');
}

// Remove Trainee from Platform
function openRemoveTraineeConfirm() {
  const selectedId = document.getElementById('admin-client-select').value;
  const trainee = state.trainees.find(t => t.id === selectedId);
  if (!trainee) return;

  // Update confirmation message with trainee name
  const confirmText = document.getElementById('remove-trainee-confirm-text');
  confirmText.innerHTML = `هل أنت متأكد من حذف المتدرب <strong class="text-red-400">${trainee.name}</strong> (${trainee.id}) من المنصة نهائياً؟<br><span class="text-xs text-slate-500 mt-2 block">سيتم حذف جميع بياناته وخططه. لا يمكن التراجع عن هذا الإجراء.</span>`;
  openModal('remove-trainee-modal');
}

function confirmRemoveTrainee() {
  const selectedId = document.getElementById('admin-client-select').value;
  const trainee = state.trainees.find(t => t.id === selectedId);
  if (!trainee) return;

  const name = trainee.name;
  state.trainees = state.trainees.filter(t => t.id !== selectedId);
  saveState();

  closeModal('remove-trainee-modal');
  showNotification(`تم حذف المتدرب ${name} من المنصة بنجاح.`, 'info');
  renderAdminDashboard();
}


// Modal Toggle Helpers
function openModal(id) {
  document.getElementById(id).classList.remove('hidden');
}

function closeModal(id) {
  document.getElementById(id).classList.add('hidden');
}

// Notification Toast
function showNotification(msg, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `fixed bottom-6 left-6 z-50 px-5 py-3 rounded-lg text-sm font-bold shadow-2xl flex items-center gap-3 transition-all transform duration-300 translate-y-10 opacity-0 ${
    type === 'success' ? 'bg-emerald-500 text-slate-950' : 'bg-amber-500 text-slate-950'
  }`;
  toast.innerHTML = `<i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i> <span>${msg}</span>`;

  document.body.appendChild(toast);
  setTimeout(() => {
    toast.classList.remove('translate-y-10', 'opacity-0');
  }, 50);

  setTimeout(() => {
    toast.classList.add('translate-y-10', 'opacity-0');
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

/* ==========================================================================
   EXCEL & GOOGLE SHEETS DYNAMIC INTEGRATION UTILITIES
   ========================================================================== */

// Helper to convert flexible Excel column headers into clean Trainee object
function parseExcelRowToTrainee(row) {
  const getVal = (keys) => {
    for (const k of keys) {
      if (row[k] !== undefined && row[k] !== null && row[k] !== '') return row[k];
    }
    return '';
  };

  const id = String(getVal(['Trainee ID', 'ID', 'id', 'كود المتدرب'])).trim();
  const name = String(getVal(['Name', 'name', 'اسم المتدرب', 'الاسم'])).trim();
  if (!id || !name) return null;

  let meals = [];
  const mealsRaw = getVal(['Meals', 'meals', 'الوجبات']);
  if (mealsRaw) {
    try {
      meals = typeof mealsRaw === 'string' ? JSON.parse(mealsRaw) : mealsRaw;
    } catch (e) {
      meals = [{ title: "وجبة اليوم", description: String(mealsRaw), calories: 500, image: "assets/images/meal.png" }];
    }
  } else {
    meals = [
      { title: "وجبة 1 (إفطار)", description: "4 بيضات + 80g شوفان", calories: 500, image: "assets/images/meal.png" },
      { title: "وجبة 2 (غداء)", description: "200g صدر دجاج + 200g أرز مسلوق", calories: 700, image: "assets/images/meal.png" }
    ];
  }

  let workouts = [];
  const workoutsRaw = getVal(['Workouts', 'workouts', 'التمارين']);
  if (workoutsRaw) {
    try {
      workouts = typeof workoutsRaw === 'string' ? JSON.parse(workoutsRaw) : workoutsRaw;
    } catch (e) {
      workouts = [{ day: "اليوم", title: "برنامج التمرين", details: String(workoutsRaw) }];
    }
  } else {
    workouts = [
      { day: "اليوم 1", title: "Push", details: "Bench Press 4x8, Shoulder Press 4x10" },
      { day: "اليوم 2", title: "Pull", details: "Deadlift 4x6, Lat Pulldown 4x10" }
    ];
  }

  return {
    id: id,
    name: name,
    phone: String(getVal(['Phone', 'phone', 'الهاتف'])),
    email: String(getVal(['Email', 'email', 'البريد'])),
    age: parseInt(getVal(['Age', 'age', 'العمر'])) || 25,
    weight: parseFloat(getVal(['Weight', 'weight', 'الوزن'])) || 80,
    targetWeight: parseFloat(getVal(['Target Weight', 'targetWeight', 'الوزن المستهدف'])) || 75,
    height: parseInt(getVal(['Height', 'height', 'الطول'])) || 175,
    goal: String(getVal(['Goal', 'goal', 'الهدف'])) || 'تنشيف وبناء عضلات',
    calories: parseInt(getVal(['Calories', 'calories', 'السعرات'])) || 2200,
    macros: {
      protein: parseInt(getVal(['Protein', 'protein', 'بروتين'])) || 170,
      carbs: parseInt(getVal(['Carbs', 'carbs', 'كاربوهيدرات'])) || 200,
      fats: parseInt(getVal(['Fats', 'fats', 'دهون'])) || 60
    },
    meals: meals,
    workouts: workouts,
    progress: [
      { date: new Date().toISOString().split('T')[0], weight: parseFloat(getVal(['Weight', 'weight', 'الوزن'])) || 80, note: "مستورد من Excel" }
    ],
    coachNotes: String(getVal(['Coach Notes', 'coachNotes', 'ملاحظات الكابتن'])) || 'مستورد تلقائياً من شيت Excel'
  };
}

// Save Google Sheets Web App API URL
function saveExcelApiUrl() {
  const urlInput = document.getElementById('excel-api-url-input').value.trim();
  state.excelApiUrl = urlInput;
  saveState();
  showNotification('تم حفظ رابط Google Sheets Web App بنجاح!', 'success');
}

// Sync live spreadsheet data from Web App URL
async function syncFromExcelApi() {
  if (!state.excelApiUrl) {
    showNotification('يرجى إدخال رابط Google Sheets Web App أولاً', 'info');
    return;
  }

  try {
    showNotification('جاري الاتصال والتحقق من شيت Excel...', 'info');
    const res = await fetch(state.excelApiUrl);
    if (!res.ok) throw new Error("Network error fetching sheet");
    
    const rows = await res.json();
    if (!Array.isArray(rows)) throw new Error("Invalid array data format");

    const newTrainees = [];
    rows.forEach(r => {
      const parsed = parseExcelRowToTrainee(r);
      if (parsed) newTrainees.push(parsed);
    });

    if (newTrainees.length > 0) {
      state.trainees = newTrainees;
      saveState();
      showNotification(`تم التزامن بنجاح! تم استيراد ${newTrainees.length} متدرب من Excel.`, 'success');
      renderAdminDashboard();
    } else {
      showNotification('لم يتم العثور على صفوف متدربين صالحة في ملف Excel', 'info');
    }
  } catch (err) {
    showNotification('فشل التزامن مع Excel. تحقق من الرابط وصلاحيات النشر (Anyone).', 'info');
    console.error(err);
  }
}

// Handle Local Excel (.xlsx) File Upload
function handleExcelFileUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: 'binary' });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const jsonRows = XLSX.utils.sheet_to_json(worksheet);

      const importedTrainees = [];
      jsonRows.forEach(row => {
        const parsed = parseExcelRowToTrainee(row);
        if (parsed) importedTrainees.push(parsed);
      });

      if (importedTrainees.length > 0) {
        state.trainees = importedTrainees;
        saveState();
        showNotification(`تم استيراد ${importedTrainees.length} متدرب بنجاح من ملف Excel!`, 'success');
        renderAdminDashboard();
      } else {
        showNotification('لم يتم العثور على بيانات متدربين في الملف المرفوع', 'info');
      }
    } catch (err) {
      showNotification('خطأ أثناء قراءة ملف Excel', 'info');
      console.error(err);
    }
  };

  reader.readAsBinaryString(file);
}

// Download Excel Template (.xlsx) for Coach
function downloadExcelTemplate() {
  if (typeof XLSX === 'undefined') {
    showNotification('جاري تحميل مكتبة Excel...', 'info');
    return;
  }

  const templateData = [
    {
      "Trainee ID": "KESH-101",
      "Name": "عمر السيد",
      "Phone": "+201001234567",
      "Email": "omar@example.com",
      "Age": 27,
      "Weight": 84,
      "Target Weight": 76,
      "Height": 180,
      "Goal": "تنشيف وبناء عضلات صافية",
      "Calories": 2350,
      "Protein": 185,
      "Carbs": 220,
      "Fats": 65,
      "Coach Notes": "أداء ممتاز! واصل الالتزام بالماكروز."
    },
    {
      "Trainee ID": "KESH-102",
      "Name": "سارة أحمد",
      "Phone": "+201119876543",
      "Email": "sara@example.com",
      "Age": 24,
      "Weight": 62,
      "Target Weight": 57,
      "Height": 165,
      "Goal": "شد الجسم وزيادة اللياقة",
      "Calories": 1750,
      "Protein": 130,
      "Carbs": 165,
      "Fats": 50,
      "Coach Notes": "التزام رائع! ركزي على شرب الماء والنوم الجيد."
    }
  ];

  const worksheet = XLSX.utils.json_to_sheet(templateData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Trainees");
  XLSX.writeFile(workbook, "Coach_Keshk_Trainees_Template.xlsx");
  showNotification('تم تحميل قالب Excel بنجاح!', 'success');
}

// Copy Apps Script snippet to clipboard
function copyAppsScriptCode() {
  const box = document.getElementById('apps-script-code-box');
  box.select();
  document.execCommand('copy');
  showNotification('تم نسخ كود Google Apps Script بنجاح!', 'success');
}

