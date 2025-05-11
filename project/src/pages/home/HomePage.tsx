import React from 'react';
import { ArrowRight, BookOpen, FileCheck, Users, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';
import { mockPapers } from '../../data/mockData';

const HomePage: React.FC = () => {
  // Get the three most recent published papers
  const featuredPapers = mockPapers
    .filter(paper => paper.status === 'published')
    .sort((a, b) => new Date(b.publishedAt || 0).getTime() - new Date(a.publishedAt || 0).getTime())
    .slice(0, 3);
  
  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 py-8 sm:py-16 md:py-20 lg:py-28 max-w-2xl lg:max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight sm:text-6xl">
              Advance the World of Research
            </h1>
            <p className="mt-6 text-xl max-w-prose">
              Our journal management system connects researchers, editors, and reviewers 
              to streamline the publication process and accelerate scientific discovery.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link to="/publications">
                <Button size="lg">
                  Browse Publications
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="lg" className="!border-white !text-white hover:!bg-blue-800">
                  Author Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 h-full w-full md:w-1/2 opacity-10">
          <div className="h-full w-full" style={{ backgroundImage: "url('https://images.pexels.com/photos/159751/book-read-literature-pages-159751.jpeg')", backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
        </div>
      </div>
      
      {/* Features section */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-serif font-bold text-gray-900">
              Streamlined Academic Publishing
            </h2>
            <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
              Our platform simplifies every step of the research publication process, 
              from submission to peer review and final publication.
            </p>
          </div>
          
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="p-2 rounded-full bg-blue-100 inline-block">
                <FileCheck className="h-6 w-6 text-blue-900" />
              </div>
              <h3 className="mt-4 text-lg font-serif font-semibold text-gray-900">
                Streamlined Submissions
              </h3>
              <p className="mt-2 text-gray-500">
                Submit your research with our easy-to-use system that guides you through 
                each step of the submission process.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="p-2 rounded-full bg-teal-100 inline-block">
                <Users className="h-6 w-6 text-teal-700" />
              </div>
              <h3 className="mt-4 text-lg font-serif font-semibold text-gray-900">
                Efficient Peer Review
              </h3>
              <p className="mt-2 text-gray-500">
                Our system connects editors with qualified reviewers and provides tools for 
                managing the entire review process.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="p-2 rounded-full bg-amber-100 inline-block">
                <Award className="h-6 w-6 text-amber-700" />
              </div>
              <h3 className="mt-4 text-lg font-serif font-semibold text-gray-900">
                Global Reach
              </h3>
              <p className="mt-2 text-gray-500">
                Publish your work in a system designed to maximize visibility and citation 
                impact in the academic community.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Recent publications */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-serif font-bold text-gray-900">
              Recent Publications
            </h2>
            <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
              Explore our latest published research across various disciplines
            </p>
          </div>
          
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {featuredPapers.map((paper) => (
              <div key={paper.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 transition-all hover:shadow-md">
                <h3 className="text-lg font-serif font-semibold text-gray-900 line-clamp-2">
                  {paper.title}
                </h3>
                <p className="mt-2 text-sm text-gray-500 line-clamp-3">
                  {paper.abstract}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {paper.keywords.map((keyword, i) => (
                    <span key={i} className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">
                      {keyword}
                    </span>
                  ))}
                </div>
                <div className="mt-4 text-sm text-gray-500">
                  Published: {new Date(paper.publishedAt || 0).toLocaleDateString()}
                </div>
                <Link to={`/papers/${paper.id}`} className="mt-4 inline-flex items-center text-sm font-medium text-blue-900 hover:text-blue-700">
                  Read full paper <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link to="/publications">
              <Button variant="outline" size="lg">
                View All Publications
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* CTA section */}
      <div className="bg-blue-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-serif font-bold">Ready to Submit Your Research?</h2>
          <p className="mt-4 text-lg max-w-2xl mx-auto">
            Join our community of researchers and contribute to the advancement of knowledge in your field.
          </p>
          <div className="mt-8">
            <Link to="/login">
              <Button size="lg" variant="secondary">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;