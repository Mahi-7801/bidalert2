const fs = require('fs');

const initialKeywordsMatch = fs.readFileSync('./bid2alert-nextjs/data/tenderKeywords.ts', 'utf8').match(/"([^"]+)"/g);
const initialKeywords = initialKeywordsMatch ? initialKeywordsMatch.map(k => k.replace(/"/g, '')) : [];

const prefix = ['Steel', 'Cement', 'Civil', 'Electrical', 'Plumbing', 'Software', 'IT', 'Hardware', 'Network', 'Highway', 'Bridge', 'Solar', 'Wind', 'Medical', 'Security', 'Road', 'Dam', 'Airport', 'Fire', 'Hospital', 'Water', 'Waste', 'Pest', 'Furniture', 'Printing', 'Lab', 'Defense', 'Agricultural', 'Telecom', 'Smart City'];
const action = ['Supply', 'Maintenance', 'Installation', 'Development', 'Construction', 'Project', 'Services', 'Consultancy', 'Management', 'Testing', 'Audit', 'Works', 'Outsourcing', 'Operation'];
const location = ['Delhi', 'Mumbai', 'Bangalore', 'Hyderabad', 'Chennai', 'Pune', 'Ahmedabad', 'Kolkata', 'Surat', 'Dubai', 'London', 'New York', 'Singapore', 'Sydney', 'Zone A', 'Zone B', 'North Region', 'South Region', 'Phase 1', 'Phase 2'];
const material = ['Pipes', 'Cables', 'Wires', 'Lamps', 'LEDs', 'Switches', 'Valves', 'Pumps', 'Generators', 'Transformers', 'Tanks', 'Motors', 'Sensors', 'Controllers'];

const set = new Set(initialKeywords);

let idx = 1;
while(set.size < 100000) {
    const p = prefix[Math.floor(Math.random() * prefix.length)];
    const a = action[Math.floor(Math.random() * action.length)];
    let word = '';
    
    // Add variations to generate 100k fast
    const r = Math.random();
    if (r < 0.3) {
        word = `${p} ${a} ${location[Math.floor(Math.random() * location.length)]}`;
    } else if (r < 0.6) {
        word = `${p} ${location[Math.floor(Math.random() * location.length)]} ${a}`;
    } else if (r < 0.8) {
        word = `${p} ${material[Math.floor(Math.random() * material.length)]} ${a}`;
    } else {
        word = `${p} ${material[Math.floor(Math.random() * material.length)]} ${a} ${location[Math.floor(Math.random() * location.length)]}`;
    }

    if (!set.has(word)) {
        set.add(word);
    } else {
        set.add(`${word} ${idx++}`);
    }
}

const arr = Array.from(set).sort();
fs.writeFileSync('./bid2alert-nextjs/public/keywords.json', JSON.stringify(arr));
console.log('Generated keywords.json with length', arr.length);
