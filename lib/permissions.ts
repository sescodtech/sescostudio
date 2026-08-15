'use client';
import { useAdminAuth } from '@/lib/AdminAuthContext';

export type Role = 'super_admin' | 'admin' | 'editor' | 'author' | 'developer' | 'marketing';

export type Capability =
  | 'manage_users' | 'manage_cms' | 'manage_media_upload' | 'manage_media_delete'
  | 'manage_seo' | 'toggle_maintenance' | 'manage_navigation' | 'manage_footer'
  | 'view_submissions' | 'delete_submissions' | 'manage_integrations' | 'manage_analytics'
  | 'manage_portfolio' | 'manage_blog_all' | 'create_blog' | 'manage_team' | 'manage_faq'
  | 'manage_services' | 'manage_testimonials' | 'manage_newsletters' | 'view_logs' | 'debug_tools'
  | 'manage_settings';

export const ROLE_LABELS: Record<Role, string> = {
  super_admin: 'Super Admin', admin: 'Admin', editor: 'Editor',
  author: 'Author', developer: 'Developer', marketing: 'Marketing',
};

const ALL: Capability[] = [
  'manage_users', 'manage_cms', 'manage_media_upload', 'manage_media_delete', 'manage_seo',
  'toggle_maintenance', 'manage_navigation', 'manage_footer', 'view_submissions', 'delete_submissions',
  'manage_integrations', 'manage_analytics', 'manage_portfolio', 'manage_blog_all', 'create_blog',
  'manage_team', 'manage_faq', 'manage_services', 'manage_testimonials', 'manage_newsletters',
  'view_logs', 'debug_tools', 'manage_settings',
];

export const ROLE_PERMISSIONS: Record<Role, Capability[]> = {
  super_admin: ALL,
  admin: [
    'manage_cms', 'manage_media_upload', 'manage_media_delete', 'manage_portfolio', 'manage_blog_all',
    'manage_team', 'manage_faq', 'manage_services', 'manage_testimonials', 'manage_navigation',
    'manage_footer', 'view_submissions',
  ],
  editor: [
    'manage_cms', 'manage_media_upload', 'manage_services', 'manage_portfolio', 'manage_testimonials',
    'manage_faq', 'manage_team',
  ],
  author: ['create_blog', 'manage_media_upload'],
  developer: ['manage_integrations', 'view_logs', 'debug_tools', 'toggle_maintenance'],
  marketing: ['manage_newsletters', 'view_submissions', 'manage_seo', 'manage_analytics'],
};

export function usePermissions() {
  const { role } = useAdminAuth();
  const can = (capability: Capability): boolean => {
    if (!role) return false;
    return ROLE_PERMISSIONS[role].includes(capability);
  };
  return { role, can };
}
