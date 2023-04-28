// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import mongoose from "mongoose";
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/database";
import { Entry, IEntry } from "@/models";

type Data = { message: string } | IEntry;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id } = req.query;

  if (!mongoose.isValidObjectId(id)) {
    res.status(400).json({
      message: `id is not valid: ${id}`,
    });
  }

  switch (req.method) {
    case "GET":
      return getEntry(req, res);
    case "PUT":
      return updateEntry(req, res);
    case "DELETE":
      return deleteEntry(req, res);

    default:
      res.status(400).json({
        message: `Method dont exist`,
      });
  }
}

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;

  await db.connect();

  const entryToUpdate = await Entry.findById(id);

  if (!entryToUpdate) {
    await db.disconnect();
    return res.status(400).json({
      message: `There isn't an entry with that id: ${id}`,
    });
  }

  const {
    description = entryToUpdate.description,
    status = entryToUpdate.status,
  } = req.body;

  try {
    const updatedEntry = await Entry.findByIdAndUpdate(
      id,
      { description, status },
      { runValidators: true, new: true }
    );
    await db.disconnect();
    res.status(200).json(updatedEntry!);
  } catch (error: any) {
    await db.disconnect();
    return res.status(400).json({
      message: /* error.errors.status.message */ "bad request",
    });
  }
};

const getEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;

  await db.connect();
  const currentEntry = await Entry.findById(id);
  await db.disconnect();

  if (!currentEntry) {
    return res.status(400).json({
      message: `There isn't an entry with that id ${id}`,
    });
  }

  res.status(200).json(currentEntry);
};

const deleteEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;

  await db.connect();
  const currentEntry = await Entry.findById(id);
  await db.disconnect();

  if (!currentEntry) {
    return res.status(400).json({
      message: `There isn't an entry with that id ${id}`,
    });
  }

  try {
    await Entry.findByIdAndDelete(id);
    await db.disconnect();
    res.status(200).json({ message: 'Entry has been deleted'});
  } catch (error: any) {
    await db.disconnect();
    return res.status(400).json({
      message: /* error.errors.status.message */ "bad request",
    });
  }
};
