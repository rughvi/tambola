import React, { Component } from 'react';
import {View, SafeAreaView, StyleSheet, Text} from 'react-native';
import {connect} from 'react-redux';
import TicketNumber from '../CustomComponents/TicketNumber';
import TicketGrid from '../CustomComponents/TicketGrid';

class HomeComponent extends Component{
    constructor(props){
        super(props);
        this.state = {
            tickets: [],
          };
    }

    componentDidMount(){
        var that = this;
        let items1 = Array.apply(null, Array(15)).map((v, i) => {
          return { id: i, value:i + 1};
        });
        let items2 = Array.apply(null, Array(15)).map((v, i) => {
            return { id: i, value:i + 1};
          });
        that.setState({
          tickets: [{
            title:'Ticket 1',
            numbers:items1
          },
          {
            title:'Ticket 2',
            numbers:items2
          }],
        });
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