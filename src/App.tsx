import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppShell } from "@/components/layout/AppShell";
import { HomePage } from "@/pages/HomePage";
import { WizardPage } from "@/features/wizard/WizardPage";

export default function App() {
  return (
    <BrowserRouter>
      <AppShell>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/wizard/:presetId" element={<WizardPage />} />
        </Routes>
      </AppShell>
    </BrowserRouter>
  );
}
