/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import {View, SafeAreaView, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import {connect} from 'react-redux';
import TicketNumber from '../CustomComponents/TicketNumber';
import TicketGrid from '../CustomComponents/TicketGrid';
import DBContext from '../dbRepositories/dbContext';
import RollManager from '../managers/rollManager';
import {getTicketsAction} from '../actions/getTicketsAction';

class HomeComponent extends Component{
    private _rollManager: RollManager;

    constructor(props){
        super(props);
        this._rollManager = new RollManager();
        this.state = {
            tickets: [],
          };
    }

    componentDidMount(){
        var isInitialized = DBContext.Instance.IsInitialized;
        console.log('Initialized ' + isInitialized);
        this.props.getTicketsAction('test');
    }

    onTicketNumberPressed = (number:Number) => {
        console.log(number);
    }

    onRollPressed = () => {
        this._rollManager.addRolledNumber(11)
            .then(result => {
                console.log('Add ' + result);
            })
            .catch(error => {
                console.log(error);
            });
    }

    render(){
        const {tickets } = this.props;
        if(tickets == null){
            return (<Text>Not yet</Text>);
        }
        else{
            return(
                <SafeAreaView style={styles.container}>
                        <View style={styles.view}>
                            <Text>Home</Text>
                            <TicketNumber value={23} label='23' onPress={() => this.onTicketNumberPressed(23)}></TicketNumber>
                            <TicketGrid style={{backgroundColor:'red'}} tickets={tickets} onPress={this.onTicketNumberPressed}></TicketGrid>
                            <TouchableOpacity style={{justifyContent:'center', alignItems:'center'}} onPress={this.onRollPressed}>
                                <Image source={require('../images/bingo.png')} style={{width:75, height:75}}></Image>
                            </TouchableOpacity>
                        </View>
                    </SafeAreaView>
            );
        }        
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        //backgroundColor:'red'

    },
    view:{
        flex:1,
        justifyContent:'center',
        alignItems:'stretch',
        width:'100%'
    },
    title:{
        fontSize:20,
        fontWeight:'bold'
    }
});

const mapStateToProps = (state) => {
    return {
        tickets: state.ticketsReducer.tickets
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getTicketsAction : (name:string) => {dispatch(getTicketsAction(name));}
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent);