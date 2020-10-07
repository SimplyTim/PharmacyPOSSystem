import json
import jwt
import datetime
from flask_cors import CORS
from flask import Flask, request, render_template, make_response, jsonify
from sqlalchemy.exc import IntegrityError
from datetime import timedelta 
from functools import wraps
from flask.views import MethodView


from models import db

from models import db, User, BloodCentre, Appointment

''' Begin boilerplate code '''
def create_app():
    app = Flask(__name__, static_url_path='')
    CORS(app)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgres://wvnbrrkabpyzkk:bf8ef31ece15191822cc72bb70fd77568b2401d9b45bf25c52de3f1fed4960f6@ec2-52-0-155-79.compute-1.amazonaws.com:5432/d4q06gg2oen0u5'
    #'postgres://wvnbrrkabpyzkk:bf8ef31ece15191822cc72bb70fd77568b2401d9b45bf25c52de3f1fed4960f6@ec2-52-0-155-79.compute-1.amazonaws.com:5432/d4q06gg2oen0u5'
    #'sqlite:///test.db'
    #'mysql+pymysql://sql10338279:gQYEsx68IE@sql10.freemysqlhosting.net/sql10338279' - for mysql
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
    app.config['SECRET_KEY'] = "SECRET6555"

    db.init_app(app)
    return app

app = create_app()

app.app_context().push()

''' End Boilerplate Code '''

''' Set up JWT here '''
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')

        if not token:
            return jsonify({'message:' : 'Token was not found.'}), 403
        try:
            data = jwt.decode(token, app.config['SECRET_KEY'])
            return f(*args, **kwargs)
        except:
            return jsonify({'message' : 'Token is invalid'}), 403
    return decorated

@app.route('/')
def index():
    return "Hello World!"
