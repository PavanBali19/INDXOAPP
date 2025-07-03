

// // autoInsert.js
// require('dotenv').config();
// const mysql = require('mysql2');

// // ✅ DB Connection
// const db = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   port: process.env.DB_PORT,
// });

// db.connect((err) => {
//   if (err) {
//     console.error('❌ DB Connection failed:', err);
//     return;
//   }
//   console.log('✅ Connected to MySQL for autoInsert');

//   insertMachineData();
//   insertPowerLogs();
//   insertSpindleLogs(); // ✅ Add this call
// });

// // ✅ Insert into 'machines' table
// function insertMachineData() {
//   const machines = ['Machine 01', 'Machine 02', 'Machine 03'];
//   const date = new Date().toISOString().split('T')[0];

//   machines.forEach((name) => {
//     const statuses = ['Running', 'Idle', 'Error'];
//     const status = statuses[Math.floor(Math.random() * statuses.length)];

//     let spindle_speed = 0;
//     let power_consumption = 0;
//     let rest_time = 0;

//     if (status === 'Running') {
//       spindle_speed = Math.floor(Math.random() * (3200 - 2500 + 1)) + 2500;
//       power_consumption = (Math.random() * (9.5 - 7.0) + 7.0).toFixed(1);
//       rest_time = Math.floor(Math.random() * 20);
//     } else if (status === 'Idle') {
//       spindle_speed = 0;
//       power_consumption = (Math.random() * 2).toFixed(1);
//       rest_time = Math.floor(Math.random() * 60) + 20;
//     } else if (status === 'Error') {
//       spindle_speed = 0;
//       power_consumption = 0;
//       rest_time = Math.floor(Math.random() * 120) + 30;
//     }

//     const sql = `
//       INSERT INTO machines (name, status, spindle_speed, power_consumption, rest_time, date)
//       VALUES (?, ?, ?, ?, ?, ?)
//     `;

//     db.query(sql, [name, status, spindle_speed, power_consumption, rest_time, date], (err) => {
//       if (err) {
//         console.error(`❌ Insert failed for ${name}:`, err.message);
//       } else {
//         console.log(`✅ Inserted ${status} for ${name} on ${date}`);
//       }
//     });
//   });
// }

// // ✅ Insert into 'power_logs' table
// function insertPowerLogs() {
//   const machines = ['Machine 01', 'Machine 02', 'Machine 03'];
//   const today = new Date();

//   machines.forEach((machine) => {
//     for (let hour = 0; hour < 24; hour++) {
//       const timestamp = new Date(today);
//       timestamp.setHours(hour, 0, 0, 0);

//       const power_value = parseFloat((Math.random() * (5 - 2) + 2).toFixed(2));

//       const sql = `
//         INSERT INTO power_logs (machine_name, timestamp, power_value)
//         VALUES (?, ?, ?)
//       `;

//       db.query(sql, [machine, timestamp, power_value], (err) => {
//         if (err) {
//           console.error(`❌ Power log insert failed for ${machine}:`, err.message);
//         } else {
//           console.log(`⚡ Inserted power log for ${machine} at ${timestamp.toTimeString().split(' ')[0]}`);
//         }
//       });
//     }
//   });
// }

// // ✅ Insert into 'spindle_logs' table
// function insertSpindleLogs() {
//   const machines = ['Machine 01', 'Machine 02', 'Machine 03'];
//   const today = new Date();

//   machines.forEach((machine) => {
//     for (let hour = 0; hour < 24; hour++) {
//       const timestamp = new Date(today);
//       timestamp.setHours(hour, 0, 0, 0);

//       const speed = Math.floor(Math.random() * (3200 - 2500 + 1)) + 2500;

//       const sql = `
//         INSERT INTO spindle_logs (name, timestamp, speed)
//         VALUES (?, ?, ?)
//       `;

//       db.query(sql, [machine, timestamp, speed], (err) => {
//         if (err) {
//           console.error(`❌ Spindle log insert failed for ${machine}:`, err.message);
//         } else {
//           console.log(`🌀 Inserted spindle speed ${speed} for ${machine} at ${timestamp.toTimeString().split(' ')[0]}`);
//         }
//       });
//     }
//   });
// }




require('dotenv').config();
const mysql = require('mysql2');

// ✅ Connect to DB
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

db.connect((err) => {
  if (err) {
    console.error('DB Connection failed:', err);
    return;
  }
  console.log('Connected to MySQL for autoInsert');
  insertMachineData();
  insertSpindleLogs();
  insertAlarmLogs();
});

// ✅ Insert into machines table
function insertMachineData() {
  const machines = ['Machine 01', 'Machine 02', 'Machine 03'];
  const date = new Date().toISOString().split('T')[0];

  machines.forEach((name) => {
    const statuses = ['Running', 'Idle', 'Error'];
    const status = statuses[Math.floor(Math.random() * statuses.length)];

    let spindle_speed = 0;
    let power_consumption = 0;
    let rest_time = 0;

    if (status === 'Running') {
      spindle_speed = Math.floor(Math.random() * (3200 - 2500 + 1)) + 2500;
      power_consumption = (Math.random() * (9.5 - 7.0) + 7.0).toFixed(1);
      rest_time = Math.floor(Math.random() * 20);
    } else if (status === 'Idle') {
      spindle_speed = 0;
      power_consumption = (Math.random() * 2).toFixed(1);
      rest_time = Math.floor(Math.random() * 60) + 20;
    } else if (status === 'Error') {
      spindle_speed = 0;
      power_consumption = 0;
      rest_time = Math.floor(Math.random() * 120) + 30;
    }

    const sql = `
      INSERT INTO machines (name, status, spindle_speed, power_consumption, rest_time, date)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
      sql,
      [name, status, spindle_speed, power_consumption, rest_time, date],
      (err) => {
        if (err) {
          console.error(`Insert failed for ${name}:`, err.message);
        } else {
          console.log(`Inserted ${status} for ${name} on ${date}`);
        }
      }
    );
  });
}

// ✅ Insert into spindle_logs table
function insertSpindleLogs() {
  const machines = ['Machine 01', 'Machine 02', 'Machine 03'];
  const now = new Date();

  machines.forEach((name) => {
    for (let i = 0; i < 12; i++) {
      const timestamp = new Date(now);
      timestamp.setMinutes(now.getMinutes() - i * 5);

      const speed = Math.floor(Math.random() * (3200 - 2500 + 1)) + 2500;

      const sql = `
        INSERT INTO spindle_logs (name, speed, timestamp)
        VALUES (?, ?, ?)
      `;

      db.query(sql, [name, speed, timestamp], (err) => {
        if (err) {
          console.error(`Spindle log insert failed for ${name}:`, err.message);
        } else {
          console.log(`Spindle speed ${speed} inserted for ${name} at ${timestamp.toISOString()}`);
        }
      });
    }
  });
}

// ✅ Insert into alarm_logs table
function insertAlarmLogs() {
  const machines = ['Machine 01', 'Machine 02', 'Machine 03'];
  const alarmTypes = [
    { type: 'Overheat', message: 'Temperature exceeded safe limits' },
    { type: 'SpeedLimit', message: 'RPM crossed allowed threshold' },
    { type: 'UnexpectedStop', message: 'Machine stopped unexpectedly' },
    { type: 'PowerSurge', message: 'Detected unstable power input' },
  ];

  machines.forEach((machine) => {
    const alarm = alarmTypes[Math.floor(Math.random() * alarmTypes.length)];
    const timestamp = new Date();
    timestamp.setHours(Math.floor(Math.random() * 24), Math.floor(Math.random() * 60), 0, 0);

    const sql = `
      INSERT INTO alarm_logs (machine_name, alarm_type, message, timestamp)
      VALUES (?, ?, ?, ?)
    `;

    db.query(
      sql,
      [machine, alarm.type, alarm.message, timestamp],
      (err) => {
        if (err) {
          console.error(`Alarm insert failed for ${machine}:`, err.message);
        } else {
          console.log(`Alarm (${alarm.type}) inserted for ${machine} at ${timestamp.toLocaleString()}`);
        }
      }
    );
  });
}
