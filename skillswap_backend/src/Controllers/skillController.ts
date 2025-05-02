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
 * @access public
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

    res.status(200).json({
        users: skill
    });
});

/**
 * @desc Add a skill to the current user
 * @route POST /api/skills/add
 * @access private
 */
const addSkill = asyncHandler(async (req: CustomRequest, res) => {
    const { skillName } = req.body;
    const username = req.user?.username;

    if (!skillName || !username) {
        res.status(400).json({ error: "Skill name and user required" });
        return;
    }

    let skill = await SkillModel.findOne({ name: skillName });

    if (!skill) {
        skill = new SkillModel({ name: skillName, usersHaving: [username] });
    } else if (!skill.usersHaving.includes(username)) {
        skill.usersHaving.push(username);
    }
    await skill.save();

    // saving skill in user db
    let user = await UserSchema.findOne({ username });
    if (!user) {
        res.status(400).json({
            error: "User not found"
        });
        return;
    }

    if (!user.skillshave.includes(skillName)) {
        user.skillshave.push(skillName);
    }
    await user.save();

    res.status(200).json({ skill, user });
});

/**
 * @desc Express interest in learning a skill
 * @route POST /api/skills/want
 * @access private
 */
const wantSkill = asyncHandler(async (req: CustomRequest, res) => {
    const { skillName } = req.body;
    const username = req.user?.username;

    if (!skillName || !username) {
        res.status(400).json({ error: "Skill name and user required" });
        return;
    }

    let skill = await SkillModel.findOne({ name: skillName });

    if (!skill) {
        skill = new SkillModel({ name: skillName, usersWantToLearn: [username] });
    } else if (!skill.usersWantToLearn.includes(username)) {
        skill.usersWantToLearn.push(username);
    }
    await skill.save();

    // Also update the user's wanted skills
    let user = await UserSchema.findOne({ username });
    if (!user) {
        res.status(400).json({
            error: "User not found"
        });
        return;
    }

    if (!user.skillswant.includes(skillName)) {
        user.skillswant.push(skillName);
    }
    await user.save();

    res.status(200).json({ skill, user });
});

/**
 * @desc Remove a skill from the current user
 * @route DELETE /api/skills/remove
 * @access private
 */
const removeSkill = asyncHandler(async (req: CustomRequest, res) => {
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

    res.status(200).json({
        message: "Skill removed successfully"
    });
});

/**
 * @desc Remove a wanted skill from the current user
 * @route DELETE /api/skills/unwant
 * @access private
 */
const removeSkillWanted = asyncHandler(async (req: CustomRequest, res) => {
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

    // Remove the username from the skill's usersWantToLearn array
    skill.usersWantToLearn = skill.usersWantToLearn.filter((user: string) => user !== username);
    await skill.save();

    // Remove the skill from the user's skillswant array
    user.skillswant = user.skillswant.filter(s => s !== skillName);
    await user.save();

    res.status(200).json({
        message: "Skill removed from wishlist successfully"
    });
});

export default {
    getSkilledUsers,
    addSkill,
    wantSkill,
    removeSkill,
    removeSkillWanted
};