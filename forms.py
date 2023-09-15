from flask_wtf import FlaskForm 
from wtforms import SelectField, StringField, PasswordField, IntegerField, SubmitField 
from wtforms.validators import InputRequired, EqualTo
class SignForm(FlaskForm):
    username=StringField("Please enter a username:", validators=[InputRequired()] )
    password=PasswordField("Please enter a password:", validators=[InputRequired()])
    password_again=PasswordField("Confirm password:", validators=[InputRequired(), EqualTo("password")])
    submit=SubmitField("Submit")   
class LoginForm(FlaskForm):
    username=StringField("Please enter username:", validators=[InputRequired()] )
    password=PasswordField("Please enter password:", validators=[InputRequired()])
    submit=SubmitField("Submit") 