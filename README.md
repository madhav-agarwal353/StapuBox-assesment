# 📱 StapuBox – OTP Registration Flow (React Native)

## 📌 Overview
This project implements a **3-screen mobile number registration/login flow using OTP** for Android, built with **React Native**.

Due to **semester examinations**, the development time for this assignment was limited to **today afternoon only**.  
Despite the time constraint, I have implemented the **complete functional flow** with real API integration and core UX behaviors as per the assignment scope.

I have tried my best to keep the implementation **clean, readable, and close to real-world usage**.

---

## 🎯 Features Implemented

### ✅ Screen 1 – Send OTP
- Mobile number input (India – 10 digits)
- Basic validation for incorrect numbers
- API integration for **Send OTP**
- Success & error state handling
- Navigation to OTP verification screen

### ✅ Screen 2 – Verify OTP
- 4-digit OTP input UI
- Auto-focus between OTP inputs
- Auto-submit once OTP is fully entered
- API integration for **Verify OTP**
- Error highlight for invalid OTP
- **Resend OTP** functionality with 60-second cooldown
- Option to change mobile number

### ✅ Device Behavior
- Attempted **Android SMS auto-read** using SMS Retriever API
- Graceful fallback to manual OTP entry if auto-read fails


