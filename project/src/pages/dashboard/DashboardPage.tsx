import React from 'react';
import { FilePlus, FileEdit, Clock, CheckCircle, X, BarChart2 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import PageHeader from '../../components/layout/PageHeader';
import Button from '../../components/ui/Button';
import Card, { CardHeader, CardContent } from '../../components/ui/Card';
import { mockPapers } from '../../data/mockData';
import { Link } from 'react-router-dom';
import PaperCard from '../../components/papers/PaperCard';

const DashboardPage: React.FC = () => {
  const { currentUser } = useAuth();
  
  if (!currentUser) {
    return <div>Please log in to view this page.</div>;
  }
  
  // Filter papers based on user role
  const userPapers = mockPapers.filter(paper => {
    if (currentUser.role === 'author') {
      return paper.authors.includes(currentUser.id);
    }
    if (currentUser.role === 'editor') {
      return paper.editorId === currentUser.id || !paper.editorId;
    }
    if (currentUser.role === 'reviewer') {
      // In a real app, would filter based on assigned reviews
      return paper.status === 'under-review';
    }
    return false;
  });
  
  // Dashboard stats
  const stats = {
    'author': [
      { title: 'Total Submissions', value: userPapers.length, icon: <FileEdit className="h-5 w-5 text-blue-500" /> },
      { title: 'Under Review', value: userPapers.filter(p => p.status === 'under-review').length, icon: <Clock className="h-5 w-5 text-purple-500" /> },
      { title: 'Published', value: userPapers.filter(p => p.status === 'published').length, icon: <CheckCircle className="h-5 w-5 text-green-500" /> },
      { title: 'Rejected', value: userPapers.filter(p => p.status === 'rejected').length, icon: <X className="h-5 w-5 text-red-500" /> }
    ],
    'editor': [
      { title: 'Pending Review', value: userPapers.filter(p => p.status === 'submitted').length, icon: <Clock className="h-5 w-5 text-amber-500" /> },
      { title: 'Under Review', value: userPapers.filter(p => p.status === 'under-review').length, icon: <FileEdit className="h-5 w-5 text-purple-500" /> },
      { title: 'Accepted', value: userPapers.filter(p => p.status === 'accepted').length, icon: <CheckCircle className="h-5 w-5 text-green-500" /> },
      { title: 'Published', value: userPapers.filter(p => p.status === 'published').length, icon: <BarChart2 className="h-5 w-5 text-blue-500" /> }
    ],
    'reviewer': [
      { title: 'Assigned Reviews', value: userPapers.length, icon: <FileEdit className="h-5 w-5 text-blue-500" /> },
      { title: 'Completed', value: 1, icon: <CheckCircle className="h-5 w-5 text-green-500" /> },
      { title: 'Pending', value: userPapers.length - 1, icon: <Clock className="h-5 w-5 text-amber-500" /> },
      { title: 'Average Score', value: '7.5', icon: <BarChart2 className="h-5 w-5 text-purple-500" /> }
    ]
  };
  
  const currentStats = stats[currentUser.role];
  
  const renderHeader = () => {
    const roleSpecificActions = {
      'author': (
        <Link to="/submissions/new">
          <Button icon={<FilePlus className="h-4 w-4" />}>
            New Submission
          </Button>
        </Link>
      ),
      'editor': <></>,
      'reviewer': <></>
    };
    
    return (
      <PageHeader
        title={`${currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1)} Dashboard`}
        description={`Welcome back, ${currentUser.name}. Here's an overview of your activity.`}
        actions={roleSpecificActions[currentUser.role]}
      />
    );
  };
  
  const renderRoleDashboard = () => {
    if (currentUser.role === 'author') {
      return (
        <>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Your Submissions</h2>
            {userPapers.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {userPapers.map(paper => (
                  <PaperCard key={paper.id} paper={paper} />
                ))}
              </div>
            ) : (
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
                <p className="text-gray-500 mb-4">You haven't submitted any papers yet.</p>
                <Link to="/submissions/new">
                  <Button variant="secondary" icon={<FilePlus className="h-4 w-4" />}>
                    Create New Submission
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </>
      );
    }
    
    if (currentUser.role === 'editor') {
      const pendingSubmissions = userPapers.filter(p => p.status === 'submitted');
      
      return (
        <>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Pending Submissions</h2>
            {pendingSubmissions.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {pendingSubmissions.map(paper => (
                  <PaperCard key={paper.id} paper={paper} />
                ))}
              </div>
            ) : (
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
                <p className="text-gray-500">There are no pending submissions to review.</p>
              </div>
            )}
          </div>
          
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Under Review</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {userPapers
                .filter(p => p.status === 'under-review')
                .map(paper => (
                  <PaperCard key={paper.id} paper={paper} />
                ))}
            </div>
          </div>
        </>
      );
    }
    
    if (currentUser.role === 'reviewer') {
      return (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Your Review Assignments</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {userPapers.map(paper => (
              <PaperCard key={paper.id} paper={paper} />
            ))}
          </div>
        </div>
      );
    }
    
    return null;
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      {renderHeader()}
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        {currentStats.map((stat, index) => (
          <Card key={index}>
            <div className="flex items-center">
              <div className="mr-4">
                {stat.icon}
              </div>
              <div>
                <p className="text-sm text-gray-500">{stat.title}</p>
                <p className="text-2xl font-semibold">{stat.value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      {renderRoleDashboard()}
    </div>
  );
};

export default DashboardPage;