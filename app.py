from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

# In-memory task list
tasks = []

@app.route('/')
def index():
    filter = request.args.get('filter', 'all')
    return render_template('index.html', tasks=tasks, filter=filter)

@app.route('/add', methods=['POST'])
def add():
    title = request.form.get('title')
    if title:
        tasks.append({'title': title, 'done': False})
    return redirect(url_for('index'))

@app.route('/complete/<int:task_id>')
def complete(task_id):
    if 0 <= task_id < len(tasks):
        tasks[task_id]['done'] = not tasks[task_id]['done']
    return redirect(url_for('index'))

@app.route('/delete/<int:task_id>')
def delete(task_id):
    if 0 <= task_id < len(tasks):
        tasks.pop(task_id)
    return redirect(url_for('index'))

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/reset', methods=['POST'])
def reset():
    global tasks
    tasks.clear()
    return '', 204

if __name__ == '__main__':
    app.run(debug=True)
