__author__ = 'hsk81'

###############################################################################
###############################################################################

from webed.config import DefaultConfig

###############################################################################
###############################################################################

class TestConfig (DefaultConfig):

    DEBUG = False
    TESTING = True
    CSRF_ENABLED = False

    SQLALCHEMY_ECHO = False
    SQLALCHEMY_DATABASE_URI = 'postgresql://webed-t@localhost/webed-t'

###############################################################################
###############################################################################
