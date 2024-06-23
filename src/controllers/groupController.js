import Group from "../models/Group.js";
import User from "../models/User.js";

export async function createGroup(req, res) {
  const group = new Group(req.body);
  try {
    await group.save();
    res.status(201).send(group);
  } catch (error) {
    res.status(400).send(error);
  }
}

export async function joinGroup(req, res) {
  try {
    const group = await Group.findById(req.params.groupId);
    group.members.push(req.user._id);
    await group.save();
    res.send(group);
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function leaveGroup(req, res) {
  try {
    const group = await Group.findById(req.params.groupId);
    group.members = group.members.filter(
      (member) => member.toString() !== req.user._id.toString()
    );
    await group.save();
    res.send(group);
  } catch (error) {
    res.status(500).send(error);
  }
}
