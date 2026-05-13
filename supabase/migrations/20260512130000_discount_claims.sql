-- Create discount_claims table to prevent duplicate coupon generation
CREATE TABLE IF NOT EXISTS public.discount_claims (
    email TEXT PRIMARY KEY,
    stripe_coupon_id TEXT NOT NULL,
    claimed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.discount_claims ENABLE ROW LEVEL SECURITY;

-- Allow the edge functions (service role) to manage this table
-- Note: Service role bypasses RLS by default, but we add a policy for clarity
CREATE POLICY "Service role can manage discount claims" 
ON public.discount_claims 
FOR ALL 
TO service_role 
USING (true) 
WITH CHECK (true);
