import React from 'react';
import { View, Text, ImageBackground, Dimensions } from 'react-native';
import { Form, Item, Label, Input, Button } from 'native-base';

var myBackground = require('../assets/landing.jpg');
var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;

class SignIn extends React.Component{
  state = {
    email: "",
    password: ""
  }
  logIn = () =>{
    var email = this.state.email;
    var password = this.state.password;

    this.props.signIn(email,password);
  }

    render(){
        return(
          <View style={{flex: 1}}>
              <ImageBackground source={myBackground} style={styles.backgroundImage}>
                  <View style={styles.inputStyle}>
                      <Form>
                          <Item floatingLabel>
                              <Label>Email</Label>
                              <Input
                                  autoCorrect={false}
                                  onChangeText={(email)=>this.setState({email})}
                              />
                          </Item>
                          <Item floatingLabel>
                              <Label>Password</Label>
                              <Input
                                  autoCorrect={false}
                                  onChangeText={(password)=>this.setState({password})}
                                  secureTextEntry
                              />
                          </Item>
                      </Form>
                      <View style={{marginTop: 10, margin: 40}}>
                          <Button
                              primary
                              block
                              onPress={this.logIn}
                          >
                              <Text style={{color: 'yellow', fontSize: 20}}>Sign In or Sign Up</Text>
                          </Button>
                      </View>
                  </View>
              </ImageBackground>
          </View>
        )
    }
}

const styles = {
    backgroundImage: {
      flex: 1,
      width: width,
      height: height
    },
    inputStyle: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      margin: 20
    }
}

export default SignIn;
