import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

/** Custom Hook */
import { useFetchQestion } from '../hooks/FetchQuestion';
import { updateResult } from '../hooks/setResult';

export default function Questions({ onChecked }) {
  const dispatch = useDispatch();

  const { trace, queue } = useSelector(state => state.questions);
  const result = useSelector(state => state.result.result);
  const question = queue[trace]; // current question

  const [{ isLoading, serverError }] = useFetchQestion();

  const [checked, setChecked] = useState(undefined);

  // Set the selected option from Redux when the trace changes
  useEffect(() => {
    setChecked(result[trace]); // sync local state with Redux
  }, [trace, result]);

  // When user selects an option
  function onSelect(i) {
    setChecked(i); // update local state
    dispatch(updateResult({ trace, checked: i })); // update Redux state
    if (onChecked) onChecked(i);
  }

  if (isLoading) return <h3 className='text-light'>Loading...</h3>;
  if (serverError) return <h3 className='text-light'>{serverError || "Unknown error"}</h3>;
  if (!question) return <h3 className='text-light'>No question found.</h3>;

  return (
    <div className="questions">
      <h2 className="text-light">{question?.question}</h2>

      <ul key={question?.id}>
        {question?.options.map((option, i) => (
          <li key={i}>
            <input
              type="radio"
              id={`q${i}-option`}                  // ✅ Backticks used
              name="options"
              value={i}
              checked={checked === i}
              onChange={() => onSelect(i)}
            />
            <label className="text-primary" htmlFor={`q${i}-option`}>  {/* ✅ Backticks used */}
              {option}
            </label>
            <div className={`check ${checked === i ? 'checked' : ''}`}></div> {/* ✅ Fixed */}
          </li>
        ))}
      </ul>
    </div>
  );
}







