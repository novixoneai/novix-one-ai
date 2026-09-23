import { BrowserRouter, Route, Routes } from "react-router-dom";
import MarketingDemo from "./pages/marketing-demo";
import MarketingDemoES from "./pages/marketing-demo-es";
import LawOffices from "./pages/law-offices";
import DatabaseReactivation from "./pages/database-reactivation";
import BlogMissedCalls from "./pages/blog/missed-calls-cost";
import BlogAIvsVA from "./pages/blog/ai-vs-virtual-assistant";
import BlogLawFirmPhone from "./pages/blog/law-firm-phone-answering";
import DesignKitDemo from "./pages/_design";
import NotFound from "./pages/not-found";
import { ThemeProvider } from "@/components/theme-provider";

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/_design" element={<DesignKitDemo />} />
          <Route path="/blog/missed-calls-cost" element={<BlogMissedCalls />} />
          <Route path="/blog/ai-vs-virtual-assistant" element={<BlogAIvsVA />} />
          <Route path="/blog/law-firm-phone-answering" element={<BlogLawFirmPhone />} />
          <Route path="/law-offices" element={<LawOffices />} />
          <Route path="/database-reactivation" element={<DatabaseReactivation />} />
          <Route path="/es" element={<MarketingDemoES />} />
          <Route path="/" element={<MarketingDemo />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
