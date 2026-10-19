'use client';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { useCMS } from '@/lib/CMSContext';
export default function ProjectDetailPage(){
  const { data } = useCMS();
  const params = useParams();
  const project = data.projects.find(p => String(p.id) === String(params.id));
  if (!project) return <main className="case-detail"><div className="container"><h1>Project not found</h1><p>This project may have been removed or is no longer available.</p><Link href="/portfolio">Back to portfolio</Link></div></main>;
  return <main className="case-detail"><div className="container">
    <Link className="case-back" href="/portfolio"><ArrowLeft size={16}/> All projects</Link>
    <p className="section-label">{project.type}</p><h1>{project.title}</h1><p className="case-intro">{project.desc}</p>
    <div className="case-detail-actions">{project.link && <a href={project.link} target="_blank" rel="noopener noreferrer" className="portfolio-visit-btn">Visit live website <ArrowUpRight size={17}/></a>}<Link href="/contact" className="case-contact">Discuss a similar project <ArrowUpRight size={17}/></Link></div>
    <div className="case-detail-visual">{project.preview ? <img src={project.preview} alt={`${project.title} website preview`} /> : <div className="portfolio-preview-placeholder"><strong>{project.title}</strong><small>Project screenshot not yet uploaded</small></div>}</div>
    <div className="case-detail-grid"><section><h2>Project overview</h2><p>{project.desc}</p>{project.challenge && <><h2>The challenge</h2><p>{project.challenge}</p></>}</section><aside><h2>Project details</h2><p><strong>Category</strong><span>{project.type}</span></p>{project.tags.length > 0 && <><h3>Technologies</h3><div className="portfolio-tech-list">{project.tags.map(t=><span key={t} className="portfolio-tech">{t}</span>)}</div></>}{project.results && <><h3>Project highlight</h3><p>{project.results}</p></>}</aside></div>
  </div></main>;
}
