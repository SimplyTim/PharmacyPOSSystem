from models import db, User, BloodCentre, Appointment
from main import app

db.drop_all()

db.create_all(app=app)

db.session.commit()