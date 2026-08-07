ALTER TABLE public.site_settings ADD COLUMN IF NOT EXISTS starter_kit_price numeric NOT NULL DEFAULT 4500;

INSERT INTO public.site_settings (id) VALUES (true) ON CONFLICT (id) DO NOTHING;