import { Link } from "react-router-dom";
import { BackdropPageShell, SiteFooter } from "../../components/site";

export default function RoleChoicePage() {
  return (
    <>
      <BackdropPageShell background="registrazione.png">
        <div className="w-full max-w-[400px]">
          <h3 className="mb-[2%] ml-[14%] font-oxygen text-[2.5rem] font-bold leading-none text-black">Registrati</h3>
          <h5 className="ml-[16%] font-ubuntu text-[1.15rem] text-slate-800">come candidato o azienda</h5>
          <div className="mb-12 ml-[5.4%] mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              className="inline-flex flex-1 items-center justify-center rounded-xl border-[3px] border-brand-mint bg-brand-mint px-4 py-3 text-sm font-bold text-brand-ink transition hover:bg-white"
              to="/registrati/candidato/1"
            >
              candidato
            </Link>
            <Link
              className="inline-flex flex-1 items-center justify-center rounded-xl border-[3px] border-brand-violet bg-brand-violet px-4 py-3 text-sm font-bold text-white transition hover:bg-white hover:text-brand-ink"
              to="/registrati/azienda/1"
            >
              azienda
            </Link>
          </div>
          <h6 className="ml-[7%] mt-6 font-ubuntu text-[1rem] font-bold text-black">
            hai gia un account?{" "}
            <Link className="text-brand-violet transition hover:text-brand-violet-800 hover:underline" to="/accedi">
              accedi
            </Link>
          </h6>
        </div>
      </BackdropPageShell>
      <SiteFooter className="mt-0" />
    </>
  );
}
