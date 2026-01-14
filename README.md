# Congruence Engine Data Register Web Application

An experimental web application using the [Congruence Engine](https://www.sciencemuseumgroup.org.uk/projects/the-congruence-engine)'s Wikibase-based research data register, developed as one output of a broader research exploration into Wikibase as infrastructure for managing research project data.

- [Live demo](https://congruence-engine.github.io/data-register-app)
- [Congruence Engine Data Register (Wikibase instance)](https://congruence-engine.wikibase.cloud)
- [Congruence Engine project](https://www.sciencemuseumgroup.org.uk/projects/the-congruence-engine)

<br />

## About

Wikibase offers robust infrastructure for structured data storage, linking, and querying, but its reliance on semantic web technologies presents significant entry barriers. Users unfamiliar with RDF's conceptual model face a steep learning curve, and querying data requires knowledge of SPARQL (a specialized query language that differs fundamentally from conventional search interfaces).

This application was developed to explore these challenges and experiment with ways to address them. Rather than offering a polished solution, it is an exercise in understanding the difficulties of Wikibase's native search and query offerings and investigating how these might be made more approachable.

Beyond usability, the application served as an experimental environment for exploring data reuse through existing web technologies. Rather than creating a closed bespoke system, it leverages pre-existing frameworks and the Wikibase API, demonstrating how semantically modelled data can be integrated and repurposed within broader digital ecosystems.

A further dimension of the research investigated the affordances of language models in data discovery. We compared traditional full-text search with vector-based semantic search, exploring how these approaches interpret and retrieve information from a small, well-defined collection. The [Congruene Engine Data Register](https://congruence-engine.wikibase.cloud/) provided a controlled testbed for this comparison, offering insight into how linguistic similarity, conceptual proximity, and structured metadata shape information retrieval.

Working with a small, well-defined collection was a deliberate choice. It made search behaviour easier to observe and interpret, and anomalies easier to spot. In this context, the application functioned as both a practical tool and a research instrument: providing a way to experiment with and learn about the particular data structure, as well as a way to see cosine similarity at work with the often invisible mechanics of semantic search exposed in an accessible, observable way.

<br />

## How it works

The application offers two search methods, toggled by the user, with full-text search loaded by default.

### Full-text search

Full-text search queries Wikibase API endpoint. The user's keyword string is transformed into a query statement and sent to the endpoint. This approach provides a non-technical interface to Wikibase's native search capabilities, while offering an experience closer to conventional search.

A key consideration was not to hide the underlying complexity entirely. The full-text search supports modifiers and [CirrusSearch keywords](https://www.mediawiki.org/wiki/Help:Extension:WikibaseCirrusSearch), offering a gentler entry point while still exposing some of the structure beneath. The intent is to lower the initial barrier while leaving room for users to gradually build familiarity with the concepts needed to work with linked data directly.

**Fields searched:** titles, descriptions, keywords, held by, and used by

### Vector search

Vector search uses embeddings to find semantically similar results. On first load, the application fetches data from the Wikibase API endpoint, converts it to embeddings, and caches the result in the browser's local storage. User queries are converted to embeddings on the fly and compared against the cached embeddings using cosine similarity.

Unlike full-text search, which returns only matching items, vector search returns all items in the Data Register, ranked by semantic similarity to the query. This is intentional, to allow researchers to explore how the entire collection relates to a given query, rather than seeing only items that meet a matching threshold. This behaviour may appear unusual compared to conventional search interfaces, but reflects the exploratory purpose of the application.

**Embedding model:** [BGE Base En v1.5](https://huggingface.co/Xenova/bge-base-en-v1.5) (Xenova)

**Library:** [Transformers.js](https://www.npmjs.com/package/@xenova/transformers) (Xenova) for in-browser inference

**Fields searched:** titles, descriptions, and keywords

<br />

## Running locally

This application is built with [Next.js](https://nextjs.org/), a React framework. Familiarity with Next.js is not required to run the application locally, but may be helpful for development or customisation.

There are two ways to run the application locally: directly via Node.js, or in a Docker container. The Node.js approach is simpler if you already have a Node.js environment set up. The Docker approach may suit those who prefer not to install Node.js directly on their machine.

### System requirements

- **Node.js**: version 18.x
- **npm**: version 10.x (included with Node.js)
- **Modern web browser**: Chrome, Firefox, Safari, or Edge (recent versions)
- **Network access**: ability to reach the Wikibase API endpoint

### Installation

1. Clone this repository.

   ```
   git clone https://github.com/congruence-engine/data-register-app.git
   ```

1. Navigate into the code directory.

   ```
   cd data-register-app
   ```

1. Install the app.

   ```
   npm ci
   ```

1. Run the app in development mode.

   ```
   npm run dev
   ```

   The application will be available at `http://localhost:3000`.

### Installation in a Docker container

1. Pull a Ubuntu image.

   ```
   docker pull ubuntu:22.04
   ```

2. Run an interactive container.

   ```
   docker run -it --rm -p 3000:3000 ubuntu:22.04 /bin/bash
   ```

   For the rest of the process, you will be working inside this container.

3. Install prerequisite system packages.

   ```
   apt update
   apt install curl git -y
   ```

4. Install Node.js.

   Install nvm (Node Version Manager):

   ```
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
   source ~/.bashrc
   ```

   Install Node.js version 18.x:

   ```
   nvm install v18.20.8
   ```

   Verify Node.js installation:

   ```
   node -v
   ```

5. Clone this repository.

   ```
   git clone https://github.com/congruence-engine/data-register-app.git
   ```

6. Navigate into the code directory.

   ```
   cd data-register-app
   ```

7. Install the app.

   ```
   npm ci
   ```

8. Run the app in development mode.

   ```
   npm run dev
   ```

   The application will be available at `http://localhost:3000`.

<br />

## Acknowledgements

### Contributors

* [Daniel Belteki](https://github.com/third-floor)
* [Natasha Kitcher](https://github.com/tashakitcher)
* [Kunika Kono](https://github.com/kunika)
* [Max Long](https://github.com/maaxlong)
* [Felix Needham-Simpson](https://github.com/FelixNeSi)
* [Arran Rees](https://github.com/arranrees)
* [Anna-Maria Sichani](https://github.com/amsichani)
* [Jane Winters](https://github.com/janewinters)

<br />

## License

This work is licensed under [CC0 1.0 Universal (Public Domain Dedication)](https://creativecommons.org/publicdomain/zero/1.0/).