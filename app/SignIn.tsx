
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Stack, router } from 'expo-router';
// import React, { useEffect, useState } from 'react';
// import {
//   Alert,
//   Image,
//   ImageBackground,
//   Platform,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from 'react-native';

// const images = [
//   require('../assets/images/bg1.png'),
//   require('../assets/images/bg2.png'),
//   require('../assets/images/bg3.png'),
// ];

// const logo = require('../assets/images/indxo_logo.png');

// // 🌐 Static API URL (Ngrok)
// const BASE_URL = 'https://aphid-full-frankly.ngrok-free.app';

// export default function SignInScreen() {
//   const [imageIndex, setImageIndex] = useState(0);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
//     }, 3000);
//     return () => clearInterval(interval);
//   }, []);

//   const handleSignIn = async () => {
//     if (email.trim() === '' || password.trim() === '') {
//       Alert.alert('Missing Fields', 'Please enter both email and password.');
//       return;
//     }

//     try {
//       const response = await fetch(`${BASE_URL}/login`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await response.json();

//       if (response.ok && data.success) {
//         // ✅ Save user credentials
//         await AsyncStorage.setItem('user_email', email);
//         await AsyncStorage.setItem('user_password', password);

//         router.replace('../screens/dashboard');
//       } else {
//         Alert.alert('Login Failed', data.message || 'Invalid credentials');
//       }
//     } catch (error) {
//       console.error('Login error:', error);
//       Alert.alert('Error', 'Unable to connect to server.');
//     }
//   };

//   return (
//     <>
//       <Stack.Screen options={{ headerShown: false }} />
//       <ImageBackground
//         source={images[imageIndex]}
//         style={styles.background}
//         resizeMode="cover"
//       >
//         <Image source={logo} style={styles.logo} resizeMode="contain" />

//         <View style={styles.overlay}>
//           <View style={styles.container}>
//             <Text style={styles.title}>Sign In</Text>

//             <Text style={styles.label}>Email</Text>
//             <TextInput
//               placeholder="example@gmail.com"
//               placeholderTextColor="#aaa"
//               style={styles.inputBox}
//               keyboardType="email-address"
//               autoCapitalize="none"
//               value={email}
//               onChangeText={setEmail}
//             />

//             <Text style={styles.label}>Password</Text>
//             <TextInput
//               placeholder="password"
//               placeholderTextColor="#aaa"
//               secureTextEntry
//               style={styles.inputBox}
//               value={password}
//               onChangeText={setPassword}
//             />

//             <TouchableOpacity>
//               <Text style={styles.forgot}>Forgot Password?</Text>
//             </TouchableOpacity>

//             <TouchableOpacity style={styles.button} onPress={handleSignIn}>
//               <Text style={styles.buttonText}>Sign In</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </ImageBackground>
//     </>
//   );
// }

// const styles = StyleSheet.create({
//   background: {
//     flex: 1,
//     width: '100%',
//     height: '100%',
//   },
//   logo: {
//     position: 'absolute',
//     top: Platform.OS === 'web' ? 20 : 50,
//     left: 20,
//     width: 100,
//     height: 40,
//     zIndex: 10,
//   },
//   overlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0, 0, 0, 0.4)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   container: {
//     backgroundColor: 'rgba(255, 255, 255, 0.12)',
//     padding: 24,
//     borderRadius: 16,
//     width: '85%',
//     maxWidth: 450,
//   },
//   title: {
//     color: '#fff',
//     fontSize: 28,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 20,
//   },
//   label: {
//     color: '#ddd',
//     fontSize: 14,
//     marginBottom: 6,
//     marginTop: 10,
//   },
//   inputBox: {
//     width: '100%',
//     backgroundColor: 'rgba(255,255,255,0.15)',
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//     borderRadius: 10,
//     marginBottom: 10,
//     color: '#fff',
//     borderWidth: 1,
//     borderColor: '#999',
//   },
//   forgot: {
//     color: 'yellow',
//     fontSize: 14,
//     textAlign: 'right',
//     marginBottom: 20,
//   },
//   button: {
//     backgroundColor: 'rgba(224, 208, 208, 0.75)',
//     paddingVertical: 14,
//     borderRadius: 10,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: 'black',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });



// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Stack, router } from 'expo-router';
// import React, { useEffect, useState } from 'react';
// import {
//   Alert,
//   Image,
//   ImageBackground,
//   Platform,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from 'react-native';

// // Background images
// const images = [
//   require('../assets/images/bg1.png'),
//   require('../assets/images/bg2.png'),
//   require('../assets/images/bg3.png'),
// ];

// const logo = require('../assets/images/indxo_logo.png');

// // ✅ Updated backend login API
// const BASE_URL = 'https://indxoapp.onrender.com';

// export default function SignInScreen() {
//   const [imageIndex, setImageIndex] = useState(0);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   // ⏱️ Background image slideshow
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
//     }, 3000);
//     return () => clearInterval(interval);
//   }, []);

//   const handleSignIn = async () => {
//     if (email.trim() === '' || password.trim() === '') {
//       Alert.alert('Missing Fields', 'Please enter both email and password.');
//       return;
//     }

//     try {
//       const response = await fetch(`${BASE_URL}/login`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await response.json();

//       if (response.ok && data.success) {
//         await AsyncStorage.setItem('user_email', email);
//         await AsyncStorage.setItem('user_password', password);

//         router.replace('../screens/dashboard'); // Navigate after login
//       } else {
//         Alert.alert('Login Failed', data.message || 'Invalid credentials');
//       }
//     } catch (error) {
//       console.error('Login error:', error);
//       Alert.alert('Error', 'Unable to connect to the server.');
//     }
//   };

//   return (
//     <>
//       <Stack.Screen options={{ headerShown: false }} />
//       <ImageBackground
//         source={images[imageIndex]}
//         style={styles.background}
//         resizeMode="cover"
//       >
//         <Image source={logo} style={styles.logo} resizeMode="contain" />

//         <View style={styles.overlay}>
//           <View style={styles.container}>
//             <Text style={styles.title}>Sign In</Text>

//             <Text style={styles.label}>Email</Text>
//             <TextInput
//               placeholder="example@gmail.com"
//               placeholderTextColor="#aaa"
//               style={styles.inputBox}
//               keyboardType="email-address"
//               autoCapitalize="none"
//               value={email}
//               onChangeText={setEmail}
//             />

//             <Text style={styles.label}>Password</Text>
//             <TextInput
//               placeholder="password"
//               placeholderTextColor="#aaa"
//               secureTextEntry
//               style={styles.inputBox}
//               value={password}
//               onChangeText={setPassword}
//             />

//             <TouchableOpacity>
//               <Text style={styles.forgot}>Forgot Password?</Text>
//             </TouchableOpacity>

//             <TouchableOpacity style={styles.button} onPress={handleSignIn}>
//               <Text style={styles.buttonText}>Sign In</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </ImageBackground>
//     </>
//   );
// }

// const styles = StyleSheet.create({
//   background: {
//     flex: 1,
//     width: '100%',
//     height: '100%',
//   },
//   logo: {
//     position: 'absolute',
//     top: Platform.OS === 'web' ? 20 : 50,
//     left: 20,
//     width: 140, // ✅ Increased width
//     height: 90, // ✅ Increased height
//     zIndex: 20,
//   },
//   overlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0, 0, 0, 0.4)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   container: {
//     backgroundColor: 'rgba(255, 255, 255, 0.12)',
//     padding: 24,
//     borderRadius: 16,
//     width: '85%',
//     maxWidth: 450,
//   },
//   title: {
//     color: '#fff',
//     fontSize: 28,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 20,
//   },
//   label: {
//     color: '#ddd',
//     fontSize: 14,
//     marginBottom: 6,
//     marginTop: 10,
//   },
//   inputBox: {
//     width: '100%',
//     backgroundColor: 'rgba(255,255,255,0.15)',
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//     borderRadius: 10,
//     marginBottom: 10,
//     color: '#fff',
//     borderWidth: 1,
//     borderColor: '#999',
//   },
//   forgot: {
//     color: 'yellow',
//     fontSize: 14,
//     textAlign: 'right',
//     marginBottom: 20,
//   },
//   button: {
//     backgroundColor: 'rgba(224, 208, 208, 0.75)',
//     paddingVertical: 14,
//     borderRadius: 10,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: 'black',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });





// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Stack, router } from 'expo-router';
// import React, { useEffect, useState } from 'react';
// import {
//   Alert,
//   Image,
//   ImageBackground, Linking, Platform,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View
// } from 'react-native';

// const images = [
//   require('../assets/images/bg1.png'),
//   require('../assets/images/bg2.png'),
//   require('../assets/images/bg3.png'),
// ];

// const logo = require('../assets/images/indxo_logo.png');

// const BASE_URL = 'https://indxoapp.onrender.com';

// export default function SignInScreen() {
//   const [imageIndex, setImageIndex] = useState(0);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
//     }, 3000);
//     return () => clearInterval(interval);
//   }, []);

//   const handleSignIn = async () => {
//     if (email.trim() === '' || password.trim() === '') {
//       Alert.alert('Missing Fields', 'Please enter both email and password.');
//       return;
//     }

//     try {
//       const response = await fetch(`${BASE_URL}/login`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await response.json();

//       if (response.ok && data.success) {
//         await AsyncStorage.setItem('user_email', email);
//         await AsyncStorage.setItem('user_password', password);
//         router.replace('../screens/dashboard');
//       } else {
//         Alert.alert('Login Failed', data.message || 'Invalid credentials');
//       }
//     } catch (error) {
//       console.error('Login error:', error);
//       Alert.alert('Error', 'Unable to connect to the server.');
//     }
//   };

//   return (
//     <>
//       <Stack.Screen options={{ headerShown: false }} />
//       <ImageBackground
//         source={images[imageIndex]}
//         style={styles.background}
//         resizeMode="cover"
//       >
//         <Image source={logo} style={styles.logo} resizeMode="contain" />

//         <View style={styles.overlay}>
//           <View style={styles.container}>
//             <Text style={styles.title}>Sign In</Text>

//             <Text style={styles.label}>Email</Text>
//             <TextInput
//               placeholder="example@gmail.com"
//               placeholderTextColor="#aaa"
//               style={styles.inputBox}
//               keyboardType="email-address"
//               autoCapitalize="none"
//               value={email}
//               onChangeText={setEmail}
//             />

//             <Text style={styles.label}>Password</Text>
//             <TextInput
//               placeholder="password"
//               placeholderTextColor="#aaa"
//               secureTextEntry
//               style={styles.inputBox}
//               value={password}
//               onChangeText={setPassword}
//             />

//             <TouchableOpacity>
//               <Text style={styles.forgot}>Forgot Password?</Text>
//             </TouchableOpacity>

//             <TouchableOpacity style={styles.button} onPress={handleSignIn}>
//               <Text style={styles.buttonText}>Sign In</Text>
//             </TouchableOpacity>
//           </View>
//         </View>

//         <View style={styles.footerContainer}>
//           <Text style={styles.footerText}>© 2023 All Rights Reserved by indxo</Text>
//           <TouchableOpacity onPress={() => Linking.openURL('https://indxo.ai/')}>
//           <Text style={styles.websiteText}>
//             <Text style={{ color: '#fff' }}>Official Website: </Text>
//             <Text style={{ color: '#00B0FF', textDecorationLine: 'underline' }}>https://indxo.ai/</Text>
//           </Text>
//         </TouchableOpacity>
//           {/* <Text
//             style={styles.footerLink}
//             onPress={() => Linking.openURL('https://indxo.ai/')}
//           >
//             https://indxo.ai/
//           </Text> */}
//         </View>
//       </ImageBackground>
//     </>
//   );
// }

// const styles = StyleSheet.create({
//   background: {
//     flex: 1,
//     width: '100%',
//     height: '100%',
//   },
//   logo: {
//     position: 'absolute',
//     top: Platform.OS === 'web' ? 20 : 50,
//     left: 20,
//     width: 140,
//     height: 90,
//     zIndex: 20,
//   },
//   overlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0, 0, 0, 0.4)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   container: {
//     backgroundColor: 'rgba(255, 255, 255, 0.12)',
//     padding: 24,
//     borderRadius: 16,
//     width: '85%',
//     maxWidth: 450,
//   },
//   title: {
//     color: '#fff',
//     fontSize: 28,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 20,
//   },
//   label: {
//     color: '#ddd',
//     fontSize: 14,
//     marginBottom: 6,
//     marginTop: 10,
//   },
//   inputBox: {
//     width: '100%',
//     backgroundColor: 'rgba(255,255,255,0.15)',
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//     borderRadius: 10,
//     marginBottom: 10,
//     color: '#fff',
//     borderWidth: 1,
//     borderColor: '#999',
//   },
//   forgot: {
//     color: 'yellow',
//     fontSize: 14,
//     textAlign: 'right',
//     marginBottom: 20,
//   },
//   button: {
//     backgroundColor: 'rgba(224, 208, 208, 0.75)',
//     paddingVertical: 14,
//     borderRadius: 10,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: 'black',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   footerContainer: {
//     position: 'absolute',
//     bottom: Platform.OS === 'ios' ? 20 : 10,
//     alignSelf: 'center',
//     alignItems: 'center',
//   },
//   footerText: {
//     color: '#fff',
//     fontSize: 12,
//   },
//   footerLink: {
//     color: '#10B9F1',
//     fontSize: 12,
//     textDecorationLine: 'underline',
//     marginTop: 10,
//     marginBottom:50,
//   },
//    websiteText: {
//     color: '#10B981',
//     fontSize: 13,
//     marginTop: 2,
//     textDecorationLine: 'underline',
//     marginBottom:50,
//   },
// });







import AsyncStorage from '@react-native-async-storage/async-storage';
import { Stack, router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  ImageBackground,
  Linking,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

const images = [
  require('../assets/images/bg1.png'),
  require('../assets/images/bg2.png'),
  require('../assets/images/bg3.png'),
];

const logo = require('../assets/images/Logo.png');

const BASE_URL = 'https://indxoapp.onrender.com';

export default function SignInScreen() {
  const [imageIndex, setImageIndex] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSignIn = async () => {
    if (email.trim() === '' || password.trim() === '') {
      Alert.alert('Missing Fields', 'Please enter both email and password.');
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        await AsyncStorage.setItem('user_email', email);
        await AsyncStorage.setItem('user_password', password);
        router.replace('../screens/dashboard');
      } else {
        Alert.alert('Login Failed', data.message || 'Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', 'Unable to connect to the server.');
    }
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ImageBackground
        source={images[imageIndex]}
        style={styles.background}
        resizeMode="cover"
      >
        <Image source={logo} style={styles.logo} resizeMode="contain" />

        <View style={styles.overlay}>
          <View style={styles.container}>
            <Text style={styles.title}>Sign In</Text>

            <Text style={styles.label}>Email</Text>
            <TextInput
              placeholder="example@gmail.com"
              placeholderTextColor="#aaa"
              style={styles.inputBox}
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />

            <Text style={styles.label}>Password</Text>
            <TextInput
              placeholder="password"
              placeholderTextColor="#aaa"
              secureTextEntry
              style={styles.inputBox}
              value={password}
              onChangeText={setPassword}
            />

            <TouchableOpacity>
              <Text style={styles.forgot}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleSignIn}>
              <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>© 2023 All Rights Reserved by indxo</Text>
          <TouchableOpacity onPress={() => Linking.openURL('https://indxo.ai/')}>
            <Text style={[styles.websiteText, { color: '#fff' }]}>
              Official Website:{' '}
              <Text style={{ color: '#00B0FF', textDecorationLine: 'underline' }}>
                https://indxo.ai/
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  logo: {
    position: 'absolute',
    top: Platform.OS === 'web' ? 20 : 50,
    left: 20,
    width: 140,
    height: 90,
    zIndex: 20,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    padding: 24,
    borderRadius: 16,
    width: '85%',
    maxWidth: 450,
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    color: '#ddd',
    fontSize: 14,
    marginBottom: 6,
    marginTop: 10,
  },
  inputBox: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginBottom: 10,
    color: '#fff',
    borderWidth: 1,
    borderColor: '#999',
  },
  forgot: {
    color: 'yellow',
    fontSize: 14,
    textAlign: 'right',
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'rgba(224, 208, 208, 0.75)',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerContainer: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 20 : 10,
    alignSelf: 'center',
    alignItems: 'center',
  },
  footerText: {
    color: '#fff',
    fontSize: 12,
  },
  websiteText: {
    fontSize: 13,
    marginTop: 2,
    marginBottom: 50,
  },
});
