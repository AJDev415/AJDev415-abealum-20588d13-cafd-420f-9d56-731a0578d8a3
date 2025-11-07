--
-- PostgreSQL database dump
--

\restrict qiun79L3tFXpgoYE8FSheNqnpM72N9ag8HfcFo5glTsUOzC8jBq0ttNsJJTfFp7

-- Dumped from database version 16.10 (Debian 16.10-1.pgdg13+1)
-- Dumped by pg_dump version 16.10 (Debian 16.10-1.pgdg13+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: tasks; Type: TABLE; Schema: public; Owner: myuser
--

CREATE TABLE public.tasks (
    task_id integer NOT NULL,
    employee_id integer NOT NULL,
    description text NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    organization character varying(100) NOT NULL
);


ALTER TABLE public.tasks OWNER TO myuser;

--
-- Name: tasks_task_id_seq; Type: SEQUENCE; Schema: public; Owner: myuser
--

CREATE SEQUENCE public.tasks_task_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tasks_task_id_seq OWNER TO myuser;

--
-- Name: tasks_task_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: myuser
--

ALTER SEQUENCE public.tasks_task_id_seq OWNED BY public.tasks.task_id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: myuser
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(50) NOT NULL,
    password character varying(255) NOT NULL,
    role character varying(50) NOT NULL,
    org character varying(100)
);


ALTER TABLE public.users OWNER TO myuser;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: myuser
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO myuser;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: myuser
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: tasks task_id; Type: DEFAULT; Schema: public; Owner: myuser
--

ALTER TABLE ONLY public.tasks ALTER COLUMN task_id SET DEFAULT nextval('public.tasks_task_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: myuser
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: tasks; Type: TABLE DATA; Schema: public; Owner: myuser
--

COPY public.tasks (task_id, employee_id, description, created_at, organization) FROM stdin;
16	9	awesome task	2025-11-05 19:13:24.645398	org0
17	11	cool task	2025-11-05 20:34:59.594518	org1
18	10	new task	2025-11-06 19:34:13.146052	org0
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: myuser
--

COPY public.users (id, username, password, role, org) FROM stdin;
8	john	$2b$10$xuxAOaBQrUvAAt.RNAXn8uvwt7zn7K9ufVlaiPLLrpd1GY.2A9qJG	admin	org0
9	maria	$2b$10$2/yNYDq1eN5TPNfUXAP04.xPLWQl.98g8lMv27I5wsE9LTmlM6nWm	admin	org0
10	new	$2b$10$QBVTNVzfXjyrjlLTRTBcXuyDt3rNxJYFObKaHZ1RaDXR2N1yMCQFi	user	org0
11	alice	$2b$10$3D/ekWcsz8M3.m8DS54TBeA.1zSlr0sz98536rKCQj2MlXRlVLGrS	manager	org1
13	bob	$2b$10$SOP1/dDc/p.cw4z0A9GGUukiLugSwwPOkkuKUZz8q22guLActul42	user	org1
14	charlie	$2b$10$Ol2CKTfOq7pvQsw5dt2n2eizJzcTDWIdFo3mIXzYAr2HEagica1Va	user	org1
\.


--
-- Name: tasks_task_id_seq; Type: SEQUENCE SET; Schema: public; Owner: myuser
--

SELECT pg_catalog.setval('public.tasks_task_id_seq', 18, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: myuser
--

SELECT pg_catalog.setval('public.users_id_seq', 14, true);


--
-- Name: tasks tasks_pkey; Type: CONSTRAINT; Schema: public; Owner: myuser
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_pkey PRIMARY KEY (task_id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: myuser
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: myuser
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: tasks FK_1c866e0c96d58ffc40f876934a4; Type: FK CONSTRAINT; Schema: public; Owner: myuser
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT "FK_1c866e0c96d58ffc40f876934a4" FOREIGN KEY (employee_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict qiun79L3tFXpgoYE8FSheNqnpM72N9ag8HfcFo5glTsUOzC8jBq0ttNsJJTfFp7

