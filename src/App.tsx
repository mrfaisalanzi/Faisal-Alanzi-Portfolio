
import { Canvas } from "@react-three/fiber";
import { motion, useScroll, useSpring } from "motion/react";
import { useRef, useEffect, useState } from "react";
import { CyberSphere } from "./components/CyberSphere";
import { Typewriter } from "./components/Typewriter";
import { LetterGlitch } from "./components/LetterGlitch";
import kaliLogo from "./imeg/px.jpeg";
import {
  Shield,
  Terminal,
  Globe,
  Cpu,
  Linkedin,
  Github,
  Award,
  BookOpen,
  Languages
} from "lucide-react";

const toolLogoModules = import.meta.glob("./imeg/*.svg", {
  eager: true,
  import: "default"
}) as Record<string, string>;

const penetrationTools = Object.entries(toolLogoModules)
  .map(([path, src]) => {
    const filename = path.split("/").pop()?.replace(".svg", "") ?? "";
    const readableName = filename
      .replace(/^tool-logo-/, "")
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());

    return { name: readableName, src };
  })
  .sort((a, b) => a.name.localeCompare(b.name));

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [typingReady, setTypingReady] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const handleEnter = () => setTypingReady(true);
    window.addEventListener("portfolio-enter", handleEnter);
    return () => window.removeEventListener("portfolio-enter", handleEnter);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });


  return (
    <main ref={containerRef} className="relative bg-[#050505] text-white selection:bg-[#00ff9d] selection:text-black">
      {/* Custom Cursor */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-[#00ff9d] rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        animate={{
          x: mousePos.x,
          y: mousePos.y,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 200, mass: 0.5 }}
        style={{
          translateX: "-50%",
          translateY: "-50%",
        }}
      />

      {/* Background 3D Scene */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <color attach="background" args={["#020202"]} />
          <fog attach="fog" args={["#020202", 5, 15]} />
          <ambientLight intensity={0.1} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
          <pointLight position={[-10, -10, -10]} color="#00ff9d" intensity={0.5} />
          <group>
            <CyberSphere scrollProgress={smoothProgress} />
          </group>
        </Canvas>
      </div>

      {/* Cyber Overlays */}
      <div className="fixed inset-0 z-10 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
      <div className="fixed inset-0 z-10 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(5,5,5,0.8)_100%)]" />

      {/* Navigation Overlay */}
      <nav className="fixed top-0 left-0 w-full p-8 z-50 flex justify-end items-center mix-blend-difference">
        <div className="flex gap-8 text-sm font-mono uppercase tracking-widest opacity-60">
          <a href="#about" className="hover:text-[#00ff9d] transition-colors">About</a>
          <a href="#skills" className="hover:text-[#00ff9d] transition-colors">Skills</a>
          <a href="#education" className="hover:text-[#00ff9d] transition-colors">Education</a>
          <a href="#contact" className="hover:text-[#00ff9d] transition-colors">Contact</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="about" className="relative h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
        <div className="max-w-4xl w-full z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-4"
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="inline-block px-3 py-1 rounded-full border border-[#00ff9d]/30 bg-[#00ff9d]/5 text-[#00ff9d] text-xs font-mono uppercase tracking-widest">
                Cybersecurity Specialist
              </span>
              <span className="text-xl">SA</span>
            </div>
            <div className="relative inline-block mb-8">
              <h1 className="font-display text-6xl md:text-8xl font-bold tracking-tighter leading-none">
                {typingReady ? (
                  <Typewriter
                    text="My Name is Faisal"
                    speed={80}
                    delay={700}
                  />
                ) : null}
              </h1>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end"
          >
            <p className="text-lg md:text-xl leading-relaxed font-light animated-bio-text">
              {typingReady ? (
                <Typewriter
                  text="IT specialized in Cybersecurity with strong knowledge in network security, threat detection, and vulnerability assessment. Passionate about protecting systems and data from cyber threats."
                  speed={9}
                  delay={2300}
                  highlightWord="Cybersecurity"
                  highlightClassName="gold-moving-word"
                />
              ) : null}
            </p>
            <div className="flex flex-col gap-4">
               <div className="flex items-center gap-3 text-sm font-mono text-[#00ff9d]">
                  <Shield size={16} />
                  <span>Threat Detection</span>
               </div>
               <div className="flex items-center gap-3 text-sm font-mono text-[#00ff9d]">
                  <Terminal size={16} />
                  <span>Vulnerability Analysis</span>
               </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] font-mono">Scroll</span>
          <div className="w-[1px] h-12 bg-white" />
        </motion.div>
      </section>

      <section className="relative py-12 px-6 flex justify-center">
        <div className="z-10 text-center">
          <a
            href="/CV - Cooperative training (COOP) Faisal Abdallah Alanzi.pdf"
            download="CV - Cooperative training (COOP) Faisal Abdallah Alanzi.pdf"
            className="cv-download-button"
          >
            Download My CV
          </a>
        </div>
      </section>

      <section className="relative py-14 px-6">
        <div className="max-w-6xl mx-auto w-full z-10">
          <div className="tools-title-stack">
            <div className="kali-link-lines" aria-hidden="true" />
            <img src={kaliLogo} alt="Kali Linux logo" className="kali-title-logo" />
            <h2 className="tools-section-title">Penetration Testing</h2>
          </div>
          <div className="tools-marquee">
            <div className="tools-track">
              {[...penetrationTools, ...penetrationTools].map((tool, index) => (
                <div key={`${tool.name}-${index}`} className="tool-card">
                  <img src={tool.src} alt={tool.name} className="tool-logo" />
                  <p className="tool-name">{tool.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="relative min-h-screen py-32 px-6 flex items-center">
        <div className="max-w-6xl mx-auto w-full z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-20"
          >
            <div>
              <h2 className="font-display text-5xl md:text-7xl font-bold tracking-tighter mb-12">
                Skills <br /> <span className="text-[#00ff9d]">Technical</span>
              </h2>
              <div className="flex flex-wrap gap-3">
                {[
                  "C++", "HTML", "CSS", "JavaScript", "SQL", "NoSQL", "Python", "Java",
                  "Data Analysis", "Networking", "Packet Tracer", "Malware Analysis",
                  "Cloud Firewalls", "Vulnerability Analysis", "Penetration Testing", "Kali Linux"
                ].map((skill) => (
                  <span key={skill} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-mono hover:border-[#00ff9d]/50 hover:bg-[#00ff9d]/5 transition-all cursor-default">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <h3 className="font-display text-3xl font-bold mb-8 flex items-center gap-4">
                <Cpu className="text-[#00ff9d]" />
                Soft Skills
              </h3>
              <div className="space-y-6">
                {[
                  { name: "Teamwork", desc: "Collaborative problem solving in high-pressure environments." },
                  { name: "Problem-Solving", desc: "Analytical approach to complex security challenges." },
                  { name: "Fast Learner", desc: "Rapidly adapting to new threat landscapes and tools." },
                  { name: "Analytical Thinking", desc: "Deep dive into data to find hidden vulnerabilities." },
                  { name: "Professional Ethics", desc: "Committed to the highest standards of digital integrity." }
                ].map((skill) => (
                  <div key={skill.name} className="group">
                    <h4 className="font-mono text-[#00ff9d] mb-1">{skill.name}</h4>
                    <p className="text-sm text-white/40 group-hover:text-white/60 transition-colors">{skill.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="relative min-h-screen py-32 px-6 flex items-center bg-white/5">
        <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
          <div className="w-[1080px] h-[1080px] relative opacity-35">
            <LetterGlitch
              glitchColors={["#7cff67"]}
              glitchSpeed={50}
              centerVignette
              outerVignette={false}
              smooth
            />
          </div>
        </div>
        <div className="max-w-4xl mx-auto w-full z-10">
          <div className="flex flex-col md:flex-row gap-12 items-start">
            <div className="md:w-1/3">
              <h2 className="font-display text-5xl md:text-6xl font-bold tracking-tighter sticky top-32">
                Academic <br /> <span className="text-[#00ff9d]">Foundation</span>
              </h2>
            </div>
            <div className="md:w-2/3 space-y-12">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="p-8 border-l-2 border-[#00ff9d] bg-white/[0.02]"
              >
                <div className="flex items-center gap-4 mb-4">
                  <BookOpen className="text-[#00ff9d]" size={24} />
                  <span className="font-mono text-sm text-white/40">Bachelor's Degree</span>
                </div>
                <h3 className="text-2xl font-bold mb-2">Bachelor of Information Technology</h3>
                <p className="text-[#00ff9d] font-mono mb-4">Specialization in Cybersecurity</p>
                <p className="text-white/60">Majmaah University</p>
              </motion.div>

              <div className="space-y-8">
                <h3 className="font-display text-3xl font-bold flex items-center gap-4">
                  <Award className="text-[#00ff9d]" />
                  Certificates & Courses
                </h3>

                <div className="grid grid-cols-1 gap-4">
                  <div className="p-6 border border-white/10 rounded-xl bg-white/[0.02] hover:border-[#00ff9d]/30 transition-colors">
                    <h4 className="font-bold mb-1">Information Security</h4>
                    <p className="text-sm text-white/40 font-mono">STC - Professional Certificate</p>
                  </div>

                  {[
                    { title: "Ethical Hacking Essentials (EHE)", provider: "EC-Council" },
                    { title: "Introduction to Data Analytics", provider: "IBM" },
                    { title: "Web Development (HTML, CSS, JS)", provider: "IBM" }
                  ].map((course) => (
                    <div key={course.title} className="p-6 border border-white/10 rounded-xl bg-white/[0.02] hover:border-[#00ff9d]/30 transition-colors">
                      <h4 className="font-bold mb-1">{course.title}</h4>
                      <p className="text-sm text-white/40 font-mono">{course.provider}</p>
                    </div>
                  ))}

                  <div className="p-6 border border-[#00ff9d]/20 rounded-xl bg-[#00ff9d]/5 flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-[#00ff9d]">Additional Achievements</h4>
                      <p className="text-sm text-[#00ff9d]/60 font-mono">More than 27+ Professional Certificates</p>
                    </div>
                    <div className="text-3xl font-bold text-[#00ff9d]/20">27+</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Languages Section */}
      <section className="relative py-32 px-6 flex items-center">
        <div className="max-w-4xl mx-auto w-full z-10 text-center">
          <Languages className="mx-auto mb-8 text-[#00ff9d]" size={48} />
          <h2 className="font-display text-5xl font-bold tracking-tighter mb-16">Languages</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-12 border border-white/10 rounded-3xl bg-white/[0.02]">
              <h3 className="text-4xl font-bold mb-4">Arabic</h3>
              <p className="font-mono text-[#00ff9d] uppercase tracking-widest">Native Language</p>
            </div>
            <div className="p-12 border border-white/10 rounded-3xl bg-white/[0.02]">
              <h3 className="text-4xl font-bold mb-4">English</h3>
              <p className="font-mono text-[#00ff9d] uppercase tracking-widest">Professional Proficiency</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative h-screen flex items-center justify-center px-6 overflow-hidden">
        <div className="max-w-4xl w-full z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-6xl md:text-9xl font-bold tracking-tighter mb-12">
              Let's <span className="text-[#00ff9d]">Connect</span>
            </h2>

            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
              <a
                href="https://www.linkedin.com/in/mrfaisalalanzi"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-4"
              >
                <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#00ff9d] group-hover:bg-[#00ff9d]/10 transition-all">
                  <Linkedin size={24} />

                </div>
                <span className="font-mono text-xs uppercase tracking-widest opacity-40 group-hover:opacity-100 transition-opacity">LinkedIn</span>
              </a>

              <a
                href="https://github.com/mrfaisalanzi"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-4"
              >
                <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#00ff9d] group-hover:bg-[#00ff9d]/10 transition-all">
                  <Github size={24} />
                </div>
                <span className="font-mono text-xs uppercase tracking-widest opacity-40 group-hover:opacity-100 transition-opacity">GitHub</span>
              </a>

              <a
                href="mailto:mr.faisal.alanazi@gmail.com"
                className="font-mono text-lg md:text-2xl text-[#00ff9d] hover:underline transition-all"
              >
                mr.faisal.alanazi@gmail.com
              </a>
            </div>

            <div className="mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-mono uppercase tracking-[0.2em] text-white/20">
              <div className="flex items-center gap-2">
                <Globe size={10} />
                <span>Riyadh, Saudi Arabia</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
</main>
  );
}




