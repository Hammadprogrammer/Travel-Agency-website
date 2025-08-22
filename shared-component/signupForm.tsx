"use client";
import style from "./loginForm.module.scss";

type SignupFormProps = {
  onClose: () => void;
  onSwitchToLogin?: () => void;
};

export default function SignupForm({ onClose, onSwitchToLogin }: SignupFormProps) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("/api/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Signup successful!");
        onClose();
        onSwitchToLogin?.(); 
      } else {
        alert(data.error);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Try again.");
    }
  };

  return (
    <div className={style.overlay}>
      <div className={style.loginBox}>
        <button onClick={onClose} className={style.closeBtn}>✖</button>

        <h2 className={style.title}>Create an Account ✨</h2>
        <p className={style.subtitle}>Please sign up to get started</p>

        <form className={style.form} onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Full Name" required className={style.input} />
          <input type="email" name="email" placeholder="Email" required className={style.input} />
          <input type="password" name="password" placeholder="Password" required className={style.input} />
          <input type="password" name="confirmPassword" placeholder="Confirm Password" required className={style.input} />
          <button type="submit" className={style.loginBtn}>Sign Up</button>
        </form>

        <p className={style.registerText}>
          Already have an account?{" "}
          <a href="#" onClick={(e) => { e.preventDefault(); onSwitchToLogin?.(); }}>
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
