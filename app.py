from flask import Flask, render_template, request, session, redirect
from flask_session import Session
from werkzeug.security import generate_password_hash, check_password_hash
from cs50 import SQL
import re

app = Flask(__name__)

# Configure session to use filesystem
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

# Database setup
# Connecting to SQLite database named 'morse.db'
db = SQL("sqlite:///morse.db")

# ------------------------------------ Functions ------------------------------------

def is_valid_email(a_email):
    # Validate email using regex pattern
    pattern = r'^[\w\.-]+@[\w\.-]+\.\w+$'
    return re.match(pattern, a_email) is not None

# -------------------------------------- Routes --------------------------------------

@app.route("/")
def index():
    # Render the home page
    return render_template("index.html")

@app.route("/morse")
def morse():
    # Render the morse code learning page
    return render_template("morse.html")

@app.route("/code")
def code():
    # Render the code page
    return render_template("code.html")

# ---------------------------- Archives Management ----------------------------

@app.route("/archives", methods=["GET", "POST"])
def archives():
    if request.method == "POST":
        try:
            message_id = int(request.form.get("story_id"))
        except (TypeError, ValueError):
            return render_template("failure.html", alert="Please select a valid story!")
        
        # Retrieve the story and title using the provided story ID
        archive = db.execute("SELECT * FROM Stories WHERE id = ?", message_id)

        if archive:
            return render_template("message.html", message=archive[0]["story_content"], title=archive[0]["title"])
        else:
            return render_template("failure.html", alert="Archive not found")
    
    return render_template("archives.html")

# ------------------------------- Notes Management ------------------------------

@app.route("/notes", methods=["GET", "POST"])
def notes():
    if request.method == "POST":
        try:
            note_id = int(request.form.get("selection"))
        except (TypeError, ValueError):
            return render_template("failure.html", alert="Please select a valid note!")
        
        # Retrieve the note using the provided note ID and the session user ID
        note_contents = db.execute("SELECT * FROM Notes WHERE id = ? AND user_id = ?", note_id, session["id"])

        if note_contents:
            note_content = note_contents[0]["content"]
            note_creation = note_contents[0]["created_at"]
        else:
            return render_template("failure.html", alert="Select an existent note!")

        notes = db.execute("SELECT * FROM Notes WHERE user_id = ?", session["id"])
        return render_template("notes.html", notes=notes, note_content=note_content, note_creation=note_creation)

    if session.get("id"):
        # Populate options in the note selector
        notes = db.execute("SELECT * FROM Notes WHERE user_id = ?", session["id"])

        if notes:
            return render_template("notes.html", notes=notes, note_content="")
        else:
            return render_template("failure.html", alert="User not found")
        
    else:
        return render_template("failure.html", alert="You must be logged to use this module")

# ------------------------------ Blackbox Management -----------------------------

@app.route("/blackbox", methods=["GET", "POST"])
def blackbox():
    if request.method == "POST":
        try:
            log_id = int(request.form.get("selection"))
        except (TypeError, ValueError):
            return render_template("failure.html", alert="Please select a valid log!")
        
        # Retrieve the log using the provided note ID and the session user ID
        log_contents = db.execute("SELECT * FROM Logs WHERE id = ?", log_id)

        if log_contents:
            log_content = log_contents[0]["log_message"]
            log_creation = log_contents[0]["created_at"]
            log_author = db.execute("SELECT Users.username FROM Users JOIN Logs ON Users.id = Logs.user_id WHERE Logs.id = ?", log_id)[0]["username"]
        else:
            return render_template("failure.html", alert="Select an existent log!")

        logs = db.execute("SELECT * FROM Logs")

        if logs:
            return render_template("blackbox.html", logs=logs, log_content=log_content, log_creation=log_creation, log_author=log_author)
        else:
            return render_template("failure.html", alert="No logs found")

    if session.get("id"):
        logs = db.execute("SELECT * FROM Logs")
        return render_template("blackbox.html", logs=logs, log_content="", log_creation="", log_author="")
    else:
        return render_template("failure.html", alert="You must be logged to use this module")

# ------------------------------ Account Management ------------------------------

@app.route("/account")
def account():
    if session.get("id"):
        account = db.execute("SELECT * FROM Users WHERE id = ?", session["id"])
        if account:
            return render_template("account.html", username=account[0]["username"], email=account[0]["email"], creation=account[0]["created_at"])
        else:
            return render_template("failure.html", alert="Account not found")
    else:
        return render_template("account.html")

# ----------------------------- Authentication Routes ----------------------------

@app.route("/signup", methods=["POST"])
def signup():
    email = request.form.get("email")
    username = request.form.get("username")
    password = request.form.get("password")
    confirmation = request.form.get("confirmation")

    # Validate inputs
    if not all([email, username, password, confirmation]):
        return render_template("failure.html", alert="Please fill in all required fields!")

    if not is_valid_email(email):
        return render_template("failure.html", alert="Please insert a valid e-mail!")

    # Check for existing email or username
    if db.execute("SELECT * FROM Users WHERE email = ?", email):
        return render_template("failure.html", alert="The email is already in use!")

    if db.execute("SELECT * FROM Users WHERE username = ?", username):
        return render_template("failure.html", alert="The username is already in use!")

    if password != confirmation:
        return render_template("failure.html", alert="The passwords don't match!")

    # Create account with hashed password
    hashed_password = generate_password_hash(password)
    db.execute("INSERT INTO Users (username, password_hash, email) VALUES(?, ?, ?)", username, hashed_password, email)

    session["id"] = db.execute("SELECT id FROM Users WHERE username = ?", username)[0]["id"]
    return redirect("/")

@app.route("/signin", methods=["POST"])
def signin():
    email = request.form.get("email-l")
    password = request.form.get("password-l")

    if not email or not password:
        return render_template("failure.html", alert="Please fill in all required fields!")

    row = db.execute("SELECT * FROM Users WHERE email = ?", email)

    if row and check_password_hash(row[0]["password_hash"], password):
        session["id"] = row[0]["id"]
        return redirect("/")
    else:
        return render_template("failure.html", alert="Invalid email or password!")

@app.route("/logout", methods=["POST"])
def logout():
    session.clear()
    return redirect("/")

# ------------------------------ Additional Routes ------------------------------

@app.route("/translator")
def translator():
    return render_template("translator.html")

@app.route("/telegraph", methods=["GET", "POST"])
def telegraph():
    if request.method == "POST":
        # Ensure user is logged in
        if session.get("id"):
            # Handle save action
            if request.form.get("save"):
                note_content = request.form.get("telegraph_message")
                if len(note_content) == 0:
                    return render_template("failure.html", alert="No message was detected")
                db.execute("INSERT INTO Notes (user_id, content) VALUES(?, ?)", session["id"], note_content)
                return render_template("success.html", alert="Your message has been successfully saved in notes!")
            
            # Handle publish action
            elif request.form.get("publish"):
                log_content = request.form.get("telegraph_message")
                if len(log_content) == 0:
                    return render_template("failure.html", alert="No message was detected")
                db.execute("INSERT INTO Logs (user_id, log_message) VALUES(?, ?)", session["id"], log_content)
                return render_template("success.html", alert="Your message has been successfully published in blackbox!")
        
        # Handle unauthorized access
        else:
            return render_template("failure.html", alert="You must be logged to use this module")
    
    # Render telegraph page for GET requests
    return render_template("telegraph.html")

@app.route("/training")
def training():
    return render_template("training.html")

# Run the app
if __name__ == '__main__':
    app.run()
