import React from 'react';
import { Login } from '../components/Login'
import 'bootstrap/dist/css/bootstrap.css';
// import { Button } from './Button';

export default {
  title: 'Form/Login',
  component: Login,
  // argTypes: {
  //   backgroundColor: { control: 'color' },
  // },
};

const Template = (args) => <Login {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  email: 'abc@xyz.com',
  password: '123',
  onLogin: (data) => {
    console.log(data)
  }
};

export const MissingPassword = Template.bind({});
MissingPassword.args = {
  email: 'abc@xyz.com',
  password: ''
};

export const LoginFailed = Template.bind({});
LoginFailed.args = {
  email: 'abc@xyz.com',
  password: '123',
  onLogin: (data) => {
    console.log("Simulate Login Failed")
    alert("Login Failed")
  }
};

// export const Secondary = Template.bind({});
// Secondary.args = {
//   label: 'My Button',
//   backgroundColor: 'red',
//   onClick: function() { alert("HEY")}
// };

// export const Large = Template.bind({});
// Large.args = {
//   size: 'large',
//   label: 'Button',
// };

// export const Small = Template.bind({});
// Small.args = {
//   size: 'small',
//   label: 'Button',
// };
