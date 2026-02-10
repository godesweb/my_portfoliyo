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
        <PointMaterial transparent color={dark ? "#818cf8" : "#4f46e5"} size={0.006} sizeAttenuation={true} depthWrite={false} opacity={0.4} />
      </Points>
    </group>
  );
}

export default function App() {
  const [dark, setDark] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const mainRef = useRef(null);

  const skills = [
    { name: "React", icon: <Code size={20}/>, color: "text-blue-400" },
    { name: "Node", icon: <Cpu size={20}/>, color: "text-green-400" },
    { name: "Design", icon: <Palette size={20}/>, color: "text-pink-400" },
    { name: "Web", icon: <Globe size={20}/>, color: "text-yellow-400" },
    { name: "App", icon: <Smartphone size={20}/>, color: "text-purple-400" },
    { name: "DB", icon: <Database size={20}/>, color: "text-orange-400" },
  ];

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  return (
    <main ref={mainRef} className="min-h-screen relative bg-slate-50 dark:bg-[#0a0a0a] text-slate-900 dark:text-white transition-colors duration-500 overflow-x-hidden selection:bg-indigo-500 selection:text-white">
      
      {/* BACKGROUND */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <Suspense fallback={null}>
            <ParticleBackground dark={dark} />
          </Suspense>
        </Canvas>
      </div>

      <div className="relative z-10">
        {/* NAVBAR */}
        <nav className="fixed top-0 w-full z-[100] h-16 md:h-20 flex items-center backdrop-blur-lg bg-white/40 dark:bg-[#0a0a0a]/40 border-b border-slate-200 dark:border-white/10 px-4 md:px-10">
          <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
            <h2 className="text-xl md:text-2xl font-black bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent italic">RAJESH.JHA</h2>
            <div className="flex items-center gap-4">
              <button onClick={() => setDark(!dark)} className="p-2 md:p-2.5 rounded-full bg-indigo-500/10 dark:bg-white/5 border border-indigo-500/20">
                {dark ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} />}
              </button>
              <button className="md:hidden p-2" onClick={() => setIsMenuOpen(true)}><Menu size={24} /></button>
              <div className="hidden md:flex gap-6 text-xs font-bold uppercase tracking-widest">
                <a href="#skills" className="hover:text-indigo-500">Skills</a>
                <a href="#projects" className="hover:text-indigo-500">Projects</a>
                <a href="#contact" className="hover:text-indigo-500">Contact</a>
              </div>
            </div>
          </div>
        </nav>

        {/* HERO - Optimized Space */}
        <section className="min-h-[90vh] flex flex-col items-center justify-center text-center px-6 pt-20">
          <h1 className="text-5xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-4 leading-[0.9]">
            RAJESH <br /> <span className="text-indigo-600 dark:text-indigo-400">KUMAR JHA</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-base md:text-xl max-w-xl mb-8">
            Full Stack Developer specializing in high-end digital experiences.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#projects" className="px-6 py-3 bg-indigo-600 text-white rounded-full font-bold text-sm shadow-lg active:scale-95 transition-all">Projects</a>
            <a href="#contact" className="px-6 py-3 border border-slate-300 dark:border-white/10 rounded-full font-bold text-sm hover:bg-white/10 transition-all">Hire Me</a>
          </div>
        </section>

        {/* SKILLS ORBIT - Fully Responsive */}
        <section id="skills" className="py-20 md:py-32 relative overflow-hidden">
          <h3 className="text-3xl md:text-4xl font-black text-center mb-16 md:mb-24 tracking-tighter uppercase">Stack</h3>
          <div className="relative flex justify-center items-center h-[350px] md:h-[500px]">
            {/* Center Box */}
            <div className="z-20 w-24 h-24 md:w-36 md:h-36 rounded-full bg-indigo-600 flex items-center justify-center shadow-2xl border-2 md:border-4 border-white/20">
              <span className="text-white font-black text-center text-xs md:text-sm">MY<br/>STACK</span>
            </div>
            {/* Dotted Ring */}
            <div className="absolute w-[250px] h-[250px] md:w-[320px] md:h-[320px] border border-dashed border-indigo-500/30 rounded-full animate-[spin_40s_linear_infinite]" />
            {/* Orbiting Icons */}
            <div className="absolute inset-0">
              {skills.map((skill, i) => (
                <div key={i} className="orbit-wrapper" style={{ animationDelay: `-${(i * (20 / skills.length))}s` }}>
                  <div className="icon-card group">
                    <div className="p-3 md:p-5 rounded-xl md:rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl transition-all">
                      <span className={`${skill.color}`}>{skill.icon}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROJECTS - Grid Layout */}
        <section id="projects" className="py-20 px-6 max-w-7xl mx-auto">
          <h3 className="text-3xl md:text-4xl font-black mb-12 tracking-tighter uppercase">Featured</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
            {[1, 2].map((p) => (
              <div key={p} className="group rounded-[2rem] bg-white/5 backdrop-blur-md border border-white/10 overflow-hidden hover:border-indigo-500/50 transition-all">
                <div className="h-60 md:h-80 bg-indigo-500/5 flex items-center justify-center">
                  <Code size={40} className="text-indigo-500 opacity-20 group-hover:scale-150 transition-transform duration-700" />
                </div>
                <div className="p-6 md:p-10">
                  <h4 className="text-xl md:text-2xl font-black uppercase">Project {p}</h4>
                  <p className="text-slate-500 dark:text-slate-400 my-4 text-sm md:text-base leading-relaxed">Modern web architecture with React and Three.js optimization.</p>
                  <div className="flex gap-4"><Github size={18}/><ExternalLink size={18}/></div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT - Mobile Friendly Form */}
        <section id="contact" className="py-20 px-6">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-3xl font-black mb-8 text-center uppercase">Contact</h3>
            <div className="p-6 md:p-10 rounded-[2rem] bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input className="w-full bg-slate-100 dark:bg-white/5 border-none rounded-xl p-4 outline-none focus:ring-1 focus:ring-indigo-500 transition-all" placeholder="Name" />
                <input className="w-full bg-slate-100 dark:bg-white/5 border-none rounded-xl p-4 outline-none focus:ring-1 focus:ring-indigo-500 transition-all" placeholder="Email" />
              </div>
              <textarea rows="4" className="w-full bg-slate-100 dark:bg-white/5 border-none rounded-xl p-4 outline-none focus:ring-1 focus:ring-indigo-500 transition-all mb-6" placeholder="Message"></textarea>
              <button className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20 flex justify-center items-center gap-2">Send <Send size={16}/></button>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="py-10 border-t border-white/5 text-center text-xs text-slate-500 uppercase tracking-widest">
          <p>© 2026 RAJESH JHA • Portfolio V2</p>
        </footer>
      </div>

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[200] bg-[#0a0a0a]/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-8 animate-in fade-in zoom-in duration-300">
          <button className="absolute top-6 right-6" onClick={() => setIsMenuOpen(false)}><X size={32}/></button>
          {['Skills', 'Projects', 'Contact'].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setIsMenuOpen(false)} className="text-4xl font-black uppercase hover:text-indigo-500">{item}</a>
          ))}
        </div>
      )}

      {/* CSS FIXES */}
      <style>{`
        .orbit-wrapper { position: absolute; width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; animation: orbit-rotate 25s linear infinite; }
        
        /* Mobile Radius 120px | Desktop Radius 190px */
        .icon-card { 
          position: absolute; 
          transform: translateY(-120px); 
          animation: counter-rotate 25s linear infinite; 
          animation-delay: inherit; 
        }
        @media (min-width: 768px) {
          .icon-card { transform: translateY(-190px); }
        }

        @keyframes orbit-rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes counter-rotate { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
      `}</style>
    </main>
  );
}
