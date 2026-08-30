import express, {Application} from "express";
import dotenv from "dotenv";
import authRoutes from "./modules/auth/auth.routes";
import conversationRoutes from "./modules/conversation/conversation.routes";
import aiRoutes from "./ai/ai.routes";
import legalRoutes from "./modules/legal/legal.routes";
import queueTestRoutes from "./queue/queue.test.routes";


dotenv.config();

const app: Application = express()

app.use(express.json());
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/conversations", conversationRoutes);
app.use("/api/v1/ai", aiRoutes);
app.use("/api/v1/legal", legalRoutes);
app.use("/api/v1/queue", queueTestRoutes);


export default app;