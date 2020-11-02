from models import db, Product, Employee, Transaction, Supplier, Markup
from main import app 
import xlrd 
import os

db.drop_all()
db.create_all(app=app)

# Inserting into Products Table
wb = xlrd.open_workbook(os.getcwd() + '\\backend\\pharmacyStock.xlsx', on_demand=True)
sheet = wb.sheet_by_index(0)

for i in range(1, sheet.nrows):
    tempList = sheet.row_values(i)
    newProduct = Product(productId=str(tempList[0]), name=str(tempList[1]), price=float(tempList[2]), stock=int(tempList[3]))
    db.session.add(newProduct)
db.session.commit()
wb.release_resources()
del wb

# Inserting into Employees Table
wb2 = xlrd.open_workbook(os.getcwd() + '\\backend\\employees.xlsx', on_demand=True)
sheet2 = wb2.sheet_by_index(0)

for i in range(1, sheet2.nrows):
    tempList = sheet2.row_values(i)
    newEmployee= Employee(empFirstName=str(tempList[0]), empLastName=str(tempList[1]), age=int(tempList[2]), empType=str(tempList[3]))
    newEmployee.set_password("123")
    db.session.add(newEmployee)
db.session.commit()
wb2.release_resources()
del wb2

# Inserting into Suppliers Table
wb3 = xlrd.open_workbook(os.getcwd() + '\\backend\\suppliers.xlsx', on_demand=True)
sheet3 = wb3.sheet_by_index(0)

for i in range(1, sheet3.nrows):
    tempList = sheet3.row_values(i)
    supplierName = tempList[0]
    supplierPhone1 = tempList[1]
    supplierPhone2 = tempList[2]
    supplierEmail = tempList[3]

    newSupplier= Supplier(suppName=str(supplierName), phone1=str(supplierPhone1), phone2=str(supplierPhone2), email=str(supplierEmail))
    db.session.add(newSupplier)
db.session.commit()
wb3.release_resources()
del wb3

newMarkup = Markup(markupId='markup1', markupVal=8.0)
db.session.add(newMarkup)
db.session.commit()

