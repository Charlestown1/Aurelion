import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthShell from '../components/AuthShell.jsx';
import Field from '../components/Field.jsx';
import { useDemo } from '../context/DemoContext.jsx';
import { isEmail } from '../utils/validate.js';

export default function Login() {
  const { enter } = useDemo();
  const nav = useNavigate();
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [errs, setErrs] = useState({});

  const submit = (e) => {
    e.preventDefault();
    const x = {};
    if (!isEmail(email)) x.email = 'Enter a valid email address, for example name@example.com.';
    if (!pw) x.pw = 'Enter a password. Any text works in this demo.';
    setErrs(x);
    if (Object.keys(x).length) return;
    enter(); nav('/dashboard');
  };

  return (
    <AuthShell title="Log in" intro="Access the demo dashboard."
      footer={<>New here? <Link to="/register"><u>Create an account</u></Link></>}>
      <form onSubmit={submit} noValidate>
        <Field label="Email address" error={errs.email}>
          <input type="email" autoComplete="off" value={email} onChange={(e) => setEmail(e.target.value)} />
        </Field>
        <Field label="Password" error={errs.pw}>
          <input type="password" autoComplete="off" value={pw} onChange={(e) => setPw(e.target.value)} />
        </Field>
        <div className="auth-row">
          <label className="check"><input type="checkbox" /> Remember me</label>
          <button type="button" className="linkish" onClick={() => alert('Password reset is not part of this prototype.')}>Forgot password?</button>
        </div>
        <button className="btn btn-gold btn-block" type="submit">Log in to demo</button>
      </form>
      <button className="btn btn-outline btn-block" style={{ marginTop: 10 }} onClick={() => { enter(); nav('/dashboard'); }}>
        Skip and enter the demo dashboard
      </button>
      <p className="security">Security notice: a real service would use verified authentication. This screen only demonstrates the layout.</p>
    </AuthShell>
  );
}
