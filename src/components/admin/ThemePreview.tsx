import type { ThemeConfig } from '@/types/cms'
import { cn } from '@/utils/cn'
import { Palette, Type, Square, CircleDot, Layers, Play } from 'lucide-react'

interface ThemePreviewProps {
  theme: ThemeConfig
}

function ColorSwatch({ label, color }: { label: string; color: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="h-6 w-6 rounded-full border border-night/10" style={{ backgroundColor: color }} />
      <div>
        <p className="font-body text-xs font-medium text-night">{label}</p>
        <p className="font-body text-[10px] text-text-muted">{color}</p>
      </div>
    </div>
  )
}

export function ThemePreview({ theme }: ThemePreviewProps) {
  return (
    <div className="rounded-lg border border-night/10 bg-white">
      <div className="flex items-center gap-3 border-b border-night/10 p-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <Palette className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="font-heading text-lg text-night">Theme Configuration</h3>
          <p className="font-body text-xs text-text-muted">Brand visual identity</p>
        </div>
      </div>

      <div className="space-y-6 p-4">
        <div>
          <div className="mb-3 flex items-center gap-2">
            <Palette className="h-4 w-4 text-primary/60" />
            <span className="font-body text-xs font-medium uppercase tracking-wider text-text-muted">Colors</span>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {Object.entries(theme.colors).filter(([_, v]) => typeof v === 'string' && v.startsWith('#')).map(([key, color]) => (
              <ColorSwatch key={key} label={key.replace(/([A-Z])/g, ' $1').replace(/^\w/, (c) => c.toUpperCase())} color={color as string} />
            ))}
          </div>
        </div>

        <div>
          <div className="mb-3 flex items-center gap-2">
            <Type className="h-4 w-4 text-primary/60" />
            <span className="font-body text-xs font-medium uppercase tracking-wider text-text-muted">Typography</span>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-md border border-night/5 p-3">
              <p className="font-body text-xs text-text-muted">Heading Font</p>
              <p className="font-heading text-lg text-night" style={{ fontFamily: theme.typography.headingFont }}>
                {theme.typography.headingFont}
              </p>
            </div>
            <div className="rounded-md border border-night/5 p-3">
              <p className="font-body text-xs text-text-muted">Body Font</p>
              <p className="font-body text-lg text-night" style={{ fontFamily: theme.typography.bodyFont }}>
                {theme.typography.bodyFont}
              </p>
            </div>
          </div>
        </div>

        <div>
          <div className="mb-3 flex items-center gap-2">
            <Square className="h-4 w-4 text-primary/60" />
            <span className="font-body text-xs font-medium uppercase tracking-wider text-text-muted">Border Radius</span>
          </div>
          <div className="flex flex-wrap gap-3">
            {Object.entries(theme.borderRadius).map(([key, value]) => (
              <div key={key} className="flex flex-col items-center gap-1">
                <div className="border border-night/20 bg-night/[0.02]" style={{ borderRadius: value, width: 32, height: 32 }} />
                <span className="font-body text-[10px] text-text-muted">{key} ({value})</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-3 flex items-center gap-2">
            <CircleDot className="h-4 w-4 text-primary/60" />
            <span className="font-body text-xs font-medium uppercase tracking-wider text-text-muted">Shadows</span>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {Object.entries(theme.shadows).map(([key, value]) => (
              <div key={key} className="rounded-md border border-night/10 bg-white p-4" style={{ boxShadow: value }}>
                <p className="font-body text-xs font-medium text-night capitalize">{key}</p>
                <p className="font-body text-[10px] text-text-muted mt-1">{value}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-3 flex items-center gap-2">
            <Play className="h-4 w-4 text-primary/60" />
            <span className="font-body text-xs font-medium uppercase tracking-wider text-text-muted">Animation</span>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {Object.entries(theme.animations.duration).map(([key, value]) => (
              <div key={key} className="rounded-md border border-night/5 p-3">
                <p className="font-body text-xs text-text-muted capitalize">{key}</p>
                <p className="font-body text-sm text-night">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
