import { Component } from 'react'

import Register from './register/register.js'

class LoginRegister extends Component {
    constructor(props) {
      super(props);
      this.state = {
        register: false
      };
      this.registerHandler = this.registerHandler.bind(this);
      this.loginHandler = this.loginHandler.bind(this);
    }

    registerHandler = () => {
      console.log("registerHandler()");
      this.setState( {register: true} );
    }

    loginHandler = () => {
      console.log("loginHandler()");
      this.props.navToApp();
    }

    render () {
      const page = this.state.register ? (
        <Register navToApp={this.props.navToApp}/>
      ) : (
        <div>
          <div onClick={this.registerHandler}>
            register
          </div>
          <div onClick={this.loginHandler}>
            login
          </div>
        </div>
      )
      return (
        <div>
          {page}
        </div>
      )
    }
}

export default LoginRegister;
