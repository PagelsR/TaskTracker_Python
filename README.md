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

## How to Run
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/TaskTracker_Python.git