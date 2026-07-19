'use client';

import Image from 'next/image';
import { useStore } from '@/store';
import { projects } from '@/data/projects';
import { link } from '@/data/info';
import AppearChars from '@/components/animation/AppearChars';
import LinkButton from '@/components/ui/LinkButton';

const Project = () => {
  const setHoverText = useStore((state) => state.setHoverText);

  return (
    <section className="project" id="work">
      <div className="inner">
        <h2 className="project__title">
          <AppearChars>Selected Projects</AppearChars>
        </h2>

        <ul className="project__list">
          {projects.map((project) => (
            <li key={project.id} className="project__item">
              <a
                href={project.link}
                className="project__link"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setHoverText(project.title)}
                onMouseLeave={() => setHoverText(null)}
              >
                <div className="project__content-layer">
                  <div className="grid-inner project__content">
                    <div className="project__info">
                      <div className="project__meta-group">
                        <p className="project__meta">
                          <span>({project.meta})</span>
                          <span>©{project.year}</span>
                        </p>
                        <p className="project__meta" aria-hidden="true">
                          <span>({project.meta})</span>
                          <span>©{project.year}</span>
                        </p>
                      </div>
                      <h3 className="project__name">{project.title}</h3>
                      <div className="project__tags">
                        {project.tags.map((tag, i) => (
                          <span key={i}>{tag}</span>
                        ))}
                      </div>
                    </div>
                    <div className="project__thumbnail">
                      {project.thumbnailType === 'video' ? (
                        <video
                          src={project.thumbnailSrc}
                          autoPlay
                          muted
                          playsInline
                          loop
                        />
                      ) : (
                        <Image
                          src={project.thumbnailSrc}
                          alt={project.title}
                          width={1920}
                          height={1080}
                          priority
                        />
                      )}
                    </div>
                  </div>
                </div>

                <div className="project__bg-layer">
                  <div className="project__bg">
                    {project.thumbnailType === 'video' ? (
                      <video
                        src={project.thumbnailSrc}
                        autoPlay
                        muted
                        playsInline
                        loop
                        aria-hidden="true"
                      />
                    ) : (
                      <div
                        style={{
                          position: 'relative',
                          width: '100%',
                          height: '100%',
                        }}
                      >
                        <Image src={project.thumbnailSrc} alt="" fill />
                      </div>
                    )}
                  </div>
                </div>
              </a>
            </li>
          ))}
        </ul>

        <div className="project__btn">
          <LinkButton href={link.github} target text="ALL PROJECTS" />
        </div>
      </div>
    </section>
  );
};

export default Project;
