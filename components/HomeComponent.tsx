/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import {View, SafeAreaView, StyleSheet, Text} from 'react-native';
import {connect} from 'react-redux';
import TicketNumber from '../CustomComponents/TicketNumber';
import TicketGrid from '../CustomComponents/TicketGrid';
import DBContext from '../dbRepositories/dbContext';
import TicketsManager from '../managers/ticketsManager';

class HomeComponent extends Component{
    ticketsManager: TicketsManager;

    constructor(props){
        super(props);
        this.ticketsManager = new TicketsManager();
        this.state = {
            tickets: [],
          };
    }

    componentDidMount(){
        var isInitialized = DBContext.Instance.IsInitialized;
        console.log('Initialized ' + isInitialized);
        
        if(isInitialized){
           this.ticketsManager.getTickets('test')
           .then(tickets =>{
            //console.log('result ' + result.tickets.ticket1[1]);
            this.setState({
                tickets: tickets,
              });
           })
           .catch(error => {
            console.log('error ' + error);
           });
        }
    }

    onTicketNumberPressed = (number:Number) => {
        console.log(number);
    }

    render(){
        return(
            <SafeAreaView style={styles.container}>
                    <View style={styles.view}>
                        <Text>Home</Text>
                        <TicketNumber value={23} label='23' onPress={() => this.onTicketNumberPressed(23)}></TicketNumber>
                        <TicketGrid style={{backgroundColor:'red'}} tickets={this.state.tickets} onPress={this.onTicketNumberPressed}></TicketGrid>
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
        //alignItems:'center',
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