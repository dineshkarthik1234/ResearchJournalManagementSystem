import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import PageHeader from '../../components/layout/PageHeader';
import PaperCard from '../../components/papers/PaperCard';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { mockPapers } from '../../data/mockData';

const PublicationsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  
  // Get all published papers
  const publishedPapers = mockPapers.filter(paper => paper.status === 'published');
  
  // Get all unique keywords from published papers
  const allKeywords = Array.from(
    new Set(publishedPapers.flatMap(paper => paper.keywords))
  ).sort();
  
  // Filter papers based on search term and selected keywords
  const filteredPapers = publishedPapers.filter(paper => {
    const matchesSearch = searchTerm === '' || 
      paper.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      paper.abstract.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesKeywords = selectedKeywords.length === 0 || 
      selectedKeywords.some(keyword => paper.keywords.includes(keyword));
    
    return matchesSearch && matchesKeywords;
  });
  
  const toggleKeyword = (keyword: string) => {
    if (selectedKeywords.includes(keyword)) {
      setSelectedKeywords(selectedKeywords.filter(k => k !== keyword));
    } else {
      setSelectedKeywords([...selectedKeywords, keyword]);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        title="Publications"
        description="Browse our collection of published research papers"
      />
      
      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <div className="md:flex-grow">
          <Input
            placeholder="Search by title or abstract"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={<Search className="h-5 w-5" />}
            fullWidth
          />
        </div>
        <div>
          <Button
            variant="outline"
            icon={<Filter className="h-5 w-5" />}
            className="w-full md:w-auto"
          >
            Filter
          </Button>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/4">
          <div className="bg-white rounded-lg shadow-sm p-4 sticky top-4">
            <h3 className="font-semibold text-lg mb-3">Keywords</h3>
            <div className="space-y-2">
              {allKeywords.map((keyword) => (
                <label
                  key={keyword}
                  className="flex items-center cursor-pointer"
                >
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-blue-900 rounded focus:ring-blue-500"
                    checked={selectedKeywords.includes(keyword)}
                    onChange={() => toggleKeyword(keyword)}
                  />
                  <span className="ml-2 text-gray-700">{keyword}</span>
                </label>
              ))}
            </div>
            
            {selectedKeywords.length > 0 && (
              <button
                className="mt-4 text-sm text-blue-900 hover:text-blue-700"
                onClick={() => setSelectedKeywords([])}
              >
                Clear filters
              </button>
            )}
          </div>
        </div>
        
        <div className="md:w-3/4">
          {filteredPapers.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2">
              {filteredPapers.map(paper => (
                <PaperCard key={paper.id} paper={paper} />
              ))}
            </div>
          ) : (
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <p className="text-gray-500">No publications found matching your criteria.</p>
              {(searchTerm || selectedKeywords.length > 0) && (
                <button
                  className="mt-4 text-sm text-blue-900 hover:text-blue-700"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedKeywords([]);
                  }}
                >
                  Clear all filters
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PublicationsPage;