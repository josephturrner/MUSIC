import { useState } from 'react';

const Chat = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [rows, setRows] = useState(1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Send the input text to the backend API
    const response = await fetch('/api/llm', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ inputText }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      setOutputText(data);
    } else {
      setOutputText("An error occurred.");
    }
  };

  const handleInputChange = (e) => {
    const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize); // Usually 16px
    const lineHeightRem = 1.5; // For example, if line height is 1.5rem
    const lineHeight = rootFontSize * lineHeightRem; // Convert 1.5rem to pixels

    const maxRows = 15;
    setInputText(e.target.value);

    // Reset height to auto to allow shrinking when text is removed
    e.target.rows = 1;
    
    // Calculate new rows based on scrollHeight
    const newRows = Math.min(Math.floor(e.target.scrollHeight / lineHeight), maxRows);
    setRows(newRows);

    // Set the textarea's rows to the calculated new rows
    e.target.rows = newRows;
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center bg-white rounded-lg w-full h-auto px-[0.5rem] mx-auto shadow-md">
      <textarea
        value={inputText}
        onChange={handleInputChange}
        placeholder="Ask about music..."
        className="flex-grow focus:outline-none text-spotify-black p-2 rounded-l-lg"
        rows={rows}
        style={{
          resize: 'none', // Prevents user from manually resizing
          overflowY: rows >= 15 ? 'auto' : 'hidden', // Adds scroll only after max rows
        }}
      />
      <button
        type="submit"
        className="bg-spotify-black text-white rounded-full hover:bg-spotify-green h-[2rem] w-[2rem] flex items-center justify-center"
      >
        ↑
      </button>
    </form>
  );
};

export default Chat;
