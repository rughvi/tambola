/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';

class FormTextButton extends Component{
    constructor(props){
        super(props);
    }

    render() {
        const { label, onPress } = this.props;
        return (
          <TouchableOpacity style={styles.container} onPress={onPress}>
            <Text style={styles.text}>{label}</Text>
          </TouchableOpacity>
        );
      }      
}

const styles = StyleSheet.create({
    container:{
        width:'100%',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#3badfc',
        marginBottom: 12,
        paddingVertical: 12,
        borderRadius: 4,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: "rgba(255,255,255,0.7)"
    },
    text: {
      color: "#FFF",
      textAlign: "center",
      height: 20
    }
})

FormTextButton.propTypes = {
  label: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired
}

export default FormTextButton;