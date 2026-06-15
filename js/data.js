/* ============================================================
   Aurora's Code Quest — curriculum data
   7 worlds · Python (continuing from Hour of Python) → AI
   ============================================================ */

const LEVELS = [
  { xp: 0,   name: "Spark",         icon: "✨" },
  { xp: 100, name: "Stardust",      icon: "🌠" },
  { xp: 220, name: "Comet",         icon: "☄️" },
  { xp: 360, name: "Moonbeam",      icon: "🌙" },
  { xp: 520, name: "Polar Light",   icon: "🌈" },
  { xp: 700, name: "Borealis",      icon: "💫" },
  { xp: 850, name: "Galaxy Master", icon: "🌌" },
];

const BADGES = [
  { id: "first-run", icon: "🚀", name: "Blast Off!", desc: "Ran your very first program" },
  { id: "w1", icon: "⭐", name: "Starlight Coder", desc: "Finished Starlight Basics" },
  { id: "w2", icon: "🏔️", name: "Decision Maker", desc: "Finished Decision Peaks" },
  { id: "w3", icon: "🌀", name: "Loop Legend", desc: "Finished Loop Lagoon" },
  { id: "w4", icon: "📚", name: "List Librarian", desc: "Finished the List Library" },
  { id: "w5", icon: "🌲", name: "Function Wizard", desc: "Finished Function Forest" },
  { id: "w6", icon: "🤖", name: "AI Explorer", desc: "Graduated from AI Academy" },
  { id: "w6b", icon: "🧪", name: "Lab Scientist", desc: "Finished every AI Lab experiment" },
  { id: "w7", icon: "🎨", name: "Master Builder", desc: "Finished every project in the Studio" },
  { id: "streak3", icon: "🔥", name: "On Fire", desc: "Coded 3 days in a row" },
  { id: "streak7", icon: "🌋", name: "Unstoppable", desc: "Coded 7 days in a row" },
  { id: "champion", icon: "👑", name: "Aurora Borealis Champion", desc: "Completed the whole quest!" },
  { id: "bookworm", icon: "🐛", name: "Bookworm", desc: "Read 5 pages of Nova's Notebook" },
  { id: "reader", icon: "🦉", name: "Curious Mind", desc: "Read all of Nova's Notebook" },
];

/* ════════════ Nova's Notebook — short fun readings (the "why" behind the "how") ════════════
   Grounded in the AI4K12 "Five Big Ideas in AI" + CS Unplugged. `world` (optional) makes a
   reading appear as a "Read first" card at the top of that world.                            */
const READINGS = [
  {
    id: "r-bug", icon: "🦋", title: "The Day a Real Bug Broke a Computer",
    tag: "Coder mindset", world: "w1", xp: 10,
    body: `
<p>Have you heard coders say their program "has a <b>bug</b>"? There's a true story behind that word. 🦋</p>
<p>In 1947, a brilliant engineer named <b>Grace Hopper</b> was working on a giant, room-sized computer when it suddenly stopped. The team searched and searched… and found a real <b>moth</b> stuck inside the machine! They taped it into their notebook and wrote: <i>"First actual case of bug being found."</i></p>
<p>Ever since, a mistake that stops a program is called a <b>bug</b>, and hunting it down is called <b>debugging</b>.</p>
<p>Here is Nova's biggest secret: <b>every coder on Earth makes bugs — every single day.</b> A bug doesn't mean you're bad at coding. It means you're a coder, doing the job! A bug is just your program whispering, <i>"psst… look right here."</i> Finding it feels like solving a mystery. 🔍</p>`,
    think: "Think of the last time something you built didn't work the first try — a LEGO model, a recipe, a tennis serve. How did you figure out what went wrong? That's the debugging superpower, and you already have it!",
    more: { text: 'Book: "Grace Hopper: Queen of Computer Code" by Laurie Wallmark.', url: "" },
  },
  {
    id: "r-decide", icon: "🔀", title: "Yes, No, and How Computers Decide",
    tag: "Coding idea · Logic", world: "w2", xp: 10,
    body: `
<p>A computer can do dazzling things — yet deep down it only ever answers one kind of question: <b>yes or no. True or false.</b> 🔀</p>
<p>Every choice your program makes is built from tiny yes/no questions: <i>Is the score over 10? Is the word "yes"? Is energy still above 0?</i> That's what an <code>if</code> really is — a fork in the trail, with one path for <b>True</b> and one for <b>False</b>.</p>
<p>Here's the amazing part: even the biggest, smartest computer is made of <b>billions of tiny switches</b>, each just <b>on or off</b> (that's the 1s and 0s!). Stack enough yes/no switches together and you can play music, land a rocket, or beat a grandmaster at chess.</p>
<p>So when something feels "too smart to be just yes/no" — remember, it's yes/no all the way down. You're learning the computer's true language. 🧠</p>`,
    think: "On your walk to school, count the yes/no decisions you make: Red light? Cross now? Puddle ahead? A program decides in exactly the same way.",
    more: { text: "cs4fn.org has playful articles on logic and how computers 'think' in true/false.", url: "https://www.cs4fn.org" },
  },
  {
    id: "r-loops", icon: "🔁", title: "Loops: The Laziest Superpower",
    tag: "Coding idea · Repetition", world: "w3", xp: 10,
    body: `
<p>Computers have one wonderful quality: <b>they never get bored.</b> 🔁</p>
<p>Imagine writing "practice piano" 100 times by hand — exhausting! A <b>loop</b> lets you say it <i>once</i>: "do this 100 times." The computer happily repeats without ever sighing.</p>
<p>This is why good coders are "lazy" in the smartest way: instead of repeating themselves, they teach the computer to repeat. One loop that draws a single petal can paint a whole flower 🌸. One loop over a list can check a million songs in a blink.</p>
<p>You already felt this power in Loop Lagoon — a few lines spun a whole spiral galaxy. Practising a tennis serve over and over to make it perfect? That's a loop too. Repetition is how both computers <i>and</i> people get strong. 🎾</p>`,
    think: "What's something you repeat a lot — piano scales, tennis serves, dance steps? If you were a computer, how would you write it as a loop?",
    more: { text: "CS Unplugged (csunplugged.org) has fun no-computer activities about repeating instructions.", url: "https://www.csunplugged.org" },
  },
  {
    id: "r-lists", icon: "🎵", title: "How Spotify Holds 100 Million Songs",
    tag: "Coding idea · Data", world: "w4", xp: 10,
    body: `
<p>One variable holds <i>one</i> thing. But what if you have a hundred favourite songs, or a whole shelf of books? You'd need a hundred boxes! That's where a <b>list</b> comes in — one variable that holds <b>many things at once</b>. 📚</p>
<p>A list is like a bookshelf or a playlist: everything lined up in order, each with a position number (and yes — computers start counting at <b>0</b>, so the first item is number 0!).</p>
<p>This one idea is everywhere. Spotify keeps your songs in lists. Your phone keeps contacts in a list. A library keeps every book in a giant list it can search in an instant. Computers are <b>brilliant</b> at storing huge lists and looping through them at lightning speed.</p>
<p>You built shelves like this in the List Library — once you can store a collection, you can sort it, search it, and play with it forever. 🎶</p>`,
    think: "If you made a list of your top 10 books, which one would sit at index 0 — the very first spot?",
    more: { text: 'Book: "Hello Ruby: Journey Inside the Computer" by Linda Liukas.', url: "" },
  },
  {
    id: "r-functions", icon: "🪄", title: "Functions: Little Spells You Reuse",
    tag: "Coding idea · Abstraction", world: "w5", xp: 10,
    body: `
<p>Imagine if, every time you wanted to play a song on the piano, you had to re-learn it from scratch. Impossible! Instead you learn it <b>once</b>, give it a name ("Für Elise"), and play it whenever you like. 🎹</p>
<p>A <b>function</b> is exactly that for code: a set of steps you write <i>once</i>, give a name, and reuse forever. Need it again? Just call its name. This is one of the biggest ideas in all of computing, called <b>abstraction</b> — tucking messy details behind a simple label.</p>
<p>You've used functions since day one without knowing it: <code>print()</code> and <code>input()</code> are functions other people wrote so you don't have to! In Function Forest you started writing your <i>own</i> spells.</p>
<p>A tennis serve you drill once and reuse every match; a warm-up routine you repeat each morning — those are functions too. Name it once, use it forever. ✨</p>`,
    think: "What's a 'function' in your day — one set of steps you always do the same way (brushing teeth? a warm-up)? Give it a good name!",
    more: { text: 'Book: "Computational Fairy Tales" by Jeremy Kubica.', url: "" },
  },
  {
    id: "r-what-ai", icon: "🤖", title: "What IS Artificial Intelligence?",
    tag: "AI Big Idea · Learning", world: "w6", xp: 10,
    body: `
<p>People say "artificial intelligence" all the time. But what <i>is</i> it, really? Let Nova share the secret. 🤖</p>
<p>The programs <b>you</b> write follow exact rules a human typed in: <code>if score &gt; 10: print("win")</code>. The computer never decides anything — it just obeys.</p>
<p><b>AI is different.</b> Instead of being told every rule, an AI <b>learns the rules itself by studying tons of examples.</b> Nobody ever gave you a rulebook for "how to recognise a cat" — you just saw lots of cats and your brain found the pattern. Machine-learning AI works the same way!</p>
<p>So when Spotify guesses a song you'll love, or a camera finds a face, no human wrote "rule #5,281." The AI <b>learned from examples</b> — which is also why it needs <i>lots</i> of good examples to get smart, exactly like the fruit robot you trained in the AI Academy. 🍎🍌</p>`,
    think: "If you wanted to teach an AI to tell a cat from a dog, what examples would you show it — and how many would be enough?",
    more: { text: 'Novel: "The Wild Robot" by Peter Brown — a robot named Roz who learns by watching the world.', url: "" },
  },
  {
    id: "r-see", icon: "👁️", title: "How Does a Computer See?",
    tag: "AI Big Idea · Perception", world: "w6b", xp: 10,
    body: `
<p>Here's something wild: <b>a computer cannot actually see a picture at all.</b> 👁️</p>
<p>To a computer, every photo is just a giant grid of <b>numbers</b>. Each tiny square — a <b>pixel</b> — is a number saying how bright or what colour it is. Your phone photos have about <b>12 million</b> of those squares!</p>
<p>This is the AI big idea called <b>Perception</b>: computers take in the world through <b>sensors</b> (cameras, microphones) and turn it into numbers they can work with.</p>
<p>So when AI "recognises" your face to unlock a phone, it isn't seeing a face the way you do — it's hunting for <b>patterns in millions of numbers</b>. And a photo filter? That's just <b>math</b> done on those numbers. You saw this yourself in Robot Eyes — your drawing was really just 1s and 0s! 🤖</p>`,
    think: "Squint at a photo until it blurs into blobs of colour. That's closer to how a computer 'sees' — patterns, not pictures. What little patterns help YOU recognise a friend from far away?",
    more: { text: "Try Google Teachable Machine (online) to train a camera with a grown-up.", url: "https://teachablemachine.withgoogle.com" },
  },
  {
    id: "r-think", icon: "🌳", title: "How Does AI Think?",
    tag: "AI Big Idea · Reasoning", world: null, xp: 10,
    body: `
<p>How does an AI <b>make a decision</b>? Often it builds a little <b>map of questions</b> in its memory — the AI big idea called <b>Representation &amp; Reasoning</b>. 🧠</p>
<p>Think about how YOU guess an animal: <i>"Does it have feathers? Does it swim?"</i> Each yes/no answer rules out options until one is left. An AI can build the very same chain of questions — a <b>decision tree</b> — exactly like the Animal Guesser you trained.</p>
<p>Bigger example: a chess computer doesn't "feel" clever. It <b>represents</b> the board as data and <b>reasons</b> through millions of possible moves to pick a good one — far more than any human could check.</p>
<p>So a lot of AI "thinking" is really: keep a smart picture of the world in memory, then follow good steps through it. Clever strategy beats magic every time! ♟️</p>`,
    think: "Pick any animal in your head. What 3 yes/no questions would let a robot guess it? You just designed a decision tree!",
    more: { text: 'Graphic novels: the "Secret Coders" series by Gene Luen Yang — mysteries solved with logic.', url: "" },
  },
  {
    id: "r-talk", icon: "💬", title: "How Does ChatGPT Talk?",
    tag: "AI Big Idea · Natural Interaction", world: null, xp: 10,
    body: `
<p>How can an AI like ChatGPT or Claude write whole stories? The core trick is surprisingly simple. ✍️</p>
<p style="text-align:center;font-size:1.12rem"><b>It predicts the next word. Over and over and over.</b></p>
<p>It read a huge amount of text and learned which word usually comes next. After <i>"Once upon a…"</i> it has seen <i>"time"</i> a million times — so it predicts "time," adds it, then predicts the next word, and the next. This is the AI big idea called <b>Natural Interaction</b>: using language to talk with people.</p>
<p>You did this yourself with the Word Wizard — <i>you</i> were the prediction engine, tapping one likely word after another!</p>
<p>Here's the catch: an AI can only suggest words from patterns it has seen, and it doesn't truly <i>know</i> whether they're true. That's why it can sound confident and still be wrong — the perfect reason for our next read. 🤔</p>`,
    think: "Your phone keyboard suggests the next word as you type — a tiny version of the same idea. Is it ever hilariously wrong?",
    more: { text: "cs4fn.org has fun, short articles on how computers handle language.", url: "https://www.cs4fn.org" },
  },
  {
    id: "r-fair", icon: "⚖️", title: "Can AI Be Wrong or Unfair?",
    tag: "AI Big Idea · Societal Impact", world: null, xp: 15,
    body: `
<p>AI is powerful — but it is <b>not</b> magic, and it is <b>not</b> always right. This might be the most important read in the whole Notebook. ⚖️</p>
<p>Remember: AI learns from <b>examples</b>. So if the examples are missing, old, or unfair, the AI will be too. An AI shown mostly one kind of face may struggle with others — not because it's mean, but because of <b>what it was taught</b>. This is the AI big idea called <b>Societal Impact</b>.</p>
<p>AI can also <b>"hallucinate"</b> — give an answer that sounds totally confident but is simply made up (because it's predicting likely words, remember!).</p>
<p>So here's how to be a smart AI user, like a real scientist:</p>
<ul>
  <li>✅ <b>Double-check</b> important facts in another source.</li>
  <li>🔒 <b>Never share</b> passwords, your address, or secrets with a chatbot.</li>
  <li>🧠 <b>You</b> are the boss — AI is a tool, like a calculator or a piano. The human gets the credit <i>and</i> the responsibility.</li>
</ul>`,
    think: "If an AI gave you a 'fact' for your homework, what are two ways you could check whether it's actually true?",
    more: { text: "For grown-ups: Common Sense Media has great family guides on using AI wisely.", url: "https://www.commonsensemedia.org" },
  },
  {
    id: "r-think-like-coder", icon: "🧩", title: "Think Like a Coder",
    tag: "Coding idea · Computational thinking", world: "w7", xp: 15,
    body: `
<p>Here's the biggest secret of all: the most important thing a coder learns isn't a <i>language</i> — it's a <b>way of thinking</b>. It's called <b>computational thinking</b>, and it works on EVERYTHING, not just computers. 🧩</p>
<p>It has four superpowers:</p>
<ul>
  <li>🔨 <b>Decompose</b> — break a big scary problem into small easy ones.</li>
  <li>🔁 <b>Patterns</b> — spot what repeats, so you don't redo work.</li>
  <li>🎯 <b>Abstraction</b> — focus on what matters, ignore the rest.</li>
  <li>📋 <b>Algorithm</b> — write a clear, step-by-step plan.</li>
</ul>
<p>You use these to plan a tennis match, pack for a trip, or learn a piano piece — and now, to build your projects in the Studio. A giant project isn't scary once you <b>decompose</b> it into tiny steps you already know how to do.</p>
<p>Real coders aren't people who never get stuck. They're people who break "stuck" into smaller pieces until it isn't stuck anymore. That's you now. 🌟</p>`,
    think: "Pick a project idea you'd love to make. Can you decompose it into 3 smaller steps? Congratulations — you just did computational thinking!",
    more: { text: "Code.org and CS Unplugged have lots of computational-thinking challenges.", url: "https://code.org" },
  },
  {
    id: "r-history", icon: "👩‍💻", title: "The Women Who Invented the Future",
    tag: "Story · Trailblazers", world: null, xp: 15,
    body: `
<p>When you write code, you're joining a story that's almost 200 years old — and some of its biggest heroes are women. 👩‍💻</p>
<p><b>Ada Lovelace</b> (in the 1840s!) wrote the world's <b>first computer program</b> — for a machine that hadn't even been built yet. She dreamed computers might one day make music and art. She was right by about 150 years. 🎶</p>
<p><b>Grace Hopper</b> taught computers to understand <i>words</i> instead of just numbers — and yes, she's the one who taped that famous moth into the logbook. 🦋</p>
<p><b>Katherine Johnson</b> was a math genius at NASA whose calculations sent astronauts to the Moon and safely home. The astronauts trusted <i>her</i> math even over the new computers.</p>
<p><b>Margaret Hamilton</b> led the team whose code landed Apollo 11 on the Moon — and she helped invent the whole idea of "software engineering."</p>
<p>Brilliant, curious people have always changed the world with code. There's a seat in that story with your name on it, Aurora. ✨</p>`,
    think: "If you could ask one of these four women a single question, who would you ask — and what?",
    more: { text: 'Books: "Girls Who Code" by Reshma Saujani, and "Hidden Figures" (Young Readers Edition).', url: "" },
  },

  /* ---- How Computers Really Work ---- */
  {
    id: "r-bits", icon: "🔢", title: "Everything Is Secretly a Number",
    tag: "How computers work · Binary", world: null, xp: 15, level: "deeper", mins: 5,
    body: `
<p>Here's the most mind-bending secret in all of computing: deep down, a computer only understands <b>two things</b> — <b>on</b> and <b>off</b>. That's it. Like a light switch. 💡</p>
<p>We write "on" as <b>1</b> and "off" as <b>0</b>. One of those is called a <b>bit</b>. And somehow, using only 1s and 0s, computers store <i>everything</i> — your photos, your songs, this very page.</p>
<h3>Counting with two digits</h3>
<p>You count with ten digits (0–9). A computer counts with just two — that's <b>binary</b>. It still works, you just roll over sooner: 0, 1, then <code>10</code> means two, <code>11</code> means three, <code>100</code> means four. Like a car odometer that only has 0s and 1s.</p>
<p>Fun fact: you can count all the way to <b>31 on one hand</b> in binary — each finger is a bit (down = 0, up = 1)! 🖐️</p>
<h3>Letters, pictures, sound… all numbers</h3>
<ul>
  <li><b>Letters:</b> each one gets a number (in one common code, A is 65). So "Hi" is really 72, 105 — which then become bits.</li>
  <li><b>Pictures:</b> every pixel is just numbers for its colour (you saw this in Robot Eyes!).</li>
  <li><b>Sound:</b> a song is measured thousands of times a second, and each measurement is a number.</li>
</ul>
<p>So a selfie, a pop song, and a text message are all just loooong strings of 1s and 0s. The only difference is <b>how the computer reads them</b>. Numbers all the way down. 🤯</p>`,
    think: "Try counting from 0 to 5 on your fingers in binary (a finger down is 0, up is 1). What does 5 look like?",
    more: { text: 'CS Unplugged has a hands-on binary-cards activity; BBC Bitesize covers "bits and bytes".', url: "https://www.csunplugged.org" },
  },
  {
    id: "r-inside-the-machine", icon: "🧠", title: "Inside the Machine: Brain, Desk, and Cupboard",
    tag: "How computers work · Hardware", world: null, xp: 15, level: "deeper", mins: 5,
    body: `
<p>If you opened up a computer or a phone, what's actually <i>in</i> there? Let's take a tour, with a kitchen in mind. 🧑‍🍳</p>
<h3>The brain: the CPU</h3>
<p>The <b>CPU</b> is the chef — it does the real work, following instructions one after another, <b>billions of times a second</b>. When you hear "3 GHz," that means about 3 <i>billion</i> tiny steps every second. 🤯</p>
<h3>The desk: memory (RAM)</h3>
<p><b>RAM</b> is the countertop the chef works on — it holds whatever the computer is using <i>right now</i>. It's lightning fast, but it has a catch: when the power goes off, it <b>forgets everything</b>. (That's exactly why you lose unsaved work if the battery dies! 😱)</p>
<h3>The cupboard: storage</h3>
<p><b>Storage</b> (a hard drive or SSD) is the cupboard and the backpack — it keeps your photos, apps and files <b>even when the power is off</b>. It's much bigger than RAM, but slower to reach into.</p>
<p>So the computer is forever shuttling things between the big-but-slow cupboard and the small-but-fast desk, while the chef cooks. Add a <b>screen</b> and <b>speakers</b> (its voice), plus a <b>keyboard, mouse and camera</b> (its senses), and you've met the whole machine. 🖥️</p>`,
    think: "When you press SAVE on your code, which part are you copying it into so it survives a restart — the fast forgetful desk (RAM), or the cupboard (storage)?",
    more: { text: 'Book: "Hello Ruby: Journey Inside the Computer" by Linda Liukas.', url: "" },
  },

  /* ---- The Coder's Craft ---- */
  {
    id: "r-algorithms", icon: "📋", title: "Algorithms: Recipes That Solve Anything",
    tag: "Coder's craft · Algorithms", world: null, xp: 15, level: "deeper", mins: 5,
    body: `
<p>Fancy word, simple idea: an <b>algorithm</b> is just a <b>clear set of steps to solve a problem</b>. A cake recipe is an algorithm. So is tying your shoes, or doing long division. You already follow dozens every day! 📋</p>
<p>Computers run algorithms billions of times — so here's the cool part: the <i>same</i> problem can have a <b>slow</b> way and a <b>clever fast</b> way.</p>
<h3>Finding things fast</h3>
<p>Imagine finding "Zebra" in a dictionary. The slow way: check page 1, page 2, page 3… forever. The clever way: open the <b>middle</b>, see if you've gone too far, and throw away <i>half</i> the book — then repeat. That's <b>binary search</b>, the trick from the Mind Reader: it finds 1 number out of 100 in just <b>7 guesses</b>! 🎯</p>
<h3>Putting things in order</h3>
<p><b>Sorting</b> means arranging things — like alphabetizing your bookshelf. There are lots of sorting algorithms with great names, and the clever ones can sort a <b>million</b> items in the blink of an eye.</p>
<p>This is the difference between code that just <i>works</i> and code that works <i>smart</i>. With a tiny bit of data, any way is fine. With a LOT of data, a good algorithm is the difference between "instant" and "still loading…". 🐢⚡</p>`,
    think: "How do YOU find a word in a real dictionary — page by page from the start, or by jumping to roughly the right spot and adjusting? You already use a fast algorithm!",
    more: { text: "CS Unplugged has a fun no-computer sorting-networks activity.", url: "https://www.csunplugged.org" },
  },

  /* ---- The Internet & Staying Safe ---- */
  {
    id: "r-internet", icon: "🌐", title: "How the Internet Really Works",
    tag: "The internet · How it works", world: null, xp: 20, level: "deeper", mins: 6,
    body: `
<p>You tap a video and it just… plays. But behind that tap is one of the most amazing machines humans ever built: the <b>internet</b> — millions of computers connected by cables (yes, including giant ones lying across the ocean floor! 🌊) and by wifi and radio waves.</p>
<h3>Messages travel in tiny pieces</h3>
<p>Here's the surprise: your video doesn't arrive as one big lump. It's chopped into thousands of little pieces called <b>packets</b> — like mailing a huge book one page at a time, each page in its own envelope. ✉️</p>
<h3>Everything has an address</h3>
<p>Every device has an <b>IP address</b> — like a postal address. Each packet carries the <b>to</b> address, the <b>from</b> address, and a small chunk of the data. Special computers called <b>routers</b> pass packets along, choosing good routes like postal sorting offices. Different packets might even take different paths!</p>
<p>At your end, all the packets are put back in the right order to rebuild the video — usually in a fraction of a second. 🤯</p>
<h3>Asking for a page</h3>
<p>A website lives on a powerful, always-on computer called a <b>server</b>. Your device is the <b>client</b> that asks for it. You type a web name, and the <b>DNS</b> — the internet's giant phone book — looks up its number so your request knows where to go.</p>
<p>So "the internet" isn't a cloud in the sky. It's a planet-sized postal system for packets, run by millions of cooperating machines. 🌍</p>`,
    think: "If the internet is a giant postal system: what is the envelope, what is the address, and who are the sorting offices?",
    more: { text: '"How does the internet work?" videos at The Kid Should See This.', url: "https://thekidshouldseethis.com/post/how-does-the-internet-work" },
  },
  {
    id: "r-secrets", icon: "🔐", title: "Secret Codes: How the Internet Keeps Secrets",
    tag: "The internet · Secret codes", world: null, xp: 15, level: "deeper", mins: 5,
    body: `
<p>When you type a password or send a message, it hops across <i>many</i> computers to get where it's going. So how come strangers can't just read it? The answer is a 2,000-year-old idea: <b>cryptography</b> — turning a message into a secret code. 🔐</p>
<h3>An ancient trick you can do right now</h3>
<p>The <b>Caesar cipher</b> (used by Julius Caesar himself!) shifts every letter forward by a fixed amount. Shift by 3 and A→D, B→E, C→F… so <b>HI</b> becomes <b>KL</b>. To read it, you need the secret: shift back by 3. Anyone without the secret just sees gibberish.</p>
<h3>Computers do this — but WAY stronger</h3>
<p>Modern codes use gigantic numbers and math that's easy to do one way but practically impossible to undo without the secret <b>key</b>. That little <b>padlock 🔒</b> in your browser bar? It means your data is <b>encrypted</b> on its journey — snoops in the middle just see scrambled nonsense.</p>
<p>This is also why a <b>strong, secret password</b> matters so much: it's <i>your</i> key. Share it, and you've handed someone the key to your front door. 🗝️</p>`,
    think: "Write a short word in Caesar cipher by shifting each letter forward by 3, then see if a friend or grown-up can crack it.",
    more: { text: "cs4fn.org has hands-on cryptography puzzles and secret-code activities.", url: "https://www.cs4fn.org/security/" },
  },
  {
    id: "r-online-safe", icon: "🛡️", title: "Be Safe and Kind Online",
    tag: "The internet · Staying safe", world: null, xp: 15, level: "starter", mins: 3,
    body: `
<p>The internet is a wonderful place — a whole world of games, art, friends and answers. It's also a <b>public</b> place, like a giant city. And a few smart city rules keep you safe and happy. 🛡️</p>
<h3>Keep private things private</h3>
<p>Some things are nobody's business: your <b>passwords</b>, home address, school name, phone number, and full birthday. Don't post them or type them into random sites — <b>not even to a chatbot</b>. 🔒</p>
<h3>Think before you click</h3>
<p>Strange links, prize pop-ups and surprise downloads can be tricks (grown-ups call it <b>phishing</b> 🎣). If something feels weird or too-good-to-be-true, don't click — ask a grown-up.</p>
<h3>Be kind — there's a real person there</h3>
<p>Behind every screen is a real human with real feelings. Don't type anything you wouldn't say to someone's face. And remember: screenshots last <b>forever</b>, so post things future-you would be proud of. That's your <b>digital footprint</b>. 👣</p>
<p>One more secret: it's totally okay to <b>log off</b>. Some of the best things — tennis, piano, a good book, family — live offline. 💚</p>`,
    think: "Name 3 things you should NEVER share online, even if a website or app asks for them nicely.",
    more: { text: "For families: Common Sense Media and BBC Own It have great online-safety guides.", url: "https://www.commonsensemedia.org" },
  },

  /* ---- The Magic of AI (deeper) ---- */
  {
    id: "r-learn", icon: "🧠", title: "How Does an AI Actually Learn?",
    tag: "AI · How it learns", world: null, xp: 20, level: "deeper", mins: 6,
    body: `
<p>You already know AI learns from <b>examples</b>. But <i>how</i> does staring at examples make it smart? Let Nova show you the real magic — it's called <b>training</b>. 🧠</p>
<h3>Wrong, adjust, repeat</h3>
<p>Imagine teaching a robot to spot cats. You show it a photo and ask, "cat?" It guesses. If it's wrong, you tell it — and it nudges itself a tiny bit. Show it a <b>million</b> photos, correcting as you go, and its guesses get better and better. Sound familiar? It's exactly how you learned a tennis serve: try, miss, adjust, try again, until you nail it. 🎾</p>
<h3>A brain made of math</h3>
<p>Many AIs use a <b>neural network</b>, inspired by your brain. Your brain has billions of tiny cells (<b>neurons</b>) wired together. A neural network has lots of simple math "neurons" arranged in layers, joined by connections — and each connection has a <b>strength</b>.</p>
<p>When the AI trains, it turns those connection strengths up or down — like tuning <b>thousands of tiny knobs</b> — until the right answers come out. A big AI can have <b>billions</b> of those knobs! 🎛️</p>
<p>Now you see why AI needs <i>lots</i> of examples and powerful computers: turning that many knobs, that many times, is a giant amount of practice. No magic — just patterns, practice, and a LOT of math. ✨</p>`,
    think: "Think of something hard you learned — a song, a serve, riding a bike. You tried, missed, adjusted, repeated. How is that just like training an AI?",
    more: { text: "Train a real model yourself at Machine Learning for Kids.", url: "https://machinelearningforkids.co.uk" },
  },
  {
    id: "r-art", icon: "🎨", title: "How Does AI Make Pictures?",
    tag: "AI · Making art", world: null, xp: 15, level: "starter", mins: 4,
    body: `
<p>You may have seen AI that draws a picture from words — like "a fox playing tennis on the moon." 🦊🌙 How on earth does it do that?</p>
<h3>It studied millions of labelled pictures</h3>
<p>The AI looked at <i>millions</i> of images together with their descriptions, learning which words tend to go with which shapes, colours and textures — what "fox" looks like, what "moon" looks like.</p>
<h3>From static to art</h3>
<p>Here's the clever trick: it learns to start from random <b>noise</b> (like TV static) and slowly clean it up, step by step, into a picture that matches your words — a bit like spotting a shape in a cloud and sculpting it into being. 🌫️ → 🖼️</p>
<p>But remember what's really happening: it's <b>remixing patterns</b> it learned. It has never actually seen a real fox or felt moonlight. It's matching pixels to words — not imagining the way you do.</p>
<p>That's why <b>you</b> are still the artist. Real art carries feelings, choices and stories. AI is a brilliant paintbrush; a human holds it. 🎨</p>`,
    think: "If you asked an AI to draw your dream bedroom, what 5 describing words would you give it to get it just right?",
    more: { text: 'Play Google "Quick, Draw!" — a neural net tries to guess your doodles.', url: "https://quickdraw.withgoogle.com" },
  },
  {
    id: "r-everywhere", icon: "🔍", title: "Spot the AI: It's Already All Around You",
    tag: "AI · In daily life", world: null, xp: 10, level: "starter", mins: 3,
    body: `
<p>People imagine AI as a far-future robot. But here's the truth: you probably bumped into AI a dozen times <i>before lunch</i>. Let's go on an AI safari through an ordinary day. 🔍</p>
<ul>
  <li>🌅 <b>Morning:</b> your phone unlocks by recognising your face (AI vision). The weather app predicts rain (an AI model).</li>
  <li>🎵 <b>Music &amp; video:</b> Spotify and YouTube suggest what's next — they learned your taste.</li>
  <li>⌨️ <b>Typing:</b> autocomplete, autocorrect, and the spam filter that hides junk mail (AI language).</li>
  <li>📷 <b>Photos:</b> search "beach" and it finds every beach photo; portrait mode blurs the background.</li>
  <li>🗺️ <b>Maps:</b> the fastest route and traffic predictions.</li>
  <li>🗣️ <b>Voice:</b> Siri or Alexa understanding what you said; translation apps.</li>
</ul>
<p>AI isn't coming someday — it's already woven quietly through your day, helping (and sometimes <i>nudging</i> you to keep watching!). The cool part? Once you can <b>spot</b> it, you're the one in charge of it. 😎</p>`,
    think: "Count how many different AIs you bumped into yesterday. Bet it's more than five!",
    more: { text: "cs4fn and AI4K12 have lots more about AI all around us.", url: "https://ai4k12.org" },
  },
  {
    id: "r-creative", icon: "🤔", title: "Can a Computer Think?",
    tag: "AI · Big questions", world: null, xp: 15, level: "starter", mins: 4,
    body: `
<p>Here's a question grown-up scientists still argue about: can a computer truly <b>think</b> — or is it only <i>pretending</i>? 🤔</p>
<h3>The imitation game</h3>
<p>Back in 1950, a brilliant thinker named <b>Alan Turing</b> invented a famous test. The idea: if you chat by text with a hidden human and a hidden computer, and you <b>can't tell which is which</b>, then maybe the computer is "thinking." Today we call it the <b>Turing Test</b>.</p>
<p>Modern chatbots can fool people for a while! But remember our secret from before: they're <b>predicting words</b>, not understanding the way you do. They have no feelings, no memory of being a kid, no tummy that rumbles at lunchtime. 🍎</p>
<h3>A puzzle worth keeping</h3>
<p>An AI can write a poem about love without ever having felt love. Is that real creativity? Smart people <i>disagree</i> — and honestly, that's what makes it such a delicious thing to wonder about.</p>
<p>What everyone <i>does</i> agree on: AI is a powerful tool, and it's <b>humans</b> who bring the meaning, the caring, and the responsibility. 💚</p>`,
    think: "What is one thing YOU can do that you think a computer could never truly do — and why do you think so?",
    more: { text: "cs4fn has fun reads on Alan Turing and whether machines can think.", url: "https://www.cs4fn.org" },
  },

  /* ---- The Humans of Computing ---- */
  {
    id: "r-firstcomputers", icon: "🖥️", title: "When Computers Filled a Whole Room",
    tag: "History · First computers", world: null, xp: 10, level: "starter", mins: 4,
    body: `
<p>The phone in your pocket is a <b>supercomputer</b>. But the very first electronic computers? They were <b>gigantic</b>. 🏢</p>
<p>Meet <b>ENIAC</b> (1945): it weighed about <b>30 tons</b>, filled a whole room, and glowed with around <b>18,000</b> hot vacuum tubes. To program it, people <b>plugged in cables by hand</b> — and the first programmers were a team of brilliant <b>women</b>.</p>
<p>Fun fact: the word "computer" used to mean a <b>person</b> whose <i>job</i> was to compute — to do math by hand, often for science and space missions. Many of those human "computers" were women too.</p>
<p>Those room-sized machines were thousands of times <b>weaker</b> than your phone, gulped enough electricity to dim the lights, and broke down constantly (remember the famous moth bug? 🦋). Yet they helped win a war and reach for the stars.</p>
<p>In about <b>80 years</b> we went from a 30-ton room to a sliver of glass in your hand, millions of times faster. So here's a thought: what will computers look like when <b>you're</b> grown up? You might help build them. 🚀</p>`,
    think: "If you could time-travel and show the ENIAC engineers your tablet, what do you think would amaze them most?",
    more: { text: 'Book: "Hello Ruby" by Linda Liukas — or look up photos of ENIAC.', url: "" },
  },
  {
    id: "r-turing", icon: "🔓", title: "The Codebreaker Who Helped Win a War",
    tag: "History · Codebreakers", world: null, xp: 15, level: "deeper", mins: 5,
    body: `
<p>Some people change the world quietly. <b>Alan Turing</b> is one of the most important thinkers behind the very computer you're using right now. 🧠</p>
<h3>He imagined computers before they existed</h3>
<p>Long before real computers, Turing dreamed up a machine that could follow <i>any</i> list of instructions to solve <i>any</i> solvable problem. That single idea is the seed of <b>every</b> computer today — we still call it a "Turing machine."</p>
<h3>The codebreaker</h3>
<p>In World War II, the enemy sent secret orders scrambled by a machine called <b>Enigma</b> — with <b>billions</b> of possible settings that <b>changed every single day</b>. Cracking it by hand was hopeless.</p>
<p>So Turing and his team at Bletchley Park (including many women) built a code-breaking machine called the <b>Bombe</b> to test settings at lightning speed. Historians believe their work <b>shortened the war by years</b> and saved countless lives. It stayed top secret for decades! 🤫</p>
<p>He also dreamed up the <b>Turing Test</b> for machine thinking. Computing's highest honour — the <b>Turing Award</b> — is named after him. Not bad for a curious puzzle-lover. 🏆</p>`,
    think: "Breaking Enigma meant attacking a puzzle that reset every single day. When a puzzle feels impossible, what helps YOU keep going?",
    more: { text: '"The Kid Should See This" has great Alan Turing and Enigma videos.', url: "https://thekidshouldseethis.com" },
  },
  {
    id: "r-young", icon: "🌟", title: "You Don't Have to Be a Grown-Up to Change Things",
    tag: "You · Your turn", world: null, xp: 15, level: "starter", mins: 3,
    body: `
<p>Time for Nova's favourite myth to bust: the idea that you must be a grown-up expert before you can make something real. <b>Not true.</b> 🌟</p>
<p>Kids and teens have built popular games and apps, won science fairs that turned into real inventions, started coding clubs, and made tools and art that help actual people. They didn't wait for permission.</p>
<p>The secret isn't being a super-genius. It's three things: being <b>curious</b>, <b>trying</b> stuff, and <b>not quitting</b> when it's hard. (Every bug you squash is practice — you're already doing it!)</p>
<p>And you've got the tools right now: a computer, Python, the whole internet's knowledge, and a brain that loves puzzles. 🧩</p>
<p>So start small and <b>real</b>: a program that quizzes your little brother, a silly story maker for your friends, aurora art for your wall, a tiny tool that fixes one annoying thing in your day. Every person in these readings began exactly where you are — as a curious kid. <b>Heja, Aurora!</b> 🦊💚</p>`,
    think: "What is one small thing in your daily life you'd love to build a program for? That could be your very first real project.",
    more: { text: "Girls Who Code, and the code.org Hour of Code, are great next steps.", url: "https://girlswhocode.com" },
  },
];

/* Reading "shelves" — group the Notebook into themed sections in the Read hub.
   Every reading id should appear in exactly one shelf, in display order.        */
const SHELVES = [
  { id: "machine", emoji: "🖥️", title: "How Computers Really Work",
    blurb: "Peek inside the machine — bits, brains, and memory.",
    ids: ["r-bits", "r-inside-the-machine", "r-decide"] },
  { id: "craft", emoji: "🛠️", title: "The Coder's Craft",
    blurb: "How real software gets made, and how to think like a coder.",
    ids: ["r-bug", "r-loops", "r-lists", "r-functions", "r-algorithms", "r-think-like-coder"] },
  { id: "internet", emoji: "🌐", title: "The Internet & Staying Safe",
    blurb: "How the whole world gets connected — and how to be safe and kind online.",
    ids: ["r-internet", "r-secrets", "r-online-safe"] },
  { id: "ai", emoji: "🤖", title: "The Magic of AI",
    blurb: "What AI is, how it learns, and how to use it wisely.",
    ids: ["r-what-ai", "r-see", "r-learn", "r-think", "r-talk", "r-art", "r-everywhere", "r-creative", "r-fair"] },
  { id: "humans", emoji: "👩‍💻", title: "The Humans of Computing",
    blurb: "The brilliant, curious people who built this world — and your place in it.",
    ids: ["r-firstcomputers", "r-turing", "r-history", "r-young"] },
];

const WORLDS = [

/* ════════════════════════ WORLD 1 ════════════════════════ */
{
  id: "w1",
  name: "Starlight Basics",
  emoji: "⭐",
  color: "#2bf0a8",
  tagline: "Warm up your Python powers: printing, variables and talking to the computer.",
  lessons: [
    {
      id: "w1l1", title: "Hello, Aurora!", type: "lesson", xp: 20,
      learn: `
<p>Welcome to your Code Quest! 🦊 I'm <b>Nova the arctic fox</b>, and I'll be your guide all summer. You already know some Python from Hour of Python — so let's warm up.</p>
<p><code>print()</code> tells the computer to <b>show something on the screen</b>. Whatever you put between the quotes gets printed:</p>
<div class="codebox">print("Hello, Aurora!")
print("Welcome to Code Quest 🌌")</div>
<p>You can print as many lines as you want. You can even make <b>text art</b>:</p>
<div class="codebox">print("  *  ")
print(" *** ")
print("*****")</div>
<div class="fox-tip"><span class="f">🦊</span><p><b>Nova's tip:</b> Quotes always come in pairs — <code>"like this"</code>. If you forget one, Python gets confused!</p></div>`,
      starter: `# Write your code here, then press RUN ▶
print("Hello, world!")
`,
      challenge: {
        text: "Make the program print a welcome message with your name in it, and then print at least 2 more lines to draw a star or any text-art you like. ✨",
        hints: ["Use one print() for each line of your art.", "Example first line: print(\"Hi, I am Aurora!\")"],
        check: { codeAll: ["print"], minPrints: 3 },
      },
    },
    {
      id: "w1l2", title: "Variables: Magic Boxes", type: "lesson", xp: 20,
      learn: `
<p>A <b>variable</b> is like a labelled box where you store information. You create one with <code>=</code> :</p>
<div class="codebox">name = "Aurora"
favourite_book = "Harry Potter"
tennis_wins = 7

print(name)
print(favourite_book)
print(tennis_wins)</div>
<p>You can combine text and variables in a print using <b>commas</b>:</p>
<div class="codebox">print(name, "has won", tennis_wins, "tennis matches!")</div>
<p>Variables can <b>change</b> — that's why they're called variables:</p>
<div class="codebox">tennis_wins = 7
tennis_wins = tennis_wins + 1   # she won again!
print(tennis_wins)              # shows 8</div>
<div class="fox-tip"><span class="f">🦊</span><p><b>Nova's tip:</b> Text needs quotes (<code>"Aurora"</code>) but numbers don't (<code>7</code>). And variable names can't have spaces — use <code>_</code> instead.</p></div>`,
      starter: `# Create variables about yourself!
name = "?"
age = 0
hobby = "?"

print("My name is", name)
`,
      challenge: {
        text: "Create at least 3 variables about yourself (like name, age, favourite book or sport) and print a sentence using them with commas.",
        hints: ["Remember: text in quotes, numbers without.", "print(\"I am\", name, \"and I love\", hobby)"],
        check: { codeAll: ["=", "print"], minVars: 3 },
      },
    },
    {
      id: "w1l3", title: "Python the Calculator", type: "lesson", xp: 20,
      learn: `
<p>Python is a super-fast calculator. Here are the math symbols:</p>
<ul>
  <li><code>+</code> add &nbsp;·&nbsp; <code>-</code> subtract &nbsp;·&nbsp; <code>*</code> multiply &nbsp;·&nbsp; <code>/</code> divide</li>
  <li><code>**</code> power (so <code>2 ** 3</code> is 2×2×2 = 8)</li>
</ul>
<div class="codebox">print(2025 - 2014)        # how old someone born 2014 turns this year
print(7 * 52)             # piano practice: 7 hours a week for a year!
print((23.77 * 10.97))    # area of a tennis court in m²</div>
<p>Math works with variables too:</p>
<div class="codebox">practice_per_week = 5
weeks = 10
total = practice_per_week * weeks
print("This summer you will practice", total, "hours!")</div>`,
      starter: `# Tennis math!
# A tennis match has 3 sets, about 40 minutes each.
minutes_per_set = 40
sets = 3

# your code here
`,
      challenge: {
        text: "Use variables and * to calculate how many minutes a 3-set tennis match takes, then print the answer in a full sentence.",
        hints: ["total = minutes_per_set * sets", "print(\"A match takes\", total, \"minutes\")"],
        check: { codeAll: ["*", "print"], outputAny: ["120"] },
      },
    },
    {
      id: "w1l4", title: "Talking Programs: input()", type: "lesson", xp: 20,
      learn: `
<p>So far the computer only talks <b>to</b> you. With <code>input()</code>, it can <b>listen</b> too! The program pauses and waits for you to type an answer:</p>
<div class="codebox">name = input("What is your name? ")
print("Nice to meet you,", name, "!")</div>
<p><code>input()</code> always gives you <b>text</b>. If you need a <b>number</b> to do math, wrap it in <code>int()</code>:</p>
<div class="codebox">age = int(input("How old are you? "))
print("Next year you will be", age + 1)</div>
<div class="fox-tip"><span class="f">🦊</span><p><b>Nova's tip:</b> When you run this, a box appears in the black console below — type your answer there and press Enter!</p></div>`,
      starter: `# A program that talks WITH you
food = input("What is your favourite food? ")
print("Yum! I love", food, "too!")
`,
      challenge: {
        text: "Write a mini-interview program: ask at least 2 questions with input() and print a friendly reply that uses the answers.",
        hints: ["Each input() needs its own variable: book = input(\"Favourite book? \")", "Then print(\"Oh,\", book, \"is a great book!\")"],
        check: { codeAll: ["input", "print"], minInputs: 2 },
      },
    },
  ],
},

/* ════════════════════════ WORLD 2 ════════════════════════ */
{
  id: "w2",
  name: "Decision Peaks",
  emoji: "🏔️",
  color: "#4cc9ff",
  tagline: "Teach your programs to make choices with if, else and elif.",
  lessons: [
    {
      id: "w2l1", title: "True or False?", type: "lesson", xp: 20,
      learn: `
<p>Computers love questions with only two answers: <b>True</b> or <b>False</b>. These are called <b>booleans</b>.</p>
<p>You ask questions with <b>comparison symbols</b>:</p>
<ul>
  <li><code>==</code> equal to &nbsp;·&nbsp; <code>!=</code> not equal to</li>
  <li><code>&gt;</code> bigger &nbsp;·&nbsp; <code>&lt;</code> smaller &nbsp;·&nbsp; <code>&gt;=</code> / <code>&lt;=</code> bigger/smaller or equal</li>
</ul>
<div class="codebox">print(10 &gt; 5)        # True
print(3 == 4)        # False
print("cat" == "cat")  # True

my_score = 40
your_score = 30
print(my_score &gt; your_score)   # True — I'm winning!</div>
<div class="fox-tip"><span class="f">🦊</span><p><b>Nova's tip:</b> One <code>=</code> puts something in a box (assigns). Two <code>==</code> asks "are these equal?". Mixing them up is the most popular bug in the world! 🐛</p></div>`,
      starter: `# Tennis scoreboard
aurora_points = 30
opponent_points = 15

# Print some True/False questions about the score:
print(aurora_points > opponent_points)
`,
      challenge: {
        text: "Print at least 3 different comparisons (use >, <, == or !=). At least one should print True and one should print False.",
        hints: ["Try comparing numbers AND text.", "print(15 == 15) → True. print(2 > 9) → False."],
        check: { outputAll: ["True", "False"] },
      },
    },
    {
      id: "w2l2", title: "if / else: The Fork in the Road", type: "lesson", xp: 20,
      learn: `
<p>An <code>if</code> lets the program choose a path, like a fork on a mountain trail:</p>
<div class="codebox">temperature = 25

if temperature &gt; 20:
    print("Perfect tennis weather! 🎾")
else:
    print("Maybe indoor piano practice today 🎹")</div>
<p>Three important details:</p>
<ul>
  <li>The <code>if</code> line ends with a colon <code>:</code></li>
  <li>The code inside is pushed right (indented) by <b>4 spaces</b></li>
  <li><code>else</code> means "otherwise" — it runs when the if is False</li>
</ul>
<p>This works great with <code>input()</code>:</p>
<div class="codebox">answer = input("Is it sunny today? (yes/no) ")

if answer == "yes":
    print("Grab your tennis racket!")
else:
    print("A perfect day for reading 📖")</div>`,
      starter: `# Tiebreak decider!
my_points = int(input("Your tiebreak points: "))
opponent = int(input("Opponent's points: "))

# write an if/else that prints who won
`,
      challenge: {
        text: "Finish the tiebreak decider: if your points are higher, print a victory message; otherwise print an encouraging message. Run it and try both endings!",
        hints: ["if my_points > opponent:", "Don't forget the colon and the 4 spaces!"],
        check: { codeAll: ["if", "else", ":"] },
      },
    },
    {
      id: "w2l3", title: "elif: More Than Two Paths", type: "lesson", xp: 20,
      learn: `
<p>Sometimes there are more than two choices. <code>elif</code> (short for "else if") adds extra paths:</p>
<div class="codebox">hour = 15

if hour &lt; 9:
    print("Good morning! 🌅")
elif hour &lt; 17:
    print("Good afternoon! ☀️")
elif hour &lt; 21:
    print("Good evening! 🌆")
else:
    print("Good night! 🌙")</div>
<p>Python checks from the top and runs the <b>first</b> path that's True, then skips the rest.</p>
<div class="fox-tip"><span class="f">🦊</span><p><b>Nova's tip:</b> You can have as many <code>elif</code> branches as you want, but only one <code>if</code> (first) and one <code>else</code> (last).</p></div>`,
      starter: `# Book recommender 1.0
mood = input("How do you feel? (happy/sleepy/adventurous) ")

if mood == "happy":
    print("Read a comedy! 😂")
# add elif and else branches here
`,
      challenge: {
        text: "Build a mood-based book recommender with at least 3 different moods using if / elif / else. Each mood prints a different book suggestion.",
        hints: ["elif mood == \"sleepy\":", "End with an else for any other answer: print(\"Surprise me — pick any book!\")"],
        check: { codeAll: ["if", "elif", "else"] },
      },
    },
    {
      id: "w2l4", title: "and / or: The Secret Door", type: "lesson", xp: 20,
      learn: `
<p>You can combine questions with <code>and</code> / <code>or</code>:</p>
<ul>
  <li><code>and</code> → True only if <b>both</b> sides are True</li>
  <li><code>or</code> → True if <b>at least one</b> side is True</li>
</ul>
<div class="codebox">sunny = True
have_racket = True

if sunny and have_racket:
    print("Tennis time! 🎾")

day = "Saturday"
if day == "Saturday" or day == "Sunday":
    print("It's the weekend! 🎉")</div>`,
      starter: `# The Secret Door 🚪
# Only opens with the right word AND the right number!
word = input("Say the magic word: ")
number = int(input("Say the magic number: "))

# the door opens for "aurora" and 12
`,
      challenge: {
        text: "Finish the Secret Door game: it opens only if the word is \"aurora\" AND the number is 12. Print a special message when it opens, and a 'try again' message otherwise.",
        hints: ["if word == \"aurora\" and number == 12:", "Use else for the locked door."],
        check: { codeAll: ["and", "if", "else"] },
      },
    },
    {
      id: "w2quiz", title: "Mountain Top Quiz", type: "quiz", xp: 25,
      intro: "You climbed Decision Peaks! 🏔️ Show what you know to plant your flag on the summit.",
      quiz: [
        { q: "What does 7 > 3 print?", options: ["True", "False", "7", "Error"], answer: 0, why: "7 is bigger than 3, so the comparison is True." },
        { q: "Which symbol asks 'are these equal?'", options: ["=", "==", "!=", "=>"], answer: 1, why: "One = stores a value, two == compares values." },
        { q: "When does the else part run?", options: ["Always", "When the if is True", "When the if is False", "Never"], answer: 2, why: "else is the 'otherwise' path — it runs when the if was False." },
        { q: "sunny = True, weekend = False. What is sunny and weekend?", options: ["True", "False", "Maybe", "Error"], answer: 1, why: "and needs BOTH to be True. weekend is False, so the whole thing is False." },
        { q: "What is missing? ⟶  if age > 10␣", options: ["A dot .", "A colon :", "A comma ,", "Nothing"], answer: 1, why: "Every if line ends with a colon : — then the next line is indented." },
      ],
    },
  ],
},

/* ════════════════════════ WORLD 3 ════════════════════════ */
{
  id: "w3",
  name: "Loop Lagoon",
  emoji: "🌀",
  color: "#5ee0ff",
  tagline: "Make the computer repeat things thousands of times — including drawing!",
  lessons: [
    {
      id: "w3l1", title: "for Loops: Repeat After Me", type: "lesson", xp: 20,
      learn: `
<p>Computers never get bored of repeating. A <code>for</code> loop repeats code a chosen number of times:</p>
<div class="codebox">for i in range(5):
    print("Practice makes perfect! 🎹")</div>
<p>This prints the message 5 times. The variable <code>i</code> counts the laps, starting at 0:</p>
<div class="codebox">for i in range(5):
    print("Lap number", i)
# prints 0, 1, 2, 3, 4</div>
<p><code>range</code> can also start somewhere else: <code>range(1, 6)</code> counts 1, 2, 3, 4, 5.</p>
<div class="fox-tip"><span class="f">🦊</span><p><b>Nova's tip:</b> <code>range(5)</code> goes 0…4 (five numbers, but stops <b>before</b> 5). Computers love counting from 0!</p></div>`,
      starter: `# The 8 times table, the lazy way!
for i in range(1, 11):
    print(i, "x 8 =", i * 8)
`,
      challenge: {
        text: "Change the program to print a times table of YOUR choice (not 8), from 1 to 12 instead of 1 to 10.",
        hints: ["range(1, 13) gives you 1 to 12.", "Change both 8s to your number."],
        check: { codeAll: ["for", "range"], outputAny: ["12 x", "12 *", "12x"] },
      },
    },
    {
      id: "w3l2", title: "Turtle Power: Drawing with Loops", type: "lesson", xp: 20,
      learn: `
<p>Remember the turtle from Hour of Python? 🐢 It lives here too! And with loops, it becomes an artist.</p>
<p>Drawing a square <b>without</b> a loop takes 8 lines. With a loop — just 3:</p>
<div class="codebox">import turtle
t = turtle.Turtle()
t.color("cyan")

for i in range(4):
    t.forward(100)
    t.right(90)</div>
<p>Change the numbers and magic happens:</p>
<ul>
  <li><code>range(3)</code> + <code>t.right(120)</code> → triangle</li>
  <li><code>range(6)</code> + <code>t.right(60)</code> → hexagon</li>
  <li><code>range(36)</code> + <code>t.right(170)</code> → a STAR explosion ✨</li>
</ul>
<p>Make it pretty with <code>t.color("cyan")</code>, <code>t.pensize(3)</code> and <code>t.speed(10)</code>.</p>`,
      starter: `import turtle
t = turtle.Turtle()
t.color("cyan")
t.speed(10)

for i in range(4):
    t.forward(100)
    t.right(90)
`,
      challenge: {
        text: "Draw a shape with at least 5 sides (pentagon, hexagon… or a crazy star). Tip: for a shape with N sides, turn 360 ÷ N degrees. Bonus: change the color!",
        hints: ["Hexagon: range(6) and t.right(60).", "Star: try range(36) with t.right(170) and watch!"],
        check: { codeAll: ["turtle", "for", "forward"] },
      },
    },
    {
      id: "w3l3", title: "while Loops: Repeat Until…", type: "lesson", xp: 20,
      learn: `
<p>A <code>for</code> loop repeats a <b>fixed</b> number of times. A <code>while</code> loop repeats <b>as long as something is True</b> — you don't know how many times in advance!</p>
<div class="codebox">energy = 10

while energy &gt; 0:
    print("Playing tennis! Energy:", energy)
    energy = energy - 2

print("Time for fika! ☕")</div>
<p>This is perfect for games — repeat until the player wins:</p>
<div class="codebox">secret = "piano"
guess = ""

while guess != secret:
    guess = input("Guess my favourite instrument: ")

print("Yes!! 🎉")</div>
<div class="fox-tip"><span class="f">🦊</span><p><b>Nova's tip:</b> Make sure something <b>changes</b> inside the loop, or it will run forever! (Don't worry — I'll stop it if it runs too long.)</p></div>`,
      starter: `import random
secret = random.randint(1, 20)
guess = 0

print("I am thinking of a number from 1 to 20...")

while guess != secret:
    guess = int(input("Your guess: "))
    if guess < secret:
        print("Too low! ⬇️")
    elif guess > secret:
        print("Too high! ⬆️")

print("YES! It was", secret, "🎉")
`,
      challenge: {
        text: "Run the guessing game and win it! Then improve it: add a counter variable that counts your guesses and print it at the end (\"You needed X guesses\").",
        hints: ["Start with tries = 0 before the loop.", "Inside the loop: tries = tries + 1. After the loop, print it."],
        check: { codeAll: ["while", "input"], outputAny: ["YES", "🎉"] },
      },
    },
    {
      id: "w3l4", title: "Spiral Galaxy Art", type: "lesson", xp: 20,
      learn: `
<p>Time to combine everything into <b>art</b>. The trick to a spiral: make the turtle walk a tiny bit <b>further on every lap</b>, using the loop counter <code>i</code>:</p>
<div class="codebox">import turtle
t = turtle.Turtle()
t.speed(10)
t.color("violet")

for i in range(100):
    t.forward(i * 2)   # walks further each lap!
    t.right(91)</div>
<p>Try changing the turn angle: <code>91</code>, <code>120</code>, <code>61</code>, <code>45</code>… each one creates a totally different galaxy 🌌</p>
<p>You can even change colors during the loop:</p>
<div class="codebox">colors = ["cyan", "magenta", "yellow", "lime"]
for i in range(100):
    t.color(colors[i % 4])   # cycles through the colors
    t.forward(i * 2)
    t.right(91)</div>`,
      starter: `import turtle
t = turtle.Turtle()
t.speed(10)
t.pensize(2)
t.color("cyan")

for i in range(100):
    t.forward(i * 2)
    t.right(91)
`,
      challenge: {
        text: "Create YOUR spiral galaxy: change the angle, the number of laps, or the colors until you make something you'd hang on the wall. There is no wrong answer — run it until you love it!",
        hints: ["Angles near 90 or 120 make tight galaxies; try 121 or 89.", "Add the colors list from the lesson for a rainbow spiral."],
        check: { codeAll: ["turtle", "for", "forward"] },
      },
    },
  ],
},

/* ════════════════════════ WORLD 4 ════════════════════════ */
{
  id: "w4",
  name: "List Library",
  emoji: "📚",
  color: "#a78bfa",
  tagline: "Store whole collections — books, songs, scores — in a single variable.",
  lessons: [
    {
      id: "w4l1", title: "Lists: A Bookshelf in a Variable", type: "lesson", xp: 20,
      learn: `
<p>A <b>list</b> is a variable that holds <b>many things at once</b> — like a bookshelf holds many books:</p>
<div class="codebox">books = ["Matilda", "Harry Potter", "Percy Jackson"]
print(books)
print(len(books))   # len() counts: 3</div>
<p>Add a new book to the shelf with <code>.append()</code>:</p>
<div class="codebox">books.append("The Hobbit")
print(books)        # now 4 books!</div>
<p>Lists can hold numbers too — or anything:</p>
<div class="codebox">tennis_scores = [6, 4, 7]
piano_pieces = ["Für Elise", "River Flows in You"]</div>`,
      starter: `# Your real bookshelf!
books = ["?", "?"]

print("My shelf:", books)
print("I have", len(books), "books")
`,
      challenge: {
        text: "Make a list with at least 3 of your favourite books (or songs). Then append one more, and print the list and its length.",
        hints: ["books.append(\"New book\") adds to the end.", "len(books) tells you how many."],
        check: { codeAll: ["[", "]", "append", "len"] },
      },
    },
    {
      id: "w4l2", title: "Picking from the Shelf: Indexes", type: "lesson", xp: 20,
      learn: `
<p>Every item in a list has a <b>position number</b>, called an index. And yes — computers start counting at <b>0</b>:</p>
<div class="codebox">books = ["Matilda", "Harry Potter", "Percy Jackson"]

print(books[0])    # Matilda (the FIRST book)
print(books[2])    # Percy Jackson
print(books[-1])   # Percy Jackson too! -1 means "last"</div>
<p>You can also <b>swap</b> a book on the shelf:</p>
<div class="codebox">books[1] = "Pippi Longstocking"
print(books)</div>
<p>And remove one:</p>
<div class="codebox">books.remove("Matilda")
print(books)</div>
<div class="fox-tip"><span class="f">🦊</span><p><b>Nova's tip:</b> Asking for <code>books[10]</code> when there are only 3 books gives an error — like reaching for a shelf that isn't there!</p></div>`,
      starter: `playlist = ["Für Elise", "Nocturne", "River Flows in You", "Clair de Lune"]

# print the first song
# print the last song
# swap one song for a new one, then print the playlist
`,
      challenge: {
        text: "Using the playlist: print the first song, print the last song (use -1!), replace one song with a different one, and print the final playlist.",
        hints: ["First: playlist[0]. Last: playlist[-1].", "Replace: playlist[2] = \"New song\""],
        check: { codeAll: ["[0]", "[-1]", "print"] },
      },
    },
    {
      id: "w4l3", title: "Looping Through Lists", type: "lesson", xp: 20,
      learn: `
<p>Loops and lists are best friends. This visits <b>every item</b>, one by one:</p>
<div class="codebox">books = ["Matilda", "Harry Potter", "Percy Jackson"]

for book in books:
    print("I love", book, "📖")</div>
<p>You can do math over a list too — let's total some tennis games:</p>
<div class="codebox">games_won = [6, 4, 7, 6]
total = 0

for g in games_won:
    total = total + g

print("Games won this week:", total)</div>
<p>Add an <code>if</code> inside the loop to filter:</p>
<div class="codebox">for g in games_won:
    if g &gt;= 6:
        print(g, "— a winning set! 🏆")</div>`,
      starter: `practice_minutes = [30, 45, 20, 60, 25]

total = 0
# loop through the list and add each one to total

print("Total piano practice:", total, "minutes")
`,
      challenge: {
        text: "Finish the program: loop through practice_minutes and add up the total (it should print 180). Bonus: inside the loop, print \"Great session!\" for any day with 45 minutes or more.",
        hints: ["for m in practice_minutes:", "    total = total + m"],
        check: { codeAll: ["for", "total"], outputAny: ["180"] },
      },
    },
    {
      id: "w4l4", title: "The Magic 8-Ball 🎱", type: "lesson", xp: 20,
      learn: `
<p>Time for randomness! Python's <code>random</code> module can pick a surprise item from any list:</p>
<div class="codebox">import random

answers = ["Yes!", "No way", "Definitely", "Ask again later", "Hmm... maybe"]
print(random.choice(answers))</div>
<p>Every run gives a different answer. This is how you build a <b>Magic 8-Ball</b>:</p>
<div class="codebox">import random

answers = ["Yes!", "No 🙅", "100% yes!!", "Try again tomorrow"]
question = input("Ask the Magic 8-Ball anything: ")
print("🎱 The ball says:", random.choice(answers))</div>
<p><code>random.randint(1, 6)</code> gives a random whole number — like rolling a dice 🎲</p>`,
      starter: `import random

answers = ["Yes!", "No way", "Definitely!", "Ask again later"]

question = input("Ask me anything: ")
print("🎱", random.choice(answers))
`,
      challenge: {
        text: "Upgrade the Magic 8-Ball: give it at least 6 possible answers (make them funny!), and after answering, ask \"Ask another question:\" and answer one more time.",
        hints: ["Just add more strings to the answers list.", "Copy the input + print lines to ask twice."],
        check: { codeAll: ["random.choice", "input"] },
      },
    },
  ],
},

/* ════════════════════════ WORLD 5 ════════════════════════ */
{
  id: "w5",
  name: "Function Forest",
  emoji: "🌲",
  color: "#2bd9a8",
  tagline: "Create your own commands — spells you can cast again and again.",
  lessons: [
    {
      id: "w5l1", title: "def: Write Your Own Spell", type: "lesson", xp: 20,
      learn: `
<p>You already use functions: <code>print()</code>, <code>input()</code>, <code>len()</code>… Now you'll create <b>your own</b>!</p>
<p>A function is a recipe with a name. Define it with <code>def</code>, run it by <b>calling</b> its name:</p>
<div class="codebox">def cheer():
    print("Heja heja! 📣")
    print("You can do it!")

cheer()
cheer()
cheer()</div>
<p>The function's code only runs when you <b>call</b> it — that's why <code>cheer()</code> appears 3 times and you get 3 cheers.</p>
<div class="fox-tip"><span class="f">🦊</span><p><b>Nova's tip:</b> Just like <code>if</code> and <code>for</code>, the def line ends with <code>:</code> and the body is indented 4 spaces.</p></div>`,
      starter: `def cheer():
    print("Heja heja! 📣")

cheer()
`,
      challenge: {
        text: "Write a function called good_morning() that prints a 3-line morning greeting, then call it twice.",
        hints: ["def good_morning():  — then 3 indented print lines.", "Call it by writing good_morning() on its own line (no indent)."],
        check: { codeAll: ["def", "good_morning", "()"] },
      },
    },
    {
      id: "w5l2", title: "Parameters: Spells with Ingredients", type: "lesson", xp: 20,
      learn: `
<p>Functions get really powerful when you give them <b>ingredients</b> — called parameters:</p>
<div class="codebox">def greet(name):
    print("Hej", name, "! 👋")

greet("Aurora")
greet("Nova")
greet("Pappa")</div>
<p>One recipe, endless meals! Functions can take <b>several</b> parameters:</p>
<div class="codebox">def match_result(player, sets_won):
    if sets_won &gt;= 2:
        print(player, "WINS the match! 🏆")
    else:
        print(player, "played well — next time!")

match_result("Aurora", 2)
match_result("Maja", 1)</div>`,
      starter: `def greet(name):
    print("Hej", name, "! 👋")

greet("Aurora")
`,
      challenge: {
        text: "Write a function birthday(name, age) that prints a birthday song verse using both the name and the age. Call it for 3 different people.",
        hints: ["def birthday(name, age):", "print(\"Happy birthday\", name, \"- you are\", age, \"!\")"],
        check: { codeAll: ["def", "(", ","] },
      },
    },
    {
      id: "w5l3", title: "return: Spells that Answer Back", type: "lesson", xp: 20,
      learn: `
<p>Some functions don't just print — they <b>hand back an answer</b> you can store and reuse. That's <code>return</code>:</p>
<div class="codebox">def double(number):
    return number * 2

x = double(5)
print(x)             # 10
print(double(double(10)))  # 40 — functions inside functions!</div>
<p>A more useful example — converting money for a trip:</p>
<div class="codebox">def kronor_to_euro(kr):
    return kr / 11.5

price = kronor_to_euro(230)
print("230 kr is about", price, "euro")</div>
<div class="fox-tip"><span class="f">🦊</span><p><b>Nova's tip:</b> <code>print</code> shows a value to a <b>human</b>. <code>return</code> hands a value to <b>the program</b>. Big difference!</p></div>`,
      starter: `def add_points(a, b):
    return a + b

total = add_points(15, 30)
print("Total points:", total)
`,
      challenge: {
        text: "Write a function minutes_to_hours(minutes) that returns the minutes divided by 60. Use it to print how many hours 480 minutes of summer reading is.",
        hints: ["return minutes / 60", "print(minutes_to_hours(480)) — should show 8.0"],
        check: { codeAll: ["def", "return"], outputAny: ["8"] },
      },
    },
    {
      id: "w5l4", title: "Mini-Build: The Scoreboard Machine", type: "lesson", xp: 25,
      learn: `
<p>Let's combine <b>everything</b> — functions, lists, loops and ifs — into one machine. Read this code slowly and predict what it does <i>before</i> running:</p>
<div class="codebox">def total(points_list):
    summa = 0
    for p in points_list:
        summa = summa + p
    return summa

def report(name, points_list):
    print("===", name, "===")
    print("Matches:", len(points_list))
    print("Total points:", total(points_list))

report("Aurora", [4, 6, 6, 3])</div>
<p>See how <code>report</code> <b>uses</b> <code>total</code>? Functions calling functions is how all big programs are built — even the apps on your phone!</p>`,
      starter: `def total(points_list):
    summa = 0
    for p in points_list:
        summa = summa + p
    return summa

def report(name, points_list):
    print("===", name, "===")
    print("Matches:", len(points_list))
    print("Total points:", total(points_list))

report("Aurora", [4, 6, 6, 3])
`,
      challenge: {
        text: "Add a function average(points_list) that returns total(points_list) / len(points_list), and make report print the average too. Then call report for a second player.",
        hints: ["def average(points_list): return total(points_list) / len(points_list)", "Inside report add: print(\"Average:\", average(points_list))"],
        check: { codeAll: ["def", "average", "return"] },
      },
    },
  ],
},

/* ════════════════════════ WORLD 6 ════════════════════════ */
{
  id: "w6",
  name: "AI Academy",
  emoji: "🤖",
  color: "#ff8fd8",
  tagline: "What IS artificial intelligence? Train one. Trick one. Build one.",
  lessons: [
    {
      id: "w6l1", title: "What Is AI, Really?", type: "widget", widget: "ai-or-not", xp: 20,
      learn: `
<p><b>Artificial Intelligence</b> (AI) is a computer program that does things we used to think only humans could do: recognising faces, understanding language, recommending music, playing chess…</p>
<p>Here is the big secret: 🤫</p>
<ul>
  <li><b>Normal programs</b> follow exact rules a person wrote — like the ones YOU have been writing! <code>if score &gt; 10: print("win")</code></li>
  <li><b>AI programs learn the rules themselves</b> by studying tons of <b>examples</b> — like how you learned to recognise cats: nobody gave you a rule book, you just saw lots of cats!</li>
</ul>
<p>AI is already all around you: Spotify learns what music you like, your phone camera finds faces, and translators turn Swedish into English in a blink.</p>
<p><b>Your mission:</b> play "AI or Not?" below. For each thing, guess whether it learns from examples (AI) or just follows fixed rules (not AI).</p>`,
    },
    {
      id: "w6l2", title: "Teach the Robot 🍎🍌", type: "widget", widget: "knn", xp: 25,
      learn: `
<p>Time to <b>train your own AI</b> — no code needed, just examples. This is called <b>machine learning</b>.</p>
<p>The playground below is a map of fruit. Left↔right is <b>shape</b> (round ↔ long), down↕up is <b>size</b> (small ↕ big).</p>
<ol>
  <li>Click <b>"Add 🍎"</b> and place some apples on the map (round-ish side).</li>
  <li>Click <b>"Add 🍌"</b> and place some bananas (long side).</li>
  <li>Click <b>"Ask the robot ❓"</b> and click anywhere — the robot guesses which fruit lives there!</li>
</ol>
<p>The robot uses a real AI method called <b>"nearest neighbours"</b>: it looks at the 3 closest examples you gave and votes. More examples = smarter robot.</p>
<p><b>Experiments to try:</b> What happens with only 1 apple and 10 bananas? Can you place a sneaky apple in banana-land to confuse it? This is exactly why real AI needs <b>lots of good examples</b>!</p>`,
    },
    {
      id: "w6l3", title: "The Word Wizard 🪄 (How ChatGPT Works)", type: "widget", widget: "ngram", xp: 25,
      learn: `
<p>Have you wondered how AI like <b>ChatGPT or Claude</b> writes? The core trick is surprisingly simple:</p>
<p style="text-align:center; font-size:1.15rem;"><b>It predicts the next word. Again and again and again.</b></p>
<p>It read billions of sentences and learned which word usually comes next. After "Once upon a…" it has seen "time" a million times — so it predicts "time".</p>
<p><b>Below is your own tiny word wizard.</b></p>
<ol>
  <li>It starts with a little story — read it, or replace it with your own text (try writing a few sentences about tennis or your favourite book!).</li>
  <li>Press <b>"Learn!"</b> — the wizard studies which word follows which.</li>
  <li>Then build a sentence by tapping the suggested next words. You are the engine — just like ChatGPT, one word at a time!</li>
</ol>
<p><b>Notice:</b> the wizard can ONLY suggest words it has seen. ChatGPT works the same way, just trained on almost the whole internet — that's why it seems to know everything (and why it sometimes makes things up!).</p>`,
    },
    {
      id: "w6l4", title: "Build Your Own Chatbot", type: "lesson", xp: 25,
      learn: `
<p>Now build a talking robot with the Python <b>you already know</b> — input, if/elif, lists and random!</p>
<div class="codebox">import random

print("🤖 Hi! I'm AuroraBot. Ask me things! (write 'bye' to stop)")

while True:
    message = input("You: ")
    if message == "bye":
        print("🤖 Bye! Talk tomorrow!")
        break
    elif "tennis" in message:
        print("🤖 Tennis is the best sport! 🎾")
    elif "book" in message:
        print("🤖 I'm reading 'Robots of the North'. So good!")
    else:
        print("🤖", random.choice(["Cool!", "Tell me more!", "Interesting..."]))</div>
<p>Two new tricks here:</p>
<ul>
  <li><code>"tennis" in message</code> — checks if a word appears <b>anywhere</b> in the text</li>
  <li><code>break</code> — jumps out of a <code>while True</code> loop (which would otherwise loop forever)</li>
</ul>
<p>This is a <b>rule-based</b> bot — like Siri's early days. Modern AI chatbots predict words instead (like your Word Wizard!), but every chatbot started exactly like this one. 🤖</p>`,
      starter: `import random

print("🤖 Hi! I'm AuroraBot! (write 'bye' to stop)")

while True:
    message = input("You: ")
    if message == "bye":
        print("🤖 Bye!")
        break
    elif "tennis" in message:
        print("🤖 Tennis is the best! 🎾")
    else:
        print("🤖", random.choice(["Cool!", "Tell me more!"]))
`,
      challenge: {
        text: "Make AuroraBot YOURS: teach it to answer at least 3 different topics you care about (piano? books? food?), and give it at least 4 random fallback answers. Have a real conversation with it!",
        hints: ["Add more branches: elif \"piano\" in message:", "Add more strings inside random.choice([...])."],
        check: { codeAll: ["while", "elif", "in message", "random.choice"] },
      },
    },
    {
      id: "w6quiz", title: "AI Superpowers & Safety", type: "quiz", xp: 25,
      intro: "Last stop at the Academy: knowing what AI is great at, where it fails, and how to use it like a pro. 🧠",
      quiz: [
        { q: "How does machine learning AI learn?", options: ["A programmer types in every rule", "It studies lots of examples", "It asks other computers", "Magic"], answer: 1, why: "ML finds patterns in examples — like your fruit robot learned from the fruits you placed." },
        { q: "Chatbots like ChatGPT mainly work by…", options: ["Searching Google really fast", "Copying from one big book", "Predicting the next word over and over", "Asking humans secretly"], answer: 2, why: "Just like your Word Wizard — predict the next word, billions of sentences of practice." },
        { q: "An AI chatbot tells you a 'fact'. What's the smart move?", options: ["Believe it — AI is always right", "Double-check important facts in another source", "Never use AI again", "Ask it to pinky promise"], answer: 1, why: "AI sometimes 'hallucinates' — makes up things that sound true. Smart people verify!" },
        { q: "Your fruit robot saw only 2 examples. Its guesses will be…", options: ["Perfect", "Often wrong — too few examples", "Faster", "Illegal"], answer: 1, why: "AI quality depends on the amount and quality of training examples." },
        { q: "What should you NOT share with an AI chatbot?", options: ["Homework questions", "Story ideas", "Passwords and private secrets", "Jokes"], answer: 2, why: "Treat chats like postcards — never share passwords, addresses, or private info." },
        { q: "Who is responsible for what you create with AI help?", options: ["The AI", "Nobody", "You", "The internet"], answer: 2, why: "AI is a tool, like a calculator or a piano — the human using it is responsible (and gets the credit for great work!)." },
      ],
    },
  ],
},

/* ════════════════════════ WORLD 6½ — AI LAB ════════════════════════ */
{
  id: "w6b",
  name: "AI Lab",
  emoji: "🧪",
  color: "#46e3b7",
  tagline: "More AI experiments: robot eyes, a guesser that learns, and mind-reading tricks.",
  lessons: [
    {
      id: "w6bl1", title: "Robot Eyes: How AI Sees 👁️", type: "widget", widget: "pixels", xp: 25,
      learn: `
<p>Here's a mind-blowing secret: <b>computers can't see pictures at all.</b> To a computer, every photo is just a giant grid of <b>numbers</b> — each little square (a <b>pixel</b>) is a number saying how bright it is.</p>
<p>Your phone camera takes photos with about 12 <i>million</i> pixels. When AI "recognises" your face, it is really hunting for <b>patterns in millions of numbers</b>. 🤯</p>
<p><b>Your mission in the lab below:</b></p>
<ol>
  <li>Draw something on the pixel grid (drag to paint!) — or load the ❤️.</li>
  <li>Press <b>"🤖 Robot view"</b> to see your drawing the way a computer sees it: pure numbers.</li>
  <li>Try <b>"✨ Invert"</b> — a photo filter is just MATH done on the numbers! Every Snapchat filter works exactly like this.</li>
</ol>`,
    },
    {
      id: "w6bl2", title: "The Animal Guesser that LEARNS 🐘", type: "widget", widget: "animal", xp: 25,
      learn: `
<p>Time to meet an AI that <b>gets smarter every time it loses</b>.</p>
<p>It plays 20-questions: think of an animal, answer yes/no questions, and it tries to guess. But here's the magic — <b>when it guesses wrong, it asks YOU to teach it</b>, and it never makes that mistake again.</p>
<p>Inside its brain is a <b>decision tree</b> — a chain of questions, exactly like your <code>if / elif / else</code> code, except the AI <b>writes its own new branches</b>. Decision trees are real AI tools used by banks, doctors and Netflix!</p>
<p><b>Your mission:</b></p>
<ol>
  <li>Play a round — it starts out really dumb (it only knows 2 animals!).</li>
  <li>When it fails, teach it your animal with a clever yes/no question.</li>
  <li>Teach it at least 2 new animals, then press <b>"🧠 Look inside my brain"</b> and watch how the tree grew.</li>
</ol>
<p>It <b>remembers forever</b> — come back tomorrow and it still knows everything you taught it. Challenge Pappa: who can stump it?</p>`,
    },
    {
      id: "w6bl3", title: "Code a Feelings Detector 💚", type: "lesson", xp: 25,
      learn: `
<p>Can a computer tell if a sentence is happy or sad? This is called <b>sentiment analysis</b>, and companies use it to read millions of reviews automatically.</p>
<p>The classic trick is beautifully simple — and you already know everything needed to build it:</p>
<ul>
  <li>A list of <b>happy words</b> (+1 point each) and <b>sad words</b> (−1 point each)</li>
  <li><code>message.split()</code> chops a sentence into a list of words</li>
  <li>A loop checks every word: <code>if word in happy_words:</code></li>
</ul>
<div class="codebox">message = "tennis is great fun"

for word in message.split():
    print(word)        # prints: tennis, is, great, fun</div>
<p>Add up the score, and the sign of the number tells you the feeling. That's real AI history — early email spam filters worked exactly like this!</p>
<div class="fox-tip"><span class="f">🦊</span><p><b>Nova's tip:</b> Write your test sentences in lowercase — "Great" and "great" are different words to a computer!</p></div>`,
      starter: `happy_words = ["love", "fun", "great", "happy", "yay", "best"]
sad_words = ["hate", "boring", "sad", "bad", "worst"]

message = input("Write a sentence and I will feel it: ")
score = 0

for word in message.split():
    if word in happy_words:
        score = score + 1
    if word in sad_words:
        score = score - 1

if score > 0:
    print("😄 That sounds happy! (score:", score, ")")
elif score < 0:
    print("😢 That sounds sad... (score:", score, ")")
else:
    print("😐 Hmm, neutral. (score:", score, ")")
`,
      challenge: {
        text: "Make the detector smarter: 1) add at least 5 more words to the happy and sad lists, 2) add a THIRD feeling — angry_words (like \"angry\", \"unfair\", \"grr\") that prints its own 😡 message. Then test it on real sentences!",
        hints: ["angry_words = [\"angry\", \"unfair\", \"grr\"] and count it in its own variable inside the loop.", "Check angry first: if angry_score > 0: print(\"😡 ...\") then elif for happy/sad."],
        check: { codeAll: ["angry", "for", "elif", "split"] },
      },
    },
    {
      id: "w6bl4", title: "The Mind Reader 🧠", type: "lesson", xp: 25,
      learn: `
<p>Think of a number from 1 to 100. I bet your computer can find it in <b>7 guesses or fewer</b>. Every time. Want to know the trick?</p>
<p><b>Always guess the middle.</b> Each answer ("higher!" / "lower!") throws away HALF of the remaining numbers: 100 → 50 → 25 → 12 → 6 → 3 → 1. Boom. 🎯</p>
<p>This strategy is called <b>binary search</b>, and it's one of the most famous ideas in computer science. It's why Spotify finds one song among 100 million in a blink.</p>
<div class="codebox">low = 1
high = 100
guess = (low + high) // 2   # // means divide and round down

# if the answer is "higher", the new low is guess + 1
# if the answer is "lower",  the new high is guess - 1</div>
<p>Here's the deep lesson: <b>AI isn't magic — it's clever strategies + math + speed.</b> A smart strategy beats random guessing by a million miles.</p>
<div class="fox-tip"><span class="f">🦊</span><p><b>Nova's tip:</b> Don't cheat when it asks — the mind reader trusts you! 😄</p></div>`,
      starter: `print("Think of a number from 1 to 100. I will read your mind!")
low = 1
high = 100
tries = 0
answer = ""

while answer != "yes":
    guess = (low + high) // 2
    tries = tries + 1
    answer = input("Is it " + str(guess) + "? (yes/higher/lower) ")
    if answer == "higher":
        low = guess + 1
    elif answer == "lower":
        high = guess - 1

print("Got it in", tries, "tries! 🧠✨")
`,
      challenge: {
        text: "Play it honestly and let it read your mind! Then upgrade it: change the range to 1–1000 (change high AND the welcome message) and count how many tries it needs now. Spoiler: only about 10!",
        hints: ["Just change high = 1000 and the text in the first print.", "Each guess halves the options: 1000 → 500 → 250 → 125 → 63 → 32 → 16 → 8 → 4 → 2 → 1."],
        check: { codeAll: ["while", "input", "//"], outputAny: ["Got it"] },
      },
    },
  ],
},

/* ════════════════════════ WORLD 7 ════════════════════════ */
{
  id: "w7",
  name: "Project Studio",
  emoji: "🎨",
  color: "#ffd166",
  tagline: "Build four real projects. Show them off. Earn your crown. 👑",
  lessons: [
    {
      id: "w7p1", title: "Project: Silly Story Generator", type: "project", xp: 40,
      learn: `
<p>Mad Libs time! Collect words from the player, then drop them into a story template. The sillier the better. 😂</p>
<p>Starter idea below — but this is <b>your</b> project: change the story completely, add more questions, add a random twist with <code>random.choice</code>!</p>
<p><b>Project checklist:</b></p>
<ul>
  <li>☐ Ask for at least 4 words with <code>input()</code></li>
  <li>☐ Print a story of at least 3 lines using those words</li>
  <li>☐ Bonus: add a random ending from a list</li>
</ul>`,
      starter: `print("=== The Silly Story Machine ===")
name = input("A name: ")
animal = input("An animal: ")
place = input("A place: ")
food = input("A food: ")

print("")
print("One sunny day,", name, "found a", animal, "in", place, ".")
print("The", animal, "was hungry, so they shared some", food, ".")
print("And from that day on, they were best friends. The end! 🌟")
`,
      challenge: {
        text: "Make the story yours! At least 4 inputs, at least 3 story lines, and read your finished story out loud to someone for the laugh test. 😄",
        hints: ["Funny inputs make funny stories: ask for 'something stinky' or 'a silly sound'.", "Random ending: endings = [...] then print(random.choice(endings))"],
        check: { codeAll: ["input", "print"], minInputs: 4 },
      },
    },
    {
      id: "w7p2", title: "Project: The Ultimate Quiz Game", type: "project", xp: 40,
      learn: `
<p>Build a quiz game about something YOU are the expert on — tennis stars, book characters, piano composers, your city…</p>
<p><b>Project checklist:</b></p>
<ul>
  <li>☐ At least 4 questions using <code>input()</code></li>
  <li>☐ Keep score with a variable (+1 for each right answer)</li>
  <li>☐ At the end: show the score, and use <code>if/elif/else</code> to give a different message for high/medium/low scores</li>
</ul>`,
      starter: `print("=== The Ultimate Quiz ===")
score = 0

answer = input("Q1: How many players in a tennis doubles match? ")
if answer == "4":
    print("Correct! ✅")
    score = score + 1
else:
    print("It was 4!")

# add more questions here!

print("")
print("Your score:", score)
`,
      challenge: {
        text: "Finish your quiz: at least 4 questions, score counting, and a final message that depends on the score. Then test it on a family member!",
        hints: ["Copy the question block and edit it for each new question.", "Ending: if score == 4: print(\"PERFECT!\") elif score >= 2: ... else: ..."],
        check: { codeAll: ["score", "if", "input"], minInputs: 3 },
      },
    },
    {
      id: "w7p3", title: "Project: Aurora Borealis Art", type: "project", xp: 40,
      learn: `
<p>Paint the northern lights — your namesake! 🌌 Use turtle loops to fill the sky with glowing waves of color.</p>
<p>The starter code paints flowing aurora curves. Make it yours:</p>
<ul>
  <li>☐ Change the colors (try "lime", "aqua", "violet", "springgreen")</li>
  <li>☐ Add more waves, or stars (small white circles) in the sky</li>
  <li>☐ Sign your artwork: <code>t.write("by Aurora")</code></li>
</ul>`,
      starter: `import turtle
t = turtle.Turtle()
t.speed(10)
t.pensize(3)

colors = ["aqua", "springgreen", "violet"]

t.penup()
t.goto(-180, -50)
t.pendown()

for band in range(3):
    t.color(colors[band])
    for i in range(36):
        t.forward(12)
        if i < 18:
            t.left(5)
        else:
            t.right(5)
    t.penup()
    t.goto(-180, -50 + (band + 1) * 30)
    t.pendown()
`,
      challenge: {
        text: "Create your own northern lights masterpiece. Experiment until it looks magical — then show your family the artwork named after you! 🌌",
        hints: ["More bands: change range(3) and add colors to the list.", "Stars: t.penup(), t.goto(x, y), t.pendown(), t.dot(4, \"white\")"],
        check: { codeAll: ["turtle", "for", "color"] },
      },
    },
    {
      id: "w7p4", title: "Project: Book-Bot, the Recommender AI", type: "project", xp: 40,
      learn: `
<p>The grand finale — combine <b>everything</b> into a real recommender, like a mini-Spotify for books! 📚</p>
<p>Real recommender AIs match <b>your taste</b> to <b>features of things</b>. Yours will do the same with questions + lists + random.</p>
<p><b>Project checklist:</b></p>
<ul>
  <li>☐ At least 3 book lists for different tastes (funny, adventure, magic…)</li>
  <li>☐ Ask the user 2+ questions about their mood/taste</li>
  <li>☐ Use if/elif to pick the right list, then <code>random.choice</code> to recommend from it</li>
  <li>☐ Wrap the recommending part in a function!</li>
</ul>`,
      starter: `import random

funny = ["Diary of a Wimpy Kid", "Matilda", "Mr Stink"]
adventure = ["Percy Jackson", "The Hobbit", "Treasure Island"]
magic = ["Harry Potter", "Nevermoor", "The Worst Witch"]

def recommend(book_list):
    print("📚 Book-Bot recommends:", random.choice(book_list))

print("=== BOOK-BOT 3000 ===")
mood = input("Do you want to laugh, explore, or be amazed? ")

if mood == "laugh":
    recommend(funny)
elif mood == "explore":
    recommend(adventure)
else:
    recommend(magic)
`,
      challenge: {
        text: "Upgrade Book-Bot: add your real favourite books to the lists, ask at least one more question (like \"long or short book?\") to refine the choice, and let the user ask for another recommendation without restarting. You built a real AI-style recommender — congratulations, coder! 👑",
        hints: ["A second question can pick between two lists inside a branch.", "Wrap it in while True: with a 'bye' break, like your chatbot!"],
        check: { codeAll: ["def", "random.choice", "if", "input"] },
      },
    },
  ],
},
];

/* Flat helpers */
const ALL_LESSONS = [];
WORLDS.forEach(w => w.lessons.forEach(l => { l.world = w.id; ALL_LESSONS.push(l); }));
const TOTAL_XP = ALL_LESSONS.reduce((s, l) => s + l.xp, 0);
