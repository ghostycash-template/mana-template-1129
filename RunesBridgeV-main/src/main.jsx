import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store.js";

//added this

import { createAppKit } from "@reown/appkit/react";

import { WagmiProvider } from "wagmi";
import { baseSepolia, mainnet, sepolia } from "@reown/appkit/networks";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";

// 0. Setup queryClient
const queryClient = new QueryClient();

// 1. Get projectId from https://cloud.reown.com
const projectId = "61f529aa30c77838f2502740d05202ad";

// 2. Create a metadata object - optional
const metadata = {
  name: "AppKit",
  description: "AppKit Example",
  url: "https://web3modal.com", // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/179229932"],
};

export const networks = [mainnet];

// 3. Create Wagmi Adapter
const wagmiAdapter = new WagmiAdapter({
  ssr: true,
  networks,
  projectId,
});
//  bsc, base, polygon,blast, bscTestnet
// 4. Create modal
createAppKit({
  adapters: [wagmiAdapter],
  networks: networks,
  metadata,
  projectId,
  features: {
    analytics: true, // Optional - defaults to your Cloud configuration
  },
});

export function AppKitProvider({ children }) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}

//added this stops
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AppKitProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </AppKitProvider>
    </BrowserRouter>
  </StrictMode>
);
