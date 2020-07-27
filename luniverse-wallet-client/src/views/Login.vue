<template>
    <sui-container class="login-container" fluid>
        <sui-grid text-align="center" class="login-grid">
            <sui-grid-column class="login-grid-column" vertical-align="middle">
                <h2 class="ui teal image header">
                    <img :src="logoImg" class="image">
                    <div class="content">
                        Log-in to your account
                    </div>
                </h2>
                <form class="ui large form">
                  <div class="ui stacked segment">
                    <div class="field">
                      <div class="ui left icon input">
                        <i class="user icon"></i>
                        <input type="text" name="email" placeholder="E-mail address" v-model="email">
                      </div>
                    </div>
                    <div class="field">
                      <div class="ui left icon input">
                        <i class="lock icon"></i>
                        <input type="password" name="password" placeholder="Password" v-model="pwd">
                      </div>
                    </div>
                    <div class="ui fluid large teal submit button" @click="handleClickLoginBtn">Login</div>
                  </div>
                  <div class="ui error message"></div>
                </form>

                <div class="ui message">
                  New to us? <a href="#">Sign Up</a>
                </div>
            </sui-grid-column>
        </sui-grid>
    </sui-container>
</template>
<script>
    import {axiosInstance} from '@/assets/axios';
    import {alertErr} from '@/helper/util';
    export default {
        name: 'Login',
        data() {
            return {
                email: '',
                pwd: ''
            };
        },
        computed: {
            logoImg() {
                return require('../assets/logo.png');
            }
        },
        methods: {
            async handleClickLoginBtn() {
                try {
                    const params = {
                        email: this.email,
                        password: this.pwd
                    };
                    const reqUrl = `/auth/login`;

                    const res = await axiosInstance.post(
                        reqUrl,
                        params
                    );

                    if (!res) {
                        return;
                    }
                    const {data: {token}, data: {user}} = res;
                    localStorage.setItem('info', JSON.stringify({token, email: user.email}));

                    this.$router.push({name: 'Home'});

                } catch(e) {
                    alertErr(e);
                }

            }
        }
    }
</script>
<style lang="scss" scoped>
    .ui[class*="middle aligned"].grid > .column:not(.row), .ui[class*="middle aligned"].grid > .row > .column, .ui.grid > [class*="middle aligned"].row > .column, .ui.grid > [class*="middle aligned"].column:not(.row), .ui.grid > .row > [class*="middle aligned"].column {
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -ms-flex-direction: column;
        flex-direction: column;
        vertical-align: middle;
        -ms-flex-item-align: center !important;
        align-self: center !important;
    }
    .login-container,
    .login-grid {
        height: 100%;
    }
    .login-grid-column {
        max-width: 450px;
    }
</style>
