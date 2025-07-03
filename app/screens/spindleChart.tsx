
// import { Ionicons } from '@expo/vector-icons';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import React, { useEffect, useState } from 'react';
// import {
//     Dimensions,
//     Platform,
//     Pressable,
//     SafeAreaView,
//     ScrollView,
//     StyleSheet,
//     Text,
//     TouchableOpacity,
//     View
// } from 'react-native';
// import { LineChart } from 'react-native-chart-kit';
// import CustomDrawer from '../../components/CustomDrawer';
// import { useTheme } from '../../context/ThemeContext';

// const screenWidth = Dimensions.get('window').width;
// const machineOptions = ['Machine 01', 'Machine 02', 'Machine 03'];

// export default function SpindleChartScreen() {
//   const { theme } = useTheme();
//   const [selectedMachine, setSelectedMachine] = useState(machineOptions[0]);
//   const [date, setDate] = useState(new Date());
//   const [showPicker, setShowPicker] = useState(false);
//   const [drawerVisible, setDrawerVisible] = useState(false);
//   const [isLandscape, setIsLandscape] = useState(false);
//   const [chartData, setChartData] = useState({
//     labels: ['0'],
//     datasets: [{ data: [0] }],
//   });

//   useEffect(() => {
//     fetchSpindleData();
//   }, [selectedMachine, date]);

//   const fetchSpindleData = async () => {
//     const formattedDate = date.toISOString().split('T')[0];
//     const url = `http://192.168.1.197:3000/spindle-data?name=${encodeURIComponent(
//       selectedMachine
//     )}&date=${formattedDate}`;

//     try {
//       const res = await fetch(url);
//       const data = await res.json();

//       const validData = data.filter(
//         (item: any) =>
//           typeof item.speed === 'number' &&
//           isFinite(item.speed) &&
//           !isNaN(item.speed)
//       );

//       const labels = validData.map((entry: any) =>
//         new Date(entry.timestamp).toLocaleTimeString([], {
//           hour: '2-digit',
//           minute: '2-digit',
//         })
//       );

//       const speeds = validData.map((entry: any) => entry.speed);

//       if (speeds.length === 0) {
//         setChartData({ labels: ['0'], datasets: [{ data: [0] }] });
//       } else {
//         setChartData({ labels, datasets: [{ data: speeds }] });
//       }
//     } catch (err) {
//       console.error('❌ Error fetching spindle data:', err);
//     }
//   };

//   return (
//     <SafeAreaView style={[styles.container, { backgroundColor: '#0D0D0D' }]}>
//       {/* ✅ Drawer Overlay */}
//       {drawerVisible && (
//         <Pressable style={styles.drawerOverlay} onPress={() => setDrawerVisible(false)}>
//           <CustomDrawer onClose={() => setDrawerVisible(false)} />
//         </Pressable>
//       )}

//       {/* ✅ Header with menu */}
//       <View style={styles.headerRow}>
//         <TouchableOpacity onPress={() => setDrawerVisible(true)} style={styles.menuButton}>
//           <Ionicons name="menu" size={28} color="#fff" />
//         </TouchableOpacity>
//         <Text style={styles.title}>🌀 Spindle Speed Chart</Text>
//       </View>

//       {/* ✅ Machine Select */}
//       <View style={styles.machineRow}>
//         {machineOptions.map((machine) => (
//           <TouchableOpacity
//             key={machine}
//             onPress={() => setSelectedMachine(machine)}
//             style={[
//               styles.machineButton,
//               selectedMachine === machine && styles.machineSelected,
//             ]}
//           >
//             <Text style={styles.machineText}>{machine}</Text>
//           </TouchableOpacity>
//         ))}
//       </View>

//       {/* ✅ Date Picker */}
//       <TouchableOpacity onPress={() => setShowPicker(true)} style={styles.dateButton}>
//         <Text style={styles.dateText}>{date.toDateString()}</Text>
//       </TouchableOpacity>

//       {showPicker && (
//         <DateTimePicker
//           value={date}
//           mode="date"
//           display={Platform.OS === 'ios' ? 'spinner' : 'default'}
//           onChange={(_, selected) => {
//             setShowPicker(false);
//             if (selected) setDate(selected);
//           }}
//         />
//       )}

//       {/* ✅ Landscape Toggle */}
//       {/* <View style={styles.landscapeToggle}>
//         <Text style={{ color: '#fff', marginRight: 10 }}>Landscape View</Text>
//         <Switch
//           value={isLandscape}
//           onValueChange={setIsLandscape}
//           thumbColor="#fff"
//           trackColor={{ false: '#444', true: '#2563eb' }}
//         />
//       </View> */}

//       {/* ✅ Chart */}
//       <Text style={styles.chartTitle}>Speed vs Time</Text>
//       <ScrollView horizontal>
//         <LineChart
//           data={chartData}
//           width={isLandscape ? screenWidth * 2.2 : screenWidth * 1.5}
//           height={250}
//           chartConfig={{
//             backgroundColor: '#1F2937',
//             backgroundGradientFrom: '#1F2937',
//             backgroundGradientTo: '#111827',
//             color: () => '#10B981',
//             labelColor: () => '#9CA3AF',
//             strokeWidth: 2,
//             propsForDots: {
//               r: '3',
//               strokeWidth: '1',
//               stroke: '#10B981',
//             },
//             decimalPlaces: 0,
//           }}
//           bezier
//           style={{ marginVertical: 20, borderRadius: 16, marginHorizontal: 10 }}
//         />
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1 },
//   headerRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingTop: 50,
//     paddingBottom: 20,
//     paddingHorizontal: 15,
//   },
//   menuButton: {
//     marginRight: 15,
//   },
//   title: {
//     color: '#fff',
//     fontSize: 22,
//     fontWeight: 'bold',
//   },
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
//   machineSelected: {
//     backgroundColor: '#555',
//   },
//   machineText: { color: '#fff' },
//   dateButton: {
//     alignSelf: 'center',
//     backgroundColor: '#444',
//     padding: 10,
//     borderRadius: 10,
//     marginBottom: 10,
//   },
//   dateText: { color: '#fff' },
//   chartTitle: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginLeft: 20,
//     marginBottom: 8,
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
//   landscapeToggle: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: 10,
//   },
// });






import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import CustomDrawer from '../../components/CustomDrawer';
import { useTheme } from '../../context/ThemeContext';

const screenWidth = Dimensions.get('window').width;
const machineOptions = ['Machine 01', 'Machine 02', 'Machine 03'];
const API_URL = 'https://aphid-full-frankly.ngrok-free.app/spindle-data'; // 🔄 Updated static ngrok URL

export default function SpindleChartScreen() {
  const { theme } = useTheme();
  const [selectedMachine, setSelectedMachine] = useState(machineOptions[0]);
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [isLandscape, setIsLandscape] = useState(false);
  const [chartData, setChartData] = useState({
    labels: ['0'],
    datasets: [{ data: [0] }],
  });

  useEffect(() => {
    fetchSpindleData();
  }, [selectedMachine, date]);

  const fetchSpindleData = async () => {
    const formattedDate = date.toISOString().split('T')[0];
    const url = `${API_URL}?name=${encodeURIComponent(selectedMachine)}&date=${formattedDate}`;

    try {
      const res = await fetch(url);
      const data = await res.json();

      const validData = data.filter(
        (item: any) =>
          typeof item.speed === 'number' &&
          isFinite(item.speed) &&
          !isNaN(item.speed)
      );

      const labels = validData.map((entry: any) =>
        new Date(entry.timestamp).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })
      );

      const speeds = validData.map((entry: any) => entry.speed);

      if (speeds.length === 0) {
        setChartData({ labels: ['0'], datasets: [{ data: [0] }] });
      } else {
        setChartData({ labels, datasets: [{ data: speeds }] });
      }
    } catch (err) {
      console.error('❌ Error fetching spindle data:', err);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: '#0D0D0D' }]}>
      {/* ✅ Drawer Overlay */}
      {drawerVisible && (
        <Pressable style={styles.drawerOverlay} onPress={() => setDrawerVisible(false)}>
          <CustomDrawer onClose={() => setDrawerVisible(false)} />
        </Pressable>
      )}

      {/* ✅ Header with menu */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => setDrawerVisible(true)} style={styles.menuButton}>
          <Ionicons name="menu" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>🌀 Spindle Speed Chart</Text>
      </View>

      {/* ✅ Machine Select */}
      <View style={styles.machineRow}>
        {machineOptions.map((machine) => (
          <TouchableOpacity
            key={machine}
            onPress={() => setSelectedMachine(machine)}
            style={[
              styles.machineButton,
              selectedMachine === machine && styles.machineSelected,
            ]}
          >
            <Text style={styles.machineText}>{machine}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* ✅ Date Picker */}
      <TouchableOpacity onPress={() => setShowPicker(true)} style={styles.dateButton}>
        <Text style={styles.dateText}>{date.toDateString()}</Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(_, selected) => {
            setShowPicker(false);
            if (selected) setDate(selected);
          }}
        />
      )}

      {/* ✅ Chart */}
      <Text style={styles.chartTitle}>Speed vs Time</Text>
      <ScrollView horizontal>
        <LineChart
          data={chartData}
          width={isLandscape ? screenWidth * 2.2 : screenWidth * 1.5}
          height={250}
          chartConfig={{
            backgroundColor: '#1F2937',
            backgroundGradientFrom: '#1F2937',
            backgroundGradientTo: '#111827',
            color: () => '#10B981',
            labelColor: () => '#9CA3AF',
            strokeWidth: 2,
            propsForDots: {
              r: '3',
              strokeWidth: '1',
              stroke: '#10B981',
            },
            decimalPlaces: 0,
          }}
          bezier
          style={{ marginVertical: 20, borderRadius: 16, marginHorizontal: 10 }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 15,
  },
  menuButton: {
    marginRight: 15,
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
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
  machineSelected: {
    backgroundColor: '#555',
  },
  machineText: { color: '#fff' },
  dateButton: {
    alignSelf: 'center',
    backgroundColor: '#444',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  dateText: { color: '#fff' },
  chartTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 20,
    marginBottom: 8,
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
  landscapeToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
});
