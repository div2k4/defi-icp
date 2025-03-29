import { AuthClient } from '@dfinity/auth-client';
import { Actor, HttpAgent } from '@dfinity/agent';

interface WalletState {
  isConnected: boolean;
  principal?: string;
  accountId?: string;
}

class WalletConnection {
  private static instance: WalletConnection;
  private authClient: AuthClient | null = null;
  private state: WalletState = {
    isConnected: false
  };

  private constructor() {
    this.initializeAuthClient();
  }

  public static getInstance(): WalletConnection {
    if (!WalletConnection.instance) {
      WalletConnection.instance = new WalletConnection();
    }
    return WalletConnection.instance;
  }

  public async initializeAuthClient(): Promise<void> {
    this.authClient = await AuthClient.create();
  }

  public async connectToII(): Promise<boolean> {
    if (!this.authClient) {
      await this.initializeAuthClient();
    }

    try {
      const connected = await this.authClient?.login({
        identityProvider: 'https://identity.ic0.app',
        onSuccess: () => {
          this.state.isConnected = true;
          const identity = this.authClient?.getIdentity();
          this.state.principal = identity?.getPrincipal().toString();
        },
      });
      return connected || false;
    } catch (error) {
      console.error('Failed to connect to Internet Identity:', error);
      return false;
    }
  }

  public async connectToPlug(): Promise<boolean> {
    try {
      // @ts-ignore
      const plug = window.ic?.plug;
      if (!plug) {
        throw new Error('Plug wallet not installed');
      }

      const whitelist = ['lending_borrowing_backend'];
      const host = 'http://127.0.0.1:4943';

      await plug.createAgent({ whitelist, host });
      const connected = await plug.requestConnect({
        whitelist,
        host,
        onConnectionUpdate: () => {
          console.log('Plug connection updated');
        },
      });
      
      if (connected) {
        this.state.isConnected = true;
        const principal = await plug.agent.getPrincipal();
        this.state.principal = principal.toString();
        // Create actor interface after successful connection
        await plug.createActor({
          canisterId: whitelist[0],
        });
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to connect to Plug wallet:', error);
      return false;
    }
  }

  public async connectToStoic(): Promise<boolean> {
    try {
      // @ts-ignore
      const stoicIdentity = window.StoicIdentity;
      if (!stoicIdentity) {
        throw new Error('Stoic wallet not installed');
      }

      const identity = await stoicIdentity.load();
      if (!identity) {
        const newIdentity = await stoicIdentity.connect();
        if (newIdentity) {
          this.state.isConnected = true;
          this.state.principal = newIdentity.getPrincipal().toString();
          return true;
        }
      } else {
        this.state.isConnected = true;
        this.state.principal = identity.getPrincipal().toString();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to connect to Stoic wallet:', error);
      return false;
    }
  }

  public getState(): WalletState {
    return this.state;
  }

  public disconnect(): void {
    this.state = {
      isConnected: false
    };
    this.authClient?.logout();
  }
}

export const walletConnection = WalletConnection.getInstance();