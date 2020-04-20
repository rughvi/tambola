/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import {View, SafeAreaView, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import {connect} from 'react-redux';
import TicketNumber from '../CustomComponents/TicketNumber';
import TicketGrid from '../CustomComponents/TicketGrid';
import DBContext from '../dbRepositories/dbContext';
import TicketsManager from '../managers/ticketsManager';
import RollManager from '../managers/rollManager';

class HomeComponent extends Component{
    private _ticketsManager: TicketsManager;
    private _rollManager: RollManager;

    constructor(props){
        super(props);
        this._ticketsManager = new TicketsManager();
        this._rollManager = new RollManager();
        this.state = {
            tickets: [],
          };
    }

    componentDidMount(){
        var isInitialized = DBContext.Instance.IsInitialized;
        console.log('Initialized ' + isInitialized);
        
        if(isInitialized){
           this._ticketsManager.getTickets('test')
           .then(tickets =>{
            //console.log('result ' + result.tickets.ticket1[1]);
            this.setState({
                tickets: tickets,
              });
           })
           .catch(error => {
            console.log('error ' + error);
           });
           
           this._rollManager.getRolledNumbers()
           .then(result =>{
                console.log('home-getRolledNumbers-result ' + result);
           })
           .catch(error =>{
            console.log('home-getRolledNumbers-error ' + error);
           });
        }
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
        return(
            <SafeAreaView style={styles.container}>
                    <View style={styles.view}>
                        <Text>Home</Text>
                        <TicketNumber value={23} label='23' onPress={() => this.onTicketNumberPressed(23)}></TicketNumber>
                        <TicketGrid style={{backgroundColor:'red'}} tickets={this.state.tickets} onPress={this.onTicketNumberPressed}></TicketGrid>
                        <TouchableOpacity style={{justifyContent:'center', alignItems:'center'}} onPress={this.onRollPressed}>
                            <Image source={require('../images/bingo.png')} style={{width:75, height:75}}></Image>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
        )
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

const mapStateToProps = () => {
    return {};
}

const mapDispatchToProps = (dispatch) => {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent);