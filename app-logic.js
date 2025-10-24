// --- GLOBAL STATE & CONSTANTS ---
let state = {
    currentStep: 1,
    examDetails: {
        session: "Summer Internal",
        academicYear: getAcademicYear(),
        type: ['CET 1'],
        branches: [],
        specializations: [],
        semesters: [],
    },
    examName: '',
    subjectsMasterList: [],
    schedule: {},
    roomsMaster: [],
    facultyMaster: [],
    dutyAssignments: {},
    allotment: {},
    copiedAllotment: null, // { sourceKey: string, blocks: [] }
    scheduler: {
        searchTerm: '',
        calendarDate: new Date(),
        selectedDate: null,
    },
    facultySearchTerm: '',
    draggedItemId: null,
    draggedItemType: null,
    modal: { visible: false, title: '', content: '' }
};

const UNIVERSITY_NAME = 'ITM SLS Baroda University';
const SCHOOL_NAME = 'School of Computer Science, Engineering and Technology';
const EXAM_TYPES = ["CET 1", "CET 2", "MST", "REMEDIAL"];
const BRANCHES = ["DIPLOMA", "BCA", "MCA", "BTECH", "MTECH"]; // Added MTECH
const SPECIALIZATIONS = ["CSE", "IT", "AI", "CS", "DS", "CSA", "CSN"];
const SEMESTERS = Array.from({ length: 8 }, (_, i) => `Sem ${i + 1}`);
const STEPS = [
    { number: 1, name: 'Details' }, { number: 2, name: 'Subjects' },
    { number: 3, name: 'Scheduler' }, { number: 4, name: 'Allotment & Rooms' },
    { number: 5, name: 'Duty Assignment' }
];
const BRANCH_COLORS = {
    "BTECH": "bg-blue-100 text-blue-800 border-blue-300",
    "DIPLOMA": "bg-green-100 text-green-800 border-green-300",
    "BCA": "bg-yellow-100 text-yellow-800 border-yellow-300",
    "MCA": "bg-purple-100 text-purple-800 border-purple-300",
    "MTECH": "bg-teal-100 text-teal-800 border-teal-300", // Added MTECH color
    "DEFAULT": "bg-gray-100 text-gray-800 border-gray-300",
};

// --- UTILITY & STATE MANAGEMENT ---
function getAcademicYear() {
    const today = new Date();
    const currentYear = today.getFullYear();
    const month = today.getMonth();
    return month >= 5 ? `${currentYear}-${currentYear + 1}` : `${currentYear - 1}-${currentYear}`;
}
const $ = (selector) => document.querySelector(selector);


function saveState() {
    try {
        const stateToSave = JSON.stringify(state);
        localStorage.setItem('examflow_state', stateToSave);
    } catch (error) {
        console.error("Could not save state to localStorage:", error);
        notify('Could not save progress. Your browser might be in private mode or storage is full.', 'error');
    }
}

function loadState() {
    try {
        const savedState = localStorage.getItem('examflow_state');
        if (savedState) {
            const parsedState = JSON.parse(savedState);
            // Merge saved state. Dates need to be revived into Date objects.
            Object.assign(state, parsedState);
            if (parsedState.scheduler && parsedState.scheduler.calendarDate) {
                state.scheduler.calendarDate = new Date(parsedState.scheduler.calendarDate);
            }
            notify('Your previous session has been loaded.', 'success');
        }
    } catch (error) {
        console.error("Could not load state from localStorage:", error);
        localStorage.removeItem('examflow_state'); // Clear corrupted state
    }
}

function formatTime12Hour(timeString) {
    if (!timeString) return '';
    const [hourString, minute] = timeString.split(':');
    const hour = +hourString % 24;
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minute} ${ampm}`;
}

// --- DATA PROCESSING LOGIC ---

function getFilteredSubjects() {
    const { branches, semesters, specializations } = state.examDetails;
    if (branches.length === 0 && semesters.length === 0 && specializations.length === 0) return state.subjectsMasterList;
    return state.subjectsMasterList.filter(s => {
        const branchMatch = branches.length === 0 || branches.includes(s.Branch?.toUpperCase());
        const semesterMatch = semesters.length === 0 || semesters.includes(s.Semester);
        const specMatch = specializations.length === 0 || (s.Specialization && s.Specialization.some(spec => specializations.includes(spec)));
        return branchMatch && semesterMatch && specMatch;
    });
}

function getFacultyDutyCount() {
    const counts = {};
    state.facultyMaster.forEach(f => counts[f.name] = 0);
    Object.values(state.dutyAssignments).forEach(phase => {
        Object.values(phase).forEach(roomFaculty => {
            roomFaculty.forEach(name => {
                if (counts[name] !== undefined) {
                    counts[name]++;
                }
            });
        });
    });
    return counts;
}

// --- ACTION FUNCTIONS ---
function updateExamName() {
    const examTypes = state.examDetails.type.join(' & ');
    state.examName = `${state.examDetails.session} (${examTypes}) - ${state.examDetails.academicYear}`;
}
function addSubjectManually() {
    const code = $('#subject-code').value.trim();
    const name = $('#subject-name').value.trim();
    const branch = $('#subject-branch').value;
    const semester = $('#subject-semester').value;
    const specializations = Array.from(document.querySelectorAll('[name="subject-specialization"]:checked')).map(cb => cb.value);

    if (code && name && branch && semester) {
        state.subjectsMasterList.push({ id: Date.now(), SubjectCode: code, SubjectName: name, Branch: branch, Semester: semester, Specialization: specializations });
        notify('Subject added to master list.');
        render();
        saveState();
    } else {
        notify('Please fill all required fields for manual entry.', 'error');
    }
}
function addExamDate(date) {
    if (date) {
        if (!state.schedule[date]) { state.schedule[date] = []; }
    }
    state.scheduler.selectedDate = date;
    render();
    saveState();
}
function removePhase(date, phaseId) {
    state.schedule[date] = state.schedule[date].filter(p => p.id !== phaseId);
    render();
    saveState();
}
function addRoom() {
    const nameInput = $('#room-name');
    const capacityInput = $('#room-capacity');
    const name = nameInput.value.trim();
    const capacity = parseInt(capacityInput.value);
    if (name && capacity > 0) {
        state.roomsMaster.push({ id: `room_${Date.now()}`, name, capacity });
        nameInput.value = '';
        capacityInput.value = '';
        notify('Room added successfully.', 'success');
        render();
        saveState();
    } else {
        notify('Please enter a valid room name and capacity.', 'error');
    }
}
function addFaculty() {
    const nameInput = $('#faculty-name');
    const name = nameInput.value.trim();
    if (name) {
        state.facultyMaster.push({ id: `fac_${Date.now()}_${Math.random()}`, name });
        nameInput.value = '';
        notify('Faculty added successfully.', 'success');
        render();
        saveState();
    } else {
        notify('Please enter a faculty name.', 'error');
    }
}
function handleAddBlock(form, phaseKey) {
    const formData = new FormData(form);
    const instanceId = formData.get('scheduledInstanceId');

    let scheduledItem = null;
    let subjectData = null; // --- MODIFIED --- Store subject data
    if (instanceId) {
        for (const date in state.schedule) {
            for (const phase of state.schedule[date]) {
                const found = phase.subjects.find(item => item.instanceId === instanceId);
                if (found) {
                    scheduledItem = found;
                    subjectData = state.subjectsMasterList.find(s => s.id === found.subjectId); // --- MODIFIED --- Get subject data
                    break;
                }
            }
            if (scheduledItem) break;
        }
    }

    if (!scheduledItem || !subjectData) { // --- MODIFIED --- Check subjectData too
        notify('Selected subject is invalid. Please re-select.', 'error');
        return;
    }

    const block = {
        id: `block_${Date.now()}`,
        subjectId: scheduledItem.subjectId, // --- MODIFIED --- Store subjectId directly
        specialization: formData.get('specialization') || null,
        roomName: formData.get('roomName'),
        seatRange: formData.get('seatRange'),
        blockNo: formData.get('blockNo'),
        studentCount: formData.get('studentCount'),
        isDetained: scheduledItem.studentType === 'detained' // --- MODIFIED --- Store isDetained status
    };
    if (block.subjectId && block.roomName && block.seatRange && block.blockNo && block.studentCount) {
        if (!state.allotment[phaseKey]) state.allotment[phaseKey] = [];
        state.allotment[phaseKey].push(block);
        form.reset();
        // --- ADDED --- Reset specialization dropdown after adding
        handleSubjectChange(null, form);
        render();
        saveState();
    } else {
        notify('Please fill all fields to add a block.', 'error');
    }
}
function copyPhases(date) {
    const sortedDatesWithContent = Object.keys(state.schedule).sort().filter(d => state.schedule[d]?.length > 0 && d < date);
    const prevDate = sortedDatesWithContent.length > 0 ? sortedDatesWithContent[sortedDatesWithContent.length - 1] : null;
    if (prevDate) {
        if (!state.schedule[date]) {
            state.schedule[date] = [];
        }
        const phasesToCopy = JSON.parse(JSON.stringify(state.schedule[prevDate]));
        state.schedule[date] = phasesToCopy.map(p => ({ ...p, id: `phase_${Date.now()}_${Math.random()}`, subjects: [] }));
        notify(`Copied ${phasesToCopy.length} phase(s) from ${prevDate}.`, 'success');
        render();
        saveState();
    } else {
        notify('No previous day with phases to copy from.', 'error');
    }
}
async function handleFileUpload(file, type) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        try {
            if (type === 'subject') {
                const header = json[0];
                const dataRows = json.slice(1);
                const newSubs = dataRows.map(row => {
                    let obj = {};
                    header.forEach((h, i) => obj[h] = row[i]);
                    return obj;
                }).map(r => ({
                    id: Date.now() + Math.random(),
                    SubjectCode: r.SubjectCode, SubjectName: r.SubjectName, Branch: r.Branch,
                    Semester: `Sem ${r.Semester}`, Specialization: r.Specialization ? String(r.Specialization).split(',').map(s => s.trim().toUpperCase()) : []
                })).filter(s => s.SubjectCode && s.SubjectName);
                state.subjectsMasterList = newSubs;
                notify(`${newSubs.length} subjects loaded from master list.`);
            } else if (type === 'room') {
                const header = json[0];
                const dataRows = json.slice(1);
                const newRooms = dataRows.map(row => {
                    let obj = {};
                    header.forEach((h, i) => obj[h] = row[i]);
                    return obj;
                }).map(r => ({
                    id: `room_${Date.now()}_${Math.random()}`,
                    name: r.RoomNumber,
                    capacity: parseInt(r.Capacity)
                })).filter(room => room.name && room.capacity > 0);
                state.roomsMaster = newRooms;
                notify(`${newRooms.length} rooms loaded from file.`, 'success');
            } else if (type === 'faculty') {
                const headerRow = json[0];
                const nameIndex = headerRow.findIndex(h => h && h.toLowerCase().includes('name of faculty'));
                if (nameIndex === -1) {
                    notify("Could not find 'Name of Faculty' column in the uploaded file.", 'error');
                    return;
                }
                const newFaculty = json.slice(1)
                    .map(row => row[nameIndex])
                    .filter(name => typeof name === 'string' && name.trim().length > 2)
                    .map(name => ({
                        id: `fac_${Date.now()}_${Math.random()}`,
                        name: name.trim()
                    }));
                state.facultyMaster = newFaculty;
                notify(`${newFaculty.length} faculty loaded from file.`, 'success');
            }
            render();
            saveState();
        } catch (err) { notify('Error processing file. Check format and headers.', 'error'); console.error(err); }
    };
    reader.readAsBinaryString(file);
}

function saveStateToFile() {
    try {
        const stateString = JSON.stringify(state, null, 2);
        const blob = new Blob([stateString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        const date = new Date().toISOString().slice(0, 10);
        a.href = url;
        a.download = `ExamFlow_Backup_${date}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        notify('Data saved to file successfully!', 'success');
    } catch (error) {
        console.error('Failed to save state to file:', error);
        notify('Could not save data to file.', 'error');
    }
}

// --- PDF & EXCEL GENERATION LOGIC ---

async function getImageDataUrlFromDOM(imgId) {
    return new Promise((resolve) => {
        const img = document.getElementById(imgId);
        if (!img) {
            console.error("Image element for PDF not found.");
            resolve(null);
            return;
        }

        // If the image is already loaded and has dimensions, use it.
        if (img.complete && img.naturalHeight !== 0) {
            const canvas = document.createElement('canvas');
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            resolve(canvas.toDataURL('image/png'));
        } else {
            // Otherwise, set up onload and onerror listeners.
            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = img.naturalWidth;
                canvas.height = img.naturalHeight;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);
                resolve(canvas.toDataURL('image/png'));
            };
            img.onerror = () => {
                console.error("Image could not be loaded for PDF generation.");
                resolve(null); // Resolve with null on error
            };
            // Double-check src as a final measure
            if (!img.src) {
                console.error("Image has no src attribute.");
                resolve(null);
            }
        }
    });
}


function addPdfHeader(doc, bannerDataURL, state, title = 'SOCSET', subTitle = null) {
    const bannerWidth = 70;
    const bannerHeight = 15;
    const bannerX = 14;
    const bannerY = 10;
    const rightMargin = doc.internal.pageSize.getWidth() - 14;

    // Left side: Banner Image or Fallback Text
    if (bannerDataURL) {
        try {
            doc.addImage(bannerDataURL, 'PNG', bannerX, bannerY, bannerWidth, bannerHeight);
        } catch (e) {
            console.error("jsPDF error adding image:", e);
            // If addImage fails, draw the text
            doc.setFontSize(14);
            doc.setFont('helvetica', 'bold');
            doc.text('ITM SLS BARODA UNIVERSITY', bannerX, bannerY + 10);
        }
    } else {
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text('ITM SLS BARODA UNIVERSITY', bannerX, bannerY + 10);
    }

    // Right side: Exam Info
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text(title, rightMargin, bannerY + 4, { align: 'right' });

    const examNameString = `${state.examName}`; // Use the full generated name
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text(examNameString, rightMargin, bannerY + 9, { align: 'right' });

    if (subTitle) {
        doc.setFont('helvetica', 'bold');
        doc.text(subTitle, rightMargin, bannerY + 14, { align: 'right' });
    }

    // Bottom line
    doc.setLineWidth(0.5);
    doc.setDrawColor(0); // Black color for the line
    doc.line(14, bannerY + bannerHeight + 4, doc.internal.pageSize.getWidth() - 14, bannerY + bannerHeight + 4);
}

function addDutySheetPdfHeader(doc, bannerDataURL, state) {
    const bannerWidth = 70;
    const bannerHeight = 15;
    const bannerX = 14;
    const bannerY = 10;
    const rightMargin = doc.internal.pageSize.getWidth() - 14;

    if (bannerDataURL) {
        try {
            doc.addImage(bannerDataURL, 'PNG', bannerX, bannerY, bannerWidth, bannerHeight);
        } catch (e) {
            console.error("jsPDF error adding image:", e);
            doc.setFontSize(14);
            doc.setFont('helvetica', 'bold');
            doc.text('ITM SLS BARODA UNIVERSITY', bannerX, bannerY + 10);
        }
    } else {
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text('ITM SLS BARODA UNIVERSITY', bannerX, bannerY + 10);
    }

    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('SOCSET - Faculty Invigilation Duty', rightMargin, bannerY + 5, { align: 'right' });

    const examNameString = `${state.examName}`;
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text(examNameString, rightMargin, bannerY + 10, { align: 'right' });

    doc.setLineWidth(0.5);
    doc.setDrawColor(0);
    doc.line(14, bannerY + bannerHeight + 4, doc.internal.pageSize.getWidth() - 14, bannerY + bannerHeight + 4);
}

async function generateTimetablePDF() {
    notify('Generating PDF, please wait...', 'success');
    const bannerDataURL = await getImageDataUrlFromDOM('site-banner-img');

    // 1. SPLIT items into Regular and Detained lists first
    const regularScheduledItems = [];
    const detainedScheduledItems = [];
    const currentlyFilteredSubjects = getFilteredSubjects();
    const currentlyFilteredSubjectIds = new Set(currentlyFilteredSubjects.map(s => s.id)); // This is the Set

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

    if (regularScheduledItems.length === 0 && detainedScheduledItems.length === 0) {
        notify('No exams scheduled for the selected filters to generate a PDF.', 'error');
        return;
    }

    // Helper to calculate duration
    function calculateDuration(startTime, endTime) {
        if (!startTime || !endTime) return '-';
        try {
            const start = new Date(`1970-01-01T${startTime}`);
            const end = new Date(`1970-01-01T${endTime}`);
            const diff = (end.getTime() - start.getTime()) / 60000; // difference in minutes
            return diff > 0 ? diff.toString() : '-';
        } catch (e) {
            return '-';
        }
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ orientation: 'p', unit: 'mm', format: 'a4' });
    let isFirstPage = true; // Used to prevent adding a new page for the very first section

    // --- This function now processes EITHER the regular OR detained list ---
    const processItemsToPdf = (items, title) => {
        if (items.length === 0) return; // If no items (e.g., no detained), just skip

        // 2. Add a new page for any section AFTER the first one
        if (!isFirstPage) {
            doc.addPage();
        }
        isFirstPage = false; // All subsequent sections will get a new page

        addPdfHeader(doc, bannerDataURL, state);

        const academicSession = state.examDetails.session.toUpperCase().includes("SUMMER") ? "EVEN" : "ODD";
        doc.setFontSize(10); doc.setFont('helvetica', 'normal'); doc.text(`${academicSession} SEMESTER`, doc.internal.pageSize.getWidth() / 2, 38, { align: 'center' });
        doc.setFontSize(14); doc.setFont('helvetica', 'bold'); doc.setTextColor(0, 0, 0); doc.text(title, doc.internal.pageSize.getWidth() / 2, 45, { align: 'center' });

        let startY = 55; // Start position for the first table in THIS section

        const selectedSpecs = state.examDetails.specializations;
        const allExams = [];

        for (const item of items) {
            const subject = state.subjectsMasterList.find(s => s.id === item.subjectId);
            if (!subject) continue;

            const dateObj = new Date(item.date + 'T00:00:00');

            const examData = {
                sortableDate: item.date,
                date: dateObj.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }),
                day: dateObj.toLocaleDateString('en-US', { weekday: 'long' }),
                startTime: formatTime12Hour(item.phase.startTime),
                endTime: formatTime12Hour(item.phase.endTime),
                duration: calculateDuration(item.phase.startTime, item.phase.endTime),
                code: subject.SubjectCode,
                name: subject.SubjectName,
                type: item.examType // No (Detained) label needed here
            };

            // Group by Branch, Semester, and Specialization
            if (subject.Specialization && subject.Specialization.length > 0) {
                const relevantSpecs = selectedSpecs.length > 0 ? subject.Specialization.filter(spec => selectedSpecs.includes(spec)) : subject.Specialization;
                if (relevantSpecs.length > 0) {
                    relevantSpecs.forEach(spec => allExams.push({ ...examData, group: `${subject.Branch} ${subject.Semester} (${spec})` }));
                } else if (selectedSpecs.length === 0) {
                    subject.Specialization.forEach(spec => allExams.push({ ...examData, group: `${subject.Branch} ${subject.Semester} (${spec})` }));
                }
            } else {
                allExams.push({ ...examData, group: `${subject.Branch} ${subject.Semester}` });
            }
        }

        const examsByGroup = allExams.reduce((acc, exam) => {
            if (!acc[exam.group]) { acc[exam.group] = []; }
            acc[exam.group].push(exam); return acc;
        }, {});

        // Loop through each group and print a separate header and table
        const sortedGroups = Object.keys(examsByGroup).sort();

        for (const groupName of sortedGroups) {
            const groupExams = examsByGroup[groupName].sort((a, b) => new Date(a.sortableDate) - new Date(b.sortableDate));
            const tableData = groupExams.map(exam => [
                exam.date, exam.day, exam.startTime, exam.endTime,
                exam.duration, exam.code, exam.name, exam.type
            ]);

            // Check for page break BEFORE drawing the table
            const tableHeight = 15 + 10 + (tableData.length * 8);
            if (startY + tableHeight > doc.internal.pageSize.getHeight() - 20) {
                doc.addPage();
                addPdfHeader(doc, bannerDataURL, state); // Add header to new page
                // Add the main title (e.g., "TIME-TABLE (DETAINED)") to the new page
                doc.setFontSize(14); doc.setFont('helvetica', 'bold'); doc.setTextColor(0, 0, 0); doc.text(`${title} (Contd.)`, doc.internal.pageSize.getWidth() / 2, 45, { align: 'center' });
                startY = 55; // Reset startY for new page
            }

            // Print the Group Name (e.g., "BTECH Sem 7 (CSE)")
            doc.setFontSize(12);
            doc.setFont('helvetica', 'bold');
            doc.text(groupName.toUpperCase(), 14, startY);

            // Print the table for this group
            doc.autoTable({
                startY: startY + 6, // Start table just below the group name
                head: [['Date', 'Day', 'Start Time', 'End Time', 'Duration (min)', 'Code', 'Course Name', 'Type']],
                body: tableData,
                theme: 'grid',
                styles: {
                    cellPadding: 2,
                    fontSize: 8,
                    lineColor: [0, 0, 0],
                    lineWidth: 0.5,
                    textColor: [0, 0, 0]
                },
                headStyles: {
                    fillColor: [220, 220, 220],
                    fontStyle: 'bold',
                    fontSize: 9,
                },
                columnStyles: {
                    0: { cellWidth: 20 }, // Date
                    1: { cellWidth: 22 }, // Day
                    2: { cellWidth: 20 }, // Start Time
                    3: { cellWidth: 20 }, // End Time
                    4: { cellWidth: 20, halign: 'center' }, // Duration
                    5: { cellWidth: 25 }, // Code
                    // 6: Course Name (auto)
                    7: { cellWidth: 15 }  // Type
                }
            });

            startY = doc.autoTable.previous.finalY + 12; // Update Y for the next group
        }
    };

    // 3. CALL THE FUNCTION TWICE - once for regular, once for detained
    processItemsToPdf(regularScheduledItems, "TIME-TABLE");
    processItemsToPdf(detainedScheduledItems, "TIME-TABLE (DETAINED STUDENTS)");

    doc.save(`${state.examName}_Timetable.pdf`);
}

async function exportTimetableToExcel() {
    notify('Generating Timetable Excel...', 'success');

    // 1. GATHER DATA (Re-using logic from PDF/HTML functions)
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

    if (regularScheduledItems.length === 0 && detainedScheduledItems.length === 0) {
        notify('No exams scheduled for the selected filters to export.', 'error');
        return;
    }

    const wb = XLSX.utils.book_new();
    const academicSession = state.examDetails.session.toUpperCase().includes("SUMMER") ? "EVEN" : "ODD";
    const title = `${academicSession} SEMESTER ${state.examDetails.academicYear} - ${state.examDetails.type.join(' & ')} TIME-TABLE`;

    // 2. HELPER FUNCTION to process a list (Regular or Detained)
    const processItemsToSheet = (items, isDetained) => {
        if (items.length === 0) return;

        const selectedSpecs = state.examDetails.specializations;
        const allExams = [];

        for (const item of items) {
            const subject = state.subjectsMasterList.find(s => s.id === item.subjectId);
            if (!subject) continue;

            const dateObj = new Date(item.date + 'T00:00:00');
            const examData = {
                date: dateObj.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }),
                day: dateObj.toLocaleDateString('en-US', { weekday: 'long' }),
                time: `${formatTime12Hour(item.phase.startTime)} to ${formatTime12Hour(item.phase.endTime)}`,
                code: subject.SubjectCode,
                name: subject.SubjectName,
                type: item.examType,
            };

            // Group by Branch, Semester, and Specialization
            if (subject.Specialization && subject.Specialization.length > 0) {
                const relevantSpecs = selectedSpecs.length > 0 ? subject.Specialization.filter(spec => selectedSpecs.includes(spec)) : subject.Specialization;
                if (relevantSpecs.length > 0) {
                    relevantSpecs.forEach(spec => allExams.push({ ...examData, group: `${subject.Branch} ${subject.Semester} (${spec})` }));
                } else if (selectedSpecs.length === 0) {
                    subject.Specialization.forEach(spec => allExams.push({ ...examData, group: `${subject.Branch} ${subject.Semester} (${spec})` }));
                }
            } else {
                allExams.push({ ...examData, group: `${subject.Branch} ${subject.Semester}` });
            }
        }

        const examsByGroup = allExams.reduce((acc, exam) => { if (!acc[exam.group]) { acc[exam.group] = []; } acc[exam.group].push(exam); return acc; }, {});
        for (const group in examsByGroup) { examsByGroup[group].sort((a, b) => new Date(a.date.split('/').reverse().join('-')) - new Date(b.date.split('/').reverse().join('-'))); }

        // 3. CREATE A SHEET FOR EACH GROUP
        const sortedGroups = Object.keys(examsByGroup).sort();
        for (const groupName of sortedGroups) {
            const groupExams = examsByGroup[groupName];

            // Format data for SheetJS
            const sheetData = [
                // Headers
                ["Date", "Day", "Time", "Course Code", "Course Name", "Exam Type"]
            ];

            // Rows
            groupExams.forEach(exam => {
                sheetData.push([
                    exam.date,
                    exam.day,
                    exam.time,
                    exam.code,
                    exam.name,
                    exam.type
                ]);
            });

            const ws = XLSX.utils.aoa_to_sheet(sheetData);

            // Set column widths (optional but nice)
            ws['!cols'] = [{ wch: 12 }, { wch: 15 }, { wch: 25 }, { wch: 15 }, { wch: 40 }, { wch: 12 }];

            // Sheet name
            let sheetName = groupName.replace(/[\*\[\]\:\/\\?\s]/g, '_').substring(0, 25); // Clean and shorten name
            if (isDetained) {
                sheetName = `(D) ${sheetName}`;
            }

            // Add sheet to workbook
            XLSX.utils.book_append_sheet(wb, ws, sheetName);
        }
    };

    // 4. PROCESS BOTH LISTS
    processItemsToSheet(regularScheduledItems, false);
    processItemsToSheet(detainedScheduledItems, true);

    // 5. DOWNLOAD THE FILE
    if (wb.SheetNames.length > 0) {
        XLSX.writeFile(wb, `${state.examName}_Timetable.xlsx`);
    } else {
        notify('No data found to export.', 'warning');
    }
}


async function generateSeatingArrangementPDF(phaseKeyOrAll) {
    const phaseKeysToProcess = phaseKeyOrAll === 'all'
        ? Object.keys(state.allotment).filter(k => state.allotment[k]?.length > 0).sort()
        : [phaseKeyOrAll];

    if (phaseKeysToProcess.length === 0 || !state.allotment[phaseKeysToProcess[0]] || state.allotment[phaseKeysToProcess[0]].length === 0) {
        notify('No allotments created for the selected phase(s).', 'error');
        return;
    }
    notify('Generating Seating Arrangement PDF...', 'success');

    const bannerDataURL = await getImageDataUrlFromDOM('site-banner-img');

    let useLegalFormat = false;
    if (phaseKeyOrAll === 'all') {
        let maxRoomCount = 0;
        for (const phaseKey of phaseKeysToProcess) {
            const blocksInPhase = state.allotment[phaseKey] || [];
            const roomCount = new Set(blocksInPhase.map(b => b.roomName)).size;
            if (roomCount > maxRoomCount) {
                maxRoomCount = roomCount;
            }
        }
        if (maxRoomCount > 7) {
            useLegalFormat = true;
        }
    } else {
        const blocksInPhase = state.allotment[phaseKeyOrAll] || [];
        const roomCount = new Set(blocksInPhase.map(b => b.roomName)).size;
        if (roomCount > 7) {
            useLegalFormat = true;
        }
    }


    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ orientation: 'p', unit: 'mm', format: useLegalFormat ? 'legal' : 'a4' });
    let isFirstPageOfDocument = true;

    for (const phaseKey of phaseKeysToProcess) {
        const [date, phaseId] = phaseKey.split('|');
        const phase = state.schedule[date]?.find(p => p.id === phaseId);
        const blocksInPhase = state.allotment[phaseKey];
        if (!phase || !blocksInPhase || blocksInPhase.length === 0) continue;

        if (!isFirstPageOfDocument) {
            doc.addPage(useLegalFormat ? 'legal' : 'a4');
        }

        const subTitle = `Date: ${new Date(date + 'T00:00:00').toLocaleDateString('en-GB')} | Time: ${formatTime12Hour(phase.startTime)} - ${formatTime12Hour(phase.endTime)}`;
        addPdfHeader(doc, bannerDataURL, state, 'SOCSET Seating Arrangement', subTitle);

        let startY = 32;

        const blocksByRoom = blocksInPhase.reduce((acc, block) => {
            if (!acc[block.roomName]) acc[block.roomName] = [];
            acc[block.roomName].push(block);
            return acc;
        }, {});

        const sortedRooms = Object.keys(blocksByRoom).sort((a, b) => {
            const blockA = (blocksByRoom[a][0].blockNo || '0').toString();
            const blockB = (blocksByRoom[b][0].blockNo || '0').toString();
            return blockA.localeCompare(blockB, undefined, { numeric: true });
        });

        let currentY = startY;

        // Dynamic Font Sizing Logic
        const roomCount = sortedRooms.length;
        let fontSize, cellPadding, verticalGap;

        if (roomCount <= 7) { // User's threshold
            fontSize = 10;
            cellPadding = 2;
            verticalGap = 5;
        } else {
            fontSize = 7;
            cellPadding = 1.3;
            verticalGap = 3;
        }

        for (const roomName of sortedRooms) {
            const roomBlocks = blocksByRoom[roomName];

            const body = roomBlocks.map(block => {
                const subject = state.subjectsMasterList.find(s => s.id == block.subjectId);
                let branchInfo = 'Subject Not Assigned'; // --- MODIFIED --- Default text
                if (subject) {
                    branchInfo = `${subject.Branch} - ${subject.Semester}`;
                    if (block.specialization) {
                        branchInfo += ` / ${block.specialization}`;
                    }
                    if (block.isDetained) {
                        branchInfo += ' (Detained)';
                    }
                }
                return [
                    block.blockNo,
                    branchInfo,
                    block.seatRange,
                    block.studentCount
                ];
            });

            const tableHeight = (body.length + 2) * (fontSize * 0.7); // Estimate height
            if (currentY + tableHeight > doc.internal.pageSize.getHeight() - 15) {
                doc.addPage(useLegalFormat ? 'legal' : 'a4');
                currentY = 20;
                addPdfHeader(doc, bannerDataURL, state, 'SOCSET Seating Arrangement', subTitle + " (Contd.)");
            }

            doc.autoTable({
                startY: currentY,
                head: [[{ content: `Room: ${roomName}`, colSpan: 4, styles: { fontStyle: 'bold', fillColor: [220, 220, 220], textColor: [0, 0, 0], lineColor: [0, 0, 0] } }]],
                body: [
                    ['Block', 'Branch / Semester / Spec', 'Seat Range', 'Students']
                ].concat(body),
                theme: 'grid',
                styles: {
                    cellPadding: cellPadding,
                    fontSize: fontSize,
                    lineColor: [0, 0, 0],
                    textColor: [0, 0, 0]
                },
                headStyles: {
                    fillColor: [240, 240, 240],
                    textColor: [0, 0, 0],
                    fontStyle: 'bold',
                    lineWidth: 0.1,
                },
                bodyStyles: {
                    lineWidth: 0.1
                },
                columnStyles: {
                    0: { cellWidth: 12, halign: 'center' },
                    2: { cellWidth: 40 },
                    3: { cellWidth: 18, halign: 'center' },
                },
                didParseCell: function (data) {
                    if (data.row.index === 0 && data.section === 'body') {
                        data.cell.styles.fontStyle = 'bold';
                    }
                }
            });
            currentY = doc.autoTable.previous.finalY + verticalGap;
        }
        isFirstPageOfDocument = false;
    }

    const fileName = phaseKeyOrAll === 'all'
        ? `${state.examName}_Seating_Arrangement_All.pdf`
        : `${state.examName}_Seating_Arrangement_${phaseKeyOrAll.split('|')[0]}.pdf`;

    doc.save(fileName);
}

// --- NEW --- Export Filled Seating Plan Phase to Excel
function exportPhaseSeatingToExcel(phaseKey) {
    const blocksInPhase = state.allotment[phaseKey];
    if (!blocksInPhase || blocksInPhase.length === 0) {
        notify('No blocks created for this session yet.', 'error');
        return;
    }

    const [date, phaseId] = phaseKey.split('|');
    const phase = state.schedule[date]?.find(p => p.id === phaseId);
    if (!phase) return;

    notify('Generating Seating Plan Excel...', 'success');

    const wb = XLSX.utils.book_new();
    const sheetData = [];

    // Add Header Info
    sheetData.push([`Exam: ${state.examName}`]);
    sheetData.push([`Date: ${new Date(date + 'T00:00:00').toLocaleDateString('en-GB')}`]);
    sheetData.push([`Time: ${formatTime12Hour(phase.startTime)} - ${formatTime12Hour(phase.endTime)}`]);
    sheetData.push([]); // Blank row

    // Table Header
    sheetData.push(['Room', 'Block No.', 'Subject Name', 'Branch/Sem/Spec', 'Seat Range', 'Students']);

    // Group blocks by room and sort
    const blocksByRoom = blocksInPhase.reduce((acc, block) => {
        if (!acc[block.roomName]) acc[block.roomName] = [];
        acc[block.roomName].push(block);
        return acc;
    }, {});
    const sortedRooms = Object.keys(blocksByRoom).sort((a, b) => {
        const blockA = (blocksByRoom[a][0].blockNo || '0').toString();
        const blockB = (blocksByRoom[b][0].blockNo || '0').toString();
        return blockA.localeCompare(blockB, undefined, { numeric: true });
    });

    // Populate Table Data
    for (const roomName of sortedRooms) {
        const roomBlocks = blocksByRoom[roomName];
        roomBlocks.forEach(block => {
            const subject = state.subjectsMasterList.find(s => s.id == block.subjectId);
            let subjectName = 'N/A';
            let branchInfo = 'Subject Not Assigned';
            if (subject) {
                subjectName = subject.SubjectName;
                branchInfo = `${subject.Branch} ${subject.Semester}`;
                if (block.specialization) {
                    branchInfo += ` (${block.specialization})`;
                }
                if (block.isDetained) {
                    branchInfo += ' (Detained)';
                }
            }
            sheetData.push([
                block.roomName,
                block.blockNo,
                subjectName,
                branchInfo,
                block.seatRange,
                block.studentCount
            ]);
        });
        // Add room total row
        const roomTotal = roomBlocks.reduce((sum, b) => sum + parseInt(b.studentCount || 0), 0);
        const roomData = state.roomsMaster.find(r => r.name === roomName);
        const roomCap = roomData ? roomData.capacity : 'N/A';
        sheetData.push([null, null, null, `Total for ${roomName}:`, `${roomTotal} / ${roomCap}`]);
        sheetData.push([]); // Blank row between rooms
    }


    const ws = XLSX.utils.aoa_to_sheet(sheetData);

    // Set column widths (optional but nice)
    ws['!cols'] = [
        { wch: 15 }, // Room
        { wch: 10 }, // Block No.
        { wch: 40 }, // Subject Name
        { wch: 30 }, // Branch/Sem/Spec
        { wch: 20 }, // Seat Range
        { wch: 10 }  // Students
    ];

    // Add sheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Seating Plan');

    // Download the file
    const safeDate = date.replace(/-/g, '');
    XLSX.writeFile(wb, `${state.examName}_Seating_${safeDate}.xlsx`);

}


async function generateDutySheetPDF(specificPhaseKey = null) {
    const sortedPhaseKeys = Object.keys(state.dutyAssignments).sort();
    const finalPhaseKeys = specificPhaseKey ? [specificPhaseKey] : sortedPhaseKeys;

    if (finalPhaseKeys.length === 0 || Object.keys(state.dutyAssignments).length === 0) {
        notify('No duties assigned yet.', 'error');
        return;
    }

    notify('Generating Duty Sheet PDF...', 'success');
    const bannerDataURL = await getImageDataUrlFromDOM('site-banner-img');

    const dataByRoomDatePhase = {};
    const allDates = new Set();
    const allRoomsMeta = new Map();
    const phasesByDate = {};

    for (const phaseKey of finalPhaseKeys) {
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

    if (sortedRooms.length === 0) {
        notify('No duties assigned to any rooms with blocks.', 'error');
        return;
    }

    const { jsPDF } = window.jspdf;
    const orientation = sortedRooms.length > 12 ? 'portrait' : 'landscape';
    const doc = new jsPDF({ orientation, unit: 'mm', format: 'a4' });
    const DATES_PER_PAGE = specificPhaseKey ? sortedDates.length : (orientation === 'landscape' ? 4 : 2);

    const dateChunks = [];
    for (let i = 0; i < sortedDates.length; i += DATES_PER_PAGE) {
        dateChunks.push(sortedDates.slice(i, i + DATES_PER_PAGE));
    }

    for (const [pageIndex, dateChunk] of dateChunks.entries()) {
        if (pageIndex > 0) {
            doc.addPage();
        }

        addDutySheetPdfHeader(doc, bannerDataURL, state);

        const headRow1 = [{ content: 'Block / Room No.', rowSpan: 2, styles: { valign: 'middle' } }];
        const headRow2 = [];

        dateChunk.forEach(date => {
            const phases = phasesByDate[date] || [];
            const dayName = new Date(date + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase();
            const formattedDate = new Date(date + 'T00:00:00').toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
            headRow1.push({ content: `${dayName}\n(${formattedDate})`, colSpan: phases.length > 0 ? phases.length : 1, styles: { halign: 'center' } });
            if (phases.length > 0) {
                phases.forEach(phaseLabel => {
                    headRow2.push({ content: phaseLabel, styles: { halign: 'center', minCellHeight: 10 } });
                });
            } else {
                headRow2.push('');
            }
        });

        const head = [headRow1, headRow2];
        const body = [];

        sortedRooms.forEach(({ roomName, blockNo }) => {
            const row = [{ content: `${blockNo}\n${roomName}`, styles: { fontStyle: 'bold', valign: 'middle', halign: 'center' } }];
            dateChunk.forEach(date => {
                const phases = phasesByDate[date] || [];
                if (phases.length === 0) {
                    row.push('');
                } else {
                    phases.forEach(phaseLabel => {
                        const faculty = dataByRoomDatePhase[roomName]?.[date]?.[phaseLabel] || [];
                        const cellContent = faculty.join('\n\n');
                        row.push(cellContent);
                    });
                }
            });
            body.push(row);
        });

        doc.autoTable({
            head: head,
            body: body,
            startY: 35,
            theme: 'grid',
            styles: { fontSize: 8, cellPadding: 2, valign: 'top', lineColor: [0, 0, 0], textColor: [0, 0, 0], lineWidth: 0.2 },
            headStyles: {
                fontStyle: 'bold',
                halign: 'center',
                valign: 'middle',
                fillColor: [255, 255, 255],
                textColor: [0, 0, 0],
                fontSize: 7,
                lineColor: [0, 0, 0],
                lineWidth: 0.3
            },
            bodyStyles: { lineColor: [0, 0, 0], minCellHeight: 13, textColor: [0, 0, 0], lineWidth: 0.2 },
        });
    }

    const fileName = specificPhaseKey
        ? `${state.examName}_Duty_Sheet_${specificPhaseKey.replace('|', '_')}.pdf`
        : `${state.examName}_Duty_Sheet_Paginated.pdf`;
    doc.save(fileName);
}

async function exportDutySheetToExcel() {
    notify('Generating Duty Sheet Excel...', 'success');

    // 1. GATHER DATA (Copied from generateDutySheetHTML)
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

    if (sortedRooms.length === 0) {
        notify('No duties assigned yet to export.', 'error');
        return;
    }

    // 2. BUILD EXCEL DATA (Array of Arrays)
    const sheetData = [];
    const merges = [];

    // -- Header Row 1 (Dates) --
    const headerRow1 = ['Block / Room No.'];
    let colIndex = 1;
    sortedDates.forEach(date => {
        const phases = phasesByDate[date] || [];
        const dayName = new Date(date + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase();
        const formattedDate = new Date(date + 'T00:00:00').toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });

        headerRow1.push(`${dayName}\n(${formattedDate})`);

        // Add merge info for this date
        if (phases.length > 1) {
            merges.push({ s: { r: 0, c: colIndex }, e: { r: 0, c: colIndex + phases.length - 1 } });
        }
        // Add nulls for remaining spanned columns
        for (let i = 1; i < phases.length; i++) {
            headerRow1.push(null);
        }
        colIndex += phases.length > 0 ? phases.length : 1;
    });
    sheetData.push(headerRow1);

    // -- Header Row 2 (Phases) --
    const headerRow2 = [null]; // Spanned by "Block / Room No."
    sortedDates.forEach(date => {
        const phases = phasesByDate[date] || [];
        if (phases.length > 0) {
            phases.forEach(phaseLabel => headerRow2.push(phaseLabel));
        } else {
            headerRow2.push(null); // Placeholder if a date has no phases
        }
    });
    sheetData.push(headerRow2);

    // Add merge info for the first cell (A1:A2)
    merges.push({ s: { r: 0, c: 0 }, e: { r: 1, c: 0 } });

    // -- Body Rows (Rooms & Faculty) --
    sortedRooms.forEach(({ roomName, blockNo }) => {
        const row = [`${blockNo}\n${roomName}`];
        sortedDates.forEach(date => {
            const phases = phasesByDate[date] || [];
            if (phases.length === 0) {
                row.push(null);
            } else {
                phases.forEach(phaseLabel => {
                    const faculty = dataByRoomDatePhase[roomName]?.[date]?.[phaseLabel] || [];
                    const cellContent = faculty.join('\n'); // Excel uses \n for newlines in a cell
                    row.push(cellContent);
                });
            }
        });
        sheetData.push(row);
    });

    // 3. CREATE WORKSHEET & WORKBOOK
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(sheetData);

    // 4. APPLY MERGES
    ws['!merges'] = merges;

    // 5. SET COLUMN WIDTHS
    const cols = [{ wch: 20 }]; // "Block / Room No." column
    for (let i = 1; i < headerRow2.length; i++) {
        cols.push({ wch: 30 }); // Set all faculty columns to a good width
    }
    ws['!cols'] = cols;

    // 6. DOWNLOAD
    XLSX.utils.book_append_sheet(wb, ws, 'Duty_Sheet');
    XLSX.writeFile(wb, `${state.examName}_Duty_Sheet.xlsx`);
}

async function generateAnswerSheetPDF() {
    notify('Generating Answer Sheet PDF...', 'success');
    const bannerDataURL = await getImageDataUrlFromDOM('site-banner-img');

    const allExams = [];
    const currentlyFilteredSubjects = getFilteredSubjects();
    const currentlyFilteredSubjectIds = new Set(currentlyFilteredSubjects.map(s => s.id));

    for (const date in state.schedule) {
        for (const phase of state.schedule[date]) {
            for (const scheduledItem of phase.subjects) {
                if (!currentlyFilteredSubjectIds.has(scheduledItem.subjectId)) {
                    continue;
                }
                const subject = state.subjectsMasterList.find(s => s.id === scheduledItem.subjectId);
                if (subject) {
                    allExams.push({
                        date,
                        time: `${formatTime12Hour(phase.startTime)} to ${formatTime12Hour(phase.endTime)}`,
                        code: subject.SubjectCode,
                        name: subject.SubjectName,
                        branch: subject.Branch,
                        semester: subject.Semester
                    });
                }
            }
        }
    }

    if (allExams.length === 0) {
        notify('No exams scheduled for the selected filters.', 'error');
        return;
    }

    // Group by Branch, then by Semester
    const examsByBranch = allExams.reduce((acc, exam) => {
        const branchKey = exam.branch || 'Uncategorized';
        if (!acc[branchKey]) { acc[branchKey] = {}; }
        if (!acc[branchKey][exam.semester]) { acc[branchKey][exam.semester] = []; }
        acc[branchKey][exam.semester].push(exam);
        return acc;
    }, {});

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ orientation: 'p', unit: 'mm', format: 'a4' });
    let isFirstBranch = true;

    const sortedBranches = Object.keys(examsByBranch).sort();

    for (const branchName of sortedBranches) {
        if (!isFirstBranch) {
            doc.addPage();
        }

        addPdfHeader(doc, bannerDataURL, state, 'Answer Sheet Issue Sheet');
        let startY = 35;

        isFirstBranch = false;
        const sortedSemesters = Object.keys(examsByBranch[branchName]).sort();

        for (const semesterName of sortedSemesters) {
            const groupName = `${branchName} ${semesterName}`;
            const examsInGroup = examsByBranch[branchName][semesterName];
            examsInGroup.sort((a, b) => new Date(a.date) - new Date(b.date));

            const tableData = examsInGroup.map(exam => [
                '', // Blank Date & Time
                exam.code,
                exam.name,
                '', // Blank Answersheet Count
                '', // Blank Faculty Name
                ''  // Blank Signature
            ]);

            // Check if there is enough space, otherwise add a new page
            const tableHeight = (tableData.length + 1) * 8 + 10; // Estimated height
            if (startY + tableHeight > doc.internal.pageSize.getHeight() - 15) {
                doc.addPage();
                addPdfHeader(doc, bannerDataURL, state, 'Answer Sheet Issue Sheet');
                startY = 35;
            }


            doc.setFontSize(14);
            doc.setFont('helvetica', 'bold');
            doc.text(groupName.toUpperCase(), 14, startY);
            startY += 6;

            doc.autoTable({
                startY: startY,
                head: [['DATE & TIME', 'COURSE CODE', 'COURSE NAME', 'Answersheet Count', 'Faculty Name', 'Signature']],
                body: tableData,
                theme: 'grid',

                // --- APPLIED NEW THEME ---
                styles: {
                    fontSize: 8,
                    lineColor: [0, 0, 0],    // Pure Black lines
                    lineWidth: 0.5,          // 0.5pt border thickness
                    textColor: [0, 0, 0],    // Pure Black text
                    cellPadding: 2
                },
                headStyles: {
                    fillColor: [220, 220, 220], // Light gray header
                    textColor: [0, 0, 0],    // Pure Black header text
                    fontStyle: 'bold',
                    // Inherits line color/width from styles
                },
                // --- END OF THEME ---

                columnStyles: {
                    0: { cellWidth: 25 },
                    1: { cellWidth: 25 },
                    2: { cellWidth: 'auto' },
                    3: { cellWidth: 20 },
                    4: { cellWidth: 30 },
                    5: { cellWidth: 25 }
                }
            });

            startY = doc.autoTable.previous.finalY + 10;
        }
    }

    doc.save(`${state.examName}_AnswerSheet_Issue.pdf`);
}

async function generateLoadMatrixPDF() {
    const dutyCounts = getFacultyDutyCount();
    const assignedFaculty = Object.entries(dutyCounts).filter(([, count]) => count > 0).sort(([, b], [, a]) => a - b);

    if (assignedFaculty.length === 0) {
        notify("No duties have been assigned to any faculty yet.", "warning");
        return;
    }

    const bannerDataURL = await getImageDataUrlFromDOM('site-banner-img');

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    addPdfHeader(doc, bannerDataURL, state);

    doc.setFontSize(12); doc.setFont('helvetica', 'bold'); doc.text(`Faculty Duty Load Matrix`, doc.internal.pageSize.getWidth() / 2, 35, { align: 'center' });

    const tableData = assignedFaculty.map(([name, count]) => [name, count]);

    doc.autoTable({
        head: [['Faculty Name', 'Total Duties']],
        body: tableData,
        startY: 48,
        theme: 'grid',
        headStyles: {
            fillColor: [255, 255, 255],
            textColor: [0, 0, 0],
            fontStyle: 'bold',
            lineColor: [0, 0, 0]
        },
        styles: { lineColor: [0, 0, 0] },
        columnStyles: { 1: { halign: 'center' } }
    });

    doc.save(`${state.examName}_Load_Matrix.pdf`);
}

// --- UPDATED --- Generate Master Arrangement PDF (New Format - Based on Image)
async function generateMasterArrangementPDF(selectedPhaseTimes) {
    if (!selectedPhaseTimes || selectedPhaseTimes.length === 0) {
        notify('Please select at least one phase time.', 'error');
        return;
    }
    notify('Generating Master Arrangement PDF...', 'success');

    const bannerDataURL = await getImageDataUrlFromDOM('site-banner-img');
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ orientation: 'p', unit: 'mm', format: 'a4' });

    const subTitle = `Selected Times: ${selectedPhaseTimes.join(', ')}`;
    addPdfHeader(doc, bannerDataURL, state, 'Master Seating Arrangement', subTitle);

    let startY = 32;
    const allBlockEntries = []; // Collect all individual block entries

    // Collect all relevant block entries
    Object.keys(state.allotment).forEach(phaseKey => {
        const [date, phaseId] = phaseKey.split('|');
        const phase = state.schedule[date]?.find(p => p.id === phaseId);
        if (!phase) return;

        const phaseTimeLabel = `${formatTime12Hour(phase.startTime)} - ${formatTime12Hour(phase.endTime)}`;
        const useAllPhases = selectedPhaseTimes.includes('All Phases');

        if (useAllPhases || selectedPhaseTimes.includes(phaseTimeLabel)) {
            state.allotment[phaseKey].forEach(blockEntry => {
                if (!blockEntry.subjectId) return; // Skip blocks without assigned subjects

                const subject = state.subjectsMasterList.find(s => s.id === blockEntry.subjectId);
                if (subject) {
                     // Check if an identical entry (room, block, subject, spec, detained) already exists in our collected list
                     // This prevents listing the exact same assignment multiple times if it occurs on different days within the selected phases
                     const isDuplicate = allBlockEntries.some(entry =>
                         entry.roomName === blockEntry.roomName &&
                         entry.blockNo === blockEntry.blockNo &&
                         entry.subjectId === blockEntry.subjectId &&
                         entry.specialization === blockEntry.specialization &&
                         entry.isDetained === blockEntry.isDetained &&
                         entry.seatRange === blockEntry.seatRange // Also check seat range JIC
                     );

                    if (!isDuplicate) {
                         allBlockEntries.push({
                             ...blockEntry, // Copy the block entry data
                             subjectData: subject // Add subject data for formatting
                         });
                    }
                }
            });
        }
    });

    // Sort the collected entries by Room, then Block
    allBlockEntries.sort((a, b) => {
        const roomCompare = a.roomName.localeCompare(b.roomName);
        if (roomCompare !== 0) return roomCompare;
        return (a.blockNo || '').localeCompare(b.blockNo || '', undefined, { numeric: true });
    });


    if (allBlockEntries.length === 0) {
        notify('No blocks found for the selected phase times.', 'warning');
        doc.text('No blocks found for the selected phase times.', 14, startY + 10);
         doc.save(`${state.examName}_Master_Arrangement_${selectedPhaseTimes.join('_').replace(/[:\s]/g,'')}.pdf`);
        return;
    }

    // Group sorted entries by Block Number + Room Name to handle page breaks correctly
    const blocksGrouped = allBlockEntries.reduce((acc, entry) => {
        const key = `Block ${entry.blockNo} (${entry.roomName})`;
        if (!acc[key]) {
            acc[key] = {
                blockNo: entry.blockNo,
                roomName: entry.roomName,
                entries: []
            };
        }
        acc[key].entries.push(entry);
        return acc;
    }, {});

     const sortedBlockGroupKeys = Object.keys(blocksGrouped).sort((a, b) => {
         // Extract room and block for sorting
         const [, blockA, roomA] = a.match(/Block (\S+) \(Room: (.*)\)/) || [];
         const [, blockB, roomB] = b.match(/Block (\S+) \(Room: (.*)\)/) || [];
         const roomCompare = roomA.localeCompare(roomB);
         if (roomCompare !== 0) return roomCompare;
         return (blockA || '').localeCompare(blockB || '', undefined, { numeric: true });
     });


    for (const blockKey of sortedBlockGroupKeys) {
        const blockGroupData = blocksGrouped[blockKey];

        // Prepare body data for the table specific to this block group
        const tableBody = blockGroupData.entries.map(entry => {
            let specDisplay = `${entry.subjectData.Semester}`;
             // Only add specialization if it's not 'ALL COURSES'
            if(entry.specialization && entry.specialization !== 'ALL COURSES') {
                specDisplay += ` ${entry.specialization}`;
            }
             if (entry.isDetained) {
                 specDisplay += ' (Detained)';
             }
            return [
                entry.subjectData.Semester, // Sem column
                { content: entry.studentCount, styles: { fontStyle: 'bold', halign: 'center' } }, // Count column
                specDisplay, // Specialization column
                entry.seatRange // Seat Number column
            ];
        });

        // Add a row for total students in this block group
         const blockTotalStudents = blockGroupData.entries.reduce((sum, entry) => sum + parseInt(entry.studentCount || 0), 0);
         tableBody.push([
             { content: `Total:`, colSpan: 1, styles: { halign: 'right', fontStyle: 'bold'} },
             { content: blockTotalStudents, styles: { fontStyle: 'bold', halign: 'center' } },
             { content: '', colSpan: 2} // Empty cells to fill row
         ]);

        // Estimate height for page break check
        const estimatedHeight = 10 + (tableBody.length * 7); // Header + Rows
        if (startY + estimatedHeight > doc.internal.pageSize.getHeight() - 15) {
            doc.addPage();
            addPdfHeader(doc, bannerDataURL, state, 'Master Seating Arrangement', subTitle + " (Contd.)");
            startY = 32;
        }

        // Draw the table for this block
        doc.autoTable({
            startY: startY,
            // Block Header Row
            head: [[{ content: `Block: ${blockGroupData.blockNo} (Room: ${blockGroupData.roomName})`, colSpan: 4, styles: { fontStyle: 'bold', fillColor: [220, 220, 220], textColor: [0, 0, 0] } }]],
            // Column Headers
            body: [
                 ['Sem', 'Count', 'Specialization', 'Seat Number'] // Your desired columns
            ].concat(tableBody), // Add the data rows
            theme: 'grid',
            styles: { fontSize: 8, cellPadding: 1.5, lineColor: [0, 0, 0], lineWidth: 0.2 },
             headStyles: { // Styles for the Block Header row
                 fontStyle: 'bold',
                 fillColor: [220, 220, 220],
                 textColor: [0, 0, 0],
                 fontSize: 10,
                 cellPadding: 2,
             },
            bodyStyles: { // Styles for data rows + column header row
                 // fillColor: [255, 255, 255] // Ensure body rows have white background if needed
            },
            columnStyles: {
                0: { cellWidth: 15, halign: 'center' }, // Sem
                1: { cellWidth: 15, halign: 'center' }, // Count
                2: { cellWidth: 35 }, // Specialization
                3: { cellWidth: 'auto'} // Seat Number (auto width)
            },
            didParseCell: (data) => {
                 // Style the Column Header row differently (it's the first row in the body array)
                 if (data.row.index === 0 && data.section === 'body') {
                     data.cell.styles.fontStyle = 'bold';
                     data.cell.styles.fillColor = [240, 240, 240];
                     data.cell.styles.halign = 'center';
                 }
                // Style the Total row
                 if (data.row.index === tableBody.length && data.section === 'body') { // Last row is the total row
                     data.cell.styles.fillColor = [230, 230, 230];
                     data.cell.styles.fontStyle = 'bold';
                     if (data.column.index === 0) data.cell.styles.halign = 'right';
                     if (data.column.index === 1) data.cell.styles.halign = 'center';
                 }
            }
        });
        startY = doc.autoTable.previous.finalY + 8; // Add gap before next block
    }


    doc.save(`${state.examName}_Master_Arrangement_${selectedPhaseTimes.join('_').replace(/[:\s]/g,'')}.pdf`);
}


// --- UPDATED --- Export Master Arrangement to Excel (New Format - Based on Image)
function exportMasterArrangementToExcel(selectedPhaseTimes) {
     if (!selectedPhaseTimes || selectedPhaseTimes.length === 0) {
        notify('Please select at least one phase time.', 'error');
        return;
    }
    notify('Generating Master Arrangement Excel...', 'success');

    const wb = XLSX.utils.book_new();
    const sheetData = [];
    const merges = [];
    let currentRow = 0; // Track the current row index for merges

    // Add Header Info
    sheetData.push([`Exam: ${state.examName}`]); currentRow++;
    sheetData.push([`Selected Times: ${selectedPhaseTimes.join(', ')}`]); currentRow++;
    sheetData.push([]); currentRow++; // Blank row

    const allBlockEntries = []; // Collect all individual block entries

    // Collect all relevant block entries (Same logic as PDF)
    Object.keys(state.allotment).forEach(phaseKey => {
        const [date, phaseId] = phaseKey.split('|');
        const phase = state.schedule[date]?.find(p => p.id === phaseId);
        if (!phase) return;

        const phaseTimeLabel = `${formatTime12Hour(phase.startTime)} - ${formatTime12Hour(phase.endTime)}`;
        const useAllPhases = selectedPhaseTimes.includes('All Phases');

        if (useAllPhases || selectedPhaseTimes.includes(phaseTimeLabel)) {
            state.allotment[phaseKey].forEach(blockEntry => {
                if (!blockEntry.subjectId) return;

                const subject = state.subjectsMasterList.find(s => s.id === blockEntry.subjectId);
                if (subject) {
                     const isDuplicate = allBlockEntries.some(entry =>
                         entry.roomName === blockEntry.roomName &&
                         entry.blockNo === blockEntry.blockNo &&
                         entry.subjectId === blockEntry.subjectId &&
                         entry.specialization === blockEntry.specialization &&
                         entry.isDetained === blockEntry.isDetained &&
                         entry.seatRange === blockEntry.seatRange
                     );
                     if (!isDuplicate) {
                         allBlockEntries.push({ ...blockEntry, subjectData: subject });
                     }
                }
            });
        }
    });

     // Sort the collected entries by Room, then Block
     allBlockEntries.sort((a, b) => {
         const roomCompare = a.roomName.localeCompare(b.roomName);
         if (roomCompare !== 0) return roomCompare;
         return (a.blockNo || '').localeCompare(b.blockNo || '', undefined, { numeric: true });
     });

     if (allBlockEntries.length === 0) {
         notify('No blocks found for the selected phase times.', 'warning');
         return;
     }

     // Group sorted entries by Block Number + Room Name
    const blocksGrouped = allBlockEntries.reduce((acc, entry) => {
        const key = `Block ${entry.blockNo} (${entry.roomName})`;
        if (!acc[key]) {
            acc[key] = {
                blockNo: entry.blockNo,
                roomName: entry.roomName,
                entries: []
            };
        }
        acc[key].entries.push(entry);
        return acc;
    }, {});

     const sortedBlockGroupKeys = Object.keys(blocksGrouped).sort((a, b) => {
         const [, blockA, roomA] = a.match(/Block (\S+) \(Room: (.*)\)/) || [];
         const [, blockB, roomB] = b.match(/Block (\S+) \(Room: (.*)\)/) || [];
         const roomCompare = roomA.localeCompare(roomB);
         if (roomCompare !== 0) return roomCompare;
         return (blockA || '').localeCompare(blockB || '', undefined, { numeric: true });
     });


    // Process each block group
    for (const blockKey of sortedBlockGroupKeys) {
        const blockGroupData = blocksGrouped[blockKey];
        const blockHeader = `Block: ${blockGroupData.blockNo} (Room: ${blockGroupData.roomName})`;

        // Add Block Header Row - Merged across 4 columns
        sheetData.push([blockHeader, null, null, null]);
        merges.push({ s: { r: currentRow, c: 0 }, e: { r: currentRow, c: 3 } }); // Merge A to D
        currentRow++;

        // Add Column Headers
        sheetData.push(['Sem', 'Count', 'Specialization', 'Seat Number']);
        currentRow++;

        // Add Data Rows for each entry in the group
        blockGroupData.entries.forEach(entry => {
             let specDisplay = `${entry.subjectData.Semester}`;
             if(entry.specialization && entry.specialization !== 'ALL COURSES') {
                 specDisplay += ` ${entry.specialization}`;
             }
             if (entry.isDetained) {
                 specDisplay += ' (Detained)';
             }
            sheetData.push([
                entry.subjectData.Semester,
                entry.studentCount,
                specDisplay,
                entry.seatRange
            ]);
            currentRow++;
        });

         // Add Total Row
         const blockTotalStudents = blockGroupData.entries.reduce((sum, entry) => sum + parseInt(entry.studentCount || 0), 0);
         sheetData.push(['Total:', blockTotalStudents, null, null]); // Total in second column
         currentRow++;

        // Add Blank Row Spacer
        sheetData.push([]); currentRow++;
    }


    const ws = XLSX.utils.aoa_to_sheet(sheetData);
    ws['!merges'] = merges;

     // Set column widths
     ws['!cols'] = [ { wch: 10 }, { wch: 10 }, { wch: 25 }, { wch: 50 } ]; // Adjust widths as needed


    XLSX.utils.book_append_sheet(wb, ws, 'Master Arrangement');
    XLSX.writeFile(wb, `${state.examName}_Master_Arrangement_${selectedPhaseTimes.join('_').replace(/[:\s]/g,'')}.xlsx`);

}


// --- SCHEDULING LOGIC (New & Refactored) ---

function addSubjectToPhase(subjectId, date, phaseId) {
    const subject = state.subjectsMasterList.find(s => s.id == subjectId);
    if (!subject) return;

    const semNumber = parseInt((subject.Semester || 'Sem 0').replace('Sem ', ''));
    const branch = subject.Branch?.toUpperCase();
    const applicableBranches = ['BTECH', 'DIPLOMA', 'BCA', 'MTECH']; // Added MTECH here too
    const isDetainEligible = applicableBranches.includes(branch) && semNumber >= 5;

    if (isDetainEligible) {
        showSelectStudentTypeModal(subjectId, date, phaseId);
    } else {
        continueScheduling(subjectId, date, phaseId, ['regular']);
    }
}

function continueScheduling(subjectId, date, phaseId, studentTypesArray) {
    const examTypes = state.examDetails.type;
    const subjectIdAsNumber = parseFloat(subjectId);

    if (examTypes.length === 1) {
        const phase = state.schedule[date].find(p => p.id === phaseId);
        studentTypesArray.forEach(studentType => {
            phase.subjects.push({
                instanceId: `subinst_${Date.now()}_${Math.random()}`,
                subjectId: subjectIdAsNumber,
                examType: examTypes[0],
                studentType: studentType
            });
        });
        render();
        saveState();
    } else {
        showSelectExamTypeModal(subjectIdAsNumber, date, phaseId, studentTypesArray);
    }
}

// --- EVENT HANDLERS & INITIALIZATION ---
function handleGlobalClick(e) {

    // Handle split-button toggle clicks
    const splitButtonToggle = e.target.closest('.split-button-toggle');
    if (splitButtonToggle) {
        e.preventDefault(); // Stop any other actions
        toggleSplitButton(splitButtonToggle.dataset.menu);
        return; // We're done
    }

    // Close any open menus if clicking outside
    if (!e.target.closest('.relative.inline-block')) {
        document.querySelectorAll('.split-button-menu').forEach(m => m.classList.remove('open'));
    }

    const stepBtn = e.target.closest('.step-btn'); if (stepBtn && state.currentStep > parseInt(stepBtn.dataset.step)) { state.currentStep = parseInt(stepBtn.dataset.step); render(); saveState(); }
    if (e.target.closest('#prev-step')) { state.currentStep--; render(); saveState(); }
    if (e.target.closest('#next-step')) { state.currentStep++; render(); saveState(); }
    if (e.target.closest('#save-to-file-btn')) saveStateToFile();
    if (e.target.closest('#clear-data-btn')) {
        showConfirmationModal(
            'Clear All Data?',
            'Are you sure you want to clear all data and start over? This will remove all subjects, rooms, faculty, and schedules.',
            () => {
                localStorage.removeItem('examflow_state');
                location.reload();
            }
        );
    }
    const toggleBtn = e.target.closest('.btn-toggle');
    if (toggleBtn) {
        const { type, value } = toggleBtn.dataset;
        const details = state.examDetails;
        if (type === 'type') {
            const currentTypes = details.type;
            if (currentTypes.includes(value) && currentTypes.length > 1) {
                details.type = currentTypes.filter(v => v !== value);
            } else if (!currentTypes.includes(value)) {
                details.type = [...currentTypes, value];
            } else {
                notify('At least one exam type must be selected.', 'warning');
            }
        } else { // For branches, specializations, semesters
            const current = details[type];
            details[type] = current.includes(value) ? current.filter(v => v !== value) : [...current, value];
        }
        updateExamName();
        render();
        saveState();
    }
    if (e.target.closest('#add-subject-btn')) addSubjectManually();
    if (e.target.closest('#add-faculty-btn')) addFaculty();
    const removeFacultyBtn = e.target.closest('.remove-faculty-btn');
    if (removeFacultyBtn) {
        const facultyId = removeFacultyBtn.dataset.facultyId;
        const facultyToRemove = state.facultyMaster.find(f => f.id == facultyId);
        if (facultyToRemove) {
            showConfirmationModal('Delete Faculty?', `Are you sure you want to delete ${facultyToRemove.name}? All their assigned duties will also be removed.`, () => {
                state.facultyMaster = state.facultyMaster.filter(f => f.id != facultyId);
                Object.keys(state.dutyAssignments).forEach(phaseKey => {
                    Object.keys(state.dutyAssignments[phaseKey]).forEach(room => {
                        state.dutyAssignments[phaseKey][room] = state.dutyAssignments[phaseKey][room].filter(name => name !== facultyToRemove.name);
                    });
                });
                render();
                saveState();
            });
        }
    }
    const dutyMatrixBtn = e.target.closest('.faculty-duty-matrix-btn');
    if (dutyMatrixBtn) showDutyMatrixModal(dutyMatrixBtn.dataset.facultyName);
    const assignFacultyBtn = e.target.closest('.assign-faculty-btn');
    if (assignFacultyBtn) showAssignFacultyModal(assignFacultyBtn.dataset.phaseKey, assignFacultyBtn.dataset.room);
    const assignSubjectBtn = e.target.closest('.assign-subject-btn');
    if (assignSubjectBtn) showAssignSubjectModal(assignSubjectBtn.dataset.date, assignSubjectBtn.dataset.phaseId);

    if (e.target.closest('#modal-close-btn') || e.target.id === 'modal-overlay' || e.target.closest('#modal-cancel-btn')) { state.modal.visible = false; render(); }

    if (e.target.closest('#cal-prev')) {
        const newDate = new Date(state.scheduler.calendarDate);
        newDate.setMonth(newDate.getMonth() - 1);
        state.scheduler.calendarDate = newDate;
        render();
        saveState();
    }
    if (e.target.closest('#cal-next')) {
        const newDate = new Date(state.scheduler.calendarDate);
        newDate.setMonth(newDate.getMonth() + 1);
        state.scheduler.calendarDate = newDate;
        render();
        saveState();
    }

    const detainBtn = e.target.closest('.detain-status-btn');
    if (detainBtn) {
        const form = detainBtn.closest('form');
        const isDetained = detainBtn.dataset.detainStatus;
        form.querySelector('[name="isDetained"]').value = isDetained;

        form.querySelectorAll('.detain-status-btn').forEach(btn => {
            btn.classList.remove('btn-toggle-active');
            btn.classList.add('hover:bg-gray-100');
        });
        detainBtn.classList.add('btn-toggle-active');
        detainBtn.classList.remove('hover:bg-gray-100');
    }


    const calDay = e.target.closest('.calendar-day'); if (calDay) addExamDate(calDay.dataset.date);
    const removeDateBtn = e.target.closest('.remove-date-btn'); if (removeDateBtn) {
        const date = removeDateBtn.dataset.date;
        showConfirmationModal('Delete All Phases?', `Are you sure you want to remove all scheduled exam phases for ${date}?`, () => {
            delete state.schedule[date];
            if (state.scheduler.selectedDate === date) {
                state.scheduler.selectedDate = null;
            }
            render();
            saveState();
        });
    }
    const addPhaseBtn = e.target.closest('.add-phase-btn'); if (addPhaseBtn) showAddPhaseModal(addPhaseBtn.dataset.date);
    const removePhaseBtn = e.target.closest('.remove-phase-btn'); if (removePhaseBtn) {
        const { date, phaseId } = removePhaseBtn.dataset;
        showConfirmationModal('Delete Phase?', 'Are you sure you want to delete this exam phase? All subjects scheduled within it will be unscheduled.', () => {
            removePhase(date, phaseId);
        });
    }
    const copyPhaseBtn = e.target.closest('.copy-phases-btn'); if (copyPhaseBtn) copyPhases(copyPhaseBtn.dataset.date);
    if (e.target.closest('#publish-timetable-btn')) showTimetableModal();

    if (e.target.closest('#export-timetable-excel')) {
        e.preventDefault();
        exportTimetableToExcel();
        toggleSplitButton('timetable-menu'); // Close the menu
    }

    if (e.target.closest('#generate-answersheet-btn')) generateAnswerSheetPDF();
    if (e.target.closest('#print-timetable-btn')) generateTimetablePDF();
    if (e.target.closest('#add-room-btn')) addRoom();
    const removeRoomBtn = e.target.closest('.remove-room-btn');
    if (removeRoomBtn) {
        const roomId = removeRoomBtn.dataset.roomId;
        const room = state.roomsMaster.find(r => r.id === roomId);
        if (room) {
            showConfirmationModal('Delete Room?', `Are you sure you want to delete room "${room.name}"?`, () => {
                state.roomsMaster = state.roomsMaster.filter(r => r.id !== roomId);
                render();
                saveState();
            });
        }
    }
    const removeBlockBtn = e.target.closest('.remove-block-btn');
    if (removeBlockBtn) {
        const { phaseKey, blockId } = removeBlockBtn.dataset;
        showConfirmationModal('Delete Block?', 'Are you sure you want to delete this seating block?', () => {
            if (state.allotment[phaseKey]) {
                state.allotment[phaseKey] = state.allotment[phaseKey].filter(b => b.id !== blockId);
                render();
                saveState();
            }
        });
    }
    const editBlockBtn = e.target.closest('.edit-block-btn');
    if (editBlockBtn) {
        const { phaseKey, blockId } = editBlockBtn.dataset;
        showEditBlockModal(phaseKey, blockId);
    }
    const copyBlocksBtn = e.target.closest('.copy-blocks-btn');
    if (copyBlocksBtn) {
        const sourceKey = copyBlocksBtn.dataset.sourceKey;
        const sourceBlocks = JSON.parse(JSON.stringify(state.allotment[sourceKey] || []));
        state.copiedAllotment = { sourceKey, blocks: sourceBlocks };
        notify(`Copied ${sourceBlocks.length} blocks. Go to another session and click 'Paste'.`, 'success');
        render(); // Re-render to show "Copied!" status
    }
    const pasteBlocksBtn = e.target.closest('.paste-blocks-btn');
    if (pasteBlocksBtn && state.copiedAllotment) {
        const targetKey = pasteBlocksBtn.dataset.targetKey;
        const [targetDate, targetPhaseId] = targetKey.split('|');
        const targetPhase = state.schedule[targetDate]?.find(p => p.id === targetPhaseId);
        if (!targetPhase) {
            notify('Target phase not found.', 'error');
            return;
        }

        const sourceBlocks = JSON.parse(JSON.stringify(state.copiedAllotment.blocks)); // Deep copy

        // --- MODIFIED --- Paste only layout, clear subject info
        const newBlocks = sourceBlocks.map(block => ({
            ...block,
            id: `block_${Date.now()}_${Math.random()}`, // New unique ID
            subjectId: null, // Clear subject
            specialization: null, // Clear specialization
            isDetained: false // Reset detained status
        }));

        state.allotment[targetKey] = newBlocks;
        notify(`Seating plan layout pasted successfully. Assign subjects to the blocks.`, 'success');

        // Optional: Clear copied state after pasting
        // state.copiedAllotment = null;

        render();
        saveState();
    }

    if (e.target.closest('#download-seating-pdf')) {
        showSeatingPdfOptionsModal();
    }
     // --- NEW --- Listener for Master Arrangement button
     if (e.target.closest('#download-master-arrangement')) {
        showMasterArrangementModal(); // Call the new modal function
    }
     // --- NEW --- Listener for phase-wise Excel download
     const downloadPhaseExcelBtn = e.target.closest('.download-phase-excel-btn');
     if (downloadPhaseExcelBtn) {
         exportPhaseSeatingToExcel(downloadPhaseExcelBtn.dataset.phaseKey);
     }


    if (e.target.closest('#preview-duty-pdf')) showDutySheetModal();

    if (e.target.closest('#export-duty-sheet-excel')) {
        e.preventDefault();
        exportDutySheetToExcel();
        toggleSplitButton('duty-sheet-menu'); // Close the menu
    }

    if (e.target.closest('#download-duty-pdf-final')) generateDutySheetPDF();
    const downloadPhaseBtn = e.target.closest('.download-phase-duty-btn');
    if (downloadPhaseBtn) {
        generateDutySheetPDF(downloadPhaseBtn.dataset.phaseKey);
    }
    if (e.target.closest('#view-load-matrix-btn')) showLoadMatrixModal();
    if (e.target.closest('#download-load-matrix-pdf')) generateLoadMatrixPDF();


    const removeSubjectBtn = e.target.closest('.remove-subject-from-phase-btn');
    if (removeSubjectBtn) {
        const { date, phaseId, instanceId } = removeSubjectBtn.dataset;
        const phase = state.schedule[date]?.find(p => p.id === phaseId);
        if (phase) {
            phase.subjects = phase.subjects.filter(item => item.instanceId !== instanceId);
            render();
            saveState();
        }
    }
    const removeDutyBtn = e.target.closest('.remove-duty-btn');
    if (removeDutyBtn) {
        const { phaseKey, room, name } = removeDutyBtn.dataset;
        if (state.dutyAssignments[phaseKey] && state.dutyAssignments[phaseKey][room]) {
            state.dutyAssignments[phaseKey][room] = state.dutyAssignments[phaseKey][room].filter(facName => facName !== name);
            render();
            saveState();
        }
    }

     // --- NEW --- Handle Master Arrangement Modal Downloads
    const downloadMasterPdfBtn = e.target.closest('#modal-download-master-pdf');
    if (downloadMasterPdfBtn) {
        const form = downloadMasterPdfBtn.closest('form');
        const formData = new FormData(form);
        const selectedPhaseTimes = formData.getAll('phaseTime');
        state.modal.visible = false;
        render(); // Close modal
        generateMasterArrangementPDF(selectedPhaseTimes);
    }
    const downloadMasterExcelBtn = e.target.closest('#modal-download-master-excel');
    if (downloadMasterExcelBtn) {
        const form = downloadMasterExcelBtn.closest('form');
        const formData = new FormData(form);
        const selectedPhaseTimes = formData.getAll('phaseTime');
        state.modal.visible = false;
        render(); // Close modal
        exportMasterArrangementToExcel(selectedPhaseTimes);
    }
}
function handleGlobalChange(e) {
    if (e.target.id === 'exam-session' || e.target.id === 'exam-year') {
        state.examDetails[e.target.id.split('-')[1]] = e.target.value;
        updateExamName();
        render();
        saveState();
    }
    if (e.target.matches('#subject-file-upload')) { handleFileUpload(e.target.files[0], 'subject'); e.target.value = ''; }
    if (e.target.matches('#room-file-upload')) { handleFileUpload(e.target.files[0], 'room'); e.target.value = ''; }
    if (e.target.matches('#faculty-file-upload')) { handleFileUpload(e.target.files[0], 'faculty'); e.target.value = ''; }

     // --- MODIFIED --- Also check if inside edit-block-form
    if (e.target.dataset.action === 'update-specializations' && (e.target.closest('.add-block-form') || e.target.closest('#edit-block-form'))) {
        const selectedOption = e.target.options[e.target.selectedIndex];
        const subjectId = selectedOption.dataset.subjectId;
        handleSubjectChange(subjectId, e.target.closest('form'));
    }

}

function handleGlobalSubmit(e) {
    e.preventDefault();
    if (e.target.id === 'select-student-type-form') {
        const form = e.target;
        const { subjectId, date, phaseId } = form.dataset;
        const formData = new FormData(form);
        const selectedStudentTypes = formData.getAll('studentType');

        if (selectedStudentTypes.length > 0) {
            state.modal.visible = false;
            render(); // Close modal immediately
            continueScheduling(subjectId, date, phaseId, selectedStudentTypes);
        } else {
            notify('Please select at least one student category.', 'error');
        }
    }
    if (e.target.id === 'select-exam-type-form') {
        const form = e.target;
        const { subjectId, date, phaseId } = form.dataset;
        const studentTypes = JSON.parse(form.dataset.studentTypes);
        const formData = new FormData(form);
        const selectedExamTypes = formData.getAll('examType');

        if (selectedExamTypes.length > 0) {
            const phase = state.schedule[date].find(p => p.id === phaseId);
            studentTypes.forEach(studentType => {
                selectedExamTypes.forEach(examType => {
                    phase.subjects.push({
                        instanceId: `subinst_${Date.now()}_${Math.random()}`,
                        subjectId: parseFloat(subjectId),
                        examType: examType,
                        studentType: studentType
                    });
                });
            });

            state.modal.visible = false;
            render();
            saveState();
        } else {
            notify('Please select at least one exam type.', 'error');
        }
    }
    if (e.target.matches('.add-block-form')) {
        handleAddBlock(e.target, e.target.dataset.phaseKey);
    }
    if (e.target.id === 'edit-block-form') {
        const { phaseKey, blockId } = e.target.dataset;
        const formData = new FormData(e.target);
        const blockIndex = state.allotment[phaseKey].findIndex(b => b.id === blockId);
        if (blockIndex > -1) {
            const existingBlock = state.allotment[phaseKey][blockIndex];
            let subjectId = existingBlock.subjectId; // Keep existing if already set
            let isDetained = existingBlock.isDetained;

            // --- MODIFIED --- Only update subject if it was initially empty
            if (!existingBlock.subjectId) {
                 const instanceId = formData.get('scheduledInstanceId');
                 let scheduledItem = null;
                 if (instanceId) {
                      for (const date in state.schedule) {
                         for (const phase of state.schedule[date]) {
                             const found = phase.subjects.find(item => item.instanceId === instanceId);
                             if (found) { scheduledItem = found; break; }
                         }
                         if (scheduledItem) break;
                      }
                 }
                 if (scheduledItem) {
                     subjectId = scheduledItem.subjectId;
                     isDetained = scheduledItem.studentType === 'detained';
                 } else {
                     notify('Please select a subject for this block.', 'error');
                     return; // Don't save if subject isn't selected for a new block
                 }
            }


            state.allotment[phaseKey][blockIndex] = {
                ...existingBlock,
                subjectId: subjectId, // Update based on logic above
                isDetained: isDetained, // Update based on logic above
                specialization: formData.get('specialization') || null,
                roomName: formData.get('roomName'),
                seatRange: formData.get('seatRange'),
                blockNo: formData.get('blockNo'),
                studentCount: formData.get('studentCount')
            };
            state.modal.visible = false;
            notify('Block updated successfully!', 'success');
            render();
            saveState();
        }
    }
    if (e.target.id === 'add-phase-form') {
        const form = e.target;
        const date = form.dataset.date;
        const startTime = form.querySelector('#phase-modal-start').value;
        const endTime = form.querySelector('#phase-modal-end').value;
        if (startTime && endTime) {
            if (!state.schedule[date]) state.schedule[date] = [];
            state.schedule[date].push({ id: `phase_${Date.now()}`, startTime, endTime, subjects: [] });
            state.modal.visible = false;
            notify('New phase added successfully!', 'success');
            render();
            saveState();
        } else {
            notify('Both start and end times are required.', 'error');
        }
    }
    if (e.target.id === 'assign-faculty-form') {
        const { phaseKey, room } = e.target.dataset;
        const formData = new FormData(e.target);
        const selectedFaculty = formData.getAll('faculty');

        if (!state.dutyAssignments[phaseKey]) state.dutyAssignments[phaseKey] = {};
        if (!state.dutyAssignments[phaseKey][room]) state.dutyAssignments[phaseKey][room] = [];

        selectedFaculty.forEach(name => {
            if (!state.dutyAssignments[phaseKey][room].includes(name)) {
                state.dutyAssignments[phaseKey][room].push(name);
            }
        });

        state.modal.visible = false;
        render();
        saveState();
    }
    if (e.target.id === 'assign-subject-form') {
        const { date, phaseId } = e.target.dataset;
        const formData = new FormData(e.target);
        const selectedSubjects = formData.getAll('subject');

        state.modal.visible = false;
        render();

        selectedSubjects.forEach(subjectId => {
            addSubjectToPhase(subjectId, date, phaseId);
        });
    }
}

// Split button menu toggle helper
function toggleSplitButton(menuId) {
    const menu = document.getElementById(menuId);
    if (menu) {
        const isOpen = menu.classList.contains('open');
        // Close all other menus
        document.querySelectorAll('.split-button-menu').forEach(m => m.classList.remove('open'));
        // Toggle the target menu
        if (!isOpen) {
            menu.classList.add('open');
        }
    }
}

// --- ADDED - showMasterArrangementModal function ---
// This function needs to be defined so it can be called.
function showMasterArrangementModal() {
    // Get unique phase times from schedule
    const phaseTimes = new Set();
    Object.values(state.schedule).flat().forEach(phase => {
        phaseTimes.add(`${formatTime12Hour(phase.startTime)} - ${formatTime12Hour(phase.endTime)}`);
    });
    const sortedPhaseTimes = [...phaseTimes].sort();

    if (sortedPhaseTimes.length === 0) {
        notify('No exam phases scheduled yet. Cannot generate master arrangement.', 'warning');
        return;
    }

    const content = `
        <form id="master-arrangement-options-form" class="p-6 space-y-4">
            <p class="text-sm text-gray-600">Select the phase time(s) to include in the master arrangement. The report will include all scheduled days for the selected times.</p>
            <div>
                <label class="font-semibold text-gray-700 block mb-2">Select Phase Times:</label>
                <div class="space-y-2 max-h-60 overflow-y-auto border rounded-md p-3 bg-gray-50">
                    <label class="flex items-center p-2 rounded hover:bg-gray-100 cursor-pointer">
                        <input type="checkbox" name="phaseTime" value="All Phases" class="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500 mr-2">
                        <span class="font-bold">All Phases</span>
                    </label>
                    ${sortedPhaseTimes.map(time => `
                        <label class="flex items-center p-2 rounded hover:bg-gray-100 cursor-pointer">
                            <input type="checkbox" name="phaseTime" value="${time}" class="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500 mr-2">
                            <span>${time}</span>
                        </label>
                    `).join('')}
                </div>
            </div>
            <div class="pt-6 flex justify-end gap-3 border-t">
                <button type="button" id="modal-cancel-btn" class="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 text-sm">Cancel</button>
                <div class="flex items-center gap-2">
                    <button type="button" id="modal-download-master-pdf" class="bg-red-600 text-white px-3 py-2 rounded-md hover:bg-red-700 flex items-center gap-1.5 text-sm">
                        ${ICONS.Printer} PDF
                    </button>
                    <button type="button" id="modal-download-master-excel" class="bg-green-600 text-white px-3 py-2 rounded-md hover:bg-green-700 flex items-center gap-1.5 text-sm">
                        ${ICONS.Excel} Excel
                    </button>
                </div>
            </div>
        </form>
    `;

    state.modal = {
        visible: true,
        title: 'Download Master Arrangement',
        content: content
    };
    render(); // Call render to display the modal

    // Add logic to handle "All Phases" checkbox AFTER the modal is rendered
    // Use setTimeout to ensure the elements exist in the DOM
    setTimeout(() => {
        const allPhasesCheckbox = document.querySelector('#master-arrangement-options-form input[value="All Phases"]');
        const individualPhaseCheckboxes = document.querySelectorAll('#master-arrangement-options-form input[name="phaseTime"]:not([value="All Phases"])');

        if (!allPhasesCheckbox) return; // Exit if elements not found

        allPhasesCheckbox.addEventListener('change', (e) => {
            const isChecked = e.target.checked;
            individualPhaseCheckboxes.forEach(cb => {
                cb.checked = isChecked;
                cb.disabled = isChecked;
            });
        });

        individualPhaseCheckboxes.forEach(cb => {
            cb.addEventListener('change', () => {
                 if (!cb.checked) {
                     allPhasesCheckbox.checked = false;
                     allPhasesCheckbox.disabled = false; // Enable "All Phases" if any individual is unchecked
                 } else {
                     // Check if all individuals are checked
                     const allChecked = Array.from(individualPhaseCheckboxes).every(iCb => iCb.checked);
                     if(allChecked) {
                         allPhasesCheckbox.checked = true;
                         // Keep individuals enabled, but check "All Phases"
                         // individualPhaseCheckboxes.forEach(iCb => iCb.disabled = true);
                     }
                 }
            });
        });
    }, 0); // Run after current execution stack clears
}
// --- END ADDED FUNCTION ---

function init() {
    loadState(); // Load state first
    $('#university-name').textContent = UNIVERSITY_NAME;
    $('#school-name').textContent = SCHOOL_NAME;
    if (!state.examName) {
        updateExamName();
    }
    render();

    const appContainer = $('#app-container');
    appContainer.addEventListener('click', handleGlobalClick);
    appContainer.addEventListener('change', handleGlobalChange);
    appContainer.addEventListener('submit', handleGlobalSubmit);

    const loadInput = document.getElementById('load-from-file-input');
    loadInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const loadedState = JSON.parse(e.target.result);
                if (loadedState && loadedState.examDetails && loadedState.currentStep) {
                    showConfirmationModal(
                        'Load Data from File?',
                        'This will overwrite all current data. Are you sure you want to continue?',
                        () => {
                            Object.assign(state, loadedState);
                            if (state.scheduler && state.scheduler.calendarDate) {
                                state.scheduler.calendarDate = new Date(state.scheduler.calendarDate);
                            }
                            saveState();
                            notify('Data loaded successfully!', 'success');
                            render();
                        }
                    );
                } else {
                    throw new Error('Invalid file format.');
                }
            } catch (error) {
                console.error('Failed to load state from file:', error);
                notify('Could not load data. The file may be corrupt or invalid.', 'error');
            } finally {
                event.target.value = '';
            }
        };
        reader.readAsText(file);
    });

    appContainer.addEventListener('input', e => {
        if (e.target.id === 'exam-name') {
            state.examName = e.target.value;
            saveState();
        } else if (e.target.id === 'scheduler-search') {
            state.scheduler.searchTerm = e.target.value;
            const container = $('#unscheduled-list');
            if (container) container.innerHTML = renderUnscheduledSubjectsList();
        } else if (e.target.id === 'faculty-search') {
            state.facultySearchTerm = e.target.value;
            const container = $('#faculty-list');
            if (container) container.innerHTML = renderFacultyList();
        }
    });

    // Drag and Drop listeners
    appContainer.addEventListener('dragstart', e => {
        const draggable = e.target.closest('.draggable');
        if (draggable) {
            state.draggedItemId = draggable.dataset.id;
            state.draggedItemType = draggable.dataset.type;
            e.target.style.opacity = '0.5';
        }
    });
    appContainer.addEventListener('dragend', e => {
        const draggable = e.target.closest('.draggable');
        if (draggable) {
            e.target.style.opacity = '1';
        }
        state.draggedItemId = null;
        state.draggedItemType = null;
    });
    appContainer.addEventListener('dragover', e => {
        const dropZone = e.target.closest('.drop-zone');
        if (dropZone && dropZone.dataset.type === state.draggedItemType) {
            e.preventDefault();
            dropZone.classList.add('drop-zone-active');
        }
    });
    appContainer.addEventListener('dragleave', e => {
        const dropZone = e.target.closest('.drop-zone');
        if (dropZone) {
            dropZone.classList.remove('drop-zone-active');
        }
    });
    appContainer.addEventListener('drop', e => {
        e.preventDefault();
        const dropZone = e.target.closest('.drop-zone');
        if (!dropZone || !state.draggedItemId || dropZone.dataset.type !== state.draggedItemType) return;

        dropZone.classList.remove('drop-zone-active');

        dropZone.classList.add('drop-zone-success');
        setTimeout(() => {
            dropZone.classList.remove('drop-zone-success');
        }, 500);


        if (state.draggedItemType === 'subject') {
            const { date, phaseId } = dropZone.dataset;
            addSubjectToPhase(state.draggedItemId, date, phaseId);
        } else if (state.draggedItemType === 'faculty') {
            const { phaseKey, room } = dropZone.dataset;
            const faculty = state.facultyMaster.find(f => f.id === state.draggedItemId);
            if (!faculty) return;

            const assignedInPhase = Object.values(state.dutyAssignments[phaseKey] || {}).flat();
            if (assignedInPhase.includes(faculty.name)) {
                notify(`${faculty.name} is already assigned a duty in this time slot.`, 'error');
                return;
            }
            if (!state.dutyAssignments[phaseKey]) state.dutyAssignments[phaseKey] = {};
            if (!state.dutyAssignments[phaseKey][room]) state.dutyAssignments[phaseKey][room] = [];
            if (!state.dutyAssignments[phaseKey][room].includes(faculty.name)) {
                state.dutyAssignments[phaseKey][room].push(faculty.name);
            }
            render();
            saveState();
        }
    });
}
window.addEventListener('DOMContentLoaded', init);

