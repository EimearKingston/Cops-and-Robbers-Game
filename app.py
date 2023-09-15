from flask import Flask, render_template, request, jsonify, session, g, redirect, url_for
from database import get_db, close_db
from forms import LoginForm, SignForm
from flask_session import Session
from functools import wraps
from werkzeug.security import generate_password_hash, check_password_hash
app=Flask(__name__)
app.teardown_appcontext(close_db)
app.config["SECRET_KEY"]="this-is-my-secret-key"
app.config["SESSION_PERMANENT"]=False
app.config["SESSION_TYPE"]="filesystem"
Session(app)
@app.before_request
def load_logged_in_user():
    g.user=session.get("username", None) #g stands for global --> which means it can be used ANYWHERE in my code - Python, Jinja etc. but can't use the 'g' in the CSS
    #Watch video to see what this means but definitely use in CA
    #If CA has a "super user" who can change the database then create a default username and password for the user and comment it at the top of app.py for CA

def login_required(view):
    @wraps(view)
    def wrapped_view(**kwargs):
        if g.user is None: 
            return redirect(url_for("login"))
        return view(**kwargs)
    return wrapped_view
@app.route("/")
def index():
    return render_template("/index.html")
@app.route("/game")
@login_required
def game():

    return render_template("/game.html")

@app.route("/store_score", methods=["POST"])
def store_score():  
    db=get_db()
    username=g.user
    score=int(request.form["score"])
    clash=db.execute('''SELECT username FROM points
                                        WHERE username=?;''', (username,)).fetchone()
    if clash is not None:

        current_score=db.execute('''SELECT point FROM points 
                                                WHERE username=?;''', (username,)).fetchone()
        c_score=current_score["point"]
        if score>c_score:
                db.execute('''UPDATE points
                                        SET point=?
                                            WHERE username=?;''', (score, username))
                db.commit()
    else:
        db.execute('''INSERT INTO points(username, point)
                                VALUES (?, ?);''', (username, score))
        db.commit()
    return "success"

@app.route("/sign_up", methods=["GET", "POST"])
def sign_up():
    form = SignForm()
    if form.validate_on_submit():
        username=form.username.data
        password=form.password.data
        password_again=form.password_again.data 
        db=get_db()
        username_clash=db.execute('''SELECT * FROM users
                                            WHERE username=?;''', (username,)).fetchone()
        if username_clash is not None: 
            form.username.errors.append("User is already taken")
        else:
            db.execute('''INSERT INTO users(username, password)
                      VALUES(?,?)''', (username, generate_password_hash(password))) #no .fetchall() and no variable because you are inserting into the database
            db.commit()
            return redirect(url_for('login'))
            # session.clear()
            # session["username"]=username
            # next_page=request.args.get("county")
            # if not next_page:
            #     next_page=url_for("county")
            # return redirect(next_page)
            #return redirect(url_for("county"))
            #form.username.errors.append("Username is already taken")
    return render_template("/sign_up.html", form=form, title="Sign-up")
@app.route("/leaderboard", methods=["GET", "POST"])
def leaderboard():
    db=get_db()
    leaders=db.execute('''SELECT * FROM points
                            ORDER BY point DESC LIMIT 10;''').fetchall()
    return render_template("leaderboard.html", leaders=leaders, title="LeaderBoard")

@app.route("/login", methods=["GET", "POST"])
def login():
    form=LoginForm()
    if form.validate_on_submit():
        username=form.username.data
        password=form.password.data
        db=get_db()
        valid=db.execute('''SELECT * FROM users
                            WHERE username=?;''', (username,)).fetchone()
        if valid is None:
            form.username.errors.append("Unknown Username!")
#            return render_template("/county.html", form=form, title="Guess the county")
        elif not check_password_hash(valid["password"], password):
            return render_template("/login.html", form=form, message="Incorrect Password!", title="Login")
        else:
            session.clear()
            session["username"]=username
            next_page=request.args.get("index")
            if not next_page:
                next_page=url_for("index")
            return redirect(next_page)
            
    return render_template("/login.html", form=form, title="Login")

@app.route("/logout")
def logout():
    session.clear()
    return redirect(url_for("index"))