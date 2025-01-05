**Kanban Board Application**

**Overview**
This Kanban Board Application is a dynamic, drag-and-drop task management tool implemented in React with Redux for state management and React DnD for drag-and-drop functionality. It allows users to create boards, add tasks, edit tasks, and move tasks between columns seamlessly.

**Features**

**Create Boards:** Users can create boards to organize their tasks.

**Add Columns:** Predefined columns (To-Do, In Progress, Done) are added to each board.

**Add Tasks:** Users can add tasks to specific columns.

**Edit Tasks:** Users can edit the details of tasks, such as the name and description.

**Move Tasks:** Drag and drop tasks between columns.

**Delete Tasks** and Boards: Users can delete tasks and boards.

**Task Priorities:** Tasks can be tagged with High, Medium, or Low priority, indicated by distinct colors.

**Technologies Used**

React: Frontend framework for building the user interface.

Redux: State management for managing boards, columns, and tasks.

React DnD: Drag-and-drop functionality.

TypeScript: Type-safe development.

CSS: Styling for responsive and user-friendly design.

**Installation**

Clone the repository:

git clone <(https://github.com/Elu620758/kanban-board-app)>

Navigate to the project directory:

cd kanban-board

Install dependencies:

npm install

Start the development server:

npm run dev

Open your browser and go to(http://localhost:5174/)

Folder Structure

src/App.tsx: Main application component.

src/redux/boardSlice.ts: Redux slice for board state management.

src/redux/store.ts: Redux store configuration.

src/App.js/Task component.

src/App.js/Column: Column component.

src/App.css: Styling for the application.

How to Use

Create a Board:

Enter a name in the input field and click "Add Board".

Add a Task:

Select a board, enter task details (name, description, assignee, priority, and due date), select a column, and click "Add Task".

Edit a Task:

Click the "Edit" button on a task and update its name or description.

Move a Task:

Drag and drop tasks between columns to change their status.

Delete Tasks or Boards:

Click the "Delete" button on tasks or boards to remove them.

Component Breakdown

App

Manages boards and tasks.

Handles state for adding boards and tasks.

Task

Represents individual tasks.

Implements drag-and-drop using React DnD.

Allows editing and deleting tasks.

Column

Represents a single column in a board.

Accepts dropped tasks and highlights during drag events.

Styling

Tasks are color-coded based on priority:

High: Red

Medium: Orange

Low: Green

Responsive design ensures usability across devices.
