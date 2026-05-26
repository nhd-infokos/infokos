const fs = require('fs');
const https = require('https');

const query = `
[out:json][timeout:60];
(
  relation["route"="train"]["network"~"KAI Commuter|KRL"];
  relation["route"="subway"];
  relation["route"="light_rail"];
);
out geom;
`;

const postData = 'data=' + encodeURIComponent(query);

const options = {
  hostname: 'overpass-api.de',
  port: 443,
  path: '/api/interpreter',
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': Buffer.byteLength(postData)
  }
};

const req = https.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    try {
      const json = JSON.parse(data);
      fs.writeFileSync('krl-data-raw.json', JSON.stringify(json, null, 2));
      console.log('Saved raw data. Parsing...');
      
      const lines = {};
      
      json.elements.forEach(el => {
        if (el.type === 'relation') {
          const name = el.tags.name || el.tags.ref || 'Unknown Line';
          const color = el.tags.colour || el.tags.color || '#888888';
          
          if (!lines[name]) {
            lines[name] = { color, segments: [] };
          }
          
          el.members.forEach(member => {
            if (member.type === 'way' && member.geometry) {
              const coords = member.geometry.map(pt => [pt.lat, pt.lon]);
              lines[name].segments.push(coords);
            }
          });
        }
      });
      
      fs.writeFileSync('public/krl-routes.json', JSON.stringify(lines, null, 2));
      console.log('Saved parsed KRL routes to public/krl-routes.json');
      console.log(Object.keys(lines));
    } catch (e) {
      console.error('Error parsing:', e);
    }
  });
});

req.on('error', (e) => {
  console.error('Request error:', e);
});

req.write(postData);
req.end();
