from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
import datetime


db = SQLAlchemy(engine_options={"pool_recycle":60})

class Product(db.Model):
    productID = db.Column('productID', db.String(32), primary_key=True)
    name = db.Column('name', db.String(50), nullable=False)
    price = db.Column('price', db.Double, nullable=False)
    stock = db.Column('stock', db.Integer, nullable=False)

    def toDict(self):
        return{
            'productID': self.productID,
            'name': self.name,
            'price': round(self.price, 2),
            'stock': self.stock
        }

class Employee(db.Model):
    emp = db.Column('empID', db.Integer, primary_key=True)
    empFirstName = db.Column('empFirstName', db.String(25), nullable=False)
    empLastName = db.Column('empLastName', db.String(25), nullable=False)
    age = db.Column('age', db.Integer, nullable=False)
    empType = db.Column('empType', db.String(20), nullable=False)
    password = db.Column('password', db.String(128),  nullable=False)

    def toDict(self):
        return{
            'empID': self.empID,
            'empFirstName': self.empFirstName,
            'empLastName': self.empLastName,
            'age': self.age,
            'empType': self.empType,
            'password': self.password
        }

    def set_password(self, password):
        self.password = generate_password_hash(password, method='sha256')
    
    def check_password(self, password):
        return check_password_hash(self.password, password)

class Supplier(db.Model):
    suppID = db.Column('suppID', db.Integer, primary_key=True)
    suppName = db.Column('suppName', db.String(50), nullable=False)
    phone1 = db.Column('phone1', db.String(15), nullable=True)
    phone2 = db.Column('phone2', db.String(15), nullable=True)
    email = db.Column('email', db.String(50), nullable=True)

    def toDict(self):
        return{
            'suppID': self.suppID,
            'suppName': self.suppName,
            'phone1': self.phone1,
            'phone2': self.phone2,
            'email': self.email
        }

class Transaction(db.Model):
    transactionID = db.Column('transactionID', db.Integer, primary_key=True)
    empID = db.Column('empID', db.Integer, db.ForeignKey('employee.empID'), nullable=False)
    dateTime = db.Column('dateTime', db.DateTime, default=datetime.datetime.utcnow(), nullable=False)

    def toDict(self):
        return{
            'transactionID': self.transactionID,
            'empID': self.empID,
            'dateTime': self.dateTime.strftime("%m/%d/%Y, %H:%M:%S")
        }  

class TransactionDetail(db.Model):
    saleID = db.Column('saleID', db.Integer, primary_key=True)
    transactionID = db.Column('transactionID', db.Integer, db.ForeignKey('transaction.transactionID'), nullable=False)
    productID = db.Column('productID', db.String(32), db.ForeignKey('product.productID'), nullable=False)

    def toDict(self):
        return{
            'saleID': self.saleID,
            'transactionID': self.transactionID,
            'productID':self.productID
        }   

class ProductSupplier(db.Model):
    productSuppID = db.Column('productSuppID', db.Integer, primary_key=True)
    productID = db.Column('productID', db.String(32), db.ForeignKey('product.productID'), nullable=False)
    supplierID = db.Column('productID', db.Integer, db.ForeignKey('supplier.supplierID', nullable=False))

    def toDict(self):
        return{
            'productSuppID': self.saleID,
            'productID': self.productID,
            'supplierID': self.supplierID 
        }   




