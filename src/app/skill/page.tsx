'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Skills as Skills1, Skills2 } from '@/constants/data/Service';
import SubHeader from '@/components/Journey/SubHeader';
import WorldBackdrop from '@/components/Journey/WorldBackdrop';
import { useClickTracking } from '@/hooks/useTracking';

type Group = 'Frontend' | 'Mobile' | 'AI' | 'State & testing' | 'Tools' | 'Backend & data' | 'Cloud & DevOps' | 'Analytics & monitoring' | 'Other';

// Display name and CV category per icon file, so the inventory reads like the CV
const CATALOG: Record<string, { name: string; group: Group }> = {
  'react.png': { name: 'React & React Native', group: 'Frontend' },
  'nextjs.png': { name: 'Next.js', group: 'Frontend' },
  'ts.png': { name: 'TypeScript', group: 'Frontend' },
  'js.png': { name: 'JavaScript', group: 'Frontend' },
  'Tailwind.png': { name: 'Tailwind CSS', group: 'Frontend' },
  'css.png': { name: 'CSS', group: 'Frontend' },
  'chart.png': { name: 'Chart.js', group: 'Frontend' },
  'flutter.png': { name: 'Flutter', group: 'Mobile' },
  'Dart.png': { name: 'Dart', group: 'Mobile' },
  'Ios.png': { name: 'iOS', group: 'Mobile' },
  'ioss.png': { name: 'SwiftUI', group: 'Mobile' },
  'Ignite.png': { name: 'Ignite', group: 'Mobile' },
  'swift.svg': { name: 'Swift', group: 'Mobile' },
  'claude.svg': { name: 'Claude Code', group: 'AI' },
  'mcp.svg': { name: 'MCP with Claude', group: 'AI' },
  'vercel.svg': { name: 'Vercel AI SDK', group: 'AI' },
  'copilot.svg': { name: 'GitHub Copilot', group: 'AI' },
  'cursor.svg': { name: 'Cursor', group: 'AI' },
  'rdx.png': { name: 'Redux', group: 'State & testing' },
  'mobx.png': { name: 'MobX', group: 'State & testing' },
  'jest.svg': { name: 'Jest', group: 'State & testing' },
  'testinglibrary.svg': { name: 'React Testing Library', group: 'State & testing' },
  'git.png': { name: 'Git', group: 'Tools' },
  'github.svg': { name: 'GitHub', group: 'Tools' },
  'gitlab.png': { name: 'GitLab', group: 'Tools' },
  'jira.png': { name: 'Jira', group: 'Tools' },
  'figma.svg': { name: 'Figma', group: 'Tools' },
  'npm.png': { name: 'npm', group: 'Tools' },
  'postman.png': { name: 'Postman', group: 'Tools' },
  'express.svg': { name: 'Express.js', group: 'Backend & data' },
  'node.png': { name: 'Node.js', group: 'Backend & data' },
  'knex.png': { name: 'Knex.js', group: 'Backend & data' },
  'go.png': { name: 'Go', group: 'Backend & data' },
  'rest.png': { name: 'REST API', group: 'Backend & data' },
  'Graphql.png': { name: 'GraphQL', group: 'Backend & data' },
  'post.png': { name: 'PostgreSQL', group: 'Backend & data' },
  'mys.png': { name: 'MySQL', group: 'Backend & data' },
  'mongo.png': { name: 'MongoDB', group: 'Backend & data' },
  'Redis.png': { name: 'Redis', group: 'Backend & data' },
  'firebase.png': { name: 'Firebase', group: 'Backend & data' },
  'aws.png': { name: 'AWS', group: 'Cloud & DevOps' },
  'gcp.png': { name: 'Google Cloud', group: 'Cloud & DevOps' },
  'azure.png': { name: 'Azure', group: 'Cloud & DevOps' },
  'ali.png': { name: 'Alibaba Cloud', group: 'Cloud & DevOps' },
  'cloude.png': { name: 'Cloudflare', group: 'Cloud & DevOps' },
  'docker.png': { name: 'Docker', group: 'Cloud & DevOps' },
  'hero.png': { name: 'Heroku', group: 'Cloud & DevOps' },
  'posthog.svg': { name: 'PostHog', group: 'Analytics & monitoring' },
  'grafana.png': { name: 'Grafana', group: 'Analytics & monitoring' },
  'dynatrace.png': { name: 'Dynatrace', group: 'Analytics & monitoring' },
  'unity.png': { name: 'Unity', group: 'Other' },
  'Charp.png': { name: 'C#', group: 'Other' },
  'blender.svg': { name: 'Blender', group: 'Other' },
  'shopify.svg': { name: 'Shopify', group: 'Other' },
};

const ORDER: Group[] = [
  'Frontend', 'Mobile', 'AI', 'State & testing', 'Tools',
  'Backend & data', 'Cloud & DevOps', 'Analytics & monitoring', 'Other',
];

export default function SkillsPage() {
  const { trackClick } = useClickTracking();
  const allSkills = Skills1.list[0].slides.concat(Skills2.list.flatMap((client) => client.slides));

  const groups = ORDER.map((group) => ({
    group,
    items: allSkills
      .map((skill) => {
        const file = skill.src.split('/').pop() ?? '';
        const entry = CATALOG[file];
        return entry ? { ...entry, src: skill.src } : null;
      })
      .filter((item): item is { name: string; group: Group; src: string } => item?.group === group),
  })).filter(({ items }) => items.length > 0);

  const total = groups.reduce((sum, g) => sum + g.items.length, 0);

  return (
    <div className="j-page">
      <WorldBackdrop stage={9} />
      <SubHeader current="skills" />
      <main className="j-page-main">
        <div className="j-page-head j-glass">
          <h1 className="j-page-title">Skills inventory</h1>
          <p className="j-page-lede">
            {total} tools on the shelf, grouped the way they show up in my work: frontend first, then mobile,
            AI tooling, backend, cloud and the rest.
          </p>
        </div>

        <div className="j-inventory">
          {groups.map(({ group, items }) => (
            <section key={group} className="j-bay j-glass" aria-labelledby={`bay-${group}`}>
              <header className="j-bay-head">
                <h2 id={`bay-${group}`}>{group}</h2>
                <span className="j-mono">{items.length}</span>
              </header>
              <ul className="j-bay-list">
                {items.map((item) => (
                  <li key={item.name}>
                    <span className="j-bay-icon">
                      <Image src={item.src} alt="" width={28} height={28} unoptimized />
                    </span>
                    {item.name}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <aside className="j-page-cta j-glass">
          <p>
            <strong>See them at work.</strong> Every project in the portfolio lists the stack it shipped on.
          </p>
          <Link
            href="/portofolio"
            className="j-btn j-btn-primary"
            onClick={() => trackClick('cta_clicked', { button: 'View Portfolio', section: 'skills_footer' })}
          >
            View portfolio <ArrowRight aria-hidden className="size-4" />
          </Link>
        </aside>
      </main>
    </div>
  );
}
