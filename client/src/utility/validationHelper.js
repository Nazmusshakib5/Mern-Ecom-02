class validationHelper {
    static Islater(value) {
        let onlyLetterRegex = /^[A-Za-z\'\s\.\,\-\!\@\#\$\%\^\&\*\(\)\[\]\{\}\:\;\"\<\>\?\/\+\=\_\\\|`\~]+$/
        return onlyLetterRegex.test(value)
    }

    static IsEmail(value) {
        let EmailRegx = /\S+@\S+\.\S+/;
        return EmailRegx.test(value);
    }

    static IsMobile(value) {
        let MobileRegx = /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/;
        return MobileRegx.test(value);
    }

    static IsNumber(value) {
        let OnlyNumberRegx = /^\d+(\.\d+)?$/;
        return OnlyNumberRegx.test(value);
    }

    static IsNull(value) {
        return value == null;
    }

    static IsEmpty(value) {
        return value.length === 0;
    }

    static IsColor(value) {
        return value.length === 0;
    }
    static IsSize(value) {
        return value.length === 0;
    }
}

export default validationHelper