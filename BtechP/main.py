# from flask import Flask, redirect, url_for, render_template
#
# app = Flask(__name__)
#
# #this is desktop wala copy
#
# @app.route("/login")
# def login():
#     return render_template('login.html')
#
#
# @app.route("/dashboard")
# def dash():
#     return render_template('dashboard.html')
#
#
# @app.route("/about")
# def about():
#     return render_template('about.html')
#
#
# @app.route("/")
# def home():
#     return render_template('home.html', title='About')
#
#
# if __name__ == '__main__':
#     app.run(debug=True)


from flask import Blueprint, render_template
from flask_login import login_required, current_user

main = Blueprint('main', __name__)


@main.route('/')
def home():
    return render_template('home.html')


@main.route('/dashboard')
@login_required
def dashboard():
    return render_template('dashboard.html', name=current_user.name)



