  <template>
    <div class="card login-form">
      <div class="card-header">
        <h3>OverFlow</h3>
            <span class="glyphicon glyphicon-chevron-left"></span>
      </div>
      <div v-show="views.login" class="row card-body">
        <div class="col-12 border border-danger">
        <form id="loginForm" @submit.prevent="login">
            <input v-model=forms.email class="mb-2 pl-3" type="text" placeholder="insert email" required>
            <br>
            <input v-model=forms.password class="mb-2 pl-3" type="password" placeholder="insert password" required>
            <hr>
            <input id="loginFormBtn" type="submit" value="Login" class="btn-lg btn-primary">
            <!-- <label for="checkbox" class="container mt-3">
              <input type="checkbox" v-model="forms.admin"> 
              <span style="color:blue; background-color: rgba(0,0,0,0.1)">admin</span>
              <span class="checkmark"></span>
            </label> -->
          </form>
        </div>
      </div>
      
      <div v-show="views.register" class="card-body">
        <form id="registerForm" @submit.prevent="submitRegistration">
          <input v-model=forms.name class="mb-2 pl-3" type="text" placeholder="insert full name" required>
          <br>
          <input v-model=forms.email class="mb-2 pl-3" type="text" placeholder="insert email" required>
          <br>
          <input v-model=forms.password class="mb-2 pl-3" type="password" placeholder="insert password" required>
          <br>
          <input id="regFormBtn" type="submit" value="Register" class="btn btn-warning ml-5">
          <button id="cancelRegister" class="btn btn-link" @click="views.register=false ; views.login=true">
          Cancel
          </button>
        </form>
      </div>
      <div class="card-footer">
        <div>
          <transition name="status-msg-trans">
            <p v-show="msg.register !== ''" class="statusMsg">{{msg.register}}</p>
          </transition>
          <transition>
            <p  v-show="msg.login !== ''" class="statusMsg">{{msg.login}}</p>
          </transition>
        </div>
        <div v-show="views.login">
          <span>Don't have an account?</span>
          <button id="register" class="btn btn-link " @click="clickRegister">
            Register here
          </button>
        </div>
      
      </div>
    </div>
  </template>
  <script>
    export default {
      data () {
        return {
          forms: {
            name: '',
            email: '',
            password:'',
            admin: false
          },
          views: {
            register: false,
            login: true
          },
          msg: {
            register:'',
            login:''
          }
        }
      },
      methods: {
        clickRegister() {
          this.views.login = false;
          this.views.register = true;
        },
        login() {
          let self = this;
            var url =`http://${process.env.VUE_APP_SERVER_URL}/users/signin`
          let options = {
            method:"POST",
            url,
            data: {
              email: this.forms.email,
              password: this.forms.password
            }
          }
          this.$store.dispatch('USER_LOGIN', options)
          .then(() => {
             self.msg.login= ' Success! Redirecting...';
             setTimeout(() => {
               self.msg.login= '';
               self.$router.push('/');
             }, 1000);
          })
          .catch(error => {
            self.msg.login= 'error logging in.';
            setTimeout(() => {
              self.msg.login= '';
            }, 3000);
          })
        },
      
        submitRegistration() {
          let self = this;
          let options = {
            method:"POST",
            url:`http://${process.env.VUE_APP_SERVER_URL}/users/signup`,
            data: {
              name: this.forms.name,
              email: this.forms.email,
              password: this.forms.password
            }
          };
          this.$store.dispatch('USER_REGISTER', options)
          .then(() => {
            self.msg.register= 'Successfully registered user. Signing in...';
            setTimeout(() => {
              //emit
              self.$router.push('/');
              self.msg.register= '';
            }, 1500)
          })
          .catch(error => {
            self.msg.register= 'Could not register user. Please check that fields are correctly filled in.';
            setTimeout(() => {
              self.msg.register= '';
            }, 3000);
          })
        }
      }
    }
  </script>
  
  <style scoped>
  input{
 font-size:30px;
    margin-top: 10px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
  }
  p {
    font-size:50px;
    margin-top: 10px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
  }
  .login-form .card-body {
    height: 300px;
  }

  </style>
   