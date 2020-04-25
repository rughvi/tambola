import React from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { Component } from 'react';
import HomeComponent from '../components/HomeComponent';
import LoginComponent from '../components/LoginComponent';
import LandingComponent from '../components/LandingComponent';

const CreateRootNavigator = createSwitchNavigator({    
    Landing:{
        screen: LandingComponent
    },
    Home:{
        screen:HomeComponent
    },
    Login:{
        screen:LoginComponent
    }},
    {
        initialRouteName:'Login'
    }
) 

const AppNavigator = createAppContainer(CreateRootNavigator);

export default AppNavigator;