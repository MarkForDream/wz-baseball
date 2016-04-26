module.exports = {
    login: function(request, response, next) {
        request.sanitizeBody('email').toString();
        request.sanitizeBody('password').toString();

        request.checkBody('email', '此欄位不可為空白').notEmpty();
        request.checkBody('email', '請填入正確的Email格式').validateEmail();
        request.checkBody('password', '此欄位不可為空白').notEmpty();

        request.asyncValidationErrors()
            .then(function() {
                return next();
            })
            .catch(function(errors) {
                return response.json({'status': 'error', 'result': {'errorCode': 2, 'errorMsg': 'Email或Password請正確填寫'}});
            });
    }
};
