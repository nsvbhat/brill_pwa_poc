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
      console.log('WebAuthn not supported');
      return false;
    }

    // Check platform authenticator availability (fingerprint/face on device)
    const available = await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
    return available;
  } catch (error) {
    console.error('Biometric check failed:', error);
    return false;
  }
}

/**
 * Register biometric credentials
 * Used during initial setup
 */
export async function registerBiometric(userId: string, userName: string): Promise<boolean> {
  try {
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
          displayName: userName,
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

    const credential = (await navigator.credentials.create(
      credentialCreationOptions
    )) as PublicKeyCredential | null;

    if (credential) {
      console.log('✅ Biometric registered successfully');
      // In production, send credential.response to server
      localStorage.setItem(`biometric_${userId}`, JSON.stringify({
        credentialId: credential.id,
        timestamp: Date.now(),
      }));
      return true;
    }
    return false;
  } catch (error) {
    console.error('Biometric registration failed:', error);
    return false;
  }
}

/**
 * Authenticate using biometric (fingerprint/face)
 */
export async function authenticateWithBiometric(userId: string): Promise<boolean> {
  try {
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
    return false;
  } catch (error) {
    if ((error as Error).name === 'NotAllowedError') {
      console.log('Biometric authentication cancelled by user');
    } else {
      console.error('Biometric authentication failed:', error);
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
 * Clear biometric credentials
 */
export function clearBiometricCredentials(userId: string): void {
  localStorage.removeItem(`biometric_${userId}`);
  console.log('Biometric credentials cleared');
}
