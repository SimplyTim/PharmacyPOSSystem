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

from models import db, Product, Employee, Transaction, Supplier, Markup, TransactionDetail
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
        try:
            for product in productData:
                newProduct = Product(productId=str(product['productId']), name=str(product['name']), price=float(product['price']),stock=int(product['stock']))
                db.session.add(newProduct)
            db.session.commit()
            return "Products created successfully.", 201
        except IntegrityError:
            db.session.rollback()
            return "Error occurred in adding one or more products.", 401
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

@app.route('/product', methods=['PUT'])
@jwt_required()
def editProduct():
    currEmpType = current_identity.empType
    if currEmpType == 'Manager' or currEmpType == 'Data Entry':
        editData = request.get_json()
        try: 
            for edit in editData:
                productToEdit = Product.query.get(edit['productId'])
                setattr(productToEdit, 'name', str(edit['name']))
                setattr(productToEdit, 'stock', int(edit['stock']))
                setattr(productToEdit, 'price', float(edit['price']))
                db.session.add(productToEdit)
            db.session.commit()
            return "Product updated successfully.", 201
        except IntegrityError:
            db.session.rollback()
            return "Error occurred in updating one or more products.", 401
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


#Suppliers
@app.route('/supplier', methods=['POST'])
@jwt_required()
def createNewSupplier():
    empType = current_identity.empType
    if empType == "Manager" or empType == "Data Entry":
        suppData = request.get_json()
        newSupplier = Supplier(suppName=suppData['suppName'], phone1=suppData['phone1'], phone2=suppData['phone2'], email=suppData['email'])
        db.session.add(newSupplier)
        db.session.commit()
        return "Supplier created successfully.", 201
    return "Not authorized to access this page.", 401

@app.route('/supplier/<id>', methods=['GET'])
@jwt_required()
def getSuppliers(id):
    supplier = Supplier.query.get(str(id))
    if supplier:
        return json.dumps(supplier.toDict()), 200
    return "Product not found.", 404

@app.route('/suppliers', methods=['GET'])
@jwt_required()
def getAllSuppliers():
    suppliers = Supplier.query.all()
    if suppliers:
        suppliers = [supplier.toDict() for supplier in suppliers]
        return json.dumps(suppliers), 200
    return "No users", 404

@app.route('/supplier', methods=['PUT'])
@jwt_required()
def editSupplier():
    currEmpType = current_identity.empType
    if currEmpType == 'Manager' or currEmpType == 'Data Entry':
        editData = request.get_json()
        try: 
            for edit in editData:
                supplierToEdit = Supplier.query.get(edit['suppId'])
                setattr(supplierToEdit, 'suppName', str(edit['suppName']))
                setattr(supplierToEdit, 'phone1', str(edit['phone1']))
                setattr(supplierToEdit, 'phone2', str(edit['phone2']))
                setattr(supplierToEdit, 'email', str(edit['email']))
                db.session.add(supplierToEdit)
            db.session.commit()
            return "Suppliers updated successfully.", 201
        except IntegrityError:
            db.session.rollback()
            return "Error occurred in updating one or more suppliers.", 401
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


#Transactions
@app.route('/transaction', methods=['POST'])
@jwt_required()
def createNewTransaction():
    currEmpType = current_identity.empType
    if currEmpType == 'Manager' or currEmpType == "Sales":
        newTrans = Transaction(empId=current_identity.id)
        db.session.add(newTrans)
        db.session.commit()
        return "Transaction created successfully.", 201

@app.route('/transactioninfo/<id>', methods=['GET'])
@jwt_required()
def viewTransaction(id):
    trans = Transaction.query.get(int(id))
    if trans:
        return json.dumps(trans.toDict()), 200
    return "Transaction not found.", 404

@app.route('/transactioninfo', methods=['GET'])
@jwt_required()
def viewTransactions():
    trans = Transaction.query.all()
    if trans:
        transDicts = [tran.toDict() for tran in trans]
        return json.dumps(transDicts), 200
    return "No transactions", 404 #balls.


#Transaction Detail
@app.route('/addtotrans/<id>', methods=['POST', 'PUT'])
@jwt_required()
def addProductToTrans(id):
    transToUpdate = Transaction.query.get(int(id))
    currEmp = current_identity
    if transToUpdate:
        if transToUpdate.empId == currEmp.id or currEmp.empType == 'Manager':
            productsToAdd = request.get_json()
            for product in productsToAdd:
                td = TransactionDetail(transactionId=str(id), productId=product['productId'])
                
                #Updating item count. Assuming the product id exists
                productToChange = Product.query.get(product['productId'])
                currCount = int(productToChange.stock)
                if currCount > 0:
                    setattr(productToChange, 'stock', currCount-1)
                db.session.add(td)
                db.session.add(productToChange)
                db.session.commit()
            return "Products added to transaction.", 201
        return "Not authorized to edit this transaction.", 401
    return "Transaction Id not found.", 404

@app.route('/transaction/<id>', methods=['GET'])
@jwt_required()
def viewTransProducts(id):
    transToView = TransactionDetail.query.filter_by(transactionId=int(id))
    prods = []
    if transToView:
        for tranItem in transToView:
            prodId = tranItem.productId
            prod = Product.query.get(str(prodId))
            prods.append(prod.toDict())
        return json.dumps(prods), 200
    return "Transaction Id not found.", 404