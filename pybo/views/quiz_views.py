from datetime import datetime

from flask import Blueprint, url_for, request, render_template
from werkzeug.utils import redirect

from pybo import db

bp = Blueprint('quiz', __name__, url_prefix='/quiz')

@bp.route('/')
def create():
    return render_template('quiz/index.html')