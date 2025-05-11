import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, User, Download, FileText, ArrowLeft, MessageSquare, ThumbsUp, ThumbsDown } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import PageHeader from '../../components/layout/PageHeader';
import Button from '../../components/ui/Button';
import Card, { CardHeader, CardContent, CardFooter } from '../../components/ui/Card';
import { StatusBadge } from '../../components/ui/Badge';
import TextArea from '../../components/ui/TextArea';
import { mockPapers, mockUsers, mockReviews } from '../../data/mockData';
import { Review } from '../../types';

const PaperDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  const [reviewText, setReviewText] = useState('');
  const [reviewScore, setReviewScore] = useState(5);
  const [reviewDecision, setReviewDecision] = useState<'accept' | 'revise' | 'reject'>('revise');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const paper = mockPapers.find(p => p.id === id);
  
  if (!paper) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-semibold mb-4">Paper Not Found</h2>
          <p className="text-gray-600 mb-4">The paper you're looking for doesn't exist.</p>
          <Link to="/publications">
            <Button variant="outline">Back to Publications</Button>
          </Link>
        </div>
      </div>
    );
  }
  
  const formatDate = (date?: Date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  const paperAuthors = paper.authors.map(
    authorId => mockUsers.find(user => user.id === authorId)
  ).filter(Boolean);
  
  const paperReviews = mockReviews.filter(review => review.paperId === paper.id);
  
  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/dashboard');
    }, 1500);
  };
  
  const renderReviewForm = () => {
    if (!currentUser || currentUser.role !== 'reviewer') return null;
    
    // Check if the user has already reviewed this paper
    const hasReviewed = paperReviews.some(review => review.reviewerId === currentUser.id);
    
    if (hasReviewed) return null;
    
    // Only show review form for papers under review
    if (paper.status !== 'under-review') return null;
    
    return (
      <Card className="mt-8">
        <CardHeader title="Submit Your Review" />
        <form onSubmit={handleSubmitReview}>
          <CardContent>
            <TextArea
              label="Review Comments"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Provide your detailed review of the paper"
              rows={6}
              required
              fullWidth
            />
            
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Score (1-10)
              </label>
              <div className="flex items-center">
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={reviewScore}
                  onChange={(e) => setReviewScore(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <span className="ml-2 font-semibold">{reviewScore}</span>
              </div>
            </div>
            
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Recommendation
              </label>
              <div className="flex space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio text-green-600"
                    name="decision"
                    value="accept"
                    checked={reviewDecision === 'accept'}
                    onChange={() => setReviewDecision('accept')}
                  />
                  <span className="ml-2">Accept</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio text-yellow-600"
                    name="decision"
                    value="revise"
                    checked={reviewDecision === 'revise'}
                    onChange={() => setReviewDecision('revise')}
                  />
                  <span className="ml-2">Revise</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio text-red-600"
                    name="decision"
                    value="reject"
                    checked={reviewDecision === 'reject'}
                    onChange={() => setReviewDecision('reject')}
                  />
                  <span className="ml-2">Reject</span>
                </label>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end space-x-3">
            <Button
              type="submit"
              disabled={isSubmitting || !reviewText}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Review'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    );
  };
  
  const renderReviews = () => {
    // Only certain roles can see reviews
    if (!currentUser || (currentUser.role !== 'editor' && 
        !(currentUser.role === 'author' && paper.authors.includes(currentUser.id)))) {
      return null;
    }
    
    if (paperReviews.length === 0) {
      return (
        <Card className="mt-8">
          <CardContent>
            <p className="text-gray-500 text-center py-4">No reviews have been submitted yet.</p>
          </CardContent>
        </Card>
      );
    }
    
    return (
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Reviews</h2>
        <div className="space-y-4">
          {paperReviews.map((review) => {
            const reviewer = mockUsers.find(user => user.id === review.reviewerId);
            
            return (
              <Card key={review.id}>
                <CardHeader 
                  title={`Review by ${reviewer?.name || 'Anonymous'}`}
                  subtitle={`Score: ${review.score}/10 • ${formatDate(review.updatedAt)}`}
                  action={
                    <div className="flex items-center space-x-2">
                      {review.decision === 'accept' && <ThumbsUp className="h-5 w-5 text-green-500" />}
                      {review.decision === 'revise' && <FileText className="h-5 w-5 text-yellow-500" />}
                      {review.decision === 'reject' && <ThumbsDown className="h-5 w-5 text-red-500" />}
                      <span className={`text-sm font-medium ${
                        review.decision === 'accept' ? 'text-green-700' :
                        review.decision === 'revise' ? 'text-yellow-700' :
                        'text-red-700'
                      }`}>
                        {review.decision.charAt(0).toUpperCase() + review.decision.slice(1)}
                      </span>
                    </div>
                  }
                />
                <CardContent>
                  <p className="text-gray-700 whitespace-pre-line">{review.comments}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    );
  };
  
  const editorActions = () => {
    if (!currentUser || currentUser.role !== 'editor') return null;
    
    // Only show actions for papers that are in the submitted status
    if (paper.status !== 'submitted') return null;
    
    return (
      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        <Button variant="secondary">
          Assign Reviewers
        </Button>
        <Button>
          Begin Review Process
        </Button>
      </div>
    );
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to="/publications" className="flex items-center text-blue-900 hover:text-blue-700">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Publications
        </Link>
      </div>
      
      <PageHeader
        title={paper.title}
        actions={
          paper.fileUrl && (
            <Button 
              variant="outline" 
              icon={<Download className="h-4 w-4" />}
              onClick={() => window.open(paper.fileUrl, '_blank')}
            >
              Download PDF
            </Button>
          )
        }
      />
      
      <div className="mb-4 flex flex-wrap gap-2">
        <StatusBadge status={paper.status} />
        {paper.keywords.map((keyword, index) => (
          <span 
            key={index}
            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
          >
            {keyword}
          </span>
        ))}
      </div>
      
      <Card className="mb-8">
        <CardContent>
          <h3 className="text-lg font-semibold mb-2">Abstract</h3>
          <p className="text-gray-700 whitespace-pre-line mb-6">{paper.abstract}</p>
          
          <div className="border-t border-gray-100 pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-1">Authors</h4>
              <div className="space-y-2">
                {paperAuthors.map((author) => (
                  <div key={author?.id} className="flex items-center">
                    <User className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-gray-700">{author?.name}</span>
                    {author?.institution && (
                      <span className="text-gray-500 text-sm ml-2">({author.institution})</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-1">Timeline</h4>
              <div className="space-y-2">
                {paper.submittedAt && (
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-gray-700">Submitted: {formatDate(paper.submittedAt)}</span>
                  </div>
                )}
                {paper.publishedAt && (
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-gray-700">Published: {formatDate(paper.publishedAt)}</span>
                  </div>
                )}
                <div className="flex items-center">
                  <FileText className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-gray-700">Version: {paper.version}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {editorActions()}
      {renderReviews()}
      {renderReviewForm()}
    </div>
  );
};

export default PaperDetailPage;