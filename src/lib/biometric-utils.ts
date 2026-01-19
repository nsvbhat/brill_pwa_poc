/**
 * Biometric Authentication Utilities
 * Supports WebAuthn (fingerprint, face recognition)
 */

export interface BiometricCredential {
  id: string;
  publicKey: string;
  counter: number;
  aaguid: string;
  credentialType: 'public-key';
  transports?: string[];
}

/**
 * Check if device supports biometric authentication
 */
export async function isBiometricSupported(): Promise<boolean> {
  try {
    // Check WebAuthn support
    if (!window.PublicKeyCredential) {
      console.log('❌ WebAuthn not supported');
      return false;
    }

    // Check platform authenticator availability (fingerprint/face on device)
    const available = await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
    console.log('✅ Biometric authenticator available:', available);
    return available;
  } catch (error) {
    console.error('❌ Biometric check failed:', error);
    return false;
  }
}

/**
 * Register biometric credentials (First-time setup)
 * Shows native biometric prompt and stores credential locally
 */
export async function registerBiometric(userId: string, userName: string): Promise<boolean> {
  try {
    console.log('📝 Starting biometric registration for:', userName);
    
    // Check if already registered
    if (hasBiometricCredentials(userId)) {
      console.log('ℹ️ Biometric already registered for this user');
      return true;
    }

    const encoder = new TextEncoder();
    const userId_encoded = encoder.encode(userId);
    const randomChallenge = crypto.getRandomValues(new Uint8Array(32));

    const credentialCreationOptions: CredentialCreationOptions = {
      publicKey: {
        challenge: randomChallenge,
        rp: {
          name: 'Ambetter Health',
          id: window.location.hostname,
        },
        user: {
          id: userId_encoded,
          name: userName,
          displayName: userName.split('@')[0], // Show just first name
        },
        pubKeyCredParams: [
          {
            type: 'public-key',
            alg: -7, // ES256
          },
        ],
        timeout: 60000,
        attestation: 'direct',
        authenticatorSelection: {
          authenticatorAttachment: 'platform', // Use device's built-in authenticator
          userVerification: 'preferred', // Use biometric if available
          residentKey: 'discouraged',
        },
      },
    };

    console.log('🔐 Showing biometric registration prompt...');
    const credential = (await navigator.credentials.create(
      credentialCreationOptions
    )) as PublicKeyCredential | null;

    if (credential) {
      console.log('✅ Biometric registered successfully');
      
      // Store credential info locally
      const credentialInfo = {
        credentialId: credential.id,
        userId: userId,
        userName: userName,
        registeredAt: new Date().toISOString(),
        type: 'platform', // fingerprint or face
      };
      
      localStorage.setItem(`biometric_${userId}`, JSON.stringify(credentialInfo));
      console.log('💾 Credential stored locally');
      
      return true;
    }
    
    console.log('⚠️ User cancelled biometric registration');
    return false;
  } catch (error) {
    console.error('❌ Biometric registration failed:', error);
    if ((error as Error).name === 'NotAllowedError') {
      console.log('⚠️ Registration cancelled by user');
    } else if ((error as Error).name === 'NotSupportedError') {
      console.log('⚠️ Biometric not supported on this device');
    }
    return false;
  }
}

/**
 * Authenticate using biometric (fingerprint/face)
 * Used for login after biometric is registered
 */
export async function authenticateWithBiometric(userId: string): Promise<boolean> {
  try {
    if (!hasBiometricCredentials(userId)) {
      console.log('⚠️ No biometric credentials registered. Please register first.');
      return false;
    }

    console.log('🔑 Initiating biometric authentication...');
    const randomChallenge = crypto.getRandomValues(new Uint8Array(32));

    const credentialRequestOptions: CredentialRequestOptions = {
      publicKey: {
        challenge: randomChallenge,
        timeout: 60000,
        userVerification: 'preferred',
        rpId: window.location.hostname,
      },
      mediation: 'conditional', // Show native biometric UI
    };

    const assertion = (await navigator.credentials.get(
      credentialRequestOptions
    )) as PublicKeyCredential | null;

    if (assertion) {
      console.log('✅ Biometric authentication successful');
      return true;
    }
    
    console.log('⚠️ Biometric authentication failed');
    return false;
  } catch (error) {
    if ((error as Error).name === 'NotAllowedError') {
      console.log('⚠️ Biometric authentication cancelled by user');
    } else {
      console.error('❌ Biometric authentication error:', error);
    }
    return false;
  }
}

/**
 * Check if user has biometric credentials registered
 */
export function hasBiometricCredentials(userId: string): boolean {
  const stored = localStorage.getItem(`biometric_${userId}`);
  return !!stored;
}

/**
 * Get registered biometric info
 */
export function getBiometricInfo(userId: string): any {
  const stored = localStorage.getItem(`biometric_${userId}`);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return null;
    }
  }
  return null;
}

/**
 * Clear biometric credentials
 */
export function clearBiometricCredentials(userId: string): void {
  localStorage.removeItem(`biometric_${userId}`);
  console.log('🗑️ Biometric credentials cleared');
}

/**
 * Get biometric type (fingerprint, face, etc.)
 */
export async function detectBiometricType(): Promise<string> {
  try {
    // Check if device supports any authenticator
    const available = await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
    
    if (!available) return 'none';
    
    // Try to detect based on user agent (this is a heuristic)
    const ua = navigator.userAgent;
    if (ua.includes('iPhone') || ua.includes('iPad')) {
      return 'Face ID or Touch ID';
    } else if (ua.includes('Android')) {
      return 'Fingerprint or Face ID';
    } else if (ua.includes('Windows')) {
      return 'Windows Hello';
    } else if (ua.includes('Mac')) {
      return 'Touch ID';
    }
    
    return 'Biometric';
  } catch {
    return 'none';
  }
}
