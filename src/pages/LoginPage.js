import React from 'react';

function LoginPage() {
  return (
    <div>
      <div>
        <label htmlFor="email">
          <input
            id="email"
            type="text"
            data-testid="email-input"
            placeholder="Username"
          />
          <label htmlFor="senha">
            <input
              id="senha"
              type="password"
              data-testid="password-input"
              placeholder="Password"
            />
          </label>
          <button
            type="button"
            data-testid="login-submit-btn"
          >
            Login
          </button>
        </label>
      </div>
    </div>
  );
}

export default LoginPage;
