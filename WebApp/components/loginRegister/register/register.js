import { Component } from 'react'
import Stylesheet from '../../stylesheet.js'
import sheet from './register.scss'

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.registerHandler = this.registerHandler.bind(this);
  }

  registerHandler = () => {
    console.log("registerHandler()");
    this.props.navToApp();
  }

  render () {
    return (
      <div className="registerBtn" onClick={this.registerHandler}>
        register
      </div>
    );
  }
}

export default Register;
