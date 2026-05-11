
-- Messages table for secure chat between users about listings
CREATE TABLE public.messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  listing_id UUID NOT NULL REFERENCES public.listings(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL,
  recipient_id UUID NOT NULL,
  content TEXT NOT NULL,
  read_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_messages_listing ON public.messages(listing_id);
CREATE INDEX idx_messages_pair ON public.messages(sender_id, recipient_id, listing_id, created_at);

ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Participants can view their messages"
ON public.messages FOR SELECT TO authenticated
USING (auth.uid() = sender_id OR auth.uid() = recipient_id);

CREATE POLICY "Users can send messages as themselves"
ON public.messages FOR INSERT TO authenticated
WITH CHECK (auth.uid() = sender_id AND sender_id <> recipient_id);

CREATE POLICY "Recipients can mark messages as read"
ON public.messages FOR UPDATE TO authenticated
USING (auth.uid() = recipient_id);

ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;

-- Seed real listings authored by the test accounts
INSERT INTO public.listings (user_id, type, title, description, location, price) VALUES
  ('4718d267-e989-47b6-8ef1-5968a1fd62d7', 'vendre', 'Appartement F4 standing à Hydra', 'Magnifique appartement F4 de 180m², résidence sécurisée, double exposition, parking.', 'Hydra, Alger', '18 500 000 DA'),
  ('4718d267-e989-47b6-8ef1-5968a1fd62d7', 'louer',  'Studio meublé Sidi Yahia',         'Studio entièrement meublé et équipé, idéal jeune cadre.', 'Sidi Yahia, Alger', '55 000 DA/mois'),
  ('21ce6ce4-8321-48b3-8ddf-ad9cb03b1203', 'vendre', 'Villa moderne avec jardin',         'Villa de 280m² avec jardin, garage 2 voitures, vue mer.', 'Aïn El Turk, Oran', '65 000 000 DA'),
  ('211341d2-9cf9-40ce-856b-46a0e343fdb6', 'vendre', 'Appartement F3 rénové',             'F3 entièrement rénové au centre-ville, proche commodités.', 'Oran Centre, Oran', '12 500 000 DA'),
  ('01dd849f-53a6-4cf7-b49f-873ff93b0148', 'projet', 'Résidence Les Jardins de Dahli',    'Programme neuf de 120 logements F2/F3/F4, livraison 2027.', 'Cheraga, Alger', 'À partir de 22 000 000 DA'),
  ('55a4845d-8680-4ca9-baba-0fcc5997e7a6', 'projet', 'Promobat Sky Towers',               'Tours résidentielles haut standing avec piscine et fitness.', 'Bab Ezzouar, Alger', 'À partir de 30 000 000 DA'),
  ('9917495f-8092-403d-ac37-31d8a3a607e1', 'projet', 'Cosider City Constantine',          'Projet urbain mixte logements + commerces.', 'Constantine', 'À partir de 18 000 000 DA'),
  ('0df92d5c-4067-4085-a7fb-36c18b430d70', 'notarial','Vente notariale - Villa Tlemcen',  'Vente sous autorité notariale, dossier complet et vérifié.', 'Tlemcen', '95 000 000 DA'),
  ('b35497db-31c5-4663-af57-f8e2d711f915', 'notarial','Succession - Appartement Béjaïa',  'Bien issu de succession, acte en cours de régularisation.', 'Béjaïa', '28 000 000 DA'),
  ('34094b29-a4ba-4645-a0cb-ab38ee218069', 'notarial','Adjudication - Local commercial',  'Adjudication notariale d''un local commercial 80m².', 'Constantine', '15 000 000 DA');
