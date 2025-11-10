import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { registerUser } from '../../redux/auth/operations';
import { RootState, AppDispatch } from '../../redux/store';
import icon from '../../assets/sprite.svg';
import styles from './RegisterForm.module.css';

const RegisterForm: React.FC = () => {
  const dispatch = useAppDispatch() as AppDispatch;
  const { loading, error } = useAppSelector((state: RootState) => state.auth);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) return;

    try {
      await dispatch(registerUser({ name, email, password })).unwrap();
      setName('');
      setEmail('');
      setPassword('');
    } catch (err) {}
  };

  return (
    <div className={styles.registerPage}>
      <form className={styles.registerCard} onSubmit={handleSubmit} noValidate>
        <h2 className={styles.title}>Registration</h2>

        <label className={styles.field}>
          <span className={styles.labelText}>Name</span>
          <input
            className={styles.input}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
            autoComplete="name"
          />
        </label>

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
              placeholder="min. 6 characters"
              autoComplete="new-password"
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
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
