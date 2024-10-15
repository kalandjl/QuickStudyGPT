// Start servers

import serveApi from "./routes/api.ts";
import serveAuth from "./routes/auth.ts";

// API server (gpt functions)
serveApi()

// Auth server 
serveAuth()