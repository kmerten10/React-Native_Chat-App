import { useState } from 'react';
import { Alert, Image, ImageBackground, StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { getAuth, signInAnonymously } from "firebase/auth";


const Start = ({ navigation }) => {

    //creates state for name input so that content is updated dynamically
    const [name, setName] = useState('');
    //creates state for background selection so that background is populated dynamically
    const [background, setBackground] = useState('white');
    //creates a variable (options) for th setBackground selection
    const colors = ['#090C08', '#474056', '#8A95A5', '#B9C6AE'];

    const auth = getAuth();
    const signInUser = () => {
        signInAnonymously(auth)
            .then(result => {
                navigation.navigate("Chat", { userID: result.user.uid, name: name, color: background });
                Alert.alert("Signed in Successfully");
            })
            .catch((error) => {
                Alert.alert("Unable to sign in, try again later");
            });
    }

    return (
        //wrapper
        <ImageBackground source={require('../assets/backgroundimage.png')} style={styles.image} >

            <View style={styles.container}>
                <Text style={styles.text}>Chat App</Text>
            </View>

            <View style={styles.box}>
                <View style={styles.textInput}>
                    <Image source={require('../assets/icon.svg')}></Image>

                    <TextInput
                        value={name}
                        /*user interaction that uses a prop to populate the textbox based on the current state*/
                        onChangeText={setName}
                        placeholder={'Your Name'}>
                    </TextInput>
                </View>

                <View style={styles.backgroundContainer}>
                    <Text style={styles.textBackground}>Choose your background color:</Text>
                    {/* ASK ABOUT BELOW */}
                    <View style={styles.colorList}>
                        {colors.map((color, index) => (
                            <TouchableOpacity
                                key={index}
                                style={[styles.colorCircles, { backgroundColor: color },
                                ]}
                                onPress={() => setBackground(color)} />
                        ))}
                    </View>
                </View>

                <TouchableOpacity style={styles.buttonContainer}
                    onPress={signInUser}>
                    <Text style={styles.button}>Start Chatting</Text>
                </TouchableOpacity>

            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        marginTop: 60
    },
    text: {
        fontSize: 45,
        fontWeight: '600',
        color: '#FFFFFF',
    },
    box: {
        height: '44%',
        width: '88%',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 15
    },
    textInput: {
        width: '88%',
        padding: 15,
        borderWidth: 1,
        borderColor: '#757083',
        marginTop: 15,
        marginBottom: 15,
        fontSize: 16,
        fontWeight: '300',
        color: '#757083',
        opacity: 50,
        flexDirection: 'row',

    },
    textBackground: {
        fontSize: 16,
        fontWeight: '300',
        color: '#757083',
        opacity: 100,
        paddingLeft: 20
    },
    colorList: {
        flexDirection: 'row',
        paddingLeft: 10
    },
    colorCircles: {
        width: 40,
        height: 40,
        margin: 10,
        borderRadius: 20,
    },
    backgroundContainer: {
        justifyContent: 'space-evenly',
        alignSelf: 'flex-start'
    },
    buttonContainer: {
        width: '88%',
        alignItems: 'center',
        backgroundColor: '#757083',
        paddingTop: 15,
        paddingBottom: 15,
        marginBottom: 15
    },
    button: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFFFFF',
    },
    selected: {
        borderWidth: 1,
        borderColor: 'white'
    }
});

export default Start;