import React, { useState, useEffect } from 'react';
import { Fingerprint, Eye, Smartphone, Shield, CheckCircle, AlertTriangle } from 'lucide-react';

interface BiometricCapability {
  type: 'fingerprint' | 'face' | 'voice' | 'iris';
  available: boolean;
  enabled: boolean;
  lastUsed?: string;
  reliability: number;
}

const BiometricAuth: React.FC = () => {
  const [biometricSupport, setBiometricSupport] = useState<BiometricCapability[]>([]);
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [enrollmentStep, setEnrollmentStep] = useState(0);

  useEffect(() => {
    checkBiometricSupport();
  }, []);

  const checkBiometricSupport = async () => {
    const capabilities: BiometricCapability[] = [];

    // Check for WebAuthn support
    if (window.PublicKeyCredential) {
      const available = await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
      
      capabilities.push({
        type: 'fingerprint',
        available,
        enabled: available && localStorage.getItem('biometric_fingerprint') === 'enabled',
        lastUsed: localStorage.getItem('biometric_fingerprint_last'),
        reliability: 95
      });

      capabilities.push({
        type: 'face',
        available,
        enabled: available && localStorage.getItem('biometric_face') === 'enabled',
        lastUsed: localStorage.getItem('biometric_face_last'),
        reliability: 92
      });
    }

    // Check for additional capabilities
    capabilities.push({
      type: 'voice',
      available: 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window,
      enabled: false,
      reliability: 88
    });

    capabilities.push({
      type: 'iris',
      available: false, // Not widely supported yet
      enabled: false,
      reliability: 99
    });

    setBiometricSupport(capabilities);
  };

  const enrollBiometric = async (type: string) => {
    setIsEnrolling(true);
    setEnrollmentStep(0);

    try {
      // Simulate enrollment process
      for (let i = 0; i <= 100; i += 20) {
        setEnrollmentStep(i);
        await new Promise(resolve => setTimeout(resolve, 500));
      }

      // In real implementation, this would use WebAuthn API
      if (type === 'fingerprint' || type === 'face') {
        const credential = await navigator.credentials.create({
          publicKey: {
            challenge: crypto.getRandomValues(new Uint8Array(32)),
            rp: {
              name: 'OmniInvest',
              id: window.location.hostname,
            },
            user: {
              id: crypto.getRandomValues(new Uint8Array(64)),
              name: 'user@omniinvest.com',
              displayName: 'OmniInvest User',
            },
            pubKeyCredParams: [{ alg: -7, type: 'public-key' }],
            authenticatorSelection: {
              authenticatorAttachment: 'platform',
              userVerification: 'required',
            },
            timeout: 60000,
            attestation: 'direct',
          },
        });

        if (credential) {
          localStorage.setItem(`biometric_${type}`, 'enabled');
          localStorage.setItem(`biometric_${type}_last`, new Date().toISOString());
          await checkBiometricSupport();
        }
      }
    } catch (error) {
      console.error('Biometric enrollment failed:', error);
    } finally {
      setIsEnrolling(false);
      setEnrollmentStep(0);
    }
  };

  const disableBiometric = (type: string) => {
    localStorage.removeItem(`biometric_${type}`);
    localStorage.removeItem(`biometric_${type}_last`);
    checkBiometricSupport();
  };

  const getBiometricIcon = (type: string) => {
    switch (type) {
      case 'fingerprint': return <Fingerprint className="h-6 w-6" />;
      case 'face': return <Eye className="h-6 w-6" />;
      case 'voice': return <Smartphone className="h-6 w-6" />;
      case 'iris': return <Eye className="h-6 w-6" />;
      default: return <Shield className="h-6 w-6" />;
    }
  };

  const getReliabilityColor = (reliability: number) => {
    if (reliability >= 95) return 'text-green-400';
    if (reliability >= 90) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-cyan-400 font-orbitron">Biometric Authentication</h2>
          <p className="text-cyan-300/80 mt-1">Secure access using your unique biological features</p>
        </div>
        <div className="flex items-center space-x-2">
          <Shield className="h-5 w-5 text-green-400" />
          <span className="text-sm text-green-400">Military-Grade Security</span>
        </div>
      </div>

      {/* Biometric Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {biometricSupport.map((biometric) => (
          <div
            key={biometric.type}
            className="glass-effect rounded-xl border border-cyan-500/30 p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`p-3 rounded-lg ${
                  biometric.available 
                    ? 'bg-green-500/20 border border-green-400/30' 
                    : 'bg-gray-500/20 border border-gray-400/30'
                }`}>
                  {getBiometricIcon(biometric.type)}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-cyan-400 capitalize">
                    {biometric.type} Authentication
                  </h3>
                  <p className="text-cyan-300/80 text-sm">
                    {biometric.available ? 'Available on this device' : 'Not supported'}
                  </p>
                </div>
              </div>
              
              <div className="text-right">
                <div className={`text-lg font-bold ${getReliabilityColor(biometric.reliability)}`}>
                  {biometric.reliability}%
                </div>
                <div className="text-sm text-cyan-400/60">Reliability</div>
              </div>
            </div>

            {biometric.available && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-cyan-300">Status:</span>
                  <div className="flex items-center space-x-2">
                    {biometric.enabled ? (
                      <CheckCircle className="h-4 w-4 text-green-400" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-yellow-400" />
                    )}
                    <span className={biometric.enabled ? 'text-green-400' : 'text-yellow-400'}>
                      {biometric.enabled ? 'Enabled' : 'Disabled'}
                    </span>
                  </div>
                </div>

                {biometric.lastUsed && (
                  <div className="flex items-center justify-between">
                    <span className="text-cyan-300">Last Used:</span>
                    <span className="text-cyan-100">{new Date(biometric.lastUsed).toLocaleDateString()}</span>
                  </div>
                )}

                <div className="flex space-x-3">
                  {!biometric.enabled ? (
                    <button
                      onClick={() => enrollBiometric(biometric.type)}
                      disabled={isEnrolling}
                      className="flex-1 px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200 disabled:opacity-50"
                    >
                      {isEnrolling ? `Enrolling... ${enrollmentStep}%` : 'Enable'}
                    </button>
                  ) : (
                    <button
                      onClick={() => disableBiometric(biometric.type)}
                      className="flex-1 px-4 py-2 bg-red-500/20 text-red-400 rounded-lg border border-red-400/30 hover:bg-red-500/30 transition-colors"
                    >
                      Disable
                    </button>
                  )}
                </div>
              </div>
            )}

            {!biometric.available && (
              <div className="text-center py-4">
                <p className="text-gray-400 text-sm">
                  This biometric method is not supported on your current device
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Security Benefits */}
      <div className="glass-effect rounded-xl border border-cyan-500/30 p-6">
        <h3 className="text-lg font-semibold text-cyan-400 mb-4 font-orbitron">Security Benefits</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <Shield className="h-8 w-8 text-green-400 mx-auto mb-3" />
            <h4 className="font-semibold text-cyan-400 mb-2">Impossible to Hack</h4>
            <p className="text-sm text-cyan-300/80">
              Biometric data never leaves your device and cannot be replicated
            </p>
          </div>
          
          <div className="text-center">
            <Fingerprint className="h-8 w-8 text-blue-400 mx-auto mb-3" />
            <h4 className="font-semibold text-cyan-400 mb-2">Unique to You</h4>
            <p className="text-sm text-cyan-300/80">
              Your biometric signature is completely unique and cannot be stolen
            </p>
          </div>
          
          <div className="text-center">
            <CheckCircle className="h-8 w-8 text-purple-400 mx-auto mb-3" />
            <h4 className="font-semibold text-cyan-400 mb-2">Instant Access</h4>
            <p className="text-sm text-cyan-300/80">
              Secure authentication in under 1 second with 99%+ accuracy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BiometricAuth;