import React from 'react';
import { FileText, Calendar, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Paper } from '../../types';
import Card, { CardHeader, CardContent, CardFooter } from '../ui/Card';
import { StatusBadge } from '../ui/Badge';
import Button from '../ui/Button';

interface PaperCardProps {
  paper: Paper;
  showActions?: boolean;
}

const PaperCard: React.FC<PaperCardProps> = ({ paper, showActions = true }) => {
  const formatDate = (date?: Date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  return (
    <Card hover className="h-full flex flex-col">
      <CardHeader 
        title={paper.title}
        icon={<FileText className="h-5 w-5" />}
      />
      <CardContent className="flex-grow">
        <div className="mb-3">
          <StatusBadge status={paper.status} />
        </div>
        <p className="text-gray-600 text-sm line-clamp-3 mb-4">
          {paper.abstract}
        </p>
        <div className="flex flex-wrap gap-2 mb-3">
          {paper.keywords.map((keyword, index) => (
            <span 
              key={index}
              className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full"
            >
              {keyword}
            </span>
          ))}
        </div>
        <div className="flex items-center text-gray-500 text-xs mb-2">
          <Calendar className="h-3 w-3 mr-1" />
          <span>Submitted: {formatDate(paper.submittedAt)}</span>
        </div>
        {paper.publishedAt && (
          <div className="flex items-center text-gray-500 text-xs">
            <Calendar className="h-3 w-3 mr-1" />
            <span>Published: {formatDate(paper.publishedAt)}</span>
          </div>
        )}
      </CardContent>
      {showActions && (
        <CardFooter className="flex justify-between items-center">
          <div className="text-xs text-gray-500">
            Version {paper.version}
          </div>
          <Link to={`/papers/${paper.id}`}>
            <Button variant="outline" size="sm">
              View Details
            </Button>
          </Link>
        </CardFooter>
      )}
    </Card>
  );
};

export default PaperCard;