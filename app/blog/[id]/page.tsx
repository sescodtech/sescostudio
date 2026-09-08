'use client';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, Clock } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useCMS } from '@/lib/CMSContext';
import { Reveal } from '@/components/ui/Motion';

export default function BlogArticlePage() {
  const params = useParams<{ id: string }>();
  const { data } = useCMS();
  const post = data.blogPosts.find(p => String(p.id) === String(params.id) && p.status === 'published');
  if (!post) return <main style={{ minHeight:'70vh', display:'grid', placeItems:'center', padding:40 }}><div style={{textAlign:'center'}}><p className="section-label centered">Article</p><h1 style={{fontFamily:'Plus Jakarta Sans,sans-serif',fontWeight:800,fontSize:'clamp(2rem,5vw,3.5rem)',marginBottom:16}}>Article not found</h1><p style={{color:'var(--gray)',marginBottom:24}}>This article may have been unpublished or the link is no longer available.</p><Link href="/blog" className="btn btn-primary">Back to Blog</Link></div></main>;
  return <>
    <section style={{padding:'150px 5% 72px',position:'relative',overflow:'hidden'}}><div className="grid-overlay" aria-hidden="true"/><div style={{maxWidth:900,margin:'0 auto',position:'relative',zIndex:1}}>
      <Reveal><Link href="/blog" className="btn btn-ghost" style={{padding:0,marginBottom:28}}><ArrowLeft size={14}/> Back to insights</Link></Reveal>
      <Reveal delay={.08}><p className="section-label">{post.cat}</p></Reveal>
      <Reveal delay={.12}><h1 style={{fontFamily:'Plus Jakarta Sans,sans-serif',fontWeight:800,fontSize:'clamp(2.2rem,5vw,4.4rem)',lineHeight:1.08,letterSpacing:'-.035em'}}>{post.title}</h1></Reveal>
      <Reveal delay={.18}><div style={{display:'flex',alignItems:'center',gap:12,color:'var(--gray)',marginTop:22,fontSize:'.82rem'}}><span>{post.date}</span><span>·</span><span style={{display:'inline-flex',alignItems:'center',gap:5}}><Clock size={13}/>{post.readTime||'5 min read'}</span></div></Reveal>
    </div></section>
    <section className="section section-light" style={{paddingTop:40}}><article className="container" style={{maxWidth:900}}>
      <Reveal><div style={{borderRadius:20,minHeight:240,background:post.bg,display:'grid',placeItems:'center',marginBottom:48,border:'1px solid rgba(11,15,26,.08)'}}><span style={{fontSize:'4rem'}} aria-hidden="true">{post.icon}</span></div></Reveal>
      <Reveal delay={.08}><p style={{fontSize:'1.12rem',lineHeight:1.9,fontWeight:500,marginBottom:28}}>{post.excerpt}</p><div style={{fontSize:'1rem',lineHeight:1.9,whiteSpace:'pre-wrap'}}>{post.content?.trim()||'This article is being prepared. Check back soon for the full insight.'}</div></Reveal>
      <div style={{marginTop:48,paddingTop:24,borderTop:'1px solid var(--border)'}}><Link href="/contact" className="btn btn-primary">Discuss a project <ArrowUpRight size={15}/></Link></div>
    </article></section>
  </>;
}
