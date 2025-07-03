

// import { Ionicons } from '@expo/vector-icons';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import React, { useEffect, useState } from 'react';
// import {
//   Alert,
//   Dimensions,
//   PermissionsAndroid,
//   Platform,
//   Pressable,
//   SafeAreaView,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import { LineChart } from 'react-native-chart-kit';
// import { AnimatedCircularProgress } from 'react-native-circular-progress';
// import RNHTMLtoPDF from 'react-native-html-to-pdf';
// import CustomDrawer from '../../components/CustomDrawer';

// const screenWidth = Dimensions.get('window').width;
// const API_URL = 'https://aphid-full-frankly.ngrok-free.app/power-data';

// export default function PowerChart() {
//   const [selectedMachine, setSelectedMachine] = useState('Machine 01');
//   const [date, setDate] = useState(new Date());
//   const [showPicker, setShowPicker] = useState(false);
//   const [powerData, setPowerData] = useState<any[]>([]);
//   const [drawerOpen, setDrawerOpen] = useState(false);

//   const toggleDrawer = () => setDrawerOpen(!drawerOpen);
//   const closeDrawer = () => setDrawerOpen(false);

//   const fetchPowerData = async () => {
//     try {
//       const formattedDate = date.toISOString().split('T')[0];
//       const res = await fetch(`${API_URL}?machine=${selectedMachine}&date=${formattedDate}`);
//       const data = await res.json();
//       setPowerData(data);
//     } catch (error) {
//       console.error('Error fetching power data:', error);
//     }
//   };

//   useEffect(() => {
//     fetchPowerData();
//   }, [selectedMachine, date]);

//   const averagePower = () => {
//     if (powerData.length === 0) return 0;
//     const sum = powerData.reduce((acc, item) => acc + item.power_value, 0);
//     return +(sum / powerData.length).toFixed(2);
//   };

//   const timeLabels = powerData.map((item) => {
//     const date = new Date(item.timestamp);
//     return `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
//   });

//   const powerValues = powerData.map((item) => item.power_value);

//   const requestStoragePermission = async () => {
//     if (Platform.OS === 'android') {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
//         {
//           title: 'Storage Permission',
//           message: 'App needs access to storage to save PDF',
//           buttonNeutral: 'Ask Me Later',
//           buttonNegative: 'Cancel',
//           buttonPositive: 'OK',
//         }
//       );
//       return granted === PermissionsAndroid.RESULTS.GRANTED;
//     }
//     return true;
//   };

//   const generatePDF = async () => {
//     if (!(await requestStoragePermission())) {
//       Alert.alert('Permission Denied', 'Cannot save PDF without storage permission');
//       return;
//     }

//     if (powerData.length === 0) {
//       Alert.alert('No Data', 'There is no data to generate PDF');
//       return;
//     }

//     const rows = powerData.map(
//       (d) =>
//         `<tr>
//           <td>${selectedMachine}</td>
//           <td>${new Date(d.timestamp).toLocaleString()}</td>
//           <td>${d.power_value}</td>
//         </tr>`
//     ).join('');

//     const html = `
//       <h1>Power Report - ${selectedMachine}</h1>
//       <table border="1" style="width: 100%; border-collapse: collapse;">
//         <tr>
//           <th>Machine</th>
//           <th>Timestamp</th>
//           <th>Power (kW)</th>
//         </tr>
//         ${rows}
//       </table>
//     `;

//     try {
//       const pdf = await RNHTMLtoPDF.convert({
//         html,
//         fileName: `${selectedMachine}_power_report_${Date.now()}`,
//         base64: false,
//       });
//       Alert.alert('Success', `PDF saved to:\n${pdf.filePath}`);
//     } catch (err) {
//       Alert.alert('Error', 'Failed to generate PDF');
//     }
//   };

//   return (
//     <SafeAreaView style={[styles.container, { backgroundColor: '#0D0D0D' }]}>
//       <View style={styles.headerWithMenu}>
//         <TouchableOpacity onPress={toggleDrawer} style={styles.menuButton}>
//           <Ionicons name="menu" size={28} color="#fff" />
//         </TouchableOpacity>
//         <Text style={styles.title}>🔌 Power Chart</Text>
//       </View>

//       <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
//         <View style={styles.machineRow}>
//           {['Machine 01', 'Machine 02', 'Machine 03'].map((machine) => (
//             <TouchableOpacity
//               key={machine}
//               style={[styles.machineButton, selectedMachine === machine && styles.machineSelected]}
//               onPress={() => setSelectedMachine(machine)}
//             >
//               <Text style={styles.machineText}>{machine}</Text>
//             </TouchableOpacity>
//           ))}
//         </View>

//         <TouchableOpacity onPress={() => setShowPicker(true)} style={styles.dateButton}>
//           <Text style={styles.dateText}>{date.toDateString()}</Text>
//         </TouchableOpacity>

//         {showPicker && (
//           <DateTimePicker
//             value={date}
//             mode="date"
//             display={Platform.OS === 'ios' ? 'spinner' : 'default'}
//             onChange={(_, selectedDate) => {
//               setShowPicker(false);
//               if (selectedDate) setDate(selectedDate);
//             }}
//           />
//         )}

//         <View style={styles.utilizationContainer}>
//           <AnimatedCircularProgress
//             size={120}
//             width={12}
//             fill={Math.min((averagePower() / 5) * 100, 100)}
//             tintColor="#00e0ff"
//             backgroundColor="#3d5875"
//           >
//             {(fill: number) => (
//               <Text style={styles.circularText}>{averagePower()} kW</Text>
//             )}
//           </AnimatedCircularProgress>
//           <Text style={styles.utilizationLabel}>Avg Power Usage</Text>
//         </View>

//         <Text style={styles.chartTitle}>Power Consumption Over Time</Text>
//         {powerData.length > 0 ? (
//           <LineChart
//             data={{
//               labels: timeLabels,
//               datasets: [{ data: powerValues, color: () => '#10B981', strokeWidth: 2 }],
//             }}
//             width={screenWidth - 40}
//             height={220}
//             chartConfig={{
//               backgroundColor: '#1F2937',
//               backgroundGradientFrom: '#1F2937',
//               backgroundGradientTo: '#111827',
//               color: () => '#fff',
//               labelColor: () => '#9CA3AF',
//               decimalPlaces: 2,
//             }}
//             bezier
//             style={{ borderRadius: 16, marginHorizontal: 20 }}
//           />
//         ) : (
//           <Text style={{ color: '#aaa', textAlign: 'center', marginTop: 20 }}>No data available</Text>
//         )}

//         <TouchableOpacity onPress={generatePDF} style={styles.downloadBtn}>
//           <Text style={styles.downloadText}>⬇ Download PDF</Text>
//         </TouchableOpacity>
//       </ScrollView>

//       {drawerOpen && (
//         <Pressable style={styles.drawerOverlay} onPress={closeDrawer}>
//           <CustomDrawer onClose={closeDrawer} />
//         </Pressable>
//       )}
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1 },
//   headerWithMenu: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingTop: 50,
//     paddingBottom: 20,
//     paddingHorizontal: 15,
//   },
//   menuButton: { marginRight: 15 },
//   title: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
//   machineRow: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginBottom: 16,
//     flexWrap: 'wrap',
//   },
//   machineButton: {
//     padding: 10,
//     backgroundColor: '#333',
//     margin: 6,
//     borderRadius: 10,
//   },
//   machineSelected: { backgroundColor: '#555' },
//   machineText: { color: '#fff' },
//   dateButton: {
//     alignSelf: 'center',
//     backgroundColor: '#444',
//     padding: 10,
//     borderRadius: 10,
//     marginBottom: 20,
//   },
//   dateText: { color: '#fff' },
//   utilizationContainer: {
//     alignItems: 'center',
//     marginBottom: 30,
//   },
//   circularText: {
//     color: '#fff',
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   utilizationLabel: {
//     color: '#9CA3AF',
//     fontSize: 14,
//     marginTop: 8,
//   },
//   chartTitle: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     marginLeft: 20,
//   },
//   downloadBtn: {
//     backgroundColor: '#2563eb',
//     padding: 14,
//     alignItems: 'center',
//     margin: 10,
//     borderRadius: 8,
//   },
//   downloadText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
//   drawerOverlay: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     width: '100%',
//     height: '100%',
//     backgroundColor: 'rgba(0,0,0,0.3)',
//     zIndex: 999,
//   },
// });



import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Dimensions,
  PermissionsAndroid,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import CustomDrawer from '../../components/CustomDrawer';

const screenWidth = Dimensions.get('window').width;
const API_URL = 'https://indxoapp.onrender.com/power-data';

export default function PowerChart() {
  const [selectedMachine, setSelectedMachine] = useState('Machine 01');
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [powerData, setPowerData] = useState<any[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);
  const closeDrawer = () => setDrawerOpen(false);

  const fetchPowerData = async () => {
    try {
      const formattedDate = date.toISOString().split('T')[0];
      const res = await fetch(`${API_URL}?machine=${selectedMachine}&date=${formattedDate}`);
      const data = await res.json();
      setPowerData(data);
    } catch (error) {
      console.error('Error fetching power data:', error);
    }
  };

  useEffect(() => {
    fetchPowerData();
  }, [selectedMachine, date]);

  const averagePower = () => {
    if (powerData.length === 0) return 0;
    const sum = powerData.reduce((acc, item) => acc + item.power_value, 0);
    return +(sum / powerData.length).toFixed(2);
  };

  const timeLabels = powerData.map((item) => {
    const date = new Date(item.timestamp);
    return `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
  });

  const powerValues = powerData.map((item) => item.power_value);

  const requestStoragePermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission',
          message: 'App needs access to storage to save PDF',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  const generatePDF = async () => {
    if (!(await requestStoragePermission())) {
      Alert.alert('Permission Denied', 'Cannot save PDF without storage permission');
      return;
    }

    if (powerData.length === 0) {
      Alert.alert('No Data', 'There is no data to generate PDF');
      return;
    }

    const rows = powerData.map(
      (d) =>
        `<tr>
          <td>${selectedMachine}</td>
          <td>${new Date(d.timestamp).toLocaleString()}</td>
          <td>${d.power_value}</td>
        </tr>`
    ).join('');

    const html = `
      <h1>Power Report - ${selectedMachine}</h1>
      <table border="1" style="width: 100%; border-collapse: collapse;">
        <tr>
          <th>Machine</th>
          <th>Timestamp</th>
          <th>Power (kW)</th>
        </tr>
        ${rows}
      </table>
    `;

    try {
      const pdf = await RNHTMLtoPDF.convert({
        html,
        fileName: `${selectedMachine}_power_report_${Date.now()}`,
        base64: false,
      });
      Alert.alert('Success', `PDF saved to:\n${pdf.filePath}`);
    } catch (err) {
      Alert.alert('Error', 'Failed to generate PDF');
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: '#0D0D0D' }]}>
      <View style={styles.headerWithMenu}>
        <TouchableOpacity onPress={toggleDrawer} style={styles.menuButton}>
          <Ionicons name="menu" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>🔌 Power Chart</Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <View style={styles.machineRow}>
          {['Machine 01', 'Machine 02', 'Machine 03'].map((machine) => (
            <TouchableOpacity
              key={machine}
              style={[styles.machineButton, selectedMachine === machine && styles.machineSelected]}
              onPress={() => setSelectedMachine(machine)}
            >
              <Text style={styles.machineText}>{machine}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity onPress={() => setShowPicker(true)} style={styles.dateButton}>
          <Text style={styles.dateText}>{date.toDateString()}</Text>
        </TouchableOpacity>

        {showPicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={(_, selectedDate) => {
              setShowPicker(false);
              if (selectedDate) setDate(selectedDate);
            }}
          />
        )}

        <View style={styles.utilizationContainer}>
          <AnimatedCircularProgress
            size={120}
            width={12}
            fill={Math.min((averagePower() / 5) * 100, 100)}
            tintColor="#00e0ff"
            backgroundColor="#3d5875"
          >
            {(fill: number) => (
              <Text style={styles.circularText}>{averagePower()} kW</Text>
            )}
          </AnimatedCircularProgress>
          <Text style={styles.utilizationLabel}>Avg Power Usage</Text>
        </View>

        <Text style={styles.chartTitle}>Power Consumption Over Time</Text>
        {powerData.length > 0 ? (
          <LineChart
            data={{
              labels: timeLabels,
              datasets: [{ data: powerValues, color: () => '#10B981', strokeWidth: 2 }],
            }}
            width={screenWidth - 40}
            height={250}
            chartConfig={{
              backgroundColor: '#1F2937',
              backgroundGradientFrom: '#1F2937',
              backgroundGradientTo: '#111827',
              color: () => '#fff',
              labelColor: () => '#9CA3AF',
              decimalPlaces: 2,
              propsForLabels: {
                fontSize: 10,
                rotation: 45,
              },
              propsForDots: {
                r: '3',
                strokeWidth: '1',
                stroke: '#10B981',
              },
            }}
            withInnerLines={true}
            withOuterLines={true}
            verticalLabelRotation={60}
            bezier
            style={{
              borderRadius: 16,
              marginHorizontal: 20,
              paddingBottom: 20,
              paddingTop: 10,
            }}
          />
        ) : (
          <Text style={{ color: '#aaa', textAlign: 'center', marginTop: 20 }}>
            No data available
          </Text>
        )}

        <TouchableOpacity onPress={generatePDF} style={styles.downloadBtn}>
          <Text style={styles.downloadText}>⬇ Download PDF</Text>
        </TouchableOpacity>
      </ScrollView>

      {drawerOpen && (
        <Pressable style={styles.drawerOverlay} onPress={closeDrawer}>
          <CustomDrawer onClose={closeDrawer} />
        </Pressable>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerWithMenu: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 15,
  },
  menuButton: { marginRight: 15 },
  title: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
  machineRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
    flexWrap: 'wrap',
  },
  machineButton: {
    padding: 10,
    backgroundColor: '#333',
    margin: 6,
    borderRadius: 10,
  },
  machineSelected: { backgroundColor: '#555' },
  machineText: { color: '#fff' },
  dateButton: {
    alignSelf: 'center',
    backgroundColor: '#444',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  dateText: { color: '#fff' },
  utilizationContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  circularText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  utilizationLabel: {
    color: '#9CA3AF',
    fontSize: 14,
    marginTop: 8,
  },
  chartTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 20,
  },
  downloadBtn: {
    backgroundColor: '#2563eb',
    padding: 14,
    alignItems: 'center',
    margin: 10,
    borderRadius: 8,
  },
  downloadText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  drawerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.3)',
    zIndex: 999,
  },
});
