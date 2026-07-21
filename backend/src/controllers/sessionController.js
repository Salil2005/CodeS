import { populate } from "dotenv";
import { chatClient, streamClient } from "../lib/stream.js";
import Session from "../models/Session.js";

export async function createSession(req, res) {
  try {
    const { problem, difficulty } = req.body;
    const userId = req.user._id;
    const clerkId = req.user.clerkId;

    if (!problem || !difficulty) {
      return res
        .status(400)
        .json({ message: "Problem and Difficulty are required" });
    }

    // generate call and video id

    const callId = `session_${Date.now()}_${Math.random().toString(36).substring(7)}`;

    //create session in db
    const session = await Session.create({
      problem,
      difficulty,
      host: userId,
      callId,
    });

    // create video call
    const call = streamClient.video.call("default", callId);
    await call.getOrCreate({
      data: {
        created_by_id: clerkId,
        custom: { problem, difficulty, sessionId: session._id.toString() },
      },
    });

    // chat messaging
    const chatChannel = chatClient.channel("messaging", callId, {
      name: `${problem} Session`,
      created_by_id: clerkId,
      members: [clerkId],
    });

    await chatChannel.create();
    res.status(201).json({ session });
  } catch (error) {
    console.log("Error in createSession controller:", error.message);
    res.status(500).json({ message: "Internal server issues" });
  }
}

export async function getActiveSessions(req, res) {
  try {
    const sessions = await Session.find({ status: "Active" })
      .populate("host", "name profileImage clerkId")
      .sort({ createdAt: -1 })
      .limit(20);

    res.status(200).json({ sessions });
  } catch (error) {
    console.log("Error in geting Active sessions", error.message);
    res.status(500).json({ message: "Internal server issues" });
  }
}

export async function getMyRecentSessions(req, res) {
  try {
    const userId = req.user._id;

    const sessions = await Session.find({
      status: "Completed",
      $or: [{ host: userId }, { participant: userId }],
    })
      .sort({ createdAt: -1 })
      .limit(20);

    res.status(200).json({ sessions });
  } catch (error) {
    console.log("Error in geting recent sessions", error.message);
    res.status(500).json({ message: "Internal server issues" });
  }
}

export async function getSessionById(req, res) {
  try {
    const { id } = req.params;

    const session = await Session.findById(id)
      .populate("host", "name profileImage email clerkId")
      .populate("participant", "name profileImage email clerkId");

    if (!session) {
      return res.status(404).json({ message: "session not found" });
    }

    res.status(200).json(session);
  } catch (error) {
    console.log("Error in geting session", error.message);
    res.status(500).json({ message: "Internal server issues" });
  }
}

export async function joinSession(req, res) {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    const clerkId = req.user.clerkId;

    const session = await session.findById(id);

    if (!session) {
      return res.ststus(404).json({ message: "session not found" });
    }

    if (session.status !== "active") {
      return res
        .status(400)
        .json({ message: "Cannot join a completed session" });
    }

    if (session.host.toString() === userId.toString()) {
      return res
        .status(400)
        .json({ message: "Host cannot join their own session as participant" });
    }

    // check session is already full
    if (session.participant) {
      return res.ststus(409).json({ message: "session is full" });
    }

    const channel = chatClient.channel("messaging", session.callId);
    await channel.addMembers([clerkId]);
    res.status(200).json({ session });
  } catch (error) {
    console.log("Error in joining session", error.message);
    res.status(500).json({ message: "Internal server issues" });
  }
}
export async function endSession(req, res) {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const session = await session.findById(id);

    if (!session) {
      return res.ststus(404).json({ message: "session not found" });
    }

    if (session.host.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Only host can end the session" });
    }
    if (session.host.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Only host can end the session" });
    }
    if (session.status == "Completed") {
      return res.status(400).json({ message: "Session is already completed" });
    }

    // delete chat and video call
    const call = streamClient.video.call("default", session.callId);
    await call.delete({ hard: true });

    const chat = chatClient.channel("messaging", session.callId);
    await chat.delete();

    session.status = "Completed";
    await session.save();

    res.status(200).json({ message: "Session ended successfully" });
  } catch (error) {
    console.log("Error in ending session", error.message);
    res.status(500).json({ message: "Internal server issues" });
  }
}
