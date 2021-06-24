
from flask import Blueprint, render_template, request, flash, redirect, url_for
from flask_login import login_required, current_user
import os

from flask import Flask, render_template, request
import numpy as np
import tensorflow as tf
from keras.models import load_model
from keras.preprocessing import image

main = Blueprint('main', __name__)

mapping_class = {0: 'No Defects Found', 1: 'Defective '}
model_path= r'C:\Users\Ritzz\Desktop\ProjectDD\BtechP\cnn_casting_inspection.hdf5'
# model = tf.keras.models.load_model(model_path)
model = tf.keras.models.load_model(model_path)
#model = load_model(r'C:\Users\Ritzz\Desktop\ProjectDD\BtechP\inspection_of_casting_products.h5')

# model.make_predict_function()


model.make_predict_function()

def predict_label(img_path):
    i = image.load_img(img_path, grayscale=True,target_size=(300,300,1))
    i = image.img_to_array(i)/255.0
    i=i.reshape(1,300,300,1)
    p1=model.predict(i)
    result = np.argmax(p1,axis=1)
    pred_label = mapping_class[int(p1 >= 0.5)]
    prob_class = 100 * p1 if pred_label == "Defect" else 100 * (1 - p1)
    return pred_label






@main.route("/success", methods = ['GET', 'POST'])
def get_output():

    if request.method == 'POST':
        img = request.files['my_image']
        img_path = r'C:\Users\Ritzz\Desktop\ProjectDD\BtechP\static\UploadedImages' + img.filename
        img.save(img_path)
        p = predict_label(img_path)
        r="static/"+"UploadedImages"+img.filename
    return render_template("dashboard.html", prediction=p, img_path1=img_path,res=r)
    #return render_template("dashboard.html")




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






