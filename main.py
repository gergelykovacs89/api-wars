from flask import Flask, render_template, redirect, request, url_for, session
import hash_handler
import data_handler
app = Flask(__name__, static_url_path='')
app.secret_key = '0ptimi$t4uzeml4k4to$'


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/')
@app.route('/login', methods=['POST', 'GET'])
def login_page():
    if request.method == 'POST':
        user_name = request.form['username']
        user_info = data_handler.get_user_info_from_db(user_name)
        wrong_data_help = None
        if user_info is None:
            return render_template('login.html', wrong_data_help=wrong_data_help)
        if hash_handler.verify_password(request.form['password'], user_info['pwd_hash']):
            session['username'] = user_info['username']
            session['user_id'] = user_info['user_id']
            return redirect(url_for('index'))
        else:
            return render_template('login.html', wrong_data_help=wrong_data_help)
    return render_template('login.html')


@app.route('/logout')
def logout():
    session.pop('username', None)
    session.pop('user_id', None)
    return redirect(url_for('index'))


@app.route('/registration', methods=['GET', 'POST'])
def registration():
    if request.method == 'POST':
        user_name = request.form['user_name']
        password = request.form['password']
        verify_password = request.form['verify_password']
        if password == verify_password:
            pwd_hash = hash_handler.hash_password(password)
            data_handler.insert_new_user(user_name, pwd_hash)
            return render_template('login.html')
    return render_template('registration_form.html')

