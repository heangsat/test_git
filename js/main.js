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
}

// --- Routing ---
function routePage() {
    const path = window.location.pathname;
    const page = path.split('/').pop();

    if (page === 'login.html') {
        initLogin();
    } else if (page === 'index.html' || page === '') {
        // Check auth
        if (!checkAuth()) return;
        initDashboard();
    } else if (page === 'student-list.html') {
        if (!checkAuth()) return;
        initStudentList();
    } else if (page === 'student-enroll.html') {
        if (!checkAuth()) return;
        initEnrollment();
    }
    
    // Global Logout Handler (if exists)
    // Add active class to nav
    highlightNav(page);
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

// --- Login Logic ---
function initLogin() {
    const loginForm = document.getElementById('loginForm');
    const errorMsg = document.getElementById('errorMessage');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = loginForm.querySelector('input[type="email"]').value;
            const password = loginForm.querySelector('input[type="password"]').value;

            // Simple demo validation
            if ((email === 'admin@school.edu' && password === 'admin123') || 
                (email === 'teacher@school.edu' && password === 'teacher123')) {
                
                localStorage.setItem('eduManage_user', JSON.stringify({ email, role: 'Admin' }));
                window.location.href = 'index.html';
            } else {
                errorMsg.textContent = 'Invalid email or password. Try the demo credentials.';
                errorMsg.style.display = 'block';
            }
        });
    }
}

// --- Dashboard Logic ---
function initDashboard() {
    const students = JSON.parse(localStorage.getItem('eduManage_students') || '[]');
    
    // Update Stats
    document.getElementById('totalStudents').textContent = students.length;
    document.getElementById('activeCourses').textContent = '12'; // Mock
    
    const pendingCount = students.filter(s => s.status === 'Pending').length;
    document.getElementById('pendingStudents').textContent = pendingCount;
    
    // Today's Attendance (Mock random percentage)
    document.getElementById('todayAttendance').textContent = '94%';

    // Welcome Message
    const user = JSON.parse(localStorage.getItem('eduManage_user'));
    if (user && user.email) {
        document.getElementById('welcomeMessage').textContent = `Welcome back, ${user.role}!`;
    }

    // Enable buttons
    const cards = document.querySelectorAll('.stat-card');
    cards.forEach(card => card.removeAttribute('disabled'));
    
    // Quick Actions Links
    const quickActions = document.querySelectorAll('.stat-card .fw-bold');
    if(quickActions.length > 0) {
        // Enroll
        quickActions[0].closest('.card').style.cursor = 'pointer';
        quickActions[0].closest('.card').onclick = () => window.location.href = 'student-enroll.html';
        
        // Mark Attendance
        quickActions[1].closest('.card').style.cursor = 'pointer';
        quickActions[1].closest('.card').onclick = () => window.location.href = 'attendence.html';
    }
}

// --- Student List Logic ---
function initStudentList() {
    const students = JSON.parse(localStorage.getItem('eduManage_students') || '[]');
    const tbody = document.querySelector('table tbody');
    const searchInput = document.querySelector('.search-filter-bar input');
    
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
                <td>Dr. Linda Johnson</td> <!-- Mock Teacher -->
                <td>${student.phone}</td>
                <td>${student.enrollDate}</td>
                <td>${statusBadge}</td>
                <td>
                    <button class="action-btn view" title="View"><i class="bi bi-eye-fill"></i></button>
                    <button class="action-btn edit" title="Edit"><i class="bi bi-pencil-fill"></i></button>
                    <button class="action-btn delete" title="Delete" data-id="${student.id}"><i class="bi bi-trash-fill"></i></button>
                </td>
            `;
            tbody.appendChild(tr);
        });

        // Attach Delete Event
        document.querySelectorAll('.action-btn.delete').forEach(btn => {
            btn.removeAttribute('disabled');
            btn.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                if(confirm('Are you sure you want to delete this student?')) {
                    deleteStudent(id);
                }
            });
        });
        
        // Enable other buttons visually
        document.querySelectorAll('.action-btn').forEach(btn => btn.removeAttribute('disabled'));
    }

    function deleteStudent(id) {
        const updatedStudents = students.filter(s => s.id !== id);
        localStorage.setItem('eduManage_students', JSON.stringify(updatedStudents));
        renderTable(updatedStudents);
        // Refresh page stats if needed or just re-render
        window.location.reload(); // Simple refresh to update counts
    }

    // Initial Render
    renderTable(students);

    // Search Feature
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            const filtered = students.filter(s => 
                s.firstName.toLowerCase().includes(term) || 
                s.lastName.toLowerCase().includes(term) ||
                s.id.toLowerCase().includes(term) ||
                (s.email && s.email.toLowerCase().includes(term))
            );
            renderTable(filtered);
        });
    }

    // View Toggle (Simple implementation)
    const toggleBtns = document.querySelectorAll('.view-toggle-btn');
    const tableView = document.querySelector('.card.mb-4'); // Container for table
    const cardView = document.querySelector('.row.g-4[style*="display: none"]'); // Container for cards

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
                    // Need to render cards dynamically too, but for now just showing the hidden static one
                    // In a real app, I'd renderCards(students) here like renderTable
                    cardView.style.display = 'flex'; 
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
    
    // Image Preview
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

    // Form Submit
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
                status: 'Active', // Default
                avatarColor: getRandomColor()
            };

            const students = JSON.parse(localStorage.getItem('eduManage_students') || '[]');
            
            // Check ID uniqueness
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

function getRandomColor() {
    const colors = ['#4361ee', '#3f37c9', '#f72585', '#4cc9f0', '#7209b7'];
    return colors[Math.floor(Math.random() * colors.length)];
}
