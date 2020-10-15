from models import db, Product, Employee, Transaction, Supplier
from main import app

db.drop_all()
db.create_all(app=app)

newUser1 = Employee(empFirstName='Timothy', empLastName='Singh', age=22, empType='General')
newUser1.set_password("timpass")

db.session.add(newUser1)
db.session.commit()