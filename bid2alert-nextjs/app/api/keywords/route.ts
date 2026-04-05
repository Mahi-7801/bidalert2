import { NextResponse } from 'next/server';
import { tenderKeywords } from '@/data/tenderKeywords';

const prefix = ['Steel', 'Cement', 'Civil', 'Electrical', 'Plumbing', 'Software', 'IT', 'Hardware', 'Network', 'Highway', 'Bridge', 'Solar', 'Wind', 'Medical', 'Security', 'Road', 'Dam', 'Airport', 'Fire', 'Hospital', 'Water', 'Waste', 'Pest', 'Furniture', 'Printing', 'Lab', 'Defense', 'Agricultural', 'Telecom', 'Smart City'];
const action = ['Supply', 'Maintenance', 'Installation', 'Development', 'Construction', 'Project', 'Services', 'Consultancy', 'Management', 'Testing', 'Audit', 'Works', 'Outsourcing', 'Operation'];
const location = ['Delhi', 'Mumbai', 'Bangalore', 'Hyderabad', 'Chennai', 'Pune', 'Ahmedabad', 'Kolkata', 'Surat', 'Dubai', 'London', 'New York', 'Singapore', 'Sydney', 'Zone A', 'Zone B', 'North Region', 'South Region', 'Phase 1', 'Phase 2'];
const material = ['Pipes', 'Cables', 'Wires', 'Lamps', 'LEDs', 'Switches', 'Valves', 'Pumps', 'Generators', 'Transformers', 'Tanks', 'Motors', 'Sensors', 'Controllers'];

export async function GET() {
    // Start with the exact list from tenderKeywords (which contains the 260 extra hand-picked words)
    const set = new Set<string>(tenderKeywords);
    
    // Fast generation of realistic keywords on the fly
    let idx = 1;
    // Pre-calculate to avoid huge random loops where possible, but Math.random over large arrays is also ok.
    for (const p of prefix) {
        for (const a of action) {
            for (const l of location) {
                for (const m of material) {
                    // Total count = 100000 + 260 (hand-picked base)
                    if (set.size >= 100260) break;
                    set.add(`${p} ${a} ${l} ${m}`);
                    set.add(`${p} ${m} ${a} ${l}`);
                    set.add(`${p} ${l} ${a} ${m}`);
                    set.add(`${p} ${m} ${l} ${a}`);
                }
            }
        }
    }
    
    // If we haven't hit the target perfectly, cycle and add suffixes
    while(set.size < 100260) {
        set.add(`System Maintenance ${idx++}`);
    }

    // Convert Set to Array and return it exactly
    const arr = Array.from(set).slice(0, 100260);
    
    return NextResponse.json(arr, {
        headers: {
            'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=43200', // Cache heavily
        },
    });
}
