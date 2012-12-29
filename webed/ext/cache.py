__author__ = 'hsk81'

###############################################################################
###############################################################################

from flask.ext.cache import Cache
from ..app import app
from ..util import JSON

import hashlib

###############################################################################
###############################################################################

class WebedCache (Cache):

    def make_key (self, *args):

        string = JSON.encode (args)
        hashed = hashlib.md5 (string)
        return hashed.hexdigest ()

cache = WebedCache (app)

###############################################################################
###############################################################################