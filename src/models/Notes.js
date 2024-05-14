import { Schema, model, models } from "mongoose";

const NotesSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

export const Notes = models?.Notes || model("Notes", NotesSchema);
