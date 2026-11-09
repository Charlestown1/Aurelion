import Logo from './Logo.jsx';

export default function AuthShell({ title, intro, children, footer }) {
  return (
    <section className="auth">
      <div className="auth-card">
        <Logo />
        <h1>{title}</h1>
        <p className="lead">{intro}</p>
        <p className="demo-note">Demonstration only. Nothing you type is checked, stored or sent. Do not enter a real password.</p>
        {children}
        <p className="auth-foot">{footer}</p>
      </div>
    </section>
  );
}
