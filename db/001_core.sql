-- V0 structure only. No financial movements or access policies are activated here.
-- Run in PostgreSQL 15+ with a migration role. Application use requires a later
-- migration with authenticated tenant policies and a server-side authorization layer.
BEGIN;

CREATE TABLE accounts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  phone_e164 text NOT NULL UNIQUE CHECK (phone_e164 ~ '^\+[1-9][0-9]{6,14}$'),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE associations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL CHECK (length(trim(name)) > 0),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE memberships (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  association_id uuid NOT NULL REFERENCES associations(id),
  account_id uuid NOT NULL REFERENCES accounts(id),
  display_name text NOT NULL CHECK (length(trim(display_name)) > 0),
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','active','departed')),
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (association_id, account_id),
  UNIQUE (association_id, id)
);

CREATE TABLE branches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  association_id uuid NOT NULL REFERENCES associations(id),
  name text NOT NULL CHECK (length(trim(name)) > 0),
  meeting_rule text,
  UNIQUE (association_id, id),
  UNIQUE (association_id, name)
);

CREATE TABLE office_assignments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  association_id uuid NOT NULL,
  membership_id uuid NOT NULL,
  branch_id uuid,
  role text NOT NULL CHECK (role IN ('president','treasurer','auditor','secretary')),
  starts_at timestamptz NOT NULL DEFAULT now(),
  ends_at timestamptz,
  CHECK (ends_at IS NULL OR ends_at > starts_at),
  FOREIGN KEY (association_id, membership_id) REFERENCES memberships(association_id, id),
  FOREIGN KEY (association_id, branch_id) REFERENCES branches(association_id, id)
);

CREATE TABLE fund_reference_versions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  association_id uuid NOT NULL REFERENCES associations(id),
  amount_xaf bigint NOT NULL CHECK (amount_xaf > 0),
  effective_from date NOT NULL,
  source_note text NOT NULL,
  UNIQUE (association_id, effective_from)
);

CREATE TABLE tontines (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  association_id uuid NOT NULL,
  branch_id uuid NOT NULL,
  contribution_xaf bigint NOT NULL CHECK (contribution_xaf > 0),
  FOREIGN KEY (association_id, branch_id) REFERENCES branches(association_id, id),
  UNIQUE (association_id, id)
);

CREATE TABLE cycles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  association_id uuid NOT NULL,
  tontine_id uuid NOT NULL,
  name text NOT NULL CHECK (length(trim(name)) > 0),
  positions_per_meeting integer NOT NULL CHECK (positions_per_meeting > 0),
  status text NOT NULL DEFAULT 'preparing' CHECK (status IN ('preparing','active','closed')),
  FOREIGN KEY (association_id, tontine_id) REFERENCES tontines(association_id, id),
  UNIQUE (association_id, id),
  UNIQUE (tontine_id, name)
);

CREATE TABLE positions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  association_id uuid NOT NULL,
  cycle_id uuid NOT NULL,
  membership_id uuid NOT NULL,
  position_number integer NOT NULL CHECK (position_number > 0),
  planned_meeting integer CHECK (planned_meeting > 0),
  FOREIGN KEY (association_id, cycle_id) REFERENCES cycles(association_id, id),
  FOREIGN KEY (association_id, membership_id) REFERENCES memberships(association_id, id),
  UNIQUE (cycle_id, position_number)
);

CREATE TABLE admissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  association_id uuid NOT NULL,
  membership_id uuid NOT NULL,
  reference_at_start_xaf bigint NOT NULL CHECK (reference_at_start_xaf > 0),
  due_on date,
  opened_at timestamptz NOT NULL DEFAULT now(),
  FOREIGN KEY (association_id, membership_id) REFERENCES memberships(association_id, id),
  UNIQUE (membership_id)
);

CREATE INDEX memberships_by_account ON memberships(account_id, status);
CREATE INDEX branches_by_association ON branches(association_id);
CREATE INDEX assignments_by_member ON office_assignments(association_id, membership_id);
CREATE INDEX positions_by_holder ON positions(association_id, membership_id);
CREATE INDEX positions_by_cycle ON positions(association_id, cycle_id);

-- Deny application roles by default until authenticated policies are introduced.
ALTER TABLE accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE associations ENABLE ROW LEVEL SECURITY;
ALTER TABLE memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE branches ENABLE ROW LEVEL SECURITY;
ALTER TABLE office_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE fund_reference_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE tontines ENABLE ROW LEVEL SECURITY;
ALTER TABLE cycles ENABLE ROW LEVEL SECURITY;
ALTER TABLE positions ENABLE ROW LEVEL SECURITY;
ALTER TABLE admissions ENABLE ROW LEVEL SECURITY;

COMMIT;
