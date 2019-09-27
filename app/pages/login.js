import React, {Component} from 'react';
import {Platform, 
        StyleSheet, 
        Text, 
        View, 
        Image, 
        StatusBar, 
        TextInput, 
        Modal,
        TouchableOpacity,
        ScrollView,
        RefreshControl
    } from 'react-native';
import Logo from '../component/logo';
import Button from 'apsl-react-native-button';
import AsyncStorage from '@react-native-community/async-storage';

export default class Login extends Component {

    static navigationOptions = {
        header: null
    }

    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            user: [],
            showModal: false,
            question: [],
            refreshing: false,
            correctAnswer: '',
            confirmQuiz: '',
            id: '',
            confirm: []
        };
    }

    fetchUser = async() => {
        // const { user,pass } = this.state;
        const {user} = this.state.username;
        const {pass} = this.state.password;
        const response = await fetch('http://192.168.43.35:8080/login/'+user+'/'+pass);
        const accnt = await response.json();
        this.setState({user:accnt});
    }

    componentDidMount(){
        this.fetchUser();
    }

    userLogin = async() => {
        const {username,password} = this.state;
        var url = 'http://192.168.43.35:80/adminBakpak/android/employeeLogin.php';
        var data = {
            user : username,
            pass : password
        }

        fetch(url,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                user : username,
                pass : password
            })
        }).then((response) => response.json())
            .then((responseJson) => {
                if(responseJson != 'Try Again'){
                    // alert(responseJson);
                    AsyncStorage.setItem('user_id',responseJson);
                    this.props.navigation.navigate('Home');
                // this.fetchConfirm();
                    // this.checkUser();
                }else{
                    alert(responseJson);
                }
            }).catch((error) => {
                console.error(error);
            })

    }
    render() {
        return (
          <View style={styles.container}>
            <StatusBar backgroundColor="#1c313a"
            barStyle="light-content"/>
            <Logo/>
            <TextInput style={styles.inputBox}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    placeholder="Username"
                    placeholderTextColor="#ffffff"
                    onChangeText = {username => this.setState({username})}
                    returnKeyType = "next"
                    onSubmitEditing = {() => this.passwordInput.focus()}
                    autoCapitalize = "none"
                    autoCorrect = {false}/>
                <TextInput style={styles.inputBox}
                    underlineColorAndroid='rgba(0,0,0,0)' 
                    secureTextEntry={true} placeholder="Password"
                    placeholderTextColor="#ffffff"
                    onChangeText = {password => this.setState({password})}
                    ref = {(input) => this.passwordInput =input}/>

                <Button style={styles.buttonStyle8}
                        textStyle={styles.textStyle8}
                        onPress={this.userLogin}
                        // onPress={() => this.setState({showModal: true})}
                        >
                    <View style={styles.customViewStyle}>
                        <Text style={{fontFamily: 'Avenir', color:'white'}}>
                        LOGIN
                        </Text>
                    </View>
                </Button>
            <View style={styles.signUpText}>
                {/* <Text style={styles.textSignUp}>Don't have an account yet? </Text>
                <Text styel={styles.signUpButton} onPress={() => this.props.navigation.navigate('Register')}>Sign-up</Text> */}
            </View>
          </View>
        );
      }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#455a64',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    signUpText: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginVertical: 16,
        flexDirection: 'row'
    },
    textSignUp: {
        color : 'rgba(255,255,255,0.6)',
        fontSize: 16
    },
    signUpButton: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '500'
    },
    inputBox: {
        width: 300,
        backgroundColor: 'rgba(255,255,255,0.3)',
        borderRadius: 25,
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#ffffff',
        marginVertical: 10
    },
    buttonStyle:{
        backgroundColor: '#1c313a',
        borderRadius: 25,
        width: 300,
        marginVertical: 10,
        paddingVertical: 12
    },  
    buttonLogin: {
        fontSize: 16,
        fontWeight: '500',
        color: '#ffffff',
        textAlign: 'center'
    },
    buttonStyle8: {
        backgroundColor: '#1c313a',
        borderColor: '#333',
        borderWidth: 2,
        borderRadius: 25,
      },
    textStyle8: {
        width: 200,
        fontFamily: 'Avenir Next',
        fontWeight: '500',
        color: '#ffffff',
        textAlign: 'center',
    },
    customViewStyle: {
        width: 120,
        height: 40,
        alignItems: 'center',
        textAlign: 'center',
        paddingHorizontal: 30,
        flexDirection: 'row',
    }
});