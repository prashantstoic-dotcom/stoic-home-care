/**
 * Enterprise Core Web Vitals: INP (Interaction to Next Paint) Optimizer
 * 
 * INP measures how quickly the page responds to user clicks/inputs.
 * If the main thread is blocked by a "Long Task" (JS executing for > 50ms), 
 * the user experiences lag. We must "yield" to the main thread.
 */

// 1. Yielding to Main Thread Helper
// Uses modern scheduler.yield() if available, falls back to MessageChannel or setTimeout
function yieldToMain() {
    if ('scheduler' in globalThis && 'yield' in scheduler) {
        return scheduler.yield();
    }
    
    // Fallback for older browsers (faster than setTimeout(0))
    return new Promise(resolve => {
        const { port1, port2 } = new MessageChannel();
        port1.onmessage = resolve;
        port2.postMessage(null);
    });
}

/**
 * 2. Breaking up a Heavy Long Task
 * Example: Processing 10,000 items (e.g., filtering a huge list or formatting data)
 * Instead of doing it in one massive loop (which blocks the thread for 500ms),
 * we process it in chunks and yield back to the browser in between.
 */
async function processLargeDataChunked(items) {
    console.log("Starting heavy processing...");
    let processedData = [];
    
    // Process in chunks of 500 to keep task duration under 50ms
    const CHUNK_SIZE = 500;
    
    for (let i = 0; i < items.length; i += CHUNK_SIZE) {
        const chunk = items.slice(i, i + CHUNK_SIZE);
        
        // Do the heavy work for this chunk
        for (const item of chunk) {
            processedData.push(heavyFormatLogic(item));
        }

        // YIELD TO MAIN THREAD!
        // This allows the browser to paint updates, handle button clicks, 
        // and keeps the INP score in the "Good" range (< 200ms).
        await yieldToMain();
    }
    
    console.log("Finished heavy processing without blocking INP!");
    return processedData;
}

function heavyFormatLogic(item) {
    // Simulate CPU intensive work
    return item * 2;
}

// 3. Debouncing/Throttling Event Listeners
// Preventing layout thrashing and main thread blocking on scroll/resize
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Example usage: window.addEventListener('resize', debounce(handleResize, 100));

module.exports = { yieldToMain, processLargeDataChunked, debounce };
