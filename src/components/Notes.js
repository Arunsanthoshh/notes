import React, { useState } from "react";
import "./index.css";

function NotesApp() {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('');
  const [notes, setNotes] = useState([]);
  const [filter, setFilter] = useState('All');

  const handleClick = () => {
    if (title && status) {
      setNotes([...notes, { title, status }]);
      setTitle('');
      setStatus('');
    }
  };

  const handleTabClick = (value) => {
    setFilter(value);
  };

  const filteredValues = notes.filter((item) => {
    if (filter === 'All') return true;
    if (filter === 'Completed') return item.status.toLowerCase() === 'completed';
    if (filter === 'Active') return item.status.toLowerCase() === 'active';
    return false;
  });

  return (
    <div className="layout-column align-items-center justify-content-start">
      <section className="layout-row align-items-center justify-content-center mt-30">
        <div className="input-section">
          <input
            data-testid="input-note-name"
            type="text"
            className="large mx-8"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            data-testid="input-note-status"
            type="text"
            className="large mx-8"
            placeholder="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />
          <button className="" data-testid="submit-button" onClick={handleClick}>
            Add Note
          </button>
        </div>

        <div className="mt-50" style={{ display: 'flex', justifyContent: 'center', background: 'lightGray' }}>
          <ul className="tabs">
            <li
              className={`tab-item slide-up-fade-in ${filter === 'All' ? 'active' : ''}`}
              data-testid="allButton"
              onClick={() => handleTabClick('All')}
            >
              All
            </li>
            <li
              className={`tab-item slide-up-fade-in ${filter === 'Active' ? 'active' : ''}`}
              data-testid="activeButton"
              onClick={() => handleTabClick('Active')}
            >
              Active
            </li>
            <li
              className={`tab-item slide-up-fade-in ${filter === 'Completed' ? 'active' : ''}`}
              data-testid="completedButton"
              onClick={() => handleTabClick('Completed')}
            >
              Completed
            </li>
          </ul>
        </div>
        <div className="card w-40 pt-30 pb-8" style={{ display: 'flex', justifyContent: 'center' }}>
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody data-testid="noteList">
              {filteredValues.map((item, index) => (
                <tr key={index}>
                  <td>{item.title}</td>
                  <td>{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default NotesApp;
