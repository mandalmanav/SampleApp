import React from 'react'
import { View, StyleSheet, TextInput } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { SET_SEARCH } from '../../store/constants'


export default ({ }) => {
    let { searchTerm } = useSelector(state => state)
    let dispatch = useDispatch()
    return <View style={styles.headerContainer}>

        <TextInput
            testID='search-box'
            style={styles.searchBar}
            value={searchTerm}
            onChangeText={(value)=>{
               dispatch({
                   type:SET_SEARCH,
                   payload:value
               })
            }}
            placeholder="Search"
        />

    </View>
}

const styles = StyleSheet.create({
    iconContainer: {
        flexDirection: 'column',
        alignItems: 'flex-end'
    },
    addIcon: {
        fontSize: 28,
        color: '#4d90fe'
    },
    contactLabel: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    searchBar: {
        backgroundColor: '#f0f0f0',
        fontSize: 14,
        paddingLeft: 4,
        borderTopRightRadius: 4,
        borderTopLeftRadius: 4,
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,
    },
    headerContainer: {
        paddingLeft: 8,
        paddingRight: 8
    }
})