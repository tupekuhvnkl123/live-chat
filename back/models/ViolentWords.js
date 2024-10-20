import mongoose from "mongoose";

const violentWordsSchema = new mongoose.Schema({
  name: { type: String, required: true, default: "violent-words" },
  list: { type: [String], required: true },
});

const ViolentWords = mongoose.model("violent-words", violentWordsSchema);

export default ViolentWords;
