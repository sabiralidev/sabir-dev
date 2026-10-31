import React, { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, Copy, AlertCircle, CheckCircle2, ArrowRight, ArrowUpRight, Github, Linkedin, Code2 } from 'lucide-react';
import { SectionHeading } from '../Common/UI';

gsap.registerPlugin(ScrollTrigger);

export const ContactSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const formColRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({ name: '', email: '', message: '' });
  const [touched, setTouched] = useState({ name: false, email: false, message: false });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.0,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      if (leftColRef.current) {
        gsap.fromTo(
          leftColRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.0,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: leftColRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      if (formColRef.current) {
        gsap.fromTo(
          formColRef.current,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: formColRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const validateField = (name: string, value: string) => {
    let error = '';
    if (name === 'name') {
      if (!value.trim()) error = 'Payload identity required';
      else if (value.trim().length < 2) error = 'Identify with at least 2 characters';
    }
    if (name === 'email') {
      if (!value.trim()) error = 'Dispatch protocol required';
      else if (!/\S+@\S+\.\S+/.test(value)) error = 'Invalid email communication protocol';
    }
    if (name === 'message') {
      if (!value.trim()) error = 'Payload transmission data required';
      else if (value.trim().length < 10) error = 'Minimum 10 characters for transmission';
    }
    return error;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (touched[name as keyof typeof touched]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleBlur = (name: string) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, formData[name as keyof typeof formData]),
    }));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText('sabirsheik12787@gmail.com');
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const allTouched = { name: true, email: true, message: true };
    setTouched(allTouched);

    const newErrors = {
      name: validateField('name', formData.name),
      email: validateField('email', formData.email),
      message: validateField('message', formData.message),
    };

    setErrors(newErrors);

    if (!newErrors.name && !newErrors.email && !newErrors.message) {
      setIsSubmitting(true);

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        reply_to: formData.email,
        message: formData.message,
      };

      const SERVICE_ID = 'service_j0j25eq';
      const PUBLIC_KEY = 'G3O5uK74c4TDZEODQ';
      const NOTIFICATION_TEMPLATE = 'template_sz8p0tl';

      emailjs
        .send(SERVICE_ID, NOTIFICATION_TEMPLATE, templateParams, PUBLIC_KEY)
        .then(() => {
          setIsSubmitting(false);
          setIsSuccess(true);
          setFormData({ name: '', email: '', message: '' });
          setTouched({ name: false, email: false, message: false });
          setTimeout(() => setIsSuccess(false), 6000);
        })
        .catch((err) => {
          const logMsg =
            err?.text || err?.message || (typeof err === 'string' ? err : JSON.stringify(err));
          console.error('TRANSMISSION FAILED:', logMsg);
          setIsSubmitting(false);
          alert(`Transmission notice: ${logMsg}.`);
        });
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-28 lg:py-48 px-6 md:px-12 lg:px-24 bg-[#050505] text-white relative overflow-hidden"
    >
      {/* Background Typographic Watermark - Monochromatic */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-black text-white/[0.015] tracking-tighter pointer-events-none select-none italic -z-0">
        DISPATCH
      </div>

      <div className="max-w-screen-2xl mx-auto relative z-10">
        <div ref={headingRef}>
          <SectionHeading
            number="06"
            category="Direct Transmission"
            title={<>Let's <br className="hidden sm:inline" /><span className="text-zinc-500 font-light">Build.</span></>}
            subtitle="Accepting inquiries for full-stack engineering roles, technical architecture consulting, and high-impact digital experiences."
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start mt-16">
          {/* Left Column: Direct Inquiries & Protocols (5 cols) */}
          <div ref={leftColRef} className="lg:col-span-5 space-y-12">
            <div>
              <span className="mono text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500 block mb-4">
                COMMUNICATION CHANNEL
              </span>
              <p className="text-xl sm:text-2xl text-zinc-300 font-light leading-relaxed">
                Looking to build robust software systems, scale existing infrastructure, or collaborate on innovative projects? Send a dispatch.
              </p>
            </div>

            {/* Direct Email Card */}
            <div className="p-6 sm:p-8 rounded-[2rem] bg-[#0c0c0c] border border-white/[0.08] space-y-4">
              <div className="flex items-center justify-between">
                <span className="mono text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                  DIRECT EMAIL
                </span>
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                <span className="text-lg sm:text-xl font-bold tracking-tight text-white break-all">
                  sabirsheik12787@gmail.com
                </span>

                <button
                  onClick={copyToClipboard}
                  type="button"
                  className="px-4 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2 self-start sm:self-center transition-colors"
                >
                  {isCopied ? (
                    <>
                      <Check size={14} className="text-white" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} className="text-zinc-400" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Verified Social Protocols */}
            <div className="space-y-4 pt-4 border-t border-white/[0.08]">
              <span className="mono text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500 block">
                VERIFIED NODES
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <a
                  href="https://www.linkedin.com/in/sabiralidev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-white/30 flex items-center justify-between text-zinc-300 hover:text-white transition-all group"
                >
                  <div className="flex items-center gap-2.5">
                    <Linkedin size={16} />
                    <span className="text-xs font-bold">LinkedIn</span>
                  </div>
                  <ArrowUpRight size={14} className="text-zinc-500 group-hover:text-white transition-colors" />
                </a>

                <a
                  href="https://github.com/sabiralidev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-white/30 flex items-center justify-between text-zinc-300 hover:text-white transition-all group"
                >
                  <div className="flex items-center gap-2.5">
                    <Github size={16} />
                    <span className="text-xs font-bold">GitHub</span>
                  </div>
                  <ArrowUpRight size={14} className="text-zinc-500 group-hover:text-white transition-colors" />
                </a>

                <a
                  href="https://dev.to/sabirsheikh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-white/30 flex items-center justify-between text-zinc-300 hover:text-white transition-all group"
                >
                  <div className="flex items-center gap-2.5">
                    <Code2 size={16} />
                    <span className="text-xs font-bold">DEV.to</span>
                  </div>
                  <ArrowUpRight size={14} className="text-zinc-500 group-hover:text-white transition-colors" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Encrypted Form Interface (7 cols) */}
          <div ref={formColRef} className="lg:col-span-7">
            <div className="p-8 sm:p-12 rounded-[2.5rem] bg-[#0c0c0c] border border-white/[0.08] shadow-[0_20px_60px_rgba(0,0,0,0.7)] relative">
              {isSuccess ? (
                <div className="py-20 flex flex-col items-center justify-center text-center space-y-6">
                  <div className="w-16 h-16 rounded-2xl bg-white text-black flex items-center justify-center shadow-2xl">
                    <CheckCircle2 size={32} />
                  </div>
                  <h3 className="text-3xl font-black tracking-tight text-white">
                    Transmission Dispatched
                  </h3>
                  <p className="text-zinc-400 text-sm max-w-sm font-light">
                    Your transmission payload has been successfully delivered. I will review specifications and respond promptly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-8">
                  <div className="flex items-center justify-between pb-6 border-b border-white/[0.08]">
                    <span className="mono text-xs font-bold uppercase tracking-widest text-zinc-400">
                      // SECURE DISPATCH PROTOCOL
                    </span>
                    <span className="mono text-[10px] text-zinc-600">
                      256-BIT ENCRYPTED
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    {/* Name Input */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <label className="mono text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                          Identity (Name)
                        </label>
                        {touched.name && !errors.name && formData.name && (
                          <Check size={12} className="text-white" />
                        )}
                      </div>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        onBlur={() => handleBlur('name')}
                        placeholder="Your full name"
                        className={`w-full bg-white/[0.02] border ${
                          touched.name && errors.name
                            ? 'border-white/40 bg-white/[0.04]'
                            : 'border-white/10 focus:border-white/40'
                        } rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-zinc-600 outline-none transition-colors`}
                      />
                      {touched.name && errors.name && (
                        <p className="flex items-center gap-1.5 mono text-[10px] text-zinc-300 mt-1">
                          <AlertCircle size={10} />
                          <span>{errors.name}</span>
                        </p>
                      )}
                    </div>

                    {/* Email Input */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <label className="mono text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                          Dispatch Protocol (Email)
                        </label>
                        {touched.email && !errors.email && formData.email && (
                          <Check size={12} className="text-white" />
                        )}
                      </div>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        onBlur={() => handleBlur('email')}
                        placeholder="your@email.com"
                        className={`w-full bg-white/[0.02] border ${
                          touched.email && errors.email
                            ? 'border-white/40 bg-white/[0.04]'
                            : 'border-white/10 focus:border-white/40'
                        } rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-zinc-600 outline-none transition-colors`}
                      />
                      {touched.email && errors.email && (
                        <p className="flex items-center gap-1.5 mono text-[10px] text-zinc-300 mt-1">
                          <AlertCircle size={10} />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Message Input */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="mono text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                        Payload (Requirements & Scope)
                      </label>
                      {touched.message && !errors.message && formData.message && (
                        <Check size={12} className="text-white" />
                      )}
                    </div>
                    <textarea
                      rows={4}
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      onBlur={() => handleBlur('message')}
                      placeholder="Outline system requirements, architecture goals, or role parameters..."
                      className={`w-full bg-white/[0.02] border ${
                        touched.message && errors.message
                          ? 'border-white/40 bg-white/[0.04]'
                          : 'border-white/10 focus:border-white/40'
                      } rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-zinc-600 outline-none transition-colors resize-none`}
                    />
                    {touched.message && errors.message && (
                      <p className="flex items-center gap-1.5 mono text-[10px] text-zinc-300 mt-1">
                        <AlertCircle size={10} />
                        <span>{errors.message}</span>
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl bg-white text-black font-black text-xs uppercase tracking-widest2 flex items-center justify-center gap-3 hover:bg-zinc-200 active:scale-[0.99] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_30px_rgba(255,255,255,0.15)]"
                  >
                    <span>{isSubmitting ? 'Transmitting...' : 'Initiate Transmission'}</span>
                    {!isSubmitting && <ArrowRight size={16} />}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
