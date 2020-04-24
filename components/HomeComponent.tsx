/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import {View, SafeAreaView, StyleSheet, Text, TouchableOpacity, ImageBackground, Modal} from 'react-native';
import {connect} from 'react-redux';
import TicketGrid from '../CustomComponents/TicketGrid';
import TicketsManager from '../managers/ticketsManager';
import RollManager from '../managers/rollManager';
import {getTickets, setTicketPressed} from '../actions/ticketsAction';
import {numberRolledListenerAction} from '../actions/numberRolledListenerAction';
import Tts from 'react-native-tts';

class HomeComponent extends Component{
    private _rollManager: RollManager;
    private _ticketsManager: TicketsManager;
    private _lastRolledNumber:number=-1;

    constructor(props){
        super(props);
        this._rollManager = new RollManager();
        this._ticketsManager = new TicketsManager();
        this.state = {
            tickets: [],
          };
    }

    componentDidMount(){
        Tts.addEventListener('tts-start', (event) => console.log("start", event));
        Tts.addEventListener('tts-finish', (event) => console.log("finish", event));
        Tts.addEventListener('tts-cancel', (event) => console.log("cancel", event));
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
        const {tickets,numbersRolled} = this.props;
        let numbersRolledStr = numbersRolled?numbersRolled.toString():"";
        console.log(numbersRolledStr);
        let currentRolledNumber = numbersRolled?numbersRolled.slice(-1)[0]:0;
        if(numbersRolled != null && numbersRolled != undefined && numbersRolled.length != 0){
            let number = numbersRolled.slice(-1)[0];
            if(number != this._lastRolledNumber){
                Tts.speak(number.toString());
                this._lastRolledNumber = number;
            }            
        }
        if(tickets == null){
            return (<Text>Not yet</Text>);
        }
        else{
            return(
                <SafeAreaView style={styles.container}>
                        <View style={styles.view}>
                            <Text>Home</Text>
                            <TicketGrid style={{backgroundColor:'red'}} tickets={tickets} onPress={this.onTicketNumberPressed}></TicketGrid>
                            <Text style={{fontSize:20, color:'gray'}}>{numbersRolledStr}</Text>
                            {/* <Text style={styles.currentRolledNumber}>{currentRolledNumber}</Text> */}
                            <TouchableOpacity style={{justifyContent:'center', alignItems:'center'}} onPress={this.onRollPressed}>
                                <ImageBackground source={require('../images/circleoutline.png')} style={{width:100, height:100}}>
                                <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
                                    <Text style={styles.currentRolledNumber}>{currentRolledNumber}</Text>
                                </View>
                                </ImageBackground>
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
        fontSize:50,
        alignSelf:'center',
        fontWeight:'bold',
        color:'#3badfc',
        margin:10
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