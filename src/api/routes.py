"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route('/inicializa/<int:count>', methods=['POST'])
def insert_test_data(count):
    print("Creating test users")
    for x in range(1, int(count) + 1):
        user = User()
        user.email = "test_user" + str(x) + "@test.com"
        user.password = "123456"
        user.is_active = True
        db.session.add(user)
        db.session.commit()
        print("User: ", user.email, " created.")

    print("All test users created")

    ### Insert the code to populate others tables if needed



@api.route('/signup', methods=['POST'])
def signup():
    data = request.json
    user = User.query.filter_by(email=data['user']).first()

    if user:
        return jsonify({"msg": "No se puede crear este usuario"}), 401
    else:
        user = User(nombre=data['nombre'], email=data['user'], password=data['pwd'], is_active=True)
        # user = User(email=data['user'], password=data['pwd'], is_active=True)
        db.session.add(user)
        db.session.commit()
        access_token = create_access_token(identity=data['user'])
        return jsonify(access_token=access_token), 200


@api.route('/login', methods=['POST'])
def login():
    emailUser = request.json.get("user", None)
    pwd = request.json.get("pwd", None)

    user = User.query.filter_by(email=emailUser).filter_by(password=pwd).first()
    # user = User.filter.query(email=emailUser, password=pwd).first()

    if user:
        access_token = create_access_token(identity=user.id)
        # return jsonify(access_token=access_token), 200
        return jsonify({ "token": access_token, "user_id": user.id, "nombre" : user.nombre, "user": user.email, "is_active": user.is_active }), 200
    else:
        return jsonify({"msg": "Nombre de usuario y/o pwd incorrectos."}), 401


@api.route('/member', methods=['GET'])
@jwt_required()
def get_user():
    userId = get_jwt_identity()
    user = User.query.filter_by(id=userId).first()
    if user: 
        return jsonify(user.serialize()), 200
    else:
        return jsonify({"msg": "no existe usuario para la sesión"}), 401


#para probar y saber cuantos tengo
@api.route('/members', methods=['GET'])
def get_members():
    data = User.query.all()
    users = []

    if data:
        for user in data:
            users.append(user.serialize())
            
        return jsonify(users), 200
    else:
        return jsonify({"msg": "No existen usuarios"}), 401



