import json, datetime
from datetime import datetime

from flask import Blueprint, url_for, request, render_template, jsonify, g
from werkzeug.utils import redirect

from .. import db
from pybo.models import Words, Quiz


bp = Blueprint('quiz', __name__, url_prefix='/quiz')


@bp.route('/')
def create():
    return render_template('quiz/index.html')

@bp.route('/save/', methods=('POST',))
def save():
    timeScore_receive = int(request.form['timeScore_give'])
    wordScore_receive = int(request.form['wordScore_give'])
    missScore_receive = int(request.form['missScore_give'])
    print(timeScore_receive ,wordScore_receive, missScore_receive)


    quiz = Quiz(score=timeScore_receive, miss=missScore_receive, word_count=wordScore_receive, username=g.user.username, create_date=datetime.now())
    db.session.add(quiz)
    db.session.commit()
    return jsonify({'msg': 'db 저장 완료'})

@bp.route('/start/', methods=('GET',))
def start():
    word_list = Words.query.order_by(Words.id.asc()).all()
    word = []
    for i in word_list:
        word.append(i.word)
    # jsonWord = dict(zip(range(1, len(word) + 1), word))
    jsonWord = {'word': word}
    return jsonify(jsonWord)

@bp.route('/rank/', methods=('GET', 'POST'))
def rank():
    if request.method == 'POST':
        quiz_rank = Quiz.query.filter(Quiz.username == g.user.username).order_by(Quiz.score.desc()).limit(5)
    else:
        quiz_rank = Quiz.query.order_by(Quiz.score.desc()).limit(5)

    rank = [[], [], [], [], []]
    k = 0

    for i in quiz_rank:
        for j in range(k, k+1):
            rank[j].append(i.score)
            rank[j].append(i.miss)
            rank[j].append(i.word_count)
            rank[j].append(i.username)

            clearTime = i.create_date.strftime('%Y/%m/%d %H:%M')
            rank[j].append(clearTime)

        k+=1

    jsonRank = {'rank': rank}
    return jsonify(jsonRank)
