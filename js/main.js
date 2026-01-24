/**
 * EduManage - Main JavaScript File
 * ===================================
 * 
 * This file handles all client-side logic for the EduManage Student Management System.
 * 
 * FEATURES:
 * - User Authentication (Login/Logout)
 * - Dashboard Statistics & Overview
 * - Student Management (List, Add, Edit, Delete)
 * - Course Management (CRUD operations)
 * - Attendance Tracking (Daily records with export)
 * - Student Detail View
 * 
 * DATA PERSISTENCE:
 * All data is stored in localStorage with the following keys:
 * - eduManage_user: Current logged-in user session
 * - eduManage_remember: Remembered email for "Remember Me" feature
 * - eduManage_students: Array of student objects
 * - eduManage_courses: Array of course objects
 * - eduManage_attendance_v2: Nested object {date: {studentId: status}}
 * 
 * CREDENTIALS FOR TESTING:
 * - Admin: admin@school.edu / admin123
 * - Teacher: teacher@school.edu / teacher123
 */

/**
 * APPLICATION ENTRY POINT
 * -----------------------
 * Waits for DOM to fully load before initializing the application.
 * This ensures all HTML elements are available for JavaScript manipulation.
 * 
 * Flow: DOM Ready → Initialize Data → Route to Page
 */
document.addEventListener("DOMContentLoaded", () => {
  console.log("EduManage JS v2.3 Loaded");
  initData();   // Seed initial data if localStorage is empty
  routePage();  // Determine current page and initialize appropriate functions
});

// ============================================================================
// DATA INITIALIZATION
// ============================================================================

/**
 * initData() - Seeds localStorage with sample data
 * ------------------------------------------------
 * PURPOSE: Provides initial sample data for demonstration purposes.
 * 
 * HOW IT WORKS:
 * 1. Checks if 'eduManage_students' key exists in localStorage
 * 2. If NOT exists → Creates 8 sample student records
 * 3. Checks if 'eduManage_courses' key exists in localStorage  
 * 4. If NOT exists → Creates 6 sample course records
 * 
 * STUDENT OBJECT STRUCTURE:
 * {
 *   id: "STD-2024-001",      // Unique student identifier
 *   firstName: "Emma",        // Student's first name
 *   lastName: "Wilson",       // Student's last name
 *   email: "email@email.com", // Contact email
 *   phone: "+1 234 567 8901", // Phone number
 *   class: "Grade 10 - Science A", // Enrolled class
 *   enrollDate: "2024-05-12", // Enrollment date (YYYY-MM-DD)
 *   status: "Active",         // Status: Active, Inactive, Pending
 *   avatarColor: "#4361ee"    // Avatar background color
 * }
 * 
 * COURSE OBJECT STRUCTURE:
 * {
 *   id: "CRSE-001",           // Unique course identifier
 *   code: "MATH-101",         // Course code for display
 *   title: "Advanced Mathematics", // Course title
 *   students: 28,             // Number of enrolled students
 *   hours: 48,                // Total course hours
 *   instructor: "Michael Kumar", // Instructor name
 *   status: "Active",         // Status: Active, Upcoming, Completed
 *   theme: "blue"             // Card theme color
 * }
 */
function initData() {
  // Check if student data already exists, if not, seed with sample data
  if (!localStorage.getItem("eduManage_students")) {
    const initialStudents = [
      {
        id: "STD-2024-001",
        firstName: "Emma",
        lastName: "Wilson",
        email: "emma.wilson@email.com",
        phone: "+1 234 567 8901",
        class: "Grade 10 - Science A",
        enrollDate: "2024-05-12",
        status: "Active",
        avatarColor: "#4361ee",
      },
      {
        id: "STD-2024-002",
        firstName: "James",
        lastName: "Davis",
        email: "james.davis@email.com",
        phone: "+1 234 567 8902",
        class: "Grade 11 - Mathematics",
        enrollDate: "2024-06-10",
        status: "Active",
        avatarColor: "#f72585",
      },
      {
        id: "STD-2024-003",
        firstName: "Sophia",
        lastName: "Martinez",
        email: "sophia.m@email.com",
        phone: "+1 234 567 8903",
        class: "Grade 9 - English Lit",
        enrollDate: "2024-08-15",
        status: "Active",
        avatarColor: "#4cc9f0",
      },
      {
        id: "STD-2024-004",
        firstName: "Liam",
        lastName: "Brown",
        email: "liam.b@email.com",
        phone: "+1 234 567 8904",
        class: "Grade 10 - Science A",
        enrollDate: "2024-09-01",
        status: "Active",
        avatarColor: "#7209b7",
      },
      {
        id: "STD-2024-005",
        firstName: "Ava",
        lastName: "Garcia",
        email: "ava.g@email.com",
        phone: "+1 234 567 8905",
        class: "Grade 11 - Mathematics",
        enrollDate: "2024-08-20",
        status: "Active",
        avatarColor: "#f77f00",
      },
      {
        id: "STD-2024-006",
        firstName: "Noah",
        lastName: "Martinez",
        email: "noah.m@email.com",
        phone: "+1 234 567 8906",
        class: "Grade 9 - English Lit",
        enrollDate: "2024-07-15",
        status: "Active",
        avatarColor: "#d62828",
      },
      {
        id: "STD-2024-007",
        firstName: "Isabella",
        lastName: "Davis",
        email: "isabella.d@email.com",
        phone: "+1 234 567 8907",
        class: "Grade 12 - Physics",
        enrollDate: "2024-06-01",
        status: "Active",
        avatarColor: "#003566",
      },
      {
        id: "STD-2024-008",
        firstName: "Mason",
        lastName: "Rodriguez",
        email: "mason.r@email.com",
        phone: "+1 234 567 8908",
        class: "Grade 10 - Science A",
        enrollDate: "2024-05-10",
        status: "Inactive",
        avatarColor: "#588157",
      },
    ];
    localStorage.setItem("eduManage_students", JSON.stringify(initialStudents));
  }

  if (!localStorage.getItem("eduManage_courses")) {
    const initialCourses = [
      {
        id: "CRSE-001",
        code: "MATH-101",
        title: "Advanced Mathematics",
        students: 28,
        hours: 48,
        instructor: "Michael Kumar",
        status: "Active",
        theme: "blue",
      },
      {
        id: "CRSE-002",
        code: "BIOL-201",
        title: "Biology & Life Sciences",
        students: 32,
        hours: 40,
        instructor: "Dr. Linda Johnson",
        status: "Active",
        theme: "purple",
      },
      {
        id: "CRSE-003",
        code: "CHEM-102",
        title: "Chemistry Fundamentals",
        students: 25,
        hours: 44,
        instructor: "Sarah Peterson",
        status: "Upcoming",
        theme: "teal",
      },
      {
        id: "CRSE-004",
        code: "ENG-301",
        title: "English Literature",
        students: 30,
        hours: 36,
        instructor: "Dr. Sarah Smith",
        status: "Active",
        theme: "orange",
      },
      {
        id: "CRSE-005",
        code: "ART-105",
        title: "Digital Art & Design",
        students: 24,
        hours: 48,
        instructor: "Rachel Jones",
        status: "Active",
        theme: "pink",
      },
      {
        id: "CRSE-006",
        code: "PHY-202",
        title: "Physics & Mechanics",
        students: 26,
        hours: 52,
        instructor: "Dr. Thomas Phillips",
        status: "Active",
        theme: "green",
      },
    ];
    localStorage.setItem("eduManage_courses", JSON.stringify(initialCourses));
  }
}

// ============================================================================
// PAGE ROUTING & NAVIGATION
// ============================================================================

/**
 * routePage() - Page Router / Controller
 * ---------------------------------------
 * PURPOSE: Determines which page is currently loaded and initializes
 *          the appropriate functions for that page.
 * 
 * HOW IT WORKS:
 * 1. Gets current URL pathname (e.g., "/pages/student-list.html")
 * 2. Extracts the filename (e.g., "student-list.html")
 * 3. Uses if-else to match page and call corresponding init function
 * 4. Protected pages check authentication before initializing
 * 
 * PAGE → FUNCTION MAPPING:
 * - login.html        → initLogin()
 * - index.html        → initDashboard() + initGlobalSearch()
 * - student-list.html → initStudentList()
 * - student-enroll.html → initEnrollment()
 * - course.html       → initCourses()
 * - attendance.html   → initAttendance()
 * - student-detail.html → initStudentDetail()
 * 
 * SECURITY: All pages except login.html require authentication.
 *           If not authenticated, user is redirected to login page.
 */
function routePage() {
  const path = window.location.pathname;  // Get full URL path
  const page = path.split("/").pop();     // Extract filename from path

  if (page === "login.html") {
    initLogin();
  } else if (page === "index.html" || page === "") {
    if (!checkAuth()) return;
    initDashboard();
    initGlobalSearch();
  } else if (page === "student-list.html") {
    if (!checkAuth()) return;
    initStudentList();
  } else if (page === "student-enroll.html") {
    if (!checkAuth()) return;
    initEnrollment();
  } else if (page === "course.html") {
    if (!checkAuth()) return;
    initCourses();
  } else if (page === "attendance.html") {
    if (!checkAuth()) return;
    initAttendance();
  } else if (page === "student-detail.html") {
    if (!checkAuth()) return;
    initStudentDetail();
  }

  highlightNav(page);  // Highlight current page in navigation
  initLogout();         // Setup logout button event listener
}

/**
 * checkAuth() - Authentication Guard
 * -----------------------------------
 * PURPOSE: Protects pages from unauthorized access.
 * 
 * HOW IT WORKS:
 * 1. Checks if 'eduManage_user' exists in localStorage
 * 2. If user NOT found → Redirects to login page
 * 3. If user found → Returns true (allows page access)
 * 
 * REDIRECT LOGIC:
 * - If current path includes '/pages/' → redirect to 'login.html' (same folder)
 * - Otherwise → redirect to 'pages/login.html' (from root)
 * 
 * @returns {boolean} - true if authenticated, false if redirected
 */
function checkAuth() {
  const user = localStorage.getItem("eduManage_user");
  if (!user) {
    const isPages = window.location.pathname.includes("/pages/");
    window.location.href = isPages ? "login.html" : "pages/login.html";
    return false;
  }
  return true;
}

/**
 * highlightNav(page) - Navigation Active State
 * ---------------------------------------------
 * PURPOSE: Visually indicates which page is currently active in the sidebar.
 * 
 * HOW IT WORKS:
 * 1. Selects all elements with class '.nav-link'
 * 2. Removes 'active' class from all links
 * 3. Compares each link's href with current page
 * 4. Adds 'active' class to matching link
 * 
 * @param {string} page - Current page filename (e.g., "student-list.html")
 */
function highlightNav(page) {
  const links = document.querySelectorAll(".nav-link");
  links.forEach((link) => {
    link.classList.remove("active");
    const href = link.getAttribute("href");
    if (
      href === page ||
      href.endsWith("/" + page) ||
      (page === "" && href === "index.html")
    ) {
      link.classList.add("active");
      link.classList.remove("text-muted");
    }
  });
}

/**
 * initLogout() - Logout Button Handler
 * -------------------------------------
 * PURPOSE: Handles user logout by clearing session and redirecting.
 * 
 * HOW IT WORKS:
 * 1. Finds the logout link (any link containing 'login.html' in href)
 * 2. Attaches click event listener
 * 3. On click: Prevents default navigation
 * 4. Removes 'eduManage_user' from localStorage (clears session)
 * 5. Redirects to login page
 */
function initLogout() {
  const logoutBtn = document.querySelector('a[href*="login.html"]');
  if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();  // Stop normal link behavior
      localStorage.removeItem("eduManage_user");  // Clear user session
      window.location.href = logoutBtn.getAttribute("href");
    });
  }
}

/**
 * initGlobalSearch() - Global Search Handler
 * -------------------------------------------
 * PURPOSE: Placeholder for global search functionality on dashboard.
 * 
 * HOW IT WORKS:
 * 1. Finds the search input element
 * 2. Listens for 'Enter' key press
 * 3. Currently shows alert (placeholder for future backend implementation)
 * 
 * NOTE: Full implementation would require backend search API or
 *       complex client-side indexing across all data.
 */
function initGlobalSearch() {
  const searchInput = document.querySelector(".search-input");
  if (searchInput) {
    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        alert(`Searching for: ${searchInput.value}
(Global search implementation requires backend or complex client-side indexing)`);
      }
    });
  }
}

// ============================================================================
// LOGIN / AUTHENTICATION
// ============================================================================

/**
 * initLogin() - Login Form Handler
 * ---------------------------------
 * PURPOSE: Handles user authentication via login form.
 * 
 * HOW IT WORKS:
 * 1. Gets login form and error message elements
 * 2. Attaches submit event listener to form
 * 3. On submit:
 *    a. Prevents default form submission
 *    b. Extracts email and password from inputs
 *    c. Validates against hardcoded credentials
 *    d. If valid: Stores user in localStorage, redirects to dashboard
 *    e. If invalid: Shows error message
 * 
 * VALID CREDENTIALS:
 * - admin@school.edu / admin123 (Role: Admin)
 * - teacher@school.edu / teacher123 (Role: Admin)
 * 
 * REMEMBER ME FEATURE:
 * - If checked: Saves email to 'eduManage_remember'
 * - On page load: Pre-fills email if previously saved
 */
function initLogin() {
  const loginForm = document.getElementById("loginForm");
  const errorMsg = document.getElementById("errorMessage");

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = loginForm.querySelector('input[type="email"]').value;
      const password = loginForm.querySelector('input[type="password"]').value;
      const rememberMe = document.getElementById("rememberMe").checked;

      if (
        (email === "admin@school.edu" && password === "admin123") ||
        (email === "teacher@school.edu" && password === "teacher123")
      ) {
        const user = { email, role: "Admin" };
        localStorage.setItem("eduManage_user", JSON.stringify(user));
        if (rememberMe) {
          localStorage.setItem("eduManage_remember", email);
        }
        window.location.href = "../index.html";
      } else {
        errorMsg.textContent =
          "Invalid email or password. Try the demo credentials.";
        errorMsg.style.display = "block";
      }
    });

    const savedEmail = localStorage.getItem("eduManage_remember");
    if (savedEmail) {
      loginForm.querySelector('input[type="email"]').value = savedEmail;
      document.getElementById("rememberMe").checked = true;
    }
  }
}

// ============================================================================
// DASHBOARD
// ============================================================================

/**
 * initDashboard() - Dashboard Initialization
 * -------------------------------------------
 * PURPOSE: Displays overview statistics and recent data on the main dashboard.
 * 
 * STATISTICS DISPLAYED:
 * 1. Total Students - Count of all students in system
 * 2. Active Courses - Count of courses with status 'Active'
 * 3. Pending Students - Students awaiting approval
 * 4. Today's Attendance - Percentage of students marked present today
 * 
 * DYNAMIC CONTENT:
 * - Welcome Message: Greets user by role (from localStorage)
 * - Class Cards: Shows up to 2 active courses with instructor info
 * - Recent Admissions Table: Last 5 enrolled students (newest first)
 * 
 * DATA SOURCES:
 * - eduManage_students (localStorage)
 * - eduManage_courses (localStorage)
 * - eduManage_attendance_v2 (localStorage)
 */
function initDashboard() {
  console.log("Initializing Dashboard components...");
  // Load data from localStorage
  const students = JSON.parse(
    localStorage.getItem("eduManage_students") || "[]",
  );
  const courses = JSON.parse(localStorage.getItem("eduManage_courses") || "[]");

  // Use new V2 structure for attendance
  const allAttendance = JSON.parse(
    localStorage.getItem("eduManage_attendance_v2") || "{}",
  );
  const todayStr = getTodayStr();
  const attendanceData = allAttendance[todayStr] || {};

  document.getElementById("totalStudents").textContent = students.length;
  document.getElementById("activeCourses").textContent = courses.filter(
    (c) => c.status === "Active",
  ).length;

  const pendingCount = students.filter((s) => s.status === "Pending").length;
  document.getElementById("pendingStudents").textContent = pendingCount;

  const presentCount = Object.values(attendanceData).filter(
    (status) => status === "present",
  ).length;
  const totalStudents = students.length > 0 ? students.length : 1;
  const avgAttendance = Math.round((presentCount / totalStudents) * 100);
  document.getElementById("todayAttendance").textContent = avgAttendance + "%";

  const user = JSON.parse(localStorage.getItem("eduManage_user"));
  if (user && user.email) {
    document.getElementById("welcomeMessage").textContent =
      `Welcome back, ${user.role}!`;
  }

  const classesGrid = document.getElementById("dashboardClassesGrid");
  if (classesGrid) {
    const activeCourses = courses
      .filter((c) => c.status === "Active")
      .slice(0, 2);

    if (activeCourses.length > 0) classesGrid.innerHTML = "";

    activeCourses.forEach((course) => {
      const div = document.createElement("div");
      div.className = "col-md-6";
      const initials = getInitials(course.instructor);

      let themeColor = "primary";
      if (course.theme === "orange") themeColor = "warning";
      if (course.theme === "green") themeColor = "success";
      if (course.theme === "pink") themeColor = "danger";
      if (course.theme === "purple") themeColor = "info";

      const borderStyle = `style="border-left-color: var(--${themeColor});"`;
      const badgeClass = `bg-${themeColor} text-${themeColor}`;
      const avatarClass = `bg-${themeColor} bg-opacity-20 text-${themeColor}`;

      div.innerHTML = `
            <div class="class-card" ${borderStyle}>
              <div class="d-flex justify-content-between mb-3">
                <span class="badge ${badgeClass} bg-opacity-10">${course.code.split("-")[0]}</span>
                <i class="bi bi-three-dots text-secondary"></i>
              </div>
              <h5 class="fw-bold mb-1">${course.title}</h5>
              <p class="text-secondary small mb-4">Class Room 302 • 10:00 AM</p>
              <div class="d-flex align-items-center gap-2">
                <div class="avatar ${avatarClass}">${initials}</div>
                <div class="small fw-medium">${course.instructor}</div>
              </div>
            </div>`;
      classesGrid.appendChild(div);
    });
  }

  const recentTable = document.getElementById("dashboardRecentStudents");
  if (recentTable) {
    recentTable.innerHTML = "";
    const recentStudents = students.slice().reverse().slice(0, 5);

    if (recentStudents.length === 0) {
      recentTable.innerHTML =
        '<tr><td colspan="5" class="text-center text-secondary py-4">No recent admissions</td></tr>';
    }

    recentStudents.forEach((student) => {
      const tr = document.createElement("tr");
      const initials = getInitials(student.firstName + " " + student.lastName);
      const statusClass =
        student.status === "Active" ? "status-active" : "status-warning";

      tr.innerHTML = `
            <td>
              <div class="d-flex align-items-center gap-3">
                <div class="avatar bg-primary text-white">${initials}</div>
                <div class="fw-medium">${student.firstName} ${student.lastName}</div>
              </div>
            </td>
            <td class="text-secondary">${student.id}</td>
            <td>${student.class}</td>
            <td class="text-secondary">${student.enrollDate}</td>
            <td><span class="status-badge ${statusClass}">${student.status}</span></td>`;
      recentTable.appendChild(tr);
    });
  }
}

// ============================================================================
// STUDENT LIST
// ============================================================================

/**
 * initStudentList() - Student List Page Handler
 * -----------------------------------------------
 * PURPOSE: Displays, filters, and manages the student list with CRUD operations.
 * 
 * FEATURES:
 * 1. Display all students in a data table
 * 2. Real-time search (by name, ID, or email)
 * 3. Filter by class
 * 4. Filter by status (Active, Pending, Inactive)
 * 5. Sort by name (A-Z, Z-A) or date (Newest)
 * 6. View, Edit, Delete actions for each student
 * 
 * INNER FUNCTIONS:
 * - updateListStats(): Updates counter badges (total, active, pending, inactive)
 * - renderTable(data): Renders filtered student data into HTML table
 * - attachActionEvents(): Binds click handlers to View/Edit/Delete buttons
 * - deleteStudent(id): Removes student from localStorage
 * - filterAndRender(): Applies all filters and re-renders table
 * 
 * TABLE COLUMNS:
 * Checkbox | Student Info | ID | Class | Advisor | Phone | Enroll Date | Status | Actions
 */
function initStudentList() {
  // Load students from localStorage
  const students = JSON.parse(
    localStorage.getItem("eduManage_students") || "[]",
  );
  const tbody = document.querySelector("table tbody");

  // Filter Elements - Get references to filter inputs
  const searchInput = document.getElementById("studentSearch");
  const filterClass = document.getElementById("studentFilterClass");
  const filterStatus = document.getElementById("studentFilterStatus");
  const filterSort = document.getElementById("studentFilterSort");

  function updateListStats() {
    const currentStudents = JSON.parse(
      localStorage.getItem("eduManage_students") || "[]",
    );
    if (document.getElementById("totalStudentsList")) {
      document.getElementById("totalStudentsList").textContent =
        currentStudents.length;
      document.getElementById("activeStudentsList").textContent =
        currentStudents.filter((s) => s.status === "Active").length;
      document.getElementById("pendingStudentsList").textContent =
        currentStudents.filter((s) => s.status === "Pending").length;
      document.getElementById("inactiveStudentsList").textContent =
        currentStudents.filter(
          (s) => s.status === "Absent" || s.status === "Inactive",
        ).length;
    }
  }

  updateListStats();

  function renderTable(data) {
    tbody.innerHTML = "";
    if (data.length === 0) {
      tbody.innerHTML =
        '<tr><td colspan="9" class="text-center py-4">No students found</td></tr>';
      return;
    }

    data.forEach((student) => {
      const tr = document.createElement("tr");

      let statusBadge = "";
      if (student.status === "Active")
        statusBadge = '<span class="badge badge-active">Active</span>';
      else if (student.status === "Absent")
        statusBadge = '<span class="badge badge-inactive">Absent</span>';
      else statusBadge = '<span class="badge badge-pending">Pending</span>';

      const initials = getInitials(student.firstName + " " + student.lastName);
      const avatarHtml = student.photo 
        ? `<img src="${student.photo}" class="avatar" style="object-fit: cover;" alt="${student.firstName}">`
        : `<div class="avatar" style="background: linear-gradient(135deg, ${student.avatarColor || "#4361ee"}, #3f37c9);">${initials}</div>`;

      tr.innerHTML = `
                <td><input type="checkbox" class="form-check-input"></td>
                <td>
                    <div class="student-info">
                        ${avatarHtml}
                        <div>
                            <div class="student-name">${student.firstName} ${student.lastName}</div>
                            <div class="student-email">${student.email || "N/A"}</div>
                        </div>
                    </div>
                </td>
                <td class="text-secondary fw-medium">${student.id}</td>
                <td>${student.class || "N/A"}</td>
                <td>Dr. Linda Johnson</td>
                <td class="text-secondary">${student.phone}</td>
                <td class="text-secondary">${student.enrollDate}</td>
                <td>${statusBadge}</td>
                <td class="text-end">
                    <button class="table-action-btn view" title="View" data-id="${student.id}"><i class="bi bi-eye"></i></button>
                    <button class="table-action-btn edit" title="Edit" data-id="${student.id}"><i class="bi bi-pencil"></i></button>
                    <button class="table-action-btn delete" title="Delete" data-id="${student.id}"><i class="bi bi-trash-fill"></i></button>
                </td>
            `;
      tbody.appendChild(tr);
    });

    attachActionEvents();
  }

  function attachActionEvents() {
    document.querySelectorAll(".table-action-btn.delete").forEach((btn) => {
      btn.removeAttribute("disabled");
      btn.addEventListener("click", function () {
        const id = this.getAttribute("data-id");
        if (confirm("Are you sure you want to delete this student?")) {
          deleteStudent(id);
        }
      });
    });

    document.querySelectorAll(".table-action-btn.view").forEach((btn) => {
      btn.removeAttribute("disabled");
      btn.addEventListener("click", function () {
        const id = this.getAttribute("data-id");
        window.location.href = `student-detail.html?id=${id}`;
      });
    });

    document.querySelectorAll(".table-action-btn.edit").forEach((btn) => {
      btn.removeAttribute("disabled");
      btn.addEventListener("click", function () {
        const id = this.getAttribute("data-id");
        window.location.href = `student-enroll.html?id=${id}`;
      });
    });
  }

  function deleteStudent(id) {
    const updatedStudents = JSON.parse(
      localStorage.getItem("eduManage_students") || "[]",
    ).filter((s) => s.id !== id);
    localStorage.setItem("eduManage_students", JSON.stringify(updatedStudents));
    updateListStats();
    filterAndRender();
  }

  function filterAndRender() {
    let filtered = JSON.parse(
      localStorage.getItem("eduManage_students") || "[]",
    );

    if (searchInput && searchInput.value) {
      const term = searchInput.value.toLowerCase();
      filtered = filtered.filter(
        (s) =>
          s.firstName.toLowerCase().includes(term) ||
          s.lastName.toLowerCase().includes(term) ||
          s.id.toLowerCase().includes(term) ||
          (s.email && s.email.toLowerCase().includes(term)),
      );
    }

    if (filterClass && filterClass.value !== "All Classes") {
      filtered = filtered.filter(
        (s) => s.class && s.class.includes(filterClass.value),
      );
    }

    if (filterStatus && filterStatus.value !== "All Status") {
      filtered = filtered.filter((s) => s.status === filterStatus.value);
    }

    if (filterSort) {
      const sortVal = filterSort.value;
      if (sortVal.includes("Name (A-Z)")) {
        filtered.sort((a, b) => a.firstName.localeCompare(b.firstName));
      } else if (sortVal.includes("Name (Z-A)")) {
        filtered.sort((a, b) => b.firstName.localeCompare(a.firstName));
      } else if (sortVal.includes("Newest")) {
        filtered.sort(
          (a, b) => new Date(b.enrollDate) - new Date(a.enrollDate),
        );
      }
    }

    renderTable(filtered);
  }

  if (searchInput) searchInput.addEventListener("input", filterAndRender);
  if (filterClass) filterClass.addEventListener("change", filterAndRender);
  if (filterStatus) filterStatus.addEventListener("change", filterAndRender);
  if (filterSort) filterSort.addEventListener("change", filterAndRender);

  filterAndRender();
}

// ============================================================================
// STUDENT ENROLLMENT (ADD / EDIT)
// ============================================================================

/**
 * initEnrollment() - Student Enrollment Form Handler
 * ----------------------------------------------------
 * PURPOSE: Handles both adding new students and editing existing students.
 * 
 * MODE DETECTION:
 * - ADD MODE: URL has no 'id' parameter (e.g., student-enroll.html)
 * - EDIT MODE: URL has 'id' parameter (e.g., student-enroll.html?id=STD-2024-001)
 * 
 * FEATURES:
 * 1. Photo upload with preview (uses FileReader API)
 * 2. Form validation (HTML5 required attributes)
 * 3. Duplicate ID check for new students
 * 4. Pre-fills form when editing existing student
 * 
 * FORM FIELDS:
 * - Personal: firstName, lastName, studentId, dob, gender
 * - Contact: personalEmail, phone
 * - Academic: gradeLevel, program, enrollmentDate
 * - Emergency: emergencyName, emergencyRelationship, emergencyPhone
 * - Photo: photoUpload (optional)
 * 
 * ON SUBMIT:
 * - Creates student object from form data
 * - For new: Validates unique ID, adds to array
 * - For edit: Updates existing student in array
 * - Saves to localStorage and redirects to student list
 */
function initEnrollment() {
  const form = document.getElementById("enrollmentForm");
  const photoInput = document.getElementById("photoUpload");
  const photoPreview = document.getElementById("photoPreview");
  const urlParams = new URLSearchParams(window.location.search);  // Parse URL query string
  const editId = urlParams.get("id");  // Get 'id' param if exists (edit mode)
  const titleEl = document.querySelector(".page-title");
  const submitBtn = document.querySelector('button[type="submit"]');
  let uploadedPhoto = null;

  if (editId) {
    if (titleEl) titleEl.textContent = "Edit Student";
    if (submitBtn)
      submitBtn.innerHTML =
        '<i class="bi bi-check-circle-fill me-2"></i> Update Student';

    const students = JSON.parse(
      localStorage.getItem("eduManage_students") || "[]",
    );
    const student = students.find((s) => s.id === editId);

    if (student) {
      form.querySelector('[name="firstName"]').value = student.firstName || "";
      form.querySelector('[name="lastName"]').value = student.lastName || "";
      form.querySelector('[name="studentId"]').value = student.id || "";
      form.querySelector('[name="studentId"]').setAttribute("readonly", true);
      form.querySelector('[name="personalEmail"]').value = student.email || "";
      form.querySelector('[name="phone"]').value = student.phone || "";
      form.querySelector('[name="enrollmentDate"]').value =
        student.enrollDate || "";
      form.querySelector('[name="dob"]').value = student.dob || "";
      form.querySelector('[name="gender"]').value = student.gender || "";

      if (student.class) {
        const parts = student.class.split(" - ");
        if (parts[0])
          form.querySelector('[name="gradeLevel"]').value = parts[0];
        if (parts[1]) form.querySelector('[name="program"]').value = parts[1];
      }

      // Populate emergency contact fields if available, or remove required attribute
      const emergencyName = form.querySelector('[name="emergencyName"]');
      const emergencyRelationship = form.querySelector('[name="emergencyRelationship"]');
      const emergencyPhone = form.querySelector('[name="emergencyPhone"]');
      
      if (student.emergencyName) {
        emergencyName.value = student.emergencyName;
      } else {
        emergencyName.removeAttribute("required");
      }
      
      if (student.emergencyRelationship) {
        emergencyRelationship.value = student.emergencyRelationship;
      } else {
        emergencyRelationship.removeAttribute("required");
      }
      
      if (student.emergencyPhone) {
        emergencyPhone.value = student.emergencyPhone;
      } else {
        emergencyPhone.removeAttribute("required");
      }

      // Load existing photo if available
      if (student.photo && photoPreview) {
        photoPreview.src = student.photo;
        uploadedPhoto = student.photo;
      }
    }
  }

  if (photoInput && photoPreview) {
    photoInput.addEventListener("change", function (e) {
      if (e.target.files && e.target.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
          photoPreview.src = e.target.result;
          uploadedPhoto = e.target.result;
        };
        reader.readAsDataURL(e.target.files[0]);
      }
    });
  }

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const formData = new FormData(form);
      const students = JSON.parse(
        localStorage.getItem("eduManage_students") || "[]",
      );

      const studentData = {
        id: formData.get("studentId"),
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        email: formData.get("personalEmail"),
        phone: formData.get("phone"),
        dob: formData.get("dob"),
        gender: formData.get("gender"),
        class:
          formData.get("gradeLevel") +
          (formData.get("program") ? " - " + formData.get("program") : ""),
        enrollDate: formData.get("enrollmentDate"),
        emergencyName: formData.get("emergencyName"),
        emergencyRelationship: formData.get("emergencyRelationship"),
        emergencyPhone: formData.get("emergencyPhone"),
        photo: uploadedPhoto,
        status: "Active",
        avatarColor: getRandomColor(),
      };

      if (editId) {
        const index = students.findIndex((s) => s.id === editId);
        if (index !== -1) {
          studentData.status = students[index].status;
          studentData.avatarColor = students[index].avatarColor;
          // Preserve existing photo if no new photo uploaded
          if (!uploadedPhoto && students[index].photo) {
            studentData.photo = students[index].photo;
          }
          students[index] = studentData;
          localStorage.setItem("eduManage_students", JSON.stringify(students));
          alert("Student updated successfully!");
        }
      } else {
        if (students.some((s) => s.id === studentData.id)) {
          alert("Student ID already exists!");
          return;
        }
        students.push(studentData);
        localStorage.setItem("eduManage_students", JSON.stringify(students));
        alert("Student enrolled successfully!");
      }

      window.location.href = "student-list.html";
    });
  }
}

// ============================================================================
// COURSE MANAGEMENT
// ============================================================================

/**
 * initCourses() - Course Management Page Handler
 * ------------------------------------------------
 * PURPOSE: Manages courses with card-based UI and CRUD operations.
 * 
 * FEATURES:
 * 1. Display courses as styled cards with color themes
 * 2. Search courses by title, code, or instructor
 * 3. Filter by status (Active, Upcoming, Completed)
 * 4. Filter by subject
 * 5. Add new course via modal
 * 6. Edit existing course via modal
 * 7. Delete course with confirmation
 * 
 * INNER FUNCTIONS:
 * - renderCourses(data): Creates course cards from data array
 * - attachCourseEvents(): Binds edit/delete button handlers
 * - filterCourses(): Applies search and filter criteria
 * 
 * COURSE CARD DISPLAYS:
 * - Header: Code badge, title, edit/delete buttons
 * - Body: Student count, hours, description
 * - Footer: Instructor avatar, status badge, view button
 * 
 * MODAL: Bootstrap Modal for add/edit course form
 */
function initCourses() {
  const courses = JSON.parse(localStorage.getItem("eduManage_courses") || "[]");
  const grid = document.getElementById("coursesGrid");  // Container for course cards
  const modalEl = document.getElementById("courseModal");
  const modal = new bootstrap.Modal(modalEl);  // Bootstrap Modal instance
  let editId = null;  // Tracks which course is being edited (null = add mode)

  // Filters
  const searchInput = document.getElementById("filterCourseSearch");
  const statusSelect = document.getElementById("filterCourseStatus");
  const gradeSelect = document.getElementById("filterCourseGrade"); // Note: Current data lacks explicit grade
  const subjectSelect = document.getElementById("filterCourseSubject");
  const btnFilter = document.getElementById("btnCourseFilter");

  function renderCourses(data) {
    grid.innerHTML = "";
    if (data.length === 0) {
      grid.innerHTML =
        '<div class="col-12 text-center py-5">No courses found</div>';
      return;
    }

    data.forEach((course) => {
      const col = document.createElement("div");
      col.className = "col-md-6 col-lg-4";
      col.innerHTML = `
                <div class="course-card">
                    <div class="course-header ${course.theme || "blue"}">
                        <div>
                            <div class="course-code">${course.code}</div>
                            <h5 class="course-title">${course.title}</h5>
                        </div>
                        <div class="text-end">
                            <button class="course-action-btn edit-course" title="Edit" data-id="${course.id}"><i class="bi bi-pencil"></i></button>
                            <button class="course-action-btn delete-course" title="Delete" data-id="${course.id}"><i class="bi bi-trash"></i></button>
                        </div>
                    </div>
                    <div class="course-body">
                        <div class="course-meta">
                            <div class="meta-item"><i class="bi bi-people-fill"></i> <span>${course.students} Students</span></div>
                            <div class="meta-item"><i class="bi bi-clock-fill"></i> <span>${course.hours} Hours</span></div>
                        </div>
                        <p class="course-description">${course.description || "No description available."}</p>
                        <div class="course-teacher">
                            <div class="teacher-avatar">${getInitials(course.instructor)}</div>
                            <div class="teacher-info">
                                <small>Instructor</small>
                                <div><strong>${course.instructor}</strong></div>
                            </div>
                        </div>
                        <div class="course-footer d-flex justify-content-between align-items-center mt-3">
                            <span class="badge-status badge-${course.status.toLowerCase()}">${course.status}</span>
                            <button class="btn-view">View Details</button>
                        </div>
                    </div>
                </div>
            `;
      grid.appendChild(col);
    });

    attachCourseEvents();
  }

  function attachCourseEvents() {
    document.querySelectorAll(".delete-course").forEach((btn) => {
      btn.addEventListener("click", function () {
        if (confirm("Delete this course?")) {
          const id = this.getAttribute("data-id");
          const newCourses = JSON.parse(
            localStorage.getItem("eduManage_courses") || "[]",
          ).filter((c) => c.id !== id);
          localStorage.setItem("eduManage_courses", JSON.stringify(newCourses));
          window.location.reload();
        }
      });
    });

    document.querySelectorAll(".edit-course").forEach((btn) => {
      btn.addEventListener("click", function () {
        const id = this.getAttribute("data-id");
        const currentCourses = JSON.parse(
          localStorage.getItem("eduManage_courses") || "[]",
        );
        const course = currentCourses.find((c) => c.id === id);
        if (course) {
          editId = id;
          document.getElementById("courseModalTitle").textContent =
            "Edit Course";
          document.getElementById("courseCode").value = course.code;
          document.getElementById("courseTitle").value = course.title;
          document.getElementById("courseTeacher").value = course.instructor;
          document.getElementById("courseDescription").value =
            course.description || "";
          modal.show();
        }
      });
    });
  }

  function filterCourses() {
    let filtered = JSON.parse(
      localStorage.getItem("eduManage_courses") || "[]",
    );

    const term = searchInput ? searchInput.value.toLowerCase() : "";
    const status = statusSelect ? statusSelect.value : "All";
    const grade = gradeSelect ? gradeSelect.value : "All";
    const subject = subjectSelect ? subjectSelect.value : "All";

    if (term) {
      filtered = filtered.filter(
        (c) =>
          c.title.toLowerCase().includes(term) ||
          c.code.toLowerCase().includes(term) ||
          c.instructor.toLowerCase().includes(term),
      );
    }

    if (status !== "All" && status !== "All Status") {
      filtered = filtered.filter((c) => c.status === status);
    }

    if (subject !== "All" && subject !== "All Subjects") {
      filtered = filtered.filter(
        (c) =>
          c.title.includes(subject) ||
          (c.description && c.description.includes(subject)),
      );
    }

    // Grade filter is ignored for now as course data doesn't strictly have grade fields
    // In a real app, we'd add a grade field to the course object.

    renderCourses(filtered);
  }

  // Initial Render
  renderCourses(courses);

  // Event Listeners for Filters
  if (searchInput) searchInput.addEventListener("input", filterCourses);
  if (statusSelect) statusSelect.addEventListener("change", filterCourses);
  if (gradeSelect) gradeSelect.addEventListener("change", filterCourses);
  if (subjectSelect) subjectSelect.addEventListener("change", filterCourses);
  if (btnFilter) btnFilter.addEventListener("click", filterCourses);

  const saveBtn = document.getElementById("saveCourseBtn");
  if (saveBtn) {
    saveBtn.addEventListener("click", () => {
      const title = document.getElementById("courseTitle").value;
      const code = document.getElementById("courseCode").value;

      if (!title || !code) {
        alert("Please fill required fields");
        return;
      }

      const courseData = {
        id: editId || "CRSE-" + Date.now(),
        code: code,
        title: title,
        students: 0,
        hours: 40,
        instructor: document.getElementById("courseTeacher").value,
        status: "Active",
        theme: getRandomTheme(),
        description: document.getElementById("courseDescription").value,
      };

      if (editId) {
        const index = courses.findIndex((c) => c.id === editId);
        if (index !== -1) {
          courseData.theme = courses[index].theme;
          courseData.students = courses[index].students;
          courses[index] = courseData;
        }
      } else {
        courses.push(courseData);
      }

      localStorage.setItem("eduManage_courses", JSON.stringify(courses));
      modal.hide();
      editId = null;
      window.location.reload();
    });
  }

  const addBtn = document.querySelector(".btn-add-course");
  if (addBtn) {
    addBtn.addEventListener("click", () => {
      editId = null;
      document.getElementById("courseModalTitle").textContent =
        "Add New Course";
      document.getElementById("courseForm").reset();
      modal.show();
    });
  }

  document.getElementById("totalCourses").textContent = courses.length;
  document.getElementById("activeCourses").textContent = courses.filter(
    (c) => c.status === "Active",
  ).length;
}

// ============================================================================
// ATTENDANCE TRACKING
// ============================================================================

/**
 * initAttendance() - Attendance Management Page Handler
 * -------------------------------------------------------
 * PURPOSE: Tracks daily student attendance with date-based records.
 * 
 * DATA STRUCTURE (eduManage_attendance_v2):
 * {
 *   "2024-01-15": {
 *     "STD-2024-001": "present",
 *     "STD-2024-002": "absent",
 *     "STD-2024-003": "late"
 *   },
 *   "2024-01-16": { ... }
 * }
 * 
 * FEATURES:
 * 1. Date picker for viewing/editing historical attendance
 * 2. Filter by class
 * 3. Three status buttons per student: Present ✅, Absent ❌, Late ⏰
 * 4. "Mark All Present" bulk action
 * 5. Export to CSV functionality
 * 6. Real-time statistics (present, absent, late, percentage)
 * 
 * INNER FUNCTION - loadAttendance():
 * - Reads students and attendance data
 * - Filters by selected date and class
 * - Renders table rows with status buttons
 * - Updates statistics
 * 
 * ATTENDANCE CALCULATION:
 * - Present = 100% credit
 * - Late = 50% credit
 * - Absent = 0% credit
 */
function initAttendance() {
  // Get references to filter and action elements
  const filterDate = document.getElementById("filterDate");
  const filterClass = document.getElementById("filterClass");
  const btnApplyFilter = document.getElementById("btnApplyFilter");
  const btnMarkAllPresent = document.getElementById("btnMarkAllPresent");
  const btnExport = document.getElementById("btnExport");
  const tbody = document.getElementById("attendanceTbody");

  // Set default date to today if empty
  if (filterDate && !filterDate.value) {
    filterDate.value = getTodayStr();
  }

  // Populate class filter options
  populateClassFilter();

  function loadAttendance() {
    if (!tbody) return;
    tbody.innerHTML = "";

    const students = JSON.parse(
      localStorage.getItem("eduManage_students") || "[]",
    );
    const allAttendance = JSON.parse(
      localStorage.getItem("eduManage_attendance_v2") || "{}",
    );
    const selectedDate = filterDate ? filterDate.value : getTodayStr();
    const selectedClass = filterClass ? filterClass.value : "All";

    // Get attendance record for the selected date
    const dailyRecord = allAttendance[selectedDate] || {};

    // Filter students - Show ALL students for attendance tracking
    const filteredStudents = students.filter((s) => {
      // Include all students regardless of status for attendance tracking
      if (
        selectedClass !== "All" &&
        selectedClass !== "All Classes" &&
        !s.class.includes(selectedClass.split(" - ")[0])
      )
        return false;
      return true;
    });

    if (filteredStudents.length === 0) {
      tbody.innerHTML =
        '<tr><td colspan="6" class="text-center py-4">No students found for this class</td></tr>';
      updateAttendanceStats(0);
      updateStudentCountBadge(0);
      return;
    }

    // Update student count badge
    updateStudentCountBadge(filteredStudents.length);

    filteredStudents.forEach((student) => {
      const tr = document.createElement("tr");
      tr.dataset.id = student.id;

      const initials = getInitials(student.firstName + " " + student.lastName);
      const status = dailyRecord[student.id]; // Status for this specific date

      const presentActive = status === "present" ? "active" : "";
      const absentActive = status === "absent" ? "active" : "";
      const lateActive = status === "late" ? "active" : "";

      let badgeClass = "bg-secondary";
      let badgeText = "Pending";
      let timeText = "-";

      if (status === "present") {
        badgeClass = "bg-success";
        badgeText = "Present";
        timeText = "08:00 AM";
      } else if (status === "absent") {
        badgeClass = "bg-danger";
        badgeText = "Absent";
      } else if (status === "late") {
        badgeClass = "bg-warning";
        badgeText = "Late";
        timeText = "08:15 AM";
      }

      tr.innerHTML = `
                <td>
                    <div class="student-info">
                        <div class="student-avatar" style="background: linear-gradient(135deg, ${student.avatarColor || "#4361ee"}, #3f37c9);">${initials}</div>
                        <div>
                            <div><strong>${student.firstName} ${student.lastName}</strong></div>
                        </div>
                    </div>
                </td>
                <td class="text-secondary fw-medium">${student.id}</td>
                <td>${student.class || "N/A"}</td>
                <td class="text-secondary small">${student.email}</td>
                <td class="attendance-status">
                    <button class="btn-status btn-present ${presentActive}" data-action="present" title="Mark Present"><i class="bi bi-check-circle-fill"></i></button>
                    <button class="btn-status btn-absent ${absentActive}" data-action="absent" title="Mark Absent"><i class="bi bi-x-circle-fill"></i></button>
                    <button class="btn-status btn-late ${lateActive}" data-action="late" title="Mark Late"><i class="bi bi-clock-fill"></i></button>
                </td>
                <td class="time-log text-secondary">${timeText}</td>
                <td><span class="badge ${badgeClass}">${badgeText}</span></td>
             `;
      tbody.appendChild(tr);
    });

    updateAttendanceStats(filteredStudents.length);
  }

  // Initial Load
  loadAttendance();

  // Filter Event
  if (btnApplyFilter) {
    btnApplyFilter.addEventListener("click", loadAttendance);
  }

  // Mark All Present Event
  if (btnMarkAllPresent) {
    btnMarkAllPresent.addEventListener("click", () => {
      const selectedDate = filterDate.value;
      const rows = tbody.querySelectorAll("tr");
      const allAttendance = JSON.parse(
        localStorage.getItem("eduManage_attendance_v2") || "{}",
      );

      if (!allAttendance[selectedDate]) allAttendance[selectedDate] = {};

      rows.forEach((row) => {
        const studentId = row.dataset.id;
        allAttendance[selectedDate][studentId] = "present";
      });

      localStorage.setItem(
        "eduManage_attendance_v2",
        JSON.stringify(allAttendance),
      );
      loadAttendance(); // Reload to update UI
      alert("All listed students marked as present.");
    });
  }

  // Export Event
  if (btnExport) {
    btnExport.addEventListener("click", () => {
      const selectedDate = filterDate.value;
      const allAttendance = JSON.parse(
        localStorage.getItem("eduManage_attendance_v2") || "{}",
      );
      const dailyData = allAttendance[selectedDate] || {};
      const students = JSON.parse(
        localStorage.getItem("eduManage_students") || "[]",
      );

      let csvContent =
        "data:text/csv;charset=utf-8,Student ID,Name,Class,Status,Date,Time\n";

      students.forEach((s) => {
        const attendanceStatus = dailyData[s.id] || "Not Marked";
        let timeEntry = "";

        if (attendanceStatus === "present") {
          timeEntry = "08:00 AM";
        } else if (attendanceStatus === "late") {
          timeEntry = "08:15 AM";
        }

        csvContent += `"${s.id}","${s.firstName} ${s.lastName}","${s.class || 'N/A'}","${attendanceStatus}","${selectedDate}","${timeEntry}"\n`;
      });

      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `attendance_report_${selectedDate}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      alert(`Attendance report exported successfully!\nDate: ${selectedDate}\nTotal Students: ${students.length}`);
    });
  }

  // Individual Status Click
  if (tbody) {
    tbody.addEventListener("click", (e) => {
      const btn = e.target.closest(".btn-status");
      if (!btn) return;

      const action = btn.dataset.action;
      const row = btn.closest("tr");
      const studentId = row.dataset.id;
      const selectedDate = filterDate.value;

      // Save to LocalStorage V2
      const allAttendance = JSON.parse(
        localStorage.getItem("eduManage_attendance_v2") || "{}",
      );
      if (!allAttendance[selectedDate]) allAttendance[selectedDate] = {};

      allAttendance[selectedDate][studentId] = action;
      localStorage.setItem(
        "eduManage_attendance_v2",
        JSON.stringify(allAttendance),
      );

      // Reload just to refresh specific row UI logic or just re-render
      loadAttendance();
    });
  }
}

/**
 * populateClassFilter() - Dynamic Class Dropdown
 * ------------------------------------------------
 * PURPOSE: Populates the class filter dropdown with unique class values
 *          from existing student data.
 * 
 * HOW IT WORKS:
 * 1. Gets all students from localStorage
 * 2. Extracts unique class names using Set
 * 3. Clears existing options (except "All Classes")
 * 4. Adds sorted class names as new options
 */
function populateClassFilter() {
  const filterClass = document.getElementById("filterClass");
  if (!filterClass) return;

  const students = JSON.parse(
    localStorage.getItem("eduManage_students") || "[]",
  );

  // Get unique classes
  const classes = new Set();
  students.forEach(student => {
    if (student.class) {
      classes.add(student.class);
    }
  });

  // Clear existing options except "All Classes"
  while (filterClass.options.length > 1) {
    filterClass.remove(1);
  }

  // Add class options
  Array.from(classes).sort().forEach(className => {
    const option = document.createElement("option");
    option.value = className;
    option.textContent = className;
    filterClass.appendChild(option);
  });
}

/**
 * updateStudentCountBadge(count) - Updates Student Count Display
 * ---------------------------------------------------------------
 * PURPOSE: Shows the number of students currently displayed in attendance table.
 * 
 * @param {number} count - Number of students to display
 */
function updateStudentCountBadge(count) {
  const badge = document.getElementById("studentCountBadge");
  if (badge) {
    badge.textContent = `${count} Student${count !== 1 ? 's' : ''}`;
  }
}

/**
 * updateAttendanceStats(totalVisible) - Updates Attendance Statistics
 * ---------------------------------------------------------------------
 * PURPOSE: Calculates and displays attendance summary (present, absent, late, %).
 * 
 * HOW IT WORKS:
 * 1. Loops through all table rows
 * 2. Checks which status button is active
 * 3. Counts present, absent, late, pending
 * 4. Calculates percentage: (present + late*0.5) / total * 100
 * 
 * @param {number} totalVisible - Total number of students displayed
 */
function updateAttendanceStats(totalVisible) {
  const tbody = document.getElementById("attendanceTbody");
  if (!tbody) return;

  const rows = tbody.querySelectorAll("tr");
  let present = 0;
  let absent = 0;
  let late = 0;
  let pending = 0;

  rows.forEach((row) => {
    if (row.querySelector(".btn-present.active")) present++;
    else if (row.querySelector(".btn-absent.active")) absent++;
    else if (row.querySelector(".btn-late.active")) late++;
    else pending++;
  });

  if (document.getElementById("attendancePresent")) {
    document.getElementById("attendancePresent").textContent = present;
    document.getElementById("attendanceAbsent").textContent = absent;
    document.getElementById("attendanceLate").textContent = late;

    // Calculate attendance percentage (present + half late count as full attendance)
    const total = totalVisible !== undefined ? totalVisible : rows.length;
    const attendanceScore = present + (late * 0.5); // Late students get half credit
    const avg = total > 0 ? Math.round((attendanceScore / total) * 100) : 0;
    document.getElementById("attendanceAverage").textContent = avg + "%";
  }
}

// ============================================================================
// STUDENT DETAIL VIEW
// ============================================================================

/**
 * initStudentDetail() - Student Profile Page Handler
 * ----------------------------------------------------
 * PURPOSE: Displays detailed information for a single student.
 * 
 * URL PARAMETER:
 * - student-detail.html?id=STD-2024-001
 * - If no ID provided, shows first student in list
 * 
 * DISPLAYS:
 * 1. Student name and ID
 * 2. Status badge (Active, Inactive, Pending)
 * 3. Attendance history (last 5 days)
 * 
 * ATTENDANCE HISTORY:
 * - Shows date and status for last 5 recorded days
 * - Color-coded: Green=Present, Red=Absent, Yellow=Late
 */
function initStudentDetail() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");  // Get student ID from URL
  const students = JSON.parse(
    localStorage.getItem("eduManage_students") || "[]",
  );
  const allAttendance = JSON.parse(
    localStorage.getItem("eduManage_attendance_v2") || "{}",
  );

  let student = students.find((s) => s.id === id);
  if (!student && id) {
    alert("Student not found!");
    return;
  } else if (!student) {
    student = students[0];
  }

  if (student) {
    const nameEl = document.querySelector(".profile-header h2");
    if (nameEl) nameEl.textContent = `${student.firstName} ${student.lastName}`;

    const idContainer = document.querySelector(
      ".profile-header .text-secondary span",
    );
    if (idContainer) idContainer.textContent = student.id;

    const statusBadge = document.querySelector(".profile-status-badge");
    if (statusBadge) statusBadge.textContent = student.status;

    // Improve Interaction: Show Attendance History in Notes Card
    const notesCardBody = document.querySelector(
      ".info-card .card-body .bg-light",
    );
    if (notesCardBody) {
      let historyHtml =
        '<h6 class="fw-bold mb-2">Recent Attendance</h6><ul class="list-unstyled mb-0 small">';
      const dates = Object.keys(allAttendance).sort().reverse().slice(0, 5); // Last 5 days

      let hasHistory = false;
      if (dates.length > 0) {
        dates.forEach((date) => {
          const status = allAttendance[date][student.id];
          if (status) {
            hasHistory = true;
            let colorClass = "text-secondary";
            if (status === "present") colorClass = "text-success";
            else if (status === "absent") colorClass = "text-danger";
            else if (status === "late") colorClass = "text-warning";

            historyHtml += `<li class="d-flex justify-content-between border-bottom py-1">
                            <span>${date}</span>
                            <span class="fw-bold ${colorClass} text-capitalize">${status}</span>
                        </li>`;
          }
        });
      }

      if (!hasHistory) {
        historyHtml +=
          '<li class="text-muted">No recent attendance records found.</li>';
      }

      historyHtml += "</ul>";
      notesCardBody.innerHTML = historyHtml;
      notesCardBody.classList.remove("text-secondary");
    }
  }
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * getRandomColor() - Random Avatar Color Generator
 * -------------------------------------------------
 * PURPOSE: Returns a random hex color for student avatars.
 * 
 * @returns {string} - Hex color code (e.g., "#4361ee")
 */
function getRandomColor() {
  const colors = ["#4361ee", "#3f37c9", "#f72585", "#4cc9f0", "#7209b7"];
  return colors[Math.floor(Math.random() * colors.length)];
}

/**
 * getRandomTheme() - Random Course Theme Generator
 * -------------------------------------------------
 * PURPOSE: Returns a random theme name for course card styling.
 * 
 * @returns {string} - Theme name (e.g., "blue", "purple")
 */
function getRandomTheme() {
  const themes = ["blue", "purple", "pink", "green", "orange", "teal"];
  return themes[Math.floor(Math.random() * themes.length)];
}

/**
 * getInitials(name) - Extract Initials from Name
 * ------------------------------------------------
 * PURPOSE: Converts full name to initials for avatar display.
 * 
 * EXAMPLES:
 * - "John Doe" → "JD"
 * - "Emma Wilson" → "EW"
 * - "Michael" → "M"
 * - null/undefined → "??"
 * 
 * @param {string} name - Full name
 * @returns {string} - 1-2 character initials (uppercase)
 */
function getInitials(name) {
  if (!name) return "??";
  return name
    .split(" ")           // Split by spaces
    .map((n) => n[0])     // Get first letter of each word
    .join("")             // Join letters
    .substring(0, 2)      // Take first 2 characters
    .toUpperCase();       // Convert to uppercase
}

/**
 * getTodayStr() - Get Today's Date as String
 * -------------------------------------------
 * PURPOSE: Returns current date in YYYY-MM-DD format for attendance keys.
 * 
 * @returns {string} - Date string (e.g., "2024-01-15")
 */
function getTodayStr() {
  return new Date().toISOString().split("T")[0];
}
