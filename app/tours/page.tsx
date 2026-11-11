"use client";

import { useState } from "react";
import Image from "next/image";
import { MapPin, Clock, CheckCircle, MessageCircle } from "lucide-react";
import { openWhatsApp, buildTourEnquiry } from "@/lib/whatsapp";
import { TOUR_PACKAGES, type TourPackage } from "@/lib/data";

const TOUR_CATS = ["All", "Pilgrimage", "City Tour", "Hill Station", "Nature", "Beach"] as const;

export default function ToursPage() {
  const [active, setActive] = useState("All");
  const [customForm, setCustomForm] = useState({
    name: "", phone: "", destination: "", passengers: "", date: "", message: "",
  });

  const set = (k: string, v: string) => setCustomForm(p => ({ ...p, [k]: v }));
  const filtered = active === "All" ? TOUR_PACKAGES : TOUR_PACKAGES.filter(t => t.category === active);

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    openWhatsApp(
      `🌟 *VASU CAR TRAVELS – Custom Tour Request*\n\n👤 *Name:* ${customForm.name}\n📞 *Phone:* ${customForm.phone}\n📍 *Destination:* ${customForm.destination}\n👥 *Passengers:* ${customForm.passengers}\n📅 *Date:* ${customForm.date}\n📝 *Details:* ${customForm.message}\n\nPlease suggest a suitable package & pricing. Thank you!`
    );
  };

  const inputCls = "w-full px-4 py-3 border border-white/15 bg-white/8 text-white placeholder-white/40 rounded-lg text-sm focus:outline-none focus:border-white/50 focus:bg-white/12 transition-all";

  return (
    <div className="animate-fade-up">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#071020] to-[#1A2F5E] pt-32 pb-20 text-center">
        <div className="max-w-7xl mx-auto px-6">
          <span className="text-xs font-bold tracking-[2px] uppercase text-[#FFB3BE]">Explore</span>
          <h1 className="font-['Playfair_Display'] text-5xl font-extrabold text-white mt-3 mb-4">Tours & Travel Packages</h1>
          <p className="text-white/65 text-lg max-w-xl mx-auto leading-relaxed">
            Carefully curated South India tour packages for families, pilgrims, and corporate groups.
          </p>
        </div>
      </section>

      {/* Filter */}
      <div className="sticky top-[72px] z-30 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-3.5 flex gap-2 overflow-x-auto scrollbar-none">
          {TOUR_CATS.map(cat => (
            <button key={cat} onClick={() => setActive(cat)}
              className={`px-5 py-2 rounded-full text-sm font-semibold border shrink-0 transition-all cursor-pointer ${
                active === cat ? "bg-[#0D1B3E] border-[#0D1B3E] text-white" : "bg-white border-gray-200 text-gray-600 hover:border-[#0D1B3E] hover:text-[#0D1B3E]"
              }`}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Tour Cards */}
      <section className="py-14 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {filtered.map((tour: TourPackage) => (
              <article key={tour.id}
                className="group bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col overflow-hidden">
                <div className="relative overflow-hidden aspect-[16/10]">
                  <Image src={tour.image} alt={tour.title} fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,33vw" loading="lazy" />
                  <span className="absolute top-3 left-3 px-3 py-1 bg-[#C8102E] text-white text-[11px] font-bold rounded-full">
                    {tour.category}
                  </span>
                  <span className="absolute top-3 right-3 flex items-center gap-1 px-3 py-1 bg-black/60 text-white text-[11px] font-semibold rounded-full">
                    <Clock size={11} /> {tour.duration}
                  </span>
                </div>

                <div className="p-6 flex flex-col gap-4 flex-1">
                  <h3 className="text-lg font-bold text-gray-900">{tour.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <MapPin size={13} className="text-[#C8102E]" /> {tour.distance}
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">{tour.description}</p>

                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-2">Highlights</p>
                    <ul className="flex flex-col gap-1.5">
                      {tour.highlights.slice(0, 3).map(h => (
                        <li key={h} className="flex items-center gap-2 text-sm text-gray-700">
                          <CheckCircle size={13} className="text-[#C8102E] shrink-0" /> {h}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-2">Available Vehicles</p>
                    <div className="flex flex-wrap gap-1.5">
                      {tour.vehicleOptions.map(v => (
                        <span key={v} className="text-[11px] font-semibold px-2.5 py-1 bg-[#0D1B3E]/7 text-[#0D1B3E] rounded-full">{v}</span>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => openWhatsApp(buildTourEnquiry(tour.title, tour.duration))}
                    className="mt-auto flex items-center justify-center gap-2 py-3 bg-[#25D366] hover:bg-[#1DB954] text-white font-semibold rounded-lg transition-all hover:shadow-lg cursor-pointer">
                    <MessageCircle size={15} /> Enquire via WhatsApp
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Package */}
      <section className="py-20 bg-[#0D1B3E]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Text */}
            <div>
              <span className="text-xs font-bold tracking-[2px] uppercase text-[#FFB3BE]">Personalized</span>
              <h2 className="font-['Playfair_Display'] text-4xl font-extrabold text-white mt-3 mb-4">
                Need a Custom Tour Package?
              </h2>
              <p className="text-white/65 leading-relaxed mb-4">
                Can't find exactly what you're looking for? We'll build a personalized tour package tailored to your destination, group size, budget, and travel dates.
              </p>
              <p className="text-white/65 leading-relaxed mb-8">
                From weekend getaways to extended South India road trips — we plan everything so you can sit back and enjoy.
              </p>
              <ul className="flex flex-col gap-3">
                {["Any destination across South India","Group sizes from 1 to 100+","Budget-friendly to luxury options","Airport pickups & hotel arrangements"].map(i=>(
                  <li key={i} className="flex items-center gap-3 text-sm text-white/75">
                    <CheckCircle size={16} className="text-[#25D366] shrink-0" /> {i}
                  </li>
                ))}
              </ul>
            </div>

            {/* Form */}
            <form onSubmit={handleCustomSubmit}
              className="bg-white/7 border border-white/12 rounded-2xl p-8 flex flex-col gap-5">
              <p className="text-white font-bold text-lg mb-1">Request a Custom Package</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-white/60 uppercase tracking-wider">Your Name</label>
                  <input required value={customForm.name} onChange={e=>set("name",e.target.value)} placeholder="Full Name" className={inputCls} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-white/60 uppercase tracking-wider">Phone</label>
                  <input required type="tel" value={customForm.phone} onChange={e=>set("phone",e.target.value)} placeholder="+91 XXXXX XXXXX" className={inputCls} />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-white/60 uppercase tracking-wider">Destination(s)</label>
                <input required value={customForm.destination} onChange={e=>set("destination",e.target.value)} placeholder="e.g. Ooty, Kodaikanal" className={inputCls} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-white/60 uppercase tracking-wider">Passengers</label>
                  <select required value={customForm.passengers} onChange={e=>set("passengers",e.target.value)} className={inputCls + " appearance-none"}>
                    <option value="">Select</option>
                    {["1-4","5-7","8-12","13-20","21-45","46+"].map(o=><option key={o}>{o}</option>)}
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-white/60 uppercase tracking-wider">Travel Date</label>
                  <input required type="date" value={customForm.date} onChange={e=>set("date",e.target.value)} className={inputCls} />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-white/60 uppercase tracking-wider">Special Requirements</label>
                <textarea value={customForm.message} onChange={e=>set("message",e.target.value)}
                  placeholder="Any special needs, preferred stops, budget range..." rows={3}
                  className={inputCls + " resize-none"} />
              </div>
              <button type="submit"
                className="flex items-center justify-center gap-2 py-4 bg-[#25D366] hover:bg-[#1DB954] text-white font-bold rounded-lg transition-all hover:-translate-y-0.5 hover:shadow-lg cursor-pointer">
                <MessageCircle size={18} /> Send via WhatsApp
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

