import type { Context, MiddlewareHandler } from "hono";

// Placeholder for wallet authentication
// This will be expanded later with actual wallet authentication logic

type WalletAuth = {
  address: string | null;
  isAuthenticated: boolean;
};

declare module "hono" {
  interface ContextVariableMap {
    walletAuth: WalletAuth;
  }
}

export const getAuth = (c: Context) => {
  const walletAuth = c.get("walletAuth");
  return walletAuth;
};

export const getWalletAddress = (c: Context) => {
  const auth = getAuth(c);
  if (!auth?.address) {
    throw new Error("Unauthorized");
  }
  return auth.address;
};

export const auth = (): MiddlewareHandler => {
  return async (c, next) => {
    // This is a placeholder implementation
    // In a real implementation, you would verify the wallet signature from the request

    // For now, we'll just check if there's an Authorization header
    const authHeader = c.req.header("Authorization");

    const walletAuth: WalletAuth = {
      address: authHeader ? "0x0000000000000000000000000000000000000000" : null,
      isAuthenticated: !!authHeader,
    };

    c.set("walletAuth", walletAuth);

    await next();
  };
};

export const requireAuth: MiddlewareHandler = async (c, next) => {
  const auth = getAuth(c);
  if (!auth?.isAuthenticated) {
    return c.text("Unauthorized", 401);
  }
  await next();
};
