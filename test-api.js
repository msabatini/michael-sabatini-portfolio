
const axios = require('axios');

async function test() {
  try {
    const res = await axios.get('http://localhost:3000/projects/2');
    console.log('Project 2:', JSON.stringify(res.data, null, 2));
    const res2 = await axios.get('http://localhost:3000/projects/3');
    console.log('Project 3:', JSON.stringify(res2.data, null, 2));
  } catch (err) {
    console.error('Error:', err.message);
  }
}

test();
