from flask import Blueprint

# Create a Blueprint for application routes
app_routes = Blueprint('app_routes', __name__, subdomain='api')

from routes.users_api import *

"""
This module sets up the Blueprint for application routes.

Attributes:
    app_routes (Blueprint): A Blueprint instance for routing.

"""