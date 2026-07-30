import { useState, FormEvent } from "react";
import { PricingPlan } from "../types";
import { X, ShieldCheck, Mail, User, Watch, CreditCard, Rocket, CheckCircle2, QrCode } from "lucide-react";

interface CheckoutModalProps {
  plan: PricingPlan;
  onClose: () => void;
}

type CheckoutStep = "fill" | "processing" | "success";

export default function CheckoutModal({ plan, onClose }: CheckoutModalProps) {
  const [step, setStep] = useState<CheckoutStep>("fill");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [device, setDevice] = useState("Firestick");
  const [paymentMethod, setPaymentMethod] = useState("Credit Card");

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    m3uUrl: "",
    portalUrl: "http://auraserve.xyz:8080"
  });

  const handleCheckoutSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email || !name) {
      alert("Please fill in all required fields to continue.");
      return;
    }

    setStep("processing");

    setTimeout(() => {
      const randUser = "user_" + Math.random().toString(36).substring(2, 7);
      const randPass = Math.random().toString(36).substring(2, 9);
      setCredentials({
        username: randUser,
        password: randPass,
        m3uUrl: `http://auraserve.xyz:8080/get.php?username=${randUser}&password=${randPass}&output=ts`,
        portalUrl: "http://auraserve.xyz:8080/c/"
      });
      setStep("success");
    }, 2800);
  };

  const finalPrice = paymentMethod === "Crypto" ? (plan.price * 0.95).toFixed(2) : plan.price.toFixed(2);

  return (
    <div className="fixed inset-0 z-50 bg-[#111211]/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">

      <div className="bg-[#FDFDF7] border-2 border-neutral-900 rounded-[2.5rem] w-full max-w-lg overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.4)] relative animate-in zoom-in-95 duration-200 text-left">

        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-neutral-900/5 transition-colors border border-neutral-900/10"
          aria-label="Sluiten"
        >
          <X className="w-4 h-4 text-neutral-800" />
        </button>

        {/* Step 1: Form */}
        {step === "fill" && (
          <form onSubmit={handleCheckoutSubmit} className="p-6 md:p-8">
            <span className="text-[#003580] text-[10px] font-bold font-mono uppercase tracking-widest bg-[#003580]/5 px-3 py-1 rounded-full">
              Secure Checkout v3.1
            </span>
            <h3 className="text-2xl font-black text-neutral-900 mt-4">
              Complete your order
            </h3>
            <p className="text-xs text-neutral-500 mt-1">
              Select your device and start your IPTV Premium subscription instantly.
            </p>

            <div className="mt-5 bg-neutral-900/5 p-4 rounded-2xl border border-neutral-900/5 flex justify-between items-center">
              <div>
                <span className="text-[10px] uppercase font-mono font-bold text-neutral-400">Selected Plan</span>
                <p className="text-sm font-extrabold text-neutral-900">{plan.name} • {plan.durationMonths} mo</p>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase font-mono font-bold text-neutral-400">Total Price</span>
                <p className="text-lg font-black text-[#003580]">{plan.price} €</p>
              </div>
            </div>

            <div className="mt-6 space-y-4">

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1.5 flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-[#003580]" />
                  <span>Full name</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. John Smith"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white border border-neutral-300 rounded-xl py-2.5 px-3.5 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-neutral-950 focus:ring-1 focus:ring-neutral-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1.5 flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-[#003580]" />
                  <span>Email address (for instant delivery)</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white border border-neutral-300 rounded-xl py-2.5 px-3.5 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-neutral-950 focus:ring-1 focus:ring-neutral-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                  Device / Receiver
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {["Firestick", "Smart TV", "Apple TV", "Android Box", "M3U / Playlist"].map((dev) => (
                    <button
                      key={dev}
                      type="button"
                      onClick={() => setDevice(dev)}
                      className={`py-2 px-3 rounded-lg text-xs font-semibold border transition-all ${
                        device === dev
                          ? "bg-[#003580] text-white border-[#003580]"
                          : "bg-white border-neutral-200 text-neutral-700 hover:bg-neutral-50"
                      }`}
                    >
                      {dev}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1.5 flex items-center justify-between">
                  <span>Payment method</span>
                  <span className="text-[10px] text-[#003580] font-mono font-bold tracking-tight">🪙 Crypto saves 5%</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {["Credit / Debit Card", "PayPal Express", "Cryptocurrency", "Apple/Google Pay"].map((pm) => {
                    const mappedMethod = pm === "Cryptocurrency" ? "Crypto" : pm;
                    return (
                      <button
                        key={pm}
                        type="button"
                        onClick={() => setPaymentMethod(mappedMethod)}
                        className={`p-3 rounded-xl border flex flex-col justify-between text-left transition-all ${
                          paymentMethod === mappedMethod
                            ? "bg-[#003580]/10 border-[#003580] ring-1 ring-[#003580]"
                            : "bg-white border-neutral-200 text-neutral-700 hover:bg-neutral-50"
                        }`}
                      >
                        <span className="text-xs font-bold">{pm}</span>
                        <span className="text-[9px] text-neutral-400 font-mono mt-0.5">
                          {mappedMethod === "Crypto" ? (plan.price * 0.95).toFixed(2) + " €" : plan.price.toFixed(2) + " €"}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

            <div className="mt-8">
              <button
                type="submit"
                className="w-full bg-[#003580] border-[1.5px] border-[#003580] text-white py-3.5 rounded-xl text-xs font-black uppercase tracking-wider hover:bg-[#002468] transition-all shadow-[0_3px_0_#001040] active:translate-y-0.5 active:shadow-none flex items-center justify-center gap-2"
              >
                <span>Authorise secure payment {finalPrice} €</span>
                <Rocket className="w-3.5 h-3.5" />
              </button>

              <p className="text-[10px] text-neutral-400 text-center mt-3 flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#003580]" />
                <span>SSL-encrypted checkout. 24-hour satisfaction guarantee.</span>
              </p>
            </div>

          </form>
        )}

        {/* Step 2: Processing */}
        {step === "processing" && (
          <div className="p-12 text-center flex flex-col items-center justify-center min-h-[350px]">
            <div className="relative w-16 h-16 mb-6">
              <div className="absolute inset-0 border-4 border-neutral-200 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-t-[#003580] border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
            </div>

            <h4 className="text-lg font-black text-neutral-900">
              Generating your secure credentials...
            </h4>
            <p className="text-xs text-neutral-500 mt-2 max-w-sm">
              We are verifying your payment via 3D-Secure and activating your "{device}" device for your new IPTV Premium stream.
            </p>

            <div className="mt-6 text-[10px] font-mono text-neutral-400 bg-neutral-900/5 px-4 py-2 rounded-lg">
              TRANSAKTIO-ID: IPTV_{Math.random().toString(36).substring(7).toUpperCase()}
            </div>
          </div>
        )}

        {/* Step 3: Success */}
        {step === "success" && (
          <div className="p-6 md:p-8">
            <div className="text-center flex flex-col items-center mb-5">
              <div className="w-12 h-12 bg-[#003580]/10 rounded-full flex items-center justify-center text-[#003580] mb-3">
                <CheckCircle2 className="w-6 h-6 stroke-[2.5]" />
              </div>
              <h4 className="text-xl font-extrabold text-neutral-900">
                Setup complete!
              </h4>
              <p className="text-xs text-neutral-500 mt-1">
                A detailed setup guide has been sent to <span className="font-semibold text-neutral-900">{email}</span>.
              </p>
            </div>

            <div className="bg-[#111211] text-white p-5 rounded-2xl border border-neutral-800 space-y-3 font-mono text-2s">
              <div className="border-b border-neutral-800 pb-2 flex justify-between items-center">
                <span className="text-neutral-400 uppercase tracking-widest text-[9px] font-bold">Login Credentials</span>
                <span className="text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#003580]/40 border border-[#003580]/30">🟢 Active Connection</span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-neutral-400">Username:</span>
                <span className="text-white font-bold">{credentials.username}</span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-neutral-400">Password:</span>
                <span className="text-white font-bold">{credentials.password}</span>
              </div>

              <div className="pt-2 border-t border-neutral-800 space-y-1">
                <span className="text-neutral-400 block text-[10px]">M3U Live Playlist URL:</span>
                <div className="bg-black p-2 rounded text-[10px] text-neutral-300 break-all leading-tight select-all cursor-pointer hover:bg-neutral-950 transition-colors">
                  {credentials.m3uUrl}
                </div>
              </div>

              <div className="pt-1.5 space-y-1">
                <span className="text-neutral-400 block text-[10px]">Xtream Codes Portal URL:</span>
                <div className="bg-black p-2 rounded text-[10px] text-neutral-300 break-all select-all cursor-pointer">
                  {credentials.portalUrl}
                </div>
              </div>
            </div>

            <div className="mt-5 p-4 rounded-xl bg-[#003580]/5 border border-[#003580]/10 text-xs">
              <p className="font-bold text-[#003580]">How to watch on your {device}:</p>
              <ol className="list-decimal pl-4.5 mt-1 text-neutral-600 space-y-1">
                <li>Download <span className="font-bold">IPTV Smarters Pro</span> or <span className="font-bold">Tivimate</span> from your app store.</li>
                <li>Enter the login credentials shown above.</li>
                <li>Press Connect and enjoy uninterrupted premium TV!</li>
              </ol>
            </div>

            <button
              onClick={onClose}
              className="mt-6 w-full py-3 bg-neutral-900 hover:bg-neutral-800 text-[#FCFBF4] rounded-xl text-xs font-bold transition-all uppercase tracking-wider text-center"
            >
              Close & Start Streaming
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
