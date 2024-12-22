from flask import Flask, flash, redirect, render_template, request, session
from flask_session import Session
from werkzeug.security import check_password_hash, generate_password_hash
from sqlalchemy import create_engine, Column, Integer, String, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime
import secrets

# Iniciar instancia de Flask
app = Flask(__name__)

app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
app.secret_key = secrets.token_hex(16)
Session(app)  

# Crear puerta
engine = create_engine('sqlite:///morse.db')

# Crear base
Base = declarative_base()

# Crear tabla
class Registro(Base):
    __tablename__ = 'usuarios'
    user_id = Column(Integer, primary_key=True)
    username = Column(String)
    password_hash = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
    last_login = Column(DateTime)

# Crear la tabla en la base de datos
Base.metadata.create_all(engine)

# Crear e iniciar sesión
SessionFactory = sessionmaker(bind=engine)
db_session = SessionFactory()

# Rutas--------------------------------------------------------------------------------------

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/code")
def code():
     return render_template("code.html")

@app.route("/translator")
def characters():
    return render_template("translator.html")


if __name__ == '__main__':
    app.run()
