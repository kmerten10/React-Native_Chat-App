import { onSnapshot, addDoc, query, collection, orderBy } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { StyleSheet, View, KeyboardAvoidingView } from 'react-native';
import { Bubble, GiftedChat } from "react-native-gifted-chat";

const Chat = ({ db, route, navigation }) => {
    const { userId } = route.params;
    const { name } = route.params;
    const { color } = route.params;
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        navigation.setOptions({ title: name });
        navigation.setOptions({ backgroundColor: color });

    }, []);

    useEffect(() => {
        navigation.setOptions({ title: name });
        const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));

        const unsubMessages = onSnapshot(q, (documentsSnapShot) => {
            let messages = [];
            documentsSnapShot.forEach(doc => {
                messages.push({ id: doc.id, ...doc.data(), createdAt: new Date(doc.data().createdAt.toMillis()), });
            })
            setMessages(messages);
        })

        return () => {
            if (unsubMessages) unsubMessages();
        }
    }, []);


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


    return (
        <View style={[styles.container, { flex: 1, backgroundColor: color }]}>
            <GiftedChat
                messages={messages}
                renderBubble={renderBubble}
                onSend={messages => onSend(messages)}
                user={{
                    _id: userId,
                    name: name
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