/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import {View, StyleSheet, Modal, SafeAreaView} from 'react-native';

export default class MyPopup extends Component {

    render() {
        return (
            <Modal 
                animationType="fade"
                transparent={true}
                visible={this.props.visible}>
                <SafeAreaView style={styles.container}>
                    <View style={styles.centeredView}>
                        {this.props.children}
                    </View>
                </SafeAreaView>                    
            </Modal>
        )
    }}

const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignContent:'center'
    },
    centeredView: {
        flex: 1,
        justifyContent:'center',
        alignContent:'center'
    }
})