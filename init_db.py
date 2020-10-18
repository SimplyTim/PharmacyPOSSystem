from models import db, Product, Employee, Transaction, Supplier
from main import app 
import xlrd 

db.drop_all()
db.create_all(app=app)

loc = "pharmacyStock.xlsx"
wb = xlrd.open_workbook(loc)
sheet = wb.sheet_by_index(0)

for i in range(1, sheet.nrows):
    tempList = sheet.row_values(i)
    newProduct = Product(productId=str(tempList[0]), name=str(tempList[1]), price=float(tempList[2]), stock=int(tempList[3]))
    db.session.add(newProduct)


db.session.commit()