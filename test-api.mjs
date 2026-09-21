// Quick API smoke test using Node.js fetch
// Run: node test-api.mjs

const BASE = 'http://localhost:3000';

async function test(label, body) {
  console.log(`\n=== ${label} ===`);
  try {
    const res = await fetch(`${BASE}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const json = await res.json();
    console.log('HTTP Status:', res.status);
    if (json.success) {
      console.log('✅ SUCCESS');
      console.log('  category:', json.data?.category);
      console.log('  severity:', json.data?.severity);
      console.log('  safetyLevel:', json.safetyLevel);
      console.log('  acknowledgement:', json.data?.acknowledgement?.slice(0, 80) + '...');
    } else {
      console.log('❌ FAILED:', json.error);
    }
  } catch (err) {
    console.log('❌ FETCH ERROR:', err.message);
  }
}

(async () => {
  // Test 1: Normal legal question
  await test('Normal legal question (EN)', {
    message: 'What are my rights under domestic violence law in Malawi?',
    language: 'en',
    demoMode: false,
  });

  // Test 2: Chichewa
  await test('Chichewa language', {
    message: 'Ndili ndi ufulu otani ngati ndimaponderezedwa?',
    language: 'ny',
    demoMode: false,
  });

  // Test 3: Demo mode (no LLM call)
  await test('Demo mode (no API key needed)', {
    message: 'Tell me about domestic violence',
    language: 'en',
    demoMode: true,
  });

  // Test 4: Crisis detection (should bypass LLM)
  await test('Crisis detection', {
    message: 'He is going to kill me tonight please help',
    language: 'en',
    demoMode: false,
  });

  console.log('\n✅ Tests complete.\n');
})();
