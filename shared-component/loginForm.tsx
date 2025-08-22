"use client";
import style from "./loginForm.module.scss";

type LoginFormProps = {
  onClose: () => void;
  onSwitchToSignup?: () => void;
  onLoginSuccess?: () => void;
};

export default function LoginForm({
  onClose,
  onSwitchToSignup,
  onLoginSuccess,
}: LoginFormProps) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const res = await fetch("/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      console.log("Login Response:", data);

      if (res.ok) {
        alert("Login successful!");
        onClose();
        onLoginSuccess?.(); 
      } else {
        alert(data.error || "Invalid credentials!");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Try again.");
    }
  };

  return (
    <div className={style.overlay}>
      <div className={style.loginBox}>
        <button onClick={onClose} className={style.closeBtn}>
          ✖
        </button>

        <h2 className={style.title}>Welcome Back 👋</h2>
        <p className={style.subtitle}>Please log in to continue</p>

        <form className={style.form} onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className={style.input}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className={style.input}
          />
          <button type="submit" className={style.loginBtn}>
            Login
          </button>
        </form>

        <p className={style.registerText}>
          Don’t have an account?{" "}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onSwitchToSignup?.();
            }}
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}

