import React, { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, Copy, AlertCircle, CheckCircle2, ArrowRight, ArrowUpRight, Github, Linkedin, Code2 } from 'lucide-react';
import { SectionHeading } from '../Common/UI';
import { useReducedMotion } from '../../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export const ContactSection: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const formColRef = useRef<HTMLDivElement>(null);
  const copyTimeoutRef = useRef<number | null>(null);
  const successTimeoutRef = useRef<number | null>(null);

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({ name: '', email: '', message: '' });
  const [touched, setTouched] = useState({ name: false, email: false, message: false });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [copyError, setCopyError] = useState('');

  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          {
            z: -150,
            autoAlpha: 0.3,
            rotateX: 12,
            rotateY: -5,
            scale: 0.96,
            transformPerspective: 1300,
            transformOrigin: 'left center',
          },
          {
            z: 0,
            autoAlpha: 1,
            rotateX: 0,
            rotateY: 0,
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 88%',
              end: 'top 38%',
              scrub: 0.7,
            },
          }
        );
      }

      if (leftColRef.current) {
        gsap.fromTo(
          leftColRef.current,
          {
            z: -130,
            autoAlpha: 0.3,
            rotateY: -12,
            rotateX: 6,
            transformPerspective: 1200,
            transformOrigin: 'right center',
          },
          {
            z: 0,
            autoAlpha: 1,
            rotateY: 0,
            rotateX: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: leftColRef.current,
              start: 'top 90%',
              end: 'top 45%',
              scrub: 0.7,
            },
          }
        );
      }

      if (formColRef.current) {
        gsap.fromTo(
          formColRef.current,
          {
            z: -220,
            autoAlpha: 0.25,
            rotateY: window.matchMedia('(hover: hover) and (pointer: fine)').matches
              ? 16
              : 5,
            rotateX: 8,
            scale: 0.92,
            transformPerspective: 1400,
            transformOrigin: 'left center',
          },
          {
            z: 0,
            autoAlpha: 1,
            rotateY: 0,
            rotateX: 0,
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: formColRef.current,
              start: 'top 90%',
              end: 'top 45%',
              scrub: 0.7,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  useEffect(
    () => () => {
      if (copyTimeoutRef.current !== null) {
        window.clearTimeout(copyTimeoutRef.current);
      }
      if (successTimeoutRef.current !== null) {
        window.clearTimeout(successTimeoutRef.current);
      }
    },
    []
  );

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

  const copyToClipboard = async () => {
    setCopyError('');
    try {
      await navigator.clipboard.writeText('sabirsheik12787@gmail.com');
      setIsCopied(true);
      if (copyTimeoutRef.current !== null) {
        window.clearTimeout(copyTimeoutRef.current);
      }
      copyTimeoutRef.current = window.setTimeout(() => {
        setIsCopied(false);
        copyTimeoutRef.current = null;
      }, 2200);
    } catch (error) {
      console.error('Unable to copy the contact email:', error);
      setCopyError('Copy was unavailable. Please select the email address instead.');
    }
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
          successTimeoutRef.current = window.setTimeout(() => {
            setIsSuccess(false);
            successTimeoutRef.current = null;
          }, 6000);
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
      className="relative overflow-hidden bg-[#050505] px-5 py-24 text-white sm:px-8 sm:py-28 lg:px-16 lg:py-36 xl:px-20"
    >
      <div className="relative z-10 mx-auto max-w-screen-xl">
        <div ref={headingRef}>
          <SectionHeading
            number="06"
            category="Contact"
            title={<>Let’s <span className="font-light text-zinc-500">build.</span></>}
            subtitle="Accepting inquiries for full-stack engineering roles, technical architecture consulting, and high-impact digital experiences."
          />
        </div>

        <div className="mt-12 grid grid-cols-1 items-start gap-12 lg:mt-16 lg:grid-cols-12 lg:gap-16">
          <div ref={leftColRef} className="space-y-9 lg:col-span-5">
            <div>
              <span className="mono mb-4 block text-[9px] font-medium uppercase tracking-[0.18em] text-zinc-500">
                COMMUNICATION CHANNEL
              </span>
              <p className="text-lg font-light leading-relaxed text-zinc-300 sm:text-xl">
                Looking to build robust software systems, scale existing infrastructure, or collaborate on innovative projects? Send a dispatch.
              </p>
            </div>

            <div className="space-y-4 border-y border-white/[0.1] py-5">
              <div className="flex items-center justify-between">
                <span className="mono text-[9px] font-medium uppercase tracking-[0.16em] text-zinc-500">
                  DIRECT EMAIL
                </span>
                <span className="h-1.5 w-1.5 bg-[#d71920]" />
              </div>

              <div className="flex flex-col justify-between gap-4 pt-1 sm:flex-row sm:items-center">
                <span className="break-all text-base font-medium tracking-tight text-white sm:text-lg">
                  sabirsheik12787@gmail.com
                </span>

                <button
                  onClick={copyToClipboard}
                  type="button"
                  className="flex items-center gap-2 self-start border border-white/15 px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-zinc-300 transition-colors hover:border-white/35 hover:text-white sm:self-center"
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
              {copyError && <p role="status" className="text-xs text-zinc-400">{copyError}</p>}
            </div>

            <div className="space-y-4">
              <span className="mono block text-[9px] font-medium uppercase tracking-[0.18em] text-zinc-500">
                VERIFIED NODES
              </span>

              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                <a
                  href="https://www.linkedin.com/in/sabiralidev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between border border-white/[0.08] px-3 py-3 text-zinc-300 transition-colors hover:border-white/25 hover:text-white group"
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
                  className="flex items-center justify-between border border-white/[0.08] px-3 py-3 text-zinc-300 transition-colors hover:border-white/25 hover:text-white group"
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
                  className="flex items-center justify-between border border-white/[0.08] px-3 py-3 text-zinc-300 transition-colors hover:border-white/25 hover:text-white group"
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

          <div ref={formColRef} className="lg:col-span-7">
            <div className="relative border border-white/[0.1] bg-[#101010] p-5 sm:p-8 lg:p-10">
              {isSuccess ? (
                <div className="flex flex-col items-center justify-center space-y-6 py-16 text-center">
                <div className="flex h-14 w-14 items-center justify-center border border-white/20 text-[#e5e5e5]">
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
                    <span className="mono text-[9px] font-medium uppercase tracking-[0.15em] text-zinc-400">
                        Contact form
                    </span>
                    <span className="mono text-[9px] text-zinc-600">EMAILJS</span>
                  </div>

                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    {/* Name Input */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <label htmlFor="contact-name" className="mono text-[9px] font-medium uppercase tracking-[0.14em] text-zinc-400">
                          Identity (Name)
                        </label>
                        {touched.name && !errors.name && formData.name && (
                          <Check size={12} className="text-white" />
                        )}
                      </div>
                      <input
                        type="text"
                        id="contact-name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        onBlur={() => handleBlur('name')}
                        placeholder="Your full name"
                        autoComplete="name"
                        aria-invalid={Boolean(touched.name && errors.name)}
                        aria-describedby={touched.name && errors.name ? 'contact-name-error' : undefined}
                        className={`w-full bg-white/[0.02] border ${
                          touched.name && errors.name
                            ? 'border-white/40 bg-white/[0.04]'
                            : 'border-white/10 focus:border-white/40'
                        } rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-zinc-600 outline-none transition-colors`}
                      />
                      {touched.name && errors.name && (
                        <p className="flex items-center gap-1.5 mono text-[10px] text-zinc-300 mt-1">
                          <AlertCircle size={10} />
                          <span id="contact-name-error">{errors.name}</span>
                        </p>
                      )}
                    </div>

                    {/* Email Input */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <label htmlFor="contact-email" className="mono text-[9px] font-medium uppercase tracking-[0.14em] text-zinc-400">
                          Dispatch Protocol (Email)
                        </label>
                        {touched.email && !errors.email && formData.email && (
                          <Check size={12} className="text-white" />
                        )}
                      </div>
                      <input
                        type="email"
                        id="contact-email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        onBlur={() => handleBlur('email')}
                        placeholder="your@email.com"
                        autoComplete="email"
                        aria-invalid={Boolean(touched.email && errors.email)}
                        aria-describedby={touched.email && errors.email ? 'contact-email-error' : undefined}
                        className={`w-full bg-white/[0.02] border ${
                          touched.email && errors.email
                            ? 'border-white/40 bg-white/[0.04]'
                            : 'border-white/10 focus:border-white/40'
                        } rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-zinc-600 outline-none transition-colors`}
                      />
                      {touched.email && errors.email && (
                        <p className="flex items-center gap-1.5 mono text-[10px] text-zinc-300 mt-1">
                          <AlertCircle size={10} />
                          <span id="contact-email-error">{errors.email}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Message Input */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label htmlFor="contact-message" className="mono text-[9px] font-medium uppercase tracking-[0.14em] text-zinc-400">
                        Payload (Requirements & Scope)
                      </label>
                      {touched.message && !errors.message && formData.message && (
                        <Check size={12} className="text-white" />
                      )}
                    </div>
                    <textarea
                      rows={4}
                      id="contact-message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      onBlur={() => handleBlur('message')}
                      placeholder="Outline system requirements, architecture goals, or role parameters..."
                      aria-invalid={Boolean(touched.message && errors.message)}
                      aria-describedby={touched.message && errors.message ? 'contact-message-error' : undefined}
                      className={`w-full bg-white/[0.02] border ${
                        touched.message && errors.message
                          ? 'border-white/40 bg-white/[0.04]'
                          : 'border-white/10 focus:border-white/40'
                      } rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-zinc-600 outline-none transition-colors resize-none`}
                    />
                    {touched.message && errors.message && (
                      <p className="flex items-center gap-1.5 mono text-[10px] text-zinc-300 mt-1">
                        <AlertCircle size={10} />
                        <span id="contact-message-error">{errors.message}</span>
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex min-h-12 w-full items-center justify-center gap-3 bg-[#e5e5e5] px-5 py-4 text-[10px] font-bold uppercase tracking-[0.16em] text-black transition-colors duration-200 hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
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
