# TaskTracker_Python

## Overview
TaskTracker_Python is a web-based task management application designed to help users efficiently manage their tasks. It provides features for adding, completing, deleting, and filtering tasks, making it a simple yet effective tool for personal or team productivity.

## Domain
The project belongs to the **task management** domain, focusing on organizing and tracking tasks for better productivity.

## Tech Stack
- **Backend**: Python with Flask framework.
- **Frontend**: HTML templates (Jinja2) and CSS for styling.
- **Deployment**: Azure App Service using Bash and Azure CLI scripts.
- **Web Server**: Gunicorn for serving the Flask application.
- **Dependencies**: Managed via `requirements.txt`, including Flask, Gunicorn, and other Python libraries.

## Features
1. **Task Management**:
   - Add tasks via a form.
   - Mark tasks as completed or active.
   - Delete tasks.
   - Filter tasks by status (all, active, completed).

2. **Pages**:
   - **Home Page**: Displays the task list with filtering options.
   - **About Page**: Provides information about the application.

3. **Deployment**:
   - Includes scripts (`deploy.sh` and `AzCLI-Deploy.azcli`) for deploying the app to Azure.

4. **Styling**:
   - Clean and responsive design using CSS for a user-friendly interface.

## Prerequisites
- Python 3.7 or higher
- pip (Python package installer)
- Node.js and npm (for running Playwright tests, optional)

## Installation and Setup

### 1. Clone the Repository
```bash
git clone https://github.com/PagelsR/TaskTracker_Python.git
cd TaskTracker_Python
```

### 2. Create a Virtual Environment (Recommended)
```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate
```

### 3. Install Python Dependencies
```bash
pip install -r requirements.txt
```

### 4. Install Testing Dependencies (Optional)
If you want to run the Playwright tests:
```bash
npm install
npx playwright install
```

## How to Run

### Development Mode
```bash
python app.py
```
The application will be available at `http://localhost:5000`

### Production Mode (using Gunicorn)
```bash
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

## Running Tests
To run the Playwright tests:
```bash
npx playwright test
```

To run tests in UI mode:
```bash
npx playwright test --ui
```

## Usage
1. Open your web browser and navigate to `http://localhost:5000`
2. Add tasks using the input field and "Add Task" button
3. Mark tasks as complete/incomplete by clicking the checkbox
4. Delete tasks using the "Delete" button
5. Filter tasks using the "All", "Active", or "Completed" buttons
6. Visit the "About" page for more information about the application

## Project Structure
- `app.py` - Main Flask application
- `templates/` - HTML templates (Jinja2)
- `static/` - CSS stylesheets
- `requirements.txt` - Python dependencies
- `tests/` - Playwright test files
- `deploy.sh` and `AzCLI-Deploy.azcli` - Azure deployment scripts