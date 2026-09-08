'use client';
import { useState } from 'react';
import { useCMS } from '@/lib/CMSContext';
import { useToast } from '@/components/admin/ToastContext';
import { Card, Field, Input, Textarea, Btn } from '@/components/admin/ui';
import { usePermissions } from '@/lib/permissions';
import { emitNotification } from '@/lib/notificationBus';

export default function SiteSettingsTab() {
  const { data, save } = useCMS();
  const { toast } = useToast();
  const { can } = usePermissions();
  const [prevSettings, setPrevSettings] = useState(data.siteSettings);
  const [maintenanceMode, setMaintenanceMode] = useState(data.siteSettings.maintenanceMode);
  const [maintenanceMessage, setMaintenanceMessage] = useState(data.siteSettings.maintenanceMessage);
  const [ga4Id, setGa4Id] = useState(data.siteSettings.ga4Id || '');
  const [gtmId, setGtmId] = useState(data.siteSettings.gtmId || '');
  const [clarityId, setClarityId] = useState(data.siteSettings.clarityId || '');
  const [portfolioNote, setPortfolioNote] = useState(data.siteSettings.portfolioNote || 'We have delivered additional websites, digital platforms, business systems, and custom solutions that are not included in this public showcase. Our portfolio represents a selection of work, not everything we have built.');

  if (data.siteSettings !== prevSettings) {
    setPrevSettings(data.siteSettings);
    setMaintenanceMode(data.siteSettings.maintenanceMode);
    setMaintenanceMessage(data.siteSettings.maintenanceMessage);
    setGa4Id(data.siteSettings.ga4Id || '');
    setGtmId(data.siteSettings.gtmId || '');
    setClarityId(data.siteSettings.clarityId || '');
    setPortfolioNote(data.siteSettings.portfolioNote || 'We have delivered additional websites, digital platforms, business systems, and custom solutions that are not included in this public showcase. Our portfolio represents a selection of work, not everything we have built.');
  }

  const handleSaveMaintenance = async () => {
    try {
      await save({ siteSettings: { ...data.siteSettings, maintenanceMode, maintenanceMessage } });
      emitNotification({
        type: maintenanceMode ? 'maintenance_on' : 'maintenance_off',
        message: maintenanceMode ? 'Maintenance mode was enabled' : 'Maintenance mode was disabled',
      });
      toast(maintenanceMode ? 'Maintenance mode enabled' : 'Maintenance mode disabled');
    } catch {
      toast('Failed to save — check your connection', 'error');
    }
  };
  const handleSavePortfolio = async () => {
    try {
      await save({ siteSettings: { ...data.siteSettings, portfolioNote } });
      toast('Portfolio statement updated');
    } catch {
      toast('Failed to save — check your connection', 'error');
    }
  };

  const handleSaveAnalytics = async () => {
    try {
      await save({ siteSettings: { ...data.siteSettings, ga4Id, gtmId, clarityId } });
      toast('Analytics settings updated');
    } catch {
      toast('Failed to save — check your connection', 'error');
    }
  };

  const configuredCount = [ga4Id, gtmId, clarityId].filter(Boolean).length;

  return (
    <>
      {can('toggle_maintenance') && (
        <Card title="Maintenance Mode" action={<Btn variant="primary" size="sm" onClick={handleSaveMaintenance}>Save</Btn>}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20, padding: 16, background: 'var(--navy2)', borderRadius: 8, border: '1px solid var(--border)' }}>
            <input type="checkbox" id="maint" checked={maintenanceMode} onChange={e => setMaintenanceMode(e.target.checked)} style={{ width: 18, height: 18 }} />
            <label htmlFor="maint" style={{ fontSize: '.9rem', cursor: 'pointer' }}>Maintenance mode is <strong style={{ color: maintenanceMode ? '#ef4444' : '#22c55e' }}>{maintenanceMode ? 'ON — visitors see a maintenance message' : 'OFF — site is live'}</strong></label>
          </div>
          <Field label="Maintenance Message"><Textarea value={maintenanceMessage} onChange={e => setMaintenanceMessage(e.target.value)} style={{ minHeight: 70 }} /></Field>
        </Card>
      )}


      <Card title="Portfolio Presentation" action={<Btn variant="primary" size="sm" onClick={handleSavePortfolio}>Save</Btn>}>
        <p style={{ color: 'var(--gray)', fontSize: '.82rem', lineHeight: 1.7, marginBottom: 14 }}>Use this statement to explain that the public portfolio is a curated selection. It does not restrict or hide any existing project.</p>
        <Field label="Additional Work Statement"><Textarea value={portfolioNote} onChange={e => setPortfolioNote(e.target.value)} style={{ minHeight: 120 }} /></Field>
      </Card>

      {can('manage_analytics') && (
        <Card title="Analytics" action={<Btn variant="primary" size="sm" onClick={handleSaveAnalytics}>Save</Btn>}>
          {configuredCount === 0 ? (
            <div style={{ padding: 20, textAlign: 'center', background: 'var(--navy2)', borderRadius: 8, border: '1px dashed var(--border)', marginBottom: 20 }}>
              <p style={{ color: 'var(--gray)', fontSize: '.85rem' }}>No analytics provider configured yet. Add an ID below to start collecting real data — there are no simulated stats on this dashboard.</p>
            </div>
          ) : (
            <p style={{ color: '#22c55e', fontSize: '.82rem', marginBottom: 20 }}>{configuredCount} provider{configuredCount > 1 ? 's' : ''} active — scripts load automatically on every page.</p>
          )}
          <Field label="Google Analytics 4 — Measurement ID"><Input value={ga4Id} onChange={e => setGa4Id(e.target.value)} placeholder="G-XXXXXXXXXX" /></Field>
          <Field label="Google Tag Manager — Container ID"><Input value={gtmId} onChange={e => setGtmId(e.target.value)} placeholder="GTM-XXXXXXX" /></Field>
          <Field label="Microsoft Clarity — Project ID"><Input value={clarityId} onChange={e => setClarityId(e.target.value)} placeholder="abcdefghij" /></Field>
          <p style={{ color: 'var(--gray)', fontSize: '.78rem' }}>
            View real traffic data in each provider&apos;s own dashboard (analytics.google.com, tagmanager.google.com, clarity.microsoft.com) — this panel only controls whether their tracking script loads on your site.
          </p>
        </Card>
      )}
    </>
  );
}
