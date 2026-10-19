'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight, FolderOpen, Lock } from 'lucide-react';
import { ourPortofolio } from '@/constants/data/Service';
import { PORTFOLIO_DRIVE_URL } from '@/constants/data/journey';
import SubHeader from '@/components/Journey/SubHeader';
import WorldBackdrop from '@/components/Journey/WorldBackdrop';
import { useClickTracking } from '@/hooks/useTracking';
import { cn } from '@/lib/utils';

type Filter = 'All' | 'web' | 'mobile';

const FILTERS: { id: Filter; label: string }[] = [
  { id: 'All', label: 'All' },
  { id: 'web', label: 'Web' },
  { id: 'mobile', label: 'Mobile' },
];

interface Project {
  alt: string;
  src: string;
  tech: string[];
  type: string;
  link?: string;
}

const ProjectTile = ({ project }: { project: Project }) => {
  const { trackClick } = useClickTracking();
  const name = project.alt.trim();
  const body = (
    <>
      <span className="j-tile-media">
        <Image
          src={project.src}
          alt={`${name} screenshot`}
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
          className="object-contain"
        />
      </span>
      <span className="j-tile-body">
        <span className="j-tile-head">
          <strong>{name}</strong>
          <span className="j-tile-type">{project.type === 'mobile' ? 'Mobile' : 'Web'}</span>
        </span>
        <span className="j-tile-tech">{project.tech.slice(0, 5).join(' · ')}</span>
        <span className="j-tile-link">
          {project.link ? (
            <>
              Open live <ArrowUpRight aria-hidden className="size-4" />
            </>
          ) : (
            <>
              <Lock aria-hidden className="size-3.5" /> Internal or archived
            </>
          )}
        </span>
      </span>
    </>
  );

  if (!project.link) return <div className="j-tile j-glass">{body}</div>;

  return (
    <a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className="j-tile j-tile-live j-glass"
      onClick={() =>
        trackClick('project_clicked', { project_name: name, project_type: project.type, page: 'portfolio' })
      }
    >
      {body}
    </a>
  );
};

export default function PortfolioPage() {
  const [filter, setFilter] = useState<Filter>('All');
  const { trackClick } = useClickTracking();
  const projects = ourPortofolio.list[0].slides as Project[];
  const visible = filter === 'All' ? projects : projects.filter((p) => p.type === filter);

  return (
    <div className="j-page">
      <WorldBackdrop stage={10} />
      <SubHeader current="portfolio" />
      <main className="j-page-main">
        <div className="j-page-head j-page-head-split j-glass">
          <div>
            <h1 className="j-page-title">Project manifest</h1>
            <p className="j-page-lede">
              Web platforms, store apps and VR builds from client work and personal projects. Live links open in a new
              tab; the full archive with case material is on Drive.
            </p>
          </div>
          <div className="j-segmented" role="group" aria-label="Filter projects">
            {FILTERS.map(({ id, label }) => {
              const count = id === 'All' ? projects.length : projects.filter((p) => p.type === id).length;
              return (
                <button
                  key={id}
                  type="button"
                  aria-pressed={filter === id}
                  className={cn(filter === id && 'is-on')}
                  onClick={() => {
                    setFilter(id);
                    trackClick('portfolio_filter_used', { filter: id, page: 'portfolio' });
                  }}
                >
                  {label} <span className="j-mono">{count}</span>
                </button>
              );
            })}
          </div>
        </div>

        <ul className="j-tiles">
          {visible.map((project) => (
            <li key={project.alt}>
              <ProjectTile project={project} />
            </li>
          ))}
        </ul>

        <aside className="j-page-cta j-glass">
          <p>
            <strong>Need the details?</strong> Screens, write-ups and builds that are not public live in the portfolio
            Drive.
          </p>
          <a
            href={PORTFOLIO_DRIVE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="j-btn j-btn-primary"
            onClick={() => trackClick('cta_clicked', { button: 'Portfolio Drive', section: 'portfolio_footer' })}
          >
            <FolderOpen aria-hidden className="size-4" /> Open portfolio Drive
          </a>
        </aside>
      </main>
    </div>
  );
}
