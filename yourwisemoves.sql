CREATE TABLE "card" (
	"id" serial NOT NULL,
	"text" varchar NOT NULL,
	"stage_id" int NOT NULL,
	CONSTRAINT card_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "deck" (
	"id" serial NOT NULL,
	"description" varchar NOT NULL,
	"cards_in_deck" varchar NOT NULL,
	CONSTRAINT deck_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "person" (
	"id" serial NOT NULL,
	"email" varchar NOT NULL,
	"password" varchar NOT NULL,
	"first_name" varchar,
	"last_name" varchar,
	"organization" varchar,
	"phone_number" varchar,
	"is_facilitator" BOOLEAN NOT NULL DEFAULT 'false',
	"is_admin" BOOLEAN NOT NULL DEFAULT 'false',
	CONSTRAINT person_pk PRIMARY KEY ("id")
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



CREATE TABLE "game" (
	"id" serial NOT NULL,
	"facilitator_id" int NOT NULL,
	"time_started" TIMESTAMP NOT NULL,
	"current_player_number" int NOT NULL DEFAULT '1',
	CONSTRAINT game_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "player" (
	"id" serial NOT NULL,
	"name" int NOT NULL,
	"journal_id" int NOT NULL,
	"game_id" int NOT NULL,
	"player_number" int NOT NULL,
	CONSTRAINT player_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "journal" (
	"id" serial NOT NULL,
	"intention" varchar NOT NULL,
	"question_one" varchar NOT NULL,
	"question_two" varchar NOT NULL,
	"question_three" varchar NOT NULL,
	"question_four" varchar NOT NULL,
	"question_five" varchar NOT NULL,
	"response_one" varchar NOT NULL,
	"response_two" varchar NOT NULL,
	"response_three" varchar NOT NULL,
	"response_four" varchar NOT NULL,
	"response_five" varchar NOT NULL,
	"game_id" int NOT NULL,
	CONSTRAINT journal_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "discussion_phase" (
	"id" serial NOT NULL,
	"player_1" BOOLEAN NOT NULL DEFAULT 'false',
	"player_2" BOOLEAN NOT NULL DEFAULT 'false',
	"player_3" BOOLEAN NOT NULL DEFAULT 'false',
	"player_4" BOOLEAN NOT NULL DEFAULT 'false',
	"player_5" BOOLEAN NOT NULL DEFAULT 'false',
	"game_id" int NOT NULL,
	CONSTRAINT discussion_phase_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "game_state" (
	"id" serial NOT NULL,
	"game_id" serial NOT NULL,
	"discussion_phase_id" serial NOT NULL,
	"game_stage" int NOT NULL,
	CONSTRAINT game_state_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



ALTER TABLE "card" ADD CONSTRAINT "card_fk0" FOREIGN KEY ("stage_id") REFERENCES "stage_type"("id");

ALTER TABLE "player" ADD CONSTRAINT "player_fk0" FOREIGN KEY ("journal_id") REFERENCES "journal"("id");
ALTER TABLE "player" ADD CONSTRAINT "player_fk1" FOREIGN KEY ("game_id") REFERENCES "game"("id") ON DELETE CASCADE;

ALTER TABLE "journal" ADD CONSTRAINT "journal_fk0" FOREIGN KEY ("game_id") REFERENCES "game"("id") ON DELETE CASCADE;

ALTER TABLE "discussion_phase" ADD CONSTRAINT "discussion_phase_fk0" FOREIGN KEY ("game_id") REFERENCES "game"("id") ON DELETE CASCADE;

ALTER TABLE "game_state" ADD CONSTRAINT "game_state_fk0" FOREIGN KEY ("game_id") REFERENCES "game"("id") ON DELETE CASCADE;
ALTER TABLE "game_state" ADD CONSTRAINT "game_state_fk1" FOREIGN KEY ("discussion_phase_id") REFERENCES "discussion_phase"("id");

--insert stage type values
INSERT INTO "public"."stage_type"("id","type")
VALUES
(1,E'map'),
(2,E'open'),
(3,E'visualize'),
(4,E'engage'),
(5,E'sustain');

--insert card values
INSERT INTO "card"("id","text","stage_id","is_default")
VALUES
(1,E'Put moves into practice in this moment. Map where you are, Open and breathe and listen to connect with emotions, feel your heart''s desire and ask for clarity, Visualize what you really want, identify your next step to Engage it.',5,TRUE),
(2,E'Describe a support group or person to keep you on your path.',5,TRUE),
(3,E'What piece of furniture can you move to remind you of your new movement?',5,TRUE),
(4,E'How do you work through your fears?',5,TRUE),
(5,E'Identify a cycle in the MOVES process where you need more support - Map, Open, Visualize, Engage, Sustain - who can you connect with that does this cycle well?',5,TRUE),
(6,E'Identify sacred space you can go to in your home to nurture yourself.',5,TRUE),
(7,E'What clothes do you wear to help you feel supported and grounded? What foods do you eat to nurture your body?',5,TRUE),
(8,E'Attune yourself to the earth for grounding and ask for support. Describe this experience.',5,TRUE),
(9,E'Who can support you emotionally to accomplish what you want? Who supports you with the truth, revealing your blindspots? Who supports you by celebrating your wins and losses?',5,TRUE),
(10,E'Clarify and describe one of your mentors. How can this person help you sustain your momentum?',5,TRUE),
(11,E'Identify a change you can make in your home as a reminder of your goal or vision.',5,TRUE),
(12,E'Clarify a helpful message you want to say to yourself to give you support through repetitive self talk, a new mantra.',5,TRUE),
(13,E'Identify a routine and make it a game that will keep you disciplined in moving forward toward your desires.',5,TRUE),
(14,E'Identify a ritual you can practice to maintain momentum in the direction of your new life.',5,TRUE),
(15,E'What rewards can you build into the process to celebrate progress?',5,TRUE),
(16,E'Ask someone to give you an honest evaluation of your environment or read a book to Feng Shui your home.',5,TRUE),
(17,E'Clarify a schedule that will help you maintain momentum.',5,TRUE),
(18,E'How can you begin or improve your meditation and/or yoga practice?',5,TRUE),
(19,E'What closure do you need to support your integrity?',5,TRUE),
(20,E'How can you further commit to your work, your partners, and your clients?',5,TRUE),
(21,E'Acknowledge your circle of influence and the community you serve.',5,TRUE),
(22,E'What benefits can you receive that greatly surpass your goals?',5,TRUE),
(23,E'What support are you receiving now?',5,TRUE),
(24,E'Act as if you are the host. What would you do as the host to make sure you and the others are having a good time?',5,TRUE),
(25,E'Practice RAIN technique: • Recognize your thought • Accept it • Become Interested in it • And practice Non-attachment',5,TRUE),
(26,E'What support does your community or environment need? How does this collective consciousness link to your intention?',5,TRUE),
(27,E'What would you like to complete?',5,TRUE),
(28,E'this phase is about the harvest. What have you completed that you can celebrate?',5,TRUE),
(29,E'Where do you feel rooted? How does this support your intention?',5,TRUE),
(30,E'How can you establish better boundaries to support your desired creation?',5,TRUE),
(31,E'What global mission do you wish to support?',5,TRUE),
(32,E'What do you love in nature? Describe how this nature supports you.',5,TRUE),
(33,E'Make up a little jingle/song describing your new intention. Sing it to yourself for to others if you feel comfortable.',4,TRUE),
(34,E'Name something you are working toward. For example, purchasing a new home, a car, starting a business venture, writing a book, etc. What name would you like to call it?',4,TRUE),
(35,E'Prepare and give a speech of thanks for what you desire, as if it has already been accomplished and received.',4,TRUE),
(36,E'Who would you like to collaborate with as you move and build toward one of your desires?',4,TRUE),
(37,E'Light a candle—or imagine lighting a candle—and express a prayer, chant, or mantra to honor your desired creation.',4,TRUE),
(38,E'Complete this sentence: I embrace and accept change in my life in the area of _____.',4,TRUE),
(39,E'Rub your hands together and create a rein your heart about your desire. Describe your experience.',4,TRUE),
(40,E'Think about a desire of yours and feel gratitude for it. Express your gratitude as if it has already arrived.',4,TRUE),
(41,E'What are 3 next steps you intend to take to move a desired creation forward?',4,TRUE),
(42,E'What do you need to do next to create what you want? How can you break your goals down into smaller steps?',4,TRUE),
(43,E'Describe how you appreciate your life as it is, and everything that you already have.',4,TRUE),
(44,E'Over the next month, what would you like to accomplish? How will you reward yourself?',4,TRUE),
(45,E'In 6 months, what would you like to accomplish?',4,TRUE),
(46,E'Smile at someone. Notice how you feel more connected. Describe this connection.',4,TRUE),
(47,E'What pieces of advice would you give yourself to stay focused on your desires?',4,TRUE),
(48,E'Think of a song that would help you remember your goal. Share the song.',4,TRUE),
(49,E'What are some ways to really connect with others, not just communicate?',4,TRUE),
(50,E'How can you weave together your connections?',4,TRUE),
(51,E'How can you engage with others and make it memorable?',4,TRUE),
(52,E'Who can you follow-up with and further engage?',4,TRUE),
(53,E'What organization can you be part of that connects you to a larger version of yourself?',4,TRUE),
(54,E'What clothes can you wear to expand your connection with others?',4,TRUE),
(55,E'Who can you introduce, who can you connect?',4,TRUE),
(56,E'Create a shared experience. Who do you wish to include in this experience?',4,TRUE),
(57,E'Share your vision and goals with 5 people. Who comes to mind?',4,TRUE),
(58,E'How can you be the change you want to create in this world?',4,TRUE),
(59,E'What does your vision/goal look like, feel like, sound like?',4,TRUE),
(60,E'Where can you volunteer to share yourself and your purpose?',4,TRUE),
(61,E'How can you level the playing field and really connect?',4,TRUE),
(62,E'Imagine being a person you admire. How would this person see your situation? What would this person do?',4,TRUE),
(63,E'How can you consciously commit?',4,TRUE),
(64,E'Take a moment to breathe with others.',4,TRUE),
(65,E'Describe a perfect day in your life.',3,TRUE),
(66,E'Picture yourself living your ideal work day. Describe it.',3,TRUE),
(67,E'How long do you want to live? Imagine being your future self. What will you be most proud of and thankful for? What intention does this stimulate for you now?',3,TRUE),
(68,E'If you had unlimited time and money, what would you really want to do?',3,TRUE),
(69,E'If you were completely supported and others requested your services,what would you be doing?',3,TRUE),
(70,E'Describe a place you have visited or want to visit and how it represents your vision moving forward.',3,TRUE),
(71,E'What are 2 things you''d like to seein your life by the end of the year? Describe them.',3,TRUE),
(72,E'Draw a picture of what you see emerging in the near future of your life.',3,TRUE),
(73,E'Draw a picture of something you want to see or have in your life. ',3,TRUE),
(74,E'Express a clear intention, ask for what you want.',3,TRUE),
(75,E'Describe a primary focus you''d like to put attention on.',3,TRUE),
(76,E'Look around room and find something that draws your attention and feels pleasant, feels good. What desire is this bringing to mind? How does this represent your vision moving forward?',3,TRUE),
(77,E'What are your values? How can you further align your work and life with your values?',3,TRUE),
(78,E'What do you intend to create this year? Identify 3 goals for the year.',3,TRUE),
(79,E'Describe a goal you are working to achieveby giving 3 reasons you want it.',3,TRUE),
(80,E'Clarify a goal and how it will lookin each season - winter, spring, summer, fall - as you move toward it.',...