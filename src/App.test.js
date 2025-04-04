// Make sure jest and @testing-library/react are installed
// npm install --save-dev @testing-library/react jest


import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";
import { jwtDecode } from "jwt-decode";
import CapstoneApi from "./api";

// Mock API and jwtDecode
jest.mock("./api", () => ({
  login: jest.fn(),
  register: jest.fn(),
  setToken: jest.fn(),
}));

jest.mock("jwt-decode", () => ({
  jwtDecode: jest.fn(),
}));

beforeEach(() => {
  localStorage.clear();
});

describe("App Component", () => {
  test("renders welcome page", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/welcome/i)).toBeInTheDocument();
  });

  test("renders login page when no user is logged in", () => {
    render(
      <MemoryRouter initialEntries={["/login"]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText(/username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
  });

  test("logs in a user successfully", async () => {
    const mockToken = "mockToken123";
    const mockUser = { username: "testuser123", id: 1 };

    CapstoneApi.login.mockResolvedValue({ token: mockToken });
    jwtDecode.mockReturnValue(mockUser);

    render(
      <MemoryRouter initialEntries={["/login"]}>
        <App />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/username/i), {
      target: { value: "testuser123" },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByText(/log in/i));

    await waitFor(() => {
      expect(CapstoneApi.login).toHaveBeenCalledWith({
        username: "testuser123",
        password: "password123",
      });
    });

    await waitFor(() => {
      expect(screen.getByText(/news sources/i)).toBeInTheDocument();
    });
  });

  test("shows profile page when logged in", async () => {
    const mockToken = "mockToken123";
    const mockUser = { username: "testuser123", id: 1 };

    localStorage.setItem("token", mockToken);
    jwtDecode.mockReturnValue(mockUser);

    render(
      <MemoryRouter initialEntries={["/profile"]}>
        <App />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/profile/i)).toBeInTheDocument();
    });
  });

  test("logs out user", async () => {
    localStorage.setItem("token", "mockToken123");

    render(
      <MemoryRouter initialEntries={["/profile"]}>
        <App />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText(/log out/i));

    await waitFor(() => {
      expect(screen.getByPlaceholderText(/username/i)).toBeInTheDocument();
    });

    expect(localStorage.getItem("token")).toBeNull();
  });

  test("shows 404 page for unknown routes", () => {
    render(
      <MemoryRouter initialEntries={["/unknown-route"]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText(/404/i)).toBeInTheDocument();
    expect(screen.getByText(/hmmm. i can't seem to find the page/i)).toBeInTheDocument();
  });
});
