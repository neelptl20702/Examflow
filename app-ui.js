// --- ICONS ---
const ICONS = {
    CheckCircle: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>`,
    Upload: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>`,
    ArrowLeft: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>`,
    ArrowRight: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`,
    Plus: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
    Trash: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6"/></svg>`,
    Printer: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>`,
    Paste: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg>`,
    Copy: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`,
    Edit: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`,
    X: `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
    XClose: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
    Users: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
    // --- UPDATED EXCEL ICON --- using Font Awesome style SVG
    Excel: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="text-green-600" viewBox="0 0 16 16"><path d="M5.18 4.616a.5.5 0 0 1 .704.064L8 7.219l2.116-2.54a.5.5 0 0 1 .768-.064L13.484 7 11.82 9.26a.5.5 0 0 1-.768.064L8 6.781l-2.116 2.54a.5.5 0 0 1-.768-.064L2.516 7l1.664-2.384z"/><path d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z"/></svg>`
};

// --- UI UTILITIES ---

const getColorForBranch = (branch) => BRANCH_COLORS[branch?.toUpperCase()] || BRANCH_COLORS.DEFAULT;

function notify(message, type = 'success', duration = 3000) {
    const container = $('#notification-container');
    const id = `notif_${Date.now()}`;
    const colors = { success: 'bg-green-100 border-green-500 text-green-700', error: 'bg-red-100 border-red-500 text-red-700', warning: 'bg-yellow-100 border-yellow-500 text-yellow-700' };
    const notif = document.createElement('div');
    notif.id = id;
    notif.className = `p-4 mb-4 border-l-4 rounded-md shadow-lg ${colors[type]}`;
    notif.innerHTML = `<div class="flex items-center gap-2"><p>${message}</p></div>`;
    container.appendChild(notif);
    setTimeout(() => { document.getElementById(id)?.remove(); }, duration);
}

// --- RENDER FUNCTIONS (Main Controller) ---
function render() {
    renderStepper();
    renderStepContent();
    renderNavigationButtons();
    renderModal();
}

// --- STEPPER & NAVIGATION ---
function renderStepper() {
    const baseButtonClass = "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all";
    $('#stepper-container').innerHTML = `<div class="flex items-center justify-between">${STEPS.map(step => {
        const isCompleted = state.currentStep > step.number;
        const isCurrent = state.currentStep === step.number;
        const canClick = isCompleted;
        let stepClass = '';
        if (isCurrent) stepClass = 'bg-red-600 text-white border-red-600 font-bold';
        else if (isCompleted) stepClass = 'bg-green-500 text-white border-green-500';
        else stepClass = 'bg-white text-gray-600 border-gray-300';

        return `${step.number > 1 ? `<div class="flex-1 h-0.5 ${isCompleted || isCurrent ? 'bg-red-500' : 'bg-gray-300'}"></div>` : ''}
                        <div class="flex flex-col items-center text-center w-28">
                            <button data-step="${step.number}" class="step-btn ${baseButtonClass} ${stepClass} ${canClick ? 'cursor-pointer hover:border-red-400' : 'cursor-default'}">
                                ${isCompleted && !isCurrent ? ICONS.CheckCircle : `<span class="font-bold">${step.number}</span>`}
                            </button>
                            <p class="mt-2 text-xs font-semibold ${isCurrent ? 'text-red-600' : 'text-gray-500'}">${step.name}</p>
                        </div>`
    }).join('')}</div>`;
}

function renderNavigationButtons() {
    const baseBtn = "flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-lg shadow-sm transition-all";
    $('#prev-button-container').innerHTML = state.currentStep > 1 ? `<button id="prev-step" class="${baseBtn} text-gray-700 bg-gray-200 hover:bg-gray-300">${ICONS.ArrowLeft} Previous</button>` : '';
    $('#next-button-container').innerHTML = state.currentStep < STEPS.length ? `<button id="next-step" class="${baseBtn} text-white bg-red-600 hover:bg-red-700">${'Next'} ${ICONS.ArrowRight}</button>` : '';
}

// --- STEP CONTENT ROUTER ---
function renderStepContent() {
    const container = $('#step-content-container');
    let content = '';
    switch (state.currentStep) {
        case 1: content = renderStep1_ExamDetails(); break;
        case 2: content = renderStep2_Subjects(); break;
        case 3: content = renderStep3_Scheduler(); break;
        case 4: content = renderStep4_AllotmentAndRooms(); break;
        case 5: content = renderStep5_DutyAssignment(); break;
    }
    container.innerHTML = `<div>${content}</div>`;
    if (state.currentStep === 4) {
        document.querySelectorAll('.add-block-form [data-action="update-specializations"]').forEach(el => {
            const selectedOption = el.options[el.selectedIndex];
            const subjectId = selectedOption.dataset.subjectId;
            handleSubjectChange(subjectId, el.closest('form'));
        });
        // --- MODIFIED --- Add listener for edit modal subject change
        document.querySelectorAll('#edit-block-form [data-action="update-specializations"]').forEach(el => {
            const selectedOption = el.options[el.selectedIndex];
            const subjectId = selectedOption.dataset.subjectId;
            handleSubjectChange(subjectId, el.closest('form'));
        });
    }
}

// --- STEP 1: Exam Details ---
function renderStep1_ExamDetails() {
    const { session, academicYear, type, branches, specializations, semesters } = state.examDetails;
    const renderToggleButtons = (options, selected, type) => options.map(opt => `<button class="btn-toggle text-sm px-4 py-1.5 border rounded-full transition-colors ${selected.includes(opt) ? 'btn-toggle-active' : 'hover:bg-gray-100 hover:border-gray-400'}" data-type="${type}" data-value="${opt}">${opt}</button>`).join('');

    return `<h2 class="text-3xl font-bold text-gray-800 mb-8">Exam Configuration</h2>
                <div class="space-y-8">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div><label class="block text-sm font-medium text-gray-700">Session</label><select id="exam-session" class="mt-1 block w-full p-2.5 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500">${["Summer Internal", "Winter Internal"].map(s => `<option ${s === session ? 'selected' : ''}>${s}</option>`).join('')}</select></div>
                        <div><label class="block text-sm font-medium text-gray-700">Academic Year</label><select id="exam-year" class="mt-1 block w-full p-2.5 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500">${[getAcademicYear(), `${parseInt(getAcademicYear().split('-')[0]) + 1}-${parseInt(getAcademicYear().split('-')[1]) + 1}`].map(y => `<option ${y === academicYear ? 'selected' : ''}>${y}</option>`).join('')}</select></div>
                    </div>
                    <div><label class="block text-sm font-medium text-gray-700">Generated Exam Name (Editable)</label><input type="text" id="exam-name" value="${state.examName}" class="mt-1 block w-full p-2.5 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"></div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Exam Type(s)*</label>
                        <p class="text-xs text-gray-500 mb-2">Select one or more exam types to schedule them together (e.g., CET and MST for the same subject).</p>
                        <div class="flex flex-wrap gap-2">${EXAM_TYPES.map(t => `<button class="btn-toggle text-sm px-4 py-1.5 border rounded-full transition-colors ${type.includes(t) ? 'btn-toggle-active' : 'hover:bg-gray-100 hover:border-gray-400'}" data-type="type" data-value="${t}">${t}</button>`).join('')}</div>
                    </div>
                    <div><label class="block text-sm font-medium text-gray-700 mb-2">Filter by Branch</label><div class="flex flex-wrap gap-2">${renderToggleButtons(BRANCHES, branches, 'branches')}</div></div>
                    <div><label class="block text-sm font-medium text-gray-700 mb-2">Filter by Specialization</label><div class="flex flex-wrap gap-2">${renderToggleButtons(SPECIALIZATIONS, specializations, 'specializations')}</div></div>
                    <div><label class="block text-sm font-medium text-gray-700 mb-2">Filter by Semester</label><div class="flex flex-wrap gap-2">${renderToggleButtons(SEMESTERS, semesters, 'semesters')}</div></div>
                </div>`;
}

// --- STEP 2: Subjects ---
function renderStep2_Subjects() {
    const { branches, semesters, specializations } = state.examDetails;

    const availableBranches = branches.length > 0 ? branches : BRANCHES;
    const availableSemesters = semesters.length > 0 ? semesters : SEMESTERS;
    const availableSpecs = specializations.length > 0 ? specializations : SPECIALIZATIONS;

    return `<h2 class="text-3xl font-bold text-gray-800 mb-8">Manage Subjects</h2>
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                        <h3 class="font-semibold text-lg mb-4 text-gray-700">Add Subjects</h3>
                        <div class="bg-gray-50 p-6 rounded-lg border space-y-4">
                            <div class="space-y-4">
                                <input type="text" id="subject-code" placeholder="Subject Code" class="w-full p-2.5 border rounded-lg focus:ring-red-500 focus:border-red-500">
                                <input type="text" id="subject-name" placeholder="Subject Name" class="w-full p-2.5 border rounded-lg focus:ring-red-500 focus:border-red-500">

                                <div>
                                    <label class="text-sm font-medium text-gray-600 mb-1 block">Branch</label>
                                    <select id="subject-branch" class="w-full p-2.5 border rounded-lg focus:ring-red-500 focus:border-red-500 bg-white">
                                        ${availableBranches.map(b => `<option value="${b}">${b}</option>`).join('')}
                                    </select>
                                </div>

                                <div>
                                    <label class="text-sm font-medium text-gray-600 mb-1 block">Semester</label>
                                    <select id="subject-semester" class="w-full p-2.5 border rounded-lg focus:ring-red-500 focus:border-red-500 bg-white">
                                        ${availableSemesters.map(s => `<option value="${s}">${s}</option>`).join('')}
                                    </select>
                                </div>

                                <div>
                                    <label class="text-sm font-medium text-gray-600 mb-2 block">Specializations (for this subject)</label>
                                    <div id="subject-specialization-checkboxes" class="grid grid-cols-3 gap-2 p-3 bg-white rounded-lg border">
                                        ${availableSpecs.map(spec => `
                                            <label class="flex items-center gap-2 text-sm">
                                                <input type="checkbox" value="${spec}" name="subject-specialization" class="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500">
                                                ${spec}
                                            </label>
                                        `).join('')}
                                    </div>
                                </div>

                                <button id="add-subject-btn" class="w-full bg-red-600 text-white p-2.5 rounded-lg hover:bg-red-700 flex items-center justify-center gap-2 font-semibold">${ICONS.Plus} Add Subject Manually</button>
                            </div>
                            <div class="border-t my-4"></div>
                            <div>
                                <p class="text-sm text-gray-600">Or upload a master list. Required headers: <strong>Branch, Semester, Specialization, SubjectName, SubjectCode</strong>.</p>
                                <label for="subject-file-upload" class="w-full mt-2 cursor-pointer flex items-center justify-center gap-2 bg-white text-red-600 p-4 rounded-lg border-2 border-dashed hover:bg-red-50">
                                    <span class="font-semibold">Upload Subjects Master</span>
                                </label>
                                <input type="file" id="subject-file-upload" class="hidden" accept=".csv, .xlsx">
                            </div>
                        </div>
                    </div>
                    <div>
                        <h3 class="font-semibold text-lg mb-4 text-gray-700">Filtered Subjects for this Exam (${getFilteredSubjects().length})</h3>
                        <div class="overflow-y-auto max-h-[65vh] p-4 bg-gray-50 rounded-lg border" id="subjects-display-container">${renderFilteredSubjectsList()}</div>
                    </div>
                </div>`;
}

function renderFilteredSubjectsList() {
    const filteredSubjects = getFilteredSubjects();
    if (filteredSubjects.length === 0) {
        return `<div class="text-center text-gray-500 py-8"><p>No subjects match the filters from Step 1.</p><p class="text-sm">Please upload a subject master list or adjust your filters.</p></div>`;
    }
    return `<div class="space-y-2">${filteredSubjects.map(s => `<div class="p-3 rounded-md shadow-sm border ${getColorForBranch(s.Branch)}"><p class="font-semibold text-sm">${s.SubjectName}</p><p class="text-xs">${s.SubjectCode} | ${s.Branch} | ${s.Semester}</p></div>`).join('')}</div>`;
}

// --- STEP 3: Scheduler ---
function renderStep3_Scheduler() {
    return `
                <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 pb-4 border-b">
                    <div>
                        <h2 class="text-3xl font-bold text-gray-800">Exam Scheduler</h2>
                        <p class="text-gray-500 mt-1 desktop-only">Drag & drop subjects into a time slot.</p>
                        <p class="text-gray-500 mt-1 mobile-only">Select a date, then add exams to a phase using the 'Assign' button.</p>
                    </div>
                    <div class="flex flex-col md:flex-row items-end md:items-center gap-3 mt-4 md:mt-0">
                        <button id="generate-answersheet-btn" class="flex items-center gap-2 text-sm bg-blue-600 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-blue-700 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                            <span>Answer Sheet Issue Sheet</span>
                        </button>
                        
                        <!-- NEW SPLIT-BUTTON WRAPPER -->
                        <div class="relative inline-block text-left">
                            <!-- Main Button Group -->
                            <div class="flex rounded-lg shadow-sm">
                                <button id="publish-timetable-btn" type="button" class="flex items-center gap-2 text-sm bg-red-600 text-white px-4 py-2 rounded-l-lg hover:bg-red-700 transition-colors">
                                    ${ICONS.Printer}
                                    <span>View & Publish Timetable</span>
                                </button>
                                <button id="timetable-menu-toggle" type="button" class="split-button-toggle p-2 bg-red-600 text-white rounded-r-lg hover:bg-red-700 transition-colors border-l border-red-500" data-menu="timetable-menu">
                                    <!-- Heroicon: chevron-down -->
                                    <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                                    </svg>
                                </button>
                            </div>
    
                            <!-- Dropdown Menu -->
                            <div id="timetable-menu" class="split-button-menu absolute right-0 mt-2 w-56 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-30">
                                <div class="py-1" role="menu" aria-orientation="vertical">
                                    <a href="#" id="export-timetable-excel" class="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">
                                        ${ICONS.Excel} <!-- Changed to Excel Icon -->
                                        Export as Excel
                                    </a>
                                </div>
                            </div>
                        </div>
                        <!-- END OF SPLIT-BUTTON -->

                    </div>
                </div>
                <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div class="lg:col-span-4 bg-white p-4 rounded-xl border h-fit desktop-only">
                        <div class="relative mb-4">
                            <input type="text" id="scheduler-search" class="w-full p-3 pl-10 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-red-300 focus:border-red-300" placeholder="Search by name or code..." value="${state.scheduler.searchTerm}">
                            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg class="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" /></svg>
                            </div>
                        </div>
                        <h3 class="font-bold mb-4 px-2 text-gray-700">Unscheduled Subjects</h3>
                        <div id="unscheduled-list" class="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
                           ${renderUnscheduledSubjectsList()}
                        </div>
                    </div>
                    <div class="lg:col-span-8 space-y-6">
                        ${renderCalendar()}
                        <div id="schedule-container">
                            ${renderScheduleDay(state.scheduler.selectedDate)}
                        </div>
                    </div>
                </div>`;
}

function renderUnscheduledSubjectsList() {
    const schedulableSubjects = getFilteredSubjects();
    const searchTerm = state.scheduler.searchTerm.toLowerCase();
    const searchedSubjects = searchTerm
        ? schedulableSubjects.filter(s =>
            (s.SubjectName && String(s.SubjectName).toLowerCase().includes(searchTerm)) ||
            (s.SubjectCode && String(s.SubjectCode).toLowerCase().includes(searchTerm))
        )
        : schedulableSubjects;

    if (!searchedSubjects.length) return '<div class="text-center text-gray-500 py-10"><p>No subjects match the current filters.</p></div>';

    return searchedSubjects.map(s => `
                <div id="subject-${s.id}" class="draggable flex items-start gap-3 p-3 rounded-lg shadow-sm border ${getColorForBranch(s.Branch)} cursor-grab transition-shadow hover:shadow-md" draggable="true" data-id="${s.id}" data-type="subject">
                    <div class="flex-shrink-0 mt-1 text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M7 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/></svg>
                    </div>
                    <div class="flex-grow">
                        <p class="font-semibold text-sm leading-tight">${s.SubjectName}</p>
                        <p class="text-xs text-gray-600 mt-1">${s.SubjectCode} | ${s.Branch} | ${s.Semester}</p>
                        <p class="text-xs text-gray-500">${(s.Specialization || []).join(', ')}</p>
                    </div>
                </div>
            `).join('');
}


function renderCalendar() {
    const calDate = state.scheduler.calendarDate;
    const month = calDate.getMonth();
    const year = calDate.getFullYear();
    const firstDayOfMonth = new Date(year, month, 1);
    const firstDayOfWeek = firstDayOfMonth.getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let dayCells = '';

    for (let i = 0; i < firstDayOfWeek; i++) { dayCells += `<div></div>`; }

    for (let i = 1; i <= daysInMonth; i++) {
        const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
        const isScheduled = !!state.schedule[dateString] && state.schedule[dateString].length > 0;
        const isSelected = state.scheduler.selectedDate === dateString;

        dayCells += `
                    <div class="relative flex justify-center">
                        <button data-date="${dateString}" class="calendar-day w-10 h-10 rounded-full transition-colors flex items-center justify-center
                            ${isSelected ? 'bg-red-600 text-white font-bold' : 'hover:bg-gray-100'}">
                            ${i}
                        </button>
                        ${isScheduled ? `<div class="absolute bottom-1 w-1.5 h-1.5 bg-green-500 rounded-full"></div>` : ''}
                    </div>`;
    }

    return `
                <div class="bg-white p-4 rounded-xl border">
                    <div class="flex justify-between items-center mb-4">
                        <button id="cal-prev" class="p-2 rounded-full hover:bg-gray-100 transition-colors">${ICONS.ArrowLeft}</button>
                        <div class="font-bold text-lg text-gray-800">${calDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</div>
                        <button id="cal-next" class="p-2 rounded-full hover:bg-gray-100 transition-colors">${ICONS.ArrowRight}</button>
                    </div>
                    <div class="grid grid-cols-7 gap-y-2 text-center text-sm">
                        ${days.map(d => `<div class="font-semibold text-gray-500 py-2">${d}</div>`).join('')}
                        ${dayCells}
                    </div>
                     <div class="text-xs text-gray-500 mt-2 flex items-center justify-center gap-4">
                         <span class="flex items-center gap-1.5"><div class="w-2 h-2 bg-green-500 rounded-full"></div>Scheduled</span>
                     </div>
                </div>`;
}

function renderScheduleDay(date) {
    if (!date) return `
                <div class="text-center text-gray-500 p-12 border-2 border-dashed rounded-xl bg-gray-50 flex flex-col items-center justify-center h-full">
                    <svg class="w-12 h-12 text-gray-400 mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    <h3 class="font-semibold text-lg">No date selected</h3>
                    <p>Please select a date from the calendar to add exam phases.</p>
                </div>`;

    if (!state.schedule[date]) state.schedule[date] = [];

    const sortedDatesWithContent = Object.keys(state.schedule).sort().filter(d => state.schedule[d]?.length > 0 && d < date);
    const prevDate = sortedDatesWithContent.length > 0 ? sortedDatesWithContent[sortedDatesWithContent.length - 1] : null;

    return `
                <div class="bg-white p-5 rounded-xl border">
                    <div class="flex flex-col md:flex-row justify-between md:items-center mb-4 pb-4 border-b">
                        <div>
                            <h3 class="font-bold text-xl text-gray-800">${new Date(date + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</h3>
                        </div>
                        <div class="flex items-center gap-2 mt-3 md:mt-0">
                            ${prevDate ? `<button data-date="${date}" class="copy-phases-btn text-xs font-semibold text-red-600 hover:underline">Copy from Previous</button>` : ''}
                            <button data-date="${date}" class="add-phase-btn text-sm bg-red-100 text-red-700 hover:bg-red-200 font-semibold p-2 rounded-lg flex items-center gap-2 transition-colors">${ICONS.Plus} Add Phase</button>
                            <button data-date="${date}" class="remove-date-btn text-gray-400 hover:text-red-500 p-2 rounded-lg transition-colors">${ICONS.Trash}</button>
                        </div>
                    </div>
                    <div id="phases-container" class="space-y-4">
                        ${state.schedule[date].length > 0 ? state.schedule[date].map(phase => renderPhaseBlock(date, phase.id)).join('') : `
                            <div class="text-center text-gray-400 py-10">
                                <p>No exam phases for this day.</p>
                                <p class="text-sm">Click 'Add Phase' to get started.</p>
                            </div>
                        `}
                    </div>
                </div>`;
}

function renderPhaseBlock(date, phaseId) {
    const phase = state.schedule[date].find(p => p.id === phaseId);
    if (!phase) return '';
    return `
                <div class="bg-gray-50/70 p-4 rounded-lg border border-gray-200">
                    <div class="flex justify-between items-center mb-3">
                        <div class="flex items-center gap-3">
                            <span class="text-lg font-bold text-gray-800 bg-transparent rounded-md px-2 py-1">${formatTime12Hour(phase.startTime)} - ${formatTime12Hour(phase.endTime)}</span>
                        </div>
                         <div class="flex items-center gap-2">
                             <button class="mobile-only assign-subject-btn text-xs bg-red-100 text-red-700 hover:bg-red-200 font-semibold p-2 rounded-md flex items-center gap-1" data-date="${date}" data-phase-id="${phaseId}">
                                 Assign Subjects
                             </button>
                            <button data-date="${date}" data-phase-id="${phaseId}" class="remove-phase-btn text-gray-400 hover:text-red-600 p-1.5 rounded-full hover:bg-red-100 transition-colors">${ICONS.Trash}</button>
                         </div>
                    </div>
                    <div class="drop-zone min-h-[80px] border-2 border-dashed border-gray-300 rounded-lg p-2 transition-all" data-date="${date}" data-phase-id="${phaseId}" data-type="subject">
                        ${phase.subjects.length > 0 ? `
                            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                                ${phase.subjects.map(scheduledItem => {
        const s = state.subjectsMasterList.find(sub => sub.id === scheduledItem.subjectId);
        const studentTypeLabel = scheduledItem.studentType === 'detained' ? ' (Detained)' : '';
        return s ? `
                                        <div class="flex items-center justify-between p-2 rounded-md text-xs ${getColorForBranch(s.Branch)} shadow-sm">
                                            <div>
                                                <span class="font-semibold">${s.SubjectName} (${s.SubjectCode})${studentTypeLabel}</span>
                                                <span class="block text-red-700 font-bold text-[10px] uppercase">${scheduledItem.examType}</span>
                                            </div>
                                            <button class="remove-subject-from-phase-btn ml-2 text-gray-500 hover:text-red-700" data-date="${date}" data-phase-id="${phaseId}" data-instance-id="${scheduledItem.instanceId}">${ICONS.X}</button>
                                        </div>` : '';
    }).join('')}
                            </div>
                        ` : `
                            <div class="text-center text-gray-400 flex items-center justify-center h-full py-5 pointer-events-none desktop-only">
                                <svg class="w-6 h-6 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9 3.75H6.912a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338A2.25 2.25 0 0017.088 3.75H15M4.5 13.5h15M7.5 3.75v3.75m9-3.75v3.75" /></svg>
                                <span>Drop subjects here</span>
                            </div>
                             <div class="text-center text-gray-400 h-full py-5 pointer-events-none mobile-only">
                                 <p>No subjects assigned.</p>
                             </div>
                        `}
                    </div>
                </div>`;
}

// --- STEP 4: Allotment & Rooms (IMPROVED) ---
function renderStep4_AllotmentAndRooms() {
    let allotmentHtml = '';
    const sortedDates = Object.keys(state.schedule).sort();

    for (const date of sortedDates) {
        if (!state.schedule[date] || state.schedule[date].length === 0) continue;

        for (const phase of state.schedule[date]) {
            const phaseKey = `${date}|${phase.id}`;
            if (!state.allotment[phaseKey]) state.allotment[phaseKey] = [];

            const scheduledItems = phase.subjects;

            const phaseHasBlocks = state.allotment[phaseKey] && state.allotment[phaseKey].length > 0;
            const isCopiedSource = state.copiedAllotment && state.copiedAllotment.sourceKey === phaseKey;

            allotmentHtml += `
                        <div class="bg-gray-50 p-5 rounded-xl border mb-6">
                            <div class="flex flex-col md:flex-row justify-between md:items-start mb-4 pb-4 border-b">
                                <div>
                                    <h3 class="font-bold text-lg">${new Date(date + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' })}</h3>
                                    <p class="text-sm text-red-700 font-semibold">${formatTime12Hour(phase.startTime)} - ${formatTime12Hour(phase.endTime)}</p>
                                </div>
                                <div class="flex items-center gap-4 mt-3 md:mt-0">
                                   ${phaseHasBlocks ? `
                                        <button class="copy-blocks-btn text-sm font-semibold flex items-center gap-1.5 ${isCopiedSource ? 'text-green-600' : 'text-blue-600 hover:underline'}" data-source-key="${phaseKey}">
                                            ${isCopiedSource ? ICONS.CheckCircle : ICONS.Copy} ${isCopiedSource ? 'Copied!' : 'Copy Seating Plan'}
                                        </button>
                                   ` : ''}
                                   ${state.copiedAllotment ? `
                                        <button class="paste-blocks-btn text-sm font-semibold text-red-600 hover:underline flex items-center gap-1.5" data-target-key="${phaseKey}">
                                            ${ICONS.Paste} Paste Seating Plan
                                        </button>
                                   ` : ''}
                                   <button class="download-phase-excel-btn text-sm font-semibold text-green-700 hover:underline flex items-center gap-1.5" data-phase-key="${phaseKey}">
                                       ${ICONS.Excel} Export to Excel
                                   </button>
                                </div>
                            </div>

                            <div class="bg-white p-4 rounded-lg border mb-4">
                                <h4 class="font-semibold mb-3 text-gray-700">Add a New Block</h4>
                                ${scheduledItems.length > 0 && state.roomsMaster.length > 0 ? `
                                <form class="add-block-form grid grid-cols-1 md:grid-cols-12 gap-x-3 gap-y-4 items-end" data-phase-key="${phaseKey}">
                                    <div class="md:col-span-12">
                                        <label class="text-xs font-medium text-gray-600">Subject</label>
                                        <select name="scheduledInstanceId" data-action="update-specializations" class="block w-full p-2 border rounded-md text-sm mt-1">
                                            <option value="">-- Select Subject --</option>
                                            ${scheduledItems.map(item => {
        const s = state.subjectsMasterList.find(sub => sub.id === item.subjectId);
        if (!s) return '';
        const studentTypeLabel = item.studentType === 'detained' ? ' (Detained)' : '';
        const optionText = `${s.SubjectName} (${s.Branch} - ${s.Semester})${studentTypeLabel}`;
        return `<option value="${item.instanceId}" data-subject-id="${s.id}">${optionText}</option>`;
    }).join('')}
                                        </select>
                                    </div>

                                    <div class="specialization-container md:col-span-3"></div>
                                    <div class="md:col-span-2">
                                        <label class="text-xs font-medium text-gray-600">Block No.</label>
                                        <input type="text" name="blockNo" required placeholder="e.g., 1" class="block w-full p-2 border rounded-md text-sm mt-1">
                                    </div>
                                    <div class="md:col-span-2">
                                        <label class="text-xs font-medium text-gray-600">Room</label>
                                        <select name="roomName" class="block w-full p-2 border rounded-md text-sm mt-1">
                                            ${state.roomsMaster.map(r => `<option value="${r.name}">${r.name}</option>`).join('')}
                                        </select>
                                    </div>
                                    <div class="md:col-span-3">
                                        <label class="text-xs font-medium text-gray-600">Seat Range</label>
                                        <input type="text" name="seatRange" required placeholder="e.g., A1-A20" class="block w-full p-2 border rounded-md text-sm mt-1">
                                    </div>
                                    <div class="md:col-span-2">
                                        <label class="text-xs font-medium text-gray-600">Students</label>
                                        <input type="number" name="studentCount" required placeholder="e.g., 20" class="block w-full p-2 border rounded-md text-sm mt-1">
                                    </div>
                                    <button type="submit" class="bg-red-600 text-white p-2 rounded-md hover:bg-red-700 h-fit text-sm md:col-start-12">Add</button>
                                </form>
                                ` : `<p class="text-sm text-center text-gray-500">${state.roomsMaster.length === 0 ? 'Please add rooms below before creating blocks.' : 'No subjects scheduled in this phase.'}</p>`}
                            </div>

                            <div class="allotment-blocks-container">
                                ${renderAllotmentBlocksForPhase(phaseKey)}
                            </div>
                        </div>
                    `;
        }
    }

    if (!allotmentHtml) {
        allotmentHtml = '<div class="text-center text-gray-500 py-10"><p>No exams scheduled in Step 3.</p><p class="text-sm">Complete the schedule to create seating blocks.</p></div>';
    }

    const totalCapacity = state.roomsMaster.reduce((sum, room) => sum + parseInt(room.capacity || 0), 0);

    return `
                <div>
                    <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 pb-4 border-b">
                        <div>
                            <h2 class="text-3xl font-bold text-gray-800">Allotment & Rooms</h2>
                            <p class="text-gray-500 mt-1">Manage rooms and create seating blocks for each exam session.</p>
                        </div>
                         <!-- --- MODIFIED BUTTON GROUP --- -->
                         <div class="flex flex-col md:flex-row items-center gap-3 mt-4 md:mt-0">
                             <!-- NEW: Master Download Button -->
                             <button id="download-master-arrangement" class="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center gap-2 text-sm">
                                 Download Master Arrangement
                             </button>

                             <!-- Existing Button (Phase-wise PDF) -->
                             <button id="download-seating-pdf" class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2 text-sm">
                                 ${ICONS.Printer} Download Phase PDF
                             </button>
                         </div>
                         <!-- --- END MODIFIED BUTTON GROUP --- -->
                    </div>
                    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        <div class="lg:col-span-4">
                             <div class="bg-white p-6 rounded-xl border sticky top-24">
                                <h3 class="font-bold text-lg mb-4">Manage Rooms</h3>
                                <div class="bg-gray-50 p-4 rounded-lg border space-y-4">
                                    <div class="grid grid-cols-3 gap-3">
                                        <input type="text" id="room-name" placeholder="Room Name/No." class="col-span-2 p-2 border rounded-md">
                                        <input type="number" id="room-capacity" placeholder="Capacity" class="p-2 border rounded-md">
                                    </div>
                                    <button id="add-room-btn" class="w-full bg-red-600 text-white p-2 rounded-md hover:bg-red-700 flex items-center justify-center gap-2">${ICONS.Plus} Add Room</button>
                                </div>
                                <div class="border-t my-4"></div>
                                <div>
                                    <p class="text-sm text-center text-gray-600">Or upload rooms. Headers: <strong>RoomNumber, Capacity</strong>.</p>
                                    <label for="room-file-upload" class="w-full mt-2 cursor-pointer flex items-center justify-center gap-2 bg-white text-red-600 p-3 rounded-md border-2 border-dashed hover:bg-red-50">
                                        ${ICONS.Upload} <span class="font-semibold text-sm">Upload Rooms</span>
                                    </label>
                                    <input type="file" id="room-file-upload" class="hidden" accept=".csv, .xlsx">
                                </div>
                                <div class="mt-6">
                                    <h4 class="font-bold mb-2">Available Rooms (${state.roomsMaster.length}) <span class="font-normal text-sm text-gray-500">- Cap: ${totalCapacity}</span></h4>
                                    <div id="rooms-list" class="space-y-2 max-h-[40vh] overflow-y-auto pr-2">
                                        ${state.roomsMaster.map(room => `
                                            <div class="flex justify-between items-center bg-gray-50 p-2 rounded-md border">
                                                <span class="font-semibold text-sm">${room.name}</span>
                                                <div class="flex items-center gap-3">
                                                    <span class="text-xs text-gray-600 bg-white px-2 py-1 rounded-full border">Cap: ${room.capacity}</span>
                                                    <button data-room-id="${room.id}" class="remove-room-btn text-gray-400 hover:text-red-600">${ICONS.Trash}</button>
                                                </div>
                                            </div>
                                        `).join('') || '<p class="text-sm text-center text-gray-500 py-4">No rooms added yet.</p>'}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="lg:col-span-8">
                            ${allotmentHtml}
                        </div>
                    </div>
                </div>
            `;
}

function renderAllotmentBlocksForPhase(phaseKey) {
    const blocks = state.allotment[phaseKey] || [];
    if (blocks.length === 0) {
        return '<p class="text-center text-sm text-gray-500 py-6">No blocks created for this session yet.</p>';
    }

    // Group blocks by roomName
    const blocksByRoom = blocks.reduce((acc, block) => {
        if (!acc[block.roomName]) {
            acc[block.roomName] = [];
        }
        acc[block.roomName].push(block);
        return acc;
    }, {});

    let tableHtml = `
                <table class="w-full text-sm mt-4">
                    <thead class="text-left bg-gray-100">
                        <tr>
                            <th class="p-2 font-semibold">Room</th>
                            <th class="p-2 font-semibold">Block No.</th>
                            <th class="p-2 font-semibold">Subject</th>
                            <th class="p-2 font-semibold">Seat Range</th>
                            <th class="p-2 font-semibold">Students</th>
                            <th class="p-2 font-semibold text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
            `;

    const sortedRooms = Object.keys(blocksByRoom).sort((a, b) => {
        const blockA = blocksByRoom[a][0].blockNo || '';
        const blockB = blocksByRoom[b][0].blockNo || '';
        return blockA.localeCompare(blockB, undefined, { numeric: true });
    });

    for (const roomName of sortedRooms) {
        const roomBlocks = blocksByRoom[roomName];
        const roomData = state.roomsMaster.find(r => r.name === roomName);
        const roomCapacity = roomData ? roomData.capacity : 0;
        let totalStudentsInRoom = 0;

        roomBlocks.forEach(block => {
            const subject = state.subjectsMasterList.find(s => s.id == block.subjectId);
            totalStudentsInRoom += parseInt(block.studentCount || 0);
            let subjectText = '<span class="text-red-600 font-semibold">N/A - Assign Subject</span>'; // Default text for empty blocks
            if (subject) {
                subjectText = `${subject.SubjectName} (${subject.Branch})`;
                if (block.specialization) {
                    subjectText += ` - ${block.specialization}`;
                }
                if (block.isDetained) {
                    subjectText += ` (Detained)`;
                }
            }
            tableHtml += `
                        <tr class="border-t">
                            <td class="p-2 font-semibold">${block.roomName}</td>
                            <td class="p-2">${block.blockNo}</td>
                            <td class="p-2">${subjectText}</td>
                            <td class="p-2 font-mono">${block.seatRange}</td>
                            <td class="p-2 font-bold text-center">${block.studentCount}</td>
                            <td class="p-2 text-right">
                                <button class="edit-block-btn text-gray-400 hover:text-blue-600 p-1" data-phase-key="${phaseKey}" data-block-id="${block.id}" title="Edit Block">${ICONS.Edit}</button>
                                <button class="remove-block-btn text-gray-400 hover:text-red-600 p-1" data-phase-key="${phaseKey}" data-block-id="${block.id}" title="Delete Block">${ICONS.Trash}</button>
                            </td>
                        </tr>
                    `;
        });

        const capacityUtilization = roomCapacity > 0 ? totalStudentsInRoom / roomCapacity : 0;
        let capacityClass = 'bg-gray-50';
        if (capacityUtilization > 1) {
            capacityClass = 'bg-red-100 text-red-800'; // Over capacity
        } else if (capacityUtilization >= 0.8) {
            capacityClass = 'bg-yellow-100 text-yellow-800'; // Nearing capacity
        } else if (totalStudentsInRoom > 0) {
            capacityClass = 'bg-green-100 text-green-800'; // Good
        }

        tableHtml += `
                    <tr class="border-t-2 font-bold ${capacityClass}">
                        <td colspan="4" class="p-2 text-right">Total for ${roomName}:</td>
                        <td class="p-2 text-center">${totalStudentsInRoom} / ${roomCapacity}</td>
                        <td class="p-2"></td>
                    </tr>
                `;
    }

    tableHtml += `</tbody></table>`;
    return tableHtml;
}

// --- STEP 5: Duty Assignment (IMPROVED) ---
function renderStep5_DutyAssignment() {
    let assignmentHtml = '';
    const sortedDates = Object.keys(state.schedule).sort();

    for (const date of sortedDates) {
        if (!state.schedule[date] || state.schedule[date].length === 0) continue;

        for (const phase of state.schedule[date]) {
            const phaseKey = `${date}|${phase.id}`;

            assignmentHtml += `
                        <div class="bg-gray-50 p-5 rounded-xl border mb-6">
                             <div class="flex justify-between items-center mb-4">
                                <div>
                                    <h3 class="font-bold text-lg">${new Date(date + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' })}</h3>
                                    <p class="text-sm text-red-700 font-semibold">${formatTime12Hour(phase.startTime)} - ${formatTime12Hour(phase.endTime)}</p>
                                </div>
                                <button class="download-phase-duty-btn flex items-center gap-2 text-xs bg-blue-100 text-blue-700 hover:bg-blue-200 font-semibold p-2 rounded-lg" data-phase-key="${phaseKey}">
                                    ${ICONS.Printer}
                                    <span>Download Phase Sheet</span>
                                </button>
                            </div>
                            <div class="space-y-4">
                                ${renderDutyRoomsForPhase(phaseKey)}
                            </div>
                        </div>`;
        }
    }
    if (!assignmentHtml) {
        assignmentHtml = '<div class="text-center text-gray-500 py-10"><p>No exams scheduled or blocks allotted.</p><p class="text-sm">Complete previous steps to assign duties.</p></div>';
    }

    return `
                <div>
                     <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 pb-4 border-b">
                        <div>
                            <h2 class="text-3xl font-bold text-gray-800">Faculty Duty Assignment</h2>
                            <p class="text-gray-500 mt-1 desktop-only">Drag & drop faculty into rooms. Mobile users, use the 'Assign' button.</p>
                             <p class="text-gray-500 mt-1 mobile-only">Tap 'Assign Faculty' on a room to add invigilators.</p>
                        </div>
                        <div class="flex items-center gap-3 mt-4 md:mt-0">
                            <button id="view-load-matrix-btn" class="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 flex items-center gap-2 text-sm">
                                ${ICONS.Users}<span>View Load Matrix</span>
                            </button>
                            
                            <!-- NEW SPLIT-BUTTON WRAPPER -->
                            <div class="relative inline-block text-left">
                                <!-- Main Button Group -->
                                <div class="flex rounded-lg shadow-sm">
                                    <button id="preview-duty-pdf" type="button" class="flex items-center gap-2 text-sm bg-blue-600 text-white px-4 py-2 rounded-l-lg hover:bg-blue-700 transition-colors">
                                        Preview Full Duty Sheet
                                    </button>
                                    <button id="duty-menu-toggle" type="button" class="split-button-toggle p-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition-colors border-l border-blue-500" data-menu="duty-sheet-menu">
                                        <!-- Heroicon: chevron-down -->
                                        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
    
                                <!-- Dropdown Menu -->
                                <div id="duty-sheet-menu" class="split-button-menu absolute right-0 mt-2 w-56 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-30">
                                    <div class="py-1" role="menu" aria-orientation="vertical">
                                        <a href="#" id="export-duty-sheet-excel" class="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">
                                            ${ICONS.Excel} <!-- Changed to Excel Icon -->
                                            Export as Excel
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <!-- END OF SPLIT-BUTTON -->

                        </div>
                    </div>
                    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        <div class="lg:col-span-4">
                             <div class="bg-white p-6 rounded-xl border sticky top-24">
                                <h3 class="font-bold text-lg mb-4">Manage Faculty</h3>
                                <div class="bg-gray-50 p-4 rounded-lg border space-y-3">
                                    <input type="text" id="faculty-name" placeholder="Faculty Name" class="w-full p-2 border rounded-md">
                                    <button id="add-faculty-btn" class="w-full bg-red-600 text-white p-2 rounded-md hover:bg-red-700 flex items-center justify-center gap-2">${ICONS.Plus} Add Faculty</button>
                                </div>
                                <div class="border-t my-4"></div>
                                <div>
                                    <p class="text-sm text-center text-gray-600">Upload master file. It will read the 'Name of Faculty' column.</p>
                                    <label for="faculty-file-upload" class="w-full mt-2 cursor-pointer flex items-center justify-center gap-2 bg-white text-red-600 p-3 rounded-md border-2 border-dashed hover:bg-red-50">
                                        ${ICONS.Upload} <span class="font-semibold text-sm">Upload Faculty</span>
                                    </label>
                                    <input type="file" id="faculty-file-upload" class="hidden" accept=".csv, .xlsx">
                                </div>
                                <div class="mt-6">
                                    <h4 class="font-bold mb-2">Faculty List</h4>
                                    <input type="text" id="faculty-search" value="${state.facultySearchTerm}" placeholder="Search faculty..." class="w-full p-2 border rounded-md mb-3">
                                    <div id="faculty-list" class="space-y-2 max-h-[40vh] overflow-y-auto pr-2">
                                        ${renderFacultyList()}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="lg:col-span-8">
                            ${assignmentHtml}
                        </div>
                    </div>
                </div>
            `;
}

function renderFacultyList() {
    const dutyCounts = getFacultyDutyCount();
    const searchTerm = state.facultySearchTerm.toLowerCase();
    const filteredFaculty = state.facultyMaster.filter(f => f.name.toLowerCase().includes(searchTerm));

    if (filteredFaculty.length === 0) return '<p class="text-sm text-center text-gray-500 py-4">No faculty found.</p>';

    return filteredFaculty.map(fac => `
                <div class="draggable flex justify-between items-center bg-gray-50 p-2 rounded-md border cursor-grab" draggable="true" data-id="${fac.id}" data-type="faculty">
                    <button class="font-semibold text-sm text-left hover:underline faculty-duty-matrix-btn" data-faculty-name="${fac.name}">${fac.name}</button>
                    <div class="flex items-center gap-3">
                         <span class="text-xs font-bold text-blue-800 bg-blue-100 px-2 py-1 rounded-full" title="Total duties assigned">
                            ${dutyCounts[fac.name] || 0}
                         </span>
                        <button data-faculty-id="${fac.id}" class="remove-faculty-btn text-gray-400 hover:text-red-600">${ICONS.Trash}</button>
                    </div>
                </div>
            `).join('');
}

function renderDutyRoomsForPhase(phaseKey) {
    const blocksInPhase = state.allotment[phaseKey] || [];

    const roomsInPhase = [...new Set(blocksInPhase.map(b => b.roomName))];
    const sortedRoomsMeta = roomsInPhase.map(roomName => {
        const firstBlock = blocksInPhase.find(b => b.roomName === roomName);
        return { roomName, blockNo: firstBlock.blockNo };
    }).sort((a, b) => (a.blockNo || '').localeCompare(b.blockNo || '', undefined, { numeric: true }));


    if (roomsInPhase.length === 0) return '<p class="text-sm text-gray-500">No rooms have assigned blocks for this session.</p>';

    return sortedRoomsMeta.map(({ roomName }) => {
        const assignedFaculty = state.dutyAssignments[phaseKey]?.[roomName] || [];
        const blocksInThisRoom = blocksInPhase.filter(b => b.roomName === roomName);
        const totalStudentsInRoom = blocksInThisRoom.reduce((sum, block) => sum + parseInt(block.studentCount || 0), 0);
        const roomData = state.roomsMaster.find(r => r.name === roomName);
        const roomCapacity = roomData ? roomData.capacity : 0;

        let capacityClass = 'text-gray-800';
        if (totalStudentsInRoom > 50) {
            capacityClass = 'text-red-600';
        } else if (totalStudentsInRoom > 25) {
            capacityClass = 'text-yellow-600';
        } else if (totalStudentsInRoom > 0) {
            capacityClass = 'text-green-600';
        }

        return `
                    <div class="bg-white p-4 rounded-lg border">
                        <div class="flex justify-between items-start">
                             <div>
                                <h4 class="font-bold text-gray-800">${roomName}</h4>
                                <p class="text-xs font-semibold ${capacityClass}">(${totalStudentsInRoom} / ${roomCapacity} Students)</p>
                            </div>
                            <button class="mobile-only assign-faculty-btn text-sm bg-red-100 text-red-700 hover:bg-red-200 font-semibold p-2 rounded-lg flex items-center gap-2 transition-colors" data-phase-key="${phaseKey}" data-room="${roomName}">
                                Assign Faculty
                            </button>
                        </div>

                        <div class="mt-3 space-y-2 text-xs border-t pt-3">
                            ${blocksInThisRoom.map(block => {
            const subject = state.subjectsMasterList.find(s => s.id == block.subjectId);
            // --- MODIFIED --- Show message if subject is not assigned yet
            if (!subject) return `<div class="p-2 bg-yellow-50 rounded-md border border-yellow-200"><p class="font-bold text-yellow-800">Block ${block.blockNo}: <span class="font-normal text-yellow-700">Subject Not Assigned</span></p></div>`;
            
            let subjectInfo = `${subject.Branch} - ${subject.Semester}`;
            if (block.specialization) subjectInfo += ` (${block.specialization})`;
            if (block.isDetained) subjectInfo += ' (Detained)';
            return `
                                    <div class="p-2 bg-gray-50 rounded-md border">
                                        <p class="font-bold text-gray-800">Block ${block.blockNo}: <span class="font-normal">${subject.SubjectName} (${subject.SubjectCode})</span></p>
                                        <p class="text-gray-600">${subjectInfo}</p>
                                    </div>
                                `;
        }).join('')}
                        </div>

                        <div class="drop-zone mt-3 min-h-[60px] border-2 border-dashed border-gray-300 rounded-lg p-2 transition-all" data-phase-key="${phaseKey}" data-room="${roomName}" data-type="faculty">
                             ${assignedFaculty.length > 0 ? `
                                 <div class="flex flex-wrap gap-2">
                                     ${assignedFaculty.map(name => `
                                        <span class="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                            ${name}
                                            <button class="remove-duty-btn" data-phase-key="${phaseKey}" data-room="${roomName}" data-name="${name}">${ICONS.X}</button>
                                        </span>`).join('')}
                                 </div>
                             ` : `
                                 <div class="text-center text-gray-400 flex items-center justify-center h-full py-5 pointer-events-none desktop-only">
                                     <svg class="w-6 h-6 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" /></svg>
                                     <span>Drop faculty here to assign duty</span>
                                 </div>
                                  <div class="text-center text-gray-400 h-full py-5 pointer-events-none mobile-only">
                                     <p>No faculty assigned.</p>
                                  </div>
                             `}
                        </div>
                    </div>
                `;
    }).join('');
}

// --- MODAL & DYNAMIC HELPERS ---

function generateTimetableHTML() {
    const regularScheduledItems = [];
    const detainedScheduledItems = [];

    const currentlyFilteredSubjects = getFilteredSubjects();
    const currentlyFilteredSubjectIds = new Set(currentlyFilteredSubjects.map(s => s.id));

    for (const date in state.schedule) {
        for (const phase of state.schedule[date]) {
            for (const scheduledItem of phase.subjects) {
                if (currentlyFilteredSubjectIds.has(scheduledItem.subjectId)) {
                    if (scheduledItem.studentType === 'detained') {
                        detainedScheduledItems.push({ ...scheduledItem, date, phase });
                    } else {
                        regularScheduledItems.push({ ...scheduledItem, date, phase });
                    }
                }
            }
        }
    }

    const academicSession = state.examDetails.session.toUpperCase().includes("SUMMER") ? "EVEN" : "ODD";
    const mainHeaderHtml = `<div class="text-center mb-8"><h1 class="text-3xl font-bold text-gray-800">${UNIVERSITY_NAME}</h1><p class="text-md text-gray-600">${SCHOOL_NAME.toUpperCase()}</p><p class="text-md font-semibold text-gray-700 mt-2">${academicSession} SEMESTER ${state.examDetails.academicYear}</p></div>`;

    let regularHtml = '';
    if (regularScheduledItems.length > 0) {
        regularHtml = `<h2 class="text-2xl font-bold text-red-700 mt-4 text-center">${state.examDetails.type.join(' & ')} TIME-TABLE</h2>` + createTableHtmlForItems(regularScheduledItems);
    }

    let detainedHtml = '';
    if (detainedScheduledItems.length > 0) {
        detainedHtml = `<div class="page-break-after"></div> <h2 class="text-2xl font-bold text-red-700 mt-8 text-center">${state.examDetails.type.join(' & ')} TIME-TABLE (DETAINED STUDENTS)</h2>` + createTableHtmlForItems(detainedScheduledItems);
    }

    if (regularScheduledItems.length === 0 && detainedScheduledItems.length === 0) {
        return '<p class="text-center py-8">No exams have been scheduled for the selected filters.</p>';
    }

    return `<div id="timetable-to-print" class="p-8 bg-white">${mainHeaderHtml}${regularHtml}${detainedHtml}</div>`;
}

function createTableHtmlForItems(scheduledItems) {
    const selectedSpecs = state.examDetails.specializations;
    const allExams = [];

    for (const item of scheduledItems) {
        const subject = state.subjectsMasterList.find(s => s.id === item.subjectId);
        if (!subject) continue;

        const examData = {
            date: item.date,
            time: `${formatTime12Hour(item.phase.startTime)} to ${formatTime12Hour(item.phase.endTime)}`,
            code: subject.SubjectCode,
            name: `${subject.SubjectName} (${item.examType})`,
        };

        if (subject.Specialization && subject.Specialization.length > 0) {
            const relevantSpecs = selectedSpecs.length > 0
                ? subject.Specialization.filter(spec => selectedSpecs.includes(spec))
                : subject.Specialization;

            if (relevantSpecs.length > 0) {
                relevantSpecs.forEach(spec => {
                    allExams.push({ ...examData, group: `${subject.Branch} ${subject.Semester} (${spec})` });
                });
            } else if (selectedSpecs.length === 0) {
                subject.Specialization.forEach(spec => {
                    allExams.push({ ...examData, group: `${subject.Branch} ${subject.Semester} (${spec})` });
                });
            }
        } else {
            allExams.push({ ...examData, group: `${subject.Branch} ${subject.Semester}` });
        }
    }

    if (allExams.length === 0) return '';
    const examsByGroup = allExams.reduce((acc, exam) => { if (!acc[exam.group]) { acc[exam.group] = []; } acc[exam.group].push(exam); return acc; }, {});
    for (const group in examsByGroup) { examsByGroup[group].sort((a, b) => new Date(a.date) - new Date(b.date)); }

    let html = '';
    const sortedGroups = Object.keys(examsByGroup).sort();
    for (const groupName of sortedGroups) {
        html += `<div class="mb-8 page-break-after"><h3 class="text-xl font-bold text-gray-800 mb-3 p-2 bg-gray-100 rounded-md">${groupName}</h3><table class="w-full border-collapse text-sm"><thead><tr class="bg-gray-200"><th class="border p-3 text-left w-1/3">DATE & TIME</th><th class="border p-3 text-left w-1/4">COURSE CODE</th><th class="border p-3 text-left">COURSE NAME</th></tr></thead><tbody>`;
        examsByGroup[groupName].forEach(exam => {
            const formattedDate = new Date(exam.date + 'T00:00:00').toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
            html += `<tr><td class="border p-3 align-top"><span class="font-semibold">${formattedDate}</span><br><span class="text-gray-600">${exam.time}</span></td><td class="border p-3 align-top font-mono">${exam.code}</td><td class="border p-3 align-top">${exam.name}</td></tr>`;
        });
        html += `</tbody></table></div>`;
    }
    return html;
}

function generateDutySheetHTML() {
    const dataByRoomDatePhase = {};
    const allDates = new Set();
    const allRoomsMeta = new Map();
    const phasesByDate = {};
    const sortedPhaseKeys = Object.keys(state.dutyAssignments).sort();

    for (const phaseKey of sortedPhaseKeys) {
        const [date, phaseId] = phaseKey.split('|');
        const phaseInfo = state.schedule[date]?.find(p => p.id === phaseId);
        if (!phaseInfo) continue;
        allDates.add(date);
        if (!phasesByDate[date]) phasesByDate[date] = new Set();
        const phaseLabel = `${formatTime12Hour(phaseInfo.startTime)} - ${formatTime12Hour(phaseInfo.endTime)}`;
        phasesByDate[date].add(phaseLabel);
        const roomsForPhase = state.dutyAssignments[phaseKey];
        for (const roomName in roomsForPhase) {
            if (roomsForPhase[roomName].length > 0) {
                if (!allRoomsMeta.has(roomName)) {
                    const block = state.allotment[phaseKey]?.find(b => b.roomName === roomName);
                    allRoomsMeta.set(roomName, { roomName, blockNo: block?.blockNo || 'N/A' });
                }
                if (!dataByRoomDatePhase[roomName]) dataByRoomDatePhase[roomName] = {};
                if (!dataByRoomDatePhase[roomName][date]) dataByRoomDatePhase[roomName][date] = {};
                dataByRoomDatePhase[roomName][date][phaseLabel] = roomsForPhase[roomName];
            }
        }
    }

    const sortedDates = [...allDates].sort();
    const sortedRooms = [...allRoomsMeta.values()].sort((a, b) => (a.blockNo || '').localeCompare(b.blockNo || '', undefined, { numeric: true }));
    for (const date in phasesByDate) {
        phasesByDate[date] = [...phasesByDate[date]].sort();
    }

    let tableHTML = `<table class="w-full border-collapse text-xs">`;
    // HEADERS
    tableHTML += `<thead><tr class="bg-gray-200">`;
    tableHTML += `<th rowspan="2" class="border p-2 align-middle">Block / Room No.</th>`;
    sortedDates.forEach(date => {
        const phases = phasesByDate[date] || [];
        const dayName = new Date(date + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase();
        const formattedDate = new Date(date + 'T00:00:00').toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
        tableHTML += `<th colspan="${phases.length > 0 ? phases.length : 1}" class="border p-2 text-center">${dayName}<br>(${formattedDate})</th>`;
    });
    tableHTML += `</tr><tr class="bg-gray-100">`;
    sortedDates.forEach(date => {
        const phases = phasesByDate[date] || [];
        if (phases.length > 0) {
            phases.forEach(phaseLabel => {
                tableHTML += `<th class="border p-2 text-center">${phaseLabel}</th>`;
            });
        } else {
            tableHTML += `<th class="border p-2"></th>`;
        }
    });
    tableHTML += `</tr></thead>`;

    // BODY
    tableHTML += `<tbody>`;
    sortedRooms.forEach(({ roomName, blockNo }) => {
        tableHTML += `<tr>`;
        tableHTML += `<td class="border p-2 align-top text-center font-bold">${blockNo}<br>${roomName}</td>`;
        sortedDates.forEach(date => {
            const phases = phasesByDate[date] || [];
            if (phases.length === 0) {
                tableHTML += `<td class="border p-2"></td>`;
            } else {
                phases.forEach(phaseLabel => {
                    const faculty = dataByRoomDatePhase[roomName]?.[date]?.[phaseLabel] || [];
                    let totalStudentsInRoom = 0;
                    const currentPhaseInfo = Object.values(state.schedule).flat().find(p => `${formatTime12Hour(p.startTime)} - ${formatTime12Hour(p.endTime)}` === phaseLabel);
                    if (currentPhaseInfo) {
                        const phaseKey = `${date}|${currentPhaseInfo.id}`;
                        const blocksInRoomForPhase = (state.allotment[phaseKey] || []).filter(b => b.roomName === roomName);
                        totalStudentsInRoom = blocksInRoomForPhase.reduce((sum, block) => sum + parseInt(block.studentCount || 0), 0);
                    }
                    let cellContent = faculty.join('<br><br>');
                    if (faculty.length > 0) {
                        // Student count removed from here
                    }
                    tableHTML += `<td class="border p-2 align-top h-28">${cellContent}</td>`;
                });
            }
        });
        tableHTML += `</tr>`;
    });
    tableHTML += `</tbody></table>`;

    if (sortedRooms.length === 0) {
        return '<p class="text-center py-8">No duties assigned yet.</p>';
    }

    return tableHTML;
}

function showDutySheetModal() {
    const dutySheetContent = generateDutySheetHTML();
    state.modal = {
        visible: true,
        title: 'Faculty Duty Sheet Preview',
        content: `<div class="w-full max-w-7xl">
                            <div class="p-4 border-b flex justify-end bg-gray-50 rounded-t-lg">
                                <button id="download-duty-pdf-final" class="flex items-center gap-2 text-sm bg-blue-600 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-blue-700 transition-colors">
                                    ${ICONS.Printer}<span>Download Full PDF</span>
                                </button>
                            </div>
                            <div class="p-4">${dutySheetContent}</div>
                          </div>`
    };
    render();
}

function showDutyMatrixModal(facultyName) {
    const duties = [];
    const sortedPhaseKeys = Object.keys(state.dutyAssignments).sort();

    sortedPhaseKeys.forEach(phaseKey => {
        const [date, phaseId] = phaseKey.split('|');
        const phase = state.schedule[date]?.find(p => p.id === phaseId);
        if (!phase) return;

        const roomsForPhase = state.dutyAssignments[phaseKey];
        for (const roomName in roomsForPhase) {
            if (roomsForPhase[roomName].includes(facultyName)) {
                duties.push({
                    date,
                    time: `${formatTime12Hour(phase.startTime)} - ${formatTime12Hour(phase.endTime)}`,
                    room: roomName
                });
            }
        }
    });

    let content;
    if (duties.length > 0) {
        content = `<div class="p-6">
                            <ul class="space-y-3">
                                ${duties.map(duty => `
                                    <li class="p-3 bg-gray-100 rounded-md border">
                                        <p class="font-semibold">${new Date(duty.date + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
                                        <p class="text-sm text-gray-700">Time: ${duty.time}</p>
                                        <p class="text-sm text-gray-700">Room: <strong>${duty.room}</strong></p>
                                    </li>
                                `).join('')}
                            </ul>
                           </div>`;
    } else {
        content = `<p class="p-6 text-center text-gray-500">No duties assigned to ${facultyName}.</p>`;
    }

    state.modal = {
        visible: true,
        title: `Duty Matrix for ${facultyName}`,
        content: content
    };
    render();
}

function showLoadMatrixModal() {
    const dutyCounts = getFacultyDutyCount();
    const assignedFaculty = Object.entries(dutyCounts).filter(([, count]) => count > 0).sort(([, b], [, a]) => a - b);

    let content;
    if (assignedFaculty.length > 0) {
        content = `
                     <div class="p-4 border-b flex justify-end bg-gray-50 rounded-t-lg">
                         <button id="download-load-matrix-pdf" class="flex items-center gap-2 text-sm bg-blue-600 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-blue-700 transition-colors">
                             ${ICONS.Printer}<span>Download PDF</span>
                         </button>
                     </div>
                     <div class="p-6">
                         <table class="w-full text-sm text-left">
                             <thead class="bg-gray-100">
                                 <tr>
                                     <th class="p-3 font-semibold">Faculty Name</th>
                                     <th class="p-3 font-semibold text-center">Total Duties</th>
                                 </tr>
                             </thead>
                             <tbody>
                                 ${assignedFaculty.map(([name, count]) => `
                                     <tr class="border-t">
                                         <td class="p-3">${name}</td>
                                         <td class="p-3 text-center font-bold">${count}</td>
                                     </tr>
                                 `).join('')}
                             </tbody>
                         </table>
                     </div>`;
    } else {
        content = `<p class="p-6 text-center text-gray-500">No duties have been assigned to any faculty yet.</p>`;
    }

    state.modal = {
        visible: true,
        title: 'Faculty Duty Load Matrix',
        content
    };
    render();
}

function showSeatingPdfOptionsModal() {
    const phaseKeysWithAllotments = Object.keys(state.allotment).filter(key => state.allotment[key] && state.allotment[key].length > 0).sort();

    let content;
    if (phaseKeysWithAllotments.length === 0) {
        content = '<p class="p-6 text-center text-gray-500">No seating arrangements have been created yet.</p>';
    } else {
        content = `
                    <div class="p-6 space-y-4">
                        <p class="text-sm text-gray-600">Choose a specific session to download, or download all arrangements combined into a single PDF.</p>
                        <div class="border-t pt-4">
                            <button data-phase-key="all" class="w-full seating-pdf-option-btn bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 font-semibold mb-4">
                                Download All in One PDF
                            </button>
                            <h4 class="font-semibold text-gray-700 mb-2">Download Individual Session:</h4>
                            <div class="space-y-2 max-h-60 overflow-y-auto pr-2">
                                ${phaseKeysWithAllotments.map(phaseKey => {
            const [date, phaseId] = phaseKey.split('|');
            const phase = state.schedule[date]?.find(p => p.id === phaseId);
            if (!phase) return '';
            const label = `${new Date(date + 'T00:00:00').toLocaleDateString('en-GB')} (${formatTime12Hour(phase.startTime)} - ${formatTime12Hour(phase.endTime)})`;
            return `<button data-phase-key="${phaseKey}" class="w-full text-left seating-pdf-option-btn bg-gray-100 p-3 rounded-lg hover:bg-gray-200 text-sm">${label}</button>`;
        }).join('')}
                            </div>
                        </div>
                    </div>
                `;
    }

    state.modal = {
        visible: true,
        title: 'Download Seating Arrangement PDF',
        content
    };
    render();

    document.querySelectorAll('.seating-pdf-option-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const phaseKey = btn.dataset.phaseKey;
            state.modal.visible = false;
            render(); // Close modal
            generateSeatingArrangementPDF(phaseKey);
        }, { once: true });
    });
}

function showAssignFacultyModal(phaseKey, roomName) {
    const assignedInPhase = Object.values(state.dutyAssignments[phaseKey] || {}).flat();
    const availableFaculty = state.facultyMaster.filter(f => !assignedInPhase.includes(f.name));

    const content = `
                <div class="p-4 border-b">
                    <input type="text" id="modal-faculty-search" placeholder="Search available faculty..." class="w-full p-2 border rounded-md">
                </div>
                <form id="assign-faculty-form" data-phase-key="${phaseKey}" data-room="${roomName}">
                    <div id="modal-faculty-list" class="p-6 space-y-3 max-h-80 overflow-y-auto">
                        ${availableFaculty.length > 0 ? availableFaculty.map(f => `
                            <label class="flex items-center p-3 bg-gray-50 rounded-md hover:bg-gray-100 cursor-pointer">
                                <input type="checkbox" name="faculty" value="${f.name}" class="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500">
                                <span class="ml-3 text-sm font-medium text-gray-800">${f.name}</span>
                            </label>
                        `).join('') : '<p class="text-center text-gray-500">All available faculty are already assigned duties in this time slot.</p>'}
                    </div>
                    <div class="p-4 bg-gray-50 border-t flex justify-end gap-3">
                        <button type="button" id="modal-cancel-btn" class="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300">Cancel</button>
                        <button type="submit" class="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">Assign Selected</button>
                    </div>
                </form>`;

    state.modal = {
        visible: true,
        title: `Assign Faculty to ${roomName}`,
        content
    };
    render();
}

function showAssignSubjectModal(date, phaseId) {
    const schedulableSubjects = getFilteredSubjects();
    const isMultiType = state.examDetails.type.length > 1;
    const inputType = isMultiType ? 'radio' : 'checkbox';

    const content = `
                <div class="p-4 border-b">
                    <input type="text" id="modal-subject-search" placeholder="Search available subjects..." class="w-full p-2 border rounded-md">
                </div>
                <form id="assign-subject-form" data-date="${date}" data-phase-id="${phaseId}">
                    <div class="p-6 space-y-3 max-h-80 overflow-y-auto" id="modal-subject-list">
                        ${isMultiType ? `<p class="text-sm text-yellow-800 bg-yellow-100 p-3 rounded-md border border-yellow-200 mb-4">Please assign one subject at a time when multiple exam types are active.</p>` : ''}
                        ${schedulableSubjects.length > 0 ? schedulableSubjects.map(s => `
                            <label class="flex items-start gap-3 p-3 rounded-lg border ${getColorForBranch(s.Branch)} cursor-pointer transition-all hover:shadow-md">
                                <input type="${inputType}" name="subject" value="${s.id}" class="mt-1 h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500">
                                <div class="flex-grow">
                                    <p class="font-semibold text-sm leading-tight">${s.SubjectName}</p>
                                    <p class="text-xs text-gray-600 mt-1">${s.SubjectCode} | ${s.Branch} | ${s.Semester}</p>
                                    <p class="text-xs text-gray-500">${(s.Specialization || []).join(', ')}</p>
                                </div>
                            </label>
                        `).join('') : '<p class="text-center text-gray-500">All subjects for this exam are already scheduled.</p>'}
                    </div>
                    <div class="p-4 bg-gray-50 border-t flex justify-end gap-3">
                        <button type="button" id="modal-cancel-btn" class="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300">Cancel</button>
                        <button type="submit" class="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">Assign Selected</button>
                    </div>
                </form>`;

    state.modal = {
        visible: true,
        title: `Assign Subjects`,
        content
    };
    render();
}

function showConfirmationModal(title, message, onConfirm) {
    state.modal = {
        visible: true,
        title: title,
        content: `<div class="p-6">
                            <p class="text-gray-600">${message}</p>
                            <div class="mt-6 flex justify-end gap-3">
                                <button type="button" id="modal-cancel-btn" class="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300">Cancel</button>
                                <button type="button" id="modal-confirm-btn" class="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">Confirm</button>
                            </div>
                          </div>`
    };
    render();
    // Add a one-time event listener for the confirm button
    $('#modal-confirm-btn').addEventListener('click', () => {
        onConfirm();
        state.modal.visible = false;
        render();
    }, { once: true });
}


function showTimetableModal() {
    const timetableContent = generateTimetableHTML();
    state.modal = { visible: true, title: 'Exam Timetable Preview', content: `<div class="w-full max-w-5xl"><div class="p-4 border-b flex justify-end bg-gray-50 rounded-t-lg"><button id="print-timetable-btn" class="flex items-center gap-2 text-sm bg-blue-600 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-blue-700 transition-colors">${ICONS.Printer}<span>Download PDF</span></button></div>${timetableContent}</div>` };
    render();
}

function showAddPhaseModal(date) {
    state.modal = { visible: true, title: 'Add New Exam Phase', content: `<form id="add-phase-form" data-date="${date}" class="p-6"><div class="space-y-4"><div class="grid grid-cols-1 sm:grid-cols-2 gap-4"><div><label for="phase-modal-start" class="block text-sm font-medium text-gray-700">Start Time</label><input type="time" id="phase-modal-start" class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500" required value="10:00"></div><div><label for="phase-modal-end" class="block text-sm font-medium text-gray-700">End Time</label><input type="time" id="phase-modal-end" class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500" required value="13:00"></div></div><div class="pt-6 flex justify-end gap-3"><button type="button" id="modal-cancel-btn" class="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300">Cancel</button><button type="submit" class="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">Add Phase</button></div></div></form>` };
    render();
}

function showSelectStudentTypeModal(subjectId, date, phaseId) {
    const subject = state.subjectsMasterList.find(s => s.id == subjectId);
    const content = `
                <form id="select-student-type-form" data-subject-id="${subjectId}" data-date="${date}" data-phase-id="${phaseId}" class="p-6 space-y-4">
                    <p>Select student category for <strong>${subject.SubjectName}</strong>.</p>
                    <div class="space-y-2">
                        <label class="flex items-center p-3 bg-gray-50 rounded-md hover:bg-gray-100 cursor-pointer">
                            <input type="checkbox" name="studentType" value="regular" class="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500" checked>
                            <span class="ml-3 text-sm font-medium text-gray-800">Regular Students</span>
                        </label>
                        <label class="flex items-center p-3 bg-gray-50 rounded-md hover:bg-gray-100 cursor-pointer">
                            <input type="checkbox" name="studentType" value="detained" class="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500">
                            <span class="ml-3 text-sm font-medium text-gray-800">Detained Students</span>
                        </label>
                    </div>
                    <div class="pt-4 flex justify-end gap-3">
                        <button type="button" id="modal-cancel-btn" class="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300">Cancel</button>
                        <button type="submit" class="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">Continue</button>
                    </div>
                </form>
            `;
    state.modal = { visible: true, title: 'Select Student Category', content };
    render();
}

function showSelectExamTypeModal(subjectId, date, phaseId, studentTypesArray) {
    const subject = state.subjectsMasterList.find(s => s.id === subjectId);
    const phase = state.schedule[date].find(p => p.id === phaseId);

    const existingTypesForSubject = phase.subjects
        .filter(item => item.subjectId === subjectId && item.studentType === studentTypesArray[0])
        .map(item => item.examType);

    const availableTypes = state.examDetails.type.filter(t => !existingTypesForSubject.includes(t));

    if (availableTypes.length === 0) {
        notify(`${subject.SubjectName} has already been scheduled for all selected exam types in this phase.`, 'warning');
        return;
    }

    const content = `
                <form id="select-exam-type-form" data-subject-id="${subjectId}" data-date="${date}" data-phase-id="${phaseId}" data-student-types='${JSON.stringify(studentTypesArray)}' class="p-6 space-y-4">
                    <p>Select exam type(s) for <strong>${subject.SubjectName}</strong>.</p>
                    <div class="space-y-2">
                        ${availableTypes.map(type => `
                            <label class="flex items-center p-3 bg-gray-50 rounded-md hover:bg-gray-100 cursor-pointer">
                                <input type="checkbox" name="examType" value="${type}" class="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500">
                                <span class="ml-3 text-sm font-medium text-gray-800">${type}</span>
                            </label>
                        `).join('')}
                    </div>
                    <div class="pt-4 flex justify-end gap-3">
                        <button type="button" id="modal-cancel-btn" class="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300">Cancel</button>
                        <button type="submit" class="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">Assign Subject(s)</button>
                    </div>
                </form>
            `;

    state.modal = {
        visible: true,
        title: 'Select Exam Type(s)',
        content
    };
    render();
}

function showEditBlockModal(phaseKey, blockId) {
    const block = state.allotment[phaseKey]?.find(b => b.id === blockId);
    if (!block) return;
    const [date, phaseId] = phaseKey.split('|');
    const phase = state.schedule[date]?.find(p => p.id === phaseId);

    // Get subjects available for THIS phase
    const scheduledItemsInPhase = phase.subjects;

    const subjectOfBlock = state.subjectsMasterList.find(s => s.id == block.subjectId);

    // --- MODIFIED --- Build subject options for the modal
    let subjectOptionsHtml = '<option value="">-- Select Subject --</option>';
    scheduledItemsInPhase.forEach(item => {
        const s = state.subjectsMasterList.find(sub => sub.id === item.subjectId);
        if (!s) return '';
        const studentTypeLabel = item.studentType === 'detained' ? ' (Detained)' : '';
        const optionText = `${s.SubjectName} (${s.Branch} - ${s.Semester})${studentTypeLabel}`;
        // Pre-select if this block is already assigned this subject instance
        const isSelected = block.subjectId === item.subjectId && block.isDetained === (item.studentType === 'detained');
        subjectOptionsHtml += `<option value="${item.instanceId}" data-subject-id="${s.id}" ${isSelected ? 'selected' : ''}>${optionText}</option>`;
    });

    let specializationHtml = '';
    // --- MODIFIED --- Only show specialization if the currently selected subject has them
    const currentlySelectedSubjectData = subjectOfBlock || // If already assigned
        (document.querySelector(`#edit-block-form [name="scheduledInstanceId"]`) && // Or if selected in dropdown
         document.querySelector(`#edit-block-form [name="scheduledInstanceId"]`).options.selectedIndex > 0 &&
         state.subjectsMasterList.find(s => s.id == document.querySelector(`#edit-block-form [name="scheduledInstanceId"]`).options[document.querySelector(`#edit-block-form [name="scheduledInstanceId"]`).selectedIndex].dataset.subjectId));

    if (currentlySelectedSubjectData && currentlySelectedSubjectData.Specialization && currentlySelectedSubjectData.Specialization.length > 0) {
        specializationHtml = `
                    <div class="specialization-container md:col-span-6">
                        <label class="text-sm font-medium text-gray-700">Specialization</label>
                        <select name="specialization" class="block w-full p-2 border rounded-md text-sm mt-1">
                             <option value="ALL COURSES" ${block.specialization === 'ALL COURSES' ? 'selected' : ''}>ALL COURSES (Remedial/Combined)</option>
                            ${currentlySelectedSubjectData.Specialization.map(spec => `<option value="${spec}" ${block.specialization === spec ? 'selected' : ''}>${spec}</option>`).join('')}
                        </select>
                    </div>`;
    }


    const content = `
                <form id="edit-block-form" data-phase-key="${phaseKey}" data-block-id="${blockId}" class="p-6 space-y-4">
                    <div class="grid grid-cols-1 md:grid-cols-12 gap-4">
                         <!-- --- MODIFIED --- Subject selection for blank blocks -->
                         <div class="md:col-span-12">
                             <label class="text-sm font-medium text-gray-700">Subject</label>
                             <select name="scheduledInstanceId" data-action="update-specializations" class="block w-full p-2 border rounded-md text-sm mt-1 ${block.subjectId ? 'bg-gray-100' : ''}" ${block.subjectId ? 'disabled' : ''}>
                                 ${subjectOptionsHtml}
                             </select>
                             ${block.subjectId ? '<p class="text-xs text-gray-500 mt-1">Subject cannot be changed after initial assignment. Delete and re-add block if needed.</p>' : ''}
                         </div>
                        ${specializationHtml}
                        <div class="md:col-span-6">
                            <label class="text-sm font-medium text-gray-700">Block No.</label>
                            <input type="text" name="blockNo" required value="${block.blockNo}" class="block w-full p-2 border rounded-md text-sm mt-1">
                        </div>
                        <div class="md:col-span-6">
                            <label class="text-sm font-medium text-gray-700">Room</label>
                            <select name="roomName" class="block w-full p-2 border rounded-md text-sm mt-1">
                                ${state.roomsMaster.map(r => `<option value="${r.name}" ${r.name === block.roomName ? 'selected' : ''}>${r.name}</option>`).join('')}
                            </select>
                        </div>
                        <div class="md:col-span-6">
                            <label class="text-sm font-medium text-gray-700">Seat Range</label>
                            <input type="text" name="seatRange" required value="${block.seatRange}" class="block w-full p-2 border rounded-md text-sm mt-1">
                        </div>
                         <div class="md:col-span-6">
                            <label class="text-sm font-medium text-gray-700">No. of Students</label>
                            <input type="number" name="studentCount" required value="${block.studentCount}" class="block w-full p-2 border rounded-md text-sm mt-1">
                        </div>
                    </div>
                    <div class="pt-6 flex justify-end gap-3">
                        <button type="button" id="modal-cancel-btn" class="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300">Cancel</button>
                        <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Save Changes</button>
                    </div>
                </form>
            `;
    state.modal = {
        visible: true,
        title: 'Edit Block',
        content: content
    };
    render();
}

function handleSubjectChange(subjectId, form) {
    const subject = state.subjectsMasterList.find(s => s.id == subjectId);
    const specContainer = form.querySelector('.specialization-container');

    if (specContainer) { // Check if the container exists
        if (subject && subject.Specialization && subject.Specialization.length > 0) {
            specContainer.innerHTML = `
                        <label class="text-xs font-medium text-gray-600">Specialization</label>
                        <select name="specialization" class="block w-full p-2 border rounded-md text-sm mt-1">
                            <option value="ALL COURSES">ALL COURSES (Remedial/Combined)</option>
                            ${subject.Specialization.map(spec => `<option value="${spec}">${spec}</option>`).join('')}
                        </select>
                    `;
        } else {
            specContainer.innerHTML = ''; // Clear if no specializations
        }
    }
}

function renderModal() {
    const container = $('#modal-container');
    if (!state.modal.visible) { container.innerHTML = ''; return; }
    const maxWidth = state.modal.title.includes('Timetable') ? 'max-w-5xl' : (state.modal.title.includes('Duty Sheet') ? 'max-w-7xl' : (state.modal.title.includes('Master Arrangement') ? 'max-w-lg' : 'max-w-2xl')); // --- MODIFIED --- Added width for new modal
    container.innerHTML = `<div id="modal-overlay" class="fixed inset-0 bg-black bg-opacity-60 z-[99] flex justify-center items-center p-4 transition-opacity"><div class="bg-white rounded-lg shadow-xl p-0 w-full ${maxWidth} max-h-[90vh] flex flex-col scale-95 animate-modal-in"><div class="flex justify-between items-center p-5 border-b"><h3 class="text-xl font-bold text-gray-800">${state.modal.title}</h3><button id="modal-close-btn" class="p-2 rounded-full hover:bg-gray-200">${ICONS.XClose}</button></div><div class="overflow-auto">${state.modal.content}</div></div></div>`;

    // Add event listener for modal search after it's rendered
    if (state.modal.title.includes('Assign Faculty')) {
        const searchInput = $('#modal-faculty-search');
        const facultyListContainer = $('#modal-faculty-list');
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const allFacultyLabels = facultyListContainer.querySelectorAll('label');
            allFacultyLabels.forEach(label => {
                const name = label.querySelector('span').textContent.toLowerCase();
                label.style.display = name.includes(searchTerm) ? 'flex' : 'none';
            });
        });
    } else if (state.modal.title.includes('Assign Subjects')) {
        const searchInput = $('#modal-subject-search');
        const subjectListContainer = $('#modal-subject-list');
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const allSubjectLabels = subjectListContainer.querySelectorAll('label');
            allSubjectLabels.forEach(label => {
                // --- BUG FIX ---
                // Search the entire label's text content, not just a span
                const name = label.textContent.toLowerCase();
                // --- END BUG FIX ---
                label.style.display = name.includes(searchTerm) ? 'flex' : 'none';
            });
        });
    }
}

