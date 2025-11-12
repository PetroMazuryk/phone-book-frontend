import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { loginUser } from '../../redux/auth/operations';
import { RootState, AppDispatch } from '../../redux/store';
import icon from '../../assets/sprite.svg';
import styles from '../../components/RegisterForm/RegisterForm.module.css';

const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch() as AppDispatch;
  const { loading, error } = useAppSelector((state: RootState) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    try {
      await dispatch(loginUser({ email, password })).unwrap();
      setEmail('');
      setPassword('');
    } catch (err) {}
  };

  return (
    <div className={styles.registerPage}>
      <form className={styles.registerCard} onSubmit={handleSubmit} noValidate>
        <h2 className={styles.title}>Login</h2>

        <label className={styles.field}>
          <span className={styles.labelText}>Email</span>
          <input
            className={styles.input}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@example.com"
            autoComplete="email"
          />
        </label>

        <label className={`${styles.field} ${styles.passwordField}`}>
          <span className={styles.labelText}>Password</span>
          <div className={styles.inputWrapper}>
            <input
              className={styles.input}
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password"
              autoComplete="current-password"
            />
            <button
              type="button"
              className={styles.eyeBtn}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              onClick={() => setShowPassword((s) => !s)}
            >
              <svg className={styles.icon} aria-hidden="true">
                <use
                  xlinkHref={`${icon}${
                    showPassword ? '#icon-eye-off' : '#icon-eye'
                  }`}
                />
              </svg>
            </button>
          </div>
        </label>

        {error && <div className={styles.error}>{error}</div>}

        <button className={styles.submitBtn} type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
