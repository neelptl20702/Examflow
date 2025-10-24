📝 ExamFlow - Exam Scheduling & Management Tool

ExamFlow is a web-based application designed to streamline the process of scheduling exams, managing subjects, rooms, faculty, creating seating arrangements, and assigning invilation duties.

➡️ Live Demo: You can try ExamFlow live here!

Motivation: This project was developed as a personal initiative by me at the School of Computer Science, Engineering and Technology at ITM SLS Baroda University to address the complexities and manual effort involved in the exam scheduling process, aiming for a more efficient and organized workflow.

✨ Features

Multi-Step Workflow: Guides the user through a logical sequence:

Exam Details: Configure session, academic year, exam types, and filter by branch/semester/specialization.

Subject Management: Add subjects manually or upload a master list (.xlsx, .csv). Displays subjects filtered based on exam details.

Scheduler: Visually schedule exams using a calendar interface. Drag-and-drop subjects (desktop) or use an assignment modal (mobile) into time slots (phases). Supports scheduling regular and detained students.

Allotment & Rooms: Manage examination rooms (add manually or upload .xlsx/.csv) and create detailed seating blocks within rooms for each exam session. Includes copy/paste functionality for seating plans.

Duty Assignment: Assign faculty invilation duties to specific rooms for each exam session using drag-and-drop (desktop) or an assignment modal (mobile). View faculty load matrix.

Data Management:

Upload master lists for Subjects, Rooms, and Faculty.

Save current progress locally using browser's localStorage.

Export the entire application state to a JSON file (Save Data).

Import application state from a previously saved JSON file (Load Data).

Clear all stored data to start fresh.

Output Generation: Generate various essential documents:

Timetable: PDF & Excel formats (with separate sheets per course/branch).

Seating Arrangement: PDF (single session or all sessions combined).

Duty Sheet: PDF (single phase or full paginated) & Excel formats.

Answer Sheet Issue Sheet: PDF, grouped by branch/semester.

Faculty Load Matrix: PDF showing total duties assigned per faculty.

User Interface:

Clean, responsive interface built with Tailwind CSS.

Visual stepper to track progress.

Drag-and-drop functionality for desktop users.

Modal dialogs for adding phases, assigning duties/subjects (mobile-friendly), confirmations, and previews.

Notifications for user feedback.

🚀 Getting Started

Visit the live demo: https://neelptl20702.github.io/Examflow/

Alternatively, open the index.html file in your web browser locally.

Follow the steps in the stepper interface:

Fill in the Exam Details in Step 1.

Add or upload Subjects in Step 2.

Schedule exams using the calendar in Step 3.

Manage Rooms and create seating Blocks in Step 4.

Assign Faculty duties in Step 5.

Use the "Save Data" button periodically to back up your progress to a file. Use "Load Data" to restore a previous session. Progress is also saved automatically in your browser.

Generate required PDF/Excel documents using the buttons provided in relevant steps.

💻 Technologies Used

Frontend: HTML, CSS, JavaScript

Styling: Tailwind CSS

PDF Generation: jsPDF & jsPDF-AutoTable

Excel Generation/Parsing: SheetJS (xlsx.full.min.js)

Data Persistence: Browser localStorage, JSON Export/Import

📁 File Structure

index.html: The main HTML file for the application structure.

style.css: Contains custom CSS rules and Tailwind imports/setup.

app-logic.js: Handles application state, data manipulation, event logic, PDF/Excel generation, etc.

app-ui.js: Contains functions responsible for rendering the HTML for different steps and components.

site_banner.png: Image file used in the header and PDFs.

💾 Data Management Notes

All data (exam details, subjects, schedule, rooms, faculty, allotments, duties) is stored in the browser's localStorage. This means the data is specific to the browser you are using.

It is highly recommended to use the Save Data button regularly to create a JSON backup file. This allows you to:

Transfer your work to another computer or browser.

Recover your data if localStorage gets cleared.

The Load Data button will overwrite all current data with the content from the selected JSON file.

The Clear All button removes all data from localStorage and reloads the application. Use with caution!

(Optional: Add sections for Future Enhancements, Contributing, or License if needed)
