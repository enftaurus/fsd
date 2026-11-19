import React, { Component } from 'react';

// React Class Component
class MessageDisplay extends Component {
  constructor(props) {
    super(props);

    // Initializing state in constructor
    this.state = {
      message: 'Welcome to Full Stack Development Lab!',
      author: 'Default System',
      updatedCount: 0,
      themeColor: '#2563eb'
    };

    // Binding event handlers to 'this'
    this.handleChangeMessage = this.handleChangeMessage.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  // Method to update state using this.setState()
  handleChangeMessage(newMessage, author, color) {
    this.setState((prevState) => ({
      message: newMessage,
      author: author,
      updatedCount: prevState.updatedCount + 1,
      themeColor: color
    }));
  }

  handleReset() {
    this.setState({
      message: 'Welcome to Full Stack Development Lab!',
      author: 'Default System',
      updatedCount: 0,
      themeColor: '#2563eb'
    });
  }

  // Render method returns JSX
  render() {
    const { message, author, updatedCount, themeColor } = this.state;

    return (
      <div style={{ maxWidth: '600px', margin: '50px auto', padding: '30px', background: 'white', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', textAlign: 'center', fontFamily: 'sans-serif' }}>
        <h2 style={{ color: '#1e3a8a' }}>React Class Component</h2>
        <p style={{ color: '#64748b' }}>SET-6 Question 1: Displaying Message Using State in Class Component</p>

        {/* Message Display Box */}
        <div style={{
          margin: '30px 0',
          padding: '24px',
          background: '#f8fafc',
          borderRadius: '8px',
          borderLeft: `6px solid ${themeColor}`,
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
        }}>
          <h3 style={{ color: themeColor, margin: '0 0 10px', fontSize: '1.4rem' }}>
            "{message}"
          </h3>
          <p style={{ color: '#64748b', fontStyle: 'italic', margin: '4px 0' }}>
            &mdash; {author}
          </p>
          <small style={{ color: '#94a3b8' }}>
            State updates count: <strong>{updatedCount}</strong>
          </small>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={() => this.handleChangeMessage('Knowledge is power, keep coding!', 'Francis Bacon', '#10b981')}
            style={{ padding: '10px 16px', background: '#10b981', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Quote 1
          </button>
          <button
            onClick={() => this.handleChangeMessage('First, solve the problem. Then, write the code.', 'John Johnson', '#8b5cf6')}
            style={{ padding: '10px 16px', background: '#8b5cf6', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Quote 2
          </button>
          <button
            onClick={() => this.handleChangeMessage('Simplicity is the soul of efficiency.', 'Austin Freeman', '#f59e0b')}
            style={{ padding: '10px 16px', background: '#f59e0b', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Quote 3
          </button>
          <button
            onClick={this.handleReset}
            style={{ padding: '10px 16px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Reset
          </button>
        </div>
      </div>
    );
  }
}

export default MessageDisplay;
