const mysql = require('mysql2/promise');
mysql.createConnection({
  host: '127.0.0.1',
  user: 'bidalert',
  password: 'bidalert!123@vcs',
  database: 'bidalert_bidalert2'
}).then(c => {
  c.query('SELECT tender_id, name_of_work, gemdoclink FROM gem_tenders WHERE tender_id = "BIDALERT-GEM-26-3685"')
    .then(([r]) => console.log(JSON.stringify(r, null, 2)))
    .catch(console.error)
    .finally(() => c.end());
});
