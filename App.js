
import React, {Component} from 'react';
import {StyleSheet, View, StatusBar, ActivityIndicator, AsyncStorage} from 'react-native';
import { createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Login from './app/pages/login';
import Home from './app/pages/Home';

export default class App extends Component {
  static navigationOptions = {
    header: null
  }
  render() {
    return (
      <AppContainer />
    );
  }
}


const AppStackNavigator = createStackNavigator(
  {
    Login:  Login,
    Home : Home,
  }
  ,
  {
    initialRouteName : 'Login'
  }
);

// const AuthStack = createStackNavigator({Login: Login});

// class AuthLoadingScreen extends Component{
//   constructor(props){
//     super(props);
//     this._loadData();
//   }
//   render() {
//     <View style={styles.container}>
//       <ActivityIndicator/>
//       <StatusBar/>
//     </View>
//   }

//   _loadData = async() => {
//     const isLoggedIn = await AsyncStorage.getItem('user_id');
//     this.props.navigation.navigate(isLoggedIn !== ''? 'Auth' : 'App');
//   }
// }

const AppContainer = createAppContainer(AppStackNavigator);

// const MainNavigator = createStackNavigator({
//   Login: {screen: Login},
//   Register: {screen: SignUp}
// });

// const App = createAppContainer(MainNavigator);

// export default App;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#455a64',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

// export default createAppContainer(createSwitchNavigator(
//   {
//     AuthLoading: AuthLoadingScreen,
//     App: AppStackNavigator,
//     Auth: AuthStack
//   },{
//     initialRouteName: 'AuthLoading'
//   }
// ));
