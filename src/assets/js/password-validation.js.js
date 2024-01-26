        function onAcceptPinCallback(pass){
        };

        document.addEventListener('alpine:init', () => {
            Alpine.data('Pass', () => ({
                passFirst: '',
                passSecond: '',
                passcurPass: '',
                errorMsg: '',
                button: {},

                async init() {
                    this.button = document.querySelector('.btn');
                },

                inputFirst(e) {
                    if (this.validatePIN(e.value)) {
                        this.passFirst = e.value;
                        this.passcurPass = this.passFirst;

                        // document.querySelector('.color-msg').classList.remove('text-danger');
                        // this.button.setAttribute('active', '');

                    } else {
                        // document.querySelector('.color-msg').classList.add('text-danger');
                        // this.button.removeAttribute('active', '');
                        }
                },

                inputSecond(e) {

                    if (this.passcurPass.length > 0) {
                        if (this.passcurPass == e.value) {
                            this.errorMsg ='';
                            this.button.setAttribute('active', '');

                        } else {
                            this.errorMsg ='Код не совпадает';
                            this.button.removeAttribute('active', '');
                        }

                    } else {
                        this.passSecond = '';
                        this.button.removeAttribute('active', '');
                    }
                },

                validatePIN(pass) {
                    return /^[0-9A-F]{6,}+$/i.test(pass);
                    // return /^\d{4, }$/.test(pass);
                },

                acceptPin(button) {
                    if (!this.passcurPass == this.passSecond) {
                        return false;
                    }
                    onAcceptPinCallback(this.passcurPass);
                }

            }))
        })