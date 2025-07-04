// require('dotenv').config();
// const express = require('express');
// const mysql = require('mysql2');
// const cors = require('cors');

// const app = express();
// const port = process.env.PORT || 3000;

// app.use(cors());
// app.use(express.json());

// // ✅ MySQL Connection (Public Railway)
// const db = mysql.createConnection({
//   host: process.env.DB_HOST,         // hopper.proxy.rlwy.net
//   user: process.env.DB_USER,         // root
//   password: process.env.DB_PASSWORD, // your password
//   database: process.env.DB_NAME,     // railway
//   port: process.env.DB_PORT          // 50642
// });

// db.connect((err) => {
//   if (err) {
//     console.error('❌ DB Connection Failed:', err.message);
//   } else {
//     console.log('✅ Connected to Railway MySQL database');
//   }
// });

// // ✅ Route: /login
// app.post('/login', (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({ success: false, message: 'Email and password required' });
//   }

//   const sql = 'SELECT * FROM login WHERE email = ? AND password = ?';
//   db.query(sql, [email, password], (err, results) => {
//     if (err) {
//       console.error('❌ Login query failed:', err);
//       return res.status(500).json({ success: false, message: 'Server Error' });
//     }

//     if (results.length > 0) {
//       res.json({ success: true, message: 'Login successful', user: results[0] });
//     } else {
//       res.status(401).json({ success: false, message: 'Invalid credentials' });
//     }
//   });
// });

// // ✅ Route: /machines (specific date)
// app.get('/machines', (req, res) => {
//   const { name, date } = req.query;
//   const sql = `SELECT * FROM machines WHERE name = ? AND date = ?`;
//   db.query(sql, [name, date], (err, results) => {
//     if (err) {
//       console.error('❌ Error fetching machine data:', err);
//       res.status(500).send('Server Error');
//     } else {
//       res.json(results);
//     }
//   });
// });

// // ✅ Route: /machines/range
// app.get('/machines/range', (req, res) => {
//   const { name, from, to } = req.query;
//   const sql = `
//     SELECT * FROM machines
//     WHERE name = ? AND date BETWEEN ? AND ?
//     ORDER BY date ASC
//   `;
//   db.query(sql, [name, from, to], (err, results) => {
//     if (err) {
//       console.error('❌ Error fetching machine range data:', err);
//       res.status(500).json({ error: 'Server Error' });
//     } else {
//       res.json(results);
//     }
//   });
// });

// // ✅ Route: /spindle-data
// app.get('/spindle-data', (req, res) => {
//   const { name, date } = req.query;
//   const sql = `
//     SELECT * FROM spindle_logs
//     WHERE name = ? AND DATE(timestamp) = ?
//     ORDER BY timestamp ASC
//   `;
//   db.query(sql, [name, date], (err, results) => {
//     if (err) {
//       console.error('❌ Error fetching spindle data:', err);
//       res.status(500).send('Server Error');
//     } else {
//       const cleaned = results.filter(
//         (entry) =>
//           typeof entry.speed === 'number' &&
//           isFinite(entry.speed) &&
//           !isNaN(entry.speed)
//       );
//       res.json(cleaned);
//     }
//   });
// });

// // ✅ Route: /alarms
// app.get('/alarms', (req, res) => {
//   const { machine, date } = req.query;
//   let query = 'SELECT * FROM alarm_logs WHERE 1=1';
//   const params = [];

//   if (machine) {
//     query += ' AND machine_name = ?';
//     params.push(machine);
//   }

//   if (date) {
//     query += ' AND DATE(timestamp) = ?';
//     params.push(date);
//   }

//   query += ' ORDER BY timestamp DESC';

//   db.query(query, params, (err, results) => {
//     if (err) {
//       console.error('❌ Error fetching alarms:', err);
//       res.status(500).json({ error: 'Internal Server Error' });
//     } else {
//       res.json(results);
//     }
//   });
// });

// // ✅ Route: /power-data
// app.get('/power-data', (req, res) => {
//   const { machine, date } = req.query;
//   const query = `
//     SELECT * FROM power_logs
//     WHERE machine_name = ? AND DATE(timestamp) = ?
//     ORDER BY timestamp ASC
//   `;
//   db.query(query, [machine, date], (err, results) => {
//     if (err) {
//       console.error('❌ Error fetching power data:', err);
//       res.status(500).json({ error: 'Internal Server Error' });
//     } else {
//       res.json(results);
//     }
//   });
// });

// // ✅ Route: /machine-details
// app.get('/machine-details', (req, res) => {
//   const sql = `SELECT * FROM machines ORDER BY date DESC`;
//   db.query(sql, (err, results) => {
//     if (err) {
//       console.error('❌ Error fetching machine details:', err);
//       res.status(500).json({ error: 'Server Error' });
//     } else {
//       res.json(results);
//     }
//   });
// });

// app.get('/', (req, res) => {
//   res.send('🟢 Indexo Backend is running');
// });


// // ✅ Server Start
// app.listen(port, () => {
//   console.log(`🚀 Server running at http://localhost:${port}`);
// });


require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const cron = require('node-cron');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// ✅ MySQL Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

db.connect((err) => {
  if (err) {
    console.error('❌ DB Connection Failed:', err.message);
  } else {
    console.log('✅ Connected to Railway MySQL database');
  }
});

// ✅ CRON JOB: Run every hour
cron.schedule('0 * * * *', () => {
  console.log('⏰ [CRON] Running autoInsert job...');
  runAutoInsert();
});

// ✅ Random Data Insert Function
function runAutoInsert() {
  const machines = ['Machine 01', 'Machine 02', 'Machine 03'];
  const now = new Date();
  const date = now.toISOString().split('T')[0];

  // ➕ Insert into machines
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
    } else {
      spindle_speed = 0;
      power_consumption = 0;
      rest_time = Math.floor(Math.random() * 120) + 30;
    }

    const sql = `
      INSERT INTO machines (name, status, spindle_speed, power_consumption, rest_time, date)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    db.query(sql, [name, status, spindle_speed, power_consumption, rest_time, date], (err) => {
      if (err) console.error(`❌ machines insert failed:`, err.message);
      else console.log(`✅ machines inserted for ${name}`);
    });
  });

  // ➕ Insert into spindle_logs
  machines.forEach((name) => {
    for (let i = 0; i < 12; i++) {
      const timestamp = new Date(now);
      timestamp.setMinutes(now.getMinutes() - i * 5);
      const speed = Math.floor(Math.random() * (3200 - 2500 + 1)) + 2500;

      const sql = `INSERT INTO spindle_logs (name, speed, timestamp) VALUES (?, ?, ?)`;
      db.query(sql, [name, speed, timestamp], (err) => {
        if (err) console.error(`❌ spindle_logs insert failed:`, err.message);
      });
    }
  });

  // ➕ Insert into alarm_logs
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
    db.query(sql, [machine, alarm.type, alarm.message, timestamp], (err) => {
      if (err) console.error(`❌ alarm_logs insert failed:`, err.message);
    });
  });

  // ➕ Insert into power_logs
  machines.forEach((machine) => {
    for (let i = 0; i < 12; i++) {
      const timestamp = new Date(now);
      timestamp.setMinutes(now.getMinutes() - i * 5);
      const power = parseFloat((Math.random() * (9.5 - 6.5) + 6.5).toFixed(2));

      const sql = `INSERT INTO power_logs (machine_name, power_value, timestamp) VALUES (?, ?, ?)`;
      db.query(sql, [machine, power, timestamp], (err) => {
        if (err) console.error(`❌ power_logs insert failed:`, err.message);
      });
    }
  });
}

// ✅ Route: /login
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password required' });
  }

  const sql = 'SELECT * FROM login WHERE email = ? AND password = ?';
  db.query(sql, [email, password], (err, results) => {
    if (err) {
      console.error('❌ Login query failed:', err);
      return res.status(500).json({ success: false, message: 'Server Error' });
    }

    if (results.length > 0) {
      res.json({ success: true, message: 'Login successful', user: results[0] });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  });
});

// ✅ Route: /machines (specific date)
app.get('/machines', (req, res) => {
  const { name, date } = req.query;
  const sql = `SELECT * FROM machines WHERE name = ? AND date = ?`;
  db.query(sql, [name, date], (err, results) => {
    if (err) {
      console.error('❌ Error fetching machine data:', err);
      res.status(500).send('Server Error');
    } else {
      res.json(results);
    }
  });
});

// ✅ Route: /machines/range
app.get('/machines/range', (req, res) => {
  const { name, from, to } = req.query;
  const sql = `
    SELECT * FROM machines
    WHERE name = ? AND date BETWEEN ? AND ?
    ORDER BY date ASC
  `;
  db.query(sql, [name, from, to], (err, results) => {
    if (err) {
      console.error('❌ Error fetching machine range data:', err);
      res.status(500).json({ error: 'Server Error' });
    } else {
      res.json(results);
    }
  });
});

// ✅ Route: /spindle-data
app.get('/spindle-data', (req, res) => {
  const { name, date } = req.query;
  const sql = `
    SELECT * FROM spindle_logs
    WHERE name = ? AND DATE(timestamp) = ?
    ORDER BY timestamp ASC
  `;
  db.query(sql, [name, date], (err, results) => {
    if (err) {
      console.error('❌ Error fetching spindle data:', err);
      res.status(500).send('Server Error');
    } else {
      const cleaned = results.filter(
        (entry) =>
          typeof entry.speed === 'number' &&
          isFinite(entry.speed) &&
          !isNaN(entry.speed)
      );
      res.json(cleaned);
    }
  });
});

// ✅ Route: /alarms
app.get('/alarms', (req, res) => {
  const { machine, date } = req.query;
  let query = 'SELECT * FROM alarm_logs WHERE 1=1';
  const params = [];

  if (machine) {
    query += ' AND machine_name = ?';
    params.push(machine);
  }

  if (date) {
    query += ' AND DATE(timestamp) = ?';
    params.push(date);
  }

  query += ' ORDER BY timestamp DESC';

  db.query(query, params, (err, results) => {
    if (err) {
      console.error('❌ Error fetching alarms:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(results);
    }
  });
});

// ✅ Route: /power-data
app.get('/power-data', (req, res) => {
  const { machine, date } = req.query;
  const query = `
    SELECT * FROM power_logs
    WHERE machine_name = ? AND DATE(timestamp) = ?
    ORDER BY timestamp ASC
  `;
  db.query(query, [machine, date], (err, results) => {
    if (err) {
      console.error('❌ Error fetching power data:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(results);
    }
  });
});

// ✅ Route: /machine-details
app.get('/machine-details', (req, res) => {
  const sql = `SELECT * FROM machines ORDER BY date DESC`;
  db.query(sql, (err, results) => {
    if (err) {
      console.error('❌ Error fetching machine details:', err);
      res.status(500).json({ error: 'Server Error' });
    } else {
      res.json(results);
    }
  });
});

// Root Route
app.get('/', (req, res) => {
  res.send('🟢 Indexo Backend is running');
});

// ✅ Start Server
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
