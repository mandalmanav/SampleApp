import React, { useState } from 'react'
import Header from './Header'
import MainList from './MainList'
import { View, StyleSheet ,SafeAreaView } from 'react-native'
export default ({navigation,navigation:{navigate},refresh}) => {
    
    let [searchTerm , setSearchTerm] = useState('')
    return <SafeAreaView  style={styles.containerStyle}>
        <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm}></Header>
        <MainList refresh={refresh} navigation={navigation} navigate={navigate} searchTerm={searchTerm}></MainList>
    </SafeAreaView >
}

const styles = StyleSheet.create({
    containerStyle: {
        flex:1,
        padding: 12,
        backgroundColor: 'white'
    }
})