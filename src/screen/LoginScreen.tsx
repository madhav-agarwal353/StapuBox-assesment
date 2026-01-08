import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import api from '../api/api';

const LoginScreen = ({ navigation }: any) => {
    const [mobile, setMobile] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSendOtp = async () => {
        if (mobile.length !== 10) {
            Alert.alert('Invalid Number', 'Please enter a 10-digit mobile number.');
            return;
        }
        setLoading(true);
        try {
            await api.post('/sendOtp', { mobile });
            navigation.navigate('Verify', { mobile });
        } catch (error) {
            Alert.alert('Error', 'Failed to send OTP. Check your API token.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Stapu<Text style={{ color: '#FFD700' }}>Box</Text></Text>
            <Text style={styles.subtitle}>Enter your mobile number to play</Text>
            <TextInput
                style={styles.input}
                placeholder="9711231143"
                placeholderTextColor="#555"
                keyboardType="number-pad"
                maxLength={10}
                onChangeText={setMobile}
            />
            <TouchableOpacity style={styles.button} onPress={handleSendOtp} disabled={loading}>
                {loading ? <ActivityIndicator color="#000" /> : <Text style={styles.buttonText}>SEND OTP</Text>}
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#121212', justifyContent: 'center', padding: 25 },
    title: { fontSize: 40, fontWeight: 'bold', color: '#fff', textAlign: 'center', marginBottom: 10 },
    subtitle: { fontSize: 16, color: '#888', textAlign: 'center', marginBottom: 40 },
    input: { backgroundColor: '#1E1E1E', color: '#fff', padding: 18, borderRadius: 12, fontSize: 18, marginBottom: 20, borderWidth: 1, borderColor: '#333' },
    button: { backgroundColor: '#FFD700', padding: 18, borderRadius: 12, alignItems: 'center' },
    buttonText: { fontWeight: 'bold', fontSize: 18, color: '#000' },
});

export default LoginScreen;