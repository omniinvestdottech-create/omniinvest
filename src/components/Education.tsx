import React, { useState } from 'react';
import { GraduationCap, BookOpen, Video, Award, Clock, Star } from 'lucide-react';

interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  rating: number;
  students: number;
  category: string;
  thumbnail: string;
}

const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Understanding Insider Trading Disclosures',
    description: 'Learn how to read and interpret SEC filings and insider trading disclosures to make informed investment decisions.',
    duration: '2h 30m',
    level: 'beginner',
    rating: 4.8,
    students: 12547,
    category: 'Fundamentals',
    thumbnail: 'SEC'
  },
  {
    id: '2',
    title: 'Political Trading Patterns & Analysis',
    description: 'Deep dive into how political figures\' trades historically outperform the market and key patterns to watch.',
    duration: '3h 15m',
    level: 'intermediate',
    rating: 4.9,
    students: 8932,
    category: 'Political Analysis',
    thumbnail: 'POL'
  },
  {
    id: '3',
    title: 'Celebrity Investment Psychology',
    description: 'Understand the psychology behind celebrity investments and how social influence affects market movements.',
    duration: '1h 45m',
    level: 'beginner',
    rating: 4.6,
    students: 15678,
    category: 'Behavioral Finance',
    thumbnail: 'CEL'
  },
  {
    id: '4',
    title: 'Advanced Portfolio Simulation',
    description: 'Master the art of backtesting and portfolio simulation using historical insider trading data.',
    duration: '4h 20m',
    level: 'advanced',
    rating: 4.7,
    students: 5432,
    category: 'Technical Analysis',
    thumbnail: 'ADV'
  }
];

const Education: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-500/20 text-green-400 border-green-400/30';
      case 'intermediate': return 'bg-yellow-500/20 text-yellow-400 border-yellow-400/30';
      case 'advanced': return 'bg-red-500/20 text-red-400 border-red-400/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-400/30';
    }
  };

  const formatStudents = (students: number) => {
    if (students >= 1000) {
      return `${(students / 1000).toFixed(1)}K`;
    }
    return students.toString();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Education Hub</h1>
          <p className="text-gray-300 mt-1">Master the art of insider-informed investing through expert-led courses</p>
        </div>
        <div className="flex items-center space-x-2">
          <GraduationCap className="h-5 w-5 text-blue-400" />
          <span className="text-sm text-blue-400">42,589 Students Learning</span>
        </div>
      </div>

      {/* Educational Disclaimer */}
      <div className="bg-amber-500/20 border border-amber-400/30 rounded-xl p-6">
        <div className="flex items-start space-x-3">
          <Award className="h-6 w-6 text-amber-400 mt-1" />
          <div>
            <h3 className="text-lg font-semibold text-amber-400 mb-2">Educational Purpose Only</h3>
            <p className="text-amber-100 text-sm leading-relaxed">
              All content, courses, and materials provided in this education hub are for informational and educational purposes only. 
              OmniInvest does not provide financial advice and is not responsible for any investment decisions made based on this content. 
              Always consult with a qualified financial advisor before making investment decisions.
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="all">All Categories</option>
              <option value="fundamentals">Fundamentals</option>
              <option value="political">Political Analysis</option>
              <option value="behavioral">Behavioral Finance</option>
              <option value="technical">Technical Analysis</option>
            </select>
          </div>
          
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-300 mb-2">Difficulty Level</label>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="all">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
        </div>
      </div>

      {/* Featured Course */}
      <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 rounded-xl p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Star className="h-5 w-5 text-yellow-400" />
          <span className="text-yellow-400 font-medium">Featured Course</span>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div>
            <h3 className="text-2xl font-bold text-white mb-3">
              The Complete Guide to Insider Trading Intelligence
            </h3>
            <p className="text-gray-300 mb-4">
              Our comprehensive masterclass covering everything from basic disclosure reading to advanced pattern recognition. 
              Learn directly from former SEC analysts and Wall Street professionals.
            </p>
            
            <div className="flex items-center space-x-6 mb-4">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-300">8h 45m total</span>
              </div>
              <div className="flex items-center space-x-2">
                <Video className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-300">24 lessons</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-300">Certificate included</span>
              </div>
            </div>
            
            <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-200 transform hover:scale-105">
              Start Learning Now
            </button>
          </div>
          
          <div className="bg-white/10 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-white mb-4">What You'll Learn</h4>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                <span>SEC filing interpretation and analysis</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                <span>Political trading pattern recognition</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                <span>Risk management strategies</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                <span>Portfolio optimization techniques</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {mockCourses.map((course) => (
          <div
            key={course.id}
            className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-6 card-hover"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-16 h-16 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                <span className="text-lg font-bold text-white">{course.thumbnail}</span>
              </div>
              
              <span className={`px-3 py-1 rounded-full text-xs border ${getLevelColor(course.level)}`}>
                {course.level.toUpperCase()}
              </span>
            </div>
            
            <h3 className="text-lg font-semibold text-white mb-2">{course.title}</h3>
            <p className="text-gray-300 text-sm mb-4 leading-relaxed">{course.description}</p>
            
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-400">{course.duration}</span>
                </div>
                
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-400" />
                  <span className="text-sm text-white">{course.rating}</span>
                </div>
              </div>
              
              <span className="text-sm text-gray-400">
                {formatStudents(course.students)} students
              </span>
            </div>
            
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <span className="text-sm font-medium text-blue-400">{course.category}</span>
              <button className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg border border-blue-400/30 hover:bg-blue-500/30 transition-colors text-sm font-medium">
                Start Course
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Learning Path */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-6">
        <div className="flex items-center space-x-2 mb-6">
          <BookOpen className="h-5 w-5 text-green-400" />
          <h2 className="text-xl font-semibold text-white">Recommended Learning Path</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-green-500/20 rounded-lg border border-green-400/30">
            <div className="text-2xl font-bold text-green-400 mb-2">1</div>
            <h4 className="font-medium text-white mb-2">Foundation</h4>
            <p className="text-sm text-gray-300">Start with insider trading basics and SEC filing interpretation</p>
          </div>
          
          <div className="text-center p-4 bg-blue-500/20 rounded-lg border border-blue-400/30">
            <div className="text-2xl font-bold text-blue-400 mb-2">2</div>
            <h4 className="font-medium text-white mb-2">Analysis</h4>
            <p className="text-sm text-gray-300">Learn pattern recognition and behavioral finance principles</p>
          </div>
          
          <div className="text-center p-4 bg-purple-500/20 rounded-lg border border-purple-400/30">
            <div className="text-2xl font-bold text-purple-400 mb-2">3</div>
            <h4 className="font-medium text-white mb-2">Advanced</h4>
            <p className="text-sm text-gray-300">Master portfolio optimization and risk management</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Education;