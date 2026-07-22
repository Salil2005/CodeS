import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { ENV } from "../lib/env.js";

const router = express.Router();

router.post("/", protectRoute, async (req, res) => {
  try {
    const pistonUrl = ENV.PISTON_API_URL || "https://emkc.org/api/v2/piston";
    const headers = {
      "Content-Type": "application/json",
    };

    if (ENV.PISTON_API_KEY) {
      headers.Authorization = `Bearer ${ENV.PISTON_API_KEY}`;
    }

    const response = await fetch(`${pistonUrl}/execute`, {
      method: "POST",
      headers,
      body: JSON.stringify(req.body),
    });

    const payload = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: payload?.message || "Piston API request failed.",
      });
    }

    return res.json(payload);
  } catch (error) {
    console.error("Error proxying Piston execute request:", error);
    return res.status(500).json({
      error: "Failed to execute code on the server.",
    });
  }
});

export default router;
