import mongoose from "mongoose";

const BlockSchema = new mongoose.Schema({
    text: {
      type: String,
      required: true,
    },
    showInOption: {
      type: Boolean,
      required: true,
    },
    isAnswer: {
      type: Boolean,
      required: true,
    },
  });

  const AnagramSchema = new mongoose.Schema({
    type: {
      type: String,
      required: true,
      enum: ['ANAGRAM'],
    },
    anagramType: {
      type: String,
      required: true,
      enum: ['WORD'],
    },
    blocks: {
      type: [BlockSchema],
      required: true,
    },
    siblingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Anagram',
      required: true,
    },
    solution: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  });
  
  // module.exports = mongoose.model('Anagram', AnagramSchema);
  export const Question = mongoose.model('questions', AnagramSchema);