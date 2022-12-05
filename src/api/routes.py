"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route('/signup', methods=['POST'])
def login():
    data = request.json

    emailUser = data.get("user", None)
    pwd = data.get("pwd", None)

    user = User.query.filter_by(email=emailUser).filter_by(password=pwd).first()

    if user:
        access_token = create_access_token(identity=emailUser)
        return jsonify(access_token=access_token), 200
    else:
        return jsonify({"msg": "Bad username or password"}), 401



@api.route('/login', methods=['POST'])
def login():
    data = request.json

    emailUser = data.get("user", None)
    pwd = data.get("pwd", None)

    user = User.query.filter_by(email=emailUser).filter_by(password=pwd).first()

    if user:
        access_token = create_access_token(identity=emailUser)
        return jsonify(access_token=access_token), 200
    else:
        return jsonify({"msg": "Bad username or password"}), 401































