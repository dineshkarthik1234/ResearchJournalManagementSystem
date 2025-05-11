import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Tag, Upload } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import PageHeader from '../../components/layout/PageHeader';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import TextArea from '../../components/ui/TextArea';
import Card from '../../components/ui/Card';

const NewSubmissionPage: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  const [title, setTitle] = useState('');
  const [abstract, setAbstract] = useState('');
  const [keywords, setKeywords] = useState('');
  const [currentKeyword, setCurrentKeyword] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  if (!currentUser || currentUser.role !== 'author') {
    navigate('/login');
    return null;
  }
  
  const handleAddKeyword = () => {
    if (currentKeyword.trim() && !keywords.includes(currentKeyword.trim())) {
      setKeywords(keywords ? `${keywords}, ${currentKeyword.trim()}` : currentKeyword.trim());
      setCurrentKeyword('');
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddKeyword();
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/dashboard');
    }, 1500);
  };
  
  const keywordArray = keywords ? keywords.split(',').map(k => k.trim()) : [];
  
  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        title="New Submission"
        description="Submit your research paper for review and publication"
      />
      
      <Card className="max-w-3xl mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <Input
              label="Paper Title"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter the title of your paper"
              required
              fullWidth
              icon={<FileText className="h-5 w-5" />}
            />
            
            <TextArea
              label="Abstract"
              id="abstract"
              value={abstract}
              onChange={(e) => setAbstract(e.target.value)}
              placeholder="Provide a concise summary of your research"
              required
              fullWidth
              rows={6}
            />
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Keywords
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {keywordArray.map((keyword, index) => (
                  <span 
                    key={index}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                  >
                    {keyword}
                    <button
                      type="button"
                      className="ml-1.5 inline-flex text-blue-400 hover:text-blue-600"
                      onClick={() => {
                        const newKeywords = keywordArray.filter((_, i) => i !== index).join(', ');
                        setKeywords(newKeywords);
                      }}
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex">
                <Input
                  id="keyword"
                  value={currentKeyword}
                  onChange={(e) => setCurrentKeyword(e.target.value)}
                  placeholder="Add keywords separated by Enter"
                  onKeyDown={handleKeyDown}
                  icon={<Tag className="h-5 w-5" />}
                  className="flex-grow"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleAddKeyword}
                  className="ml-2"
                >
                  Add
                </Button>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Upload Paper (PDF)
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-blue-900 hover:text-blue-700"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        accept=".pdf"
                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PDF up to 10MB
                  </p>
                </div>
              </div>
              {file && (
                <p className="mt-2 text-sm text-gray-500">
                  Selected file: {file.name}
                </p>
              )}
            </div>
            
            <div className="flex justify-end space-x-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/dashboard')}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting || !title || !abstract || keywordArray.length === 0 || !file}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Paper'}
              </Button>
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default NewSubmissionPage;