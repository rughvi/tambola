/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import {View, SafeAreaView, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import {connect} from 'react-redux';
import TicketGrid from '../CustomComponents/TicketGrid';
import TicketsManager from '../managers/ticketsManager';
import RollManager from '../managers/rollManager';
import {getTickets, setTicketPressed} from '../actions/ticketsAction';
import {numberRolledListenerAction} from '../actions/numberRolledListenerAction';

class HomeComponent extends Component{
    private _rollManager: RollManager;
    private _ticketsManager: TicketsManager;
    constructor(props){
        super(props);
        this._rollManager = new RollManager();
        this._ticketsManager = new TicketsManager();
        this.state = {
            tickets: [],
          };
    }

    componentDidMount(){
        this.props.numberRolledListenerAction();
        this.props.getTickets('test');
    }

    onTicketNumberPressed = (ticketIndex:number, item) => {
        let isPressedNumberRolled:boolean = !item.isPressed && (this.props.numbersRolled.indexOf(item.value) > -1);        
        this.props.setTicketPressed('test', ticketIndex, item.id, !item.isPressed, isPressedNumberRolled);
    }

    onRollPressed = () => {
        let number:number = this._rollManager.getNextRollNumber();
        this._rollManager.addRolledNumber(number)
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
                            <TicketGrid style={{backgroundColor:'red'}} tickets={tickets} onPress={this.onTicketNumberPressed}></TicketGrid>
                            <Text style={styles.currentRolledNumber}>{this.props.numbersRolled?this.props.numbersRolled.slice(-1)[0]:0}</Text>
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
    },
    currentRolledNumber:{
        fontSize:75,
        alignSelf:'center',
        fontWeight:'bold',
        color:'purple',
        margin:50
    }
});

const mapStateToProps = (state) => {
    return {
        tickets: state.ticketsReducer.tickets,
        numbersRolled: state.numbersRolledReducer.numbersRolled
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getTickets : (name:string) => {dispatch(getTickets(name));},
        numberRolledListenerAction : () => {dispatch(numberRolledListenerAction());},
        setTicketPressed: (name:string, ticketIndex:number, id:number, isPressed:boolean, isPressedNumberRolled:boolean) => {dispatch(setTicketPressed(name, ticketIndex, id, isPressed, isPressedNumberRolled));}
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent);