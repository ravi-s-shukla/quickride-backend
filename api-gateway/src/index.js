import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import cors from "cors";

const app = express();
const allowedOrigins = ["http://localhost:3000"];
app.use(cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
}));

// Route requests to the right service
app.use("/api/rider", createProxyMiddleware({ target: "http://rider-service:3001", changeOrigin: true,   pathRewrite: { "^/api/rider": "" }})); // rider-service act as localhost inside a docker private network you can name of the service as localhost
app.use("/api/captain", createProxyMiddleware({ target: "http://captain-service:3002", changeOrigin: true,  pathRewrite: { "^/api/captain": "" }}));
app.use("/api/ride", createProxyMiddleware({ target: "http://ride-service:3003", changeOrigin: true, pathRewrite: { "^/api/ride": "" }}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", (req, res) => {
    res.send("API Gateway...");
});

// Gateway listening
app.listen(8080, () => console.log("API Gateway running on port 8080"));
