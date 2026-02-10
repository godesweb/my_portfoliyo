import React, { useState, useEffect, useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Moon, Sun, Code, Cpu, Palette, Globe, 
  Smartphone, Database, Github, ExternalLink, 
  Menu, X, Send, Linkedin, Twitter 
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// --- Background Particles Component ---
function ParticleBackground({ dark }) {
  const ref = useRef();
  const sphere = useMemo(() => random.inSphere(new Float32Array(5000), { radius: 1.5 }), []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 15;
      ref.current.rotation.y -= delta / 20;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color={dark ? "#818cf8" : "#4f46e5"}
          size={0.006}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.6}
        />
      </Points>
    </group>
  );
}

export default function App() {
  const [dark, setDark] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const mainRef = useRef(null);

  const skills = [
    { name: "React", icon: <Code size={22}/>, color: "text-blue-400" },
    { name: "Node.js", icon: <Cpu size={22}/>, color: "text-green-400" },
    { name: "Design", icon: <Palette size={22}/>, color: "text-pink-400" },
    { name: "Web", icon: <Globe size={22}/>, color: "text-yellow-400" },
    { name: "Mobile", icon: <Smartphone size={22}/>, color: "text-purple-400" },
    { name: "Database", icon: <Database size={22}/>, color: "text-orange-400" },
  ];

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-reveal", { y: 70, opacity: 0, duration: 1, stagger: 0.2, ease: "power4.out" });
      gsap.utils.toArray(".section-title").forEach(title => {
        gsap.from(title, {
          scrollTrigger: { trigger: title, start: "top 85%" },
          y: 30, opacity: 0, duration: 0.8
        });
      });
    }, mainRef);
    return () => ctx.revert();
  }, []);

  return (
    <main ref={mainRef} className="min-h-screen relative bg-slate-50 dark:bg-[#0a0a0a] text-slate-900 dark:text-white transition-colors duration-500 overflow-x-hidden selection:bg-indigo-500 selection:text-white">
      
      {/* --- BACKGROUND CANVAS --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <Suspense fallback={null}>
            <ParticleBackground dark={dark} />
          </Suspense>
        </Canvas>
      </div>

      {/* --- MAIN CONTENT LAYER --- */}
      <div className="relative z-10">
        
        {/* Navbar */}
        <nav className="fixed top-0 w-full z-[100] h-20 flex items-center backdrop-blur-md bg-white/40 dark:bg-[#0a0a0a]/40 border-b border-slate-200 dark:border-white/10">
          <div className="max-w-7xl mx-auto w-full px-6 flex justify-between items-center">
            <h2 className="text-2xl font-black tracking-tighter bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent italic">Rajesh Jha</h2>
            
            <div className="hidden md:flex items-center gap-8 font-medium">
              {['Skills', 'Projects', 'Contact'].map(item => (
                <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-indigo-500 transition-colors uppercase text-xs tracking-widest">{item}</a>
              ))}
              <button 
                onClick={() => setDark(!dark)} 
                className="p-2.5 rounded-full bg-slate-200 dark:bg-white/5 hover:rotate-180 transition-all duration-500"
              >
                {dark ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} />}
              </button>
            </div>

            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="h-screen flex flex-col items-center justify-center text-center px-6">
          <h1 className="hero-reveal text-6xl md:text-9xl font-black tracking-tighter mb-6 leading-none">
            Rajesh <br /> <span className="text-indigo-600 dark:text-indigo-400 drop-shadow-2xl">Kumar Jha</span>
          </h1>
          <p className="hero-reveal text-slate-500 dark:text-slate-400 text-lg md:text-xl max-w-2xl mb-10 font-medium">
            Full Stack Developer crafting visually striking & high-performance applications.
          </p>
          <div className="hero-reveal flex gap-4">
            <a href="#projects" className="h-12 px-8 flex items-center bg-indigo-600 text-white rounded-full font-bold hover:shadow-lg transition-all active:scale-95">View Projects</a>
            <a href="#contact" className="h-12 px-8 flex items-center border border-slate-300 dark:border-white/10 rounded-full font-bold hover:bg-white/10 transition-all">Contact Me</a>
          </div>
        </section>

        {/* Skills Orbit Section */}
        <section id="skills" className="py-32 relative">
          <div className="container mx-auto px-6 text-center">
            <h3 className="section-title text-4xl font-black mb-24 tracking-tighter">TECHNICAL STACK</h3>
            
            <div className="relative flex justify-center items-center h-[500px]">
              {/* Center Box */}
              <div className="z-20 w-36 h-36 rounded-full bg-indigo-600 flex items-center justify-center shadow-[0_0_80px_rgba(79,70,229,0.5)] border-4 border-white/20">
                <span className="text-white font-black text-center leading-tight uppercase tracking-tighter">My<br/>Stack</span>
              </div>

              {/* Dotted Ring */}
              <div className="absolute w-[320px] h-[320px] border border-dashed border-indigo-500/30 rounded-full animate-[spin_60s_linear_infinite]" />

              {/* Orbiting Icons */}
              <div className="hidden md:block absolute inset-0">
                {skills.map((skill, i) => (
                  <div 
                    key={i} 
                    className="orbit-wrapper"
                    style={{ 
                      animation: `orbit-rotate 25s linear infinite`,
                      animationDelay: `-${(i * (25 / skills.length))}s` 
                    }}
                  >
                    <div className="icon-card group">
                      <div className="p-5 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 shadow-2xl group-hover:scale-125 group-hover:border-indigo-500 transition-all">
                        <span className={skill.color}>{skill.icon}</span>
                      </div>
                      <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-[10px] px-3 py-1 rounded font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {skill.name}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mobile Grid */}
              <div className="md:hidden grid grid-cols-3 gap-6 z-10">
                {skills.map((skill, i) => (
                  <div key={i} className="flex flex-col items-center gap-2 p-4 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10">
                    <span className={skill.color}>{skill.icon}</span>
                    <span className="text-[10px] font-bold">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-32 px-6 max-w-7xl mx-auto">
          <h3 className="section-title text-4xl font-black mb-16 tracking-tighter uppercase">Featured Work</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {[1, 2].map((p) => (
              <div key={p} className="group relative rounded-[2.5rem] bg-white/5 backdrop-blur-xl border border-white/10 overflow-hidden hover:border-indigo-500/50 transition-all duration-500 shadow-2xl">
                <div className="h-80 bg-indigo-500/5 flex items-center justify-center overflow-hidden">
                   <div className="w-full h-full bg-gradient-to-br from-indigo-500/20 to-purple-500/10 group-hover:scale-110 transition-transform duration-700 flex items-center justify-center">
                      <Code size={60} className="text-indigo-500 opacity-20" />
                   </div>
                </div>
                <div className="p-10">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-2xl font-black uppercase tracking-tighter">Project Alpha {p}</h4>
                    <div className="flex gap-4 text-slate-400">
                      <Github size={20} className="hover:text-indigo-500 transition-colors" />
                      <ExternalLink size={20} className="hover:text-indigo-500 transition-colors" />
                    </div>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 mb-6">A high-performance digital solution focused on user experience and real-time data visualization.</p>
                  <div className="flex gap-2">
                    {['React', 'GSAP', 'Three.js'].map(tag => (
                      <span key={tag} className="text-[10px] font-bold px-3 py-1 bg-indigo-500/10 text-indigo-500 rounded-full">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-32 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="section-title text-4xl font-black mb-6 uppercase tracking-tighter">Let's Work Together</h3>
            <p className="text-slate-500 dark:text-slate-400 mb-12">I'm currently available for freelance work and full-time roles.</p>
            
            <div className="p-8 md:p-12 rounded-[3rem] bg-white/80 dark:bg-white/5 backdrop-blur-xl shadow-2xl border border-slate-200 dark:border-white/10 text-left">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Name</label>
                  <input type="text" className="w-full bg-slate-100 dark:bg-white/5 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition-all" placeholder="Rajesh Jha" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Email</label>
                  <input type="email" className="w-full bg-slate-100 dark:bg-white/5 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition-all" placeholder="rajesh@example.com" />
                </div>
              </div>
              <div className="space-y-2 mb-8">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Message</label>
                <textarea rows="5" className="w-full bg-slate-100 dark:bg-white/5 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none" placeholder="Tell me about your project..."></textarea>
              </div>
              <button className="group w-full h-14 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-indigo-700 transition-all flex items-center justify-center gap-3 active:scale-95 shadow-lg shadow-indigo-500/30">
                Send Message <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 border-t border-slate-200 dark:border-white/5 px-6 text-center">
          <p className="text-sm text-slate-500 font-medium italic">© 2026 RAJESH.JHA • Created with React & Three.js</p>
        </footer>

      </div>

      {/* Mobile Nav Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[200] bg-white/95 dark:bg-[#0a0a0a]/95 backdrop-blur-xl flex flex-col items-center justify-center gap-10">
          <button className="absolute top-6 right-6 p-2 bg-slate-100 dark:bg-white/5 rounded-full" onClick={() => setIsMenuOpen(false)}><X size={32}/></button>
          {['Skills', 'Projects', 'Contact'].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setIsMenuOpen(false)} className="text-5xl font-black uppercase tracking-tighter hover:text-indigo-500 transition-all">{item}</a>
          ))}
        </div>
      )}

      {/* Orbit & Animation CSS */}
      <style>{`
        .orbit-wrapper { position: absolute; width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; }
        .icon-card { position: absolute; top: -30px; animation: counter-rotate 25s linear infinite; animation-delay: inherit; }
        @keyframes orbit-rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes counter-rotate { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </main>
  );
}