'use client';
import { useState, useEffect } from 'react';
import { useCMS } from '@/lib/CMSContext';
import { useToast } from '@/components/admin/ToastContext';
import { Card, Field, Textarea, Input, Btn } from '@/components/admin/ui';

export default function AboutTab() {
  const { data, save } = useCMS();
  const { toast } = useToast();
  const [missionTitle, setMissionTitle] = useState(data.about.missionTitle);
  const [missionDesc, setMissionDesc] = useState(data.about.missionDesc);
  const [vision, setVision] = useState(data.about.vision);

  useEffect(() => {
    setMissionTitle(data.about.missionTitle);
    setMissionDesc(data.about.missionDesc);
    setVision(data.about.vision);
  }, [data.about]);

  const handleSave = async () => {
    try {
      await save({ about: { missionTitle, missionDesc, vision } });
      toast('About section updated');
    } catch {
      toast('Failed to save — check your connection', 'error');
    }
  };

  return (
    <Card title="About Section" action={<Btn variant="primary" size="sm" onClick={handleSave}>Save Changes</Btn>}>
      <Field label="Mission Title"><Input value={missionTitle} onChange={e => setMissionTitle(e.target.value)} /></Field>
      <Field label="Mission Description"><Textarea value={missionDesc} onChange={e => setMissionDesc(e.target.value)} /></Field>
      <Field label="Vision Statement"><Textarea value={vision} onChange={e => setVision(e.target.value)} /></Field>
    </Card>
  );
}
