import React, { Component } from 'react';
import {View, SafeAreaView, StyleSheet, Text, TextInput, Button, Alert} from 'react-native';
import {connect} from 'react-redux';
import FormTextInput from '../CustomComponents/FormTextInput';
import FormTextButton from '../CustomComponents/FormTextButton';

class LoginComponent extends Component{
    onLoginPress = () =>{
        this.props.navigation.navigate('Home');
    }
    render(){
        return(
            <SafeAreaView style={styles.container}>
                <View style={styles.signInView}>
                    <FormTextInput placeholder='Username'></FormTextInput>
                    <FormTextInput placeholder='Password'></FormTextInput>
                    <FormTextButton label='Login' onPress={this.onLoginPress}></FormTextButton>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        //alignItems:'center'
    },
    signInView: {
        width:'100%',
        padding:40
    },
    title:{
        fontSize:20,
        fontWeight:'bold'
    }
});

const mapStateToProps = () => {
    return {};
}

const mapDispatchToProps = (dispatch) => {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);