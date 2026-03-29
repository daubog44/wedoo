import { BackdropPageShell, FormPageContent, SiteFooter } from "../../components/site";
import { loginForm } from "../../data/forms";

export default function LoginPage() {
  return (
    <>
      <BackdropPageShell background={loginForm.background}>
        <FormPageContent config={loginForm} />
      </BackdropPageShell>
      <SiteFooter className="mt-0" />
    </>
  );
}
