import React, { Component } from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';


class TicketNumber extends Component{
    constructor(props){
        super(props)
    }

    render(){
        const {value, onPress} = this.props;
        return(
            <TouchableOpacity onPress={() => onPress(value)}>
                <Text style={styles.text}>{value}</Text>
            </TouchableOpacity>
        )
    }
}

const styles= StyleSheet.create({
    text:{
        fontSize:40
    }
})

TicketNumber.propTypes = {
    value:PropTypes.number.isRequired,
    onPress: PropTypes.func.isRequired
}

export default TicketNumber;