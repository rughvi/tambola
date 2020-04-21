/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import {View, SafeAreaView, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import {connect} from 'react-redux';
import TicketGrid from '../CustomComponents/TicketGrid';
import TicketsManager from '../managers/ticketsManager';
import RollManager from '../managers/rollManager';
import {getTicketsAction} from '../actions/getTicketsAction';
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
        this.props.getTicketsAction('test');
    }

    onTicketNumberPressed = (ticketIndex:number, item) => {
        this._ticketsManager.setTicketPressed('test', ticketIndex, item.id, !item.isPressed )
        console.log(item.isPressed);
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
        getTicketsAction : (name:string) => {dispatch(getTicketsAction(name));},
        numberRolledListenerAction : () => {dispatch(numberRolledListenerAction());}
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent);