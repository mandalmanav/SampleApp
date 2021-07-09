import React, { useEffect } from 'react';
import { View, Text, SectionList, StyleSheet, FlatList, Pressable } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { getAllContactsAction } from '../../store/actions/contacts';
import HighlightText from '@sanar/react-native-highlight-text';
import { SET_SELECTED } from '../../store/constants';
const Item = ({ title, isLast, searchTerm }) => (
    <View style={styles.item}>

        <Text testID="contact" style={isLast ? { ...styles.title, ...styles.border0 } : { ...styles.title, ...styles.border1 }}>
            <HighlightText
                highlightStyle={{ fontWeight:'bold',backgroundColor:'yellow' }}
                searchWords={[searchTerm]}
                textToHighlight={title}
            />
        </Text>
    </View>
);
export default ({  navigate }) => {
    const dispatch = useDispatch();
    let { contacts ,searchTerm} = useSelector(state => state)
    useEffect(() => {
        getAllContactsAction(dispatch)
    }, [])
    let groupList = [
        {
            title: 'A',
            data: []
        }, {
            title: 'B',
            data: []
        }, {
            title: 'C',
            data: []
        }, {
            title: 'D',
            data: []
        }, {
            title: 'E',
            data: []
        }, {
            title: 'F',
            data: []
        }, {
            title: 'G',
            data: []
        }, {
            title: 'H',
            data: []
        }, {
            title: 'I',
            data: []
        }, {
            title: 'J',
            data: []
        }, {
            title: 'K',
            data: []
        }, {
            title: 'L',
            data: []
        }, {
            title: 'M',
            data: []
        }, {
            title: 'N',
            data: []
        }, {
            title: 'O',
            data: []
        }, {
            title: 'P',
            data: []
        }, {
            title: 'Q',
            data: []
        }, {
            title: 'R',
            data: []
        }, {
            title: 'S',
            data: []
        }, {
            title: 'T',
            data: []
        }, {
            title: 'U',
            data: []
        }, {
            title: 'V',
            data: []
        }, {
            title: 'W',
            data: []
        }, {
            title: 'X',
            data: []
        }, {
            title: 'Y',
            data: []
        }, {
            title: 'Z',
            data: []
        }
    ]
    let filteredList = []
    if (searchTerm.trim() !== "") {
        filteredList = contacts.filter(item =>( item.firstName&&item.firstName.toLowerCase().indexOf(searchTerm.toLowerCase()) != -1)|| (item.lastName&&item.lastName.toLowerCase().indexOf(searchTerm.toLowerCase()) != -1))
    }
    else {
        filteredList = contacts;
    }
    let ungroupContacts = {
        title: '#',
        data: []
    }
    let arrayOfInitials = groupList.map(group => group.title.toLowerCase())

    let groupedContacts = groupList.map(item => {
        filteredList.map(contact => {

            if (contact.firstName&&contact.firstName.toLowerCase().startsWith(item.title.toLowerCase())) {
                item.data.push(contact)

            }


        })


        return item
    })
    filteredList.map(contact => {

        if (arrayOfInitials.indexOf(contact.firstName&&contact.firstName.toLowerCase().charAt(0)) == -1) {
            ungroupContacts.data.push(contact)
        }

    })
    groupedContacts.push(ungroupContacts)
    groupedContacts = groupedContacts.filter(group => group.data.length)
    const renderItem = ({ item, index, section, ...rest }) => (
        
        <Pressable onPress={() => {
            dispatch({
                type:SET_SELECTED,
                payload:item
            })
            navigate('ContactDetails', { contact: item })
        }}>
            {
                section ? <Item title={`${item.firstName} ${item.lastName}`} isLast={index === section.data.length - 1} /> : <Item searchTerm={searchTerm} title={`${item.firstName} ${item.lastName}`} isLast={index === filteredList.length - 1} />
            }
        </Pressable>
    );
    return <View style={styles.content}>
        {
            searchTerm.trim() == "" ? <SectionList
                sections={groupedContacts}
                keyExtractor={(item, index) => item + index}
                renderItem={
                    renderItem
                }
                renderSectionHeader={({ section: { title } }) => (
                    <Text style={styles.header}>{title}</Text>
                )}
            /> : <FlatList
                data={filteredList}
                renderItem={renderItem}
                keyExtractor={item => String(item.id)
                }
            />

        }

    </View>
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#f0f0f0',
        height: 24,
        textAlignVertical: 'center',
        paddingLeft: 4,
        fontWeight: "bold"
    },
    item: {
        padding: 4,
        paddingTop: 8,
    },
    title: {
        paddingBottom: 8
    },
    border0: {
        borderBottomWidth: 0
    },
    border1: {
        borderBottomWidth: .3,
        borderBottomColor: '#e7e7e7'
    },
    content: {
        paddingLeft: 8,
        paddingRight: 8,
        flex: 1,
        marginTop: 12
    }

})