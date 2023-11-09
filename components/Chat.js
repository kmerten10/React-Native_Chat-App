import { onSnapshot, addDoc, query, collection, orderBy } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { StyleSheet, View, KeyboardAvoidingView } from 'react-native';
import { Bubble, GiftedChat, InputToolbar } from "react-native-gifted-chat";
import CustomActions from "./CustomActions";
import MapView from "react-native-maps";

import AsyncStorage from "@react-native-async-storage/async-storage";


const Chat = ({ db, route, navigation, isConnected, storage }) => {
    const { userId } = route.params;
    const { name } = route.params;
    const { color } = route.params;

    const [messages, setMessages] = useState([]);

    let unsubMessages;

    useEffect(() => {
        navigation.setOptions({ title: name });

    }, []);

    useEffect(() => {
        if (isConnected === true) {
            if (unsubMessages) unsubMessages(); // Unsubscribe any previous Firestore listener.
            unsubMessages = null;

            // Query Firestore for messages, ordered by their creation date.
            const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));

            // Listen for real-time changes in messages collection.
            unsubMessages = onSnapshot(q, (docs) => {
                let newMessages = [];
                docs.forEach((doc) => {
                    newMessages.push({
                        _id: doc.id,
                        ...doc.data(),
                        createdAt: new Date(doc.data().createdAt.toMillis()),
                    });
                });
                cacheMessages(newMessages); // Cache the fetched messages.
                setMessages(newMessages); // Update state with new messages.
            });
        } else loadCachedMessages();

        // Cleanup function to unsubscribe from Firestore listener.
        return () => {
            if (unsubMessages) {
                unsubMessages();
            }
        };
    }, [isConnected]);

    const loadCachedMessages = async () => {
        const cachedMessages = (await AsyncStorage.getItem("messages")) || [];
        setMessages(JSON.parse(cachedMessages));
    };

    const cacheMessages = async (messagesToCache) => {
        try {
            await AsyncStorage.setItem("messages", JSON.stringify(messagesToCache));
        } catch (error) {
            console.log(error.message);
        }
    };


    const onSend = (newMessages) => {
        addDoc(collection(db, "messages"), newMessages[0]);
    };

    const renderBubble = (props) => {
        return <Bubble{...props}
            wrapperStyle={{
                right: {
                    backgroundColor: "#474056"
                },
                left: {
                    backgroundColor: "#FFF"
                }
            }}
        />
    }

    const renderInputToolbar = (props) => {
        if (isConnected) return <InputToolbar {...props} />;
        else return null;
    };

    const renderCustomActions = (props) => {
        return <CustomActions storage={storage} {...props} />;
    }

    const renderCustomView = (props) => {
        const { currentMessage } = props;
        if (currentMessage.location) {
            return (
                <MapView
                    style={{
                        width: 150,
                        height: 100,
                        borderRadius: 13,
                        margin: 3
                    }}
                    region={{
                        latitude: currentMessage.location.latitude,
                        longitude: currentMessage.location.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                />
            );
        }
        return null;
    }


    return (
        <View style={[styles.container, { flex: 1, backgroundColor: color }]}>
            <GiftedChat
                messages={messages}
                renderBubble={renderBubble}
                renderInputToolbar={renderInputToolbar}
                renderActions={renderCustomActions}
                renderCustomView={renderCustomView}
                onSend={messages => onSend(messages)}
                user={{
                    _id: userId,
                    name
                }}
            />
            {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text: {
        color: 'white',
        fontSize: 20
    }
});

export default Chat;