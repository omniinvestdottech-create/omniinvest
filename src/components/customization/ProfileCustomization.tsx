import React, { useState } from 'react';
import { Upload, User, Building, Camera, Palette, Save } from 'lucide-react';
import { useLocalStorage } from '../../hooks/useLocalStorage';

interface UserProfile {
  displayName: string;
  company: string;
  title: string;
  bio: string;
  avatar: string;
  coverImage: string;
  socialLinks: {
    twitter: string;
    linkedin: string;
    website: string;
  };
  preferences: {
    publicProfile: boolean;
    showPerformance: boolean;
    allowMessages: boolean;
    showOnLeaderboard: boolean;
  };
}

const ProfileCustomization: React.FC = () => {
  const [profile, setProfile] = useLocalStorage<UserProfile>('user-profile', {
    displayName: 'John Doe',
    company: '',
    title: '',
    bio: '',
    avatar: '',
    coverImage: '',
    socialLinks: {
      twitter: '',
      linkedin: '',
      website: ''
    },
    preferences: {
      publicProfile: true,
      showPerformance: false,
      allowMessages: true,
      showOnLeaderboard: true
    }
  });

  const [previewMode, setPreviewMode] = useState(false);

  const handleInputChange = (field: string, value: string | boolean) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setProfile(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof UserProfile],
          [child]: value
        }
      }));
    } else {
      setProfile(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleImageUpload = (type: 'avatar' | 'cover') => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          setProfile(prev => ({
            ...prev,
            [type === 'avatar' ? 'avatar' : 'coverImage']: result
          }));
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Profile Customization</h2>
          <p className="text-gray-300 mt-1">Customize your public profile and forum presence</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setPreviewMode(!previewMode)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg border border-blue-400/30 hover:bg-blue-500/30 transition-colors"
          >
            <Eye className="h-4 w-4" />
            <span>{previewMode ? 'Edit' : 'Preview'}</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200">
            <Save className="h-4 w-4" />
            <span>Save Profile</span>
          </button>
        </div>
      </div>

      {previewMode ? (
        /* Profile Preview */
        <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 overflow-hidden">
          {/* Cover Image */}
          <div 
            className="h-32 bg-gradient-to-r from-blue-500 to-purple-500 relative"
            style={profile.coverImage ? { backgroundImage: `url(${profile.coverImage})`, backgroundSize: 'cover' } : {}}
          >
            <div className="absolute inset-0 bg-black/30"></div>
          </div>
          
          {/* Profile Info */}
          <div className="p-6 relative">
            <div className="flex items-start space-x-4 -mt-16">
              <div 
                className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 border-4 border-white/20 flex items-center justify-center relative z-10"
                style={profile.avatar ? { backgroundImage: `url(${profile.avatar})`, backgroundSize: 'cover' } : {}}
              >
                {!profile.avatar && (
                  <span className="text-xl font-bold text-white">
                    {profile.displayName.split(' ').map(n => n[0]).join('')}
                  </span>
                )}
              </div>
              
              <div className="flex-1 mt-16">
                <h3 className="text-xl font-bold text-white">{profile.displayName}</h3>
                {profile.title && profile.company && (
                  <p className="text-gray-300">{profile.title} at {profile.company}</p>
                )}
                {profile.bio && (
                  <p className="text-gray-400 mt-2">{profile.bio}</p>
                )}
                
                <div className="flex items-center space-x-4 mt-4">
                  {profile.socialLinks.twitter && (
                    <a href={profile.socialLinks.twitter} className="text-blue-400 hover:text-blue-300">
                      Twitter
                    </a>
                  )}
                  {profile.socialLinks.linkedin && (
                    <a href={profile.socialLinks.linkedin} className="text-blue-400 hover:text-blue-300">
                      LinkedIn
                    </a>
                  )}
                  {profile.socialLinks.website && (
                    <a href={profile.socialLinks.website} className="text-blue-400 hover:text-blue-300">
                      Website
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Profile Editor */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Basic Information */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Basic Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Display Name</label>
                <input
                  type="text"
                  value={profile.displayName}
                  onChange={(e) => handleInputChange('displayName', e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Company</label>
                <input
                  type="text"
                  value={profile.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  placeholder="Your company or organization"
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
                <input
                  type="text"
                  value={profile.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Your job title or role"
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
                <textarea
                  value={profile.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  placeholder="Tell others about your investment philosophy..."
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 h-24 resize-none"
                />
              </div>
            </div>
          </div>

          {/* Images and Social */}
          <div className="space-y-6">
            {/* Profile Images */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Profile Images</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Profile Avatar</label>
                  <div className="flex items-center space-x-4">
                    <div 
                      className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center"
                      style={profile.avatar ? { backgroundImage: `url(${profile.avatar})`, backgroundSize: 'cover' } : {}}
                    >
                      {!profile.avatar && (
                        <span className="text-lg font-bold text-white">
                          {profile.displayName.split(' ').map(n => n[0]).join('')}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => handleImageUpload('avatar')}
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg border border-blue-400/30 hover:bg-blue-500/30 transition-colors"
                    >
                      <Camera className="h-4 w-4" />
                      <span>Upload Avatar</span>
                    </button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Cover Image</label>
                  <div className="space-y-2">
                    <div 
                      className="w-full h-24 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center"
                      style={profile.coverImage ? { backgroundImage: `url(${profile.coverImage})`, backgroundSize: 'cover' } : {}}
                    >
                      {!profile.coverImage && (
                        <span className="text-white">Cover Image Preview</span>
                      )}
                    </div>
                    <button
                      onClick={() => handleImageUpload('cover')}
                      className="flex items-center space-x-2 px-4 py-2 bg-purple-500/20 text-purple-400 rounded-lg border border-purple-400/30 hover:bg-purple-500/30 transition-colors"
                    >
                      <Upload className="h-4 w-4" />
                      <span>Upload Cover</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Social Links</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Twitter</label>
                  <input
                    type="url"
                    value={profile.socialLinks.twitter}
                    onChange={(e) => handleInputChange('socialLinks.twitter', e.target.value)}
                    placeholder="https://twitter.com/yourusername"
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">LinkedIn</label>
                  <input
                    type="url"
                    value={profile.socialLinks.linkedin}
                    onChange={(e) => handleInputChange('socialLinks.linkedin', e.target.value)}
                    placeholder="https://linkedin.com/in/yourusername"
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Website</label>
                  <input
                    type="url"
                    value={profile.socialLinks.website}
                    onChange={(e) => handleInputChange('socialLinks.website', e.target.value)}
                    placeholder="https://yourwebsite.com"
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Privacy Settings */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Privacy & Visibility</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-white font-medium">Public Profile</span>
                <p className="text-sm text-gray-400">Allow others to view your profile</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={profile.preferences.publicProfile}
                  onChange={(e) => handleInputChange('preferences.publicProfile', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="text-white font-medium">Show Performance</span>
                <p className="text-sm text-gray-400">Display your investment performance publicly</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={profile.preferences.showPerformance}
                  onChange={(e) => handleInputChange('preferences.showPerformance', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
              </label>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-white font-medium">Allow Messages</span>
                <p className="text-sm text-gray-400">Let other users send you private messages</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={profile.preferences.allowMessages}
                  onChange={(e) => handleInputChange('preferences.allowMessages', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="text-white font-medium">Show on Leaderboard</span>
                <p className="text-sm text-gray-400">Appear on community leaderboards</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={profile.preferences.showOnLeaderboard}
                  onChange={(e) => handleInputChange('preferences.showOnLeaderboard', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCustomization;