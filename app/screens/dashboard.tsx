// // app/screens/dashboard.tsx
// import { Ionicons } from '@expo/vector-icons';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import React, { useEffect, useState } from 'react';
// import {
//   Dimensions,
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
// import Animated, {
//   useAnimatedProps,
//   useSharedValue,
//   withTiming,
// } from 'react-native-reanimated';
// import { Circle, G, Svg, Line as SvgLine, Text as SvgText } from 'react-native-svg';
// import CustomDrawer from '../../components/CustomDrawer';
// import { useTheme } from '../../context/ThemeContext';

// const screenWidth = Dimensions.get('window').width;
// const API_URL = 'http://192.168.1.197:3000/machines';

// const AnimatedSvgLine = Animated.createAnimatedComponent(SvgLine);

// const Gauge = ({ value }: { value: number }) => {
//   const radius = 60;
//   const needleValue = useSharedValue(0);

//   useEffect(() => {
//     needleValue.value = withTiming(value, { duration: 1000 });
//   }, [value]);

//   const animatedProps = useAnimatedProps(() => {
//     const angle = Math.min(Math.max((needleValue.value / 6000) * 180, 0), 180);
//     const rotation = (angle - 90) * (Math.PI / 180);
//     const needleX = radius + radius * Math.cos(rotation);
//     const needleY = radius + radius * Math.sin(rotation);

//     return {
//       x2: needleX,
//       y2: needleY,
//     };
//   });

//   return (
//     <Svg width={2 * radius + 20} height={radius + 40}>
//       <G x={10} y={20}>
//         <Circle cx={radius} cy={radius} r={radius} stroke="#3d5875" strokeWidth={10} fill="none" />
//         <AnimatedSvgLine
//           animatedProps={animatedProps}
//           x1={radius}
//           y1={radius}
//           stroke="#00e0ff"
//           strokeWidth={4}
//         />
//         <SvgText
//           x={radius}
//           y={radius - 25}
//           textAnchor="middle"
//           fontSize="16"
//           fill="#ffffff"
//           fontWeight="bold"
//         >
//           {`${value} RPM`}
//         </SvgText>
//       </G>
//     </Svg>
//   );
// };

// export default function Dashboard() {
//   const { theme } = useTheme();
//   const [selectedMachine, setSelectedMachine] = useState('Machine 01');
//   const [date, setDate] = useState(new Date());
//   const [showPicker, setShowPicker] = useState(false);
//   const [machineData, setMachineData] = useState<any>(null);
//   const [drawerOpen, setDrawerOpen] = useState(false);

//   const toggleDrawer = () => setDrawerOpen(!drawerOpen);
//   const closeDrawer = () => setDrawerOpen(false);

//   const fetchMachineData = async () => {
//     try {
//       const formattedDate = date.toISOString().split('T')[0];
//       console.log('🔍 Fetching:', selectedMachine, formattedDate);
//       const response = await fetch(`${API_URL}?name=${selectedMachine}&date=${formattedDate}`);
//       const data = await response.json();
//       if (data.length > 0) {
//         setMachineData(data[0]);
//       } else {
//         setMachineData(null);
//       }
//     } catch (error) {
//       console.error('Error fetching machine data:', error);
//     }
//   };

//   useEffect(() => {
//     fetchMachineData();
//   }, [selectedMachine, date]);

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case 'Running':
//         return '#00B386';
//       case 'Idle':
//         return '#fbbf24';
//       case 'Error':
//         return '#ef4444';
//       default:
//         return '#6b7280';
//     }
//   };

//   const spindleSpeed = Number(machineData?.spindle_speed) || 0;
//   const powerConsumption = Number(machineData?.power_consumption) || 0;

//   return (
//     <SafeAreaView style={[styles.container, { backgroundColor: '#0D0D0D' }]}>
//       <View style={styles.headerWithMenu}>
//         <TouchableOpacity onPress={toggleDrawer} style={styles.menuButton}>
//           <Ionicons name="menu" size={28} color="#fff" />
//         </TouchableOpacity>
//         <Text style={styles.title}>CNC MONITORING</Text>
//       </View>

//       <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
//         <View style={styles.machineRow}>
//           {['Machine 01', 'Machine 02', 'Machine 03'].map((machine) => (
//             <TouchableOpacity
//               key={machine}
//               style={[
//                 styles.machineButton,
//                 selectedMachine === machine && styles.machineSelected,
//               ]}
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

//         {machineData ? (
//           <>
//             <View style={styles.rowHeader}>
//               <Text style={styles.machineName}>{machineData.name}</Text>
//               <View
//                 style={[
//                   styles.statusBadge,
//                   { backgroundColor: getStatusColor(machineData.status) },
//                 ]}
//               >
//                 <Text style={styles.statusText}>{machineData.status.toUpperCase()}</Text>
//               </View>
//             </View>

//             <View style={styles.metricRow}>
//               <View style={styles.metricCard}>
//                 <Text style={styles.label}>SPINDLE SPEED</Text>
//                 <Text style={styles.value}>{spindleSpeed} RPM</Text>
//               </View>
//               <View style={styles.metricCard}>
//                 <Text style={styles.label}>POWER</Text>
//                 <Text style={styles.value}>{powerConsumption} kW</Text>
//               </View>
//               <View style={styles.metricCard}>
//                 <Text style={styles.label}>REST TIME</Text>
//                 <Text style={styles.value}>
//                   {Math.floor(machineData.rest_time / 60).toString().padStart(2, '0')}:
//                   {(machineData.rest_time % 60).toString().padStart(2, '0')}
//                 </Text>
//               </View>
//             </View>

//             <View style={styles.utilizationContainer}>
//               <Gauge value={spindleSpeed} />
//               <Text style={styles.utilizationLabel}>Spindle Gauge</Text>
//             </View>

//             <Text style={styles.chartTitle}>Spindle Speed / Power</Text>
//             <LineChart
//               data={{
//                 labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
//                 datasets: [
//                   {
//                     data: [3000, 3100, 2900, 3300, 3200, spindleSpeed],
//                     color: () => '#4F46E5',
//                     strokeWidth: 2,
//                   },
//                   {
//                     data: [3.1, 3.3, 3.0, 3.6, 3.4, powerConsumption],
//                     color: () => '#10B981',
//                     strokeWidth: 2,
//                   },
//                 ],
//                 legend: ['Spindle', 'Power'],
//               }}
//               width={screenWidth - 40}
//               height={220}
//               chartConfig={{
//                 backgroundColor: '#1F2937',
//                 backgroundGradientFrom: '#1F2937',
//                 backgroundGradientTo: '#111827',
//                 color: () => '#fff',
//                 labelColor: () => '#9CA3AF',
//                 decimalPlaces: 1,
//               }}
//               bezier
//               style={{ borderRadius: 16 }}
//             />
//           </>
//         ) : (
//           <Text style={{ color: '#aaa', marginTop: 20, alignSelf: 'center' }}>
//             No data found.
//           </Text>
//         )}
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
//     backgroundColor: '#0D0D0D',
//   },
//   menuButton: { marginRight: 15 },
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
//   machineText: {
//     color: '#fff',
//   },
//   dateButton: {
//     alignSelf: 'center',
//     backgroundColor: '#444',
//     padding: 10,
//     borderRadius: 10,
//     marginBottom: 20,
//   },
//   dateText: {
//     color: '#fff',
//   },
//   rowHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingHorizontal: 20,
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   machineName: {
//     fontSize: 20,
//     color: '#fff',
//     fontWeight: 'bold',
//   },
//   statusBadge: {
//     paddingVertical: 4,
//     paddingHorizontal: 10,
//     borderRadius: 12,
//   },
//   statusText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
//   metricRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     marginVertical: 20,
//   },
//   metricCard: {
//     backgroundColor: '#1F2937',
//     padding: 16,
//     borderRadius: 12,
//     alignItems: 'center',
//     minWidth: 90,
//   },
//   label: {
//     color: '#9CA3AF',
//     fontSize: 12,
//   },
//   value: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginTop: 6,
//   },
//   utilizationContainer: {
//     alignItems: 'center',
//     marginBottom: 30,
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




// app/screens/dashboard.tsx
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
  View,
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Circle, G, Svg, Line as SvgLine, Text as SvgText } from 'react-native-svg';
import CustomDrawer from '../../components/CustomDrawer';
import { useTheme } from '../../context/ThemeContext';

const screenWidth = Dimensions.get('window').width;

// 🌐 Set your ngrok backend URL here
const BASE_URL = 'https://aphid-full-frankly.ngrok-free.app';
const API_URL = `${BASE_URL}/machines`;

const AnimatedSvgLine = Animated.createAnimatedComponent(SvgLine);

const Gauge = ({ value }: { value: number }) => {
  const radius = 60;
  const needleValue = useSharedValue(0);

  useEffect(() => {
    needleValue.value = withTiming(value, { duration: 1000 });
  }, [value]);

  const animatedProps = useAnimatedProps(() => {
    const angle = Math.min(Math.max((needleValue.value / 6000) * 180, 0), 180);
    const rotation = (angle - 90) * (Math.PI / 180);
    const needleX = radius + radius * Math.cos(rotation);
    const needleY = radius + radius * Math.sin(rotation);

    return {
      x2: needleX,
      y2: needleY,
    };
  });

  return (
    <Svg width={2 * radius + 20} height={radius + 40}>
      <G x={10} y={20}>
        <Circle cx={radius} cy={radius} r={radius} stroke="#3d5875" strokeWidth={10} fill="none" />
        <AnimatedSvgLine
          animatedProps={animatedProps}
          x1={radius}
          y1={radius}
          stroke="#00e0ff"
          strokeWidth={4}
        />
        <SvgText
          x={radius}
          y={radius - 25}
          textAnchor="middle"
          fontSize="16"
          fill="#ffffff"
          fontWeight="bold"
        >
          {`${value} RPM`}
        </SvgText>
      </G>
    </Svg>
  );
};

export default function Dashboard() {
  const { theme } = useTheme();
  const [selectedMachine, setSelectedMachine] = useState('Machine 01');
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [machineData, setMachineData] = useState<any>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);
  const closeDrawer = () => setDrawerOpen(false);

  const fetchMachineData = async () => {
    try {
      const formattedDate = date.toISOString().split('T')[0];
      console.log('🔍 Fetching:', selectedMachine, formattedDate);
      const response = await fetch(`${API_URL}?name=${encodeURIComponent(selectedMachine)}&date=${formattedDate}`);
      const data = await response.json();
      if (data.length > 0) {
        setMachineData(data[0]);
      } else {
        setMachineData(null);
      }
    } catch (error) {
      console.error('Error fetching machine data:', error);
    }
  };

  useEffect(() => {
    fetchMachineData();
  }, [selectedMachine, date]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Running': return '#00B386';
      case 'Idle': return '#fbbf24';
      case 'Error': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const spindleSpeed = Number(machineData?.spindle_speed) || 0;
  const powerConsumption = Number(machineData?.power_consumption) || 0;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: '#0D0D0D' }]}>
      <View style={styles.headerWithMenu}>
        <TouchableOpacity onPress={toggleDrawer} style={styles.menuButton}>
          <Ionicons name="menu" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>CNC MONITORING</Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
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

        {machineData ? (
          <>
            <View style={styles.rowHeader}>
              <Text style={styles.machineName}>{machineData.name}</Text>
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(machineData.status) }]}>
                <Text style={styles.statusText}>{machineData.status.toUpperCase()}</Text>
              </View>
            </View>

            <View style={styles.metricRow}>
              <View style={styles.metricCard}>
                <Text style={styles.label}>SPINDLE SPEED</Text>
                <Text style={styles.value}>{spindleSpeed} RPM</Text>
              </View>
              <View style={styles.metricCard}>
                <Text style={styles.label}>POWER</Text>
                <Text style={styles.value}>{powerConsumption} kW</Text>
              </View>
              <View style={styles.metricCard}>
                <Text style={styles.label}>REST TIME</Text>
                <Text style={styles.value}>
                  {Math.floor(machineData.rest_time / 60).toString().padStart(2, '0')}:
                  {(machineData.rest_time % 60).toString().padStart(2, '0')}
                </Text>
              </View>
            </View>

            <View style={styles.utilizationContainer}>
              <Gauge value={spindleSpeed} />
              <Text style={styles.utilizationLabel}>Spindle Gauge</Text>
            </View>

            <Text style={styles.chartTitle}>Spindle Speed / Power</Text>
            <LineChart
              data={{
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                datasets: [
                  { data: [3000, 3100, 2900, 3300, 3200, spindleSpeed], color: () => '#4F46E5', strokeWidth: 2 },
                  { data: [3.1, 3.3, 3.0, 3.6, 3.4, powerConsumption], color: () => '#10B981', strokeWidth: 2 },
                ],
                legend: ['Spindle', 'Power'],
              }}
              width={screenWidth - 40}
              height={220}
              chartConfig={{
                backgroundColor: '#1F2937',
                backgroundGradientFrom: '#1F2937',
                backgroundGradientTo: '#111827',
                color: () => '#fff',
                labelColor: () => '#9CA3AF',
                decimalPlaces: 1,
              }}
              bezier
              style={{ borderRadius: 16 }}
            />
          </>
        ) : (
          <Text style={{ color: '#aaa', marginTop: 20, alignSelf: 'center' }}>
            No data found.
          </Text>
        )}
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
    backgroundColor: '#0D0D0D',
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
  machineSelected: {
    backgroundColor: '#555',
  },
  machineText: { color: '#fff' },
  dateButton: {
    alignSelf: 'center',
    backgroundColor: '#444',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  dateText: { color: '#fff' },
  rowHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 10,
  },
  machineName: { fontSize: 20, color: '#fff', fontWeight: 'bold' },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  statusText: { color: '#fff', fontWeight: 'bold' },
  metricRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  metricCard: {
    backgroundColor: '#1F2937',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    minWidth: 90,
  },
  label: { color: '#9CA3AF', fontSize: 12 },
  value: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginTop: 6 },
  utilizationContainer: {
    alignItems: 'center',
    marginBottom: 30,
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
