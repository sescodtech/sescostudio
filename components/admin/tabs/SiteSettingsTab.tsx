'use client';
import { useState } from 'react';
import { useCMS } from '@/lib/CMSContext';
import { useToast } from '@/components/admin/ToastContext';
import { Card, Field, Input, Textarea, Btn } from '@/components/admin/ui';

export default function SiteSettingsTab() {
  const { data, save } = useCMS();
  const { toast } = useToast();
  const [prevSettings, setPrevSettings] = useState(data.siteSettings);
  const [maintenanceMode, setMaintenanceMode] = useState(data.siteSettings.maintenanceMode);
  const [maintenanceMessage, setMaintenanceMessage] = useState(data.siteSettings.maintenanceMessage);
  const [analyticsId, setAnalyticsId] = useState(data.siteSettings.analyticsId || '');

  if (data.siteSettings !== prevSettings) {
    setPrevSettings(data.siteSettings);
    setMaintenanceMode(data.siteSettings.maintenanceMode);
    setMaintenanceMessage(data.siteSettings.maintenanceMessage);
    setAnalyticsId(data.siteSettings.analyticsId || '');
  }

  const handleSave = async () => {
    try {
      await save({ siteSettings: { maintenanceMode, maintenanceMessage, analyticsId } });
      toast('Site settings updated');
    } catch {
      toast('Failed to save — check your connection', 'error');
    }
  };

  return (
    <Card title="Site Settings" action={<Btn variant="primary" size="sm" onClick={handleSave}>Save Changes</Btn>}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20, padding: 16, background: 'var(--navy2)', borderRadius: 8, border: '1px solid var(--border)' }}>
        <input type="checkbox" id="maint" checked={maintenanceMode} onChange={e => setMaintenanceMode(e.target.checked)} style={{ width: 18, height: 18 }} />
        <label htmlFor="maint" style={{ fontSize: '.9rem', cursor: 'pointer' }}>Maintenance mode is <strong style={{ color: maintenanceMode ? '#ef4444' : '#22c55e' }}>{maintenanceMode ? 'ON — visitors see a maintenance message' : 'OFF — site is live'}</strong></label>
      </div>
      <Field label="Maintenance Message"><Textarea value={maintenanceMessage} onChange={e => setMaintenanceMessage(e.target.value)} style={{ minHeight: 70 }} /></Field>
      <Field label="Analytics ID (Google Analytics / Plausible — optional)"><Input value={analyticsId} onChange={e => setAnalyticsId(e.target.value)} placeholder="G-XXXXXXXXXX" /></Field>
      <p style={{ color: 'var(--gray)', fontSize: '.78rem' }}>
        Adding an ID here does not connect analytics on its own — see the note on the Dashboard for the one code change needed to activate tracking.
      </p>
    </Card>
  );
}
