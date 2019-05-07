import {Injectable} from '@angular/core';

let OneSignal;

@Injectable()
export class OneSignalService {
    userId: number;

    
    // Call this method to start the onesignal process.
    public init(userId: number) {
        this.userId = userId;
        OneSignal = window['OneSignal'] || [];
        
        if (Array.isArray(OneSignal))
        {
            this.addScript('https://cdn.onesignal.com/sdks/OneSignalSDK.js', (callback) => {
                this.initOneSignal();
            });
        }
        else
        {
            this.initOneSignal();
        }
        
    }

    addScript(fileSrc, callback) {
        const head = document.getElementsByTagName('head')[0];
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.onload = callback;
        script.src = fileSrc;
        head.appendChild(script);
    }

    initOneSignal() {
        OneSignal = window['OneSignal'] || [];
        
        if (!OneSignal._initCalled)
        {
            OneSignal.push(['init', {
                appId: 'd9ef4b99-9f06-4022-876d-53d2b374658e',
                autoRegister: true,
                allowLocalhostAsSecureOrigin: true,
                notifyButton: {
                    enable: false,
                },
                welcomeNotification: {
                    disable: true
                },
            }]);
        }
        if (this.userId) {
            OneSignal.push(() => {
                OneSignal.setExternalUserId(this.userId);
            });
        } else {
            OneSignal.push(() => {
                OneSignal.removeExternalUserId();
            });
        }

        //console.log('OneSignal Initialized');
        this.checkIfSubscribed();
    }

    subscribe() {
        OneSignal.push(() => {
            //console.log('Register For Push');
            OneSignal.push(['registerForPushNotifications'])
            OneSignal.on('subscriptionChange', (isSubscribed) => {
                //console.log('The user\'s subscription state is now:', isSubscribed);
                this.listenForNotification();
                OneSignal.getUserId().then((userId) => {
                    //console.log('User ID is', userId);
                    this.updateLocalUserProfile();
                });
            });
        });
    }

    listenForNotification() {
        //console.log('Initalize Listener');
        OneSignal.on('notificationDisplay', (event) => {
            //console.log('OneSignal notification displayed:', event);
            this.listenForNotification();
        });
    }

    getUserID() {
        OneSignal.getUserId().then((userId) => {
            //console.log('User ID is', userId);
        });
    }

    checkIfSubscribed() {
        OneSignal.push(() => {
            /* These examples are all valid */
            OneSignal.isPushNotificationsEnabled((isEnabled) => {
                if (isEnabled) {
                    //console.log('Push notifications are enabled!');
                    this.getUserID();
                } else {
                    //console.log('Push notifications are not enabled yet.');
                    this.subscribe();
                }
            }, (error) => {
                //console.log('Push permission not granted');
            });
        });
    }

    updateLocalUserProfile() {
        // Store OneSignal ID in your server for sending push notificatios.
    }

}