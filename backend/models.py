from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
import datetime


db = SQLAlchemy(engine_options={"pool_recycle":60})

class Product(db.Model):
    productId = db.Column('productId', db.String(32), primary_key=True)
    name = db.Column('name', db.String(512), nullable=False)
    price = db.Column('price', db.Float, nullable=False)
    stock = db.Column('stock', db.Integer, nullable=False)

    def toDict(self):
        return{
            'productId': self.productId,
            'name': self.name,
            'price': round(self.price, 2),
            'stock': self.stock
        }

class Employee(db.Model):
    id = db.Column('id', db.Integer, primary_key=True)
    empFirstName = db.Column('empFirstName', db.String(25), nullable=False)
    empLastName = db.Column('empLastName', db.String(25), nullable=False)
    age = db.Column('age', db.Integer, nullable=False)
    empType = db.Column('empType', db.String(20), nullable=False)
    password = db.Column('password', db.String(128),  nullable=False)

    def toDict(self):
        return{
            'id': self.id,
            'empFirstName': self.empFirstName,
            'empLastName': self.empLastName,
            'age': self.age,
            'empType': self.empType,
        }

    def set_password(self, password):
        self.password = generate_password_hash(password, method='sha256')
    
    def check_password(self, password):
        return check_password_hash(self.password, password)

class Supplier(db.Model):
    suppId = db.Column('suppId', db.Integer, primary_key=True)
    suppName = db.Column('suppName', db.String(50), nullable=False)
    phone1 = db.Column('phone1', db.String(15), nullable=True)
    phone2 = db.Column('phone2', db.String(15), nullable=True)
    email = db.Column('email', db.String(50), nullable=True)

    def toDict(self):
        return{
            'suppId': self.suppId,
            'suppName': self.suppName,
            'phone1': self.phone1,
            'phone2': self.phone2,
            'email': self.email
        }

class Transaction(db.Model):
    transactionId = db.Column('transactionId', db.Integer, primary_key=True)
    empId = db.Column('empId', db.Integer, db.ForeignKey('employee.id'), nullable=False)
    dateTime = db.Column('dateTime', db.DateTime, default=datetime.datetime.utcnow, nullable=False)

    def toDict(self):
        return{
            'transactionId': self.transactionId,
            'empId': self.empId,
            'dateTime': self.dateTime.strftime("%m/%d/%Y, %H:%M:%S")
        }  

class TransactionDetail(db.Model):
    saleId = db.Column('saleId', db.Integer, primary_key=True)
    transactionId = db.Column('transactionId', db.Integer, db.ForeignKey('transaction.transactionId'), nullable=False)
    productId = db.Column('productId', db.String(32), db.ForeignKey('product.productId'), nullable=False)

    def toDict(self):
        return{
            'saleId': self.saleId,
            'transactionId': self.transactionId,
            'productId':self.productId
        }   

class ProductSupplier(db.Model):
    productSuppId = db.Column('productSuppId', db.Integer, primary_key=True)
    productId = db.Column('productId', db.String(32), db.ForeignKey('product.productId'), nullable=False)
    supplierId = db.Column('supplierId', db.Integer, db.ForeignKey('supplier.suppId'), nullable=False)

    def toDict(self):
        return{
            'productSuppId': self.saleID,
            'productId': self.productID,
            'supplierId': self.supplierID 
        }   




