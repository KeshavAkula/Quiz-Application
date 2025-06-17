import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Admin.css';

export default function AdminForm() {
  const [form, setForm] = useState({
    id: '',
    question: '',
    options: ['', '', '', ''],
    answer: '',
  });



  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...form.options];
    updatedOptions[index] = value;
    setForm(prev => ({ ...prev, options: updatedOptions }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = {
      questions: [
        {
          id: Number(form.id),
          question: form.question,
          options: form.options
        }
      ],
      answers: [Number(form.answer)]
    };

    try {
      await axios.post(`${process.env.REACT_APP_SERVER_HOSTNAME}/api/questions`, dataToSend);
      alert('Question submitted successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to submit question.');
    }
  };

 

  return (
    <form onSubmit={handleSubmit} className="admin-form">
      <h2>Admin - Add Quiz Question</h2>

      <label>ID:</label>
      <input type="number" name="id" value={form.id} onChange={handleChange} required />

      <label>Question:</label>
      <textarea name="question" value={form.question} onChange={handleChange} required />

      <label>Options:</label>
      {form.options.map((opt, i) => (
        <input
          key={i}
          type="text"
          placeholder={`Option ${i + 1}`}
          value={opt}
          onChange={(e) => handleOptionChange(i, e.target.value)}
          required
        />
      ))}

      <label>Correct Answer (Index 0-3):</label>
      <input
        type="number"
        name="answer"
        min="0"
        max="3"
        value={form.answer}
        onChange={handleChange}
        required
      />

      <button type="submit">Submit Question</button>
    </form>
  );
}
