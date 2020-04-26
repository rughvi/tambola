/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import {View, SafeAreaView, StyleSheet, Text, TouchableOpacity, TouchableHighlight, ImageBackground, Modal} from 'react-native';
import {connect} from 'react-redux';
import TicketGrid from '../CustomComponents/TicketGrid';
import TicketsManager from '../managers/ticketsManager';
import RollManager from '../managers/rollManager';
import {getTickets, setTicketPressed} from '../actions/ticketsAction';
import {numberRolledListenerAction} from '../actions/numberRolledListenerAction';
import Tts from 'react-native-tts';
import MyPopup from '../CustomComponents/MyPopup';
import RolledNumbersGrid from '../CustomComponents/RolledNumbersGrid';

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
            modalVisible:false
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
        let numbersRolledStr = "";
        if(numbersRolled){
            numbersRolledStr = numbersRolled.slice(-10).toString() + (numbersRolled.length > 10 ? "..." : " ");

        }
        let currentRolledNumber = numbersRolled?numbersRolled.slice(-1)[0]:0;
        if(numbersRolled != null && numbersRolled != undefined && numbersRolled.length != 0){
            let number = numbersRolled.slice(-1)[0];
            if(number != this._lastRolledNumber){
                Tts.speak(number.toString());
                this._lastRolledNumber = number;
            }            
        }

        if(tickets == null){
            return (
                <SafeAreaView style={styles.container}>
                    <Text style={styles.initialisingText}>Please wait, initialising</Text>
                </SafeAreaView>);
        }
        else{
            return(
                <SafeAreaView style={styles.container}>
                        <View style={[styles.view, this.state.modalVisible?{backgroundColor: 'rgba(0,0,0,0.5)'} : {}]}>
                            <Text>Home</Text>
                            <TicketGrid style={{backgroundColor:'red'}} tickets={tickets} onPress={this.onTicketNumberPressed}></TicketGrid>
                            <TouchableOpacity onPress={() => this.setState({modalVisible:true})}>
                                <Text style={{fontSize:25, color:'gray', alignSelf:'center'}}>{numbersRolledStr}</Text>
                            </TouchableOpacity>                            
                            {/* <Text style={styles.currentRolledNumber}>{currentRolledNumber}</Text> */}
                            <TouchableOpacity style={{justifyContent:'center', alignItems:'center'}} onPress={this.onRollPressed}>
                                <ImageBackground source={require('../images/circleoutline.png')} style={{width:100, height:100}}>
                                <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
                                    <Text style={styles.currentRolledNumber}>{currentRolledNumber}</Text>
                                </View>
                                </ImageBackground>
                            </TouchableOpacity>
                            <MyPopup visible={this.state.modalVisible}>
                                <View style={styles.modalView}>                                    
                                    <RolledNumbersGrid rolledNumbers={numbersRolled} onPress={() => this.setState({modalVisible:false})}></RolledNumbersGrid>
                                </View>
                            </MyPopup>
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
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        //flex:1,
        margin: 20,
        height:'50%',
        backgroundColor: "white",
        borderRadius: 20,
        padding: 5,
        alignItems: 'stretch',
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    initialisingText : {
        fontSize:20
    }
});

const mapStateToProps = (state) => {
    return {
        tickets: state.ticketsReducer.tickets,
        claim: state.ticketsReducer.claim,
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