import React, { Component } from 'react';
import {View, SafeAreaView, StyleSheet, Text} from 'react-native';
import {connect} from 'react-redux';

class LandingComponent extends Component{
    constructor(props){
        super(props)
    }

    componentDidMount(){
        setTimeout(_ => {
            this.props.navigation.navigate('Login');
        }, 5000);
    }

    render(){
        return(
            <SafeAreaView style={styles.container}>
                    <View>
                        <Text style={styles.title}>Welcome</Text>
                    </View>
                </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
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

export default connect(mapStateToProps, mapDispatchToProps)(LandingComponent);