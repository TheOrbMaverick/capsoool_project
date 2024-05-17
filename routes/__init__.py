from flask import Blueprint

app_routes = Blueprint('app_routes', __name__, subdomain='api')

from routes.users_api import *