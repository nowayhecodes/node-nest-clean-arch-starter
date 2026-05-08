DELETE FROM public.time_zones WHERE alternative_id != 1;
ALTER SEQUENCE public.time_zones_alternative_id_seq RESTART WITH 2;
