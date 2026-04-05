
try {
    const exceljs = require('exceljs');
    console.log('exceljs loaded successfully');
    const workbook = new exceljs.Workbook();
    console.log('Workbook created');
    process.exit(0);
} catch (e) {
    console.error('exceljs load failed:', e.message);
    process.exit(1);
}
