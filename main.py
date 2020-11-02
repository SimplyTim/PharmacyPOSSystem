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

from models import db, Product, Employee, Transaction, Supplier, Markup
#from codes import DBURI, SECRETKEY
DBURI = os.environ.get('DBURI', None)
SECRETKEY = os.environ.get('SECRETKEY', None)

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
    user = Employee.query.filter_by(id=username).first()
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

#Employee Routes
@app.route('/employee', methods=['POST'])
@jwt_required()
def createNewEmployee():
    employeeData = request.get_json()
    newEmployee = Employee(empFirstName=employeeData['empFirstName'], empLastName=employeeData['empLastName'],age=employeeData['age'], empType=employeeData['empType'])
    newEmployee.set_password(employeeData['password'])
    db.session.add(newEmployee)
    db.session.commit()
    return "Employee created successfully.", 201

@app.route('/employees', methods=['GET'])
@jwt_required()
def getAllEmployees():
    employees = Employee.query.all()
    if employees:
        employees = [employee.toDict() for employee in employees]
        return json.dumps(employees), 200
    return "No users", 404

@app.route('/mydetails', methods=['GET'])
@jwt_required()
def getCurrentEmployee():
    employee = current_identity.toDict()
    return json.dumps(employee), 200



#Product Routes
@app.route('/product', methods=['POST'])
@jwt_required()
def addProduct():
    currEmpType = current_identity.empType
    if currEmpType == 'Manager' or currEmpType == 'Data Entry':
        productData = request.get_json()
        newProduct = Product(productId=str(productData['productId']), name=str(productData['name']), price=float(productData['price']),stock=int(productData['stock']))
        try:
            db.session.add(newProduct)
            db.session.commit()
        except IntegrityError:
            db.session.rollback()
            return "Product already exists.", 400
        return "Product created successfully.", 200
    return "Not authorized to access this page.", 401

@app.route('/products', methods=['GET'])
@jwt_required()
def getProducts():
    products = Product.query.all()
    if products:
        products = [product.toDict() for product in products]
        return json.dumps(products), 200
    return "No users", 404

@app.route('/product/<id>', methods=['GET'])
@jwt_required()
def getProduct(id):
    product = Product.query.get(str(id))
    if product:
        return json.dumps(product.toDict()), 200
    return "Product not found.", 404

@app.route('/product/<id>', methods=['PUT'])
@jwt_required()
def editProduct(id):
    currEmpType = current_identity.empType
    if currEmpType == 'Manager' or currEmpType == 'Data Entry':
        productToEdit = Product.query.get(str(id))
        if productToEdit:
            editData = request.get_json()
            for key in editData:
                setattr(productToEdit, str(key), editData[str(key)])
            db.session.add(productToEdit)
            db.session.commit()
            return "Product updated successfully.", 201
        return "Product not found.", 404
    return "Not authorized to access this page.", 401

@app.route('/product/<id>', methods=['DELETE'])
@jwt_required()
def deleteProduct(id):
    currEmpType = current_identity.empType
    if currEmpType == 'Manager' or currEmpType == 'Data Entry':
        productToDel = Product.query.get(str(id))
        if productToDel:    
            db.session.delete(productToDel)
            db.session.commit()
            return "Product deleted successfully.", 204
        return "Product not found.", 404
    return "Not authorized to access this page.", 401


#Automatic Markup
@app.route('/getmarkup', methods=['GET'])
@jwt_required()
def getMarkup():
    currEmpType = current_identity.empType
    if currEmpType == 'Manager':
        currMarkup = Markup.query.get('markup1')
        if currMarkup:
            return json.dumps(currMarkup.toDict()), 200
        return "Markup not found.", 404
    return "Not authorized to access this page.", 401

@app.route('/setmarkup', methods=['PUT'])
@jwt_required()
def setMarkup():
    currEmpType = current_identity.empType
    if currEmpType == 'Manager':
        markupToEdit = Markup.query.get('markup1')
        if markupToEdit:
            editData = request.get_json()
            for key in editData:
                setattr(markupToEdit, str(key), editData[str(key)])
            db.session.add(markupToEdit)
            db.session.commit()
            return "Markup updated successfully.", 201
        return "Markup not found.", 404
    return "Not authorized to access this page.", 401
