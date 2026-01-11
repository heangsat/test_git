/**
 * EduManage - Main JavaScript File
 * Handles logic for Login, Dashboard, Student List, and Enrollment.
 * Uses localStorage for data persistence.
 */

document.addEventListener('DOMContentLoaded', () => {
    initData();
    routePage();
});

// --- Data Initialization ---
function initData() {
    if (!localStorage.getItem('eduManage_students')) {
        const initialStudents = [
            {
                id: 'STD-2024-001',
                firstName: 'Emma',
                lastName: 'Wilson',
                email: 'emma.wilson@email.com',
                phone: '+1 234 567 8901',
                class: 'Grade 10 - Science A',
                enrollDate: '2024-05-12',
                status: 'Active',
                avatarColor: '#4361ee'
            },
            {
                id: 'STD-2024-002',
                firstName: 'James',
                lastName: 'Davis',
                email: 'james.davis@email.com',
                phone: '+1 234 567 8902',
                class: 'Grade 11 - Mathematics',
                enrollDate: '2024-06-10',
                status: 'Active',
                avatarColor: '#f72585'
            },
            {
                id: 'STD-2024-003',
                firstName: 'Sophia',
                lastName: 'Martinez',
                email: 'sophia.m@email.com',
                phone: '+1 234 567 8903',
                class: 'Grade 9 - English Lit',
                enrollDate: '2024-08-15',
                status: 'Absent',
                avatarColor: '#4cc9f0'
            },
            {
                id: 'STD-2024-004',
                firstName: 'Liam',
                lastName: 'Brown',
                email: 'liam.b@email.com',
                phone: '+1 234 567 8904',
                class: 'Grade 10 - Science A',
                enrollDate: '2024-09-01',
                status: 'Active',
                avatarColor: '#7209b7'
            }
        ];
        localStorage.setItem('eduManage_students', JSON.stringify(initialStudents));
    }

    if (!localStorage.getItem('eduManage_courses')) {
        const initialCourses = [
             { id: 'CRSE-001', code: 'MATH-101', title: 'Advanced Mathematics', students: 28, hours: 48, instructor: 'Michael Kumar', status: 'Active', theme: 'blue' },
             { id: 'CRSE-002', code: 'BIOL-201', title: 'Biology & Life Sciences', students: 32, hours: 40, instructor: 'Dr. Linda Johnson', status: 'Active', theme: 'purple' },
             { id: 'CRSE-003', code: 'CHEM-102', title: 'Chemistry Fundamentals', students: 25, hours: 44, instructor: 'Sarah Peterson', status: 'Upcoming', theme: 'teal' },
             { id: 'CRSE-004', code: 'ENG-301', title: 'English Literature', students: 30, hours: 36, instructor: 'Dr. Sarah Smith', status: 'Active', theme: 'orange' },
             { id: 'CRSE-005', code: 'ART-105', title: 'Digital Art & Design', students: 24, hours: 48, instructor: 'Rachel Jones', status: 'Active', theme: 'pink' },
             { id: 'CRSE-006', code: 'PHY-202', title: 'Physics & Mechanics', students: 26, hours: 52, instructor: 'Dr. Thomas Phillips', status: 'Active', theme: 'green' }
        ];
        localStorage.setItem('eduManage_courses', JSON.stringify(initialCourses));
    }
}

// --- Routing ---
function routePage() {
    const path = window.location.pathname;
    const page = path.split('/').pop();

    if (page === 'login.html') {
        initLogin();
    } else if (page === 'index.html' || page === '') {
        if (!checkAuth()) return;
        initDashboard();
        initGlobalSearch();
    } else if (page === 'student-list.html') {
        if (!checkAuth()) return;
        initStudentList();
    } else if (page === 'student-enroll.html') {
        if (!checkAuth()) return;
        initEnrollment();
    } else if (page === 'course.html') {
        if (!checkAuth()) return;
        initCourses();
    } else if (page === 'attendence.html') {
        if (!checkAuth()) return;
        initAttendance();
    } else if (page === 'student-detail.html') {
        if (!checkAuth()) return;
        initStudentDetail();
    }
    
    highlightNav(page);
    initLogout();
}

function checkAuth() {
    const user = localStorage.getItem('eduManage_user');
    if (!user) {
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

function highlightNav(page) {
    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === page) {
            link.classList.add('active');
            link.classList.remove('text-muted');
            link.classList.add('text-white');
        }
    });
}

function initLogout() {
    const loginBtn = document.querySelector('.right-sidebar a[href="login.html"]');
    if (loginBtn) {
        loginBtn.textContent = 'Logout';
        loginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('eduManage_user');
            window.location.href = 'login.html';
        });
    }
}

function initGlobalSearch() {
    const searchInput = document.querySelector('.main-content > .d-flex input[placeholder="Search anything..."]');
    if(searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if(e.key === 'Enter') {
                e.preventDefault();
                alert(`Searching for: ${searchInput.value} \n(Global search implementation requires backend or complex client-side indexing)`);
            }
        });
    }
}

// --- Login Logic ---
function initLogin() {
    const loginForm = document.getElementById('loginForm');
    const errorMsg = document.getElementById('errorMessage');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = loginForm.querySelector('input[type="email"]').value;
            const password = loginForm.querySelector('input[type="password"]').value;
            const rememberMe = document.getElementById('rememberMe').checked;

            if ((email === 'admin@school.edu' && password === 'admin123') || 
                (email === 'teacher@school.edu' && password === 'teacher123')) {
                
                const user = { email, role: 'Admin' };
                localStorage.setItem('eduManage_user', JSON.stringify(user));
                if(rememberMe) {
                    localStorage.setItem('eduManage_remember', email);
                }
                window.location.href = 'index.html';
            } else {
                errorMsg.textContent = 'Invalid email or password. Try the demo credentials.';
                errorMsg.style.display = 'block';
            }
        });
        
        const savedEmail = localStorage.getItem('eduManage_remember');
        if(savedEmail) {
            loginForm.querySelector('input[type="email"]').value = savedEmail;
            document.getElementById('rememberMe').checked = true;
        }
    }
}

// --- Dashboard Logic ---
function initDashboard() {
    const students = JSON.parse(localStorage.getItem('eduManage_students') || '[]');
    const courses = JSON.parse(localStorage.getItem('eduManage_courses') || '[]');
    
    document.getElementById('totalStudents').textContent = students.length;
    document.getElementById('activeCourses').textContent = courses.filter(c => c.status === 'Active').length;
    
    const pendingCount = students.filter(s => s.status === 'Pending').length;
    document.getElementById('pendingStudents').textContent = pendingCount;
    
    document.getElementById('todayAttendance').textContent = '94%';

    const user = JSON.parse(localStorage.getItem('eduManage_user'));
    if (user && user.email) {
        document.getElementById('welcomeMessage').textContent = `Welcome back, ${user.role}!`;
    }

    const cards = document.querySelectorAll('.stat-card');
    cards.forEach(card => card.removeAttribute('disabled'));
    
    const quickActions = document.querySelectorAll('.stat-card .fw-bold');
    if(quickActions.length > 0) {
        quickActions[0].closest('.card').style.cursor = 'pointer';
        quickActions[0].closest('.card').onclick = () => window.location.href = 'student-enroll.html';
        
        quickActions[1].closest('.card').style.cursor = 'pointer';
        quickActions[1].closest('.card').onclick = () => window.location.href = 'attendence.html';
        
        quickActions[2].closest('.card').style.cursor = 'pointer';
        quickActions[2].closest('.card').onclick = () => window.location.href = 'course.html';
    }
}

// --- Student List Logic ---
function initStudentList() {
    const students = JSON.parse(localStorage.getItem('eduManage_students') || '[]');
    const tbody = document.querySelector('table tbody');
    const searchInput = document.querySelector('.search-filter-bar input');
    
    const selects = document.querySelectorAll('.filter-select');
    
    function renderTable(data) {
        tbody.innerHTML = '';
        if (data.length === 0) {
            tbody.innerHTML = '<tr><td colspan="9" class="text-center py-4">No students found</td></tr>';
            return;
        }

        data.forEach(student => {
            const tr = document.createElement('tr');
            
            let statusBadge = '';
            if (student.status === 'Active') statusBadge = '<span class="badge badge-active">Active</span>';
            else if (student.status === 'Absent') statusBadge = '<span class="badge badge-inactive">Absent</span>';
            else statusBadge = '<span class="badge badge-pending">Pending</span>';

            const initials = (student.firstName[0] + student.lastName[0]).toUpperCase();

            tr.innerHTML = `
                <td><input type="checkbox" class="form-check-input"></td>
                <td>
                    <div class="student-info">
                        <div class="avatar" style="background: linear-gradient(135deg, ${student.avatarColor || '#4361ee'}, #3f37c9);">${initials}</div>
                        <div>
                            <div class="student-name">${student.firstName} ${student.lastName}</div>
                            <div class="student-email">${student.email || 'N/A'}</div>
                        </div>
                    </div>
                </td>
                <td><strong>${student.id}</strong></td>
                <td>${student.class || 'N/A'}</td>
                <td>Dr. Linda Johnson</td> 
                <td>${student.phone}</td>
                <td>${student.enrollDate}</td>
                <td>${statusBadge}</td>
                <td>
                    <button class="action-btn view" title="View" data-id="${student.id}"><i class="bi bi-eye-fill"></i></button>
                    <button class="action-btn edit" title="Edit"><i class="bi bi-pencil-fill"></i></button>
                    <button class="action-btn delete" title="Delete" data-id="${student.id}"><i class="bi bi-trash-fill"></i></button>
                </td>
            `;
            tbody.appendChild(tr);
        });

        document.querySelectorAll('.action-btn.delete').forEach(btn => {
            btn.removeAttribute('disabled');
            btn.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                if(confirm('Are you sure you want to delete this student?')) {
                    deleteStudent(id);
                }
            });
        });
        
        document.querySelectorAll('.action-btn.view').forEach(btn => {
            btn.removeAttribute('disabled');
            btn.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                window.location.href = `student-detail.html?id=${id}`;
            });
        });
        
        document.querySelectorAll('.action-btn').forEach(btn => btn.removeAttribute('disabled'));
    }

    function deleteStudent(id) {
        const updatedStudents = JSON.parse(localStorage.getItem('eduManage_students') || '[]').filter(s => s.id !== id);
        localStorage.setItem('eduManage_students', JSON.stringify(updatedStudents));
        filterAndRender(); 
    }
    
    function filterAndRender() {
        let filtered = JSON.parse(localStorage.getItem('eduManage_students') || '[]');
        
        if (searchInput && searchInput.value) {
            const term = searchInput.value.toLowerCase();
            filtered = filtered.filter(s => 
                s.firstName.toLowerCase().includes(term) || 
                s.lastName.toLowerCase().includes(term) ||
                s.id.toLowerCase().includes(term) ||
                (s.email && s.email.toLowerCase().includes(term))
            );
        }
        
        if (selects[0] && selects[0].value !== 'All Classes') {
             filtered = filtered.filter(s => s.class && s.class.includes(selects[0].value));
        }

        if (selects[1] && selects[1].value !== 'All Status') {
            filtered = filtered.filter(s => s.status === selects[1].value);
        }
        
        if(selects[2]) {
            const sortVal = selects[2].value;
            if(sortVal.includes('Name (A-Z)')) {
                filtered.sort((a,b) => a.firstName.localeCompare(b.firstName));
            } else if(sortVal.includes('Name (Z-A)')) {
                filtered.sort((a,b) => b.firstName.localeCompare(a.firstName));
            } else if(sortVal.includes('Newest')) {
                filtered.sort((a,b) => new Date(b.enrollDate) - new Date(a.enrollDate));
            }
        }
        
        renderTable(filtered);
    }

    if (searchInput) searchInput.addEventListener('input', filterAndRender);
    selects.forEach(s => s.addEventListener('change', filterAndRender));

    filterAndRender();

    const toggleBtns = document.querySelectorAll('.view-toggle-btn');
    const tableView = document.querySelector('.card.mb-4'); 
    const cardView = document.querySelector('.row.g-4[style*="display: none"]'); 

    if(toggleBtns.length > 0 && cardView) {
        toggleBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                toggleBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                if(btn.querySelector('.bi-list-ul')) {
                    tableView.style.display = 'block';
                    cardView.style.display = 'none';
                } else {
                    tableView.style.display = 'none';
                    cardView.style.display = 'flex'; 
                    alert('Card view is static in this demo. Switch back to list view for dynamic data.');
                }
            });
        });
    }
}

// --- Enrollment Logic ---
function initEnrollment() {
    const form = document.getElementById('enrollmentForm');
    const photoInput = document.getElementById('photoUpload');
    const photoPreview = document.getElementById('photoPreview');
    
    if (photoInput && photoPreview) {
        photoInput.addEventListener('change', function(e) {
            if (e.target.files && e.target.files[0]) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    photoPreview.src = e.target.result;
                }
                reader.readAsDataURL(e.target.files[0]);
            }
        });
    }

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(form);
            const newStudent = {
                id: formData.get('studentId'),
                firstName: formData.get('firstName'),
                lastName: formData.get('lastName'),
                email: formData.get('personalEmail'),
                phone: formData.get('phone'),
                class: formData.get('gradeLevel') + (formData.get('program') ? ' - ' + formData.get('program') : ''),
                enrollDate: formData.get('enrollmentDate'),
                status: 'Active',
                avatarColor: getRandomColor()
            };

            const students = JSON.parse(localStorage.getItem('eduManage_students') || '[]');
            
            if (students.some(s => s.id === newStudent.id)) {
                alert('Student ID already exists!');
                return;
            }

            students.push(newStudent);
            localStorage.setItem('eduManage_students', JSON.stringify(students));
            
            alert('Student enrolled successfully!');
            window.location.href = 'student-list.html';
        });
    }
}

// --- Course Logic ---
function initCourses() {
    const courses = JSON.parse(localStorage.getItem('eduManage_courses') || '[]');
    const grid = document.getElementById('coursesGrid');
    
    function renderCourses(data) {
        grid.innerHTML = '';
        if(data.length === 0) {
            grid.innerHTML = '<div class="col-12 text-center py-5">No courses found</div>';
            return;
        }
        
        data.forEach(course => {
            const col = document.createElement('div');
            col.className = 'col-md-6 col-lg-4';
            col.innerHTML = `
                <div class="course-card">
                    <div class="course-header ${course.theme || 'blue'}">
                        <div>
                            <div class="course-code">${course.code}</div>
                            <h5 class="course-title">${course.title}</h5>
                        </div>
                        <div class="text-end">
                            <button class="action-btn edit-course" disabled><i class="bi bi-pencil"></i></button>
                            <button class="action-btn delete-course" data-id="${course.id}"><i class="bi bi-trash"></i></button>
                        </div>
                    </div>
                    <div class="course-body">
                        <div class="course-meta">
                            <div class="meta-item"><i class="bi bi-people-fill"></i> <span>${course.students} Students</span></div>
                            <div class="meta-item"><i class="bi bi-clock-fill"></i> <span>${course.hours} Hours</span></div>
                        </div>
                        <p class="course-description">Course description placeholder...</p>
                        <div class="course-teacher">
                            <div class="teacher-avatar">${getInitials(course.instructor)}</div>
                            <div class="teacher-info">
                                <small>Instructor</small>
                                <div><strong>${course.instructor}</strong></div>
                            </div>
                        </div>
                        <div class="course-footer">
                            <span class="badge-status badge-${course.status.toLowerCase()}">${course.status}</span>
                            <button class="btn-view">View Details</button>
                        </div>
                    </div>
                </div>
            `;
            grid.appendChild(col);
        });
        
        document.querySelectorAll('.delete-course').forEach(btn => {
            btn.removeAttribute('disabled'); 
            btn.addEventListener('click', function() {
                 if(confirm('Delete this course?')) {
                     const id = this.getAttribute('data-id');
                     const newCourses = courses.filter(c => c.id !== id);
                     localStorage.setItem('eduManage_courses', JSON.stringify(newCourses));
                     window.location.reload();
                 }
            });
        });
    }
    
    renderCourses(courses);
    
    const saveBtn = document.getElementById('saveCourseBtn');
    if(saveBtn) {
        saveBtn.addEventListener('click', () => {
             const title = document.getElementById('courseTitle').value;
             const code = document.getElementById('courseCode').value;
             
             if(!title || !code) {
                 alert('Please fill required fields');
                 return;
             }
             
             const newCourse = {
                 id: 'CRSE-' + Date.now(),
                 code,
                 title,
                 students: 0,
                 hours: document.getElementById('courseHours').value || 40,
                 instructor: 'Assigned Teacher', 
                 status: 'Active',
                 theme: getRandomTheme()
             };
             
             courses.push(newCourse);
             localStorage.setItem('eduManage_courses', JSON.stringify(courses));
             
             const modalEl = document.getElementById('courseModal');
             const modal = bootstrap.Modal.getInstance(modalEl);
             modal.hide();
             
             window.location.reload();
        });
    }
    
    const addBtn = document.querySelector('.btn-add-course');
    if(addBtn) {
        addBtn.addEventListener('click', () => {
            const modal = new bootstrap.Modal(document.getElementById('courseModal'));
            modal.show();
        });
    }
    
    document.getElementById('totalCourses').textContent = courses.length;
    document.getElementById('activeCourses').textContent = courses.filter(c => c.status === 'Active').length;
}

// --- Attendance Logic ---
function initAttendance() {
    const students = JSON.parse(localStorage.getItem('eduManage_students') || '[]');
    const tbody = document.getElementById('attendanceTbody');
    
    if(tbody) {
        tbody.innerHTML = '';
        students.forEach(student => {
             const tr = document.createElement('tr');
             const initials = (student.firstName[0] + student.lastName[0]).toUpperCase();
             tr.innerHTML = `
                <td>
                    <div class="student-info">
                        <div class="student-avatar" style="background: linear-gradient(135deg, ${student.avatarColor || '#4361ee'}, #3f37c9);">${initials}</div>
                        <div>
                            <div><strong>${student.firstName} ${student.lastName}</strong></div>
                            <small class="text-muted">${student.email}</small>
                        </div>
                    </div>
                </td>
                <td><strong>${student.id}</strong></td>
                <td>${student.class || 'N/A'}</td>
                <td class="attendance-status">
                    <button class="btn-status btn-present" onclick="markStatus(this, 'present')"><i class="bi bi-check-circle-fill"></i></button>
                    <button class="btn-status btn-absent" onclick="markStatus(this, 'absent')"><i class="bi bi-x-circle-fill"></i></button>
                    <button class="btn-status btn-late" onclick="markStatus(this, 'late')"><i class="bi bi-clock-fill"></i></button>
                </td>
                <td class="time-log">-</td>
                <td><span class="badge bg-secondary">Pending</span></td>
             `;
             tbody.appendChild(tr);
        });
    }
    
    const filterBtn = document.querySelector('.btn-filter');
    if(filterBtn) {
        filterBtn.removeAttribute('disabled');
        filterBtn.addEventListener('click', () => alert('Attendance marked for selected students!'));
    }
}

window.markStatus = function(btn, status) {
    const parent = btn.closest('.attendance-status');
    parent.querySelectorAll('.btn-status').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    const row = btn.closest('tr');
    const badge = row.querySelector('.badge');
    const timeLog = row.querySelector('.time-log');
    
    if(status === 'present') {
        badge.className = 'badge bg-success';
        badge.textContent = 'Present';
        timeLog.textContent = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    } else if(status === 'absent') {
        badge.className = 'badge bg-danger';
        badge.textContent = 'Absent';
        timeLog.textContent = '-';
    } else {
        badge.className = 'badge bg-warning';
        badge.textContent = 'Late';
        timeLog.textContent = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    }
};

// --- Student Detail Logic ---
function initStudentDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    const students = JSON.parse(localStorage.getItem('eduManage_students') || '[]');
    
    let student = students.find(s => s.id === id);
    if (!student && id) {
        alert('Student not found!');
        return;
    } else if (!student) {
        student = students[0];
    }
    
    if(student) {
        const nameEl = document.querySelector('.profile-header h2');
        if(nameEl) nameEl.textContent = `${student.firstName} ${student.lastName}`;
        
        const idContainer = document.querySelector('.profile-header p.opacity-90');
        if(idContainer) idContainer.innerHTML = `<strong>Student ID:</strong> ${student.id}`;
        
        const statusBadge = document.querySelector('.status-badge');
        if(statusBadge) statusBadge.textContent = student.status;
    }
}

// --- Utils ---
function getRandomColor() {
    const colors = ['#4361ee', '#3f37c9', '#f72585', '#4cc9f0', '#7209b7'];
    return colors[Math.floor(Math.random() * colors.length)];
}

function getRandomTheme() {
    const themes = ['blue', 'purple', 'pink', 'green', 'orange', 'teal'];
    return themes[Math.floor(Math.random() * themes.length)];
}

function getInitials(name) {
    return name.split(' ').map(n => n[0]).join('').substring(0,2).toUpperCase();
}