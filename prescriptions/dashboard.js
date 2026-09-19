const API_URL =
  "https://script.google.com/macros/s/AKfycbw0jSrbe1SM596Kyv0EpB6VTKEXT81c2Cn8Wlc2lEQ_RzbrS9b6w-k4gyrflwPBTgpKSQ/exec";

const UNIFIED_API_URL =
  "https://script.google.com/macros/s/AKfycbw9JM87uiSHihWDP0N1gn4IskEG_8O-fWleathLZW9Wwbs915UQz8Gq5k2dIwAGImCF/exec";

const els = {
  dashboardLoginView: document.getElementById("dashboardLoginView"),
  supervisorPanel: document.getElementById("supervisorPanel"),
  dashboardLoginForm: document.getElementById("dashboardLoginForm"),
  adminUsername: document.getElementById("adminUsername"),
  adminPin: document.getElementById("adminPin"),
  languageToggle: document.getElementById("languageToggle"),
  officialLine1: document.getElementById("officialLine1"),
  officialLine2: document.getElementById("officialLine2"),
  officialLine3: document.getElementById("officialLine3"),
  pageTitle: document.getElementById("pageTitle"),
  usernameLabel: document.getElementById("usernameLabel"),
  pinLabel: document.getElementById("pinLabel"),
  loginBtn: document.getElementById("loginBtn"),
  dashboardLoginMessage: document.getElementById("dashboardLoginMessage"),
  dashboardChangePinLoginBtn: document.getElementById("dashboardChangePinLoginBtn"),
  dashboardLogoutBtn: document.getElementById("dashboardLogoutBtn"),
  currentUser: document.getElementById("currentUser"),
  refreshSupervisorBtn: document.getElementById("refreshSupervisorBtn"),
  printReportBtn: document.getElementById("printReportBtn"),
  dateBox: document.getElementById("dateBox"),
  reportDate: document.getElementById("reportDate"),
  printReportDate: document.getElementById("printReportDate"),
  totalCount: document.getElementById("totalCount"),
  preparedCount: document.getElementById("preparedCount"),
  pendingCount: document.getElementById("pendingCount"),
  totalLabel: document.getElementById("totalLabel"),
  preparedLabel: document.getElementById("preparedLabel"),
  pendingLabel: document.getElementById("pendingLabel"),
  allFilterBtn: document.getElementById("allFilterBtn"),
  preparedFilterBtn: document.getElementById("preparedFilterBtn"),
  pendingFilterBtn: document.getElementById("pendingFilterBtn"),
  statusFilter: document.getElementById("statusFilter"),
  fileHeader: document.getElementById("fileHeader"),
  patientHeader: document.getElementById("patientHeader"),
  statusHeader: document.getElementById("statusHeader"),
  preparedByHeader: document.getElementById("preparedByHeader"),
  timeHeader: document.getElementById("timeHeader"),
  printOfficialLine1: document.getElementById("printOfficialLine1"),
  printOfficialLine2: document.getElementById("printOfficialLine2"),
  printOfficialLine3: document.getElementById("printOfficialLine3"),
  printTitle: document.getElementById("printTitle"),
  printTotalLabel: document.getElementById("printTotalLabel"),
  printPreparedLabel: document.getElementById("printPreparedLabel"),
  printPendingLabel: document.getElementById("printPendingLabel"),
  printUsersTitle: document.getElementById("printUsersTitle"),
  printPreparedByHeader: document.getElementById("printPreparedByHeader"),
  printCountHeader: document.getElementById("printCountHeader"),
  printTotalCount: document.getElementById("printTotalCount"),
  printPreparedCount: document.getElementById("printPreparedCount"),
  printPendingCount: document.getElementById("printPendingCount"),
  printUserBody: document.getElementById("printUserBody"),
  fileSearchInput: document.getElementById("fileSearchInput"),
  fileSearchBtn: document.getElementById("fileSearchBtn"),
  dailyListBody: document.getElementById("dailyListBody"),
  supervisorMessage: document.getElementById("supervisorMessage"),
  filterButtons: document.querySelectorAll(".filter-btn"),
  summaryCards: document.querySelectorAll(".summary-card[data-filter]")
};

let dailyRows = [];
let activeFilter = "all";
let refreshTimer = null;
let isLoadingSupervisorData = false;
let inactivityTimer = null;
let currentLang = "ar";
let lastSummary = null;

const INACTIVITY_LIMIT_MS =
  30 * 60 * 1000;

const DASHBOARD_SESSION_USER_KEY =
  "dashboardAdminUsername";

const DASHBOARD_SESSION_NAME_KEY =
  "dashboardAdminDisplayName";

const DASHBOARD_SESSION_TOKEN_KEY =
  "dashboardAdminSessionToken";


const i18n = {
  ar: {
    pageTitle: "مؤشر وصفات البريد اليومي",
    officialLine1: "تجمع المدينة المنورة الصحي",
    officialLine2: "مستشفى الملك فهد بالمدينة المنورة",
    officialLine3: "إدارة الرعاية الصيدلانية",
    username: "اسم المستخدم",
    pin: "PIN",
    login: "دخول",
    changePin: "تغيير PIN",
    logout: "خروج",
    refresh: "تحديث",
    print: "طباعة التقرير",
    total: "إجمالي القائمة",
    prepared: "جاهزة للتسليم",
    pending: "تحت المعالجة",
    all: "الكل",
    filterLabel: "فلترة حالة الوصفات",
    search: "بحث",
    fileNumber: "رقم الملف",
    patientName: "اسم المريض",
    status: "الحالة",
    preparedBy: "معالجة بواسطة",
    time: "الوقت",
    count: "العدد",
    usersAchievement: "إنجاز الموظفين",
    printTitle: "المؤشر اليومي لوصفات البريد",
    loginLoading: "جاري تسجيل الدخول...",
    invalidAdmin: "بيانات الأدمن غير صحيحة.",
    promptUsername: "أدخل اسم المستخدم:",
    promptCurrentPin: "أدخل PIN الحالي:",
    promptNewPin: "أدخل PIN الجديد:",
    promptConfirmPin: "أعد إدخال PIN الجديد:",
    pinMismatch: "PIN الجديد غير متطابق.",
    pinChanging: "جاري تغيير مفتاح الدخول...",
    pinChangeFailed: "تعذر تغيير مفتاح الدخول.",
    pinChanged: "تم تغيير مفتاح الدخول بنجاح.",
    loadFailed: "تعذر تحميل قائمة اليوم.",
    lastUpdate: "آخر تحديث: ",
    noPrepared: "لا توجد وصفات جاهزة للتسليم.",
    noRows: "لا توجد قائمة مرفوعة لليوم.",
    serverFailed: "تعذر الاتصال بالخادم.",
    sessionExpired: "انتهت جلسة الأدمن. سجّل الدخول مرة أخرى.",
    adminRequired: "هذه الصفحة مخصصة للأدمن فقط."
  },

  en: {
    pageTitle: "Daily Prescription Mail Dashboard",
    officialLine1: "Madinah Health Cluster",
    officialLine2: "King Fahad Hospital - Madinah",
    officialLine3: "Pharmaceutical Care Administration",
    username: "Username",
    pin: "PIN",
    login: "Login",
    changePin: "Change PIN",
    logout: "Logout",
    refresh: "Refresh",
    print: "Print Report",
    total: "Total List",
    prepared: "Ready for Pickup",
    pending: "In Progress",
    all: "All",
    filterLabel: "Filter prescription status",
    search: "Search",
    fileNumber: "File Number",
    patientName: "Patient Name",
    status: "Status",
    preparedBy: "Processed By",
    time: "Time",
    count: "Count",
    usersAchievement: "Employee Progress",
    printTitle: "Daily Prescription Mail Dashboard",
    loginLoading: "Signing in...",
    invalidAdmin: "Invalid admin credentials.",
    promptUsername: "Enter username:",
    promptCurrentPin: "Enter current PIN:",
    promptNewPin: "Enter new PIN:",
    promptConfirmPin: "Re-enter new PIN:",
    pinMismatch: "The new PIN does not match.",
    pinChanging: "Changing PIN...",
    pinChangeFailed: "Unable to change PIN.",
    pinChanged: "PIN changed successfully.",
    loadFailed: "Unable to load today's list.",
    lastUpdate: "Last update: ",
    noPrepared: "No prescriptions are ready for pickup.",
    noRows: "No list has been uploaded for today.",
    serverFailed: "Unable to connect to the server.",
    sessionExpired: "Admin session expired. Please sign in again.",
    adminRequired: "This page is for administrators only."
  }
};


function t(key) {
  return (
    i18n[currentLang][key] ||
    i18n.ar[key] ||
    key
  );
}


document.addEventListener(
  "DOMContentLoaded",
  initDashboard
);


async function initDashboard() {
  startInactivityWatcher();

  setLanguage("ar");

  clearLegacyDashboardSession();

  if (els.languageToggle) {
    els.languageToggle.addEventListener(
      "click",
      toggleLanguage
    );
  }

  els.dashboardLogoutBtn.addEventListener(
    "click",
    dashboardLogout
  );

  els.refreshSupervisorBtn.addEventListener(
    "click",
    loadSupervisorData
  );

  els.printReportBtn.addEventListener(
    "click",
    () => window.print()
  );

  els.filterButtons.forEach(
    button => {
      button.addEventListener(
        "click",
        () =>
          setStatusFilter(
            button.dataset.filter
          )
      );
    }
  );

  els.summaryCards.forEach(
    card => {
      card.addEventListener(
        "click",
        () =>
          setStatusFilter(
            card.dataset.filter
          )
      );

      card.addEventListener(
        "keydown",
        event => {
          if (
            event.key === "Enter" ||
            event.key === " "
          ) {
            event.preventDefault();

            setStatusFilter(
              card.dataset.filter
            );
          }
        }
      );
    }
  );

  els.fileSearchInput.addEventListener(
    "input",
    () =>
      renderDailyRows(
        getFilteredRows()
      )
  );

  els.fileSearchBtn.addEventListener(
    "click",
    applyFileSearch
  );

  await restoreDashboardSession();
}


/* =========================================================
   RESTORE ADMIN SESSION
========================================================= */

async function unifiedApi(
  payload
) {
  const response =
    await fetch(
      UNIFIED_API_URL,
      {
        method:
          "POST",

        headers: {
          "Content-Type":
            "text/plain;charset=utf-8"
        },

        body:
          JSON.stringify(
            payload
          )
      }
    );

  if (!response.ok) {
    throw new Error(
      t("serverFailed")
    );
  }

  return response.json();
}


function getCachedUnifiedUser() {
  const raw =
    sessionStorage.getItem(
      "unifiedPortalUser"
    ) || "";

  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(
      raw
    );
  } catch (error) {
    return null;
  }
}


function hasOpdMailIndicatorAccess(
  user
) {
  return Boolean(
    user &&
    user.opdMailIndicatorAccess === true
  );
}


function setCurrentUser(
  user
) {
  if (!els.currentUser) {
    return;
  }

  els.currentUser.textContent =
    (
      user &&
      (
        user.name ||
        user.username
      )
    ) ||
    "";
}


function clearCurrentUser() {
  if (els.currentUser) {
    els.currentUser.textContent =
      "";
  }
}


function clearUnifiedPortalSession() {
  sessionStorage.removeItem(
    "unifiedPortalUsername"
  );

  sessionStorage.removeItem(
    "unifiedPortalSessionToken"
  );

  sessionStorage.removeItem(
    "unifiedPortalUser"
  );
}


function clearLegacyDashboardSession() {
  sessionStorage.removeItem(
    DASHBOARD_SESSION_USER_KEY
  );

  sessionStorage.removeItem(
    DASHBOARD_SESSION_NAME_KEY
  );

  sessionStorage.removeItem(
    DASHBOARD_SESSION_TOKEN_KEY
  );

  sessionStorage.removeItem(
    "dashboardAdminPin"
  );
}


function stopDashboardRefresh() {
  if (refreshTimer) {
    clearInterval(
      refreshTimer
    );

    refreshTimer =
      null;
  }
}


function hideDashboardViews() {
  stopDashboardRefresh();

  if (els.supervisorPanel) {
    els.supervisorPanel
      .classList
      .add(
        "hidden"
      );
  }

  if (els.dashboardLoginView) {
    els.dashboardLoginView
      .classList
      .add(
        "hidden"
      );
  }

  clearCurrentUser();
}


async function redirectInvalidUnifiedSession() {
  clearUnifiedPortalSession();
  clearLegacyDashboardSession();
  hideDashboardViews();

  dailyRows = [];
  lastSummary = null;

  window.location.replace(
    "../index.html"
  );
}


async function redirectNoDashboardPermission() {
  clearLegacyDashboardSession();
  hideDashboardViews();

  dailyRows = [];
  lastSummary = null;

  window.location.replace(
    "index.html"
  );
}


async function restoreDashboardSession() {
  const token =
    sessionStorage.getItem(
      "unifiedPortalSessionToken"
    ) || "";

  if (!token) {
    await redirectInvalidUnifiedSession();
    return;
  }

  const cachedUser =
    getCachedUnifiedUser();

  const cachedAllowed =
    hasOpdMailIndicatorAccess(
      cachedUser
    );

  if (cachedAllowed) {
    setCurrentUser(
      cachedUser
    );

    resetInactivityTimer();
    showDashboard();
  } else {
    hideDashboardViews();
  }

  try {
    const response =
      await unifiedApi({
        action:
          "validateSession",

        sessionToken:
          token,

        service:
          "opdMailIndicator"
      });

    if (
      !response ||
      !response.success
    ) {
      const code =
        response &&
        response.code
          ? response.code
          : "INVALID_SESSION";

      if (
        code ===
          "NO_PERMISSION"
      ) {
        await redirectNoDashboardPermission();
        return;
      }

      if (
        code ===
          "AUTH_UNAVAILABLE"
      ) {
        if (!cachedAllowed) {
          hideDashboardViews();
        }

        return;
      }

      await redirectInvalidUnifiedSession();
      return;
    }

    if (
      !response.user ||
      response.user.active === false
    ) {
      await redirectInvalidUnifiedSession();
      return;
    }

    if (
      !hasOpdMailIndicatorAccess(
        response.user
      )
    ) {
      await redirectNoDashboardPermission();
      return;
    }

    sessionStorage.setItem(
      "unifiedPortalUser",
      JSON.stringify(
        response.user
      )
    );

    sessionStorage.setItem(
      "unifiedPortalUsername",
      response.user.username ||
      ""
    );

    setCurrentUser(
      response.user
    );

    resetInactivityTimer();
    showDashboard();

  } catch (error) {
    if (!cachedAllowed) {
      hideDashboardViews();
    }
  }
}