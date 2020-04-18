import React, { Component } from 'react';
import {StyleSheet, View, FlatList, SectionList, Image, TouchableOpacity, Text} from 'react-native';
import TicketNumber from './TicketNumber';
import PropTypes from 'prop-types';

class TicketGrid extends Component{
    constructor(props){
        super(props);
    }
    
    render(){
        var layout= [];
        for(let i=0; i< this.props.tickets.length; i++){
            layout.push(
                <View key={i} style={{}}>
                    <Text>{this.props.tickets[i].title}</Text>
                    <FlatList
                        data={this.props.tickets[i].numbers}
                        renderItem={({ item }) => (
                            <View style={{ flex: 1, flexDirection: 'column', margin: 1 }}>
                                <TouchableOpacity style={styles.numberThumbnail} onPress={() => this.props.onPress(item.value)}>                        
                                    <Text style={styles.numberText}>{item.value}</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                        //Setting the number of column
                        numColumns={5}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
            )
        }
        return(
            <View style={styles.container}>
                {layout}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        //justifyContent:'space-evenly',
        flex: 1,
        paddingTop: 30,
        backgroundColor:'red'
    },
    numberThumbnail: {
        justifyContent: 'center',
        alignItems: 'center',
        height:50,
        backgroundColor:'silver'
    },
    numberText:{
        fontSize:20
    }
})

TicketGrid.prototypes = {
    onPress: PropTypes.func.isRequired,
    tickets: PropTypes.array.isRequired
}

export default TicketGrid;