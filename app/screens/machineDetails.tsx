// import DateTimePicker from '@react-native-community/datetimepicker';
// import React, { useEffect, useState } from 'react';
// import {
//     Alert,
//     PermissionsAndroid,
//     Platform,
//     ScrollView,
//     StyleSheet,
//     Text,
//     TouchableOpacity,
//     View,
// } from 'react-native';
// import RNHTMLtoPDF from 'react-native-html-to-pdf';
// import CustomDrawer from '../../components/CustomDrawer';
// import { useTheme } from '../../context/ThemeContext';

// const API_URL = 'http://192.168.1.197:3000/machines';

// export default function MachineDetails() {
//   const { theme } = useTheme();
//   const [machine, setMachine] = useState('Machine 01');
//   const [fromDate, setFromDate] = useState(new Date());
//   const [toDate, setToDate] = useState(new Date());
//   const [showFromPicker, setShowFromPicker] = useState(false);
//   const [showToPicker, setShowToPicker] = useState(false);
//   const [data, setData] = useState<any[]>([]);
//   const [drawerOpen, setDrawerOpen] = useState(false);

//   const toggleDrawer = () => setDrawerOpen(!drawerOpen);
//   const closeDrawer = () => setDrawerOpen(false);

//   const fetchData = async () => {
//     const from = fromDate.toISOString().split('T')[0];
//     const to = toDate.toISOString().split('T')[0];
//     try {
//       const res = await fetch(`${API_URL}/range?name=${machine}&from=${from}&to=${to}`);
//       const json = await res.json();
//       setData(json || []);
//     } catch (err) {
//       console.error(err);
//       Alert.alert('Error', 'Failed to fetch data');
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [machine, fromDate, toDate]);

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

//     if (data.length === 0) {
//       Alert.alert('No Data', 'There is no data to generate PDF');
//       return;
//     }

//     const rows = data.map(
//       (d) =>
//         `<tr>
//           <td>${d.name}</td>
//           <td>${new Date(d.date).toLocaleDateString()}</td>
//           <td>${d.spindle_speed}</td>
//           <td>${d.power_consumption}</td>
//           <td>${d.rest_time}</td>
//           <td>${d.status}</td>
//         </tr>`
//     ).join('');

//     const html = `
//       <h1>Machine Report - ${machine}</h1>
//       <table border="1" style="width: 100%; border-collapse: collapse;">
//         <tr>
//           <th>Name</th>
//           <th>Date</th>
//           <th>Spindle Speed</th>
//           <th>Power</th>
//           <th>Rest Time</th>
//           <th>Status</th>
//         </tr>
//         ${rows}
//       </table>
//     `;

//     try {
//       const pdf = await RNHTMLtoPDF.convert({
//         html,
//         fileName: `${machine}_report_${Date.now()}`,
//         base64: false,
//       });
//       Alert.alert('Success', `PDF saved to:\n${pdf.filePath}`);
//     } catch (err) {
//       Alert.alert('Error', 'Failed to generate PDF');
//     }
//   };

//   return (
//     <View style={[styles.container, { backgroundColor: '#0D0D0D' }]}>
//       <View style={styles.header}>
//         <TouchableOpacity onPress={toggleDrawer} style={styles.menuButton}>
//           <Text style={styles.menuIcon}>☰</Text>
//         </TouchableOpacity>
//         <Text style={styles.headerText}>Machine Details</Text>
//       </View>

//       <View style={styles.dropdownRow}>
//         {['Machine 01', 'Machine 02', 'Machine 03'].map((m) => (
//           <TouchableOpacity
//             key={m}
//             style={[styles.dropdownItem, machine === m && styles.selectedDropdownItem]}
//             onPress={() => setMachine(m)}
//           >
//             <Text style={styles.dropdownText}>{m}</Text>
//           </TouchableOpacity>
//         ))}
//       </View>

//       <View style={styles.dateRow}>
//         <TouchableOpacity onPress={() => setShowFromPicker(true)} style={styles.dateBtn}>
//           <Text style={styles.dateText}>From: {fromDate.toDateString()}</Text>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => setShowToPicker(true)} style={styles.dateBtn}>
//           <Text style={styles.dateText}>To: {toDate.toDateString()}</Text>
//         </TouchableOpacity>
//       </View>

//       {showFromPicker && (
//         <DateTimePicker
//           value={fromDate}
//           mode="date"
//           display={Platform.OS === 'ios' ? 'spinner' : 'default'}
//           onChange={(_, selectedDate) => {
//             setShowFromPicker(false);
//             if (selectedDate) setFromDate(selectedDate);
//           }}
//         />
//       )}

//       {showToPicker && (
//         <DateTimePicker
//           value={toDate}
//           mode="date"
//           display={Platform.OS === 'ios' ? 'spinner' : 'default'}
//           onChange={(_, selectedDate) => {
//             setShowToPicker(false);
//             if (selectedDate) setToDate(selectedDate);
//           }}
//         />
//       )}

//       <ScrollView style={styles.tableScroll}>
//         <View style={styles.tableHeader}>
//           {['Name', 'Date', 'Spindle', 'Power', 'Rest', 'Status'].map((h, i) => (
//             <Text key={i} style={styles.tableHeaderText}>{h}</Text>
//           ))}
//         </View>
//         {data.map((item, i) => (
//           <View key={i} style={styles.tableRow}>
//             <Text style={styles.tableCell}>{item.name}</Text>
//             <Text style={styles.tableCell}>{new Date(item.date).toLocaleDateString()}</Text>
//             <Text style={styles.tableCell}>{item.spindle_speed}</Text>
//             <Text style={styles.tableCell}>{item.power_consumption}</Text>
//             <Text style={styles.tableCell}>{item.rest_time}</Text>
//             <Text style={styles.tableCell}>{item.status}</Text>
//           </View>
//         ))}
//       </ScrollView>

//       <View style={styles.footerSpace} />
//       <TouchableOpacity onPress={generatePDF} style={styles.downloadBtn}>
//         <Text style={styles.downloadText}>⬇ Download PDF</Text>
//       </TouchableOpacity>

//       {drawerOpen && (
//         <TouchableOpacity style={styles.drawerOverlay} onPress={closeDrawer}>
//           <CustomDrawer onClose={closeDrawer} />
//         </TouchableOpacity>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1 },
//   header: {
//     flexDirection: 'row',
//     paddingTop: 50,
//     paddingHorizontal: 16,
//     alignItems: 'center',
//     backgroundColor: '#0D0D0D',
//   },
//   menuButton: { marginRight: 15 },
//   menuIcon: { color: '#fff', fontSize: 24 },
//   headerText: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
//   dropdownRow: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginVertical: 10,
//     flexWrap: 'wrap',
//   },
//   dropdownItem: {
//     padding: 10,
//     margin: 6,
//     backgroundColor: '#333',
//     borderRadius: 8,
//   },
//   selectedDropdownItem: {
//     backgroundColor: '#555',
//   },
//   dropdownText: {
//     color: '#fff',
//   },
//   dateRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     marginBottom: 10,
//   },
//   dateBtn: {
//     padding: 10,
//     backgroundColor: '#444',
//     borderRadius: 8,
//   },
//   dateText: {
//     color: '#fff',
//   },
//   tableScroll: {
//     flex: 1,
//     paddingHorizontal: 10,
//   },
//   tableHeader: {
//     flexDirection: 'row',
//     backgroundColor: '#222',
//     padding: 8,
//     borderBottomWidth: 1,
//     borderColor: '#444',
//   },
//   tableHeaderText: {
//     flex: 1,
//     color: '#00e0ff',
//     fontWeight: 'bold',
//     fontSize: 12,
//   },
//   tableRow: {
//     flexDirection: 'row',
//     padding: 8,
//     borderBottomWidth: 1,
//     borderColor: '#333',
//   },
//   tableCell: {
//     flex: 1,
//     color: '#fff',
//     fontSize: 12,
//   },
//   downloadBtn: {
//     backgroundColor: '#2563eb',
//     padding: 14,
//     alignItems: 'center',
//     margin: 10,
//     marginBottom: 50,
//     borderRadius: 8,
//   },
//   downloadText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
//   footerSpace: {
//     height: 20,
//   },
//   drawerOverlay: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     width: '100%',
//     height: '100%',
//     zIndex: 999,
//   },
// });




import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  PermissionsAndroid,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import CustomDrawer from '../../components/CustomDrawer';
import { useTheme } from '../../context/ThemeContext';

const API_URL = 'https://aphid-full-frankly.ngrok-free.app/machines';

export default function MachineDetails() {
  const { theme } = useTheme();
  const [machine, setMachine] = useState('Machine 01');
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);
  const closeDrawer = () => setDrawerOpen(false);

  const fetchData = async () => {
    const from = fromDate.toISOString().split('T')[0];
    const to = toDate.toISOString().split('T')[0];
    try {
      const res = await fetch(`${API_URL}/range?name=${machine}&from=${from}&to=${to}`);
      const json = await res.json();
      setData(json || []);
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Failed to fetch data');
    }
  };

  useEffect(() => {
    fetchData();
  }, [machine, fromDate, toDate]);

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

    if (data.length === 0) {
      Alert.alert('No Data', 'There is no data to generate PDF');
      return;
    }

    const rows = data.map(
      (d) =>
        `<tr>
          <td>${d.name}</td>
          <td>${new Date(d.date).toLocaleDateString()}</td>
          <td>${d.spindle_speed}</td>
          <td>${d.power_consumption}</td>
          <td>${d.rest_time}</td>
          <td>${d.status}</td>
        </tr>`
    ).join('');

    const html = `
      <h1>Machine Report - ${machine}</h1>
      <table border="1" style="width: 100%; border-collapse: collapse;">
        <tr>
          <th>Name</th>
          <th>Date</th>
          <th>Spindle Speed</th>
          <th>Power</th>
          <th>Rest Time</th>
          <th>Status</th>
        </tr>
        ${rows}
      </table>
    `;

    try {
      const pdf = await RNHTMLtoPDF.convert({
        html,
        fileName: `${machine}_report_${Date.now()}`,
        base64: false,
      });
      Alert.alert('Success', `PDF saved to:\n${pdf.filePath}`);
    } catch (err) {
      Alert.alert('Error', 'Failed to generate PDF');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: '#0D0D0D' }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleDrawer} style={styles.menuButton}>
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>Machine Details</Text>
      </View>

      <View style={styles.dropdownRow}>
        {['Machine 01', 'Machine 02', 'Machine 03'].map((m) => (
          <TouchableOpacity
            key={m}
            style={[styles.dropdownItem, machine === m && styles.selectedDropdownItem]}
            onPress={() => setMachine(m)}
          >
            <Text style={styles.dropdownText}>{m}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.dateRow}>
        <TouchableOpacity onPress={() => setShowFromPicker(true)} style={styles.dateBtn}>
          <Text style={styles.dateText}>From: {fromDate.toDateString()}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setShowToPicker(true)} style={styles.dateBtn}>
          <Text style={styles.dateText}>To: {toDate.toDateString()}</Text>
        </TouchableOpacity>
      </View>

      {showFromPicker && (
        <DateTimePicker
          value={fromDate}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(_, selectedDate) => {
            setShowFromPicker(false);
            if (selectedDate) setFromDate(selectedDate);
          }}
        />
      )}

      {showToPicker && (
        <DateTimePicker
          value={toDate}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(_, selectedDate) => {
            setShowToPicker(false);
            if (selectedDate) setToDate(selectedDate);
          }}
        />
      )}

      <ScrollView style={styles.tableScroll}>
        <View style={styles.tableHeader}>
          {['Name', 'Date', 'Spindle', 'Power', 'Rest', 'Status'].map((h, i) => (
            <Text key={i} style={styles.tableHeaderText}>{h}</Text>
          ))}
        </View>
        {data.map((item, i) => (
          <View key={i} style={styles.tableRow}>
            <Text style={styles.tableCell}>{item.name}</Text>
            <Text style={styles.tableCell}>{new Date(item.date).toLocaleDateString()}</Text>
            <Text style={styles.tableCell}>{item.spindle_speed}</Text>
            <Text style={styles.tableCell}>{item.power_consumption}</Text>
            <Text style={styles.tableCell}>{item.rest_time}</Text>
            <Text style={styles.tableCell}>{item.status}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.footerSpace} />
      <TouchableOpacity onPress={generatePDF} style={styles.downloadBtn}>
        <Text style={styles.downloadText}>⬇ Download PDF</Text>
      </TouchableOpacity>

      {drawerOpen && (
        <TouchableOpacity style={styles.drawerOverlay} onPress={closeDrawer}>
          <CustomDrawer onClose={closeDrawer} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    paddingTop: 50,
    paddingHorizontal: 16,
    alignItems: 'center',
    backgroundColor: '#0D0D0D',
  },
  menuButton: { marginRight: 15 },
  menuIcon: { color: '#fff', fontSize: 24 },
  headerText: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  dropdownRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
    flexWrap: 'wrap',
  },
  dropdownItem: {
    padding: 10,
    margin: 6,
    backgroundColor: '#333',
    borderRadius: 8,
  },
  selectedDropdownItem: {
    backgroundColor: '#555',
  },
  dropdownText: {
    color: '#fff',
  },
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  dateBtn: {
    padding: 10,
    backgroundColor: '#444',
    borderRadius: 8,
  },
  dateText: {
    color: '#fff',
  },
  tableScroll: {
    flex: 1,
    paddingHorizontal: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#222',
    padding: 8,
    borderBottomWidth: 1,
    borderColor: '#444',
  },
  tableHeaderText: {
    flex: 1,
    color: '#00e0ff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  tableRow: {
    flexDirection: 'row',
    padding: 8,
    borderBottomWidth: 1,
    borderColor: '#333',
  },
  tableCell: {
    flex: 1,
    color: '#fff',
    fontSize: 12,
  },
  downloadBtn: {
    backgroundColor: '#2563eb',
    padding: 14,
    alignItems: 'center',
    margin: 10,
    marginBottom: 50,
    borderRadius: 8,
  },
  downloadText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  footerSpace: {
    height: 20,
  },
  drawerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 999,
  },
});
