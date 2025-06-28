import type { Project } from '@/types/project';

export const projects: Project[] = [
  {
    id: '1',
    title: 'Network Traffic Analysis System',
    shortDescription: 'A system for analyzing and visualizing network traffic patterns using machine learning.',
    longDescription: [
      'This project focuses on developing an advanced network traffic analysis system that can detect anomalies and patterns in network behavior. The system processes packet-level data in real-time and applies machine learning algorithms to identify potential security threats and performance issues.',
      'The implementation includes a distributed architecture that can scale to handle high volumes of network traffic while maintaining low latency for real-time analysis. The system has been tested with various network topologies and has shown significant improvement in threat detection rates compared to traditional methods.'
    ],
    image: '/images/projects/network-analysis.jpg',
    techStack: ['Python', 'TensorFlow', 'Kafka', 'Elasticsearch', 'React'],
    githubUrl: 'https://github.com/yourusername/network-traffic-analysis',
    features: [
      'Real-time packet capture and analysis',
      'Anomaly detection using deep learning',
      'Interactive visualization dashboard',
      'Scalable distributed architecture'
    ],
    slug: 'network-traffic-analysis',
    date: '2024-03-15',
    category: 'Networking'
  },
  {
    id: '2',
    title: 'Academic Paper Recommendation System',
    shortDescription: 'A content-based recommendation system for academic papers using NLP techniques.',
    longDescription: [
      'This project implements a recommendation system that helps researchers discover relevant academic papers based on their reading history and research interests. The system uses natural language processing to analyze paper abstracts and content, then applies content-based filtering to suggest similar papers.',
      'The system includes features for paper categorization, citation network analysis, and personalized recommendations. It has been tested with a dataset of over 100,000 academic papers and shows promising results in terms of recommendation accuracy and relevance.'
    ],
    image: '/images/projects/paper-recommendation.jpg',
    techStack: ['Python', 'spaCy', 'scikit-learn', 'FastAPI', 'Next.js'],
    githubUrl: 'https://github.com/yourusername/paper-recommendation',
    features: [
      'Content-based paper recommendations',
      'Citation network analysis',
      'Personalized user profiles',
      'Interactive search and filtering'
    ],
    slug: 'paper-recommendation-system',
    date: '2024-01-10',
    category: 'Machine Learning'
  },
  {
    id: '3',
    title: 'Distributed Key-Value Store',
    shortDescription: 'A high-performance distributed key-value store with strong consistency guarantees.',
    longDescription: [
      'This project implements a distributed key-value store that provides strong consistency guarantees while maintaining high availability and partition tolerance. The system uses the Raft consensus algorithm to ensure data consistency across multiple nodes.',
      'The implementation includes features like automatic failover, load balancing, and data sharding. Performance benchmarks show that the system can handle thousands of operations per second with minimal latency, making it suitable for high-throughput applications.'
    ],
    image: '/images/projects/kv-store.jpg',
    techStack: ['Go', 'gRPC', 'Raft', 'Docker', 'Kubernetes'],
    githubUrl: 'https://github.com/yourusername/distributed-kv-store',
    features: [
      'Strong consistency guarantees',
      'Automatic failover and recovery',
      'Horizontal scalability',
      'RESTful API and gRPC interfaces'
    ],
    slug: 'distributed-kv-store',
    date: '2023-11-20',
    category: 'Distributed Systems'
  }
];
