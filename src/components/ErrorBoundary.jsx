import { Component } from 'react';

// Shows the real error on screen instead of a blank page.
export default class ErrorBoundary extends Component {
  state = { error: null };
  static getDerivedStateFromError(error) { return { error }; }
  render() {
    if (!this.state.error) return this.props.children;
    return (
      <div style={{ padding: 24, fontFamily: 'system-ui, sans-serif', maxWidth: 560, margin: '0 auto' }}>
        <h1 style={{ fontSize: 22 }}>Something went wrong on this page</h1>
        <p>Reload to try again. If it keeps happening, send this message to the developer:</p>
        <pre style={{ whiteSpace: 'pre-wrap', background: '#F2F0EC', padding: 12, fontSize: 13 }}>
          {String(this.state.error?.stack || this.state.error).slice(0, 700)}
        </pre>
        <button onClick={() => window.location.assign('/')} style={{ padding: '12px 20px', fontSize: 16 }}>Back to home</button>
      </div>
    );
  }
}
