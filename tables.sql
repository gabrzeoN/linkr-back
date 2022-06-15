CREATE TABLE users(
    id serial PRIMARY KEY,
    name text NOT NULL,
    image text NOT NULL,
    email text UNIQUE NOT NULL,
    password text NOT NULL,
    "createdAt" timestamp with time zone DEFAULT NOW() NOT NULL
);

CREATE TABLE sessions(
    id serial PRIMARY KEY,
    "userId" integer NOT NULL REFERENCES users(id),
    token text UNIQUE NOT NULL,
    "createdAt" timestamp with time zone DEFAULT NOW() NOT NULL,
    status boolean DEFAULT true NOT NULL
);

CREATE TABLE hashtags(
    id serial PRIMARY KEY,
    name text UNIQUE NOT NULL
);

CREATE TABLE categories(
    id serial PRIMARY KEY,
    "postId" integer NOT NULL,
    "hashtagId" integer NOT NULL REFERENCES hashtags(id)
);

CREATE TABLE posts(
    id serial PRIMARY KEY,
    "userId" integer NOT NULL REFERENCES users(id),
    "categoryId" integer NOT NULL REFERENCES categories(id),
    "url" text UNIQUE NOT NULL,
    "likes" int NOT NULL,
    "message" text NOT NULL,
    "createdAt" timestamp with time zone DEFAULT NOW() NOT NULL 
);