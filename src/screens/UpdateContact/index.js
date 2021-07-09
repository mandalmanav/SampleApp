
import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, TextInput, Pressable, Alert } from 'react-native'
import { Camera } from 'expo-camera';
import { addContactAction, updateContactAction } from '../../store/actions/contacts';
import { useDispatch, useSelector } from 'react-redux';
import { SET_CONTACTS, SET_PROPERTY, SET_SELECTED, SET_UPDATE_OBJECT, UPDATE_CONTACT } from '../../store/constants';
import { updateObject } from '../../store/reducers/contactsReducers';

export default ({ navigation, route }) => {
  
    let { contact } =useSelector(state => state)
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    let [openCamera, setOpenCamera] = useState(false)
    const dispatch = useDispatch()
    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }
    const setContact = (property,value) =>{
        let temp = {...contact}
        temp[property]=value
        dispatch({
            type:SET_SELECTED,
            payload:temp
        })
    }
    const saveContact = () =>{
        alert(JSON.stringify(contact))
    }
    
    const snap = async () => {
        if (this.camera) {
            let photo = await this.camera.takePictureAsync();
            setContact('image',photo.uri)
            setOpenCamera(false)
        }
    };
    return <View style={styles.container}>
        {openCamera ? <Camera ref={ref => {
            this.camera = ref;
        }} style={styles.camera} type={type}>
            <View style={styles.buttonContainer}>
                <View>
                    <Pressable
                        style={styles.button}
                        onPress={() => {
                            setType(
                                type === Camera.Constants.Type.back
                                    ? Camera.Constants.Type.front
                                    : Camera.Constants.Type.back
                            );
                        }}>
                        <Text style={styles.text}> Flip </Text>

                    </Pressable>
                </View>
                <View>
                    <Pressable onPress={snap}>
                        <Text style={styles.text}>Capture</Text>
                    </Pressable>
                </View>
            </View>
        </Camera> : <View><View style={styles.detailsContainer}>

            <View style={styles.avatarContainer}>
                <View style={styles.avatarBox}>
                    
                    {
                        contact.image != null ?
                        <Pressable onPress={() => {
                            setOpenCamera(true)
                        }}>
                          
                          <Image
                            style={styles.avatar}
                            source={{
                                uri: contact.image,
                            }}
                        /> 
                         </Pressable>: <Pressable onPress={() => {
                            setOpenCamera(true)
                        }}>
                            <Text testID="add-image-button" style={{ textAlign: 'center' }}>Add Image</Text>
                        </Pressable>
                    }

                </View>
            </View>
            <View style={styles.details}>
                <TextInput testID="first-name" value={contact.firstName} onChangeText={(value)=>{
                    setContact('firstName',value)
                }} placeholder={'Enter First Name'}  style={styles.inputItem} />
                <TextInput testID="last-name" value={contact.lastName}  onChangeText={(value)=>{
                    setContact('lastName',value)
                }} placeholder={'Enter Last Name'}  style={styles.inputItem} />
            </View>

        </View>
            <View style={styles.mobileContainer}>
                <Text style={{ ...styles.actionFS, ...{ flex: 1, paddingLeft: 8 } }}>Mobile</Text>
                <TextInput testID="mobile"  onChangeText={(value)=>{
                    setContact('mobile',value)
                }}  keyboardType="number-pad" value={contact.mobile} maxLength={10}  style={{ ...styles.mobileInput, ...styles.inputItem }} placeholder="Add mobile"></TextInput>
            </View>
       
            </View>}
    </View>
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        height: '100%',
        padding: 8
    },
    navBar: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    primaryText: {
        color: '#4d90fe'
    },
    actionFS: {
        fontSize: 18
    },
    avatarContainer: {
        flex: 1
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 50 / 2,
        overflow: "hidden",
    },
    avatarBox: {
        width: 70,
        height: 70,
        borderRadius: 70 / 2,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: '#e5e5e5',
        alignItems: 'center',
        justifyContent: 'center'
    },
    detailsContainer: {
        flexDirection: 'row',
        paddingTop: 30
    },
    details: {
        paddingLeft: 20,
        flex: 3
    },
    inputItem: {
        borderBottomWidth: .5,
        borderBottomColor: '#e5e5e5',
        height: 40
    },
    mobileContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    mobileInput: {
        flex: 3,
        marginLeft: 22
    },
    save: {
        borderWidth: 1,
        alignItems: 'center',
        width: 50,
        paddingTop: 6,
        paddingBottom: 6,
        paddingLeft: 6,
        paddingRight: 6
    },
    container: {
        flex: 1,
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        margin: 20,
        justifyContent: 'space-around'
    },
    button: {
        flex: 0.1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        color: 'white',
    },
})
