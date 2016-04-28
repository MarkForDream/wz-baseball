var port = 8888;

module.exports = {
    'port': port,
    'dbUrl': 'mongodb://54.92.112.194/wz_baseball',
    'emailValidator': /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i,
    'systemError': {'status': 'error', 'result': {'errorCode': 1, 'errorMsg': '系統錯誤'}},
    'accessError': {'status': 'error', 'result': {'errorCode': 1, 'errorMsg': '存取權限錯誤'}},
    'tokenSecret': 'wz-baseball',
    'smtp': {
        'mailFrom': '',
        'user': '',
        'pass': ''
    }
};
