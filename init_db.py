from models import db, Product, Employee, Transaction, Supplier
from main import app

db.drop_all()
db.create_all(app=app)

newUser1 = Employee(empFirstName='Timothy', empLastName='Singh', age=22, empType='General')
newUser1.set_password("timpass")
newUser2 = Employee(empFirstName='Kumar', empLastName='Etwaroo', age=20, empType='General')
newUser2.set_password("kumarpass")

db.session.add(newUser1)
db.session.add(newUser2)
db.session.commit()