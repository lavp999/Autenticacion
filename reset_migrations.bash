rm -R -f ./migrations &&
pipenv run init &&
psql -U gitpod -c 'DROP DATABASE example;' || true &&
psql -U gitpod -c 'CREATE DATABASE example;' &&
psql -U gitpod -c 'CREATE EXTENSION unaccent;' -d example &&
pip install flask-jwt-extended
pipenv run migrate &&
pipenv run upgrade