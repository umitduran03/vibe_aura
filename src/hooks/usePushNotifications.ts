import { useEffect, useState } from 'react';
import { getFirebaseToken } from '@/lib/firebase';

export function usePushNotifications() {
  const [fcmToken, setFcmToken] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const registerPush = async () => {
      let Capacitor;
      try {
        const capCore = await import('@capacitor/core');
        Capacitor = capCore.Capacitor;
      } catch (e) {
        return; // Capacitor yoksa çık
      }

      const isNative = Capacitor.isNativePlatform();
      
      if (!isNative) {
        // Web Push using Firebase JS SDK
        try {
          const token = await getFirebaseToken();
          if (token && isMounted) {
            setFcmToken(token);
            console.log("Web FCM Token:", token);
          }
        } catch (e) {
          console.warn("Web Push not supported or blocked:", e);
        }
        return;
      }

      // Native Push using Capacitor
      try {
        const { PushNotifications } = await import('@capacitor/push-notifications');
        let permStatus = await PushNotifications.checkPermissions();

        if (permStatus.receive === 'prompt') {
          permStatus = await PushNotifications.requestPermissions();
        }

        if (permStatus.receive !== 'granted') {
          console.warn("User denied push permissions");
          return;
        }

        await PushNotifications.register();

        PushNotifications.addListener('registration', (token) => {
          if (isMounted) {
            setFcmToken(token.value);
            console.log("Native Push Token:", token.value);
            // TODO: Send to backend
          }
        });

        PushNotifications.addListener('registrationError', (error: any) => {
          console.warn('Error on registration: ' + JSON.stringify(error));
        });

        PushNotifications.addListener('pushNotificationReceived', (notification) => {
          console.log('Push received: ' + JSON.stringify(notification));
        });

        PushNotifications.addListener('pushNotificationActionPerformed', (notification) => {
          console.log('Push action performed: ' + JSON.stringify(notification));
        });
      } catch (e) {
        console.warn("Native Push Notifications setup failed:", e);
      }
    };

    registerPush();

    return () => {
      isMounted = false;
      // Capacitor cleanup is handled implicitly or requires dynamic import again, safely ignored here
    };
  }, []);

  return { fcmToken };
}
