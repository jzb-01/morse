from flask import Flask, render_template, request, session, redirect
from flask_session import Session
from werkzeug.security import generate_password_hash, check_password_hash
from cs50 import SQL
import re

app = Flask(__name__)

app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

# Database Setup-------------------------------------------------------------------------------

db = SQL("sqlite:///morse.db")

# Function--------------------------------------------------------------------------------------

def is_valid_email(a_email):
    pattern = r'^[\w\.-]+@[\w\.-]+\.\w+$'
    return re.match(pattern, a_email) is not None

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

@app.route("/archives", methods=["GET", "POST"])
def archives():
    if request.method == "POST":
        message_id = request.form.get("story_id")
        if not message_id:
            alert = "You didn't select a story"
            return render_template("failure.html", alert=alert)
        message = db.execute("SELECT story FROM archives WHERE id = ?", message_id)[0]["story"]
        title = db.execute("SELECT title FROM archives WHERE id = ?", message_id)[0]["title"]
        return render_template("message.html", message=message, title=title)
    return render_template("archives.html")

@app.route("/notes", methods=["GET", "POST"])
def notes():
    if request.method == "POST":
        note_id = request.form.get("selection")
        note_contents = db.execute("SELECT note FROM note WHERE id = ?", note_id)
        if note_contents:
            note_content = note_contents[0]["note"]
        else:
            alert = "Select an existent note!"
            return render_template("failure.html", alert=alert)
        notes = db.execute("SELECT * FROM note WHERE user_id = ?", session["id"])
        return render_template("notes.html", notes=notes, note_content=note_content)
    else:
        if session.get("id"):
            notes = db.execute("SELECT * FROM note WHERE user_id = ?", session["id"])
            return render_template("notes.html", notes=notes, note_content="")
        else:
            alert = "You must be logged to use this module"
            return render_template("failure.html", alert = alert)

@app.route("/blackbox", methods=["GET", "POST"])
def blackbox():

    if request.method == "POST":
        log_id = request.form.get("selection")
        log_contents = db.execute ("SELECT log FROM blackbox WHERE id = ?", log_id)
        if log_contents:
            log_content = log_contents[0]["log"]
        else:
            alert = "Select an existent log!"
            return render_template("failure.html", alert=alert)
        logs = db.execute("SELECT * FROM blackbox")
        return render_template("blackbox.html", logs=logs, log_content=log_content)
    else:
        if session.get("id"):
            logs = db.execute("SELECT * FROM blackbox")
            return render_template("blackbox.html", logs=logs)
        else:
            alert = "You must be logged to use this module"
            return render_template("failure.html", alert = alert)
        
        


@app.route("/account", methods=["GET", "POST"])
def account():
    if request.method == "POST":
        if "register" in request.form:
            email = request.form.get("email")
            username = request.form.get("username")
            password = request.form.get("password")
            confirmation = request.form.get("confirmation")
            if not email or not username or not password or not confirmation:
                alert = "Please fill in all required fields!"
                return render_template("failure.html", alert=alert)
            if not is_valid_email(email):
                alert = "Please insert a valid e-mail!"
                return render_template("failure.html", alert=alert)
            used_email = db.execute("SELECT * FROM Register WHERE email = ?", email)
            if used_email:
                alert = "The email is already in use!"
                return render_template("failure.html", alert=alert)
            used_username = db.execute("SELECT * FROM Register WHERE username = ?", username)
            if used_username:
                alert = "The username is already in use!"
                return render_template("failure.html", alert=alert)
            if password != confirmation:
                alert = "The passwords don't match!"
                return render_template("failure.html", alert=alert)
            hashed_password = generate_password_hash(password)
            db.execute("INSERT INTO Register (username, password, email) VALUES(?, ?, ?)", username, hashed_password, email)
            session["id"] = db.execute("SELECT id FROM Register WHERE username = ?", username)[0]["id"]
            return redirect("/")
        
        elif "log_out" in request.form:
            session.clear()
            return redirect("/")
            
        elif "login" in request.form:
            email = request.form.get("email-l")
            password = request.form.get("password-l")
            if not email or not password:
                alert = "Please fill in all required fields!"
                return render_template("failure.html", alert=alert)
            row = db.execute("SELECT * FROM Register WHERE email = ?", email)
            if row:
                if check_password_hash(row[0]["password"], password):
                    session["id"] = row[0]["id"]
                    return redirect("/")
                else:
                    alert = "The password is incorrect!"
                    return render_template("failure.html", alert=alert)
            else:
                alert = "No account found with that email"
                return render_template("failure.html", alert=alert)
    else:
        if session.get("id"):
            username = db.execute("SELECT username FROM Register WHERE id = ?", session["id"])[0]["username"]
            email = db.execute("SELECT email FROM Register WHERE id = ?", session["id"])[0]["email"]
            creation = db.execute("SELECT creation FROM Register WHERE id = ?", session["id"])[0]["creation"]
            return render_template("account.html", username=username, email=email, creation=creation)
        else:
            return render_template("account.html")

@app.route("/translator")
def translator():
    return render_template("translator.html")

@app.route("/telegraph", methods=["GET", "POST"])
def telegraph():
    if request.method == "POST":
        if session.get("id"):
            if request.form.get("save"):
                note_content = request.form.get("telegraph_message")
                if len(note_content) == 0:
                    alert = "No message was detected"
                    return render_template("failure.html", alert=alert)
                db.execute("INSERT INTO note (user_id, note) VALUES(?, ?)", session["id"], note_content)
            elif request.form.get("publish"):
                log_content = request.form.get("telegraph_message")
                if len(log_content) == 0:
                    alert = "No message was detected"
                    return render_template("failure.html", alert=alert)
                db.execute("INSERT INTO blackbox (user_id, log) VALUES(?, ?)", session["id"], log_content)
        else:
            alert = "You must be logged to use this module"
            return render_template("failure.html", alert = alert)
    return render_template("telegraph.html")

@app.route("/training")
def training():
    return render_template("training.html")

@app.route("/failure")
def faiilure():
    return render_template("failure.html")


if __name__ == '__main__':
    app.run()
