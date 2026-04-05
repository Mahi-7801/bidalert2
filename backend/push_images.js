
const { pool } = require('./database');
async function seedImages() {
    const images = [
        { name: 'Image 1', path: '/uploads/1772446199419.png' },
        { name: 'Image 2', path: '/uploads/1772447657130.png' },
        { name: 'Image 3', path: '/uploads/1772448235512.webp' },
        { name: 'Image 4', path: '/uploads/1772448526062.webp' }
    ];

    try {
        for (const img of images) {
            // Check if already exists to avoid duplicates if needed, but the user just said "push this image"
            // I'll just insert them.
            await pool.query(
                'INSERT INTO images (image_name, image_path) VALUES (?, ?)',
                [img.name, img.path]
            );
            console.log(`Inserted ${img.path}`);
        }
        console.log('Successfully pushed images to DB');
        
        const [rows] = await pool.query('SELECT * FROM images ORDER BY created_at DESC LIMIT 5');
        console.log('Current images in DB:', JSON.stringify(rows, null, 2));
        
        process.exit(0);
    } catch (err) {
        console.error('Error seeding images:', err);
        process.exit(1);
    }
}
seedImages();
