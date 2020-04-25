/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import {StyleSheet, View, FlatList, TouchableOpacity, Text} from 'react-native';
import PropTypes from 'prop-types';

class RolledNumbersGrid extends Component{
    constructor(props){
        super(props);
    }
    
    render(){
        console.log(this.props.rolledNumbers);
        let rolledNumbers = Array(100)
                            .fill('')
                            .map((item, index) => (this.props.rolledNumbers.length > index? (this.props.rolledNumbers[index]).toString(): ''));

        return(
            <View style={styles.container}>
                <Text style={styles.title}>Rolled Numbers</Text>
                <FlatList
                    style={{marginTop:10, marginBottom:10}}
                    data={rolledNumbers}
                    renderItem={({ item, index }) => (
                        <View style={{ flex: 1, flexDirection: 'column', margin: 1 }}>
                            <TouchableOpacity style={index % 2 == 0? styles.numberPressedThumbnail :styles.numberThumbnail}>
                                <Text style={styles.numberText}>{item}</Text>    
                            </TouchableOpacity>
                        </View>
                    )}
                    //Setting the number of column
                    numColumns={10}
                    keyExtractor={(item, index) => index.toString()}
                />
                <TouchableOpacity onPress={this.props.onPress} style={styles.closeButton}>
                    <Text style={{alignSelf:'center', fontSize:20}}>Close</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    title:{
        alignSelf:'center', 
        fontSize:20, 
        fontWeight:'bold'
    },
    numberThumbnail: {
        justifyContent: 'center',
        alignItems: 'center',
        height:50,
        backgroundColor:'silver'
    },
    numberPressedThumbnail: {
        justifyContent: 'center',
        alignItems: 'center',
        height:50,
        backgroundColor:'lightblue'
    },
    numberText:{
        fontSize:20,
        color:'white',
        fontWeight:'bold'
    },
    closeButton:{
        width:'50%', 
        backgroundColor:'silver', 
        alignSelf:'center', 
        height:50, 
        // flex:1, 
        justifyContent:'center', 
        borderRadius:20
    }
})

RolledNumbersGrid.prototypes = {
    onPress: PropTypes.func.isRequired,
    rolledNumbers: PropTypes.array.isRequired
}

export default RolledNumbersGrid;