DO
$do$
BEGIN
   IF EXISTS (
      SELECT FROM pg_catalog.pg_roles
      WHERE  rolname = 'admin_project') THEN

      RAISE NOTICE 'Role "admin_project" already exists. Skipping.';
   ELSE
      CREATE ROLE admin_project WITH;
   END IF;
END
$do$;

-- object: public.users | type: TABLE --
-- DROP TABLE IF EXISTS public.users CASCADE;
CREATE TABLE public.users (
	id uuid NOT NULL,
	alternative_id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ,
	first_name varchar(200) NOT NULL,
	last_name varchar(200) NOT NULL,
	email varchar(300) NOT NULL,
	email_confirmed_date timestamp with time zone,
	password_hash varchar NOT NULL,
	security_token varchar,
	access_failed_count smallint NOT NULL,
	lockout_end_date timestamp with time zone,
	admin_blocked_date timestamp with time zone,
	avatar_image_uploaded_date timestamp with time zone,
	logout_date timestamp with time zone,
	time_zone_id uuid NOT NULL,
	language_id uuid NOT NULL,
	address_state_id uuid,
	created_date timestamp with time zone NOT NULL,
	updated_date timestamp with time zone,
	deleted_date timestamp with time zone,
	CONSTRAINT pk__users PRIMARY KEY (id)
);
-- ddl-end --
COMMENT ON COLUMN public.users.id IS E'The unique identifier for the object.';
-- ddl-end --
COMMENT ON COLUMN public.users.alternative_id IS E'The auto generated sequential identifier.';
-- ddl-end --
COMMENT ON COLUMN public.users.first_name IS E'The first name of the user.';
-- ddl-end --
COMMENT ON COLUMN public.users.last_name IS E'The last name of the user.';
-- ddl-end --
COMMENT ON COLUMN public.users.email IS E'The unique email of the user.';
-- ddl-end --
COMMENT ON COLUMN public.users.email_confirmed_date IS E'The email confirmation date. It is set by the confirmation link sent by email.';
-- ddl-end --
COMMENT ON COLUMN public.users.password_hash IS E'The password hash of the user.';
-- ddl-end --
COMMENT ON COLUMN public.users.security_token IS E'The security token of the user. It is used for a JWT to recover the user password.';
-- ddl-end --
COMMENT ON COLUMN public.users.access_failed_count IS E'The count of failed login attempts. It is used to block the user for a certain period of time after X attempts.';
-- ddl-end --
COMMENT ON COLUMN public.users.lockout_end_date IS E'The lockout end date after too many failed attempts.';
-- ddl-end --
COMMENT ON COLUMN public.users.admin_blocked_date IS E'The date the admin blocked the user access.';
-- ddl-end --
COMMENT ON COLUMN public.users.avatar_image_uploaded_date IS E'The date the user uploaded the avatar. It is used to show the avatar or a default image. This date is used to version the image and avoid the cache of the browser when the image is changed.';
-- ddl-end --
COMMENT ON COLUMN public.users.logout_date IS E'The user last logout date. It''s is used to invalidate tokens older than this date. It is filled when the user logout and the system_configuration of logout enabled is active.';
-- ddl-end --
COMMENT ON COLUMN public.users.created_date IS E'The date of create.';
-- ddl-end --
COMMENT ON COLUMN public.users.updated_date IS E'The date of last update.';
-- ddl-end --
COMMENT ON COLUMN public.users.deleted_date IS E'The date of delete. Used by the soft delete.';
-- ddl-end --
ALTER TABLE public.users OWNER TO admin_project;
-- ddl-end --

-- object: public.user_logins | type: TABLE --
-- DROP TABLE IF EXISTS public.user_logins CASCADE;
CREATE TABLE public.user_logins (
	id uuid NOT NULL,
	alternative_id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ,
	user_id uuid NOT NULL,
	provider varchar(20) NOT NULL,
	provider_key varchar(128) NOT NULL,
	created_date timestamp with time zone NOT NULL,
	updated_date timestamp with time zone,
	deleted_date timestamp with time zone,
	CONSTRAINT pk__user_logins PRIMARY KEY (id)
);
-- ddl-end --
COMMENT ON COLUMN public.user_logins.id IS E'The unique identifier for the object.';
-- ddl-end --
COMMENT ON COLUMN public.user_logins.alternative_id IS E'The auto generated sequential identifier.';
-- ddl-end --
COMMENT ON COLUMN public.user_logins.provider IS E'The provider of the user login. Examples are Facebook, Google, Apple.';
-- ddl-end --
COMMENT ON COLUMN public.user_logins.provider_key IS E'The provider key of the user login.';
-- ddl-end --
COMMENT ON COLUMN public.user_logins.created_date IS E'The date of create.';
-- ddl-end --
COMMENT ON COLUMN public.user_logins.updated_date IS E'The date of last update.';
-- ddl-end --
COMMENT ON COLUMN public.user_logins.deleted_date IS E'The date of delete. Used by the soft delete.';
-- ddl-end --
ALTER TABLE public.user_logins OWNER TO admin_project;
-- ddl-end --

-- object: public.languages | type: TABLE --
-- DROP TABLE IF EXISTS public.languages CASCADE;
CREATE TABLE public.languages (
	id uuid NOT NULL,
	alternative_id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ,
	name varchar(100) NOT NULL,
	native_name varchar(100) NOT NULL,
	iso_code varchar(8) NOT NULL,
	is_default bool NOT NULL,
	is_active bool NOT NULL,
	created_date timestamp with time zone NOT NULL,
	updated_date timestamp with time zone,
	deleted_date timestamp with time zone,
	CONSTRAINT pk__languages PRIMARY KEY (id)
);
-- ddl-end --
COMMENT ON COLUMN public.languages.id IS E'The unique identifier for the object.';
-- ddl-end --
COMMENT ON COLUMN public.languages.alternative_id IS E'The auto generated sequential identifier.';
-- ddl-end --
COMMENT ON COLUMN public.languages.name IS E'The language name. Examples are Engilsh, Portuguese, Spanish.';
-- ddl-end --
COMMENT ON COLUMN public.languages.native_name IS E'The language native name. Examples for Engilsh is English, for Portuguese is Português, for Spanish is Español.';
-- ddl-end --
COMMENT ON COLUMN public.languages.iso_code IS E'The iso code of the language.';
-- ddl-end --
COMMENT ON COLUMN public.languages.is_default IS E'Whatever is the default language. True if it is the default.';
-- ddl-end --
COMMENT ON COLUMN public.languages.is_active IS E'Whatever the language is active. True if it is active.';
-- ddl-end --
COMMENT ON COLUMN public.languages.created_date IS E'The date of create.';
-- ddl-end --
COMMENT ON COLUMN public.languages.updated_date IS E'The date of last update.';
-- ddl-end --
COMMENT ON COLUMN public.languages.deleted_date IS E'The date of delete. Used by the soft delete.';
-- ddl-end --
ALTER TABLE public.languages OWNER TO admin_project;
-- ddl-end --

-- object: public.currencies | type: TABLE --
-- DROP TABLE IF EXISTS public.currencies CASCADE;
CREATE TABLE public.currencies (
	id uuid NOT NULL,
	alternative_id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ,
	name character varying(50) NOT NULL,
	symbol character varying(5) NOT NULL,
	iso_code character varying(3) NOT NULL,
	is_default bool NOT NULL,
	is_active bool NOT NULL,
	created_date timestamp with time zone NOT NULL,
	updated_date timestamp with time zone,
	deleted_date timestamp with time zone,
	CONSTRAINT pk__currencies PRIMARY KEY (id)
);
-- ddl-end --
COMMENT ON COLUMN public.currencies.id IS E'The unique identifier for the object.';
-- ddl-end --
COMMENT ON COLUMN public.currencies.alternative_id IS E'The auto generated sequential identifier.';
-- ddl-end --
COMMENT ON COLUMN public.currencies.name IS E'The name of the currency. Examples are Dolar, Real and Euro.';
-- ddl-end --
COMMENT ON COLUMN public.currencies.symbol IS E'The symbol of the currency. Examples are $ for Dolar, R$ for Real and € for Euro.';
-- ddl-end --
COMMENT ON COLUMN public.currencies.iso_code IS E'The iso code of the currency. Examples are USD for Dolar, BRL for Real and EUR for Euro.';
-- ddl-end --
COMMENT ON COLUMN public.currencies.is_default IS E'Whatever the currency is the default. True if it the default.';
-- ddl-end --
COMMENT ON COLUMN public.currencies.is_active IS E'Whatever the currency is active. True if it is active.';
-- ddl-end --
COMMENT ON COLUMN public.currencies.created_date IS E'The date of create.';
-- ddl-end --
COMMENT ON COLUMN public.currencies.updated_date IS E'The date of last update.';
-- ddl-end --
COMMENT ON COLUMN public.currencies.deleted_date IS E'The date of delete. Used by the soft delete.';
-- ddl-end --
ALTER TABLE public.currencies OWNER TO admin_project;
-- ddl-end --

-- object: public.roles | type: TABLE --
-- DROP TABLE IF EXISTS public.roles CASCADE;
CREATE TABLE public.roles (
	id uuid NOT NULL,
	alternative_id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ,
	name varchar(150) NOT NULL,
	is_user_default bool NOT NULL,
	is_admin_default bool NOT NULL,
	created_date timestamp with time zone NOT NULL,
	updated_date timestamp with time zone,
	deleted_date timestamp with time zone,
	CONSTRAINT pk__roles PRIMARY KEY (id)
);
-- ddl-end --
COMMENT ON COLUMN public.roles.id IS E'The unique identifier for the object.';
-- ddl-end --
COMMENT ON COLUMN public.roles.alternative_id IS E'The auto generated sequential identifier.';
-- ddl-end --
COMMENT ON COLUMN public.roles.name IS E'The name of the role. It is created by the user to group functionalities.';
-- ddl-end --
COMMENT ON COLUMN public.roles.is_user_default IS E'Whaterver is the default user role. True if it is the default user role.';
-- ddl-end --
COMMENT ON COLUMN public.roles.is_admin_default IS E'Whaterver is the default admin role. True if it is the default admin role.';
-- ddl-end --
COMMENT ON COLUMN public.roles.created_date IS E'The date of create.';
-- ddl-end --
COMMENT ON COLUMN public.roles.updated_date IS E'The date of last update.';
-- ddl-end --
COMMENT ON COLUMN public.roles.deleted_date IS E'The date of delete. Used by the soft delete.';
-- ddl-end --
ALTER TABLE public.roles OWNER TO admin_project;
-- ddl-end --

-- object: public.user_roles | type: TABLE --
-- DROP TABLE IF EXISTS public.user_roles CASCADE;
CREATE TABLE public.user_roles (
	id uuid NOT NULL,
	alternative_id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ,
	user_id uuid NOT NULL,
	role_id uuid NOT NULL,
	created_date timestamp with time zone NOT NULL,
	updated_date timestamp with time zone,
	deleted_date timestamp with time zone,
	CONSTRAINT pk__user_roles PRIMARY KEY (id)
);
-- ddl-end --
COMMENT ON TABLE public.user_roles IS E'admin\noperador de CRM';
-- ddl-end --
COMMENT ON COLUMN public.user_roles.id IS E'The unique identifier for the object.';
-- ddl-end --
COMMENT ON COLUMN public.user_roles.alternative_id IS E'The auto generated sequential identifier.';
-- ddl-end --
COMMENT ON COLUMN public.user_roles.created_date IS E'The date of create.';
-- ddl-end --
COMMENT ON COLUMN public.user_roles.updated_date IS E'The date of last update.';
-- ddl-end --
COMMENT ON COLUMN public.user_roles.deleted_date IS E'The date of delete. Used by the soft delete.';
-- ddl-end --
ALTER TABLE public.user_roles OWNER TO admin_project;
-- ddl-end --

-- object: public.templates | type: TABLE --
-- DROP TABLE IF EXISTS public.templates CASCADE;
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
ALTER TABLE public.templates OWNER TO admin_project;
-- ddl-end --

-- object: public.time_zones | type: TABLE --
-- DROP TABLE IF EXISTS public.time_zones CASCADE;
CREATE TABLE public.time_zones (
	id uuid NOT NULL,
	alternative_id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ,
	name varchar(100) NOT NULL,
	utc_offset interval NOT NULL,
	utc_dst_offset interval NOT NULL,
	is_default bool NOT NULL,
	is_active bool NOT NULL,
	created_date timestamp with time zone NOT NULL,
	updated_date timestamp with time zone,
	deleted_date timestamp with time zone,
	CONSTRAINT pk__time_zones PRIMARY KEY (id)
);
-- ddl-end --
COMMENT ON COLUMN public.time_zones.id IS E'The unique identifier for the object.';
-- ddl-end --
COMMENT ON COLUMN public.time_zones.alternative_id IS E'The auto generated sequential identifier.';
-- ddl-end --
COMMENT ON COLUMN public.time_zones.name IS E'The name of the time zone. Examples are America/Sao_Paulo, America/Rio_Branco, America/New_York, etc.';
-- ddl-end --
COMMENT ON COLUMN public.time_zones.utc_offset IS E'The utc offset of the time zone. Examples are -03:00, +00:00, +03:00.';
-- ddl-end --
COMMENT ON COLUMN public.time_zones.utc_dst_offset IS E'The day light utc offset of the time zone. Examples are -03:00, +00:00, +03:00.';
-- ddl-end --
COMMENT ON COLUMN public.time_zones.is_default IS E'Whatever is the default time zone. True if it is the default.';
-- ddl-end --
COMMENT ON COLUMN public.time_zones.is_active IS E'Whatever the time zone is active. True if it is active.';
-- ddl-end --
COMMENT ON COLUMN public.time_zones.created_date IS E'The date of create.';
-- ddl-end --
COMMENT ON COLUMN public.time_zones.updated_date IS E'The date of last update.';
-- ddl-end --
COMMENT ON COLUMN public.time_zones.deleted_date IS E'The date of delete. Used by the soft delete.';
-- ddl-end --
ALTER TABLE public.time_zones OWNER TO admin_project;
-- ddl-end --

-- object: fk__languages__users | type: CONSTRAINT --
-- ALTER TABLE public.users DROP CONSTRAINT IF EXISTS fk__languages__users CASCADE;
ALTER TABLE public.users ADD CONSTRAINT fk__languages__users FOREIGN KEY (language_id)
REFERENCES public.languages (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE RESTRICT;
-- ddl-end --

-- object: fk__time_zones__users | type: CONSTRAINT --
-- ALTER TABLE public.users DROP CONSTRAINT IF EXISTS fk__time_zones__users CASCADE;
ALTER TABLE public.users ADD CONSTRAINT fk__time_zones__users FOREIGN KEY (time_zone_id)
REFERENCES public.time_zones (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE RESTRICT;
-- ddl-end --

-- object: fk__users__user_logins | type: CONSTRAINT --
-- ALTER TABLE public.user_logins DROP CONSTRAINT IF EXISTS fk__users__user_logins CASCADE;
ALTER TABLE public.user_logins ADD CONSTRAINT fk__users__user_logins FOREIGN KEY (user_id)
REFERENCES public.users (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE RESTRICT;
-- ddl-end --

-- object: fk__users__user_roles | type: CONSTRAINT --
-- ALTER TABLE public.user_roles DROP CONSTRAINT IF EXISTS fk__users__user_roles CASCADE;
ALTER TABLE public.user_roles ADD CONSTRAINT fk__users__user_roles FOREIGN KEY (user_id)
REFERENCES public.users (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE RESTRICT;
-- ddl-end --

-- object: public.system_configurations | type: TABLE --
-- DROP TABLE IF EXISTS public.system_configurations CASCADE;
CREATE TABLE public.system_configurations (
	id uuid NOT NULL,
	alternative_id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ,
	name varchar(100) NOT NULL,
	description varchar(1000),
	slug varchar(20) NOT NULL,
	data_type_id uuid NOT NULL,
	is_global bool NOT NULL,
	is_hidden bool NOT NULL,
	int_value integer,
	bool_value bool,
	string_value varchar,
	uuid_value uuid,
	timestamp_value timestamp with time zone,
	created_date timestamp with time zone NOT NULL,
	updated_date timestamp with time zone,
	deleted_date timestamp with time zone,
	CONSTRAINT pk__system_configurations PRIMARY KEY (id)
);
-- ddl-end --
COMMENT ON COLUMN public.system_configurations.id IS E'The unique identifier for the object.';
-- ddl-end --
COMMENT ON COLUMN public.system_configurations.alternative_id IS E'The auto generated sequential identifier.';
-- ddl-end --
COMMENT ON COLUMN public.system_configurations.name IS E'The name of the system configuration.';
-- ddl-end --
COMMENT ON COLUMN public.system_configurations.description IS E'The description of the system configuration.';
-- ddl-end --
COMMENT ON COLUMN public.system_configurations.slug IS E'The unique slug of the system configuration.';
-- ddl-end --
COMMENT ON COLUMN public.system_configurations.is_global IS E'Whatever the system configuration is global. True if it is global for all tenants.';
-- ddl-end --
COMMENT ON COLUMN public.system_configurations.is_hidden IS E'Whatever the system configuration is hidden. True if it is hidden and not visible to the client.';
-- ddl-end --
COMMENT ON COLUMN public.system_configurations.int_value IS E'The int value of the system configuration.';
-- ddl-end --
COMMENT ON COLUMN public.system_configurations.bool_value IS E'The bool value of the system configuration.';
-- ddl-end --
COMMENT ON COLUMN public.system_configurations.string_value IS E'The string value of the system configuration.';
-- ddl-end --
COMMENT ON COLUMN public.system_configurations.uuid_value IS E'The uuid value of the system configuration.';
-- ddl-end --
COMMENT ON COLUMN public.system_configurations.timestamp_value IS E'The timestamp value of the system configuration.';
-- ddl-end --
COMMENT ON COLUMN public.system_configurations.created_date IS E'The date of create.';
-- ddl-end --
COMMENT ON COLUMN public.system_configurations.updated_date IS E'The date of last update.';
-- ddl-end --
COMMENT ON COLUMN public.system_configurations.deleted_date IS E'The date of delete. Used by the soft delete.';
-- ddl-end --
ALTER TABLE public.system_configurations OWNER TO admin_project;
-- ddl-end --

-- object: public.data_types | type: TABLE --
-- DROP TABLE IF EXISTS public.data_types CASCADE;
CREATE TABLE public.data_types (
	id uuid NOT NULL,
	alternative_id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ,
	name jsonb NOT NULL,
	created_date timestamp with time zone NOT NULL,
	updated_date timestamp with time zone,
	deleted_date timestamp with time zone,
	CONSTRAINT pk__data_types PRIMARY KEY (id)
);
-- ddl-end --
COMMENT ON COLUMN public.data_types.id IS E'The unique identifier for the object.';
-- ddl-end --
COMMENT ON COLUMN public.data_types.alternative_id IS E'The auto generated sequential identifier.';
-- ddl-end --
COMMENT ON COLUMN public.data_types.name IS E'The unique name of the data type.';
-- ddl-end --
COMMENT ON COLUMN public.data_types.created_date IS E'The date of create.';
-- ddl-end --
COMMENT ON COLUMN public.data_types.updated_date IS E'The date of last update.';
-- ddl-end --
COMMENT ON COLUMN public.data_types.deleted_date IS E'The date of delete. Used by the soft delete.';
-- ddl-end --
ALTER TABLE public.data_types OWNER TO admin_project;
-- ddl-end --

-- object: fk__data_types__system_configurations | type: CONSTRAINT --
-- ALTER TABLE public.system_configurations DROP CONSTRAINT IF EXISTS fk__data_types__system_configurations CASCADE;
ALTER TABLE public.system_configurations ADD CONSTRAINT fk__data_types__system_configurations FOREIGN KEY (data_type_id)
REFERENCES public.data_types (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE RESTRICT DEFERRABLE INITIALLY IMMEDIATE;
-- ddl-end --

-- object: idx__uq__languages | type: INDEX --
-- DROP INDEX IF EXISTS public.idx__uq__languages CASCADE;
CREATE UNIQUE INDEX idx__uq__languages ON public.languages
USING btree
(
	iso_code,
	deleted_date ASC NULLS FIRST
);
-- ddl-end --

-- object: public.permissions | type: TABLE --
-- DROP TABLE IF EXISTS public.permissions CASCADE;
CREATE TABLE public.permissions (
	id uuid NOT NULL,
	alternative_id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ,
	name jsonb NOT NULL,
	slug varchar(50) NOT NULL,
	description jsonb,
	permission_group_id uuid,
	action_id uuid NOT NULL,
	created_date timestamp with time zone NOT NULL,
	updated_date timestamp with time zone,
	deleted_date timestamp with time zone,
	CONSTRAINT pk__permissions PRIMARY KEY (id)
);
-- ddl-end --
COMMENT ON COLUMN public.permissions.id IS E'The unique identifier for the object.';
-- ddl-end --
COMMENT ON COLUMN public.permissions.alternative_id IS E'The auto generated sequential identifier.';
-- ddl-end --
COMMENT ON COLUMN public.permissions.name IS E'The name of the functionality.\n{\n   "pt-BR": "Nome",\n   "en-US": "Name"\n}';
-- ddl-end --
COMMENT ON COLUMN public.permissions.slug IS E'The unique slug of the functionality. It is used by the system to check if the user has this permission.';
-- ddl-end --
COMMENT ON COLUMN public.permissions.description IS E'The description of the functionality.\n{\n   "pt-BR": "Descrição",\n   "en-US": "Description"\n}';
-- ddl-end --
COMMENT ON COLUMN public.permissions.created_date IS E'The date of create.';
-- ddl-end --
COMMENT ON COLUMN public.permissions.updated_date IS E'The date of last update.';
-- ddl-end --
COMMENT ON COLUMN public.permissions.deleted_date IS E'The date of delete. Used by the soft delete.';
-- ddl-end --
ALTER TABLE public.permissions OWNER TO admin_project;
-- ddl-end --

-- object: public.role_permissions | type: TABLE --
-- DROP TABLE IF EXISTS public.role_permissions CASCADE;
CREATE TABLE public.role_permissions (
	id uuid NOT NULL,
	alternative_id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ,
	role_id uuid NOT NULL,
	permission_id uuid NOT NULL,
	created_date timestamp with time zone NOT NULL,
	updated_date timestamp with time zone,
	deleted_date timestamp with time zone,
	CONSTRAINT pk__role_permissions PRIMARY KEY (id)
);
-- ddl-end --
COMMENT ON COLUMN public.role_permissions.id IS E'The unique identifier for the object.';
-- ddl-end --
COMMENT ON COLUMN public.role_permissions.alternative_id IS E'The auto generated sequential identifier.';
-- ddl-end --
COMMENT ON COLUMN public.role_permissions.created_date IS E'The date of create.';
-- ddl-end --
COMMENT ON COLUMN public.role_permissions.updated_date IS E'The date of last update.';
-- ddl-end --
COMMENT ON COLUMN public.role_permissions.deleted_date IS E'The date of delete. Used by the soft delete.';
-- ddl-end --
ALTER TABLE public.role_permissions OWNER TO admin_project;
-- ddl-end --

-- object: fk__roles__role_permissions | type: CONSTRAINT --
-- ALTER TABLE public.role_permissions DROP CONSTRAINT IF EXISTS fk__roles__role_permissions CASCADE;
ALTER TABLE public.role_permissions ADD CONSTRAINT fk__roles__role_permissions FOREIGN KEY (role_id)
REFERENCES public.roles (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE RESTRICT DEFERRABLE INITIALLY IMMEDIATE;
-- ddl-end --

-- object: fk__permissions__role_permissions | type: CONSTRAINT --
-- ALTER TABLE public.role_permissions DROP CONSTRAINT IF EXISTS fk__permissions__role_permissions CASCADE;
ALTER TABLE public.role_permissions ADD CONSTRAINT fk__permissions__role_permissions FOREIGN KEY (permission_id)
REFERENCES public.permissions (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE RESTRICT DEFERRABLE INITIALLY IMMEDIATE;
-- ddl-end --

-- object: idx__uq__role_permissions | type: INDEX --
-- DROP INDEX IF EXISTS public.idx__uq__role_permissions CASCADE;
CREATE UNIQUE INDEX idx__uq__role_permissions ON public.role_permissions
USING btree
(
	role_id,
	permission_id,
	deleted_date ASC NULLS FIRST
);
-- ddl-end --

-- object: fk__roles__user_roles | type: CONSTRAINT --
-- ALTER TABLE public.user_roles DROP CONSTRAINT IF EXISTS fk__roles__user_roles CASCADE;
ALTER TABLE public.user_roles ADD CONSTRAINT fk__roles__user_roles FOREIGN KEY (role_id)
REFERENCES public.roles (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE RESTRICT DEFERRABLE INITIALLY IMMEDIATE;
-- ddl-end --

-- object: idx__user_logins__user_id__provider | type: INDEX --
-- DROP INDEX IF EXISTS public.idx__user_logins__user_id__provider CASCADE;
CREATE INDEX idx__user_logins__user_id__provider ON public.user_logins
USING btree
(
	user_id,
	provider,
	deleted_date ASC NULLS FIRST
);
-- ddl-end --

-- object: idx__uq__permissions | type: INDEX --
-- DROP INDEX IF EXISTS public.idx__uq__permissions CASCADE;
CREATE UNIQUE INDEX idx__uq__permissions ON public.permissions
USING btree
(
	slug,
	deleted_date ASC NULLS FIRST
);
-- ddl-end --

-- object: idx__uq__user_roles | type: INDEX --
-- DROP INDEX IF EXISTS public.idx__uq__user_roles CASCADE;
CREATE UNIQUE INDEX idx__uq__user_roles ON public.user_roles
USING btree
(
	user_id,
	role_id,
	deleted_date ASC NULLS FIRST
);
-- ddl-end --

-- object: idx__uq__time_zones | type: INDEX --
-- DROP INDEX IF EXISTS public.idx__uq__time_zones CASCADE;
CREATE UNIQUE INDEX idx__uq__time_zones ON public.time_zones
USING btree
(
	name,
	deleted_date ASC NULLS FIRST
);
-- ddl-end --

-- object: idx__part__uq__time_zones | type: INDEX --
-- DROP INDEX IF EXISTS public.idx__part__uq__time_zones CASCADE;
CREATE UNIQUE INDEX idx__part__uq__time_zones ON public.time_zones
USING btree
(
	name
)
WHERE (deleted_date is null);
-- ddl-end --

-- object: idx__part__uq__languages | type: INDEX --
-- DROP INDEX IF EXISTS public.idx__part__uq__languages CASCADE;
CREATE UNIQUE INDEX idx__part__uq__languages ON public.languages
USING btree
(
	iso_code
)
WHERE (deleted_date is null);
-- ddl-end --

-- object: idx__part__uq__user_roles | type: INDEX --
-- DROP INDEX IF EXISTS public.idx__part__uq__user_roles CASCADE;
CREATE UNIQUE INDEX idx__part__uq__user_roles ON public.user_roles
USING btree
(
	user_id,
	role_id
)
WHERE (deleted_date is null);
-- ddl-end --

-- object: idx__user_roles__role_id | type: INDEX --
-- DROP INDEX IF EXISTS public.idx__user_roles__role_id CASCADE;
CREATE INDEX idx__user_roles__role_id ON public.user_roles
USING btree
(
	role_id,
	deleted_date ASC NULLS FIRST
);
-- ddl-end --

-- object: idx__part__uq__role_permissions | type: INDEX --
-- DROP INDEX IF EXISTS public.idx__part__uq__role_permissions CASCADE;
CREATE UNIQUE INDEX idx__part__uq__role_permissions ON public.role_permissions
USING btree
(
	role_id,
	permission_id
)
WHERE (deleted_date is null);
-- ddl-end --

-- object: idx__role_permissions__permission_id | type: INDEX --
-- DROP INDEX IF EXISTS public.idx__role_permissions__permission_id CASCADE;
CREATE INDEX idx__role_permissions__permission_id ON public.role_permissions
USING btree
(
	permission_id,
	deleted_date ASC NULLS FIRST
);
-- ddl-end --

-- object: idx__part__uq__permissions | type: INDEX --
-- DROP INDEX IF EXISTS public.idx__part__uq__permissions CASCADE;
CREATE UNIQUE INDEX idx__part__uq__permissions ON public.permissions
USING btree
(
	slug
)
WHERE (deleted_date is null);
-- ddl-end --

-- object: idx__uq__general_data_types | type: INDEX --
-- DROP INDEX IF EXISTS public.idx__uq__general_data_types CASCADE;
CREATE UNIQUE INDEX idx__uq__general_data_types ON public.data_types
USING btree
(
	name,
	deleted_date ASC NULLS FIRST
);
-- ddl-end --

-- object: idx__part__uq__general_data_types | type: INDEX --
-- DROP INDEX IF EXISTS public.idx__part__uq__general_data_types CASCADE;
CREATE UNIQUE INDEX idx__part__uq__general_data_types ON public.data_types
USING btree
(
	name
)
WHERE (deleted_date is null);
-- ddl-end --

-- object: idx__uq__general_currencies | type: INDEX --
-- DROP INDEX IF EXISTS public.idx__uq__general_currencies CASCADE;
CREATE UNIQUE INDEX idx__uq__general_currencies ON public.currencies
USING btree
(
	iso_code,
	deleted_date ASC NULLS FIRST
);
-- ddl-end --

-- object: idx__part__uq__general_currencies | type: INDEX --
-- DROP INDEX IF EXISTS public.idx__part__uq__general_currencies CASCADE;
CREATE UNIQUE INDEX idx__part__uq__general_currencies ON public.currencies
USING btree
(
	iso_code
)
WHERE (deleted_date is null);
-- ddl-end --

-- object: idx__uq__roles | type: INDEX --
-- DROP INDEX IF EXISTS public.idx__uq__roles CASCADE;
CREATE UNIQUE INDEX idx__uq__roles ON public.roles
USING btree
(
	name,
	deleted_date ASC NULLS FIRST
);
-- ddl-end --

-- object: idx__part__uq__roles | type: INDEX --
-- DROP INDEX IF EXISTS public.idx__part__uq__roles CASCADE;
CREATE UNIQUE INDEX idx__part__uq__roles ON public.roles
USING btree
(
	name
)
WHERE (deleted_date is null);
-- ddl-end --

-- object: public.actions | type: TABLE --
-- DROP TABLE IF EXISTS public.actions CASCADE;
CREATE TABLE public.actions (
	id uuid NOT NULL,
	alternative_id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ,
	name jsonb NOT NULL,
	slug varchar(50) NOT NULL,
	description varchar(500),
	created_date timestamp with time zone NOT NULL,
	updated_date timestamp with time zone,
	deleted_date timestamp with time zone,
	CONSTRAINT pk__actions PRIMARY KEY (id)
);
-- ddl-end --
COMMENT ON COLUMN public.actions.id IS E'The unique identifier for the object.';
-- ddl-end --
COMMENT ON COLUMN public.actions.alternative_id IS E'The auto generated sequential identifier.';
-- ddl-end --
COMMENT ON COLUMN public.actions.name IS E'The action name.\n{\n   "pt-BR": "Nome",\n   "en-US": "Name"\n}';
-- ddl-end --
COMMENT ON COLUMN public.actions.slug IS E'The action slug. This column is used by the CASL library. Examples are manage, create, read, update, delete, etc.';
-- ddl-end --
COMMENT ON COLUMN public.actions.description IS E'The action description.';
-- ddl-end --
COMMENT ON COLUMN public.actions.created_date IS E'The date of create.';
-- ddl-end --
COMMENT ON COLUMN public.actions.updated_date IS E'The date of last update.';
-- ddl-end --
COMMENT ON COLUMN public.actions.deleted_date IS E'The date of delete. Used by the soft delete.';
-- ddl-end --
ALTER TABLE public.actions OWNER TO admin_project;
-- ddl-end --

-- object: fk__actions__permissions | type: CONSTRAINT --
-- ALTER TABLE public.permissions DROP CONSTRAINT IF EXISTS fk__actions__permissions CASCADE;
ALTER TABLE public.permissions ADD CONSTRAINT fk__actions__permissions FOREIGN KEY (action_id)
REFERENCES public.actions (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE RESTRICT DEFERRABLE INITIALLY IMMEDIATE;
-- ddl-end --

-- object: idx__uq__actions | type: INDEX --
-- DROP INDEX IF EXISTS public.idx__uq__actions CASCADE;
CREATE UNIQUE INDEX idx__uq__actions ON public.actions
USING btree
(
	slug,
	deleted_date ASC NULLS FIRST
);
-- ddl-end --

-- object: idx__part__uq__actions | type: INDEX --
-- DROP INDEX IF EXISTS public.idx__part__uq__actions CASCADE;
CREATE UNIQUE INDEX idx__part__uq__actions ON public.actions
USING btree
(
	slug
)
WHERE (deleted_date is null);
-- ddl-end --

-- object: public.countries | type: TABLE --
-- DROP TABLE IF EXISTS public.countries CASCADE;
CREATE TABLE public.countries (
	id uuid NOT NULL,
	alternative_id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ,
	name varchar(300) NOT NULL,
	native_name varchar(300) NOT NULL,
	code char(2) NOT NULL,
	dial_code varchar(10) NOT NULL,
	is_default bool NOT NULL,
	is_active bool NOT NULL,
	created_date timestamp with time zone NOT NULL,
	updated_date timestamp with time zone,
	deleted_date timestamp with time zone,
	CONSTRAINT pk__countries PRIMARY KEY (id)
);
-- ddl-end --
COMMENT ON COLUMN public.countries.id IS E'The unique identifier for the object.';
-- ddl-end --
COMMENT ON COLUMN public.countries.alternative_id IS E'The auto generated sequential identifier.';
-- ddl-end --
COMMENT ON COLUMN public.countries.name IS E'The country name in English. Examples are Brazil, United States, Spain.';
-- ddl-end --
COMMENT ON COLUMN public.countries.native_name IS E'The country native name. Examples for Brazil is Brasil, Spain is España.';
-- ddl-end --
COMMENT ON COLUMN public.countries.code IS E'The country code. Examples for Brazil is BR, United States is US, Spain is ES, etc.';
-- ddl-end --
COMMENT ON COLUMN public.countries.dial_code IS E'The country dial code. Example for Brazil is +55, for United States is +1, etc.';
-- ddl-end --
COMMENT ON COLUMN public.countries.is_default IS E'Whatever the country is the default. True if it the default.';
-- ddl-end --
COMMENT ON COLUMN public.countries.is_active IS E'Whatever the country is active. True if it active.';
-- ddl-end --
COMMENT ON COLUMN public.countries.created_date IS E'The date of create.';
-- ddl-end --
COMMENT ON COLUMN public.countries.updated_date IS E'The date of last update.';
-- ddl-end --
COMMENT ON COLUMN public.countries.deleted_date IS E'The date of delete. Used by the soft delete.';
-- ddl-end --
ALTER TABLE public.countries OWNER TO admin_project;
-- ddl-end --

-- object: public.states | type: TABLE --
-- DROP TABLE IF EXISTS public.states CASCADE;
CREATE TABLE public.states (
	id uuid NOT NULL,
	alternative_id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ,
	country_id uuid NOT NULL,
	name varchar(300) NOT NULL,
	code char(2) NOT NULL,
	is_active bool NOT NULL,
	created_date timestamp with time zone NOT NULL,
	updated_date timestamp with time zone,
	deleted_date timestamp with time zone,
	CONSTRAINT pk__states PRIMARY KEY (id)
);
-- ddl-end --
COMMENT ON COLUMN public.states.id IS E'The unique identifier for the object.';
-- ddl-end --
COMMENT ON COLUMN public.states.alternative_id IS E'The auto generated sequential identifier.';
-- ddl-end --
COMMENT ON COLUMN public.states.name IS E'The state name. Examples are Rio de Janeiro, São Paulo, California, etc.';
-- ddl-end --
COMMENT ON COLUMN public.states.code IS E'The state code. Examples for Rio de Janeiro is RJ, for São Paulo is SP, for California is CA, etc.';
-- ddl-end --
COMMENT ON COLUMN public.states.is_active IS E'Whatever the state is active. True if it active.';
-- ddl-end --
COMMENT ON COLUMN public.states.created_date IS E'The date of create.';
-- ddl-end --
COMMENT ON COLUMN public.states.updated_date IS E'The date of last update.';
-- ddl-end --
COMMENT ON COLUMN public.states.deleted_date IS E'The date of delete. Used by the soft delete.';
-- ddl-end --
ALTER TABLE public.states OWNER TO admin_project;
-- ddl-end --

-- object: fk__countries__states | type: CONSTRAINT --
-- ALTER TABLE public.states DROP CONSTRAINT IF EXISTS fk__countries__states CASCADE;
ALTER TABLE public.states ADD CONSTRAINT fk__countries__states FOREIGN KEY (country_id)
REFERENCES public.countries (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE RESTRICT DEFERRABLE INITIALLY IMMEDIATE;
-- ddl-end --

-- object: idx__uq__states | type: INDEX --
-- DROP INDEX IF EXISTS public.idx__uq__states CASCADE;
CREATE UNIQUE INDEX idx__uq__states ON public.states
USING btree
(
	country_id,
	code,
	deleted_date ASC NULLS FIRST
);
-- ddl-end --

-- object: idx__part__uq__states | type: INDEX --
-- DROP INDEX IF EXISTS public.idx__part__uq__states CASCADE;
CREATE UNIQUE INDEX idx__part__uq__states ON public.states
USING btree
(
	country_id,
	code
)
WHERE (deleted_date is null);
-- ddl-end --

-- object: idx__uq__countries | type: INDEX --
-- DROP INDEX IF EXISTS public.idx__uq__countries CASCADE;
CREATE UNIQUE INDEX idx__uq__countries ON public.countries
USING btree
(
	code,
	deleted_date ASC NULLS FIRST
);
-- ddl-end --

-- object: idx__part__uq__countries | type: INDEX --
-- DROP INDEX IF EXISTS public.idx__part__uq__countries CASCADE;
CREATE UNIQUE INDEX idx__part__uq__countries ON public.countries
USING btree
(
	code
)
WHERE (deleted_date is null);
-- ddl-end --

-- object: fk__states__users | type: CONSTRAINT --
-- ALTER TABLE public.users DROP CONSTRAINT IF EXISTS fk__states__users CASCADE;
ALTER TABLE public.users ADD CONSTRAINT fk__states__users FOREIGN KEY (address_state_id)
REFERENCES public.states (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE RESTRICT DEFERRABLE INITIALLY IMMEDIATE;
-- ddl-end --

-- object: idx__uq__system_configurations | type: INDEX --
-- DROP INDEX IF EXISTS public.idx__uq__system_configurations CASCADE;
CREATE UNIQUE INDEX idx__uq__system_configurations ON public.system_configurations
USING btree
(
	slug,
	deleted_date ASC NULLS FIRST
);
-- ddl-end --

-- object: idx__part__uq__system_configurations | type: INDEX --
-- DROP INDEX IF EXISTS public.idx__part__uq__system_configurations CASCADE;
CREATE UNIQUE INDEX idx__part__uq__system_configurations ON public.system_configurations
USING btree
(
	slug
)
WHERE (deleted_date is null);
-- ddl-end --

-- object: idx__uq__users | type: INDEX --
-- DROP INDEX IF EXISTS public.idx__uq__users CASCADE;
CREATE UNIQUE INDEX idx__uq__users ON public.users
USING btree
(
	email,
	deleted_date ASC NULLS FIRST
);
-- ddl-end --

-- object: idx__part__uq__users | type: INDEX --
-- DROP INDEX IF EXISTS public.idx__part__uq__users CASCADE;
CREATE UNIQUE INDEX idx__part__uq__users ON public.users
USING btree
(
	email
)
WHERE (deleted_date is null);
-- ddl-end --

-- object: public.user_sessions | type: TABLE --
-- DROP TABLE IF EXISTS public.user_sessions CASCADE;
CREATE TABLE public.user_sessions (
	id uuid NOT NULL,
	alternative_id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ,
	user_id uuid NOT NULL,
	device_name varchar(300) NOT NULL,
	operation_system varchar(300) NOT NULL,
	user_agent varchar(300) NOT NULL,
	ip_address cidr NOT NULL,
	application_version varchar(20) NOT NULL,
	token varchar(1000) NOT NULL,
	created_date timestamp with time zone NOT NULL,
	updated_date timestamp with time zone,
	deleted_date timestamp with time zone,
	CONSTRAINT pk__user_sessions PRIMARY KEY (id)
);
-- ddl-end --
COMMENT ON COLUMN public.user_sessions.id IS E'The unique identifier for the object.';
-- ddl-end --
COMMENT ON COLUMN public.user_sessions.alternative_id IS E'The auto generated sequential identifier.';
-- ddl-end --
COMMENT ON COLUMN public.user_sessions.device_name IS E'The user session device name.';
-- ddl-end --
COMMENT ON COLUMN public.user_sessions.operation_system IS E'The user session operation system.';
-- ddl-end --
COMMENT ON COLUMN public.user_sessions.user_agent IS E'The user session agent.';
-- ddl-end --
COMMENT ON COLUMN public.user_sessions.ip_address IS E'The user session ip address.';
-- ddl-end --
COMMENT ON COLUMN public.user_sessions.application_version IS E'The user session application version.';
-- ddl-end --
COMMENT ON COLUMN public.user_sessions.token IS E'The user session token.';
-- ddl-end --
COMMENT ON COLUMN public.user_sessions.created_date IS E'The date of create.';
-- ddl-end --
COMMENT ON COLUMN public.user_sessions.updated_date IS E'The date of last update.';
-- ddl-end --
COMMENT ON COLUMN public.user_sessions.deleted_date IS E'The date of delete. Used by the soft delete.';
-- ddl-end --
ALTER TABLE public.user_sessions OWNER TO admin_project;
-- ddl-end --

-- object: fk__users__user_sessions | type: CONSTRAINT --
-- ALTER TABLE public.user_sessions DROP CONSTRAINT IF EXISTS fk__users__user_sessions CASCADE;
ALTER TABLE public.user_sessions ADD CONSTRAINT fk__users__user_sessions FOREIGN KEY (user_id)
REFERENCES public.users (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE RESTRICT;
-- ddl-end --

-- object: idx__user_sessions__user_id | type: INDEX --
-- DROP INDEX IF EXISTS public.idx__user_sessions__user_id CASCADE;
CREATE INDEX idx__user_sessions__user_id ON public.user_sessions
USING btree
(
	user_id,
	deleted_date ASC NULLS FIRST
);
-- ddl-end --

-- object: public.permission_groups | type: TABLE --
-- DROP TABLE IF EXISTS public.permission_groups CASCADE;
CREATE TABLE public.permission_groups (
	id uuid NOT NULL,
	alternative_id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ,
	parent_permission_group_id uuid,
	name jsonb NOT NULL,
	slug varchar(100) NOT NULL,
	created_date timestamp with time zone NOT NULL,
	updated_date timestamp with time zone,
	deleted_date timestamp with time zone,
	CONSTRAINT pk__permission_groups PRIMARY KEY (id)
);
-- ddl-end --
COMMENT ON COLUMN public.permission_groups.id IS E'The unique identifier for the object.';
-- ddl-end --
COMMENT ON COLUMN public.permission_groups.alternative_id IS E'The auto generated sequential identifier.';
-- ddl-end --
COMMENT ON COLUMN public.permission_groups.name IS E'The permission group name.\n{\n   "pt-BR": "Nome",\n   "en-US": "Name"\n}';
-- ddl-end --
COMMENT ON COLUMN public.permission_groups.slug IS E'The permission group slug.';
-- ddl-end --
COMMENT ON COLUMN public.permission_groups.created_date IS E'The date of create.';
-- ddl-end --
COMMENT ON COLUMN public.permission_groups.updated_date IS E'The date of last update.';
-- ddl-end --
COMMENT ON COLUMN public.permission_groups.deleted_date IS E'The date of delete. Used by the soft delete.';
-- ddl-end --
ALTER TABLE public.permission_groups OWNER TO admin_project;
-- ddl-end --

-- object: fk__permission_groups__permission_groups | type: CONSTRAINT --
-- ALTER TABLE public.permission_groups DROP CONSTRAINT IF EXISTS fk__permission_groups__permission_groups CASCADE;
ALTER TABLE public.permission_groups ADD CONSTRAINT fk__permission_groups__permission_groups FOREIGN KEY (parent_permission_group_id)
REFERENCES public.permission_groups (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE RESTRICT;
-- ddl-end --

-- object: fk__permission_groups__permissions | type: CONSTRAINT --
-- ALTER TABLE public.permissions DROP CONSTRAINT IF EXISTS fk__permission_groups__permissions CASCADE;
ALTER TABLE public.permissions ADD CONSTRAINT fk__permission_groups__permissions FOREIGN KEY (permission_group_id)
REFERENCES public.permission_groups (id) MATCH FULL
ON DELETE RESTRICT ON UPDATE RESTRICT;
-- ddl-end --

-- object: idx__uq__permission_groups | type: INDEX --
-- DROP INDEX IF EXISTS public.idx__uq__permission_groups CASCADE;
CREATE UNIQUE INDEX idx__uq__permission_groups ON public.permission_groups
USING btree
(
	slug,
	deleted_date ASC NULLS FIRST
);
-- ddl-end --

-- object: idx__part__uq__permission_groups | type: INDEX --
-- DROP INDEX IF EXISTS public.idx__part__uq__permission_groups CASCADE;
CREATE UNIQUE INDEX idx__part__uq__permission_groups ON public.permission_groups
USING btree
(
	slug
)
WHERE (deleted_date is null);
-- ddl-end --