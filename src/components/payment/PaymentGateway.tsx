import React, { useState } from 'react';
import { 
  CreditCard, 
  Shield, 
  Check, 
  AlertCircle, 
  Lock,
  Smartphone,
  Globe,
  Zap
} from 'lucide-react';

interface PaymentMethod {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  description: string;
  processingFee: number;
  supported: boolean;
}

const paymentMethods: PaymentMethod[] = [
  {
    id: 'stripe',
    name: 'Credit/Debit Card',
    icon: CreditCard,
    description: 'Visa, Mastercard, American Express',
    processingFee: 2.9,
    supported: true
  },
  {
    id: 'paypal',
    name: 'PayPal',
    icon: Globe,
    description: 'Pay with your PayPal account',
    processingFee: 3.5,
    supported: true
  },
  {
    id: 'apple-pay',
    name: 'Apple Pay',
    icon: Smartphone,
    description: 'Quick payment with Touch ID or Face ID',
    processingFee: 2.9,
    supported: true
  },
  {
    id: 'google-pay',
    name: 'Google Pay',
    icon: Smartphone,
    description: 'Fast and secure Google payments',
    processingFee: 2.9,
    supported: true
  }
];

interface PaymentGatewayProps {
  selectedTier: {
    id: string;
    name: string;
    price: number;
    billingPeriod: string;
  };
  billingCycle: 'monthly' | 'yearly';
  onPaymentSuccess: (paymentData: any) => void;
  onCancel: () => void;
}

const PaymentGateway: React.FC<PaymentGatewayProps> = ({ 
  selectedTier, 
  billingCycle,
  onPaymentSuccess, 
  onCancel 
}) => {
  const [selectedMethod, setSelectedMethod] = useState<string>('stripe');
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    email: '',
    billingAddress: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'US'
    }
  });

  const handleInputChange = (field: string, value: string) => {
    if (field.startsWith('billing.')) {
      const billingField = field.split('.')[1];
      setFormData(prev => ({
        ...prev,
        billingAddress: {
          ...prev.billingAddress,
          [billingField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real implementation, you would integrate with:
      // - Stripe: https://stripe.com/docs/payments/accept-a-payment
      // - PayPal: https://developer.paypal.com/docs/checkout/
      // - Apple Pay: https://developer.apple.com/apple-pay/
      // - Google Pay: https://developers.google.com/pay/api
      
      const paymentData = {
        paymentMethod: selectedMethod,
        amount: actualPrice,
        billingCycle,
        tier: selectedTier.id,
        transactionId: `txn_${Date.now()}`,
        timestamp: new Date().toISOString()
      };

      onPaymentSuccess(paymentData);
    } catch (error) {
      console.error('Payment failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const selectedMethodData = paymentMethods.find(method => method.id === selectedMethod);
  
  const getActualPrice = () => {
    if (billingCycle === 'yearly') {
      return Math.round(selectedTier.price * 0.75);
    }
    return selectedTier.price;
  };
  
  const actualPrice = getActualPrice();
  const billingLabel = billingCycle === 'yearly' ? 'year' : 'month';

  return (
    <div className="max-w-2xl mx-auto">
      <div className="glass-effect rounded-xl border border-cyan-500/30 p-8">
        <div className="text-center mb-8">
          <Shield className="h-12 w-12 text-green-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-cyan-400 font-orbitron mb-2">
            Secure Payment
          </h2>
          <p className="text-cyan-300/80">
            Complete your upgrade to {selectedTier.name}
          </p>
        </div>

        {/* Order Summary */}
        <div className="bg-white/5 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-cyan-400 mb-4">Order Summary</h3>
          <div className="flex justify-between items-center mb-2">
            <span className="text-cyan-100">{selectedTier.name}</span>
            <span className="text-cyan-100 font-medium">
              ${actualPrice}/{billingLabel}
            </span>
          </div>
          {billingCycle === 'yearly' && (
            <div className="flex justify-between items-center mb-2">
              <span className="text-green-400/80 text-sm">Annual Discount (25%)</span>
              <span className="text-green-400 text-sm">
                -${selectedTier.price - actualPrice}/{billingLabel}
              </span>
            </div>
          )}
          <div className="flex justify-between items-center mb-2">
            <span className="text-cyan-400/60">Processing Fee</span>
            <span className="text-cyan-400/60">
              ${((actualPrice * (selectedMethodData?.processingFee || 2.9)) / 100).toFixed(2)}
            </span>
          </div>
          <div className="border-t border-cyan-500/30 pt-2 mt-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-cyan-400">Total</span>
              <span className="text-lg font-semibold text-cyan-400">
                ${(actualPrice + ((actualPrice * (selectedMethodData?.processingFee || 2.9)) / 100)).toFixed(2)}
              </span>
            </div>
            {billingCycle === 'yearly' && (
              <div className="text-xs text-green-400 mt-2 text-center">
                You save ${(selectedTier.price - actualPrice) * 12} compared to monthly billing!
              </div>
            )}
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-cyan-400 mb-4">Payment Method</h3>
          <div className="grid grid-cols-2 gap-4">
            {paymentMethods.map((method) => {
              const Icon = method.icon;
              return (
                <button
                  key={method.id}
                  onClick={() => setSelectedMethod(method.id)}
                  disabled={!method.supported}
                  className={`p-4 rounded-lg border transition-all duration-200 ${
                    selectedMethod === method.id
                      ? 'border-cyan-400/50 bg-cyan-500/10'
                      : method.supported
                      ? 'border-cyan-500/30 hover:border-cyan-400/50'
                      : 'border-gray-500/30 opacity-50 cursor-not-allowed'
                  }`}
                >
                  <Icon className={`h-6 w-6 mx-auto mb-2 ${
                    method.supported ? 'text-cyan-400' : 'text-gray-500'
                  }`} />
                  <div className="text-sm font-medium text-cyan-100 mb-1">
                    {method.name}
                  </div>
                  <div className="text-xs text-cyan-400/60">
                    {method.description}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Payment Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {selectedMethod === 'stripe' && (
            <>
              <div>
                <label className="block text-sm font-medium text-cyan-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full futuristic-input rounded-lg px-4 py-3 text-cyan-100 focus:outline-none"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-cyan-300 mb-2">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.cardholderName}
                  onChange={(e) => handleInputChange('cardholderName', e.target.value)}
                  className="w-full futuristic-input rounded-lg px-4 py-3 text-cyan-100 focus:outline-none"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-cyan-300 mb-2">
                  Card Number
                </label>
                <input
                  type="text"
                  required
                  value={formData.cardNumber}
                  onChange={(e) => handleInputChange('cardNumber', formatCardNumber(e.target.value))}
                  className="w-full futuristic-input rounded-lg px-4 py-3 text-cyan-100 focus:outline-none"
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-cyan-300 mb-2">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.expiryDate}
                    onChange={(e) => handleInputChange('expiryDate', formatExpiryDate(e.target.value))}
                    className="w-full futuristic-input rounded-lg px-4 py-3 text-cyan-100 focus:outline-none"
                    placeholder="MM/YY"
                    maxLength={5}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-cyan-300 mb-2">
                    CVV
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.cvv}
                    onChange={(e) => handleInputChange('cvv', e.target.value.replace(/\D/g, ''))}
                    className="w-full futuristic-input rounded-lg px-4 py-3 text-cyan-100 focus:outline-none"
                    placeholder="123"
                    maxLength={4}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-medium text-cyan-300">Billing Address</h4>
                <input
                  type="text"
                  required
                  value={formData.billingAddress.street}
                  onChange={(e) => handleInputChange('billing.street', e.target.value)}
                  className="w-full futuristic-input rounded-lg px-4 py-3 text-cyan-100 focus:outline-none"
                  placeholder="Street Address"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    value={formData.billingAddress.city}
                    onChange={(e) => handleInputChange('billing.city', e.target.value)}
                    className="futuristic-input rounded-lg px-4 py-3 text-cyan-100 focus:outline-none"
                    placeholder="City"
                  />
                  <input
                    type="text"
                    required
                    value={formData.billingAddress.state}
                    onChange={(e) => handleInputChange('billing.state', e.target.value)}
                    className="futuristic-input rounded-lg px-4 py-3 text-cyan-100 focus:outline-none"
                    placeholder="State"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    value={formData.billingAddress.zipCode}
                    onChange={(e) => handleInputChange('billing.zipCode', e.target.value)}
                    className="futuristic-input rounded-lg px-4 py-3 text-cyan-100 focus:outline-none"
                    placeholder="ZIP Code"
                  />
                  <select
                    value={formData.billingAddress.country}
                    onChange={(e) => handleInputChange('billing.country', e.target.value)}
                    className="futuristic-input rounded-lg px-4 py-3 text-cyan-100 focus:outline-none"
                  >
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="GB">United Kingdom</option>
                    <option value="AU">Australia</option>
                  </select>
                </div>
              </div>
            </>
          )}

          {selectedMethod !== 'stripe' && (
            <div className="text-center py-8">
              <div className="text-cyan-400 mb-4">
                You will be redirected to {selectedMethodData?.name} to complete your payment.
              </div>
            </div>
          )}

          {/* Security Notice */}
          <div className="bg-green-500/10 border border-green-400/30 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Lock className="h-5 w-5 text-green-400" />
              <span className="font-medium text-green-400">Secure Payment</span>
            </div>
            <p className="text-sm text-green-300/80">
              Your payment information is encrypted and secure. We never store your card details.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 py-3 px-6 border border-gray-500/30 text-gray-400 rounded-lg hover:bg-gray-500/10 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isProcessing}
              className="flex-1 py-3 px-6 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Processing...</span>
                </div>
              ) : (
                `Pay $${(actualPrice + ((actualPrice * (selectedMethodData?.processingFee || 2.9)) / 100)).toFixed(2)} ${billingCycle === 'yearly' ? '(Save 25%)' : ''}`
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentGateway;