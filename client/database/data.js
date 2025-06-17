const questions = [
  {
    id: 1,
    question: "Javascript is an _______ language",
    options: ["Object-Oriented", "Object-Based", "Procedural", "Structural"],
  },
  {
    id: 2,
    question: "Following methods can be used to display data in some form using Javascript",
    options: ["document.write()", "console.log()", "window.alert()", "document.open()"],
  },
  {
    id: 3,
    question: "When an operator value is NULL, the typeof returned by the unary operator is:",
    options: ["Boolean", "Undefined", "Object", "Integer"],
  },
  {
    id: 4,
    question: "What does the toString() method return?",
    options: ["Return Object", "Return String", "Return Integer", "Return Boolean"],
  },
  {
    id: 5,
    question: "Which function is used to serialize an object into a JSON string?",
    options: ["stringify()", "parse()", "convert()", "change()"],
  },
];

const answers = [0, 1, 2, 1, 0];

export default questions;
export { answers };