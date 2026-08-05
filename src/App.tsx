import { BrowserRouter, Route, Routes } from "react-router-dom";
import MarketingDemo from "./pages/marketing-demo";
import MarketingDemoES from "./pages/marketing-demo-es";
import DesignKitDemo from "./pages/_design";
import { ThemeProvider } from "@/components/theme-provider";

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/_design" element={<DesignKitDemo />} />
          <Route path="/es" element={<MarketingDemoES />} />
          <Route path="/" element={<MarketingDemo />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
