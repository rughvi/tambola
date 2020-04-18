import React, { Component } from 'react';
import {StyleSheet, TextInput, TextInputProps} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import PropTypes from 'prop-types';

class FormTextInput extends Component{
    constructor(props){
        super(props)
    }

    render(){
        const {style, ...otherProps} = this.props;
        return(
            <TextInput
                selectionColor="#428AF8"
                style={[style,styles.textInput]}
                {...otherProps}>
            </TextInput>
        )
    }
}

const styles = StyleSheet.create({
    textInput:{
        height:40,
        borderColor:'#BEBEBE',
        borderBottomWidth:StyleSheet.hairlineWidth,
        marginBottom:20
    }
})


export default FormTextInput;