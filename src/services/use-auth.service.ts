import { useState, useEffect, useCallback } from "react";
import { Account } from "../types/account.type";

/**
 * A custom React hook that handles user authentication.
 *
 * This hook provides a simple interface for authenticating a user and managing the
 * authentication state. It returns an object with the following properties:
 *
 * - `isLoading`: a boolean indicating whether the authentication process is in progress.
 * - `account`: an `Account` object representing the authenticated user, or `null` if the user is not authenticated.
 * - `error`: a string containing an error message if the authentication process failed, or `null` if there was no error.
 * - `isSuccess`: a boolean indicating whether the authentication process was successful.
 *
 * The hook uses a mock authentication process that simulates a 1.5-second delay before returning a mock `Account` object.
 */

export const useAuth = ({
  simulateLoggedIn,
}: { simulateLoggedIn?: boolean } = {}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [account, setAccount] = useState<Account | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const authenticateUser = useCallback(async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const mockAccount: Account = {
        id: "123456",
        name: "John Doe",
        email: "john.doe@example.com",
      };

      if (!simulateLoggedIn) {
        throw new Error("Authentication failed");
      }

      setAccount(mockAccount);
      setIsSuccess(true);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Authentication failed");
      setIsSuccess(false);
      setAccount(null);
    } finally {
      setIsLoading(false);
    }
  }, [simulateLoggedIn]);

  useEffect(() => {
    authenticateUser();
  }, [authenticateUser, simulateLoggedIn]);

  return { isLoading, account, error, isSuccess };
};
