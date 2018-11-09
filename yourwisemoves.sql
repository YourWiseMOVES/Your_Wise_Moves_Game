CREATE TABLE "card" (
    "id" serial NOT NULL,
    "text" varchar NOT NULL,
    "stage_id" int NOT NULL,
    "is_default" BOOLEAN NOT NULL,
    "replaces_default_card" int NOT NULL,
    CONSTRAINT card_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "stage_type" (
    "id" serial NOT NULL,
    "type" varchar NOT NULL,
    CONSTRAINT stage_type_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "deck" (
    "id" serial NOT NULL,
    "description" varchar NOT NULL,
    "cards_in_deck" int NOT NULL,
    CONSTRAINT deck_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Person" (
    "id" serial NOT NULL,
    "email" varchar NOT NULL,
    "password" varchar NOT NULL,
    "first_name" varchar NOT NULL,
    "last_name" varchar NOT NULL,
    "organization" varchar NOT NULL,
    "phone_number" int NOT NULL,
    "is_facilitator" BOOLEAN NOT NULL DEFAULT 'false',
    "is_admin" BOOLEAN NOT NULL DEFAULT 'false',
    CONSTRAINT Person_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



ALTER TABLE "card" ADD CONSTRAINT "card_fk0" FOREIGN KEY ("stage_id") REFERENCES "stage_type"("id");




