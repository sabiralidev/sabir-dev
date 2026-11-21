import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import { PROJECTS } from '../../../data';
import { SEO } from '../Common/SEO';
import { MonogramLogo } from '../Common/MonogramLogo';

const projectRoutes = {
  'enterprise-e-commerce-hub': 'proj1',
  'ai-world-tech-platform': 'proj2',
} as const;

export const ProjectPage: React.FC = () => {
  const { slug } = useParams();
  const projectId = slug ? projectRoutes[slug as keyof typeof projectRoutes] : undefined;
  const project = PROJECTS.find((item) => item.id === projectId);

  if (!project) return <Navigate to="/404" replace />;

  const isEcommerce = project.id === 'proj1';
  const canonical = `https://sabir-dev.vercel.app/projects/${slug}`;
  const title = `${project.title} | Sabir Ali Project`;
  const description = isEcommerce
    ? 'A MERN e-commerce application with Redux Toolkit, Stripe, real-time inventory synchronization and resilient checkout workflows.'
    : 'A MERN investment platform with ROI tracking, referral rewards, wallet management and authenticated transaction workflows.';

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <SEO
        title={title}
        description={description}
        canonical={canonical}
        type="article"
        breadcrumbs={[
          { name: 'Home', item: 'https://sabir-dev.vercel.app/' },
          { name: 'Projects', item: 'https://sabir-dev.vercel.app/#projects' },
          { name: project.title, item: canonical },
        ]}
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'CreativeWork',
            '@id': `${canonical}#project`,
            name: project.title,
            description,
            url: canonical,
            author: { '@id': 'https://sabir-dev.vercel.app/#person' },
            inLanguage: 'en',
            keywords: project.stack.join(', '),
          },
          {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            '@id': `${canonical}#webpage`,
            url: canonical,
            name: title,
            description,
            isPartOf: { '@id': 'https://sabir-dev.vercel.app/#website' },
            breadcrumb: { '@id': `${canonical}#breadcrumb` },
          },
        ]}
      />

      <header className="border-b border-white/[0.08]">
        <div className="mx-auto flex max-w-screen-xl items-center justify-between px-5 py-5 sm:px-8 lg:px-16 xl:px-20">
          <Link to="/" aria-label="Sabir Ali home" className="flex items-center gap-3">
            <MonogramLogo size={40} />
            <span className="mono text-sm font-semibold tracking-[-0.04em] text-white">
              SABIR<span className="text-zinc-500">_ALI</span>
            </span>
          </Link>
          <Link
            to="/#projects"
            className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-300 hover:text-white"
          >
            <ArrowLeft size={15} />
            All projects
          </Link>
        </div>
      </header>

      <article className="mx-auto max-w-screen-lg px-5 py-16 sm:px-8 sm:py-20 lg:px-16 lg:py-24">
        <nav aria-label="Breadcrumb" className="mb-8 text-xs text-zinc-500">
          <Link to="/" className="hover:text-white">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/#projects" className="hover:text-white">Projects</Link>
          <span className="mx-2">/</span>
          <span aria-current="page">{project.title}</span>
        </nav>

        <p className="mono mb-4 text-[10px] uppercase tracking-[0.18em] text-[#d71920]">
          Project case study
        </p>
        <h1 className="max-w-4xl text-4xl font-semibold leading-tight tracking-[-0.055em] sm:text-5xl lg:text-6xl">
          {project.title}
        </h1>
        <p className="mt-6 max-w-3xl text-base leading-relaxed text-zinc-300 sm:text-lg">
          {description}
        </p>

        <img
          src={isEcommerce ? '/ecom.webp' : '/AIworldTech.webp'}
          alt={`${project.title} application interface`}
          width={isEcommerce ? 1500 : 1892}
          height={isEcommerce ? 733 : 867}
          loading="eager"
          decoding="async"
          className="mt-10 aspect-[16/10] w-full border border-white/10 bg-[#101010] object-contain"
        />

        <div className="mt-12 grid gap-10 border-t border-white/[0.08] pt-10 md:grid-cols-2">
          <section>
            <h2 className="text-xl font-semibold">Problem</h2>
            <p className="mt-3 leading-relaxed text-zinc-400">{project.problem}</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold">Solution</h2>
            <p className="mt-3 leading-relaxed text-zinc-400">{project.solution}</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold">Architecture</h2>
            <p className="mt-3 leading-relaxed text-zinc-400">{project.architecture}</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold">Challenges</h2>
            <p className="mt-3 leading-relaxed text-zinc-400">{project.challenges}</p>
          </section>
        </div>

        <section className="mt-12 border-t border-white/[0.08] pt-10">
          <h2 className="text-xl font-semibold">Technology stack</h2>
          <ul className="mt-5 flex flex-wrap gap-2">
            {project.stack.map((technology) => (
              <li key={technology} className="border border-white/10 px-3 py-2 text-sm text-zinc-300">
                {technology}
              </li>
            ))}
          </ul>
        </section>

        {project.links && (
          <div className="mt-12 flex flex-wrap gap-3">
            {project.links.github && (
              <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-white/15 px-5 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-zinc-200">
                <Github size={16} />
                Source code
              </a>
            )}
            {project.links.live && (
              <a href={project.links.live} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#e5e5e5] px-5 py-3 text-xs font-bold uppercase tracking-[0.12em] text-black">
                Live project
                <ExternalLink size={16} />
              </a>
            )}
          </div>
        )}
      </article>
    </main>
  );
};
