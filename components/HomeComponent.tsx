import React, { Component } from 'react';
import {View, SafeAreaView, StyleSheet, Text} from 'react-native';
import {connect} from 'react-redux';
import TicketNumber from '../CustomComponents/TicketNumber';
import TicketGrid from '../CustomComponents/TicketGrid';
import DBContext from '../dbRepositories/dbContext';
import TicketsRepository from '../dbRepositories/ticketsRepository';

class HomeComponent extends Component{
    ticketsRepository: TicketsRepository;

    constructor(props){
        super(props);        
        this.state = {
            tickets: [],
          };
    }

    componentDidMount(){
        var isInitialized = DBContext.Instance.IsInitialized;
        console.log('Initialized ' + isInitialized);
        this.ticketsRepository = new TicketsRepository();
        if(isInitialized){
           this.ticketsRepository.getTickets('test')
           .then(result =>{
            console.log('result ' + result.tickets.ticket1[1]);
            this.setState({
                tickets: [{
                  title:'Ticket 1',
                  numbers:result.tickets.ticket1.map((v,i) => {return { id: i, value:v}})
                },
                {
                  title:'Ticket 2',
                  numbers:result.tickets.ticket2.map((v, i) => {return {id: i, value: v}})
                }],
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