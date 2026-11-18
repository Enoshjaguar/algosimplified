
const systemDesignData = [
  {
    title: "What is System Design?",
    slug: "what-is-system-design",
    category: "Fundamentals",
    description: "Understand system design and why it matters in software engineering.",
    explanation: `
System Design is the process of defining the architecture,
components, databases, and communication of a software application.

It helps us build applications that are scalable, reliable,
maintainable, and efficient.

For example, when designing WhatsApp, we need to think about
how messages are sent, stored, and delivered to millions of users.
    `,
    imageUrl: "",
    order: 1
  },
  {
    title: "Client-Server Architecture",
    slug: "client-server-architecture",
    category: "Fundamentals",
    description: "Learn how clients and servers communicate with each other.",
    explanation: `
Client-server architecture is a model where clients send requests
and servers process those requests and return responses.

Example:
When you open Instagram, your mobile app sends a request
to Instagram's server. The server processes it and returns
your feed.
    `,
    imageUrl: "",
    order: 2
  },
  {
    title: "Monolithic vs Microservices",
    slug: "monolithic-vs-microservices",
    category: "Core Concepts",
    description: "Understand two popular software architecture styles.",
    explanation: `
A monolithic architecture has the application's functionality
built and deployed as one unit.

Microservices architecture divides an application into smaller,
independent services that communicate with each other.

Example:
An e-commerce application may have separate services
for users, products, orders, and payments.
    `,
    imageUrl: "",
    order: 3
  },
  {
    title: "Load Balancing",
    slug: "load-balancing",
    category: "Core Concepts",
    description: "Learn how incoming traffic is distributed across servers.",
    explanation: `
A load balancer distributes incoming requests across multiple
servers.

This prevents a single server from handling all the traffic
and helps improve performance and availability.

Example:
If 10,000 users visit a website, a load balancer can distribute
their requests across several backend servers.
    `,
    imageUrl: "",
    order: 4
  },
  {
    title: "Caching",
    slug: "caching",
    category: "Core Concepts",
    description: "Understand how caching improves application performance.",
    explanation: `
Caching stores frequently accessed data in a faster storage
location so that future requests can retrieve it quickly.

Instead of repeatedly fetching the same data from a database,
an application can retrieve it from a cache.

Redis is a popular caching technology.
    `,
    imageUrl: "",
    order: 5
  },
  {
    title: "Design a URL Shortener",
    slug: "design-a-url-shortener",
    category: "Interview Practice",
    description: "Learn how to design a service similar to Bitly.",
    explanation: `
A URL shortener converts a long URL into a shorter URL.

For example:
Long URL: https://example.com/articles/system-design
Short URL: https://short.ly/abc123

The system needs to generate unique short codes,
store the mapping, and redirect users to the original URL.
    `,
    imageUrl: "",
    order: 6
  }
];

module.exports = systemDesignData
