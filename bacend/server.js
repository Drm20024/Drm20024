const express = require('express');
   const sqlite3 = require('sqlite3').verbose();
   const bodyParser = require('body-parser');

   const app = express();
   const db = new sqlite3.Database('./database/database.db');

   app.use(bodyParser.json());

   // ایجاد جدول اگر وجود نداشته باشد
   db.serialize(() => {
       db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT, password TEXT)");
       db.run("CREATE TABLE IF NOT EXISTS data (id INTEGER PRIMARY KEY, value TEXT)");
   });

   // لاگین
   app.post('/login', (req, res) => {
       const { username, password } = req.body;
       db.get("SELECT * FROM users WHERE username = ? AND password = ?", [username, password], (err, row) => {
           if (row) {
               res.json({ success: true });
           } else {
               res.json({ success: false });
           }
       });
   });

   // ذخیره اطلاعات
   app.post('/saveData', (req, res) => {
       const { data } = req.body;
       db.run("INSERT INTO data (value) VALUES (?)", [data], function(err) {
           if (err) {
               res.json({ success: false });
           } else {
               res.json({ success: true });
           }
       });
   });

   // دریافت اطلاعات
   app.get('/getData', (req, res) => {
       db.all("SELECT value FROM data", [], (err, rows) => {
           if (err) {
               res.json([]);
           } else {
               res.json(rows.map(row => row.value));
           }
       });
   });

   // جستجو
   app.get('/search', (req, res) => {
       const query = req.query.q;
       db.all("SELECT value FROM data WHERE value LIKE ?", [`%${query}%`], (err, rows) => {
           if (err) {
               res.json([]);
           } else {
               res.json(rows.map(row => row.value));
           }
       });
   });

   app.listen(3000, () => {
       console.log('سرور در حال اجرا است در http://localhost:3000');
   });
