// Performance testing script
import { performance } from 'perf_hooks';

async function testSearchPerformance() {
  console.log("⚡ Testing Search Performance...\n");
  
  const testQueries = [
    "quick vegetarian tapas",
    "seafood paella for beginners", 
    "nut-free 20 minute recipes",
    "traditional Spanish potato dish",
    "paella valenciana with chicken"
  ];
  
  const results = [];
  
  for (const query of testQueries) {
    console.log(`Testing: "${query}"`);
    
    const startTime = performance.now();
    
    try {
      const response = await fetch('http://localhost:3001/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      });
      
      const data = await response.json();
      const endTime = performance.now();
      const latency = endTime - startTime;
      
      results.push({
        query,
        latency,
        resultCount: data.results?.length || 0,
        success: response.ok
      });
      
      console.log(`✅ ${latency.toFixed(0)}ms - ${data.results?.length || 0} results`);
      
    } catch (error) {
      const endTime = performance.now();
      const latency = endTime - startTime;
      
      results.push({
        query,
        latency,
        resultCount: 0,
        success: false,
        error: error.message
      });
      
      console.log(`❌ ${latency.toFixed(0)}ms - Error: ${error.message}`);
    }
  }
  
  // Calculate statistics
  const latencies = results.map(r => r.latency);
  const avgLatency = latencies.reduce((a, b) => a + b, 0) / latencies.length;
  const minLatency = Math.min(...latencies);
  const maxLatency = Math.max(...latencies);
  const successRate = (results.filter(r => r.success).length / results.length) * 100;
  
  console.log("\n📊 Performance Results:");
  console.log(`Average Latency: ${avgLatency.toFixed(0)}ms`);
  console.log(`Min Latency: ${minLatency.toFixed(0)}ms`);
  console.log(`Max Latency: ${maxLatency.toFixed(0)}ms`);
  console.log(`Success Rate: ${successRate.toFixed(1)}%`);
  
  // Performance benchmarks
  if (avgLatency < 500) {
    console.log("🎉 Excellent performance!");
  } else if (avgLatency < 1000) {
    console.log("👍 Good performance");
  } else if (avgLatency < 2000) {
    console.log("⚠️ Acceptable performance, room for improvement");
  } else {
    console.log("❌ Poor performance, needs optimization");
  }
  
  return results;
}

// Run performance test
testSearchPerformance().catch(console.error);
