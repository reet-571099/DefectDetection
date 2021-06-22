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


from flask import Blueprint, render_template, request, flash, redirect, url_for
from flask_login import login_required, current_user
import os

main = Blueprint('main', __name__)
upload_folder = r'C:\Users\Ritzz\Desktop\ProjectDD\BtechP\static\UploadedImages'


@main.route('/')
def home():
    return render_template('home.html')


@main.route('/dashboard')
@login_required
def dashboard():
    return render_template('dashboard.html', name=current_user.name)


@main.route('/result')
def result():
    return render_template('result.html')


@main.route('/about')
def about():
    return render_template('about.html')


# @main.route('/success', methods = ['GET','POST'])
# def success():
#     if request.method == 'POST':
#         f = request.files['file']
#         location = os.path.join(upload_folder,f.filename)
#         f.save(location)
#         return render_template("dashboard.html", name=f.filename)

@main.route('/dashboard', methods=['POST'])
def upload_image():
    if 'file' not in request.files:
        flash('No file part')
        return redirect(request.url)
    file = request.files['file']
    if file.filename == '':
        flash('No image selected for uploading')
        return redirect(request.url)
    else:
        f = request.files['file']
        location = os.path.join(upload_folder, f.filename)
        f.save(location)
        flash('Image successfully uploaded ')
        return render_template("dashboard.html", filename=f.filename)


# @main.route("/dashboard", methods=['POST'])
# def button():
#        v = 0
#        if request.method == "POST":
#         if upload_image.filename == "4207.jpeg":
#             return render_template("dashboard.html", result=0)
#         else :
#             return render_template("dashboard.html", result=1)
