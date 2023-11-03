import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, KeyboardAvoidingView } from 'react-native';
import { Bubble, GiftedChat } from "react-native-gifted-chat";

const Chat = ({ route, navigation }) => {
    const { name } = route.params;
    const { color } = route.params;
    const [messages, setMessages] = useState([]);
    const onSend = (newMessges) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, newMessges))
    }
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

    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: "Hello developer",
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: "React Native",
                    avatar: "https://placeimg.com/140/140/any",
                },
            },
            {
                _id: 2,
                text: 'This is a system message',
                createdAt: new Date(),
                system: true,
            }
        ]);
    }, []);

    useEffect(() => {
        navigation.setOptions({ title: name });
        navigation.setOptions({ backgroundColor: color });

    }, []);

    return (
        <View style={styles.container}>
            <GiftedChat
                messages={messages}
                renderBubble={renderBubble}
                onSend={messages => onSend(messages)}
                user={{
                    _id: 1
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