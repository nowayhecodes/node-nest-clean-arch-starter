CREATE TABLE public.templates (
	id uuid NOT NULL,
	alternative_id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ,
	created_date timestamp with time zone NOT NULL,
	updated_date timestamp with time zone,
	deleted_date timestamp with time zone,
	CONSTRAINT pk__templates PRIMARY KEY (id)
);
-- ddl-end --
COMMENT ON COLUMN public.templates.id IS E'The unique identifier for the object.';
-- ddl-end --
COMMENT ON COLUMN public.templates.alternative_id IS E'The auto generated sequential identifier.';
-- ddl-end --
COMMENT ON COLUMN public.templates.created_date IS E'The date of create.';
-- ddl-end --
COMMENT ON COLUMN public.templates.updated_date IS E'The date of last update.';
-- ddl-end --
COMMENT ON COLUMN public.templates.deleted_date IS E'The date of delete. Used by the soft delete.';
-- ddl-end --
ALTER TABLE public.templates OWNER TO admin_tenant;
-- ddl-end --
CREATE TABLE public.tenants (
	id uuid NOT NULL,
	alternative_id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ,
	name varchar(100) NOT NULL,
	slug varchar(58) NOT NULL,
	url varchar(400) NOT NULL,
	database_host varchar(400) NOT NULL,
	database_port integer NOT NULL,
	database_name varchar(63) NOT NULL,
	database_schema varchar(63) NOT NULL,
	database_username varchar(63) NOT NULL,
	database_password varchar(256) NOT NULL,
	image_uploaded_date timestamp with time zone,
	design_tokens jsonb NOT NULL,
	blocked_date timestamptz,
	created_date timestamp with time zone NOT NULL,
	updated_date timestamp with time zone,
	deleted_date timestamp with time zone,
	CONSTRAINT pk__tenants PRIMARY KEY (id)
);
-- ddl-end --
COMMENT ON COLUMN public.tenants.id IS E'The unique identifier for the object.';
-- ddl-end --
COMMENT ON COLUMN public.tenants.alternative_id IS E'The auto generated sequential identifier.';
-- ddl-end --
COMMENT ON COLUMN public.tenants.name IS E'The tenant name.';
-- ddl-end --
COMMENT ON COLUMN public.tenants.slug IS E'The tenant slug. It is used to identify the tenant between the frontend. It is stored in the frontend local storage.';
-- ddl-end --
COMMENT ON COLUMN public.tenants.url IS E'The tenant url. It is used to return the tenant info from the url accessed in the frontend. Example are flamengo.app.com.br, vasco.app.com.br, fluminense.app.com.br, etc.';
-- ddl-end --
COMMENT ON COLUMN public.tenants.database_host IS E'The tenant database host url.';
-- ddl-end --
COMMENT ON COLUMN public.tenants.database_port IS E'The tenant database port.';
-- ddl-end --
COMMENT ON COLUMN public.tenants.database_name IS E'The tenant database name.';
-- ddl-end --
COMMENT ON COLUMN public.tenants.database_schema IS E'The tenant database schema.';
-- ddl-end --
COMMENT ON COLUMN public.tenants.database_username IS E'The tenant database username.';
-- ddl-end --
COMMENT ON COLUMN public.tenants.database_password IS E'The tenant database password.';
-- ddl-end --
COMMENT ON COLUMN public.tenants.image_uploaded_date IS E'The date the tenant image was uploaded.';
-- ddl-end --
COMMENT ON COLUMN public.tenants.design_tokens IS E'The tenant design tokens.';
-- ddl-end --
COMMENT ON COLUMN public.tenants.blocked_date IS E'The date the tenant was blocked.';
-- ddl-end --
COMMENT ON COLUMN public.tenants.created_date IS E'The date of create.';
-- ddl-end --
COMMENT ON COLUMN public.tenants.updated_date IS E'The date of last update.';
-- ddl-end --
COMMENT ON COLUMN public.tenants.deleted_date IS E'The date of delete. Used by the soft delete.';
-- ddl-end --
ALTER TABLE public.tenants OWNER TO admin_tenant;
-- ddl-end --
CREATE UNIQUE INDEX idx__uq__tenants__slug ON public.tenants
USING btree
(
	slug,
	deleted_date ASC NULLS FIRST
);
-- ddl-end --
CREATE UNIQUE INDEX idx__part__uq__tenants__slug ON public.tenants
USING btree
(
	slug
)
WHERE (deleted_date is null);
-- ddl-end --
CREATE UNIQUE INDEX idx__uq__tenants__url ON public.tenants
USING btree
(
	url,
	deleted_date ASC NULLS FIRST
);
-- ddl-end --
CREATE UNIQUE INDEX idx__part__uq__tenants__url ON public.tenants
USING btree
(
	url
)
WHERE (deleted_date is null);
-- ddl-end --
CREATE UNIQUE INDEX idx__uq__tenants__database ON public.tenants
USING btree
(
	database_host,
	database_port,
	database_name,
	database_schema,
	deleted_date ASC NULLS FIRST
);
-- ddl-end --
CREATE UNIQUE INDEX idx__part__uq__tenants__database ON public.tenants
USING btree
(
	database_host,
	database_port,
	database_name,
	database_schema
)
WHERE (deleted_date is null);
-- ddl-end --
CREATE TABLE public.buckets (
	id uuid NOT NULL,
	alternative_id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ,
	tenant_id uuid NOT NULL,
	region varchar(10) NOT NULL,
	name varchar(300) NOT NULL,
	account_number varchar(50) NOT NULL,
	access_key_id varchar(256) NOT NULL,
	secret_access_key varchar(256) NOT NULL,
	is_public bool NOT NULL,
	is_active bool NOT NULL,
	created_date timestamp with time zone NOT NULL,
	updated_date timestamp with time zone,
	deleted_date timestamp with time zone,
	CONSTRAINT pk__buckets PRIMARY KEY (id)
);
-- ddl-end --
COMMENT ON COLUMN public.buckets.id IS E'The unique identifier for the object.';
-- ddl-end --
COMMENT ON COLUMN public.buckets.alternative_id IS E'The auto generated sequential identifier.';
-- ddl-end --
COMMENT ON COLUMN public.buckets.region IS E'The bucket region. Examples for AWS are us-east-1, us-west-1, sa-east-1, etc.';
-- ddl-end --
COMMENT ON COLUMN public.buckets.name IS E'The bucket name.';
-- ddl-end --
COMMENT ON COLUMN public.buckets.account_number IS E'The bucket account_number.';
-- ddl-end --
COMMENT ON COLUMN public.buckets.access_key_id IS E'The bucket access key id. Must be stored encrypted.';
-- ddl-end --
COMMENT ON COLUMN public.buckets.secret_access_key IS E'The bucket secret_access_key. Must be stored encrypted.';
-- ddl-end --
COMMENT ON COLUMN public.buckets.is_public IS E'Whatever the bucked is public or private. True if it is public.';
-- ddl-end --
COMMENT ON COLUMN public.buckets.is_active IS E'Whatever the bucked is active. True if it is active.';
-- ddl-end --
COMMENT ON COLUMN public.buckets.created_date IS E'The date of create.';
-- ddl-end --
COMMENT ON COLUMN public.buckets.updated_date IS E'The date of last update.';
-- ddl-end --
COMMENT ON COLUMN public.buckets.deleted_date IS E'The date of delete. Used by the soft delete.';
-- ddl-end --
ALTER TABLE public.buckets OWNER TO admin_tenant;
-- ddl-end --
ALTER TABLE public.buckets ADD CONSTRAINT fk__tenants__buckets FOREIGN KEY (tenant_id)
REFERENCES public.tenants (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE RESTRICT DEFERRABLE INITIALLY IMMEDIATE;
-- ddl-end --
CREATE UNIQUE INDEX idx__uq__buckets ON public.buckets
USING btree
(
	region,
	name,
	deleted_date ASC NULLS FIRST
);
-- ddl-end --
CREATE UNIQUE INDEX idx__part__uq__buckets ON public.buckets
USING btree
(
	region,
	name
)
WHERE (deleted_date is null);
-- ddl-end --