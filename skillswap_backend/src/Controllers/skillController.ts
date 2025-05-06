import asyncHandler from "express-async-handler";
import { Request } from "express";
import SkillModel from "../Models/skillModel";
import UserSchema from "../Models/userModel";

// Improved type definition with more precise typing
interface CustomRequest extends Request {
    user?: {
        username: string;
        [key: string]: any;
    };
    body: {
        skillName?: string;
        [key: string]: any;
    };
    query: {
        skillName?: string;
        [key: string]: any;
    };
}

/**
 * @desc Get users with a specific skill
 * @route GET /api/skills/users?skillName=skillname
 * @access private
 */
const getSkilledUsers = asyncHandler(async (req: CustomRequest, res) => {
    const skillName = req.query.skillName as string;

    if (!skillName) {
        res.status(400).json({
            error: "Skill name is required as a query parameter"
        });
        return;
    }

    const skill = await SkillModel.findOne({ name: skillName });

    if (!skill) {
        res.status(404).json({
            error: "Skill not found"
        });
        return;
    }

    const currentUsername: string | undefined = req.user?.username;
    const filteredUsers = skill.usersHaving.filter(
        (username: string) => username !== currentUsername
    );

    res.status(200).json({
        users: {
            usersHaving: filteredUsers,
            name: skill.name
        }
    });
});






/**
 * @desc Add a skill to the current user
 * @route POST /api/skills/add
 * @access private
 */
const addSkill = asyncHandler(async (req: CustomRequest, res) => {
    const { skillName } = req.body;
    const user = req.user;
  
    if (!skillName || !user?.username) {
      res.status(400).json({ error: "Skill name and user required" });
      return;
    }
  
    let skill = await SkillModel.findOne({ name: skillName });
  
    if (!skill) {
      skill = new SkillModel({ name: skillName, usersHaving: [user.username] });
    } else if (!skill.usersHaving.includes(user.username)) {
      skill.usersHaving.push(user.username);
    }
    await skill.save();
  
    if (!user.skillshave.includes(skillName)) {
      user.skillshave.push(skillName);
    }
  
    await user.save(); // This updates DB
  
    res.status(201).json({ skill, user }); // req.user now has full, updated info
  });
  




/**
 * @desc Remove a skill from the current user
 * @route DELETE /api/skills/remove
 * @access private
 */
const removeSkill = asyncHandler(async (req: CustomRequest, res) => {
    // {
    //  skillName: ....
    // }
    const { skillName } = req.body;
    const username = req.user?.username;

    if (!skillName || !username) {
        res.status(400).json({
            error: "Skill name is required"
        });
        return;
    }

    // Find the user and skill documents
    let user = await UserSchema.findOne({ username });
    let skill = await SkillModel.findOne({ name: skillName });

    if (!user || !skill) {
        res.status(404).json({
            error: "User or skill not found"
        });
        return;
    }

    // Remove the username from the skill's usersHaving array
    skill.usersHaving = skill.usersHaving.filter((user: string) => user !== username);
    await skill.save();

    // Remove the skill from the user's skillshave array
    user.skillshave = user.skillshave.filter(s => s !== skillName);
    await user.save();

    req.user = user;

    res.status(201).json({
        message: "Skill removed successfully"
    });
});




/**
 * @desc make request to other user's for teaching skills
 * @route POST /api/skills/make_request
 * @access private
 */
const makeRequest = asyncHandler(async (req: CustomRequest, res) => {
    const { to_user, skillName } = req.body;
    const username = req.user?.username;

    if (!skillName || !username || !to_user) {
        res.status(400).json({ error: "skillName and to_user are required" });
        return;
    }

    const sender = await UserSchema.findOne({ username });
    const receiver = await UserSchema.findOne({ username: to_user });
    const skill = await SkillModel.findOne({ name: skillName });

    if (!sender || !receiver || !skill) {
        res.status(404).json({ error: "Sender, receiver, or skill not found" });
        return;
    }

    const requestObj = {
        user: to_user,
        skill: skillName,
        status: 'p',
        type: 's'
    };

    const receiverRequestObj = {
        user: username,
        skill: skillName,
        status: 'p',
        type: 'r'
    };

    if (!sender.requests.some(req => req.user === to_user && req.skill === skillName && req.type === 's')) {
        sender.requests.push(requestObj);
    }
    if (!receiver.requests.some(req => req.user === username && req.skill === skillName && req.type === 'r')) {
        receiver.requests.push(receiverRequestObj);
    }

    await sender.save();
    await receiver.save();
    req.user = sender;

    res.status(201).json({ message: "Request sent successfully" });
});





/**
 * @desc answer requests in the inbox
 * @route POST /api/skills/answer_request
 * @access private
 */
const answerRequest = asyncHandler(async (req: CustomRequest, res) => {
    const { from_user, skillName, decision } = req.body; // decision: 'a' or 'r'
    const username = req.user?.username;

    if (!from_user || !skillName || !['a', 'r'].includes(decision)) {
        res.status(400).json({ error: "Invalid request parameters" });
        return;
    }

    const receiver = await UserSchema.findOne({ username });
    const sender = await UserSchema.findOne({ username: from_user });

    if (!receiver || !sender) {
        res.status(404).json({ error: "Sender or receiver not found" });
        return;
    }

    // Update status in receiver (type 'r')
    receiver.requests = receiver.requests.map(req => {
        if (req.user === from_user && req.skill === skillName && req.type === 'r') {
            return { ...req, status: decision };
        }
        return req;
    });

    // Update status in sender (type 's')
    sender.requests = sender.requests.map(req => {
        if (req.user === username && req.skill === skillName && req.type === 's') {
            return { ...req, status: decision };
        }
        return req;
    });

    await receiver.save();
    await sender.save();
    req.user = receiver;

    res.status(201).json({ message: `Request ${decision === 'a' ? 'accepted' : 'rejected'}` });
});





export default {
    getSkilledUsers,
    addSkill,
    removeSkill,
    makeRequest,
    answerRequest
};