import React, { useState } from 'react';
import { StyleSheet, Text, View, Button,SafeAreaView } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ContactsList from './src/screens/ContactList'
import ContactDetails from './src/screens/ContactDetails'
import AddContact from './src/screens/AddContact'
import { Pressable } from 'react-native';
import { HeaderBackButton } from '@react-navigation/stack'
import { Provider, useDispatch } from 'react-redux';
import { createStore } from 'redux';
import appstore from './src/store'
import { SET_SELECTED } from './src/store/constants';
import RightActionButton from './src/screens/AddContact/RightActionButton';
import RightActionButtonEdit from './src/screens/UpdateContact/RightActionButtonEdit';
import CancelButtonEdit from './src/screens/UpdateContact/CancelButtonEdit';
import 'react-native-gesture-handler';
import UpdateContact from './src/screens/UpdateContact';
const Stack = createStackNavigator();
const store = createStore(appstore);
export const StoreWrapper = ({children})=>{
  return(
    <Provider store={store}>{children}</Provider>
  )
}
export const AddAction = ({navigation})=>{
  let dispatch = useDispatch()
  return( <Pressable onPress={() => {
    dispatch({
      type:SET_SELECTED,
      payload:{}
    })
    navigation.navigate('AddContact')
  }}>
    <Text style={styles.addIcon}>+</Text>
  </Pressable>)
}
const App = (props) => {
  // return(<SafeAreaView><Camera /></SafeAreaView>
  // )
  return (<Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="ContactsList" options={({ navigation, route }) => ({
          title: 'Contacts',
          headerRight: () => (
           <AddAction navigation={navigation}/>
          )
        })}
        >
          {
            (props) => {
              return <ContactsList {...props}  />
            }
          }
        </Stack.Screen>
        <Stack.Screen name="ContactDetails" options={({ navigation, route }) => ({
          title: 'Details',
          headerRight: () => (
            <Pressable onPress={() => {
              console.log(props)
              navigation.navigate('EditContact')
            }}>
              <Text style={styles.addIcon}  style={{ ...styles.primaryText, ...styles.actionFS, ...{ marginRight: 8 } }}>Edit</Text>
            </Pressable>
          ),
          headerLeft: () => (
            <HeaderBackButton label='Contacts' title='Contacts' onPress={() => {
              navigation.navigate('ContactsList')
            }} />
          ),
        })
        }  >{props => <ContactDetails  {...props} />}</Stack.Screen>
        <Stack.Screen name="AddContact"
          options={({ navigation, route })=>({
            title: 'Add',
            headerLeft: () => (
              <Pressable  onPress={() => {
                navigation.navigate('ContactsList')
              }} ><Text  style={{ ...styles.primaryText, ...styles.actionFS, ...{ marginLeft: 8 } }}>Cancel</Text></Pressable>
              ),
            headerRight: () => (
            <RightActionButton navigation={navigation}/>
            )
          })} >
          {props => <AddContact {...props}  />}
        </Stack.Screen>
        <Stack.Screen name="EditContact"
          options={({ navigation, route })=>({
            title: 'Edit',
            headerLeft: () => (
            <CancelButtonEdit navigation={navigation} />
              ),
            headerRight: () => (
              <RightActionButtonEdit navigation={navigation} />
            // <RightActionButton navigation={navigation}/>
            )
          })} >
          {props => <UpdateContact {...props}  />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  </Provider>)
}
export default App
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addIcon: {
    fontSize: 28,
    color: '#4d90fe',
    marginRight: 8
  },
  primaryText: {
    color: '#4d90fe'
  },
  actionFS: {
    fontSize: 16
  }
});
