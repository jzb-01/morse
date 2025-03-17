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
def translator():
    return render_template("translator.html")

@app.route("/failure")
def faiilure():
    return render_template("failure.html")

@app.route("/telegraph")
def telegraph():
    if request.method == "POST":
        if session.get("id"):
            if request.form.get("save") == "save":
                note_content = request.form.get("telegraph_message")
                if not note_content:
                    return render_template("failure.html")
                db.execute("INSERT INTO note (user_id, note) VALUES(?, ?)", session[id], note_content)
            elif request.form.get("publish") == "publish":
                log_content = request.form.get("telegraph_message")
                if len(log_content) == 0:
                    return render_template("failure.html")
                db.execute("INSERT INTO note (user_id, log) VALUES(?, ?)", session[id], log_content)
        else:
            return render_template("failure.html")
    return render_template("telegraph.html")

@app.route("/training")
def training():
    return render_template("training.html")

@app.route("/archives", methods=["GET", "POST"])
def archives():
    if request.method == "POST":
        message_id = request.form.get("story_id")
        if not message_id:
            return render_template("failure.html")
        message = db.execute("SELECT story FROM archives WHERE id = ?", message_id)[0]["story"]
        title = db.execute("SELECT title FROM archives WHERE id = ?", message_id)[0]["title"]
        return render_template("message.html", message=message, title=title)
    return render_template("archives.html")

@app.route("/notes", methods=["GET", "POST"])
def notes():
    if request.method == "POST":
        note_id = request.form.get("value")
        note_content = db.execute ("SELECT note FROM note WHERE id = ?", note_id)[0]["note"]
        notes = db.execute("SELECT note FROM note WHERE user_id = ?", session["id"])
        return render_template("notes.html", notes=notes, note_content=note_content)
    else:
        if session.get("id"):
            notes = db.execute("SELECT note FROM note WHERE user_id = ?", session["id"])
            return render_template("notes.html", notes=notes)
        else:
            return render_template("notes.html")
    

@app.route("/blackbox", methods=["GET", "POST"])
def blackbox():

    if request.method == "POST":
        log_id = request.form.get("value")
        log_content = db.execute ("SELECT log FROM blackbox WHERE id = ?", log_id)[0]["log"]
        logs = db.execute("SELECT log FROM blackbox")
        return render_template("notes.html", logs=logs, log_content=log_content)
    else:
        if (session.get("id")):
            logs = db.execute("SELECT log FROM blackbox")
            return render_template("blackbox.html", logs=logs)
        else:
            return render_template("blackbox.html")

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
            session["id"] = db.execute("SELECT id FROM Register WHERE username = ? AND email = ?", username, email)[0]["id"]
            return redirect("/")
            
        elif "login" in request.form:
            email = request.form.get("email-l")
            password = request.form.get("password-l")
            if not email or not password:
                return render_template("failure.html")
            row = db.execute("SELECT * FROM Register WHERE email = ?", email)
            if row:
                if check_password_hash(row[0]["password"], password):
                    session["id"] = row[0]["id"]
                    return redirect("/")
    print(session)
    return render_template("account.html")


if __name__ == '__main__':
    app.run()
