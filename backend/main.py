import json
import datetime
from flask_cors import CORS
from flask import Flask, request, render_template, make_response, jsonify
from sqlalchemy.exc import IntegrityError
from datetime import timedelta 
from functools import wraps
from flask_jwt import JWT, jwt_required, current_identity
from flask.views import MethodView
import os

from models import db, Product, Employee, Transaction, Supplier
#from codes import db_uri, secret_key
DBURI = os.environ.get('DBURI', None)
SECRETKEY = os.environ.get('SECREYKEY', None)

''' Begin boilerplate code '''
def create_app():
    app = Flask(__name__, static_url_path='')
    app.config['SQLALCHEMY_DATABASE_URI'] = DBURI
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
    app.config['SECRET_KEY'] = SECRETKEY
    app.config['JWT_EXPIRATION_DELTA'] = timedelta(days = 7)
    CORS(app)
    db.init_app(app)
    return app

app = create_app()

app.app_context().push()

''' End Boilerplate Code '''

''' Set up JWT here '''
def authenticate(username, password):
    user = Employee.query.filter_by(username=empID).first()
    if user and user.check_password(password):
        return user

#Payload is a dictionary which is passed to the function by Flask JWT
def identity(payload):
    return Employee.query.get(payload['identity'])

jwt = JWT(app, authenticate, identity)
''' End JWT Setup '''

@app.route('/')
def index():
    return "Hello World!"

