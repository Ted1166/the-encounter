import express from "express";
import cors from "cors";
import { readFile, writeFile } from "fs/promises";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_FILE = path.join(__dirname, "data", "stats.json");

const app = express();
app.use(cors());
app.use(express.json());

async function readStats() {
    try {
        const raw = await readFile(DATA_FILE, "utf-8");
        return JSON.parse(raw);
    } catch {
        return {};
    }
}

async function writeStats(stats) {
    await writeFile(DATA_FILE, JSON.stringify(stats, null, 2));
}

app.post("/api/choice", async (req, res) => {
    const { scenario, nodeId, choiceId } = req.body || {};
    if (!scenario || !nodeId || !choiceId) {
        return res.status(400).json({ error: "scenario, nodeId, and choiceId are required" });
    }

    const stats = await readStats();
    stats[scenario] ??= {};
    stats[scenario][nodeId] ??= {};
    stats[scenario][nodeId][choiceId] = (stats[scenario][nodeId][choiceId] || 0) + 1;

    await writeStats(stats);
    res.json({ ok: true });
});

app.get("/api/stats/:scenario/:nodeId", async (req, res) => {
    const { scenario, nodeId } = req.params;
    const stats = await readStats();
    const choices = stats[scenario]?.[nodeId] || {};
    const total = Object.values(choices).reduce((sum, n) => sum + n, 0);
    res.json({ total, choices });
});

const PORT = process.env.PORT || 8787;
app.listen(PORT, () => console.log(`the-encounter backend listening on :${PORT}`));
