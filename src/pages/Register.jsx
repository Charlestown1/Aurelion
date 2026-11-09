import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthShell from '../components/AuthShell.jsx';
import Field from '../components/Field.jsx';
import { useDemo } from '../context/DemoContext.jsx';
import { COUNTRIES } from '../data/demo.js';
import { isEmail } from '../utils/validate.js';

export default function Register() {
  const { enter } = useDemo();
  const nav = useNavigate();
  const [f, setF] = useState({ name: '', email: '', pw: '', pw2: '', country: '', ref: '', terms: false });
  const [errs, setErrs] = useState({});
  const set = (k) => (e) => setF({ ...f, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value });

  const submit = (e) => {
    e.preventDefault();
    const x = {};
    if (f.name.trim().length < 2) x.name = 'Enter your full name.';
    if (!isEmail(f.email)) x.email = 'Enter a valid email address.';
    if (f.pw.length < 8) x.pw = 'Use at least 8 characters.';
    if (f.pw2 !== f.pw) x.pw2 = 'The passwords do not match.';
    if (!f.country) x.country = 'Choose your country.';
    if (!f.terms) x.terms = 'Accept the demo terms to continue.';
    setErrs(x);
    if (Object.keys(x).length) return;
    enter(); nav('/dashboard');
  };

  return (
    <AuthShell title="Create an account" intro="Registration is a demonstration. No account is created."
      footer={<>Already registered? <Link to="/login"><u>Log in</u></Link></>}>
      <form onSubmit={submit} noValidate>
        <Field label="Full name" error={errs.name}><input value={f.name} onChange={set('name')} autoComplete="off" /></Field>
        <Field label="Email address" error={errs.email}><input type="email" value={f.email} onChange={set('email')} autoComplete="off" /></Field>
        <Field label="Password" error={errs.pw}><input type="password" value={f.pw} onChange={set('pw')} autoComplete="off" /></Field>
        <Field label="Confirm password" error={errs.pw2}><input type="password" value={f.pw2} onChange={set('pw2')} autoComplete="off" /></Field>
        <Field label="Country" error={errs.country}>
          <select value={f.country} onChange={set('country')}>
            <option value="">Select a country</option>
            {COUNTRIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </Field>
        <Field label="Referral code (optional)"><input value={f.ref} onChange={set('ref')} autoComplete="off" /></Field>
        <label className="check"><input type="checkbox" checked={f.terms} onChange={set('terms')} /> I understand this is a demonstration and no real account or funds are involved.</label>
        {errs.terms && <small className="error">{errs.terms}</small>}
        <button className="btn btn-gold btn-block" type="submit" style={{ marginTop: 16 }}>Create demo account</button>
      </form>
    </AuthShell>
  );
}
