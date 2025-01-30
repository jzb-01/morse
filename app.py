from flask import Flask, render_template, request, session, redirect
from flask_session import Session
from werkzeug.security import generate_password_hash, check_password_hash
from cs50 import SQL

app = Flask(__name__)

app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

# Database Setup-------------------------------------------------------------------------------

db = SQL("sqlite:///morse.db")

db.execute('''
CREATE TABLE IF NOT EXISTS Register (
    id INTEGER PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    creation DATETIME DEFAULT CURRENT_TIMESTAMP
)
''')

# Routes--------------------------------------------------------------------------------------

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/morse")
def morse():
    return render_template("morse.html")

@app.route("/code")
def code():
     return render_template("code.html")

@app.route("/translator")
def characters():
    return render_template("translator.html")

@app.route("/account", methods=["GET", "POST"])
def account():
    if request.method == "POST":
        if "register" in request.form:
            email = request.form.get("email")
            username = request.form.get("username")
            password = request.form.get("password")
            confirmation = request.form.get("confirmation")
            if not email or not username or not password or not confirmation:
                return render_template("failure.html")
            if password != confirmation:
                return render_template("failure.html")
            row = db.execute("SELECT * FROM Register WHERE email = ? OR username = ?", email, username)
            if row:
                return render_template("failure.html")
            hashed_password = generate_password_hash(password)
            db.execute("INSERT INTO Register (username, password, email) VALUES(?, ?, ?)", username, hashed_password, email)
            session["id"] = db.execute("SELECT id FROM Register WHERE username = ? AND amail = ?", username, email) #this is wrongggg
            return redirect("/")
            
        elif "login" in request.form:
            email = request.form.get("email-l")
            password = request.form.get("password-l")
            if not email or not password:
                return render_template("failure.html")
            row = db.execute("SELECT * FROM Register WHERE email = ?", email)
            if row:
                if check_password_hash(row[password], password):
                    session["id"] = row[id]
                    return redirect("/")
    return render_template("account.html")


if __name__ == '__main__':
    app.run()
