import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import api from '../api/api';

const VerifyScreen = ({ route, navigation }: any) => {
    const { mobile } = route.params;
    const [otp, setOtp] = useState('');
    const [timer, setTimer] = useState(60);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleVerify = async (code: string) => {
        try {
            await api.post(`/verifyOtp?mobile=${mobile}&otp=${code}`);
            Alert.alert('Success', 'Logged in successfully!');
        } catch (error) {
            setOtp('');
            Alert.alert('Invalid OTP', 'The code you entered is incorrect.');
        }
    };

    const handleResend = async () => {
        try {
            await api.post(`/resendOtp?mobile=${mobile}`);
            setTimer(60);
            Alert.alert('Sent', 'A new OTP has been sent.');
        } catch (e) {
            Alert.alert('Error', 'Resend failed.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Verify OTP</Text>
            <Text style={styles.subtitle}>Sent to +91 {mobile}</Text>
            <TextInput
                style={styles.otpInput}
                placeholder="0000"
                placeholderTextColor="#333"
                keyboardType="number-pad"
                maxLength={4}
                value={otp}
                onChangeText={(val) => {
                    setOtp(val);
                    if (val.length === 4) handleVerify(val);
                }}
                autoFocus
            />
            <View style={styles.timerContainer}>
                <Text style={{ color: '#666' }}>Didn't receive code? </Text>
                <TouchableOpacity disabled={timer > 0} onPress={handleResend}>
                    <Text style={{ color: timer > 0 ? '#444' : '#FFD700', fontWeight: 'bold' }}>
                        Resend {timer > 0 ? `(${timer}s)` : ''}
                    </Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: 20 }}>
                <Text style={{ color: '#888', textAlign: 'center', textDecorationLine: 'underline' }}>Change Number</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#121212', padding: 25, paddingTop: 100 },
    title: { fontSize: 32, fontWeight: 'bold', color: '#fff', marginBottom: 10 },
    subtitle: { fontSize: 16, color: '#888', marginBottom: 40 },
    otpInput: { backgroundColor: '#1E1E1E', color: '#FFD700', fontSize: 36, textAlign: 'center', letterSpacing: 20, borderRadius: 12, height: 80, borderWidth: 1, borderColor: '#FFD700' },
    timerContainer: { flexDirection: 'row', justifyContent: 'center', marginTop: 30 },
});

export default VerifyScreen;