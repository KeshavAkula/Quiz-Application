
import Questions from "../models/questionSchema.js";
import Results from "../models/resultSchema.js";
import questions, { answers } from '../database/data.js';
/*export async function getQuestions(req, res) {
    try {
        const q = await Questions.find();
        res.json(q)
    } catch (error) {
        res.json({ error })
    }
}*/
export async function getQuestions(req, res) {
  try {
    const allQuestions = await Questions.find().sort({ id: 1 });
    const questions = allQuestions.map(q => ({
      id: q.id,
      question: q.question,
      options: q.options
    }));
    const answers = allQuestions.map(q => q.answer);

    res.status(200).json([{ questions, answers }]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function insertQuestions(req, res) {
  try {
    const { questions, answers } = req.body;

    // Combine questions and answers using same index
    const data = questions.map((q, index) => ({
      id: q.id,
      question: q.question,
      options: q.options,
      answer: answers[index]
    }));

    for (let item of data) {
      await Questions.findOneAndUpdate(
        { id: item.id },
        item,
        { upsert: true, new: true } // create if not exists
      );
    }

    res.status(201).json({ message: "Questions inserted/updated successfully!" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}


/** insert all questions
export async function insertQuestions(req, res) {
  try {
    const { questions, answers } = req.body;

    await Questions.create({ questions, answers });
    res.status(201).json({ message: 'Questions added successfully!' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
 
export async function insertQuestions(req, res) {
  try {
    const { questions, answers } = req.body;

    // Assuming a single document holds all questions
    let existingDoc = await Question.findOne();

    if (!existingDoc) {
      // Create new document if none exists
      await Question.create({ questions, answers });
    } else {
      const id = questions[0].id;

      // Replace question and answer at the specified id
      existingDoc.questions[id] = questions[0];
      existingDoc.answers[id] = answers[0];

      await existingDoc.save();
    }

    res.status(200).json({ msg: 'Question saved/updated successfully!' });
  } catch (error) {
    res.status(500).json({ error });
  }
}**/


export async function dropQuestions(req, res) {
  try {
    const result = await Questions.deleteMany({});
    res.status(200).json({ msg: `Deleted questions succesfully.` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


export async function getResult(req, res) {
  try {
    const results = await Results.find();
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function storeResult(req, res) {
  try {
    const { username, result, attempts, points, achived } = req.body;
    if (!username || !result) {
      throw new Error('Data Not Provided...!');
    }

    const data = await Results.create({ username, result, attempts, points, achived });

    res.status(200).json({ msg: "Result Saved Successfully...!", data });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function dropResult(req, res) {
  try {
    const result = await Results.deleteMany();
    res.status(200).json({ msg: `Deleted ${result.deletedCount} result(s) successfully.` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
